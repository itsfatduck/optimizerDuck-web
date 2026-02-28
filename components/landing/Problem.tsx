"use client";

import { AlertTriangle } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export function Problem() {
    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
        <div ref={ref} className="py-24 max-w-4xl mx-auto px-4 text-center">
            <div className={cn(
                "mb-12 fill-mode-both duration-700",
                inView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            )}>
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-destructive/10 text-destructive mb-6">
                    <AlertTriangle className="w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Your Windows is running slower than it could be.
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    After install Windows, there are many installed unnecessary apps, background services, and junk files
                    silently devouring your PC's resources every day.
                    <br />
                    You deserve a <span className="bg-linear-to-r from-[#fed114] via-[#f27c13] to-[#fed114] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(242,124,19,0.3)] font-bold font-mono">faster, cleaner, and more optimized Windows experience.</span>
                </p>
            </div>
        </div>
    );
}
