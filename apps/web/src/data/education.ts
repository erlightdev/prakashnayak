export interface Education {
  id: string;
  qualification: string;
  school: string;
  url: string;
  /** Square logo in /public/logos. */
  logo: string;
  location: string;
  period: string;
  details: string;
  /** Optional standout work, e.g. a published final-year project. */
  highlight?: { title: string; summary: string; url: string; label: string };
}

/** Education from the résumé, most recent first. */
export const education: Education[] = [
  {
    id: "be",
    logo: "/logos/bmsit.webp",
    qualification: "B.E. in Computer Science & Engineering",
    school: "BMS Institute of Technology and Management",
    url: "https://bmsit.ac.in/",
    location: "Bangalore, India",
    period: "2014 — 2018",
    details: "Four-year engineering degree affiliated with Visvesvaraya Technological University.",
    highlight: {
      title: "Earthquake early warning system with real-time messaging",
      summary:
        "Final-year project: an Arduino and accelerometer system that detects tremors and alerts people by SMS, lights and sound, logging data for seismic research.",
      url: "https://dub.sh/researchgate",
      label: "Published on ResearchGate · Jun 2018",
    },
  },
  {
    id: "hseb",
    logo: "/logos/kmc.webp",
    qualification: "Higher Secondary (+2)",
    school: "Kathmandu Model Secondary School",
    url: "https://ktmmodelcollege.edu.np/",
    location: "Kathmandu, Nepal",
    period: "2011 — 2013",
    details: "Completed +2 under Nepal's Higher Secondary Education Board.",
  },
  {
    id: "slc",
    logo: "/logos/nhss.webp",
    qualification: "School Leaving Certificate (SLC)",
    school: "Nightingale Higher Secondary School",
    url: "https://nightingale.edu.np/",
    location: "Lalitpur, Nepal",
    period: "2011",
    details: "Completed secondary school with the national School Leaving Certificate.",
  },
];
