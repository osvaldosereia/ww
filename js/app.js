
const toast=(m)=>{const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)};
// Drawer mobile
function initDrawer(){const btn=document.getElementById('menu-btn');const aside=document.querySelector('.sidebar');const ov=document.getElementById('overlay');
  if(!btn||!aside||!ov) return; const open=()=>{aside.classList.add('open');ov.classList.add('show');ov.hidden=false};
  const close=()=>{aside.classList.remove('open');ov.classList.remove('show');ov.hidden=true};
  btn.addEventListener('click',open); ov.addEventListener('click',close); aside.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
}
function buildPrompt(tema,itens){return `Você é um professor de Direito. Tema: "${tema}".\nCrie um material de estudo didático incluindo:\n- ${itens.join("\n- ")}`;}
document.addEventListener('DOMContentLoaded',()=>{
  initDrawer();
  const btn=document.getElementById('btn-criar');const tema=document.getElementById('tema');
  const res=document.getElementById('resultado');const list=document.getElementById('checklist');
  const copy=document.getElementById('btn-copiar');const share=document.getElementById('btn-share');const novo=document.getElementById('btn-novo');
  if(btn){btn.addEventListener('click',()=>{
    const checks=[...document.querySelectorAll('#acc-grid input:checked')].map(i=>i.value);
    const t=(tema?.value||'').trim(); if(!t){toast('Digite um tema.'); tema?.focus(); return;}
    if(checks.length===0){toast('Selecione ao menos 1 estratégia.'); return;}
    list.innerHTML=checks.map(c=>`<span class="badge">✅ ${c}</span>`).join(' ');
    res.hidden=false; window.__prompt=`${buildPrompt(t,checks)}`;
  })}
  copy?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(window.__prompt||'');toast('Prompt copiado!');}catch(e){toast('Falha ao copiar.')}});
  share?.addEventListener('click',async()=>{const text=window.__prompt||''; if(navigator.share){try{await navigator.share({title:'Prompt',text});}catch(_){}}
    else{try{await navigator.clipboard.writeText(text);toast('Copiado (sem Web Share)');}catch(_){}}});
  novo?.addEventListener('click',()=>{document.querySelectorAll('#acc-grid input').forEach(i=>i.checked=false); if(tema) tema.value=''; res.hidden=true; toast('Limpo.')});
});
