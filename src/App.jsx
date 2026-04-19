import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Atom,
  Brain,
  Cable,
  ChevronRight,
  Clock3,
  Gauge,
  GitBranch,
  Landmark,
  Layers3,
  LineChart,
  MapPin,
  Microscope,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react';
import worldMap from './assets/world-map.png';
import { experimentStages, mapSites, roadmap, roles } from './data';

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function project(lat, lon) {
  return {
    x: ((lon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

function MetricCard({ label, value, Icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
      <div className="flex items-center justify-between">
        <div className="text-sm uppercase tracking-[0.2em] text-slate-400">{label}</div>
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">{eyebrow}</div>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {body ? <p className="text-lg leading-8 text-slate-300">{body}</p> : null}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState('hybrid');
  const [magnitude, setMagnitude] = useState(6.2);
  const [distance, setDistance] = useState(45);
  const [noise, setNoise] = useState(0.35);
  const [fiberQuality, setFiberQuality] = useState(0.72);
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedSite, setSelectedSite] = useState(mapSites[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');

  const metrics = useMemo(() => {
    const modeBoost = mode === 'classical' ? 0 : mode === 'hybrid' ? 0.18 : 0.28;
    const signal = (magnitude - 3.5) * 18 + fiberQuality * 18 - distance * 0.22;
    const effectiveNoise = (0.9 + noise * 1.5) * (mode === 'quantum' ? 0.72 : mode === 'hybrid' ? 0.86 : 1);
    const snr = (signal / (effectiveNoise * 10 + 1)).toFixed(1);

    const baseDelay = 7.8 + distance * 0.05 + noise * 4;
    const modeDelayReduction = mode === 'classical' ? 0 : mode === 'hybrid' ? 1.1 : 1.7;
    const detectionTime = Math.max(1.4, baseDelay - modeDelayReduction - fiberQuality * 1.2);

    const magError = clamp(1.15 - modeBoost - fiberQuality * 0.38 + noise * 0.55 + Math.max(0, (distance - 30) / 100), 0.08, 1.7);
    const confidence = clamp(0.45 + fiberQuality * 0.35 + modeBoost - noise * 0.25 - Math.max(0, (distance - 70) / 200), 0.08, 0.96);
    const arrivalQuality = clamp(0.52 + fiberQuality * 0.25 + modeBoost - noise * 0.3, 0.05, 0.98);

    return {
      snr,
      detectionTime: detectionTime.toFixed(1),
      magError: magError.toFixed(2),
      confidence: Math.round(confidence * 100),
      arrivalQuality: Math.round(arrivalQuality * 100),
    };
  }, [mode, magnitude, distance, noise, fiberQuality]);

  const filteredRoles = roles.filter((r) => roleFilter === 'all' || r.title.toLowerCase().includes(roleFilter));

  const pipeline = [
    { label: 'Raw fiber phase', value: 1 },
    { label: 'Classical feature extraction', value: mode === 'classical' ? 0.78 : 0.92 },
    { label: 'Quantum-enhanced readout', value: mode === 'quantum' ? 0.96 : mode === 'hybrid' ? 0.84 : 0.22 },
    { label: 'Warning decision layer', value: 0.98 },
  ];

  const modeCopy = {
    classical: {
      title: 'Classical DAS baseline',
      desc: 'Useful and real today, but vulnerable to calibration ambiguity, coupling variation, and saturation in harder events.',
    },
    hybrid: {
      title: 'Hybrid quantum-classical pipeline',
      desc: 'The practical target: quantum-improved readout up front, classical estimation downstream, and validation against reference instruments.',
    },
    quantum: {
      title: 'Quantum-augmented readout concept',
      desc: 'A research frontier: explore whether weak-measurement-style readout can lower effective noise before classical processing.',
    },
  }[mode];

  const sitePos = project(selectedSite.lat, selectedSite.lon);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-30 mb-8 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl shadow-2xl shadow-cyan-950/10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/20">
                <Radar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Quantum Augmented Earthquake Warning System</div>
                <div className="font-semibold text-white">QEWS</div>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
              {[
                ['Problem', 'problem'],
                ['Idea', 'idea'],
                ['Map', 'map'],
                ['Simulation', 'simulation'],
                ['Experiment', 'experiment'],
                ['Team', 'team'],
                ['Roadmap', 'roadmap'],
              ].map(([label, id]) => (
                <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 transition hover:bg-white/6 hover:text-white">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="space-y-20">
          <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <Sparkles className="h-4 w-4" />
                A research platform for earlier, cleaner earthquake warning
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Turning fiber networks into a <span className="text-cyan-300">hybrid quantum-classical</span> earthquake sensing layer.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  QEWS is a proposed pipeline that uses fiber-optic distributed acoustic sensing as the classical backbone,
                  then asks whether quantum-enhanced readout can improve the earliest, noisiest part of the signal chain:
                  the first seconds of an earthquake, when magnitude and arrival features are hardest to estimate.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#simulation" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01]">
                  Open the simulation <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#join" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10">
                  Join the team <Users className="h-4 w-4" />
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Problem', 'Early magnitude is noisy and fragile.'],
                  ['Goal', 'Lower uncertainty before warnings are issued.'],
                  ['Method', 'Hybrid readout + classical estimation.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/10">
                    <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">{title}</div>
                    <div className="text-sm leading-6 text-slate-200">{text}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="glass-card rounded-[2rem] border border-white/10 p-5 shadow-2xl shadow-cyan-950/10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-slate-400">Live concept dashboard</div>
                  <div className="text-xl font-semibold text-white">{modeCopy.title}</div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">Research prototype</div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-xl bg-cyan-400/10 p-2 text-cyan-300 ring-1 ring-cyan-300/20">
                      <Activity className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{modeCopy.desc}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Detection time" value={`${metrics.detectionTime}s`} Icon={Clock3} />
                  <MetricCard label="Magnitude error" value={`±${metrics.magError}`} Icon={LineChart} />
                  <MetricCard label="Confidence" value={`${metrics.confidence}%`} Icon={ShieldCheck} />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                    <span>Pipeline readiness</span>
                    <span>{metrics.arrivalQuality}% arrival-feature quality</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 transition-all duration-500" style={{ width: `${metrics.arrivalQuality}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="problem" className="space-y-6">
            <SectionTitle
              eyebrow="The bottleneck"
              title="The hard part is not sensing motion. It is measuring it reliably enough to trust."
              body="Fiber can already detect vibrations. The challenge is turning messy phase shifts into stable arrival times, trustworthy magnitude estimates, and a warning that is early enough to matter. In the real world, cable coupling, saturation, geometry, and noise make the first seconds of an event the hardest seconds to interpret."
            />

            <div className="grid gap-5 md:grid-cols-3">
              {[
                [Microscope, 'Calibration ambiguity', 'One fiber route is not the next. The instrument response changes with burial, tension, and coupling.'],
                [LineChart, 'Dynamic range limits', 'Large events can saturate or distort the phase signal just when clean amplitudes matter most.'],
                [ShieldCheck, 'Operational uncertainty', 'Warning systems need stable, low-false-alarm features, not just impressive raw sensitivity.'],
              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 ring-1 ring-cyan-300/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-medium text-white">{title}</div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="idea" className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <SectionTitle
                eyebrow="The idea"
                title="Classical estimation does the heavy lifting. Quantum readout tries to clean the front door."
              />
              <p className="text-lg leading-8 text-slate-300">
                QEWS is deliberately hybrid. The classical system remains the workhorse for picking arrivals, estimating source parameters,
                and making a warning decision. The quantum contribution is narrower and more ambitious: improve the signal-to-noise ratio at
                the readout stage, where small early motions are easiest to lose.
              </p>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm text-cyan-200">
                  <Layers3 className="h-4 w-4" />
                  Three-layer stack
                </div>
                <div className="space-y-3 text-sm leading-7 text-slate-300">
                  <p><span className="font-medium text-white">1) Fiber sensing:</span> convert strain into phase shifts along existing infrastructure.</p>
                  <p><span className="font-medium text-white">2) Quantum-enhanced readout:</span> explore whether weak-measurement-style or related techniques can suppress readout noise.</p>
                  <p><span className="font-medium text-white">3) Classical EEW pipeline:</span> stabilize, interpret, and decide under real-time constraints.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-5 shadow-2xl shadow-black/10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-slate-400">System view</div>
                  <div className="text-xl font-semibold text-white">QEWS pipeline</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Interactive</div>
              </div>
              <div className="space-y-3">
                {pipeline.map((step, idx) => (
                  <motion.div key={step.label} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: idx * 0.05 }} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-white">{step.label}</div>
                        <div className="text-xs text-slate-400">Stage {idx + 1}</div>
                      </div>
                      <div className="h-3 w-32 overflow-hidden rounded-full bg-slate-800 sm:w-44">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-500" style={{ width: `${step.value * 100}%` }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="map" className="space-y-6">
            <SectionTitle
              eyebrow="Working map"
              title="A global view makes the project legible: where the network is dense, where warning windows are short, and where the experiment could matter most."
              body="Click a site to see why it matters. The map uses a local asset and latitude/longitude placement so it works offline inside the project."
            />

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-4 shadow-2xl shadow-black/10">
                <div className="map-grid relative aspect-[2/1] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950">
                  <img src={worldMap} alt="World map" className="absolute inset-0 h-full w-full object-cover opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/0 to-slate-950/15" />
                  {mapSites.map((site) => {
                    const pos = project(site.lat, site.lon);
                    const active = selectedSite.name === site.name;
                    return (
                      <button
                        key={site.name}
                        type="button"
                        onClick={() => setSelectedSite(site)}
                        className="map-marker absolute"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        aria-label={site.name}
                      >
                        <span className={`absolute -left-4 -top-4 h-8 w-8 rounded-full border border-cyan-300/30 ${active ? 'bg-cyan-300/30 animate-ping' : 'bg-cyan-300/10'}`} />
                        <span className={`relative block h-3 w-3 rounded-full ${active ? 'bg-cyan-300' : 'bg-sky-300'} shadow-[0_0_20px_rgba(34,211,238,0.7)]`} />
                        <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] backdrop-blur ${active ? 'border-cyan-300/30 bg-cyan-400/20 text-cyan-100' : 'border-white/10 bg-slate-950/65 text-slate-200'}`}>
                          {site.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Live testbed</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Candidate deployment</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">High-priority warning zone</span>
                </div>
              </div>

              <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
                <div className="text-sm uppercase tracking-[0.25em] text-slate-400">Selected site</div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold text-white">{selectedSite.name}</div>
                    <div className="mt-1 text-sm text-cyan-200">{selectedSite.role}</div>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">{selectedSite.status}</div>
                </div>
                <p className="text-sm leading-7 text-slate-300">{selectedSite.note}</p>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
                  Coordinates: <span className="text-white">{selectedSite.lat.toFixed(1)}°, {selectedSite.lon.toFixed(1)}°</span>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="text-sm font-medium text-white">Why it matters</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">
                      Sites like this define where a hybrid warning pipeline could show value first: offshore gaps, coastal communities, or densely linked fiber corridors.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="text-sm font-medium text-white">Best validation target</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">
                      Compare arrival-time error, magnitude error, and saturation recovery against a co-located reference network.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="simulation" className="space-y-6">
            <SectionTitle
              eyebrow="Simulation lab"
              title="Explore how the warning pipeline behaves under changing conditions."
              body="This mock lab is meant to make the concept concrete. Tune the inputs below and compare classical, hybrid, and quantum-augmented views."
            />

            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-slate-400">
                  <SlidersHorizontal className="h-4 w-4" /> Controls
                </div>
                <div className="space-y-3">
                  {[
                    ['Earthquake magnitude', magnitude, setMagnitude, 4.2, 8.2, 0.1],
                    ['Distance from fiber segment (km)', distance, setDistance, 5, 160, 1],
                    ['Ambient noise', noise, setNoise, 0, 1, 0.01],
                    ['Fiber quality', fiberQuality, setFiberQuality, 0, 1, 0.01],
                  ].map(([label, value, setter, min, max, step]) => (
                    <div key={label} className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-200">{label}</span>
                        <span className="font-medium text-cyan-200">{Number(value).toFixed(label.includes('magnitude') ? 1 : 2)}</span>
                      </div>
                      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setter(parseFloat(e.target.value))} className="range-input" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-sm text-slate-200">Pipeline mode</div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {[
                      ['classical', 'Classical'],
                      ['hybrid', 'Hybrid'],
                      ['quantum', 'Quantum'],
                    ].map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setMode(key)}
                        className={`rounded-xl px-3 py-2 transition ${mode === key ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-slate-200 hover:bg-white/10'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard label="Simulated SNR" value={metrics.snr} Icon={Radar} />
                  <MetricCard label="Warning confidence" value={`${metrics.confidence}%`} Icon={ShieldCheck} />
                  <MetricCard label="Arrival-feature quality" value={`${metrics.arrivalQuality}%`} Icon={Activity} />
                  <MetricCard label="Expected detection delay" value={`${metrics.detectionTime}s`} Icon={Clock3} />
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-5 shadow-2xl shadow-black/10">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm uppercase tracking-[0.25em] text-slate-400">Wavefront view</div>
                      <div className="text-xl font-semibold text-white">Earthquake propagation and readout clarity</div>
                    </div>
                    <div className="text-xs text-slate-400">Higher opacity = more useful signal</div>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute left-8 top-1/2 h-px w-[110%] bg-white/10" />
                      <div className="absolute left-8 top-[20%] h-px w-[110%] bg-white/10" />
                      <div className="absolute left-8 top-[80%] h-px w-[110%] bg-white/10" />
                    </div>

                    <div className="relative grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-red-400/15 ring-1 ring-red-300/20 animate-floaty" />
                          <div>
                            <div className="text-sm text-slate-300">Seismic source</div>
                            <div className="text-lg font-medium text-white">Magnitude {magnitude.toFixed(1)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-cyan-300" />
                          <div className="text-sm text-slate-300">Fiber segment at {distance.toFixed(0)} km</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Search className="h-5 w-5 text-emerald-300" />
                          <div className="text-sm text-slate-300">Mode: {modeCopy.title}</div>
                        </div>
                      </div>

                      <div className="relative h-72 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                        <div className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-400" />
                        <div className="absolute left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-red-400/40 animate-pulse" />
                        <div className="absolute left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-red-400/25 animate-pulse [animation-delay:200ms]" />
                        <div className="absolute left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-red-400/15 animate-pulse [animation-delay:400ms]" />

                        <div className="absolute right-8 top-10 w-2/3 space-y-3">
                          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Fiber readout strength</div>
                          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                              style={{ width: `${Math.round((fiberQuality * 0.6 + (1 - noise) * 0.25 + (mode === 'quantum' ? 0.15 : mode === 'hybrid' ? 0.08 : 0)) * 100)}%` }}
                            />
                          </div>
                          <div className="text-sm text-slate-300">
                            Higher is better for warning: more of the first motion survives the readout chain.
                          </div>
                        </div>

                        <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
                          Arrival feature quality: <span className="font-semibold text-cyan-300">{metrics.arrivalQuality}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="experiment" className="space-y-6">
            <SectionTitle
              eyebrow="The experiment"
              title="A practical test can tell us whether the idea is worth scaling."
              body="The point is not to prove a final answer immediately. The point is to identify whether a quantum-enhanced front end measurably improves early-arrival detection, magnitude estimation, and robustness under realistic noise."
            />

            <div className="grid gap-5 md:grid-cols-3">
              {experimentStages.map(([title, text], idx) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 ring-1 ring-cyan-300/20">
                      <span className="text-sm font-semibold">0{idx + 1}</span>
                    </div>
                    <div className="text-lg font-medium text-white">{title}</div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/75 p-5 shadow-lg shadow-black/10 lg:grid-cols-4">
              {[
                ['Arrival time error', 'Does the warning come earlier and more consistently?'],
                ['Magnitude estimate error', 'Can the early estimate stay useful under low SNR?'],
                ['False-alarm rate', 'Does the system remain trustworthy in noisy links?'],
                ['Saturation recovery', 'Can large events still be interpreted after clipping?'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{text}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="team" className="space-y-6">
            <SectionTitle
              eyebrow="Build the team"
              title="The project becomes real when the right people can see their role."
              body="This part of the site is designed to recruit collaborators. It should make it easy for an expert to see where they fit and for a student to see what they can learn by contributing."
            />

            <div className="flex flex-wrap gap-2">
              {[
                ['all', 'All roles'],
                ['quantum', 'Quantum'],
                ['seism', 'Seismology'],
                ['fiber', 'Fiber'],
                ['signal', 'Signal'],
                ['hardware', 'Hardware'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setRoleFilter(key)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${roleFilter === key ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-200' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredRoles.map((role) => {
                const Icon = role.icon;
                return (
                  <div key={role.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 ring-1 ring-cyan-300/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-lg font-medium text-white">{role.title}</div>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{role.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="roadmap" className="space-y-6">
            <SectionTitle eyebrow="Roadmap" title="A staged path keeps the project grounded." />
            <div className="grid gap-5 lg:grid-cols-4">
              {roadmap.map((item) => (
                <div key={item.phase} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20">{item.phase}</div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="mt-4 text-lg font-medium text-white">{item.title}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="join" className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Join the project</div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Invite the right people without making them guess where they fit.</h2>
              <p className="text-lg leading-8 text-slate-300">
                This section can become a live intake form, a collaborator directory, or a contact gateway for funders and labs.
              </p>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
                <div className="mb-2 flex items-center gap-2 text-cyan-200">
                  <GitBranch className="h-4 w-4" />
                  Suggested intake fields
                </div>
                name, email, expertise, institution, availability, and a one-line note about what they would like to build.
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-5 shadow-2xl shadow-black/10">
              <div className="mb-4 text-xl font-semibold text-white">Interest form</div>
              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
                />
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="What can you contribute? e.g. quantum optics, DAS calibration, EEW, signal processing"
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
                />
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01]">
                  Save interest <ArrowRight className="h-4 w-4" />
                </button>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                  Preview: <span className="text-white">{name || 'Your name'}</span> · <span className="text-white">{email || 'email@example.com'}</span>
                  <br />
                  <span className="text-slate-400">Focus:</span> {skills || 'your expertise'}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
