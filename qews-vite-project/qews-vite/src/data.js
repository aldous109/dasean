import { Atom, Brain, Cable, Gauge, Landmark, Waves } from 'lucide-react';

export const roles = [
  {
    title: 'Quantum sensing / optics',
    icon: Atom,
    desc: 'Design the readout layer, explore weak-measurement concepts, and define what quantum advantage would mean in this setting.',
  },
  {
    title: 'Seismology / EEW',
    icon: Waves,
    desc: 'Translate fiber data into arrival-time, magnitude, and location estimates that are meaningful for warning.',
  },
  {
    title: 'Fiber / DAS engineering',
    icon: Cable,
    desc: 'Characterize cable coupling, calibration, dynamic range, and deployment constraints in real links.',
  },
  {
    title: 'Signal processing / ML',
    icon: Brain,
    desc: 'Build robust pickers, denoisers, and uncertainty estimators that can operate in real time.',
  },
  {
    title: 'Hardware / embedded systems',
    icon: Gauge,
    desc: 'Prototype the experiment, integrate sensors, and keep the system stable under field conditions.',
  },
  {
    title: 'Scientific communication',
    icon: Landmark,
    desc: 'Help turn the project into something funders, collaborators, and the public can understand quickly.',
  },
];

export const roadmap = [
  {
    phase: '1',
    title: 'Simulate the pipeline',
    text: 'Compare raw DAS, calibrated DAS, and hybrid readout behavior under controlled noise.',
  },
  {
    phase: '2',
    title: 'Bench test with reference sensors',
    text: 'Use a cable segment with co-located seismometer and strainmeter to learn the transfer function.',
  },
  {
    phase: '3',
    title: 'Field pilot on real fiber',
    text: 'Run the pipeline on a live telecom or dark-fiber route and test event detection quality.',
  },
  {
    phase: '4',
    title: 'EEW integration',
    text: 'Measure whether the hybrid stack improves arrival features and magnitude estimates early enough to matter.',
  },
];

export const experimentStages = [
  ['Raw DAS', 'Baseline phase fluctuations from fiber alone.'],
  ['Calibrated DAS', 'Reference-instrument aligned transfer function.'],
  ['QEWS candidate', 'The same pipeline, but with improved readout at the front end.'],
];

export const mapSites = [
  {
    name: 'Monterey Bay',
    role: 'Operational testbed',
    lat: 36.6,
    lon: -122.0,
    status: 'Live DAS EEW',
    note: 'A strong example of a fiber route tied to real-time seismic monitoring.',
  },
  {
    name: 'Cascadia margin',
    role: 'High-value warning zone',
    lat: 45.3,
    lon: -124.5,
    status: 'Candidate deployment',
    note: 'Dense coastal and offshore warning needs make this a compelling target.',
  },
  {
    name: 'Japan',
    role: 'Dense sensing region',
    lat: 36.2,
    lon: 138.3,
    status: 'Research hub',
    note: 'Excellent for combining telecom fibers, coastal monitoring, and rapid EEW workflows.',
  },
  {
    name: 'Taiwan',
    role: 'Fast-warning challenge',
    lat: 23.7,
    lon: 121.0,
    status: 'High-priority zone',
    note: 'Short warning windows make early-arrival feature quality especially important.',
  },
  {
    name: 'Chile',
    role: 'Subduction-zone test',
    lat: -35.5,
    lon: -71.0,
    status: 'Future field site',
    note: 'A useful environment for testing large-event saturation and long-range detection.',
  },
  {
    name: 'New Zealand',
    role: 'Island network case',
    lat: -41.3,
    lon: 174.8,
    status: 'Fiber-rich corridor',
    note: 'A practical setting to compare classical and hybrid pipelines on real infrastructure.',
  },
  {
    name: 'Mediterranean',
    role: 'Cross-border warning',
    lat: 37.8,
    lon: 15.0,
    status: 'Multi-network opportunity',
    note: 'Interesting because fiber routes, coastal population centers, and multiple agencies intersect.',
  },
  {
    name: 'Iceland',
    role: 'Volcanic + seismic',
    lat: 64.9,
    lon: -19.0,
    status: 'Special-case network',
    note: 'A compelling site for testing robustness across event types and sparse routes.',
  },
];
