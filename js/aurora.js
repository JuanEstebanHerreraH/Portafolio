(() => {
'use strict';
const canvas=document.querySelector('#aurora-sky');
if(!canvas)return;
const context=canvas.getContext('2d',{alpha:false});
if(!context)return;
let width=0,height=0,frame=0,last=0,visible=true;
const stars=Array.from({length:75},(_,index)=>({x:((index*73+19)%997)/997,y:((index*47+13)%613)/900,r:index%5===0?1.2:.55,phase:index*.71}));
const active=()=>document.documentElement.dataset.motion!=='off'&&!document.hidden&&visible;
function size(){
const rect=canvas.getBoundingClientRect();
width=rect.width;height=rect.height;
const ratio=Math.min(devicePixelRatio||1,1.35,1600/Math.max(1,width));
canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
context.setTransform(ratio,0,0,ratio,0,0);paint(performance.now()/1000);restart();
}
function paint(time){
const ctx=context;
const sky=ctx.createLinearGradient(0,0,width*.3,height);
sky.addColorStop(0,'#0a1727');sky.addColorStop(.4,'#102d41');sky.addColorStop(.75,'#153339');sky.addColorStop(1,'#0a1825');
ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
const halo=ctx.createRadialGradient(width*.78,height*.28,0,width*.78,height*.28,width*.68);
halo.addColorStop(0,'#6ab7bf22');halo.addColorStop(.5,'#37788b19');halo.addColorStop(1,'#17364200');
ctx.fillStyle=halo;ctx.fillRect(0,0,width,height);
for(const star of stars){ctx.globalAlpha=.25+.25*(.5+.5*Math.sin(time*.3+star.phase));ctx.fillStyle='#dcf1e5';ctx.beginPath();ctx.arc(star.x*width,star.y*height,star.r,0,Math.PI*2);ctx.fill();}
ctx.globalAlpha=1;
for(let layer=0;layer<6;layer++){
const top=[],bottom=[];
for(let step=0;step<=85;step++){
const x=(step/85*1.35-.15)*width;
const phase=x/width*5.1+time*.055+layer*.23;
const y=height*(.08+layer*.038)+Math.sin(phase)*height*.105+Math.sin(phase*1.73+time*.025)*height*.055;
const thickness=height*(.08+.045*Math.sin(phase+1));
top.push([x,y]);bottom.push([x,y+thickness]);
}
const glow=ctx.createLinearGradient(0,-height*.08,0,height*.52);
glow.addColorStop(0,'#315f8300');glow.addColorStop(.27,'#7ab6d42a');glow.addColorStop(.5,'#89e1c94b');glow.addColorStop(.7,'#8cbcab18');glow.addColorStop(1,'#3c998000');
ctx.fillStyle=glow;ctx.beginPath();top.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));bottom.reverse().forEach(([x,y])=>ctx.lineTo(x,y));ctx.closePath();ctx.fill();
}
for(let ray=0;ray<45;ray++){
const x=(.2+ray/45*.9)*width;
const y=height*.13+Math.sin(ray*.12+time*.055)*height*.09;
const curtain=ctx.createLinearGradient(x,y-100,x,y+height*.23);
curtain.addColorStop(0,'#86b8e300');curtain.addColorStop(.48,'#94e2ca1b');curtain.addColorStop(1,'#a2e7ba00');
ctx.strokeStyle=curtain;ctx.lineWidth=width/450;ctx.beginPath();ctx.moveTo(x,y-100);ctx.bezierCurveTo(x+20,y,x-12,y+50,x+18,y+height*.23);ctx.stroke();
}
const planetX=width*.86,planetY=height*1.21,radius=height*.54;
const planet=ctx.createRadialGradient(planetX-radius*.3,planetY-radius*.75,0,planetX,planetY,radius);
planet.addColorStop(0,'#345957');planet.addColorStop(.4,'#203d42');planet.addColorStop(1,'#0b1c2a');
ctx.fillStyle=planet;ctx.beginPath();ctx.arc(planetX,planetY,radius,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#9fd6c73b';ctx.lineWidth=.8;ctx.beginPath();ctx.arc(planetX,planetY,radius,-Math.PI,-.05);ctx.stroke();
ctx.save();ctx.beginPath();ctx.arc(planetX,planetY,radius,0,Math.PI*2);ctx.clip();
for(let row=0;row<24;row++){
ctx.beginPath();const base=height*.72+row*height*.025;
for(let step=0;step<65;step++){const x=step/64*width;const y=base+Math.sin(step*.12+row*.4)*height*.025+Math.sin(step*.3+row*.12)*height*.01;step?ctx.lineTo(x,y):ctx.moveTo(x,y);}
ctx.strokeStyle='#b5dfbf12';ctx.lineWidth=.6;ctx.stroke();
}
ctx.restore();
const floor=ctx.createLinearGradient(0,height*.72,0,height);
floor.addColorStop(0,'#08162500');floor.addColorStop(1,'#071320d9');ctx.fillStyle=floor;ctx.fillRect(0,0,width,height);
}
function tick(now){if(!active()){frame=0;return;}if(now-last>42){paint(now/1000);last=now;}frame=requestAnimationFrame(tick);}
function restart(){if(frame)cancelAnimationFrame(frame);frame=0;if(active())frame=requestAnimationFrame(tick);}
addEventListener('resize',size,{passive:true});
addEventListener('motionchange',restart);
document.addEventListener('visibilitychange',restart);
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;restart();},{rootMargin:'100px'}).observe(canvas);
size();
})();
