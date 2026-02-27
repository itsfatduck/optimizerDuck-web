"use client";

import { Star, CircleDot, GitPullRequest } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GitHubStatsProps {
  repo: string;
}

export function GitHubStats({ repo }: GitHubStatsProps) {
  const [stats, setStats] = useState({
    stars: 0,
    issues: 0,
    pulls: 0,
  });

  useEffect(() => {
    // Fetch stars and open issues
    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          stars: data.stargazers_count || 0,
          issues: data.open_issues_count || 0,
        }));
      })
      .catch(console.error);

    // Fetch pull requests separately as open_issues_count includes PRs
    fetch(`https://api.github.com/repos/${repo}/pulls?state=open`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats(prev => ({
            ...prev,
            pulls: data.length,
            // Adjust issues count by subtracting PRs
            issues: prev.issues - data.length >= 0 ? prev.issues - data.length : prev.issues
          }));
        }
      })
      .catch(console.error);
  }, [repo]);

  const statItems = [
    {
      label: 'Stars',
      value: stats.stars,
      icon: Star,
      href: `https://github.com/${repo}/stargazers`,
      color: 'hover:text-[#f27c13]',
      fillColor: 'fill-[#f27c13]',
    },
    {
      label: 'Issues',
      value: stats.issues,
      icon: CircleDot,
      href: `https://github.com/${repo}/issues`,
      color: 'hover:text-[#fed114]',
      fillColor: 'fill-[#fed114]',
    },
    {
      label: 'Pull Requests',
      value: stats.pulls,
      icon: GitPullRequest,
      href: `https://github.com/${repo}/pulls`,
      color: 'hover:text-[#f27c13]',
      fillColor: 'fill-[#f27c13]',
    },
  ];

  return (
    <div className="flex flex-wrap justify-start gap-4 mb-16 animate-in fade-in duration-700 delay-300 fill-mode-both">
      {statItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 rounded-full hover:bg-white/60 dark:hover:bg-[#111]/60 shadow-xs ${item.color}`}
        >
          <item.icon className={`w-4 h-4 transition-all duration-300 group-hover:${item.fillColor}`} />
          <span className="tabular-nums">{item.value.toLocaleString()}</span>
        </a>
      ))}
    </div>
  );
}
