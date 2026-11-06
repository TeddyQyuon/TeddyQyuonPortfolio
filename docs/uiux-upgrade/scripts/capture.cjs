// External cached Playwright; no project dependency is added.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const out = process.env.QA_OUTPUT || __dirname;
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, ignoreDefaultArgs: ['--hide-scrollbars'] });
  const results = [];
  for (const [name, route] of (process.argv.includes('--accessibility-only') ? [] : [['home', '/'], ['gamevault', '/projects/gamevault-marketplace']])) {
    for (const theme of ['dark', 'light']) for (const reducedMotion of ['no-preference', 'reduce']) {
      for (const [width, height] of [[360,740],[390,844],[768,1024],[1280,800],[1440,900]]) {
        const context = await browser.newContext({ viewport: { width, height }, colorScheme: theme, reducedMotion });
        const page = await context.newPage();
        await page.addInitScript(value => localStorage.setItem('tq-theme', value), theme);
        const errors = [];
        page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
        page.on('pageerror', e => errors.push(String(e)));
        await page.addInitScript(() => {
          window.baselineVitals = { lcp: [], shifts: [] };
          new PerformanceObserver(list => list.getEntries().forEach(e => window.baselineVitals.lcp.push({time:e.startTime,tag:e.element?.tagName,class:e.element?.className,text:e.element?.textContent?.slice(0,150),url:e.url}))).observe({type:'largest-contentful-paint',buffered:true});
          new PerformanceObserver(list => list.getEntries().forEach(e => {if(!e.hadRecentInput) window.baselineVitals.shifts.push({time:e.startTime,value:e.value});})).observe({type:'layout-shift',buffered:true});
        });
        await page.goto('http://127.0.0.1:4174'+route, {waitUntil:'networkidle',timeout:30000});
        await page.waitForTimeout(1500);
        const data = await page.evaluate(() => ({theme:document.documentElement.dataset.theme,width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,vitals:window.baselineVitals,animations:document.getAnimations().map(x=>({name:x.animationName,playState:x.playState})),kpis:[...document.querySelectorAll('.count-up')].map(x=>({display:x.textContent,final:x.parentElement.querySelector('.sr-only').textContent})),bars:[...document.querySelectorAll('.bar-fill')].map(x=>getComputedStyle(x).transform),gpa:document.querySelector('.gpa-chart-sweep')?getComputedStyle(document.querySelector('.gpa-chart-sweep')).transform:null,progress:document.querySelector('.read-progress')?getComputedStyle(document.querySelector('.read-progress')).display:null}));
        if (data.theme !== theme) throw new Error(`Theme mismatch: requested ${theme}, got ${data.theme}`);
        if (width===390 || width===1440) await page.screenshot({path:path.join(out,`${name}-${theme}-${reducedMotion}-${width}x${height}.png`)});
        if(reducedMotion==='reduce') {
          if(data.animations.length || data.kpis.some(x=>x.display!==x.final) || data.bars.some(x=>x!=='none') || (data.gpa&&data.gpa!=='matrix(0, 0, 0, 1, 0, 0)') || (data.progress&&data.progress!=='none'))throw Error('Reduced-motion final state failed: '+JSON.stringify(data));
        }
        results.push({name,requestedTheme:theme,reducedMotion,viewport:{width,height},...data,errors});
        console.log(name,theme,reducedMotion,width,height,'captured');
        await context.close();
      }
    }
  }
  const accessibility = [];
  for (const route of ['/', '/projects/gamevault-marketplace']) for(const theme of ['dark','light']) for(const [width,height] of [[360,740],[390,844],[768,1024],[1280,800],[1440,900]]) for(const reducedMotion of ['no-preference','reduce']) {
    const context = await browser.newContext({ viewport:{width,height}, reducedMotion, colorScheme:theme });
    const page = await context.newPage();
    await page.addInitScript(value=>localStorage.setItem('tq-theme',value),theme);
    await page.goto('http://127.0.0.1:4174'+route,{waitUntil:'networkidle'});
    const reduced = await page.evaluate(() => ({matches:matchMedia('(prefers-reduced-motion: reduce)').matches, animations:document.getAnimations().map(a=>({state:a.playState,target:a.effect?.target?.className})),kpis:[...document.querySelectorAll('.kpi-value')].map(e=>e.textContent),bars:[...document.querySelectorAll('.bar-fill')].map(e=>getComputedStyle(e).transform)}));
    const focus = [];
    const count = await page.locator('a[href],button,input,select,textarea,[tabindex="0"]').count();
    for (let i=0;i<count+2;i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      focus.push(await page.evaluate(() => {const e=document.activeElement,s=getComputedStyle(e);return {tag:e.tagName,text:e.textContent?.slice(0,70),label:e.getAttribute('aria-label'),outline:s.outline,offset:s.outlineOffset,top:s.top,visible:e.matches(':focus-visible')};}));
    }
    accessibility.push({route,theme,viewport:{width,height},reducedMotion,reduced,focus});
    console.log('Keyboard',route,theme,width,reducedMotion,'checked');
    await context.close();
  }
  if (process.argv.includes('--accessibility-only')) results.push(...JSON.parse(fs.readFileSync(path.join(out,'browser-checks.json'))).results);
  fs.writeFileSync(path.join(out,'browser-checks.json'),JSON.stringify({browser:browser.version(),results,accessibility},null,2));
  await browser.close();
})();
