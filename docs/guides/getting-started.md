---
description: "Learn how to get started with optimizerDuck. Download the app, change the language, and start optimizing your Windows PC for better performance and privacy."
---

<script setup>
import { useGitHub } from '../../.vitepress/theme/composables/useGitHub'
import { onMounted } from 'vue'

const { latestRelease, fetchReleases } = useGitHub()

onMounted(() => {
  fetchReleases()
})
</script>

# Getting Started

Welcome to **optimizerDuck**, a free, open-source Windows optimization tool built for performance, privacy, and simplicity. This guide will help you download, launch, and configure the application to suit your preferences.

## Why Optimize Windows?

Before we get started, you might be wondering: why does Windows need optimization at all?

Windows is a great operating system. But it is designed for everyone. That means it comes with many background services, telemetry, pre-installed apps, and scheduled tasks that keep running even if you never use them. These consume your CPU, RAM, disk, and network.

At the same time, many settings that can improve performance and reduce latency are not enabled by default. Windows prioritizes stability and compatibility over speed.

Optimization is about reducing unnecessary overhead. It helps your PC spend more of its resources on what actually matters. Whether you are gaming, programming, creating content, or just browsing the web, a well-optimized Windows feels faster and more responsive.

<Card title="Hardware vs Software" icon="lightbulb">

Hardware upgrades give your PC more power. Optimization makes sure that power is not wasted.

[Read the full guide &rarr;](/docs/guides/why-optimize-windows)

</Card>

## Download & Execution

optimizerDuck is a portable application, which means **no installation is required**!

1. Go to the [Download page](/docs/download) to download the latest executable file.
2. After downloading, you will have `{{ latestRelease?.assets?.find(a => a.name.endsWith('.exe'))?.name || 'optimizerDuck.exe' }}` file.
3. Double-click the downloaded `.exe` file to run it.

<Card title="Run as Administrator" icon="lightbulb">

For optimizerDuck to apply system-level optimizations effectively, it natively requests administrative privileges when required. You can also right-click the `.exe` file and select **Run as administrator** if you face any issues.

</Card>

## Changing Language

<ImagePreview 
  src="/guides/getting-started/tw.webp" 
  caption="Traditional Chinese interface of optimizerDuck, translated by abc0922001"
/>

optimizerDuck natively supports multiple languages to provide a better user experience globally.

| | Language | Native Name | Translator |
|------|----------|-------------|------------|
| 🇺🇸 | English (United States) | English | Primary & recommended |
| 🇻🇳 | Vietnamese | Tiếng Việt | [itsfatduck](https://github.com/itsfatduck) |
| 🇹🇼 | Traditional Chinese | 正體中文 | [abc0922001](https://github.com/abc0922001) |
| 🇨🇳 | Simplified Chinese | 简体中文 | [wcxu21](https://github.com/wcxu21) |
| 🇷🇺 | Russian | Русский | [Foodhead](https://github.com/Foodhead) |
| 🇫🇷 | French | Français | [Robocnop](https://github.com/Robocnop) |
| 🇩🇪 | German | Deutsch | [pixeldepartment](https://github.com/pixeldepartment) |
| 🇮🇱 | Hebrew | עברית | [yosef-chai](https://github.com/yosef-chai) |
| 🇰🇷 | Korean | 한국어 | [klfnn](https://github.com/klfnn) |
| 🇪🇸 | Spanish | Español | [thexxtt](https://github.com/thexxtt) |
| 🇯🇵 | Japanese | 日本語 | [zerofrip](https://github.com/zerofrip) |
| 🇵🇱 | Polish | Polski | [dudus2000](https://github.com/dudus2000) |
| 🇧🇷 | Portuguese (Brazil) | Português (Brasil) | [mhanelia](https://github.com/mhanelia) |
| 🇹🇷 | Turkish | Türkçe | [amhunter1](https://github.com/amhunter1) |

**How to change the language:**

1. Open **optimizerDuck**.
2. Navigate to the **Settings** tab from the navigation bar.
3. Look for the **Language** card and its dropdown menu.
4. Select your preferred language.
5. Restart the application to apply the changes.

<Card title="Recommended Language" icon="circle-info">

English is the recommended language as it provides the most accurate and complete descriptions for all optimizations.

</Card>

<Card title="Contributing Translations" icon="lightbulb">

If you would like to contribute a translation for optimizerDuck, please check out the [Contributing Translations](https://github.com/itsfatduck/optimizerDuck/blob/master/CONTRIBUTING.md#-translations) guide for instructions on how to get involved.

Every contribution is welcome and appreciated, and it helps make optimizerDuck more accessible to users around the world! <3

</Card>

## Community

Join the optimizerDuck community to get help, share feedback, and connect with other users.

- **Discord**: Join our [Discord server](https://discord.gg/tDUBDCYw9Q) to interact with the development team and other users.

For more details, visit the [Community](/docs/community) page.

## Get Started with Optimization

Explore the guides below to optimize and manage your system effectively:

- [Customize](/docs/features/customize) - Toggle built-in Windows behaviors such as taskbar, desktop, Explorer, and gaming options.
- [Optimize](/docs/features/optimize) - Improve overall system performance.
- [Bloatware](/docs/features/bloatware) - Remove unwanted pre-installed applications.
- [Startup Manager](/docs/features/startup-manager) - Control and manage startup programs.
- [Scheduled Tasks](/docs/features/scheduled-tasks) - Manage scheduled tasks.
- [Disk Cleanup](/docs/features/disk-cleanup) - Free up disk space by removing unnecessary files.

## Contribute

If optimizerDuck has been helpful to you, here are a few ways you can support the project.

- **GitHub**: Star the repository, report bugs, or contribute on [GitHub](https://github.com/itsfatduck/optimizerDuck).
- or, if you want to support the project financially, consider buying me a coffee or sharing the project with your friends!

Visit the [Support](/docs/contribute/support-me) and [Contribute](/docs/contribute/overview) page to learn more.

## Important Best Practices

Before you dive into optimizing your Windows system, please keep the following tips in mind:

<Card title="Create a Restore Point" type="warning" icon="triangle-exclamation">

Always create a Windows System Restore Point or a backup before applying system optimizations. This ensures you can revert changes instantly if something doesn't work as expected.

</Card>

- **Restart Your PC:** Remember to restart your computer after applying optimizations so that all registry and system changes take effect properly.
- **Check for Updates:** Although optimizerDuck updates frequently, check the GitHub repository for new releases to benefit from the latest features and bug fixes.

## Disclaimer

optimizerDuck is an independent project and is not affiliated with, endorsed by, or sponsored by Microsoft Corporation. All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
Please use optimizerDuck at your own risk.

<Card title="Learn more" icon="circle-info">

- [Privacy Policy](https://github.com/itsfatduck/optimizerDuck/blob/master/PRIVACY.md)
- [Terms of Service](https://github.com/itsfatduck/optimizerDuck/blob/master/TERMS.md)
- [Disclaimer](https://github.com/itsfatduck/optimizerDuck/blob/master/DISCLAIMER.md)
- [License](https://github.com/itsfatduck/optimizerDuck/blob/master/LICENSE)

</Card>
