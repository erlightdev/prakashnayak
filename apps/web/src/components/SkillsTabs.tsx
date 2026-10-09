"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { skillGroups, type Skill } from "@/data/skills";

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <li className="group inline-flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-sm text-foreground-secondary ring-1 ring-inset ring-border-line transition-colors hover:bg-background-secondary hover:text-foreground-primary">
      {skill.icon && skill.multicolor ? (
        <img
          src={skill.icon}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          className="h-4 w-4 shrink-0"
        />
      ) : skill.icon ? (
        // Masked so the mark takes its brand colour, or the text colour when it has none.
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 bg-current"
          style={{
            backgroundColor: skill.color,
            maskImage: `url(${skill.icon})`,
            WebkitMaskImage: `url(${skill.icon})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-current/10 font-mono text-[9px] font-semibold"
        >
          {skill.name[0]}
        </span>
      )}
      {skill.name}
    </li>
  );
}

function SkillList({ skills }: { skills: Skill[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillChip key={skill.name} skill={skill} />
      ))}
    </ul>
  );
}

export default function SkillsTabs() {
  return (
    <Tabs defaultValue="all" variant="pill">
      <TabsList
        aria-label="Skill categories"
        wrapperClassName="max-w-full"
        className="ring-1 ring-inset ring-border-line"
      >
        <TabsTrigger value="all">All</TabsTrigger>
        {skillGroups.map((group) => (
          <TabsTrigger key={group.id} value={group.id}>
            {group.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <dl className="flex flex-col">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="grid gap-3 border-t border-border-line py-4 first:border-t-0 first:pt-0 md:grid-cols-[10rem_1fr] md:gap-6"
            >
              <dt className="pt-1.5 font-mono text-xs text-foreground-tertiary">{group.label}</dt>
              <dd>
                <SkillList skills={group.skills} />
              </dd>
            </div>
          ))}
        </dl>
      </TabsContent>

      {skillGroups.map((group) => (
        <TabsContent key={group.id} value={group.id} className="mt-6">
          <SkillList skills={group.skills} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
