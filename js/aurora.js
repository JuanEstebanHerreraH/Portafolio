/* Atmosphere runs in compositor CSS layers; JS only handles visibility and finite typing. */
(() => {
'use strict';
const root=document.documentElement,hero=document.querySelector('.hero'),message=document.querySelector('#assistant-message'),announcement=document.querySelector('#assistant-announcement');
if(!hero||!message)return;
const messages={
es:{hello:'Cada órbita abre una herramienta. Elige una.',xIas:'xIas: datos más claros, con revisión antes de cambiar.',Recorta:'Recorta: una imagen puede tener otra vida.',logitree:'LogiTree: conectamos interfaz, API y conocimiento.','cafe-almacen':'Café Almacén: del proceso al dato, sin perder el rastro.',Arcionr:'Arcionr: menos pasos para trabajar con archivos.',development:'Una petición, una respuesta. Prueba el recorrido.',desktop:'La IA también puede trabajar en tu propio equipo.',networks:'Dividir una red es darle espacio para crecer.',office:'Ordenar, revisar y calcular. Pruébalo aquí.',automation:'Un flujo claro ahorra pasos repetitivos.'},
en:{hello:'Every orbit opens a tool. Pick one.',xIas:'xIas: clearer data, with review before changes.',Recorta:'Recorta: an image can have another life.',logitree:'LogiTree: connecting UI, APIs and knowledge.','cafe-almacen':'Café Almacén: follow a process through its data.',Arcionr:'Arcionr: fewer steps for working with files.',development:'One request, one response. Try the flow.',desktop:'AI can work on your own computer, too.',networks:'Splitting a network gives it room to grow.',office:'Organize, review and calculate. Try it here.',automation:'Clear workflows save repetitive steps.'}
};
let timer=0,full='',visible=true;
const text=key=>messages[root.lang==='en'?'en':'es'][key]||messages[root.lang==='en'?'en':'es'].hello;
function stop(){clearTimeout(timer);timer=0;message.textContent=full;}
function say(key){
stop();full=text(key);announcement.textContent=full;
if(root.dataset.motion==='off'||!visible||document.hidden){message.textContent=full;return;}
let i=0;message.textContent='';
function write(){i=Math.min(i+3,full.length);message.textContent=full.slice(0,i);if(i<full.length)timer=setTimeout(write,28);else timer=0;}
write();
}
function visibility(){root.dataset.pageVisible=String(!document.hidden);if(document.hidden)stop();}
document.addEventListener('visibilitychange',visibility);
addEventListener('motionchange',stop);
addEventListener('languagechange',()=>say('hello'));
document.querySelectorAll('.tool-beacon').forEach(button=>{
button.addEventListener('pointerenter',()=>say(button.dataset.selectTool));
button.addEventListener('focus',()=>say(button.dataset.selectTool));
});
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{
visible=entries[0].isIntersecting;root.dataset.heroVisible=String(visible);if(!visible)stop();
}).observe(hero);else root.dataset.heroVisible='true';
visibility();say('hello');
})();
