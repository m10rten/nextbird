"use client";

import React from "react";

import useMouseMove from "@/hooks/use-mouse-move";

export default function Background() {
  // --x and --y will be updated based on mouse position
  useMouseMove();
  return (
    <>
      <div className="fixed left-0 top-0 -z-50">
        <div className="sticky left-0 top-0 h-screen w-screen overflow-hidden">
          <div className="bg-muted-foreground/10 absolute inset-0 z-[-1]" />
          <div className="bg-gradient-radial from-muted-foreground/75 absolute left-[--x] top-[--y] z-[-1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full from-0% to-transparent to-90% blur-md" />
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern
                id="dotted-pattern"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="black" />
              </pattern>
              <mask id="dots-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="hsl(var(--background))"
              mask="url(#dots-mask)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
