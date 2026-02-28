"use client";

import { ShieldCheck, HeartHandshake, Code2 } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const reasons = [
    {
        icon: Code2,
        title: "100% Open Source",
        description: "You can verify every line of code yourself on GitHub. No secrets, no hidden malware."
    },
    {
        icon: ShieldCheck,
        title: "Absolutely Safe",
        description: "I do not collect any of your personal data. The app works completely offline on your machine."
    },
    {
        icon: HeartHandshake,
        title: "Created out of Passion",
        description: "This is my personal passion project, built to solve a real problem, not to profit from your data."
    }
];

export function WhyUs() {
    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
        <div ref={ref} className="py-24 max-w-6xl mx-auto px-4 border-t border-border overflow-hidden">
            <div className={cn(
                "text-center mb-20 duration-700 fill-mode-both",
                inView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            )}>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 relative inline-block">
                    Why should you trust this app?
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {reasons.map((reason, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col items-center text-center group duration-700 fill-mode-both",
                            inView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                        )}
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <div className="inline-flex items-center justify-center p-5 rounded-full mb-8 bg-primary/10 text-primary transition-transform group-hover:scale-110 duration-300">
                            <reason.icon className="w-10 h-10" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight mb-4">{reason.title}</h3>
                        <p className="text-xl text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                            {reason.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
