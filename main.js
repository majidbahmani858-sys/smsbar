(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* sticky header shadow */
const header=$('.header');
const onScroll=()=>header.classList.toggle('is-stuck',scrollY>10);
addEventListener('scroll',onScroll,{passive:true});onScroll();
/* mobile menu */
const burger=$('#burger'),nav=$('#nav');
const setMenu=o=>{nav.classList.toggle('is-open',o);burger.setAttribute('aria-expanded',o)};
burger.addEventListener('click',()=>setMenu(!nav.classList.contains('is-open')));
$$('a',nav).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>e.key==='Escape'&&setMenu(false));
addEventListener('resize',()=>innerWidth>860&&setMenu(false));
/* scroll reveal */
const items=$$('.reveal');
if('IntersectionObserver' in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{threshold:.12});
 items.forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
}else items.forEach(el=>el.classList.add('is-in'));
/* tabs + swipe */
const tabs=$$('.tabs__list button'),panels=$$('.tpanel'),dots=$$('#dots i');
let cur=0;
const show=i=>{
 cur=(i+tabs.length)%tabs.length;
 tabs.forEach((t,k)=>{t.classList.toggle('is-active',k===cur);t.setAttribute('aria-selected',k===cur)});
 panels.forEach((p,k)=>p.classList.toggle('is-active',k===cur));
 dots.forEach((d,k)=>d.classList.toggle('is-active',k===cur));
 tabs[cur].scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});
};
tabs.forEach((t,i)=>t.addEventListener('click',()=>show(i)));
dots.forEach((d,i)=>d.addEventListener('click',()=>show(i)));
let x0=null,y0=0;const box=$('#tabs');
box.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
box.addEventListener('touchend',e=>{
 if(x0===null)return;
 const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
 if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)) show(dx>0?cur+1:cur-1); // RTL: کشیدن به راست = بعدی
});
})();
