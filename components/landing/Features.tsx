"use client";

import React, { ReactNode } from 'react';
import * as LucideIcons from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export function Features({ children }: { children: ReactNode }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="py-24 max-w-6xl mx-auto px-4 border-t border-border overflow-hidden text-popover-foreground">
      <div className={cn(
        "mb-24 text-center duration-700 fill-mode-both",
        inView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
      )}>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3 font-mono">
          How it works
        </h2>
      </div>

      <div className="flex flex-col gap-24 md:gap-32">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { index });
          }
          return child;
        })}
      </div>
    </div>
  );
}

export function Feature({
  icon,
  title,
  description,
  bullets = [],
  color = "text-[#f27c13]",
  index = 0,
}: {
  icon: keyof typeof LucideIcons | React.ElementType;
  title: string;
  description: string;
  bullets?: string[];
  color?: string;
  index?: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const Icon = typeof icon === 'string' ? LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType : icon;
  const colorHex = color.startsWith('text-[') ? color.replace('text-[', '').replace(']', '') : undefined;

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col md:flex-row items-center gap-12 lg:gap-20 group duration-700 fill-mode-both",
        !isEven ? 'md:flex-row-reverse' : '',
        inView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
      )}
      style={{ animationDelay: `${(index % 2) * 150}ms` }}
    >
      <div className="flex-1 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[2rem] -z-10 group-hover:scale-105 transition-transform duration-500" />
        <div
          className="aspect-square md:aspect-auto md:h-[350px] w-full flex items-center justify-center rounded-[2rem] border border-border/50 bg-foreground/5 overflow-hidden"
        >
          <div
            className={`inline-flex items-center justify-center p-8 rounded-full transition-transform group-hover:scale-110 duration-500 ${color}`}
            style={colorHex ? { backgroundColor: `${colorHex}15` } : {}}
          >
            {Icon && <Icon className="w-24 h-24" strokeWidth={1.2} />}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full space-y-6">
        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium font-mono border border-border/50 bg-foreground/5 shadow-sm ${color}`}>
          Feature 0{index + 1}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>

        {bullets && bullets.length > 0 && (
          <ul className="space-y-4 pt-4">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-4 text-muted-foreground/90 group-hover:text-foreground/80 transition-colors">
                <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${color.replace('text-', 'bg-')}`} />
                <span className="leading-relaxed text-lg">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
