---
description: "Meet the supporters who made optimizerDuck possible. A heartfelt thank you to everyone who donated, contributed, and supported the project."
---

<script setup>
import Card from '../.vitepress/theme/components/Card.vue'
import SupportCard from '../.vitepress/theme/components/SupportCard.vue'
</script>

# Special Thanks

optimizerDuck is a community-driven project, and none of this would be possible without the people who believe in it.

Whether you donated, submitted code, translated the app, reported a bug, or simply spread the word. **Thank you.**

## Financial Supporters

These generous people have donated to support the project:

<div class="supporters-page-grid">

  <div class="sp-card">
    <div class="sp-card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    </div>
    <span class="sp-card-name">Stefan Monov</span>
  </div>

  <div class="sp-card">
    <div class="sp-card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    </div>
    <span class="sp-card-name">Laymond</span>
  </div>

</div>

<Card type="info" icon="circle-info" title="Missing a supporter?" content="Names are listed in order of support. If you donated and your name is missing, please email **itsfatduck@gmail.com**, [create a GitHub issue](https://github.com/itsfatduck/optimizerDuck/issues/new), or join the [Discord server](https://discord.gg/tDUBDCYw9Q) and open a **Supporter Claim** ticket." />

<Card type="info" icon="lightbulb" title="Want to help?" content="Want to support the project? Check out the [Support Me page](/docs/contribute/support-me) for ways to contribute, including crypto, Ko-fi, and more." />

## Code Contributors

A huge thanks to everyone who has contributed code, translations, and documentation to optimizerDuck.

<ContributorList :repo="'itsfatduck/optimizerDuck'" />

## Want to be here?

There are many ways to support the project and get featured on this page.

<div class="sp-actions">
  <SupportCard
    title="Support Me"
    description="Donate via crypto, Ko-fi, or explore other ways to support the project."
    icon="kofi"
    url="/docs/contribute/support-me"
    ctaText="Support the project"
    :highlight="true"
  />

  <SupportCard
    title="Star the Repository"
    description="One click with a huge impact. Starring helps optimizerDuck reach more users."
    icon="github"
    url="https://github.com/itsfatduck/optimizerDuck"
    ctaText="Star on GitHub"
  />

  <SupportCard
    title="Share with Friends"
    description="Know someone struggling with a slow PC? Share optimizerDuck and help them optimize their system."
    icon="share"
    url="https://github.com/itsfatduck/optimizerDuck"
    ctaText="Share the Link"
  />

  <SupportCard
    title="Contribute Code"
    description="Submit a pull request, fix a bug, add a translation, or improve the docs."
    icon="code"
    url="/docs/contribute/overview"
    ctaText="Learn how to contribute"
  />
</div>

<div class="sp-closing">
	<p>optimizerDuck wouldn't be where it is today without the support of this community. Whether you contributed code, reported a bug, made a donation, or simply used the app, every bit of support has made a difference.</p>
	<p><strong>Thank you for being part of the journey.</strong></p>
</div>

<style>
.supporters-page-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
}

.sp-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.25rem;
  border-radius: 100px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  backface-visibility: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.sp-card:hover {
  border-color: #ff5e5b;
  box-shadow: 0 0 0 2px rgba(255, 94, 91, 0.25);
}

.sp-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5e5b;
  flex-shrink: 0;
}

.sp-card-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sp-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  max-width: 500px;
}

.sp-closing {
  margin-top: 3rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.sp-closing p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.sp-closing p:last-child {
  font-size: 1.1rem;
}
</style>
