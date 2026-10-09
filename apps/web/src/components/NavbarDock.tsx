"use client";

import { useState, useEffect } from "react";
import { Briefcase, User, Layers, AppWindow } from "lucide-react";
import { Dock, DockCard, DockDivider } from "@/components/ui/dock";

interface NavItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: (active) => (
      <User
        className={`h-5 w-5 ${active ? "text-brand-base" : "text-foreground-secondary group-hover:text-foreground-primary"}`}
      />
    ),
  },
  {
    id: "services",
    label: "Services",
    href: "#services",
    icon: (active) => (
      <Layers
        className={`h-5 w-5 ${active ? "text-brand-base" : "text-foreground-secondary group-hover:text-foreground-primary"}`}
      />
    ),
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: (active) => (
      <Briefcase
        className={`h-5 w-5 ${active ? "text-brand-base" : "text-foreground-secondary group-hover:text-foreground-primary"}`}
      />
    ),
  },
  {
    id: "showcase",
    label: "Showcase",
    href: "#showcase",
    icon: (active) => (
      <AppWindow
        className={`h-5 w-5 ${active ? "text-brand-base" : "text-foreground-secondary group-hover:text-foreground-primary"}`}
      />
    ),
  },
];

const externalItems: NavItem[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/prakashnayak",
    external: true,
    icon: () => (
      <svg
        className="h-5 w-5 text-foreground-secondary group-hover:text-foreground-primary fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/prakashnayak",
    external: true,
    icon: () => (
      <svg
        className="h-4.5 w-4.5 text-foreground-secondary group-hover:text-foreground-primary fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
];

export default function NavbarDock() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = [
      { id: "about", el: document.getElementById("about") },
      { id: "services", el: document.getElementById("services") },
      { id: "projects", el: document.getElementById("projects") },
      { id: "showcase", el: document.getElementById("showcase") },
      { id: "contact", el: document.getElementById("contact") },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 200) {
        setActive("home");
        return;
      }

      const scrollPos = scrollY + window.innerHeight / 3;
      let currentSection = "home";

      for (const section of sections) {
        if (section.el) {
          const top = section.el.offsetTop;
          const height = section.el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = section.id;
            break;
          }
        }
      }

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.external) {
       window.open(item.href, "_blank");
       return;
    }

    if (item.href.startsWith("#")) {
      e.preventDefault();
      setActive(item.id);

      if (item.href === "#" || item.href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", window.location.pathname);
      } else {
        const el = document.querySelector(item.href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, "", item.href);
        }
      }
    }
  };

  return (
    <nav
      aria-label="Main Dock Navigation"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto origin-bottom max-sm:scale-[0.84]"
    >
      <Dock className="bg-background-primary/80 backdrop-blur-xl ring-1 ring-border-primary border-border-line/70">
        <DockCard
          id="logo"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.pushState(null, "", window.location.pathname);
            setActive("home");
          }}
          tooltip="Home"
        >
          <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-base-black font-mono text-sm font-semibold tracking-tight text-base-white">
            pn<span className="text-[#18e299]">.</span>
          </div>
        </DockCard>

        <DockDivider />

        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <DockCard
              key={item.id}
              id={item.id}
              onClick={(e) => handleNavClick(e, item)}
              tooltip={item.label}
            >
              <div className="flex h-full w-full items-center justify-center group">
                 {item.icon(isActive)}
              </div>
            </DockCard>
          );
        })}

        <DockDivider />

        {externalItems.map((item) => (
          <DockCard
            key={item.id}
            id={item.id}
            onClick={(e) => handleNavClick(e, item)}
            tooltip={item.label}
          >
            <div className="flex h-full w-full items-center justify-center group">
              {item.icon(false)}
            </div>
          </DockCard>
        ))}
      </Dock>
    </nav>
  );
}
