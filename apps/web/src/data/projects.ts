export interface Project {
  id: string;
  name: string;
  url: string;
  /** Homepage capture in /public/projects. */
  image: string;
  /** What it is and what I did, kept to about two lines. */
  description: string;
  stack: string[];
  /** Brand tones for the hover backdrop, darkest first. */
  accent: [string, string, string];
}

export const projects: Project[] = [
  {
    id: "popsocialiq",
    name: "PopSocialIQ",
    url: "https://popsocialiq.com/",
    image: "/projects/popsocialiq.webp",
    description:
      "Social media analytics for creators and brands. Led the frontend for the marketing site and dashboard.",
    stack: ["React", "Tailwind CSS", "REST APIs"],
    accent: ["#4c1d95", "#7c3aed", "#c4b5fd"],
  },
  {
    id: "openvoice",
    name: "OpenVoice",
    url: "https://openvoice.studio/",
    image: "/projects/openvoice.webp",
    description: "AI voice cloning and text-to-speech platform for apps, agents and content.",
    stack: ["Next.js", "TypeScript", "AI"],
    accent: ["#9a2d0b", "#fa4616", "#fdba8c"],
  },
  {
    id: "selim",
    name: "Selim Solutions",
    url: "https://selim.solutions/",
    image: "/projects/selim.webp",
    description:
      "Managed security (SOC) company site with an interactive threat-detection dashboard hero.",
    stack: ["React", "UI/UX"],
    accent: ["#1e1b4b", "#4f46e5", "#a5b4fc"],
  },
  {
    id: "abstractinfosys",
    name: "Abstract Infosys",
    url: "https://abstractinfosys.com/",
    image: "/projects/abstractinfosys.webp",
    description: "Digital marketing agency site in Nepal, built for SEO, lead capture and speed.",
    stack: ["WordPress", "SEO"],
    accent: ["#7c2d12", "#f97316", "#fed7aa"],
  },
  {
    id: "jeeptournepal",
    name: "Jeep Tour Nepal",
    url: "https://jeeptournepal.com/",
    image: "/projects/jeeptournepal.webp",
    description:
      "Jeep tours and vehicle rental across Nepal. Custom WordPress theme with booking forms and tour filtering.",
    stack: ["WordPress", "PHP", "SEO"],
    accent: ["#14532d", "#16a34a", "#bbf7d0"],
  },
  {
    id: "insight",
    name: "Insight Technology",
    url: "https://insighttechintl.com/",
    image: "/projects/insight.webp",
    description:
      "Company site for a Nepali cybersecurity and cloud solutions firm, built on WordPress.",
    stack: ["WordPress", "PHP"],
    accent: ["#064e3b", "#10b981", "#a7f3d0"],
  },
];
