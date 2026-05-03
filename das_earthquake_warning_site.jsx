import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Shield, MapPin, Users, Activity, Globe } from 'lucide-react';

const cities = [
{name:'Tokyo',x:82,y:28,base:{alert:18,cas:4200,dam:6200,conf:71},das:{alert:29,cas:3100,dam:5100,conf:86}},
{name:'Osaka',x:84,y:33,base:{alert:14,cas:2500,dam:4100,conf:69},das:{alert:24,cas:1800,dam:3300,conf:84}},
{name:'Manila',x:86,y:42,base:{alert:10,cas:3800,dam:2900,conf:63},das:{alert:19,cas:2800,dam:2300,conf:80}},
{name:'Jakarta',x:79,y:54,base:{alert:9,cas:3400,dam:2600,conf:61},das:{alert:17,cas:2550,dam:2100,conf:79}},
{name:'Mexico City',x:18,y:38,base:{alert:22,cas:2900,dam:5400,conf:74},das:{alert:33,cas:2100,dam:4400,conf:88}},
{name:'Los Angeles',x:12,y:34,base:{alert:16,cas:1700,dam:7200,conf:72},das:{alert:27,cas:1200,dam:6100,conf:87}},
{name:'San Francisco',x:10,y:28,base:{alert:14,cas:1400,dam:6800,conf:70},das:{alert:25,cas:950,dam:5600,conf:86}},
{name:'Santiago',x:22,y:78,base:{alert:19,cas:2200,dam:4800,conf:73},das:{alert:30,cas:1600,dam:3900,conf:88}},
{name:'Lima',x:18,y:68,base:{alert:17,cas:2600,dam:4300,conf:71},das:{alert:28,cas:1900,dam:3500,conf:86}},
{name:'Istanbul',x:56,y:26,base:{alert:8,cas:6200,dam:7600,conf:60},das:{alert:16,cas:4700,dam:6500,conf:78}},
{name:'Kathmandu',x:70,y:34,base:{alert:7,cas:4100,dam:1800,conf:58},das:{alert:15,cas:3000,dam:1450,conf:76}},
{name:'Wellington',x:96,y:82,base:{alert:13,cas:900,dam:2500,conf:68},das:{alert:23,cas:620,dam:2050,conf:84}},
];

function Row({label,a,b}){return <div className='grid grid-cols-3 gap-2 py-2 border-b text-sm'><div>{label}</div><div className='font-semibold'>{a}</div><div className='font-semibold text-cyan-700'>{b}</div></div>}

export default function DASSite(){
const [selected,setSelected]=useState(cities[0]);
const roles=['DAS / Fiber Engineering','Seismology / EEW','Signal Processing / ML','Data Standards','Field Deployment','Partnerships'];
return <div className='min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 text-white'>
<nav className='sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-slate-950/70'>
 <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
  <div className='font-bold text-xl bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent'>DAS Early Warning Initiative</div>
  <div className='hidden md:flex gap-6 text-sm'>
   <a href='#map' className='hover:text-cyan-300'>Map</a>
   <a href='#objectives' className='hover:text-cyan-300'>Objectives</a>
   <a href='#team' className='hover:text-cyan-300'>Team</a>
   <a href='#join' className='hover:text-cyan-300'>Join</a>
  </div>
 </div>
</nav>

<section className='max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center'>
 <div>
  <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-200 text-sm mb-4'><Shield size={16}/> Public-Interest Seismic Infrastructure</div>
  <h1 className='text-5xl md:text-6xl font-bold leading-tight'>Earlier Earthquake Warning from Existing Underwater Fiber</h1>
  <p className='mt-5 text-lg text-slate-300'>Build a standardized DAS layer that turns submarine cables into trusted seismic sensors for faster alerts, better resilience, and richer predictive data.</p>
  <div className='mt-7 flex gap-3'>
   <a href='#map' className='px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 font-semibold text-slate-950'>Explore the Map</a>
   <a href='#join' className='px-5 py-3 rounded-2xl border border-white/20'>Join the Team</a>
  </div>
 </div>
 <div className='grid gap-4'>
  {['We already have the fiber','The obstacle is standardization','One pilot can unlock scale'].map((x,i)=><div key={i} className='p-5 rounded-2xl bg-white/5 border border-white/10'>{x}</div>)}
 </div>
</section>

<section id='map' className='max-w-7xl mx-auto px-6 py-14'>
 <h2 className='text-3xl font-bold mb-2'>Interactive City Impact Comparison</h2>
 <p className='text-slate-300 mb-8'>Click a city to compare illustrative outcomes with and without a standardized DAS layer.</p>
 <div className='grid lg:grid-cols-2 gap-8'>
  <div className='p-6 rounded-3xl bg-white text-slate-800 shadow-2xl'>
   <div className='flex items-center gap-2 mb-4'><MapPin size={18}/><h3 className='text-2xl font-bold'>{selected.name}</h3></div>
   <div className='grid grid-cols-3 gap-2 text-xs uppercase tracking-wide text-slate-500 border-b pb-2'><div>Metric</div><div>DAS Off</div><div>DAS On</div></div>
   <Row label='Alert Time (s)' a={selected.base.alert} b={selected.das.alert}/>
   <Row label='Serious Casualties' a={selected.base.cas.toLocaleString()} b={selected.das.cas.toLocaleString()}/>
   <Row label='Damage ($M)' a={selected.base.dam.toLocaleString()} b={selected.das.dam.toLocaleString()}/>
   <Row label='Confidence (%)' a={selected.base.conf} b={selected.das.conf}/>
   <p className='mt-4 text-xs text-slate-500'>Illustrative scenario estimates for public engagement only.</p>
  </div>
  <div className='relative h-[520px] rounded-3xl border border-white/10 bg-white/5 overflow-hidden p-2'>
   <ComposableMap projection='geoMercator' projectionConfig={{ scale: 95 }} className='w-full h-full'>
    <Geographies geography='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'>
      {({ geographies }) => geographies.map((geo) => (
        <Geography key={geo.rsmKey} geography={geo} fill='rgba(255,255,255,0.08)' stroke='rgba(103,232,249,0.35)' strokeWidth={0.3} />
      ))}
    </Geographies>
   </ComposableMap>
   {cities.map(c=><button key={c.name} onClick={()=>setSelected(c)} className='absolute -translate-x-1/2 -translate-y-1/2' style={{left:c.x+'%',top:c.y+'%'}}>
    <div className={`w-4 h-4 rounded-full ${selected.name===c.name?'bg-cyan-300 scale-125':'bg-white'} transition`} />
    <div className='text-xs mt-1 px-2 py-1 rounded bg-slate-900/80 whitespace-nowrap'>{c.name}</div>
   </button>)}
  </div>
 </div>
</section>

<section id='objectives' className='py-16 px-6 bg-white/5 border-y border-white/10'>
 <div className='max-w-6xl mx-auto'>
  <h2 className='text-3xl font-bold mb-8'>Project Objectives</h2>
  <div className='grid md:grid-cols-3 gap-5'>
   {['Standardize the reporting pipeline','Validate the DAS instrument model','Benchmark improved EEW performance'].map((x,i)=><div key={i} className='p-5 rounded-2xl bg-white/5 border border-white/10'>{x}</div>)}
  </div>
 </div>
</section>

<section id='team' className='max-w-6xl mx-auto px-6 py-16'>
 <h2 className='text-3xl font-bold mb-8'>Build the Team</h2>
 <div className='grid md:grid-cols-3 gap-4'>
  {roles.map((r,i)=><div key={i} className='p-5 rounded-2xl bg-white/5 border border-white/10'><Users className='mb-3 text-cyan-300'/><div className='font-semibold'>{r}</div></div>)}
 </div>
</section>

<section id='join' className='py-16 px-6 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950'>
 <div className='max-w-3xl mx-auto'>
  <h2 className='text-3xl font-bold mb-4'>Join the Experiment</h2>
  <div className='grid md:grid-cols-2 gap-4'>
   <input placeholder='Name' className='p-3 rounded-xl'/>
   <input placeholder='Email' className='p-3 rounded-xl'/>
   <input placeholder='Affiliation' className='p-3 rounded-xl'/>
   <input placeholder='Expertise' className='p-3 rounded-xl'/>
   <textarea placeholder='How would you like to help?' className='p-3 rounded-xl md:col-span-2 h-28'/>
  </div>
  <button className='mt-4 px-5 py-3 rounded-2xl bg-slate-950 text-white font-semibold'>Submit Interest</button>
 </div>
</section>
</div>
}
