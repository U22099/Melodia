if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>s(e,c),d={module:{uri:c},exports:o,require:t};i[c]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"9316db8aa7ac820a46d0032fe663050d"},{url:"assets/index-_DIXwH50.js",revision:null},{url:"assets/index-r1GW3cSE.css",revision:null},{url:"index.html",revision:"e27526587cb72e95c15aa515a5fe493a"},{url:"jsmediatags.min.js",revision:"03cbf0dc6a088652c116ee3e2f83c249"},{url:"registerSW.js",revision:"5172f62219dc084df337ff7c5cf44e73"},{url:"maskable-icon-512x512.png",revision:"055c780521bfd5fac7d0b9e38092dd03"},{url:"pwa-192x192.png",revision:"7546c74b4e0010c6f9fd50ec49a389af"},{url:"pwa-512x512.png",revision:"a479f5b285911f8e963787691c9c5170"},{url:"pwa-64x64.png",revision:"22f0e0105b835688160ca11935de84bc"},{url:"manifest.webmanifest",revision:"babb1e338be19fd0596c39839dc526ad"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
