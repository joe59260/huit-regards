import fs from 'node:fs';
const base=new URL(process.env.PAGES_BASE_URL||'https://joe59260.github.io/huit-regards/');
if(!base.pathname.endsWith('/'))base.pathname+='/';
fs.mkdirSync('_site',{recursive:true});
for(const name of ['index.html','app.js','app.css','styles','sprites','vendor'])fs.cpSync(name,`_site/${name}`,{recursive:true});
for(const name of fs.readdirSync('_site/styles')){
 const file=`_site/styles/${name}`,style=JSON.parse(fs.readFileSync(file));
 if(style.sprite)style.sprite=new URL('sprites/hundertwasser',base).href;
 fs.writeFileSync(file,JSON.stringify(style,null,2)+'\n');
}
let app=fs.readFileSync('_site/app.js','utf8');
app=app.replace(/const PUBLIC_URL='[^']*';/,'const PUBLIC_URL='+JSON.stringify(base.href)+';');
fs.writeFileSync('_site/app.js',app);
console.log('Publication prête : '+base.href);
