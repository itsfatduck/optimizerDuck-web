---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
sidebar: true

hero:
  name: optimizer<span class="duck-text">Duck</span>
  text: "Windows optimization tool"
  tagline: "A simple and powerful multilingual open-source system optimizer for Windows, built by and for the community, helping you clean, tweak, and optimize your PC more easily than ever."
  image:
    src: /icon.png
    alt: optimizerDuck
  actions:
    - theme: brand
      text: Download for Windows
      link: /docs/download
    - theme: alt
      text: Get Started
      link: /docs/guides/getting-started
features:
  - icon: fa-brands fa-github
    link: https://github.com/itsfatduck/optimizerDuck
    linkText: View on GitHub
    title: Open Source & Community
    details: Proudly developed on GitHub with 500+ stars. optimizerDuck is built by and for the community to help everyone clean and tweak their PC.

  - icon: fa-solid fa-code
    title: Built with Modern Tech
    link: https://dotnet.microsoft.com/en-us/download
    linkText: View .NET
    details: Written in C# and powered by .NET. Focuses on performance, privacy, and simplicity with a sleek multilingual interface.

  - icon: fa-solid fa-screwdriver-wrench
    link: /docs/features/optimize
    linkText: View available features
    title: Windows Optimization Suite
    details: Optimize your PC with essential Windows tweaks, gaming enhancements, and privacy controls. Includes built-in utilities for startup management, scheduled tasks, and system customization.
---

<div class="home-section">
  <h2 class="home-section__title">Thanks to all contributors</h2>
  <ContributorList :repo="'itsfatduck/optimizerDuck'" />
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
  <p class="supporters-note">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    <span><strong>Stefan Monov</strong> gave support!</span>
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
.supporters-note {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
.supporters-note svg {
  flex-shrink: 0;
  color: #ff5e5b;
}
</style>
