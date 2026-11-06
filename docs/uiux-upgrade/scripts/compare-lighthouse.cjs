const fs = require('node:fs');
const path = require('node:path');
const baseline = JSON.parse(fs.readFileSync('docs/uiux-baseline/lighthouse-summary.json'));
const current = JSON.parse(fs.readFileSync(path.join(process.env.QA_OUTPUT || __dirname,'lighthouse-summary.json')));
const scores = ['performance','accessibility','best-practices','seo'];
const results = current.map(group => {
  const before = baseline.find(x => x.page === group.page && x.device === group.device);
  const deltas = Object.fromEntries([...scores,'lcp','tbt','cls'].map(key => [key, group.medians[key] - before.medians[key]]));
  const beforeLcp = [...new Set(before.runs.map(x => x.lcpElement?.selector))];
  const afterLcp = [...new Set(group.runs.map(x => x.lcpElement?.selector))];
  // RouteView adds a text-free ancestor; compare the element and its three
  // closest selector segments, plus Lighthouse's unchanged node text/snippet.
  const lcpIdentity = runs => [...new Set(runs.map(({lcpElement:n}) => JSON.stringify({selector:n?.selector?.split(' > ').slice(-3).join(' > '),snippet:n?.snippet,label:n?.nodeLabel})))];
  const summarizeAnimations = runs => [...new Set(runs.flatMap(r => r.nonComposited?.details?.items ?? []).map(item => JSON.stringify({selector:item.node?.selector,failures:item.failureReasons,animation:item.animation})))];
  return { page:group.page,device:group.device,medians:group.medians,deltas,checks:{scores:scores.every(key=>deltas[key]>=0),lcp:deltas.lcp<=50,tbt:deltas.tbt<=20,cls:deltas.cls<=0,sameLcp:JSON.stringify(lcpIdentity(before.runs))===JSON.stringify(lcpIdentity(group.runs)),noWarnings:group.runs.every(x=>x.warnings.length===0),noNewNonComposited:summarizeAnimations(group.runs).every(x=>summarizeAnimations(before.runs).includes(x))},lcpSelectors:afterLcp };
});
fs.writeFileSync(path.join(process.env.QA_OUTPUT || __dirname,'lighthouse-comparison.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
