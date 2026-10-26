const { JSDOM } = require('jsdom'); const fs = require('fs'); const A=require('path').join(__dirname,'..','app')+'/'; // npm i jsdom@24
const html = fs.readFileSync(A+'index.html','utf8').replace(/<script src="js\/(\w+)\.js"><\/script>/g,(m,n)=>`<script>${fs.readFileSync(A+'js/'+n+'.js','utf8')}</script>`).replace(/<link[^>]+>/g,'');
const errs=[]; const dom = new JSDOM('<!doctype html><html><body>'+html+'</body></html>', { runScripts:'dangerously', pretendToBeVisual:true, url:'https://x.test/' });
const w=dom.window; w.addEventListener('error',e=>errs.push(e.message)); w.scrollTo=()=>{}; w.HTMLElement.prototype.scrollIntoView=()=>{};
const $=s=>w.document.querySelector(s), $$=s=>[...w.document.querySelectorAll(s)];
const click=el=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
setTimeout(()=>{
 try{
 console.log('tiles', $$('.tile').length);
 for (let t=0;t<$$('.tile').length;t++){ click($('[data-view="temario"]')); click($$('.tile')[t]); console.log(' topic', $('h1').textContent, 'figs', $$('.fig').length, 'svg', $$('.fig svg').length); }
 for (const v of ['resumenes','flashcards','test','cabina','chuleta']) { click($(`[data-view="${v}"]`)); console.log(v, 'ok', $('h1').textContent); }
 click($('[data-view="flashcards"]')); click($('#fc')); click($('#yes')); console.log('fc after:', $('.qbar .muted')&&$('.qbar .muted').textContent);
 click($('[data-view="test"]')); click($('#start')); let vz=0;
 for(let k=0;k<20;k++){ if($('.vizbox svg')) vz++; const o=$$('.opt'); click(o[0]); if($('#check')) click($('#check')); click($('#next')); }
 console.log('result', $('h1').textContent, 'viz shown', vz);
 click($('[data-view="cabina"]')); const sc=$$('[data-s]'); console.log('scenarios', sc.length);
 let insts=0;
 for (let s=0;s<sc.length;s++){ click($('[data-view="cabina"]')); click($$('[data-s]')[s]); let guard=0; while($('#ck')||$('#nx')){ if(guard++>40)break; if($('#ck')){ if($('.panelinst svg')) insts++; click($$('.opt')[0]); click($('#ck')); } else click($('#nx')); } if(!$('#rep')) console.log('scenario stuck', s); }
 console.log('last scen:', $('h1').textContent, '|', $('.view-head p').textContent, 'inst steps', insts);
 // intercept trainer
 let ok=0;
 for(let i=0;i<30;i++){ click($('[data-view="cabina"]')); click($('[data-tab="int"]')); const b=$$('#tipo button'); click(b[i%2]); if($('#hdgin')){ $('#hdgin').value='100'; click($('#chk')); } else if($$('#ans .opt').length) click($$('#ans .opt')[0]); if($('#fb .feedback')) ok++; }
 console.log('intercept feedbacks', ok, '|', $('#fb .feedback').textContent.slice(0,140));
 ok=0; for(let i=0;i<30;i++){ click($('[data-view="cabina"]')); click($('[data-tab="hold"]')); click($$('#cab .opt')[i%3]); if($('#cab .feedback')) ok++; }
 console.log('hold feedbacks', ok, '|', $('#cab .feedback').textContent.slice(0,160));
 }catch(e){ console.log('EXC', e.stack); }
 console.log('errors', errs);
},300);
