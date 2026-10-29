/* Five bounded demonstrations of skills. No external services or AI model. */
(() => {
'use strict';
const panel=document.querySelector('#skill-panel');
if(!panel)return;
const modeState={development:false,desktop:false,networks:0,office:false,automation:false};
const lang=()=>document.documentElement.lang==='en'?'en':'es';
const copy={
es:{
development:{title:'De la petición al dato.',hint:'Consulta una API de ejemplo.',button:'Consultar productos',reset:'Reiniciar consulta',tech:['Java','Spring Boot','React','TypeScript','SQL'],projects:[['logitree','LogiTree'],['cafe-almacen','Café Almacén']]},
desktop:{title:'Una imagen. Otro resultado.',hint:'Previsualiza el recorte de una ilustración.',button:'Mostrar sin fondo',reset:'Restaurar fondo',tech:['C# / .NET','Tauri','ONNX','OCR','IA local'],projects:[['Recorta','Recorta'],['xIas','xIas']]},
networks:{title:'Una red. Espacio para crecer.',hint:'Divide la red y mira sus rangos.',button:'Dividir en /26',next:'Dividir en /28',reset:'Volver a /24',tech:['VLAN','VLSM','Cisco IOS','Packet Tracer','PowerShell'],projects:[['Vlanets','Vlanets'],['Coexfix','CoexFix']]},
office:{title:'Datos que sí se entienden.',hint:'Limpia, elimina duplicados y suma.',button:'Ordenar y calcular',reset:'Restablecer tabla',tech:['Excel','Macros','Word','PowerPoint','Google Sheets'],projects:[['xIas','xIas'],['Arcionr','Arcionr']]},
automation:{title:'Tres archivos. Menos pasos.',hint:'Prueba un flujo con reglas de ejemplo.',button:'Organizar ejemplos',reset:'Restablecer archivos',tech:['PowerShell','Python · bases','Prompts','IA asistida','Revisión'],projects:[['Arcionr','Arcionr'],['FileWatch','FileWatch']]},
label:'DEMO INTERACTIVA',proof:'HERRAMIENTAS DONDE LO APLICO',note:'Ejemplos ilustrativos. Sin cargar archivos ni modelos de IA.',ready:'Listo para probar',item:'Producto',qty:'Cant.',mouse:'Ratón USB',keyboard:'Teclado',unit:'unidades',rows:'filas',hosts:'hosts / red',subnets:'subredes',range:'Rango de equipos',more:'más',transparent:'Vista sobre transparencia',response:'Respuesta',local:'Datos de ejemplo',file:'Archivo',folder:'Destino',review:'Revisar',rule:'Reglas',input:'Entrada',code:'Código',clean:'Espacios y duplicados',apiIdle:'Cliente → API → Base de datos',apiDone:'200 OK · 2 productos activos',automationDone:'3 nombres normalizados y agrupados',networkDone:'Direccionamiento calculado'
},
en:{
development:{title:'From request to data.',hint:'Query an illustrative API.',button:'Query products',reset:'Reset query',tech:['Java','Spring Boot','React','TypeScript','SQL'],projects:[['logitree','LogiTree'],['cafe-almacen','Café Almacén']]},
desktop:{title:'One image. A new result.',hint:'Preview a cutout illustration.',button:'Show without background',reset:'Restore background',tech:['C# / .NET','Tauri','ONNX','OCR','Local AI'],projects:[['Recorta','Recorta'],['xIas','xIas']]},
networks:{title:'One network. Room to grow.',hint:'Split the network. See its ranges.',button:'Split into /26',next:'Split into /28',reset:'Back to /24',tech:['VLAN','VLSM','Cisco IOS','Packet Tracer','PowerShell'],projects:[['Vlanets','Vlanets'],['Coexfix','CoexFix']]},
office:{title:'Data that makes sense.',hint:'Clean, deduplicate and add up.',button:'Clean and calculate',reset:'Reset table',tech:['Excel','Macros','Word','PowerPoint','Google Sheets'],projects:[['xIas','xIas'],['Arcionr','Arcionr']]},
automation:{title:'Three files. Fewer steps.',hint:'Try a workflow with sample rules.',button:'Organize examples',reset:'Reset files',tech:['PowerShell','Python · basics','Prompts','AI assistance','Review'],projects:[['Arcionr','Arcionr'],['FileWatch','FileWatch']]},
label:'INTERACTIVE DEMO',proof:'TOOLS WHERE I APPLY IT',note:'Illustrative examples. No files or AI models loaded.',ready:'Ready to try',item:'Product',qty:'Qty.',mouse:'USB mouse',keyboard:'Keyboard',unit:'units',rows:'rows',hosts:'hosts / network',subnets:'subnets',range:'Host range',more:'more',transparent:'Transparency preview',response:'Response',local:'Sample data',file:'File',folder:'Destination',review:'Review',rule:'Rules',input:'Input',code:'Code',clean:'Spaces and duplicates',apiIdle:'Client → API → Database',apiDone:'200 OK · 2 active products',automationDone:'3 filenames normalized and grouped',networkDone:'Addressing calculated'
}};
const plant='<svg viewBox="0 0 160 150" aria-hidden="true"><ellipse cx="80" cy="138" rx="38" ry="6" fill="#102f2933"/><path d="M60 83h40l-7 51H67Z" fill="#efdec1"/><path d="M60 83h40l-7 12H62Z" fill="#d7c29b"/><path d="M80 91V29M80 67 57 50M80 52l24-23" fill="none" stroke="#244f3c" stroke-width="3"/><path d="M79 61C49 62 37 47 36 31 60 32 78 42 79 61Z" fill="#557950"/><path d="M81 50c-2-23 11-37 35-40 0 24-13 39-35 40Z" fill="#91ac6b"/><path d="M80 35C59 26 61 12 64 3c17 8 22 18 16 32Z" fill="#c8d69b"/></svg>';
const arrow='<span class="flow-arrow" aria-hidden="true">→</span>';
function render(){
const mode=panel.dataset.scene||'development',d=copy[lang()],s=d[mode],done=modeState[mode];
let visual='',result=d.ready,button=done?s.reset:s.button;
if(mode==='development'){
const products=[{id:'001',name:d.mouse,active:true},{id:'002',name:d.keyboard,active:true},{id:'003',name:'Monitor',active:false}];
const rows=done?products.filter(p=>p.active):[];
visual='<div class="api-flow '+(done?'is-done':'')+'"><div><span>UI</span><strong>React</strong></div>'+arrow+'<div><span>API</span><strong>Spring</strong></div>'+arrow+'<div><span>DB</span><strong>SQL</strong></div></div><div class="code-sample"><span class="code-method">GET</span><code>/api/productos?activo=true</code></div><div class="api-response"><span>'+d.response+'</span><div class="api-result-list">'+(done?rows.map(row=>'<div><code>'+row.id+'</code><strong>'+row.name+'</strong><span aria-hidden="true">✓</span></div>').join(''):'<div class="result-skeleton"><span></span><span></span></div><div class="result-skeleton"><span></span><span></span></div>')+'</div></div>';
result=done?d.apiDone:d.apiIdle;
}else if(mode==='desktop'){
visual='<div class="cutout-stage '+(done?'is-cut':'')+'"><div class="cutout-label">'+(done?'PNG / α':'JPG / RGB')+'</div>'+plant+'<span class="cutout-corner c1"></span><span class="cutout-corner c2"></span><span class="cutout-corner c3"></span><span class="cutout-corner c4"></span></div>';
result=done?d.transparent:d.local;
}else if(mode==='networks'){
const prefix=[24,26,28][Number(done)],size=2**(32-prefix),count=2**(prefix-24),hosts=size-2;
visual='<div class="network-overview"><span>192.168.10.0 / '+prefix+'</span><strong>'+count+'<small>'+d.subnets+'</small></strong><strong>'+hosts+'<small>'+d.hosts+'</small></strong></div><div class="subnet-map">'+Array.from({length:Math.min(count,4)},(_,i)=>'<div class="subnet-block"><span>192.168.10.'+(i*size)+'/'+prefix+'</span><small>.'+(i*size+1)+' — .'+(i*size+size-2)+'</small></div>').join('')+'</div>'+(count>4?'<p class="subnet-more">+ '+(count-4)+' '+d.more+'</p>':'');
button=Number(done)===0?s.button:Number(done)===1?s.next:s.reset;
result=Number(done)===0?d.range:d.networkDone;
}else if(mode==='office'){
const rows=[{id:'001',name:d.mouse.replace(' ','   '),qty:4},{id:'002',name:' '+d.keyboard+' ',qty:2},{id:'001',name:d.mouse,qty:4}];
const table=done?[...new Map(rows.map(row=>[row.id,{...row,name:row.name.trim().replace(/\s+/g,' ')}])).values()]:rows;
visual='<div class="sheet-top"><span>ƒx</span><code>'+(done?'SUMA(C2:C3)':'—')+'</code><strong>'+(done?table.reduce((n,row)=>n+row.qty,0):'—')+'</strong></div><table class="skill-table"><thead><tr><th>'+d.code+'</th><th>'+d.item+'</th><th>'+d.qty+'</th></tr></thead><tbody>'+table.map(row=>'<tr><td>'+row.id+'</td><td class="sheet-name">'+row.name+'</td><td>'+row.qty+'</td></tr>').join('')+'</tbody></table>';
result=done?'3 → 2 '+d.rows+' · 6 '+d.unit:d.clean;
}else{
const files=['Factura  Abril.PDF','foto  producto.PNG','Stock  2026.xlsx'];
const normalized=files.map(name=>{const ext=name.split('.').pop().toLowerCase();const folder=ext==='png'?'imagenes':ext==='xlsx'?'tablas':'documentos';const base=name.slice(0,name.lastIndexOf('.')).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-');return folder+'/'+base+'.'+ext;});
visual='<div class="automation-flow '+(done?'is-done':'')+'"><span>'+d.input+'</span>'+arrow+'<span>'+d.rule+'</span>'+arrow+'<span>'+d.review+'</span></div><div class="file-routes">'+files.map((name,i)=>'<div><span class="file-shape" aria-hidden="true">↳</span><code>'+(done?normalized[i]:name)+'</code><span class="file-check">'+(done?'✓':'·')+'</span></div>').join('')+'</div>';
result=done?d.automationDone:d.local;
}
panel.innerHTML='<article class="skill-scene"><div class="skill-scene-heading"><div><h3>'+s.title+'</h3><p>'+s.hint+'</p></div><span class="scene-demo-label">'+d.label+'</span></div><div class="skill-scene-grid"><div class="skill-visual" data-result="'+Boolean(done)+'">'+visual+'</div><aside class="skill-toolkit"><div class="skill-keywords">'+s.tech.map(name=>'<span>'+name+'</span>').join('')+'</div><div class="skill-proof"><p>'+d.proof+'</p>'+s.projects.map(([id,name])=>'<button data-open-case="'+id+'">'+name+' <span aria-hidden="true">↗</span></button>').join('')+'</div></aside></div><div class="scene-action-row"><button id="scene-action" class="button button-dark" data-skill-action>'+button+' <span aria-hidden="true">↗</span></button><p class="scene-result" role="status" aria-live="polite">'+result+'</p></div><p class="scene-note">'+d.note+'</p></article>';
}
panel.addEventListener('click',event=>{
if(!event.target.closest('[data-skill-action]'))return;
const mode=panel.dataset.scene||'development';
modeState[mode]=mode==='networks'?(Number(modeState[mode])+1)%3:!modeState[mode];
render();document.querySelector('#scene-action').focus({preventScroll:true});
window.dispatchEvent(new CustomEvent('skillaction',{detail:{mode}}));
});
addEventListener('skillschange',render);
render();
})();
