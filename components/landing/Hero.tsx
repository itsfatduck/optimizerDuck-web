"use client";

import Link from 'next/link';
import { Download, Terminal, Github, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GitHubStats } from './GitHubStats';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Discord brand icon
function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
    </svg>
  );
}

export function Hero() {
  const [version, setVersion] = useState("~");
  const [downloads, setDownloads] = useState<number | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDownload = () => {
    if (downloadUrl) {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
    }
  };

  useEffect(() => {
    fetch('https://api.github.com/repos/itsfatduck/optimizerDuck/releases')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          const latestRelease = data[0];
          setVersion(latestRelease.tag_name || latestRelease.name);

          // Find the setup/exe file in assets
          const setupAsset = latestRelease.assets.find((asset: any) =>
            asset.name.endsWith('.exe') || asset.name.includes('setup')
          );
          if (setupAsset) {
            setDownloadUrl(setupAsset.browser_download_url);
          } else if (latestRelease.assets.length > 0) {
            setDownloadUrl(latestRelease.assets[0].browser_download_url);
          }

          const totalDownloads = data.reduce((acc: number, release: any) => {
            return acc + (release.assets || []).reduce((assetAcc: number, asset: any) => assetAcc + (asset.download_count || 0), 0);
          }, 0);
          setDownloads(totalDownloads);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center min-h-[calc(100vh-64px)] -mt-4 max-w-5xl mx-auto px-4 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <img src="/images/general/icon.png" alt="optimizerDuck Logo" className="w-20 h-20 md:w-28 md:h-28 object-contain" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground flex flex-col sm:block font-mono">
          <span className="text-[#f27c13]">optimizer</span>
          <span className="text-[#fed114]">Duck</span>
        </h1>
      </div>

      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both leading-relaxed font-mono tracking-tight">
        A free, open-source Windows optimization tool. <br className="hidden md:block" />
        Simply <span className="bg-linear-to-r from-[#fed114] via-[#f27c13] to-[#fed114] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(242,124,19,0.3)] font-bold font-mono">optimize</span> your PC.
      </p>

      <GitHubStats repo="itsfatduck/optimizerDuck" />

      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both w-full">
        {/* Row 1: Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:max-w-2xl">
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={handleDownload}
                className="group flex items-center justify-center gap-4 px-8 py-4 win-btn-primary h-[72px] w-full text-left cursor-pointer"
              >
                <Download className="w-8 h-8 transition-transform group-hover:scale-110 shrink-0" />
                <div className="flex flex-col items-start w-full text-primary-foreground">
                  <span className="font-bold uppercase tracking-wider text-sm">
                    Download Now
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-80">
                    <span>{version}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-current opacity-50" />
                    <span>
                      {downloads !== null && downloads > 0 ? `${downloads.toLocaleString()} DLs` : 'WIN 10/11'}
                    </span>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md win-card">
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2 font-mono">
                  <Download className="w-5 h-5 tracking-tight transition-transform group-hover:scale-110" />
                  Downloading
                  <div className="text-xl md:text-2xl font-bold tracking-tight text-foreground flex flex-col sm:block font-mono">
                    <span className="text-[#f27c13]">optimizer</span>
                    <span className="text-[#fed114]">Duck</span>
                  </div>
                </DialogTitle>
                <DialogDescription className="text-base pt-2 text-muted-foreground">
                  Your download should start automatically.<br />
                  If it doesn't, please click{' '}
                  <a
                    href={downloadUrl || `https://github.com/itsfatduck/optimizerDuck/releases/download/${version}/optimizerDuck_${version}_setup.exe`}
                    className="underline font-medium hover:text-muted-foreground"
                  >
                    here
                  </a>.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 flex flex-col gap-3">
                <p className="text-sm font-medium text-muted-foreground">While you wait, you can also:</p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/itsfatduck/optimizerDuck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 p-3 win-btn text-sm font-medium"
                  >
                    <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
                    View Source
                  </a>
                  <a
                    href="https://discord.gg/optimizerduck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 p-3 win-btn text-sm font-medium"
                  >
                    <DiscordIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    Join Discord
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Link
            href="/docs"
            className="flex items-center justify-center gap-3 px-8 py-5 win-btn font-bold text-sm uppercase tracking-wider group transition-all"
          >
            <Terminal className="w-5 h-5 transition-transform group-hover:scale-110" />
            Documentation
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-muted-foreground opacity-50 hover:opacity-100 transition-opacity cursor-pointer group whitespace-nowrap"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium transition-all group-hover:tracking-[0.4em]">Scroll to view more</span>
        <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
      </div>
    </div>
  );
}
