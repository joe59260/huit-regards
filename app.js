'use strict';
const PUBLIC_URL='https://joe59260.github.io/huit-regards/';
const themes=[
 [
  "klein",
  "Klein"
 ],
 [
  "soulages",
  "Soulages"
 ],
 [
  "kandinsky",
  "Kandinsky"
 ],
 [
  "klee",
  "Klee"
 ],
 [
  "matisse",
  "Matisse"
 ],
 [
  "monet",
  "Monet"
 ],
 [
  "niki-de-saint-phalle",
  "Niki de Saint Phalle"
 ],
 [
  "hundertwasser",
  "Hundertwasser"
 ]
];
const destinations={lille:[3.052,50.641,14.1],paris:[2.35,48.856,12],lyon:[4.835,45.764,12],marseille:[5.37,43.296,12],bordeaux:[-0.58,44.84,12],strasbourg:[7.75,48.58,12],gueret:[1.87,46.17,12],bastia:[9.45,42.7,12],reunion:[55.45,-20.88,12],guadeloupe:[-61.53,16.24,12],martinique:[-61.07,14.61,12],guyane:[-52.33,4.94,12],mayotte:[45.23,-12.78,12],france:[2.5,46.5,5]};
const $=id=>document.getElementById(id),params=new URLSearchParams(location.search);
let selected=themes.some(t=>t[0]===params.get('style'))?params.get('style'):'klein';
$('destination').value=Object.hasOwn(destinations,params.get('lieu'))?params.get('lieu'):'lille';
let map,request=0,downloadURL,timer;
function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(timer);timer=setTimeout(()=>$('toast').hidden=true,3500);}
function updateLinks(){
 const t=themes.find(t=>t[0]===selected);
 $('style').value=selected;document.title=t[1]+' — Huit regards';
 $('view-json').href='styles/'+selected+'.json';
 $('download-json').href=downloadURL||'styles/'+selected+'.json';$('download-json').download=selected+'.json';
 const u=new URL(location.href);u.searchParams.set('style',selected);u.searchParams.set('lieu',$('destination').value);history.replaceState(null,'',u);
}
async function loadStyle(key){
 $('download-jpeg').disabled=true;const sequence=++request;$('status').hidden=false;$('status').textContent='Chargement du style…';
 try{
  const response=await fetch('styles/'+key+'.json',{cache:'no-cache'});if(!response.ok)throw new Error('HTTP '+response.status);
  const raw=await response.text(),style=JSON.parse(raw);if(sequence!==request)return;
  if(!map){
   const [lng,lat,zoom]=destinations[$('destination').value];
   map=new maplibregl.Map({container:'map',style,center:[lng,lat],zoom,hash:true,maxZoom:19,canvasContextAttributes:{preserveDrawingBuffer:true}});
   map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
   map.addControl(new maplibregl.ScaleControl({unit:'metric',maxWidth:100}),'bottom-right');
   map.on('error',()=>{$('status').hidden=false;$('status').textContent='Une donnée cartographique n’a pas pu être chargée. Vérifiez votre connexion et rechargez si nécessaire.';});
  }else map.setStyle(style);
  selected=key;if(downloadURL)URL.revokeObjectURL(downloadURL);
  downloadURL=URL.createObjectURL(new Blob([raw],{type:'application/json'}));updateLinks();
  map.once('idle',()=>{if(sequence===request){$('status').hidden=true;$('download-jpeg').disabled=false;}});
 }catch(error){if(sequence!==request)return;$('status').hidden=false;$('status').textContent='Impossible de charger la carte. Ouvrez cette page via GitHub Pages, vérifiez Internet et la compatibilité WebGL de votre navigateur.';console.error(error);}
}
$('style').addEventListener('change',()=>loadStyle($('style').value));
$('destination').addEventListener('change',()=>{if(!map)return;const [lng,lat,zoom]=destinations[$('destination').value];map.flyTo({center:[lng,lat],zoom,bearing:0,pitch:0});updateLinks();});
$('share').addEventListener('click',async()=>{updateLinks();const link=new URL(PUBLIC_URL);link.search=new URL(location.href).search;link.hash=location.hash;try{await navigator.clipboard.writeText(link.href);toast('Lien copié : style, lieu et zoom conservés.');}catch{window.prompt('Copiez ce lien pour partager la carte :',link.href);}});
$('download-jpeg').addEventListener('click',async()=>{
 if(!map||!map.loaded()||map.isMoving()){toast('Attendez la fin du chargement de la carte, puis réessayez.');return;}
 const button=$('download-jpeg');button.disabled=true;
 try{
  const source=map.getCanvas(),canvas=document.createElement('canvas');
  const ratio=source.width/Math.max(source.clientWidth,1),font=Math.max(12,Math.round(12*ratio));
  const lines=['Conception : Joe-Ann Ball','© OpenStreetMap contributors · openstreetmap.org/copyright','Tuiles : OpenFreeMap · openfreemap.org'];
  canvas.width=source.width;canvas.height=source.height+font*5.5;
  const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas indisponible');
  ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(source,0,0);
  ctx.fillStyle='#222';ctx.font=font+'px system-ui';
  lines.forEach((line,i)=>ctx.fillText(line,font,source.height+font*(1.5+i*1.4),canvas.width-font*2));
  const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('Export impossible')),'image/jpeg',0.95));
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;
  a.download=selected+'-'+$('destination').value+'.jpg';document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),60000);toast('JPEG téléchargé, avec les crédits cartographiques.');
 }catch(error){console.error(error);toast('Export JPEG impossible. Vérifiez le chargement des tuiles et réessayez.');}
 finally{button.disabled=false;}
});
updateLinks();loadStyle(selected);
