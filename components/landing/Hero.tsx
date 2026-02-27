"use client";

import Link from 'next/link';
import { Download, BookOpen, Terminal, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GitHubStats } from './GitHubStats';

// Discord brand icon
function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/>
    </svg>
  );
}

export function Hero() {
  const [version, setVersion] = useState("v1.0.0");
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/itsfatduck/optimizerDuck/releases')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setVersion(data[0].tag_name || data[0].name);
          const totalDownloads = data.reduce((acc: number, release: any) => {
            return acc + release.assets.reduce((assetAcc: number, asset: any) => assetAcc + asset.download_count, 0);
          }, 0);
          setDownloads(totalDownloads);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center min-h-[75vh] max-w-5xl mx-auto px-4 py-20 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <img src="/images/general/icon.png" alt="optimizerDuck Logo" className="w-20 h-20 md:w-28 md:h-28 object-contain" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-col sm:block">
          <span className="text-[#f27c13]">optimizer</span>
          <span className="text-[#fed114]">Duck</span>
        </h1>
      </div>

      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both leading-relaxed font-mono tracking-tight">
        &gt; A free, open-source Windows optimization tool. <br className="hidden md:block"/>
        &gt; Simply <span className="bg-linear-to-r from-[#fed114] via-[#f27c13] to-[#fed114] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(242,124,19,0.4)] font-bold">optimize</span> your PC.
      </p>

      <GitHubStats repo="itsfatduck/optimizerDuck" />

      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both w-full">
        {/* Row 1: Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:max-w-2xl">
          <Link
            href="/download"
            className="group flex flex-col items-center justify-center px-8 py-4 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-sm h-[72px] sm:max-w-xs w-full"
          >
            <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-all duration-500 group-hover:scale-110 group-hover:translate-y-2.5">
              <Download className="w-5 h-5 text-[#f27c13] transition-colors" />
              Download Now
            </span>
            
            <div className="relative h-4 mt-1 w-full flex justify-center">
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/40 dark:text-gray-500 transition-all duration-500 group-hover:translate-y-8 group-hover:opacity-0">
                <span>{version}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-white/20 dark:bg-gray-300" />
                <span>
                  {downloads !== null && downloads > 0 ? `${downloads.toLocaleString()} DLs` : 'WIN 10/11'}
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/docs"
            className="flex items-center justify-center gap-3 px-8 py-5 bg-transparent border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 rounded-xl text-sm uppercase tracking-wider group"
          >
            <Terminal className="w-5 h-5 text-[#f27c13] transition-transform group-hover:rotate-12" />
            Documentation
          </Link>
        </div>

        {/* Row 2: Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:max-w-2xl">
          <a
            href="https://discord.gg/optimizerduck"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#5865F2]/5 hover:bg-[#5865F2] text-[#5865F2] hover:text-white font-bold transition-all duration-300 border border-[#5865F2]/20 hover:border-[#5865F2] rounded-xl group"
          >
            <DiscordIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="uppercase tracking-wide text-xs">Discord</span>
          </a>

          <a
            href="https://github.com/itsfatduck/optimizerDuck"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold transition-all duration-300 border border-gray-200 dark:border-gray-800 rounded-xl group"
          >
            <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="uppercase tracking-wide text-xs">View Source</span>
          </a>
        </div>
      </div>
    </div>
  );
}
