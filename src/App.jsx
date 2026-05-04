import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
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
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, base: { alert: 18, cas: 4200, dam: 6200, conf: 71 }, das: { alert: 29, cas: 3100, dam: 5100, conf: 86 } },
  { name: "Osaka", lat: 34.6937, lng: 135.5023, base: { alert: 14, cas: 2500, dam: 4100, conf: 69 }, das: { alert: 24, cas: 1800, dam: 3300, conf: 84 } },
  { name: "Manila", lat: 14.5995, lng: 120.9842, base: { alert: 10, cas: 3800, dam: 2900, conf: 63 }, das: { alert: 19, cas: 2800, dam: 2300, conf: 80 } },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456, base: { alert: 9, cas: 3400, dam: 2600, conf: 61 }, das: { alert: 17, cas: 2550, dam: 2100, conf: 79 } },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332, base: { alert: 22, cas: 2900, dam: 5400, conf: 74 }, das: { alert: 33, cas: 2100, dam: 4400, conf: 88 } },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, base: { alert: 16, cas: 1700, dam: 7200, conf: 72 }, das: { alert: 27, cas: 1200, dam: 6100, conf: 87 } },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, base: { alert: 14, cas: 1400, dam: 6800, conf: 70 }, das: { alert: 25, cas: 950, dam: 5600, conf: 86 } },
  { name: "Santiago", lat: -33.4489, lng: -70.6693, base: { alert: 19, cas: 2200, dam: 4800, conf: 73 }, das: { alert: 30, cas: 1600, dam: 3900, conf: 88 } },
  { name: "Lima", lat: -12.0464, lng: -77.0428, base: { alert: 17, cas: 2600, dam: 4300, conf: 71 }, das: { alert: 28, cas: 1900, dam: 3500, conf: 86 } },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784, base: { alert: 8, cas: 6200, dam: 7600, conf: 60 }, das: { alert: 16, cas: 4700, dam: 6500, conf: 78 } },
  { name: "Kathmandu", lat: 27.7172, lng: 85.3240, base: { alert: 7, cas: 4100, dam: 1800, conf: 58 }, das: { alert: 15, cas: 3000, dam: 1450, conf: 76 } },
  { name: "Wellington", lat: -41.2865, lng: 174.7762, base: { alert: 13, cas: 900, dam: 2500, conf: 68 }, das: { alert: 23, cas: 620, dam: 2050, conf: 84 } },
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil",
  "Canada", "Chile", "China", "Colombia", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Malaysia", "Mexico",
  "Morocco", "Netherlands", "New Zealand", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
  "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland",
  "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Vietnam",
  "Other"
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
  "Standardize the DAS seismic reporting pipeline",
  "Seed a repo of ground-truth calibrated DAS data",
  "Train a ML model for early earthquake detection",
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
  const [help, setHelp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const formData = new FormData(e.target);

    try {
      const response = await fetch(e.target.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setSubmitError(data.error || "Unable to send message. Please try again.");
      }
    } catch (error) {
      setSubmitError("Unable to send message. Please check your connection and try again.");
      console.error("Form submission error:", error);
    }
  };

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
                DAS-enabled Earthquake Alert Network
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
           <div className="space-y-4">
             <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
               Advanced Earthquake Detection using <span className="text-cyan-300">Existing Fiber Networks</span>
             </h1>
             <p className="max-w-2xl text-lg leading-8 text-slate-300">
               We're adding a DAS (Distributed Acousting Sensing) layer to turn undersea internet cables into sprawling seismic sensors for <b>earlier earthquake warnings</b> and <b>advanced predictive analytics</b>.
             </p>
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
          </div>

            <div className="space-y-6">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/esIMngdLCUo"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-2xl shadow-lg shadow-black/10"
              ></iframe>
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
               Why a Global DAS Network?
             </div>
             <h2 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
               Interactive City Impact Comparison
             </h2>
             <p className="mt-3 text-lg text-slate-300">
               Click a city to compare illustrative outcomes with and without a standardized DAS layer.
             </p>
           </div>

           <div className="grid gap-8 lg:grid-cols-2">
             <div className="rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/10 h-[400px] flex flex-col p-6">
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
                 Illustrative scenario estimates for public engagement only. Several of the cities shown (e.g. Kathmandu, Istanbul, Mexico City) are not near submarine cables. For these cities the DAS advantage comes from land fiber being more densely integrated than conventional seismic networks. 
               </p>
             </div>

             <div className="relative h-[400px] rounded-[2rem] border border-white/10 bg-slate-900 shadow-xl shadow-black/5 overflow-hidden">
               <ComposableMap
                 projection="geoNaturalEarth1"
                 projectionConfig={{
                   scale: 160,
                   center: [30, 0],
                 }}
                 className="w-full h-full"
               >
                 <ZoomableGroup zoom={1} center={[0, 0]}>
                   <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                     {({ geographies }) =>
                       geographies.map((geo) => (
                         <Geography
                           key={geo.rsmKey}
                           geography={geo}
                           fill="#1e293b"
                           stroke="#334155"
                           strokeWidth={0.5}
                           style={{
                             default: { outline: "none" },
                             hover: { outline: "none" },
                             pressed: { outline: "none" },
                           }}
                         />
                       ))
                     }
                   </Geographies>
                   {cities.map((city) => (
                     <Marker key={city.name} coordinates={[city.lng, city.lat]}>
                       <g
                         className="cursor-pointer transition-transform hover:scale-110"
                         onClick={() => setSelected(city)}
                       >
                         <circle
                           r={selected.name === city.name ? 6.6 : 4.4}
                           fill={selected.name === city.name ? "#06b6d4" : "#ffffff"}
                           stroke={selected.name === city.name ? "#06b6d4" : "#ffffff"}
                           strokeWidth={selected.name === city.name ? 2 : 1}
                           className={selected.name === city.name ? "drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"}
                         />
                         <text
                           textAnchor="middle"
                           y={selected.name === city.name ? -12 : -10}
                           className={`text-xs font-medium ${
                             selected.name === city.name ? "fill-cyan-300" : "fill-slate-200"
                           }`}
                           style={{ fontSize: selected.name === city.name ? "16px" : "14px" }}
                         >
                           {city.name}
                         </text>
                       </g>
                     </Marker>
                   ))}
                 </ZoomableGroup>
               </ComposableMap>
               <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-slate-300 backdrop-blur-sm">
                 Click city markers to compare impact
               </div>
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
              Building the Future of EEW
            </div>
            <h2 className="mb-10 text-4xl font-semibold text-white">Collaborators Needed</h2>
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500 to-indigo-600 py-16 text-slate-950"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-6 text-4xl font-semibold">Connect with the Project</h2>
            {submitted ? (
              <p className="text-lg text-slate-800">Thank you! We'll be in touch.</p>
            ) : (
              <>
                <p className="mb-8 text-lg leading-relaxed text-slate-200 max-w-2xl">
                  Whether your field is seismology, fiber engineering, ML, field deployment, partnerships, or simply helping to accelerate this work, we'd love to connect. Together, we can build the open infrastructure that turns existing fiber into a reliable seismic sensing layer for earlier warnings and predictive earthquake analytics!
                </p>
                <form
                  action="https://formspree.io/f/mnjwpjkz"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30"
                  />
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30"
                  />
                  <input
                    name="affiliation"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    placeholder="Affiliation"
                    className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30"
                  />
                  <select
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="">Select Country</option>
                    {countries.map((countryName) => (
                      <option key={countryName} value={countryName}>
                        {countryName}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="help"
                    value={help}
                    onChange={(e) => setHelp(e.target.value)}
                    placeholder="How would you like to help?"
                    rows={4}
                    required
                    className="w-full rounded-xl bg-white/90 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300/30 md:col-span-2"
                  />
                  {submitError && (
                    <div className="md:col-span-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-300/20">
                      {submitError}
                    </div>
                  )}
                  <button type="submit" className="mt-6 md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:scale-[1.01]">
                    Send message <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;