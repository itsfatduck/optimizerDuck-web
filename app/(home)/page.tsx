import Link from 'next/link';
import { ContributorList } from '@/src/components/docs/ContributorList';
import { SupportCard } from '@/src/components/docs/SupportCard';
import { Footer } from '@/src/components/Footer';
import { Github, Code, Wrench, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-16">
      <div className="max-w-4xl space-y-8 w-full">
        <div className="flex justify-center mb-8">
          <img src="/icon.png" alt="optimizerDuck" className="w-48 h-48 drop-shadow-2xl" />
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight">
          optimizer<span className="text-[#d89b1d]">Duck</span>
        </h1>
        <p className="text-2xl font-semibold text-muted-foreground">Windows optimization tool</p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A simple and powerful multilingual open-source system optimizer for Windows, built by and for the community, helping you clean, tweak, and optimize your PC more easily than ever.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/docs/download" className="bg-[#d89b1d] hover:bg-[#b8860b] text-white px-6 py-3 rounded-full font-medium transition-colors">
            Download for Windows
          </Link>
          <Link href="/docs/guides/getting-started" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-full font-medium transition-colors border">
            Get Started
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="space-y-3 p-6 rounded-xl border bg-card/50">
            <div className="bg-secondary/50 w-12 h-12 rounded-lg flex items-center justify-center">
              <Github className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Open Source & Community</h3>
            <p className="text-muted-foreground text-sm">Proudly developed on GitHub with 500+ stars. optimizerDuck is built by and for the community to help everyone clean and tweak their PC.</p>
            <a href="https://github.com/itsfatduck/optimizerDuck" className="text-[#d89b1d] text-sm hover:underline font-medium block pt-2">View on GitHub</a>
          </div>
          <div className="space-y-3 p-6 rounded-xl border bg-card/50">
            <div className="bg-secondary/50 w-12 h-12 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Built with Modern Tech</h3>
            <p className="text-muted-foreground text-sm">Written in C# and powered by .NET. Focuses on performance, privacy, and simplicity with a sleek multilingual interface.</p>
            <a href="https://dotnet.microsoft.com/en-us/download" className="text-[#d89b1d] text-sm hover:underline font-medium block pt-2">View .NET</a>
          </div>
          <div className="space-y-3 p-6 rounded-xl border bg-card/50">
            <div className="bg-secondary/50 w-12 h-12 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Windows Optimization Suite</h3>
            <p className="text-muted-foreground text-sm">Optimize your PC with essential Windows tweaks, gaming enhancements, and privacy controls. Includes built-in utilities for startup management, scheduled tasks, and system customization.</p>
            <Link href="/docs/features/optimize" className="text-[#d89b1d] text-sm hover:underline font-medium block pt-2">View available features</Link>
          </div>
        </div>

        <div className="pt-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Thanks to all contributors</h2>
          <ContributorList repo="itsfatduck/optimizerDuck" />
        </div>

        <div className="pt-16 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Support the project</h2>
          <p className="text-muted-foreground mb-8 text-sm">If you find optimizerDuck helpful, consider buying me a coffee!</p>
          <div className="w-full">
            <SupportCard
              title="Buy me a coffee"
              description="Help keep optimizerDuck running and evolving. Your support makes continued updates and improvements possible."
              icon="kofi"
              url="https://ko-fi.com/itsfatduck"
              ctaText="Donate on Ko-fi"
              highlight={true}
              centered={true}
            />
          </div>
          <p className="inline-flex items-center gap-1.5 mt-6 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-[#ff5e5b] fill-[#ff5e5b]" />
            <span><strong className="text-foreground font-medium">Stefan Monov</strong> gave support!</span>
          </p>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}
