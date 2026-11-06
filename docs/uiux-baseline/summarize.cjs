const fs = require('node:fs');
const path = require('node:path');
const median = a => [...a].sort((x,y)=>x-y)[Math.floor(a.length/2)];
const groups=[];
for(const page of ['home','gamevault']) for(const device of ['mobile','desktop']) {
  const runs=[1,2,3].map(n=>{
    const r=JSON.parse(fs.readFileSync(path.join(__dirname,`${page}-${device}-${n}.json`)));
    if(r.runtimeError) throw Error(JSON.stringify(r.runtimeError));
    const node=r.audits['lcp-breakdown-insight']?.details?.items?.find(x=>x.type==='node');
    return {run:n,lighthouseVersion:r.lighthouseVersion,fetchTime:r.fetchTime,userAgent:r.environment.hostUserAgent,settings:r.configSettings,scores:Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,v.score*100])),lcp:r.audits['largest-contentful-paint'].numericValue,tbt:r.audits['total-blocking-time'].numericValue,cls:r.audits['cumulative-layout-shift'].numericValue,lcpElement:node,nonComposited:r.audits['non-composited-animations'],warnings:r.runWarnings};
  });
  groups.push({page,device,medians:{...Object.fromEntries(Object.keys(runs[0].scores).map(k=>[k,median(runs.map(r=>r.scores[k]))])),lcp:median(runs.map(r=>r.lcp)),tbt:median(runs.map(r=>r.tbt)),cls:median(runs.map(r=>r.cls))},runs});
}
fs.writeFileSync(path.join(__dirname,'lighthouse-summary.json'),JSON.stringify(groups,null,2));
console.log(groups.map(({page,device,medians,runs})=>({page,device,...medians,lcpElements:runs.map(r=>r.lcpElement?.selector)})));
