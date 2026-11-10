const fs = require('node:fs');
const path = require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
  const phase=process.argv[2]||'before';
  const experiments=process.argv.includes('--experiments');
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const results=[];
  for(const device of ['mobile','desktop']) for(const mode of experiments?['direct','slow-chunk','slow-fonts','client']:['direct','client']){
    const context=await browser.newContext({viewport:device==='mobile'?{width:390,height:844}:{width:1440,height:900}});
    const page=await context.newPage();
    const errors=[];
    page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
    page.on('pageerror',e=>errors.push(e.message));
    if(mode==='slow-chunk') await page.route('**/assets/ProjectPage-*.js',async route=>{await new Promise(r=>setTimeout(r,800));await route.continue();});
    if(mode==='slow-fonts') await page.route(/fonts\.(googleapis|gstatic)\.com/,async route=>{await new Promise(r=>setTimeout(r,1000));await route.continue();});
    await page.addInitScript(()=>{
      window.__shifts=[];window.__fontEvents=[];
      const selector=n=>n?.nodeType===3?selector(n.parentElement):n?(n.tagName.toLowerCase()+(n.id?'#'+n.id:'')+(typeof n.className==='string'?'.'+n.className.trim().split(/\s+/).filter(Boolean).join('.') : '')):null;
      new PerformanceObserver(list=>{for(const e of list.getEntries()) window.__shifts.push({time:e.startTime,value:e.value,hadRecentInput:e.hadRecentInput,sources:e.sources.map(s=>({node:selector(s.node),text:s.node?.textContent?.trim().slice(0,80),previousRect:s.previousRect.toJSON(),currentRect:s.currentRect.toJSON()}))});}).observe({type:'layout-shift',buffered:true});
      document.fonts.addEventListener('loadingdone',()=>window.__fontEvents.push({time:performance.now(),event:'loadingdone'}));
    });
    await page.goto('http://127.0.0.1:4174'+(mode==='client'?'/':'/projects/gamevault-marketplace'),{waitUntil:'networkidle'});
    if(mode==='client') {
      await page.evaluate(()=>{window.__shifts=[];window.__fontEvents=[];});
      await page.locator('a[href="/projects/gamevault-marketplace"]').first().click();
      await page.waitForURL('**/projects/gamevault-marketplace');
    }
    await page.waitForTimeout(1500);
    const load=await page.evaluate(()=>({shifts:window.__shifts,fontEvents:window.__fontEvents,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),images:[...document.images].map(n=>({src:n.currentSrc.split('/').pop(),width:n.getAttribute('width'),height:n.getAttribute('height'),aspectRatio:getComputedStyle(n).aspectRatio,naturalWidth:n.naturalWidth,naturalHeight:n.naturalHeight})),boxes:Object.fromEntries(['.project-hero','.project-facts','.kpi-grid-wide','.case-toc','.loading'].map(s=>[s,document.querySelector(s)?.getBoundingClientRect().toJSON()]))}));
    await page.evaluate(()=>{window.__shifts=[];document.querySelector('#screenshots')?.scrollIntoView();});
    await page.waitForTimeout(1500);
    const scroll=await page.evaluate(()=>window.__shifts);
    results.push({device,mode,load,scroll,errors});
    console.log(JSON.stringify({phase,device,mode,loadShifts:load.shifts.length,loadValue:load.shifts.filter(x=>!x.hadRecentInput).reduce((s,x)=>s+x.value,0),scrollShifts:scroll.length,errors}));
    await context.close();
  }
  fs.mkdirSync(path.join(process.env.QA_OUTPUT || path.join(__dirname, '..'),phase),{recursive:true});
  fs.writeFileSync(path.join(process.env.QA_OUTPUT || path.join(__dirname, '..'),phase,'layout-observer.json'),JSON.stringify(results,null,2));
  await browser.close();
})();
