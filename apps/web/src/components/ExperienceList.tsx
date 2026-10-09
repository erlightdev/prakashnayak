"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import {
  CenterMorphModal,
  CenterMorphModalContent,
  CenterMorphModalTrigger,
} from "@/components/motion/center-morph-modal";
import { experience, type Experience } from "@/data/experience";

function ExperienceDetail({ item }: { item: Experience }) {
  return (
    <div className="flex flex-col gap-6 p-6 sm:p-7">
      <header className="flex items-start gap-3 pr-10">
        <img
          src={item.logo}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-[10px] ring-1 ring-inset ring-border-line"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium leading-snug tracking-tight text-foreground-primary">
            {item.role}
          </h3>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-sm text-foreground-secondary transition-colors hover:text-brand-base"
          >
            {item.company}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <p className="font-mono text-xs text-foreground-tertiary">
            {item.start} — {item.end} · {item.location}
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-5">
        {item.groups.map((group) => (
          <section key={group.title} className="flex flex-col gap-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted">
              {group.title}
            </h4>
            <ul className="flex flex-col gap-1.5">
              {group.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-4 text-sm leading-relaxed text-foreground-secondary before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-brand-base"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ul className="flex flex-wrap gap-1.5 border-t border-border-line pt-4">
        {item.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-[4px] px-1.5 py-0.5 font-mono text-[11px] text-foreground-tertiary ring-1 ring-inset ring-border-line"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceList() {
  return (
    <ol className="flex flex-col">
      {experience.map((item) => (
        <li key={item.id} className="border-t border-border-line first:border-t-0">
          <CenterMorphModal>
            <CenterMorphModalTrigger>
              <button
                type="button"
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 px-4 py-5 text-left transition-colors hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:outline-none md:grid-cols-[10rem_1fr_auto] md:px-8"
              >
                <span className="col-span-2 font-mono text-xs text-foreground-tertiary tabular-nums md:col-span-1">
                  {item.start} — {item.end}
                </span>
                <span className="flex min-w-0 items-center gap-3">
                  <img
                    src={item.logo}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                    className="h-9 w-9 shrink-0 rounded-[8px] ring-1 ring-border-line"
                  />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[15px] font-medium tracking-tight text-foreground-primary">
                      {item.role}
                    </span>
                    <span className="truncate text-sm text-foreground-tertiary">
                      {item.company}
                      <span className="hidden sm:inline"> · {item.summary}</span>
                    </span>
                  </span>
                </span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted ring-1 ring-inset ring-border-line transition-all duration-200 group-hover:rotate-90 group-hover:text-brand-base group-hover:ring-brand-20"
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </CenterMorphModalTrigger>
            <CenterMorphModalContent
              ariaLabel={`${item.role} at ${item.company}`}
              className="max-w-[34rem] border-border-secondary bg-background-primary"
            >
              <ExperienceDetail item={item} />
            </CenterMorphModalContent>
          </CenterMorphModal>
        </li>
      ))}
    </ol>
  );
}
