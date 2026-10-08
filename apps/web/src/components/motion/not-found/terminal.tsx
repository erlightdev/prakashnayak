"use client";

import { useEffect, useState } from "react";
import {
  NOT_FOUND_DEFAULTS,
  NotFoundActions,
  NotFoundStage,
  type NotFoundProps,
} from "./shared";

export interface NotFoundTerminalProps extends NotFoundProps {
  path?: string;
}

export function NotFoundTerminal({
  className,
  code = NOT_FOUND_DEFAULTS.code,
  title = NOT_FOUND_DEFAULTS.title,
  description = NOT_FOUND_DEFAULTS.description,
  homeHref,
  homeLabel,
  browseHref,
  browseLabel,
  path = "/page",
}: NotFoundTerminalProps) {
  const [targetPath, setTargetPath] = useState(path);
  const [typedLine1, setTypedLine1] = useState(`$ cd ${path}`);
  const [showError, setShowError] = useState(true);
  const [typedLine3, setTypedLine3] = useState(`$ status ${code}`);


  // Sync with actual client-side pathname if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      if (p && p !== "/" && p !== "/404") {
        setTargetPath(p);
      } else if (path && path !== "/") {
        setTargetPath(path);
      }
    }
  }, [path]);

  // Typewriter animation on mount / path change
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fullLine1 = `$ cd ${targetPath}`;
    const fullLine3 = `$ status ${code}`;
    let charIdx = 0;

    setTypedLine1("");
    setShowError(false);
    setTypedLine3("");

    const typeLine1 = () => {
      if (charIdx <= fullLine1.length) {
        setTypedLine1(fullLine1.slice(0, charIdx));
        charIdx++;
        timeoutId = setTimeout(typeLine1, 35);
      } else {
        timeoutId = setTimeout(() => {
          setShowError(true);
          timeoutId = setTimeout(() => {
            let idx3 = 0;
            const typeLine3 = () => {
              if (idx3 <= fullLine3.length) {
                setTypedLine3(fullLine3.slice(0, idx3));
                idx3++;
                timeoutId = setTimeout(typeLine3, 40);
              }
            };
            typeLine3();
          }, 400);
        }, 250);
      }
    };

    timeoutId = setTimeout(typeLine1, 150);

    return () => clearTimeout(timeoutId);
  }, [targetPath, code]);

  return (
    <NotFoundStage className={className}>
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-neutral-950 text-left shadow-lg">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-white/50">~/prakashnayak</span>
        </div>
        <div className="space-y-1.5 p-4 font-mono text-sm leading-relaxed min-h-[110px]">
          <p className="text-white/80">
            {typedLine1}
            {!showError && (
              <span className="ml-1 inline-block h-[1.1em] w-[0.55ch] translate-y-[0.12em] bg-white/80 motion-safe:animate-pulse" />
            )}
          </p>
          {showError && (
            <p className="text-[#ff5f57]">
              cd: no such file or directory: {targetPath}
            </p>
          )}
          {showError && (
            <p className="flex items-center text-white/80">
              <span>{typedLine3}</span>
              <span className="ml-1 inline-block h-[1.1em] w-[0.55ch] translate-y-[0.12em] bg-white/80 motion-safe:animate-pulse" />
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-foreground">{title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      <NotFoundActions
        homeHref={homeHref}
        homeLabel={homeLabel}
        browseHref={browseHref}
        browseLabel={browseLabel}
      />
    </NotFoundStage>
  );
}
