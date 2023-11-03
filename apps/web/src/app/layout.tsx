import type { Metadata } from "next";
import { GeistMono, GeistSans } from "geist/font";

import "./globals.css";

import Providers from "#/providers";
import { cn } from "~/utils";

export const metadata: Metadata = {
  title: "NextBird - Home",
  description:
    "NextBird - open source healthchecks & statuspages for your Next.js Services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Apply GeistMono and GeistSans as tailwind variable and set GeistSans as default font. */}
      <body
        className={cn(
          "h-full flex flex-col relative",
          GeistSans.variable,
          GeistMono.variable,
          GeistSans.className,
        )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
