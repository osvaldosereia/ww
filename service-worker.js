
const CACHE='app-v2';const ASSETS=['./index.html','./offline.html','./css/styles.css','./js/app.js','./js/pages.js','./manifest.json',
'./icons/pwa-192.png','./icons/pwa-512.png','./icons/maskable-512.png','./icons/apple-touch-180.png','./icons/logo.png',
'./pages/codigos.html','./pages/sumulas.html','./pages/jurisprudencias.html','./pages/noticias.html','./pages/livros.html','./pages/videos.html','./pages/ajuda.html','./pages/sobre.html',
'./data/codigos.json','./data/sumulas.json','./data/jurisprudencias.json','./data/noticias.json','./data/livros.json','./data/videos.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k))))).then(()=>self.clients.claim())});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.method!=='GET') return;
  if(url.origin===location.origin){
    if(url.pathname.endsWith('.html')||url.pathname==='/'){
      e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r})
        .catch(()=>caches.match(e.request).then(r=>r||caches.match('./offline.html')))); return;
    }
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(r2=>{const cp=r2.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r2;}))); return;
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
