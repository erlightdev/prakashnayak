"use client";

import { ArrowUpRight } from "lucide-react";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { education } from "@/data/education";

export default function EducationAccordion() {
  const items = education.map((item) => {
    return {
      id: item.id,
      icon: (
        <img
          src={item.logo}
          alt=""
          width={36}
          height={36}
          loading="lazy"
          className="h-9 w-9 rounded-[10px] bg-white object-contain ring-1 ring-inset ring-border-line"
        />
      ),
      title: (
        <span className="flex items-baseline justify-between gap-4">
          <span className="flex min-w-0 flex-col">
            <span className="text-[15px] font-medium text-foreground-primary">
              {item.qualification}
            </span>
            <span className="truncate text-sm font-normal text-foreground-tertiary">
              {item.school}
            </span>
          </span>
          <span className="shrink-0 font-mono text-xs font-normal text-foreground-tertiary tabular-nums">
            {item.period}
          </span>
        </span>
      ),
      description: (
        <div className="flex flex-col gap-4 pl-[3.25rem]">
          <p className="text-sm text-foreground-secondary">
            {item.details}{" "}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 whitespace-nowrap text-foreground-tertiary transition-colors hover:text-brand-base"
            >
              {item.location}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </p>
          {item.highlight ? (
            <a
              href={item.highlight.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-[14px] bg-background-primary p-4 ring-1 ring-inset ring-border-line transition-colors hover:ring-brand-20"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-base">
                {item.highlight.label}
              </span>
              <span className="flex items-start justify-between gap-3 text-sm font-medium text-foreground-primary">
                {item.highlight.title}
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-foreground-muted transition-colors group-hover:text-brand-base"
                  aria-hidden="true"
                />
              </span>
              <span className="text-sm leading-relaxed text-foreground-secondary">
                {item.highlight.summary}
              </span>
            </a>
          ) : null}
        </div>
      ),
    };
  });

  return (
    <BouncyAccordion
      items={items}
      classNames={{
        item: "bg-background-secondary ring-1 ring-inset ring-border-line",
        trigger: "min-h-[72px] py-3 hover:bg-background-tertiary/30",
        icon: "h-9 w-9",
        title: "overflow-visible whitespace-normal",
      }}
    />
  );
}
