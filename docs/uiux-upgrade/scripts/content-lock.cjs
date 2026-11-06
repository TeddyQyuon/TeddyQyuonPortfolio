const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const parser=require(path.join(process.cwd(),'node_modules/@babel/parser'));
const baseline=process.argv[2]||'f205a3e';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name).replaceAll('\\','/')]);
const old=execFileSync('git',['ls-tree','-r','--name-only',baseline,'--','src'],{encoding:'utf8'}).trim().split(/\r?\n/);
const files=[...new Set([...old,...walk('src')])].filter(x=>/\.(js|jsx)$/.test(x));
const protectedAttributes=new Set(['label','hint','unit','value','eyebrow','index','title','alt','aria-label','aria-controls','aria-labelledby','aria-describedby','href','to','path','id','role']);
const normalize=value=>{
 if(Array.isArray(value))return value.map(normalize);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([key])=>!['start','end','loc','extra','leadingComments','trailingComments','innerComments'].includes(key)).map(([key,item])=>[key,normalize(item)]));
 return value;
};
function snapshot(source){
 if(!source)return[];
 const ast=parser.parse(source,{sourceType:'module',plugins:['jsx']});const result=[];
 const strings=node=>{
  if(!node||typeof node!=='object'||['JSXElement','JSXFragment'].includes(node.type))return;
  if(node.type==='StringLiteral')result.push(['rendered-string',node.value]);
  if(node.type==='TemplateElement')result.push(['rendered-template',node.value.cooked]);
  Object.values(node).forEach(value=>{if(Array.isArray(value))value.forEach(strings);else if(value&&typeof value==='object')strings(value);});
 };
 const visit=(node,parent)=>{
  if(!node||typeof node!=='object')return;
  if(node.type==='JSXText'){const text=node.value.replace(/\s+/g,' ').trim();if(text)result.push(['text',text]);}
  if(node.type==='JSXAttribute'&&protectedAttributes.has(node.name?.name))result.push(['attribute',node.name.name,normalize(node.value)]);
  if(node.type==='JSXExpressionContainer'&&parent?.type!=='JSXAttribute')strings(node.expression);
  Object.values(node).forEach(value=>{if(Array.isArray(value))value.forEach(child=>visit(child,node));else if(value&&typeof value==='object')visit(value,node);});
 };visit(ast,null);return result;
}
for(const file of files){
 let before='';try{before=execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8',stdio:['ignore','pipe','ignore']});}catch{}
 const after=fs.existsSync(file)?fs.readFileSync(file,'utf8'):'';
 assert.deepEqual(snapshot(after),snapshot(before),file+': rendered content changed');
}
execFileSync('git',['diff','--exit-code',baseline,'--','src/data','public','index.html','vercel.json','package.json','package-lock.json']);
console.log(JSON.stringify({baseline,filesCompared:files.length,renderedContent:'unchanged',protectedFiles:'unchanged'}));
