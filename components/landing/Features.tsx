import { ShieldCheck, Code2, Terminal, Languages, ChevronRight, LayoutDashboard } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Terminal,
      title: "Multi-tool Included",
      description: "Equipped with essential utilities to manage and clean your Windows operating system. Includes Bloatware Removal, Disk Cleanup, and a Startup Manager.",
      color: "text-[#f27c13]"
    },
    {
      icon: Code2,
      title: "Open Source",
      description: "Fully transparent codebase. Community driven, thoroughly audited, and completely free forever. Verify every line of code yourself.",
      color: "text-[#fed114]"
    },
    {
      icon: LayoutDashboard,
      title: "Friendly Interface",
      description: "After version 2.0.0, optimizerDuck will have a new, modern, and user-friendly interface. It will be even easier to use and navigate.",
      color: "text-[#f27c13]"
    },
    {
      icon: Languages,
      title: "Multi-language Support",
      description: "Native support for multiple languages including English, Vietnamese, and more. A tool built for a global community.",
      color: "text-[#fed114]"
    }
  ];

  return (
    <div className="py-20 max-w-5xl mx-auto px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
        <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-gray-400" />
          Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
          // Core capabilities of optimizerDuck
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={feature.title} 
              className="flex flex-col items-start group animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 hover:bg-white/60 dark:hover:bg-[#111]/60 transition-colors shadow-sm"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-white/50 dark:bg-black/50 shadow-xs border border-gray-200/30 dark:border-gray-700/30 ${feature.color}`}>
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-mono text-sm group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
