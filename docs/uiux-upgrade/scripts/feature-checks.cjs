const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const origin=process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4174';
async function until(read,expected){for(let i=0;i<200;i++){if(await read()===expected)return;await new Promise(r=>setTimeout(r,20));}assert.equal(await read(),expected);}
const luminance=hex=>{const rgb=hex.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);};
(async()=>{
 const {loadDataModule}=await import(pathToFileURL(path.resolve('tests/helpers.mjs')));const {projects}=loadDataModule('src/data/projects.js');
 const result={errors:[],routes:[],interactions:[],contrast:[],browsers:[]};
 for(const channel of ['chrome','msedge']){
  const browser=await chromium.launch({channel,headless:true,ignoreDefaultArgs:['--hide-scrollbars']});result.browsers.push({channel,version:browser.version()});
  const watch=p=>{p.on('pageerror',x=>result.errors.push(String(x)));p.on('console',x=>{if(x.type()==='error')result.errors.push(x.text());});};
  const context=await browser.newContext({reducedMotion:'reduce'});const p=await context.newPage();watch(p);
  for(const project of projects){await p.goto(origin+'/projects/'+project.slug,{waitUntil:'networkidle'});assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('.project-hero').count(),1);assert.equal(await p.locator('.route-enter').count(),0);const blocks=await p.locator('.case-content > section[id]').evaluateAll(xs=>xs.map(x=>x.id));const toc=await p.locator('.case-toc a').evaluateAll(xs=>xs.map(x=>x.hash.slice(1)));assert.deepEqual(blocks,toc);assert.equal(await p.locator('img').evaluateAll(xs=>xs.filter(x=>x.complete&&x.naturalWidth===0).length),0);result.routes.push({channel,slug:project.slug,blocks});}
  for(const route of ['/missing','/projects/missing']){await p.goto(origin+route,{waitUntil:'networkidle'});assert.equal(await p.locator('.not-found').count(),1);assert.equal(await p.locator('.read-progress').count(),0);}await context.close();
  for(const theme of ['dark','light'])for(const width of [390,1440])for(const reducedMotion of ['reduce','no-preference']){
   const c=await browser.newContext({viewport:{width,height:900},reducedMotion});const page=await c.newPage();watch(page);await page.addInitScript(theme=>localStorage.setItem('tq-theme',theme),theme);await page.goto(origin,{waitUntil:'networkidle'});await page.waitForTimeout(1350);
   assert.deepEqual(await page.locator('main .container > section[id]').evaluateAll(xs=>xs.map(x=>x.id)),['overview','projects','stack','academics','contact']);
   await page.locator('.hero-side').scrollIntoViewIfNeeded();await page.waitForTimeout(1350);
   for(const filter of ['Personal','Coursework','All']){const button=page.getByRole('button',{name:new RegExp('^'+filter)});await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true');assert.equal(await button.evaluate(x=>document.activeElement===x),true);const expected=projects.filter(x=>filter==='All'||x.projectGroup===(filter==='Personal'?'personal':'school')).length;assert.equal(await page.locator('.project-panel').count(),expected);}
   const semesterButtons=page.getByRole('group',{name:'Choose semester'}).getByRole('button');for(let i=0;i<await semesterButtons.count();i++){await semesterButtons.nth(i).click();assert.equal(await semesterButtons.nth(i).getAttribute('aria-pressed'),'true');assert.equal(await semesterButtons.nth(i).evaluate(x=>document.activeElement===x),true);}
   if(width===390){await page.locator('.menu-toggle').click();await page.getByRole('navigation',{name:'Primary',exact:true}).getByRole('link').first().focus();await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('.menu-toggle').evaluate(x=>document.activeElement===x),true);}
   await page.locator('.theme-switch').click();await page.waitForTimeout(350);assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme==='dark'?'light':'dark');
   await page.locator('.project-panel h3 a').first().click();await until(()=>page.locator('.project-hero').count(),1);await page.waitForTimeout(300);await page.locator('.brand').click();await until(()=>page.locator('.hero-side').count(),1);assert.equal(await page.locator('.hero-side').getAttribute('data-motion'),'done');
   await page.waitForTimeout(100);
   if(reducedMotion==='reduce'){assert.deepEqual(await page.evaluate(()=>document.getAnimations().map(x=>({name:x.animationName,property:x.transitionProperty,target:x.effect?.target?.className,duration:x.effect?.getTiming().duration}))),[]);}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth===document.documentElement.clientWidth),true);
   if(channel==='chrome'&&width===1440&&reducedMotion==='reduce'){
    const colors=await page.evaluate(()=>{const s=getComputedStyle(document.documentElement);return Object.fromEntries(['bg','surface','surface-2','text','text-muted','text-faint','accent','on-accent'].map(k=>[k,s.getPropertyValue('--'+k).trim()]));});
    const pairs=[];for(const foreground of ['text','text-muted','text-faint','accent'])for(const background of ['bg','surface','surface-2']){const ratio=contrast(colors[foreground],colors[background]);assert.ok(ratio>=4.5,`${foreground}/${background}: ${ratio}`);pairs.push({foreground,background,ratio});}const button=contrast(colors['on-accent'],colors.accent);assert.ok(button>=4.5);result.contrast.push({theme:theme==='dark'?'light':'dark',pairs,button});
   }
   result.interactions.push({channel,theme,width,reducedMotion,filter:true,semester:true,menu:width===390,themeSwitch:true,bootOnce:true});await c.close();
  }
  await browser.close();
 }
 assert.deepEqual(result.errors,[]);fs.writeFileSync(path.join(process.env.QA_OUTPUT || __dirname,'feature-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
})().catch(error=>{console.error(error);process.exit(1);});
