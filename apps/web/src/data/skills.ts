export interface Skill {
  name: string;
  /** File in /public/logos/skills (Simple Icons, or theSVG when Simple Icons lacks it). */
  icon?: string;
  /** Brand colour. Omitted for black/white marks, which follow the text colour instead. */
  color?: string;
  /** Full-colour SVG (from theSVG) shown as-is instead of masked. */
  multicolor?: boolean;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: Skill[];
}

const BRAND: Record<string, string> = {
  adobepremierepro: "#9999FF",
  astro: "#BC52EE",
  biome: "#60A5FA",
  canva: "#00C4CC",
  claude: "#D97757",
  cloudflare: "#F38020",
  css: "#663399",
  django: "#44B78B",
  docker: "#2496ED",
  drizzle: "#C5F74F",
  figma: "#F24E1E",
  filament: "#FDAE4B",
  git: "#F03C2E",
  githubactions: "#2088FF",
  googleanalytics: "#E37400",
  googlegemini: "#8E75B2",
  googlesearchconsole: "#458CF5",
  gunicorn: "#499848",
  html5: "#E34F26",
  javascript: "#F7DF1E",
  laravel: "#FF2D20",
  linux: "#FCC624",
  mysql: "#4479A1",
  nginx: "#009639",
  nodedotjs: "#5FA04E",
  openapiinitiative: "#6BA539",
  php: "#777BB4",
  postgresql: "#4169E1",
  postman: "#FF6C37",
  python: "#3776AB",
  react: "#61DAFB",
  sqlite: "#0F80CC",
  stripe: "#635BFF",
  tailwindcss: "#06B6D4",
  typescript: "#3178C6",
  vite: "#9135FF",
  woocommerce: "#96588A",
  wordpress: "#21759B",
};

const i = (slug: string) => `/logos/skills/${slug}.svg`;

/** Skills from the résumé, grouped the same way. */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "HTML", icon: i("html5"), color: BRAND.html5 },
      { name: "CSS", icon: i("css"), color: BRAND.css },
      { name: "JavaScript", icon: i("javascript"), color: BRAND.javascript },
      { name: "TypeScript", icon: i("typescript"), color: BRAND.typescript },
      { name: "React", icon: i("react"), color: BRAND.react },
      { name: "Next.js", icon: i("nextdotjs"), color: BRAND.nextdotjs },
      { name: "Astro", icon: i("astro"), color: BRAND.astro },
      { name: "Vite", icon: i("vite"), color: BRAND.vite },
      { name: "Tailwind CSS", icon: i("tailwindcss"), color: BRAND.tailwindcss },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "PHP", icon: i("php"), color: BRAND.php },
      { name: "WordPress", icon: i("wordpress"), color: BRAND.wordpress },
      { name: "WooCommerce", icon: i("woocommerce"), color: BRAND.woocommerce },
      { name: "Node.js", icon: i("nodedotjs"), color: BRAND.nodedotjs },
      { name: "Bun", icon: i("bun"), color: BRAND.bun },
      { name: "Express.js", icon: i("express"), color: BRAND.express },
      { name: "Python", icon: i("python"), color: BRAND.python },
      { name: "Django", icon: i("django"), color: BRAND.django },
      { name: "Laravel", icon: i("laravel"), color: BRAND.laravel },
      { name: "Filament", icon: i("filament"), color: BRAND.filament },
      { name: "Prisma", icon: i("prisma"), color: BRAND.prisma },
      { name: "Drizzle", icon: i("drizzle"), color: BRAND.drizzle },
      { name: "REST APIs", icon: i("openapiinitiative"), color: BRAND.openapiinitiative },
      { name: "oRPC" },
      { name: "Better Auth", icon: i("betterauth"), color: BRAND.betterauth },
      { name: "Stripe", icon: i("stripe"), color: BRAND.stripe },
      { name: "Dodo Payments", icon: i("dodo-payments"), multicolor: true },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "PostgreSQL", icon: i("postgresql"), color: BRAND.postgresql },
      { name: "MySQL", icon: i("mysql"), color: BRAND.mysql },
      { name: "SQLite", icon: i("sqlite"), color: BRAND.sqlite },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: [
      { name: "GitHub Actions", icon: i("githubactions"), color: BRAND.githubactions },
      { name: "Linux VPS", icon: i("linux"), color: BRAND.linux },
      { name: "Cloudflare", icon: i("cloudflare"), color: BRAND.cloudflare },
      { name: "nginx", icon: i("nginx"), color: BRAND.nginx },
      { name: "Gunicorn", icon: i("gunicorn"), color: BRAND.gunicorn },
      { name: "systemd" },
      { name: "Docker", icon: i("docker"), color: BRAND.docker },
    ],
  },
  {
    id: "analytics",
    label: "Analytics & SEO",
    skills: [
      { name: "Search Console", icon: i("googlesearchconsole"), color: BRAND.googlesearchconsole },
      { name: "Google Analytics", icon: i("googleanalytics"), color: BRAND.googleanalytics },
      { name: "PostHog", icon: i("posthog"), color: BRAND.posthog },
    ],
  },
  {
    id: "tools",
    label: "Tools & AI",
    skills: [
      { name: "Git", icon: i("git"), color: BRAND.git },
      { name: "GitHub", icon: i("github"), color: BRAND.github },
      { name: "Postman", icon: i("postman"), color: BRAND.postman },
      { name: "Figma", icon: i("figma"), color: BRAND.figma },
      { name: "Canva", icon: i("canva"), color: BRAND.canva },
      { name: "Biome", icon: i("biome"), color: BRAND.biome },
      { name: "VS Code", icon: i("visual-studio-code"), multicolor: true },
      { name: "Antigravity", icon: i("google-antigravity"), multicolor: true },
      { name: "Claude", icon: i("claude"), color: BRAND.claude },
      { name: "Codex", icon: i("openai"), color: BRAND.openai },
      { name: "Gemini", icon: i("googlegemini"), color: BRAND.googlegemini },
      { name: "MCP", icon: i("modelcontextprotocol"), color: BRAND.modelcontextprotocol },
      { name: "Premiere Pro", icon: i("adobepremierepro"), color: BRAND.adobepremierepro },
      { name: "CapCut", icon: i("capcut") },
      { name: "Remotion", icon: i("remotion"), multicolor: true },
    ],
  },
];
