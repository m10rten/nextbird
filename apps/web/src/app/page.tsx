import Link from "next/link";

import Footer from "#/footer";
import Header from "#/header";
import Pattern from "#/pattern";
import { Button } from "#/ui/button";

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-between p-8 backdrop-blur-[1px] rounded-xl border">
      <h3 className="text-2xl font-bold text-left w-full">{title}</h3>
      <p className="text-secondary-foreground/70 mt-1 px-1">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between container py-16">
        <h1 className="sm:text-6xl text-5xl font-sans font-extrabold from-primary text-center p-6 to-cyan-600 dark:to-cyan-300 bg-gradient-to-r text-transparent bg-clip-text">
          The Uptime Monitoring Solution For Next.js Applications.
        </h1>
        <p className="sm:text-lg text-center font-normal text-secondary-foreground/70 pb-6">
          Monitor your Next.js application with ease. See how your application is
          performing and get notified when it&apos;s down.
        </p>
        <div className="flex gap-4">
          <Button asChild className="sm:px-6 font-medium py-2">
            <Link href="/docs/getting-started">Get started</Link>
          </Button>
          <Button asChild variant="outline" className="font-mono py-5 font-medium">
            <Link href="/docs">Documentation</Link>
          </Button>
        </div>
        <section className="flex flex-col items-center justify-between mt-16">
          <h2 className="sm:text-5xl text-4xl font-sans font-extrabold">Features</h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <FeatureCard
              title="Uptime monitoring"
              description="Get notified when your application is down. We will send you an email when your application is down and when it's up again."
            />
            <FeatureCard
              title="Performance monitoring"
              description="See how your application is performing on an hourly basis. Analyze your application's performance and see how it's doing."
            />
            <FeatureCard
              title="Easy to use"
              description="NextBird is easy to use. Just install the package, set it up once and you're ready to go. No configuration needed."
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="sm:text-5xl text-4xl font-sans font-extrabold">Powered By</h2>
        </section>
        <section className="mt-16">
          <h2 className="sm:text-5xl text-4xl font-sans font-extrabold">
            Free & Open Source
          </h2>
        </section>
      </main>
      <Pattern />
      <Footer />
    </>
  );
}
