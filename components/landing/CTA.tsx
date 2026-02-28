"use client";

import Link from 'next/link';
import { Download, ShieldAlert } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export function CTA() {
    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
        <div ref={ref} className="py-24 max-w-4xl mx-auto px-4 text-center border-t border-border overflow-hidden">
            <div className={cn(
                "win-card p-12 relative overflow-hidden flex flex-col items-center duration-700 fill-mode-both",
                inView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            )}>
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 relative z-10 text-foreground">
                    Ready to optimize your PC?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl relative z-10">
                    It only takes a few minutes to download, completely free, and 100% open source.
                    <br />
                    Download now to simply optimize your PC.
                </p>

                {/* Animated Aura Button Container */}
                <div className="relative group/btn z-10">
                    {/* The "Aura" Glow Effect */}
                    <div className="absolute -inset-1 bg-linear-to-r from-[#f27c13] via-[#fed114] to-[#f27c13] rounded-xl blur-md opacity-40 group-hover/btn:opacity-100 group-hover/btn:blur-xl transition-all duration-500 animate-gradient bg-[length:200%_auto]" />

                    <Link
                        href="#download"
                        className="relative flex items-center justify-center gap-3 px-10 py-5 win-btn-primary font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(242,124,19,0.3)] group-hover/btn:shadow-[0_0_35px_rgba(254,209,20,0.5)] transition-all duration-500"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <Download className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                        Download optimizerDuck
                    </Link>
                </div>

                <p className="mt-8 text-sm text-muted-foreground font-mono opacity-80 relative z-10 uppercase tracking-widest">
                    Supports Windows 10 & 11
                </p>
            </div>

            {/* Disclaimer Section */}
            <div className={cn(
                "mt-16 text-left p-8 rounded-2xl border border-border/50 bg-foreground/[0.02] duration-700 delay-300 fill-mode-both",
                inView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            )}>
                <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                    <ShieldAlert className="w-5 h-5 text-[#f27c13]" strokeWidth={2} />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">Legal Disclaimer</span>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground/80 leading-relaxed font-mono">
                    <p className="text-foreground/90 font-bold">
                        optimizerDuck is provided "as is", without warranty of any kind.
                    </p>
                    <p>
                        By using this tool, you agree that the authors are not responsible for:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 border-l-2 border-[#f27c13]/30 pl-4 py-1">
                        <li>• System instability</li>
                        <li>• Data loss</li>
                        <li>• Performance issues</li>
                    </ul>
                    <p className="pt-2 text-[#fed114]/90 font-medium italic">
                        Warning: Always create a restore point or backup before applying system changes.
                    </p>
                </div>
            </div>
        </div>
    );
}
