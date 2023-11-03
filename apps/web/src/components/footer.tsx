import Link from "next/link";
import { Github, Twitter } from "lucide-react";

import { Badge } from "./ui/badge";

export default function Footer() {
  return (
    <footer className="flex w-full border-t p-4 backdrop-blur-sm bottom-0 h-auto flex-grow-0 flex-col md:flex-row items-center gap-2">
      <section className="container">
        <div className="flex gap-2 sm:gap-1 text-sm sm:text-base flex-col sm:flex-row justify-center items-center">
          <div className="flex gap-1">
            Build by
            <Link
              href="https://twitter.com/mvdlei"
              className="flex w-fit justify-center items-center gap-1">
              <span className="hover:underline transition-all font-bold">@mvdlei</span>
              <Twitter size={16} />.
            </Link>
          </div>
          <div className="flex gap-1">
            Source code available on
            <Link
              href="https://github.com/m10rten/nextbird"
              className="flex w-fit justify-center items-center gap-1">
              <span className="hover:underline transition-all font-bold">
                m10rten/nextbird
              </span>
              <Github size={16} />.
            </Link>
          </div>
        </div>
      </section>
      <Badge
        className="flex flex-row relative justify-center items-center w-fit gap-2"
        variant={"outline"}>
        Operational
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
        </span>
      </Badge>
    </footer>
  );
}
