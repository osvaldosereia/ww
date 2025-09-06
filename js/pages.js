
const toast=(m)=>{const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)};
const loadJSON=async(p)=> (await fetch(p)).json();
// Drawer
function initDrawer(){const btn=document.getElementById('menu-btn');const aside=document.querySelector('.sidebar');const ov=document.getElementById('overlay');
  if(!btn||!aside||!ov) return; const open=()=>{aside.classList.add('open');ov.classList.add('show');ov.hidden=false};
  const close=()=>{aside.classList.remove('open');ov.classList.remove('show');ov.hidden=true};
  btn.addEventListener('click',open); ov.addEventListener('click',close); aside.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
}
document.addEventListener('DOMContentLoaded', async ()=>{
  initDrawer();
  const p=location.pathname;
  if(p.includes('/pages/codigos.html')){
    const d=await loadJSON('data/codigos.json');
    const cats=document.getElementById('code-cats');const list=document.getElementById('code-list');
    const detail=document.getElementById('code-detail');const title=document.getElementById('code-title');const text=document.getElementById('code-text');
    const copy=document.getElementById('code-copy');const close=document.getElementById('code-close'); let current=0;
    const renderCats=()=>{cats.innerHTML=d.categorias.map((c,i)=>`<button class="button ${i===current?'':'secondary'}" data-i="${i}">${c.nome}</button>`).join('');
      cats.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{current=+b.dataset.i;renderCats();renderList();}));};
    const renderList=()=>{const itens=d.categorias[current].codigos; list.innerHTML=itens.map((it,i)=>`
      <div class="item"><div><div class="title">${it.titulo}</div><div class="meta">${d.categorias[current].nome}</div></div>
      <div class="actions"><button class="button secondary" data-view="${i}">Abrir</button></div></div>`).join('');
      list.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>{const it=itens[+el.dataset.view];title.textContent=it.titulo;text.textContent=it.texto;detail.hidden=false;}));};
    renderCats(); renderList(); copy.addEventListener('click',async()=>{await navigator.clipboard.writeText(text.textContent); toast('Texto copiado');}); close.addEventListener('click',()=>detail.hidden=true);
  }
  if(p.includes('/pages/sumulas.html')){
    const d=await loadJSON('data/sumulas.json');const cats=document.getElementById('sum-cats');const list=document.getElementById('sum-list'); let current=0;
    const renderCats=()=>{cats.innerHTML=d.categorias.map((c,i)=>`<button class="button ${i===current?'':'secondary'}" data-i="${i}">${c.nome}</button>`).join('');
      cats.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{current=+b.dataset.i;renderCats();renderList();}));};
    const renderList=()=>{const itens=d.categorias[current].sumulas; list.innerHTML=itens.map((it,i)=>`
      <div class="item"><div><div class="title">${it.codigo} — ${it.titulo}</div><div class="meta">${d.categorias[current].nome}</div></div>
      <div class="actions"><button class="button secondary" data-copy="${i}">Copiar</button></div></div>`).join('');
      list.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',async()=>{const it=itens[+el.dataset.copy];await navigator.clipboard.writeText(`${it.codigo} — ${it.titulo}\n${it.texto}`);toast('Súmula copiada');}));};
    renderCats(); renderList();
  }
  if(p.includes('/pages/jurisprudencias.html')){
    const d=await loadJSON('data/jurisprudencias.json');const cats=document.getElementById('juris-cats');const list=document.getElementById('juris-list'); let current=0;
    const renderCats=()=>{cats.innerHTML=d.categorias.map((c,i)=>`<button class="button ${i===current?'':'secondary'}" data-i="${i}">${c.nome}</button>`).join('');
      cats.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{current=+b.dataset.i;renderCats();renderList();}));};
    const renderList=()=>{const itens=d.categorias[current].decisoes; list.innerHTML=itens.map((it,i)=>`
      <div class="item"><div><div class="title">${it.titulo}</div><div class="meta">${it.tribunal} • ${it.processo||'s/ nº'}</div></div>
      <div class="actions"><button class="button secondary" data-copy="${i}">Copiar</button>${it.link?`<a class="button ghost" href="${it.link}" target="_blank" rel="noopener">Ver</a>`:''}</div></div>`).join('');
      list.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',async()=>{const it=itens[+el.dataset.copy];const txt=`${it.titulo}\n${it.ementa||''}\n${it.tribunal} ${it.processo||''} ${it.link||''}`.trim();await navigator.clipboard.writeText(txt);toast('Jurisprudência copiada');}));};
    renderCats(); renderList();
  }
  if(p.includes('/pages/noticias.html')){
    const d=await loadJSON('data/noticias.json');const list=document.getElementById('news-list');
    list.innerHTML=d.items.map(it=>`<div class="item"><div><div class="title">${it.titulo}</div><div class="meta">${it.site} • ${it.data||''}</div></div>
    <div class="actions"><a class="button secondary" href="${it.link}" target="_blank" rel="noopener">Ver</a></div></div>`).join('');
  }
  if(p.includes('/pages/livros.html')){
    const d=await loadJSON('data/livros.json');const list=document.getElementById('books-list');
    list.innerHTML=d.items.map(it=>`<div class="item"><div><div class="title">${it.titulo}</div><div class="meta">${it.site||it.autor||''} ${it.ano?('• '+it.ano):''}</div></div>
    <div class="actions"><a class="button secondary" href="${it.link}" target="_blank" rel="noopener">Ver</a></div></div>`).join('');
  }
  if(p.includes('/pages/videos.html')){
    const d=await loadJSON('data/videos.json');const list=document.getElementById('videos-list');
    list.innerHTML=d.items.map(it=>`<div class="item"><div><div class="title">${it.titulo}</div><div class="meta">${it.canal||''} ${it.data?('• '+it.data):''}</div></div>
    <div class="actions"><a class="button secondary" href="${it.link}" target="_blank" rel="noopener">Ver</a></div></div>`).join('');
  }
});
