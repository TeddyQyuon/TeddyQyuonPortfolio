const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const cli = process.env.LIGHTHOUSE_CLI || require.resolve('lighthouse/cli/index.js');
const phase = process.argv[2] || 'before';
const out = path.join(process.env.QA_OUTPUT || path.join(__dirname, '..'), phase);
fs.mkdirSync(out, {recursive:true});
const routes = {home:'/',gamevault:'/projects/gamevault-marketplace',sole:'/projects/sole-district',gym:'/projects/gym-calories-predictive-analysis'};
const selected = process.argv.slice(3);
const rows=[];
for (const [page, route] of Object.entries(routes)) {
  if (selected.length && !selected.includes(page)) continue;
  for (const device of ['mobile','desktop']) for (let run=1;run<=3;run++) {
    const file=path.join(out, `${page}-${device}-${run}.json`);
    const args=[cli,'http://127.0.0.1:4174'+route,'--chrome-flags=--headless=new','--output=json','--output-path='+file,'--quiet'];
    if (device==='desktop') args.push('--preset=desktop');
    const r=cp.spawnSync(process.execPath,args,{encoding:'utf8',env:process.env,timeout:180000});
    if(r.status!==0) throw Error(r.stderr || r.error || 'Lighthouse failed');
    const data=JSON.parse(fs.readFileSync(file));
    if(data.runtimeError) throw Error(JSON.stringify(data.runtimeError));
    const a=data.audits;
    const row={page,device,run,performance:data.categories.performance.score*100,cls:a['cumulative-layout-shift'].numericValue,lcp:a['largest-contentful-paint'].numericValue,lcpElement:a['lcp-breakdown-insight']?.details?.items?.find(x=>x.type==='node'),shifts:a['layout-shifts']?.details,culprits:a['cls-culprits-insight']?.details,warnings:data.runWarnings};
    rows.push(row);
    fs.writeFileSync(path.join(out,'runs.json'),JSON.stringify(rows,null,2));
    console.log(JSON.stringify({phase,page,device,run,performance:row.performance,cls:row.cls,lcp:row.lcp}));
  }
}
const median=a=>a.sort((a,b)=>a-b)[Math.floor(a.length/2)];
const summary=[];
for(const page of Object.keys(routes)) for(const device of ['mobile','desktop']) {
  const group=rows.filter(x=>x.page===page&&x.device===device);
  if(group.length) summary.push({page,device,cls:median(group.map(x=>x.cls)),lcp:median(group.map(x=>x.lcp)),performance:median(group.map(x=>x.performance)),lcpElements:[...new Set(group.map(x=>x.lcpElement?.selector))]});
}
fs.writeFileSync(path.join(out,'medians.json'),JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
