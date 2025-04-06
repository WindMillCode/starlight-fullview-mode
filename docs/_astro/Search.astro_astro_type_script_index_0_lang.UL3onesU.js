const q="modulepreload",A=function(e){return"/starlight-fullview-mode/"+e},k={},T=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=o?.nonce||o?.getAttribute("nonce");r=Promise.allSettled(n.map(l=>{if(l=A(l),l in k)return;k[l]=!0;const d=l.endsWith(".css"),v=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${v}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":q,d||(u.as="script"),u.crossOrigin="",u.href=l,i&&u.setAttribute("nonce",i),document.head.appendChild(u),d)return new Promise((m,a)=>{u.addEventListener("load",m),u.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${l}`)))})}))}function c(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return r.then(o=>{for(const i of o||[])i.status==="rejected"&&c(i.reason);return t().catch(c)})},U={ranking:{pageLength:.1,termFrequency:.1,termSaturation:2,termSimilarity:9}},p={base:"/starlight-fullview-mode"},y={zenModeSettings:{enabled:!0,exclude:[],keyboardShortcut:[]}},$={defaultLocale:{}};function g(e){return e.startsWith("/")?e.slice(1):e}function w(e){return e.endsWith("/")?e.slice(0,-1):e}function M(e){return e.replace(/\/+/g,"/").replace(/^\/|\/$/g,"")}function E(e,t,n){const s=e.startsWith("/"),r=e.endsWith("/"),c=e.split("/").filter((i,l,d)=>i!==""||l===0&&!s||l===d.length-1&&!r);c.splice(n,0,t);let o=c.join("/");return s&&(o="/"+o),r&&(o+="/"),o}function z(e,t){return M(e).startsWith(M(t))}function P(e,t){const n=L(e),s=C();if(n===t||!s.includes(t)&&t!==void 0)return e;if(t??="",n===e)return t;const r=e.startsWith("/");if(n)return`${r?"/":""}${e.replace(`${n}/`,t?`${t}/`:"").replace(/^\/+/,"")}`;const c=p?.base,o=z(e,c)?c.split("/").filter(Boolean).length:0;return E(e,t,o)}function L(e){const t=Object.keys($.locales??{}),n=p?.base,s=n.split("/").filter(Boolean),r=g(e).split("/"),c=z(e,n)?s.length:0,o=r[c];return o&&t.includes(o)?o:void 0}function C(){const{locales:e={},defaultLocale:t}=$;return[e===void 0||e.root?void 0:t.locale,...Object.keys(e).filter(n=>n!==t.locale&&n!=="root")]}function O(e){return e.map(n=>P(n,void 0)),C().map(n=>e.map(s=>P(s,n))).flat()}const W=e=>{const t=e.toLowerCase().split("+");return{keys:t.filter(n=>!["ctrl","shift","alt"].includes(n)),ctrl:t.includes("ctrl"),shift:t.includes("shift"),alt:t.includes("alt")}},B=(e,t)=>(t.ctrl?e.ctrlKey||e.metaKey:!0)&&(t.shift?e.shiftKey:!0)&&(t.alt?e.altKey:!0)&&t.keys.includes(e.key.toLowerCase()),I=[{name:"default",title:"starlightViewModes.defaultMode.title"},{name:"zen-mode",title:"starlightViewModes.zenMode.title",enabled:y.zenModeSettings.enabled,exclude:O(y.zenModeSettings.exclude),enableIcon:'<path d="M22 13a10 10 0 1 0-20 0c0 4.32 3.09 10 10 10 6.93 0 10-5.7 10-10zm-10 8a8.01 8.01 0 0 1 0-16 8.01 8.01 0 0 1 0 16zm3-4H9v-1.57l3.82-4.83H9V9h6v1.58l-3.79 4.84H15V17zM.8 8.71a4.99 4.99 0 0 1 6.91-6.9 12.04 12.04 0 0 0-6.9 6.9zM19 1a5 5 0 0 0-2.72.8 12.06 12.06 0 0 1 6.92 6.91A4.99 4.99 0 0 0 19 1z" />',disableIcon:'<path d="M22 13a10 10 0 1 0-20 0c0 4.32 3.08 10 10 10 6.93 0 10-5.7 10-10Zm-10 8a8.01 8.01 0 0 1 0-16 8.01 8.01 0 0 1 0 16ZM.8 8.71a4.99 4.99 0 0 1 6.91-6.9 12.04 12.04 0 0 0-6.9 6.9ZM19 1a5 5 0 0 0-2.72.8 12.06 12.06 0 0 1 6.92 6.91A4.99 4.99 0 0 0 19 1Z" /><path d="M14.22 9.72 12 11.94 9.78 9.72a.75.75 0 0 0-1.06 1.06L10.94 13l-2.22 2.22a.75.75 0 0 0 1.06 1.06L12 14.06l2.23 2.22a.75.75 0 0 0 1.06-1.06L13.06 13l2.22-2.22a.75.75 0 0 0-1.06-1.06Z" />',keyboardShortcut:y.zenModeSettings.keyboardShortcut.map(W)}];I.filter(K);function K(e){return e.name!=="default"}function b(e,t){if(t==="default")return e;const n=p?.base,s=L(e),r=n.split("/").filter(Boolean).length+(s?1:0);return E(e,t,r)}async function _(e){let t=g(w(e));const n=g(w(p.base)),s=L(t);return n&&(t=t.startsWith(`${n}/`)?t.slice(n.length+1):t.startsWith(`${n}`)?t.slice(n.length):t),s&&(t=t.startsWith(`${s}/`)?t.slice(s.length+1):t.startsWith(`${s}`)?t.slice(s.length):t),I.find(r=>t.startsWith(`${r.name}`))?.name||"default"}async function R(e,t){t=g(w(t));const n=await _(e);if(n===t)return e;if(t==="default")return e.includes(`${n}/`)?e.replace(`${n}/`,""):e.replace(`${n}`,"");let s=e;return n!=="default"&&(s=e.includes("/")?e.replace(`${n}/`,""):e.replace(`${n}`,"")),b(s,t)}class x extends HTMLElement{constructor(){super();const t=this.querySelector("button[data-open-modal]"),n=this.querySelector("button[data-close-modal]"),s=this.querySelector("dialog"),r=this.querySelector(".dialog-frame"),c=a=>{("href"in(a.target||{})||document.body.contains(a.target)&&!r.contains(a.target))&&i()},o=a=>{s.showModal(),document.body.toggleAttribute("data-search-modal-open",!0),this.querySelector("input")?.focus(),a?.stopPropagation(),window.addEventListener("click",c)},i=()=>s.close();t.addEventListener("click",o),t.disabled=!1,n.addEventListener("click",i),s.addEventListener("close",()=>{document.body.toggleAttribute("data-search-modal-open",!1),window.removeEventListener("click",c)});let l=[];try{l=JSON.parse(this.dataset.shortcuts||"[]").map(W)}catch{}window.addEventListener("keydown",async a=>{(a.metaKey===!0||a.ctrlKey===!0)&&a.key==="k"&&(s.open?i():o(),a.preventDefault());for(const h of l)if(B(a,h)){const f=await R(window.location.pathname,await _(window.location.pathname)==="default"?"zen-mode":"default");window.location.pathname=f,a.preventDefault()}});let d={};try{d=JSON.parse(this.dataset.translations||"{}")}catch{}const m=this.dataset.stripTrailingSlash!==void 0?a=>a.replace(/(.)\/(#.*)?$/,"$1$2"):a=>a;window.addEventListener("DOMContentLoaded",()=>{(window.requestIdleCallback||(h=>setTimeout(h,1)))(async()=>{const{PagefindUI:h}=await T(async()=>{const{PagefindUI:f}=await import("./ui-core.BX6kFxIy.js");return{PagefindUI:f}},[]);new h({...U,element:"#starlight__search",baseUrl:"/starlight-fullview-mode",bundlePath:"/starlight-fullview-mode".replace(/\/$/,"")+"/pagefind/",showImages:!1,translations:d,showSubResults:!0,processResult:async f=>{f.url=await b(m(f.url),this.dataset.mode??"default"),f.sub_results=await Promise.all(f.sub_results.map(async S=>(S.url=await b(m(S.url),this.dataset.mode??"default"),S)))}})})})}}customElements.define("site-search",x);export{T as _};
