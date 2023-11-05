import Footer from "#/footer";
import Header from "#/header";
import { Button } from "#/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "#/ui/sheet";
import { Book, Menu } from "lucide-react";

import { docsConfig } from "@/config/docs";

import { DocsSidebarNav } from "./[[...slug]]/_components/sidebar";

export const metadata = {
  title: "NextBird - Docs",
  description:
    "NextBird - open source healthchecks & statuspages for your Next.js Services.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 items-center justify-between relative sm:grid sm:grid-cols-[180px_1fr]">
        <aside className="fixed top-14 z-30 hidden h-full min-h-fit w-full shrink-0 overflow-y-auto border-r sm:px-1 py-6 sm:sticky sm:block">
          <DocsSidebarNav items={docsConfig.sidebar.items} />
        </aside>
        {/* <Menu /> */}
        {/* Move DocsSidebarNav to Menu for user control on mobile */}
        <Sheet>
          <SheetTrigger asChild className="absolute sm:hidden bottom-4 right-4 z-50">
            <Button variant="outline" className="p-2">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:hidden">
            <DocsSidebarNav items={docsConfig.sidebar.items} />
          </SheetContent>
        </Sheet>
        {children}
      </main>
      <Footer />
    </>
  );
}
