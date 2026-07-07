---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
sidebar: true

hero:
  name: optimizer<span class="duck-text">Duck</span>
  text: "Windows optimization tool"
  tagline: "A simple and powerful multilingual open-source system optimizer for Windows, built by and for the community, helping you clean, tweak, and optimize your PC more easily than ever."
  image:
    src: /icon.webp
    alt: optimizerDuck
  actions:
    - theme: brand
      text: Download for Windows
      link: /docs/download
    - theme: alt
      text: Get Started
      link: /docs/guides/getting-started
features:
  - icon: github
    link: https://github.com/itsfatduck/optimizerDuck
    linkText: View on GitHub
    title: Open Source & Community
    details: Proudly developed on GitHub with 5k+ stars. optimizerDuck is built by and for the community to help everyone clean and tweak their PC.

  - icon: code
    title: Built with Modern Tech
    link: https://dotnet.microsoft.com/en-us/download
    linkText: View .NET
    details: Written in C# and powered by .NET. Focuses on performance, privacy, and simplicity with a sleek multilingual interface.

  - icon: screwdriver-wrench
    link: /docs/features/optimize
    linkText: View available features
    title: Windows Optimization Suite
    details: Optimize your PC with essential Windows tweaks, gaming enhancements, and privacy controls. Includes built-in utilities for startup management, scheduled tasks, and system customization.
---

<div class="home-section">
  <h2 class="home-section__title">Thanks to all contributors</h2>
  <ContributorMarquee :repo="'itsfatduck/optimizerDuck'" />
</div>

<div class="home-section home-section--donation">
  <h2 class="home-section__title">Support the project</h2>
  <p class="home-section__desc">If you find optimizerDuck helpful, consider buying me a coffee!</p>
  <SupportCard
    title="Buy me a coffee"
    description="Help keep optimizerDuck running and evolving. Your support makes continued updates and improvements possible."
    icon="kofi"
    url="https://ko-fi.com/itsfatduck"
    ctaText="Donate on Ko-fi"
    :highlight="true"
    :centered="true"
  />
</div>

<div class="home-section home-section--thanks">
  <h2 class="home-section__title">Special Thanks</h2>
  <p class="home-section__desc">A heartfelt thank you to everyone who has supported the project!</p>
  <div class="supporters-grid">
    <div class="supporter-item">
      <div class="supporter-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </div>
      <span class="supporter-name">Stefan Monov</span>
    </div>
    <div class="supporter-item">
      <div class="supporter-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </div>
      <span class="supporter-name">Laymond</span>
    </div>
  </div>
  <p class="supporters-cta">
    Want to be featured here?
    <a href="/docs/thanks" class="supporters-link">View all supporters</a>
  </p>
</div>

<style>
.home-section {
  max-width: 1152px;
  margin: 4rem auto 2rem;
  padding: 0 1.5rem;
  text-align: center;
}
.home-section__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}
.home-section__desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}
.home-section--donation .home-section__desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

/* ── Special Thanks ── */
.home-section--thanks {
  margin-top: 2rem;
}

.supporters-grid {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0;
}

.supporter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  border-radius: 100px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  backface-visibility: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.supporter-item:hover {
  border-color: #ff5e5b;
  box-shadow: 0 0 0 2px rgba(255, 94, 91, 0.25);
}

.supporter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5e5b;
  flex-shrink: 0;
}

.supporter-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.supporters-cta {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  margin-top: 1rem;
}

.supporters-link {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}

.supporters-link:hover {
  color: var(--vp-c-brand-2);
}
</style>
