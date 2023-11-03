import Header from "#/header";

import { docsConfig } from "@/config/docs";

import { DocsSidebarNav } from "./[[...slug]]/sidebar";

export const metadata = {
  title: "NextBird - Docs",
  description:
    "NextBird - open source healthchecks & statuspages for your Next.js Services.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between relative flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
          <DocsSidebarNav items={docsConfig.sidebar.items} />
        </aside>
        {/* <Menu /> */}
        {/* Move DocsSidebarNav to Menu for user control on mobile */}
        {children}
      </main>
    </>
  );
}
