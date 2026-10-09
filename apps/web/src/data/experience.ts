export interface ExperienceGroup {
  title: string;
  points: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  /** Square logo in /public/logos. */
  logo: string;
  /** Omitted when the company has no live site. */
  url?: string;
  location: string;
  start: string;
  end: string;
  /** One line shown in the list; the modal never repeats it. */
  summary: string;
  groups: ExperienceGroup[];
  /** Technologies only — skills already described in the points stay out. */
  stack: string[];
}

/** Professional experience, current roles first. */
export const experience: Experience[] = [
  {
    id: "hiver",
    role: "Founder & CEO",
    company: "Hiver Technology",
    logo: "/logos/hiver.webp",
    location: "Nepal",
    start: "2020",
    end: "Present",
    summary: "Founded and run a 5-person studio for web, e-commerce and marketing.",
    groups: [
      {
        title: "Leadership",
        points: [
          "Lead a team of 5 across design, development and marketing: hiring, mentoring and reviewing work",
          "Set the company's services, pricing and weekly delivery process",
        ],
      },
      {
        title: "Clients",
        points: [
          "Own projects end to end, from discovery and proposals to scope, budget and handover",
          "Act as technical lead, choosing the stack and architecture for each build",
        ],
      },
      {
        title: "Delivery",
        points: [
          "Ship websites, SaaS products and WooCommerce and Shopify stores",
          "Run social media marketing and paid ad campaigns",
        ],
      },
    ],
    stack: ["WordPress", "WooCommerce", "Shopify", "React", "Meta Ads"],
  },
  {
    id: "tda",
    role: "WordPress & UI/UX Developer",
    company: "The Development Agency",
    logo: "/logos/tda.png",
    url: "https://thedevelopment.com.au/",
    location: "Kathmandu",
    start: "Dec 2024",
    end: "Present",
    summary: "React and WordPress builds for an Australian digital agency.",
    groups: [
      {
        title: "Frontend",
        points: [
          "Built PopSocialIQ's React interface, speeding up feature delivery by 20%",
          "Integrated APIs for real-time data, focused on performance and usability",
          "Built custom WordPress themes around each client's goals",
        ],
      },
      {
        title: "Quality",
        points: [
          "Improved SEO, security and page speed across client sites",
          "Kept branding and UI consistent across devices and projects",
        ],
      },
    ],
    stack: ["React", "Tailwind CSS", "WordPress", "REST APIs"],
  },
  {
    id: "avocado",
    role: "Full-Stack WordPress & UI/UX Developer",
    company: "Avocado Technology",
    logo: "/logos/avocado.svg",
    url: "https://avocado.com.np/",
    location: "Lalitpur",
    start: "Oct 2022",
    end: "Oct 2024",
    summary: "Headless WordPress, React and Next.js builds for client teams.",
    groups: [
      {
        title: "Engineering",
        points: [
          "Moved sites to headless WordPress with React, cutting time-to-interactive by 35%",
          "Delivered 5+ React and Next.js projects ahead of schedule",
          "Improved load performance with code splitting and lazy loading",
        ],
      },
      {
        title: "Client process",
        points: [
          "Ran agile delivery with daily client updates",
          "Trained clients to manage content and maintain their sites",
        ],
      },
    ],
    stack: ["WordPress", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "insight",
    role: "WordPress Developer",
    company: "Insight Technology",
    logo: "/logos/insight.png",
    url: "https://insighttechintl.com/",
    location: "Lalitpur",
    start: "Sep 2018",
    end: "Sep 2022",
    summary: "Custom WordPress themes, WooCommerce stores and SEO.",
    groups: [
      {
        title: "Build",
        points: [
          "Built custom themes with custom post types and taxonomies",
          "Delivered WooCommerce stores for 10+ clients, lifting checkout conversion by 15%",
        ],
      },
      {
        title: "Growth",
        points: [
          "Raised organic rankings by up to 25% with Yoast-led SEO",
          "Cut page load times by 40% and set up Analytics and Search Console",
        ],
      },
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "JavaScript", "Yoast SEO"],
  },
];
