export interface ExperienceGroup {
  title: string;
  points: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  initials: string;
  /** Placeholder until real logos are added. */
  logo: string;
  url: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  groups: ExperienceGroup[];
  stack: string[];
}

/** Professional experience from the résumé, newest first. */
export const experience: Experience[] = [
  {
    id: "tda",
    role: "WordPress & UI/UX Developer",
    company: "The Development Agency",
    initials: "TDA",
    logo: "/logos/tda.png",
    url: "https://thedevelopment.com.au/",
    location: "Chabahil, Kathmandu",
    start: "Dec 2024",
    end: "Present",
    summary: "React frontends and custom WordPress builds for an Australian agency.",
    groups: [
      {
        title: "Frontend & WordPress",
        points: [
          "Built responsive React interfaces for PopSocialIQ, speeding up feature delivery by 20%",
          "Built custom WordPress themes tailored to client goals",
          "Kept UI/UX clean and consistent across devices",
        ],
      },
      {
        title: "Optimization, security & branding",
        points: [
          "Applied SEO best practices to improve search visibility",
          "Shipped security hardening and performance work for faster loads",
          "Kept visual identity consistent across projects",
        ],
      },
      {
        title: "React frontend",
        points: ["Built interactive interfaces with seamless API integration for real-time data"],
      },
    ],
    stack: ["React", "Tailwind CSS", "WordPress", "SEO", "UI/UX"],
  },
  {
    id: "avocado",
    role: "Full-Stack WordPress & UI/UX Developer",
    company: "Avocado Technology",
    initials: "AT",
    logo: "/logos/avocado.svg",
    url: "https://avocado.com.np/",
    location: "Patan, Lalitpur",
    start: "Oct 2022",
    end: "Oct 2024",
    summary: "Headless WordPress, React and Next.js products for client teams.",
    groups: [
      {
        title: "Full-stack WordPress",
        points: [
          "Developed custom themes with advanced functionality and responsive design",
          "Moved to a headless WordPress + React architecture, cutting time-to-interactive by 35%",
        ],
      },
      {
        title: "Modern frontend",
        points: [
          "Delivered 5+ React and Next.js projects ahead of schedule",
          "Built responsive designs with Tailwind CSS",
          "Improved performance with code splitting, lazy loading and lean state management",
        ],
      },
      {
        title: "Client process",
        points: [
          "Ran agile workflows with daily client updates and feedback loops",
          "Trained clients on content management and site maintenance",
        ],
      },
    ],
    stack: ["WordPress", "React", "Next.js", "Tailwind CSS", "Headless CMS"],
  },
  {
    id: "insight",
    role: "WordPress Developer",
    company: "Insight Technology",
    initials: "IT",
    logo: "/logos/insight.png",
    url: "https://insighttechintl.com/",
    location: "Lalitpur",
    start: "Sep 2018",
    end: "Sep 2022",
    summary: "Custom themes, WooCommerce stores and SEO for 10+ clients.",
    groups: [
      {
        title: "Custom themes",
        points: [
          "Built WordPress themes with custom post types and taxonomies",
          "Developed responsive frontends with HTML5, CSS3 and JavaScript",
        ],
      },
      {
        title: "E-commerce",
        points: [
          "Built custom WooCommerce integrations for 10+ clients, lifting checkout conversion by 15% on average",
        ],
      },
      {
        title: "SEO & performance",
        points: [
          "Ran SEO strategies with Yoast SEO, improving organic rankings by up to 25%",
          "Cut page load times by 40%",
          "Set up Google Analytics and Search Console tracking",
        ],
      },
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "JavaScript", "Yoast SEO"],
  },
];
