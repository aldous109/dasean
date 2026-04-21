import React, { useState } from "react";
import { motion } from "framer-motion";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  ArrowRight,
  Shield,
  MapPin,
  Users,
  Activity,
  Globe,
  Atom,
  Brain,
  Cable,
  Gauge,
  Landmark,
  Microscope,
  LineChart,
  ChevronRight,
  Sparkles,
  Radar,
} from "lucide-react";

const cities = [
  { name: "Tokyo", x: 82, y: 28, base: { alert: 18, cas: 4200, dam: 6200, conf: 71 }, das: { alert: 29, cas: 3100, dam: 5100, conf: 86 } },
  { name: "Osaka", x: 84, y: 33, base: { alert: 14, cas: 2500, dam: 4100, conf: 69 }, das: { alert: 24, cas: 1800, dam: 3300, conf: 84 } },
  { name: "Manila", x: 86, y: 42, base: { alert: 10, cas: 3800, dam: 2900, conf: 63 }, das: { alert: 19, cas: 2800, dam: 2300, conf: 80 } },
  { name: "Jakarta", x: 79, y: 54, base: { alert: 9, cas: 3400, dam: 2600, conf: 61 }, das: { alert: 17, cas: 2550, dam: 2100, conf: 79 } },
  { name: "Mexico City", x: 18, y: 38, base: { alert: 22, cas: 2900, dam: 5400, conf: 74 }, das: { alert: 33, cas: 2100, dam: 4400, conf: 88 } },
  { name: "Los Angeles", x: 12, y: 34, base: { alert: 16, cas: 1700, dam: 7200, conf: 72 }, das: { alert: 27, cas: 1200, dam: 6100, conf: 87 } },
  { name: "San Francisco", x: 10, y: 28, base: { alert: 14, cas: 1400, dam: 6800, conf: 70 }, das: { alert: 25, cas: 950, dam: 5600, conf: 86 } },
  { name: "Santiago", x: 22, y: 78, base: { alert: 19, cas: 2200, dam: 4800, conf: 73 }, das: { alert: 30, cas: 1600, dam: 3900, conf: 88 } },
  { name: "Lima", x: 18, y: 68, base: { alert: 17, cas: 2600, dam: 4300, conf: 71 }, das: { alert: 28, cas: 1900, dam: 3500, conf: 86 } },
  { name: "Istanbul", x: 56, y: 26, base: { alert: 8, cas: 6200, dam: 7600, conf: 60 }, das: { alert: 16, cas: 4700, dam: 6500, conf: 78 } },
  { name: "Kathmandu", x: 70, y: 34, base: { alert: 7, cas: 4100, dam: 1800, conf: 58 }, das: { alert: 15, cas: 3000, dam: 1450, conf: 76 } },
  { name: "Wellington", x: 96, y: 82, base: { alert: 13, cas: 900, dam: 2500, conf: 68 }, das: { alert: 23, cas: 620, dam: 2050, conf: 84 } },
];

const roles = [
  {
    title: "DAS / Fiber Engineering",
    icon: Cable,
    desc: "Characterize cable coupling, calibration, dynamic range, and deployment constraints in real links.",
  },
  {
    title: "Seismology / EEW",
    icon: Activity,
    desc: "Translate fiber data into arrival-time, magnitude, and location estimates that are meaningful for warning.",
  },
  {
    title: "Signal Processing / ML",
    icon: Brain,
    desc: "Build robust pickers, denoisers, and uncertainty estimators that can operate in real time.",
  },
  {
    title: "Data Standards",
    icon: Globe,
    desc: "Develop open protocols for DAS data sharing, metadata, and interoperability across networks and countries.",
  },
  {
    title: "Field Deployment",
    icon: MapPin,
    desc: "Plan and execute pilot installations on undersea cables, working with telecoms and research institutions.",
  },
  {
    title: "Partnerships",
    icon: Users,
    desc: "Engage cable owners, governments, NGOs, and funders to build a sustainable early warning infrastructure.",
  },
];

const objectives = [
  "Standardize the reporting pipeline",
  "Validate the DAS instrument model",
  "Benchmark improved EEW performance",
];

const roadmap = [
  { phase: "1", title: "Simulate the pipeline", text: "Compare raw DAS, calibrated DAS, and hybrid readout behavior under controlled noise." },
  { phase: "2", title: "Bench test with reference sensors", text: "Use a cable segment with co-located seismometer and strainmeter to learn the transfer function." },
  { phase: "3", title: "Field pilot on real fiber", text: "Run the pipeline on a live telecom or dark-fiber route and test event detection quality." },
  { phase: "4", title: "EEW integration", text: "Measure whether the hybrid stack improves arrival features and magnitude estimates early enough to matter." },
];

function Row({ label, a, b }) {
  return (
    <div className="grid grid-cols-3 gap-2 py-2 border-b text-sm">
      <div>{label}</div>
      <div className="font-semibold">{a}</div>
      <div className="font-semibold text-cyan-300">{b}</div>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(cities[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [expertise, setExpertise] = useState("");
  const [help, setHelp] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_28%)]" />

      <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/20">
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                DAS Early Warning Initiative
              </span>
            </div>
            <div className="hidden items-center gap-6 text-sm md:flex">
              <a href="#map" className="rounded-full px-3 py-2 transition hover:text-cyan-300">Map</a>
              <a href="#objectives" className="rounded-full px-3 py-2 transition hover:text-cyan-300">Objectives</a>
              <a href="#team" className="rounded-full px-3 py-2 transition hover:text-cyan-300">Team</a>
              <a href="#join" className="rounded-full px-3 py-2 transition hover:text-cyan-300">Join</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid gap-12 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Shield className="h-4 w-4" />
              Public-Interest Seismic Infrastructure
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Earlier Earthquake Warning from <span className="text-cyan-300">Existing Underwater Fiber</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Build a standardized DAS layer that turns submarine cables into trusted seismic sensors for faster alerts, better resilience, and richer predictive data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#map"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01]"
              >
                Explore the Map <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#join"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Join the Team <Users className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "We already have the fiber",
                "The obstacle is standardization",
                "One pilot can unlock scale",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10"
                >
                  <div className="text-sm leading-6 text-slate-200">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="map"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="py-16"
        >
          <div className="mb-8 max-w-3xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Global DAS Network
            </div>
            <h2 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
              Interactive City Impact Comparison
            </h2>
            <p className="mt-3 text-lg text-slate-300">
              Click a city to compare illustrative outcomes with and without a standardized DAS layer.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/10 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300 ring-1 ring-cyan-300/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{selected.name}</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs uppercase tracking-wide text-slate-500 border-b pb-3">
                <div>Metric</div>
                <div>DAS Off</div>
                <div className="text-cyan-300">DAS On</div>
              </div>
              <div className="space-y-1">
                <Row label="Alert Time (s)" a={`${selected.base.alert}`} b={`${selected.das.alert}`} />
                <Row
                  label="Serious Casualties"
                  a={selected.base.cas.toLocaleString()}
                  b={selected.das.cas.toLocaleString()}
                />
                <Row
                  label="Damage ($M)"
                  a={selected.base.dam.toLocaleString()}
                  b={selected.das.dam.toLocaleString()}
                />
                <Row label="Confidence (%)" a={selected.base.conf} b={selected.das.conf} />
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Illustrative scenario estimates for public engagement only.
              </p>
            </div>

            <div className="relative h-[520px] rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/5">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-8 top-1/2 h-px w-[110%] bg-white/10" />
                <div className="absolute left-8 top-[20%] h-px w-[110%] bg-white/10" />
                <div className="absolute left-8 top-[80%] h-px w-[110%] bg-white/10" />
              </div>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 95 }}
                className="h-full w-full"
              >
                <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(103,232,249,0.35)"
                        strokeWidth={0.3}
                      />
                    ))
                  }
                </Geographies>
                {cities.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelected(c)}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: c.x + "%", top: c.y + "%" }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition ${
                        selected.name === c.name ? "bg-cyan-300 scale-125 ring-2 ring-cyan-300/50" : "bg-white"
                      }`}
                    />
                    <div className="mt-1 whitespace-nowrap rounded bg-slate-950/80 px-2 py-1 text-xs text-slate-200">
                      {c.name}
                    </div>
                  </button>
                ))}
              </ComposableMap>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="objectives"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 py-16"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Mission
            </div>
            <h2 className="mb-10 text-4xl font-semibold text-white">Project Objectives</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {objectives.map((obj, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10"
                >
                  <div className="text-lg font-medium text-white">{obj}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="team"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="py-16"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Collaboration
            </div>
            <h2 className="mb-10 text-4xl font-semibold text-white">Build the Team</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10"
                  >
                    <div className="mb-4 rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 ring-1 ring-cyan-300/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-lg font-medium text-white">{role.title}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{role.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="join"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500 to-indigo-600 py-16 text-slate-950"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-6 text-4xl font-semibold">Join the Experiment</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30"
              />
              <input
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="Affiliation"
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30"
              />
              <input
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                placeholder="Expertise"
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30"
              />
              <textarea
                value={help}
                onChange={(e) => setHelp(e.target.value)}
                placeholder="How would you like to help?"
                rows={4}
                className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30 md:col-span-2"
              />
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:scale-[1.01]">
              Submit Interest <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;