import Link from "next/link";
import ThemeSwitch from "#/theme-switch";
import { Button } from "#/ui/button";
import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b py-2 px-4 z-50 backdrop-blur-md bg-background/80 shadow-sm">
      <nav className="w-full justify-between flex items-center my-1 sm:container">
        <Link href={"/"}>
          <h1 className="font-mono text-xl font-bold">NextBird</h1>
        </Link>
        <div className="flex items-center sm:gap-5 gap-3 group sm:px-3 px-1">
          <Button asChild variant={"outline"} className="px-3 sm:px-4">
            <Link href={"https://github.com/m10rten/nextbird"}>
              <Github size={24} />
            </Link>
          </Button>
          <Link href="/docs" className="hover:underline transition-all">
            Docs
          </Link>
          <Link href="/about" className="hover:underline transition-all">
            About
          </Link>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
