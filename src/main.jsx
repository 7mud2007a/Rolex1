import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import * as THREE from 'three'
import './styles.css'

const images={
sub:'https://commons.wikimedia.org/wiki/Special:FilePath/Rolex-Submariner.jpg',
sub2:'https://commons.wikimedia.org/wiki/Special:FilePath/Rolex%20Submariner%20diving%20watch.jpg',
gmt:'https://commons.wikimedia.org/wiki/Special:FilePath/Rolex%20GMT%20Master%20II%20-%2016710%20%28without%20background%2C%20cropped%20to%20casing%29.jpg',
gmt2:'https://commons.wikimedia.org/wiki/Special:FilePath/Rolex%20GMT%20Master%20II.jpg',
daydate:'https://commons.wikimedia.org/wiki/Special:FilePath/Rolex%20Day%20Date.jpg',
gold:'https://commons.wikimedia.org/wiki/Special:FilePath/Rolex%20Oysterquartz%20Day-Date%20in%20oro.jpg',
daytona:'https://commons.wikimedia.org/wiki/Special:FilePath/RolexDaytona.jpg',
daytona2:'https://commons.wikimedia.org/wiki/Special:FilePath/Daytona116509.jpg'
}
const products=[
['Submariner','116610LN','$10,000',images.sub,'DIVER',['40 mm','Oystersteel','Black dial'],'A purpose-built diving watch with a quiet, unmistakable silhouette.'],
['Datejust','126334','$11,500',images.sub2,'CLASSIC',['41 mm','Steel & white gold','Blue'],'A balanced everyday icon, polished enough for the evening and restrained enough for every day.'],
['GMT-Master II','16710','$13,800',images.gmt,'TRAVEL',['40 mm','Oystersteel','24-hour bezel'],'A travel watch with a strong graphic bezel and a character built around two time zones.'],
['Daytona','16528','$16,500',images.daytona,'CHRONOGRAPH',['40 mm','Gold','Chronograph'],'A motorsport-born chronograph whose proportions have become part of watchmaking history.'],
['Day-Date','1803','$22,000',images.daydate,'STATEMENT',['36 mm','Yellow gold','Champagne'],'Warm precious metal, a day display and a presence that needs very little introduction.'],
['Explorer','124270','$10,800',images.sub2,'ADVENTURE',['36 mm','Oystersteel','Black'],'Simple, legible and direct — a watch built around the essentials.'],
['Yacht-Master','126622','$14,200',images.gmt2,'SPORT',['40 mm','Oystersteel','Slate'],'Sporting lines and a technical bezel, softened by the polished character of a luxury watch.'],
['Sky-Dweller','326934','$18,500',images.gold,'TRAVEL',['42 mm','Steel & white gold','Blue'],'A sophisticated travel companion with a bold dial and a layered information display.'],
['Oyster Perpetual','124300','$10,200',images.sub,'PURE',['41 mm','Oystersteel','Green'],'The cleanest expression of the Oyster idea: simple, durable and quietly confident.'],
['Sea-Dweller','126600','$14,900',images.sub2,'DEEP',['43 mm','Oystersteel','Black'],'A substantial diving profile made for serious depth and a serious wrist presence.'],
['GMT-Master II','126715','$36,000',images.gmt2,'PRECIOUS',['40 mm','Everose gold','Brown'],'A warmer, collector-focused interpretation of the travel-watch language.'],
['Daytona','116509','$31,000',images.daytona2,'COLLECTOR',['40 mm','White gold','Silver'],'A precious-metal chronograph with a sculptural case and a deeply mechanical personality.']
]
const copy={
en:{nav:['Collection','Experience','Craft','Visit'],kicker:'A private room for exceptional timepieces',hero:'TIME,\nWITHOUT NOISE.',intro:'Real watches. One atmosphere. A digital showroom designed to feel more like a quiet room than a catalogue.',explore:'Explore the collection',view:'View reference',scroll:'Scroll to enter',collectionKicker:'THE COLLECTION',collectionTitle:'Twelve ways to read time.',collectionDesc:'A restrained edit of iconic references. Every piece sits inside the same visual world, so the watch — not the card — remains the focus.',experienceKicker:'THE EXPERIENCE',experienceTitle:'Made to be felt.',experienceText:'Depth, light and movement are used sparingly. The interface responds to you without competing with the objects on display.',stat1:'12 references',stat2:'1 visual language',stat3:'Real photography',craftKicker:'THE CRAFT',craftTitle:'Details deserve silence.',craftText:'Steel catches a different light than gold. A black dial absorbs a room. A bezel changes the way a wrist moves. The site is built around those small differences.',visitKicker:'THE SHOWROOM',visitTitle:'Come see the watch.',visitText:'For availability, private viewing and current pieces, speak directly with the showroom.',call:'Call the showroom',close:'Close',lang:'العربية'},
ar:{nav:['المجموعة','التجربة','الحرفة','المعرض'],kicker:'غرفة هادئة للساعات الاستثنائية',hero:'الوقت،\nبلا ضجيج.',intro:'ساعات حقيقية. أجواء واحدة. صالة رقمية مصممة لتشبه غرفة فاخرة وهادئة أكثر من كونها كتالوجاً.',explore:'استكشف المجموعة',view:'عرض المرجع',scroll:'اسحب للدخول',collectionKicker:'المجموعة',collectionTitle:'اثنا عشر أسلوباً لقراءة الوقت.',collectionDesc:'اختيارات من مراجع أيقونية، كلها داخل أجواء بصرية واحدة حتى تبقى الساعة هي محور المشهد.',experienceKicker:'التجربة',experienceTitle:'مصممة لتُحَس.',experienceText:'عمق وإضاءة وحركة محسوبة. الواجهة تتفاعل معك من دون أن تنافس القطع المعروضة.',stat1:'12 مرجعاً',stat2:'لغة بصرية واحدة',stat3:'صور حقيقية',craftKicker:'الحرفة',craftTitle:'التفاصيل تحب الهدوء.',craftText:'الفولاذ يلتقط الضوء بطريقة مختلفة عن الذهب. القرص الأسود يمتص المكان. الإطار يغيّر إحساس الساعة على المعصم.',visitKicker:'المعرض',visitTitle:'تعال وشاهد الساعة.',visitText:'للتوفر والمشاهدة الخاصة والقطع الحالية، تواصل مباشرة مع المعرض.',call:'اتصل بالمعرض',close:'إغلاق',lang:'English'}
}

function ShaderCanvas(){
const ref=useRef(null)
useEffect(()=>{const canvas=ref.current,scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7))
const u={uTime:{value:0},uResolution:{value:new THREE.Vector2(1,1)},uPointer:{value:new THREE.Vector2(.5,.5)}}
const mat=new THREE.ShaderMaterial({transparent:true,uniforms:u,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}',fragmentShader:'precision highp float;varying vec2 vUv;uniform float uTime;uniform vec2 uResolution;uniform vec2 uPointer;void main(){vec2 p=vUv;p.x*=uResolution.x/uResolution.y;vec2 q=uPointer;q.x*=uResolution.x/uResolution.y;float d=length(p-q);float glow=.34/(1.0+d*8.0)+.13/(1.0+length(p-vec2(uResolution.x/uResolution.y*.72,.18))*14.0);float wave=sin((p.x+p.y)*5.0+uTime*.22)*.012;vec3 col=vec3(.018,.022,.019)+vec3(.64,.49,.18)*(glow*.10)+vec3(.20,.01,.02)*(smoothstep(.8,.1,d)*.08)+wave;gl_FragColor=vec4(col,.92);}'})
scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat))
const resize=()=>{renderer.setSize(innerWidth,innerHeight,false);u.uResolution.value.set(innerWidth,innerHeight)},move=e=>{u.uPointer.value.set(e.clientX/innerWidth,1-e.clientY/innerHeight)}
resize();addEventListener('resize',resize);addEventListener('pointermove',move,{passive:true});let raf;const tick=t=>{u.uTime.value=t*.001;renderer.render(scene,camera);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick)
return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);removeEventListener('pointermove',move);renderer.dispose()}},[])
return <canvas ref={ref} className="shader-canvas"/>
}

function App(){
const [lang,setLang]=useState('en'),[active,setActive]=useState(null),root=useRef(null),t=copy[lang]
useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr'},[lang])
useEffect(()=>{const lenis=new Lenis({duration:1.15,smoothWheel:true});let raf;const loop=time=>{lenis.raf(time);raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);const ctx=gsap.context(()=>{gsap.from('.hero-line',{y:80,opacity:0,duration:1.15,stagger:.08,ease:'power4.out',delay:.15});gsap.from('.hero-meta',{y:20,opacity:0,duration:.9,ease:'power3.out',delay:.65});gsap.to('.hero-watch',{y:-20,rotate:2,duration:3.5,ease:'sine.inOut',repeat:-1,yoyo:true})},root);return()=>{cancelAnimationFrame(raf);ctx.revert();lenis.destroy()}},[])
return <div ref={root} className="site"><ShaderCanvas/><div className="grain"/>
<header className="topbar"><a className="brand" href="#top">ROLEX<span>®</span></a><nav>{t.nav.map((n,i)=><a key={n} href={['#collection','#experience','#craft','#visit'][i]}>{n}</a>)}</nav><div className="top-actions"><button className="lang" onClick={()=>setLang(lang==='en'?'ar':'en')}>{t.lang}</button><a className="phone" href="tel:0966186436">096 618 6436</a></div></header>
<main id="top">
<section className="hero"><div className="hero-copy"><p className="eyebrow hero-line">{t.kicker}</p><h1>{t.hero.split('\n').map((x,i)=><span className="hero-line" key={i}>{x}</span>)}</h1><p className="hero-intro hero-meta">{t.intro}</p><div className="hero-actions hero-meta"><a href="#collection" className="gold-button">{t.explore}<span>↗</span></a><span className="scroll-note"><i/>{t.scroll}</span></div></div><div className="hero-visual"><div className="halo"/><motion.div className="hero-watch" whileHover={{scale:1.035}}><img src={images.sub} alt="Rolex Submariner"/></motion.div><div className="hero-caption"><span>SUBMARINER</span><b>116610LN</b></div></div><div className="edge-word">HOROLOGY</div></section>
<section id="collection" className="section"><div className="section-heading"><div><p className="eyebrow">{t.collectionKicker}</p><h2>{t.collectionTitle}</h2></div><p>{t.collectionDesc}</p></div><div className="product-grid">{products.map((p,i)=><ProductCard key={p[1]+i} p={p} i={i} t={t} onOpen={()=>setActive(p)}/>)}</div></section>
<section id="experience" className="section"><div className="experience-card"><div className="experience-copy"><p className="eyebrow">{t.experienceKicker}</p><h2>{t.experienceTitle}</h2><p>{t.experienceText}</p></div><div className="experience-orbit"><div/><div/><span>01</span></div></div><div className="stats">{[t.stat1,t.stat2,t.stat3].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div></section>
<section id="craft" className="section craft"><div className="craft-image"><img src={images.gold} alt="Rolex gold watch"/></div><div className="craft-copy"><p className="eyebrow">{t.craftKicker}</p><h2>{t.craftTitle}</h2><p>{t.craftText}</p><div className="rule"/><span>STEEL · GOLD · CERAMIC · SAPPHIRE</span></div></section>
<section id="visit" className="section visit"><div><p className="eyebrow">{t.visitKicker}</p><h2>{t.visitTitle}</h2><p>{t.visitText}</p></div><a className="gold-button" href="tel:0966186436">{t.call}<span>↗</span></a></section>
</main><footer><span>© 2026 ROLEX EXPERIENCE</span><span>HOMS · AL-DABLAN STREET · <a href="https://instagram.com/7mud_963" target="_blank" rel="noreferrer">@7mud_963</a></span></footer>
<AnimatePresence>{active&&<Modal p={active} t={t} onClose={()=>setActive(null)}/>}</AnimatePresence></div>
}

function ProductCard({p,i,t,onOpen}){return <motion.article className="product-card" initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.16}} transition={{duration:.7,delay:(i%3)*.06}} whileHover={{y:-8}} onClick={onOpen} tabIndex="0" onKeyDown={e=>e.key==='Enter'&&onOpen()}><div className="card-top"><span>{String(i+1).padStart(2,'0')} / {p[4]}</span><button onClick={e=>e.stopPropagation()}>♡</button></div><div className="product-photo"><div className="photo-glow"/><img src={p[3]} alt={p[0]}/></div><div className="card-bottom"><div><small>{p[1]}</small><h3>{p[0]}</h3><p>{p[5].join(' · ')}</p></div><span className="card-arrow">↗</span></div><div className="card-overlay"><span>{t.view}</span><b>{p[2]}</b></div></motion.article>}

function Modal({p,t,onClose}){return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}><motion.div className="modal" initial={{y:30,scale:.97}} animate={{y:0,scale:1}} exit={{y:20,scale:.98}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><div className="modal-photo"><img src={p[3]} alt={p[0]}/></div><div className="modal-info"><p className="eyebrow">{p[4]} · {p[1]}</p><h2>{p[0]}</h2><strong>{p[2]}</strong><p>{p[6]}</p><div className="chips">{p[5].map(s=><span key={s}>{s}</span>)}</div><a className="gold-button" href="tel:0966186436">{t.call}<span>↗</span></a></div></motion.div></motion.div>}

createRoot(document.getElementById('root')).render(<App/>)
