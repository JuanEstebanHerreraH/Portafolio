
(() => {
  'use strict';
  const canvas=document.getElementById('signal-field');
  const context=canvas?.getContext('2d',{alpha:true});
  if(!context)return;
  const constrained=Boolean(navigator.connection?.saveData) || (navigator.deviceMemory && navigator.deviceMemory<=2);
  let width=0,height=0,quality=1,frame=0,last=0,ink='',accent='',pointer={x:.5,y:.5};
  const enabled=()=>document.documentElement.dataset.motion!=='off'&&!constrained&&!document.hidden;
  function colors(){const style=getComputedStyle(document.documentElement);ink=style.getPropertyValue('--ink').trim();accent=style.getPropertyValue('--accent').trim();}
  function resize(){
    width=innerWidth;height=innerHeight;
    quality=Math.min(devicePixelRatio||1,1.3,1920/width,1200/height);
    canvas.width=Math.ceil(width*quality);canvas.height=Math.ceil(height*quality);
    context.setTransform(quality,0,0,quality,0,0);colors();draw(0);
  }
  function position(u,line,time){
    const offset=line/17;
    const base=height*(offset*1.3-.15);
    const curve=Math.sin(u*5.3+offset*3.2+time*.09)*height*.047;
    const curl=Math.sin(u*10.2-offset*2.8-time*.05)*height*.017;
    const proximity=Math.exp(-Math.pow((u-pointer.x)*3.3,2));
    return {x:u*width,y:base+curve+curl+Math.sin(offset*8+pointer.y*2)*proximity*14};
  }
  function draw(time){
    context.clearRect(0,0,width,height);
    context.lineWidth=.6;context.strokeStyle=ink;context.globalAlpha=.085;
    for(let line=0;line<18;line++){
      context.beginPath();
      for(let i=0;i<=35;i++){const p=position(i/35,line,time);if(i===0)context.moveTo(p.x,p.y);else context.lineTo(p.x,p.y);}
      context.stroke();
    }
    for(let dot=0;dot<16;dot++){
      const u=((dot*.317+time*(.008+(dot%3)*.003))%1+1)%1;
      const p=position(u,(dot*7)%18,time);
      context.fillStyle=dot%4===0?accent:ink;context.globalAlpha=dot%4===0?.30:.12;
      context.beginPath();context.arc(p.x,p.y,dot%4===0?2.2:1.1,0,Math.PI*2);context.fill();
    }
    context.globalAlpha=1;
  }
  function animate(timestamp){
    if(!enabled()){frame=0;return;}
    if(timestamp-last>=50){last=timestamp;draw(timestamp/1000);}
    frame=requestAnimationFrame(animate);
  }
  function sync(){
    cancelAnimationFrame(frame);frame=0;
    if(enabled())frame=requestAnimationFrame(animate);else draw(0);
    if(!enabled()){atelier?.style.removeProperty('--drift-x');atelier?.style.removeProperty('--drift-y');}
  }
  const atelier=document.querySelector('.hero-atelier');
  const finePointer=matchMedia('(pointer:fine)');
  if(finePointer.matches){
    addEventListener('pointermove',event=>{if(enabled()){pointer.x=event.clientX/width;pointer.y=event.clientY/height;}},{passive:true});
    atelier?.addEventListener('pointermove',event=>{
      if(!enabled())return;const rect=atelier.getBoundingClientRect();
      atelier.style.setProperty('--drift-x',((event.clientX-rect.left)/rect.width-.5)*9+'px');
      atelier.style.setProperty('--drift-y',((event.clientY-rect.top)/rect.height-.5)*7+'px');
    },{passive:true});
    atelier?.addEventListener('pointerleave',()=>{atelier.style.setProperty('--drift-x','0px');atelier.style.setProperty('--drift-y','0px');});
  }
  let resizeFrame;
  addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(resize);},{passive:true});
  addEventListener('themechange',()=>{colors();if(!enabled())draw(0);});
  addEventListener('motionchange',sync);
  document.addEventListener('visibilitychange',sync);
  resize();sync();
})();
