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

  - icon: globe
    title: Multi-Language Support
    link: /docs/guides/getting-started#changing-language
    linkText: View supported languages
    details: Available in 12 languages with community-driven translations. Choose from English, Vietnamese, Chinese, Russian, French, Korean, Spanish, Japanese, Polish, Portuguese (Brazil), Turkish, and more.

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
    description="Support the project and help make continued development possible."
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
    <SupporterCard name="Stefan Monov" />
    <SupporterCard name="Laymond" />
    <SupporterCard name="Germdemonizer" />
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
