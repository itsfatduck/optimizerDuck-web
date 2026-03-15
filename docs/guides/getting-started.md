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

## Download & Execution

optimizerDuck is a portable application, which means **no installation is required**!

1. Go to the [Download page](/docs/download) to download the latest executable file.
2. After downloading, you will have `{{ latestRelease?.assets?.find(a => a.name.endsWith('.exe'))?.name || 'optimizerDuck.exe' }}` file.
3. Double-click the downloaded `.exe` file to run it.

::: tip Run as Administrator
For optimizerDuck to apply system-level optimizations effectively, it natively requests administrative privileges when required. You can also right-click the `.exe` file and select **Run as administrator** if you face any issues.
:::

## Changing Language

<ImagePreview 
  src="/guides/getting-started/tw.png" 
  caption="Traditional Chinese interface of optimizerDuck, translated by abc0922001"
/>


optimizerDuck natively supports multiple languages to provide a better user experience globally. Supported languages include:

- 🇺🇸 **English (United States)** - Primary & recommended
- 🇻🇳 **Vietnamese (Tiếng Việt)**
- 🇹🇼 **Traditional Chinese (正體中文)** - translation by [abc0922001](https://github.com/abc0922001)

**How to change the language:**

1. Open **optimizerDuck**.
2. Navigate to the **Settings** tab from the navigation bar.
3. Look for the **Language** card and its dropdown menu.
4. Select your preferred language.
5. Restart the application to apply the changes.

::: info Recommended Language
English is the recommended language as it provides the most accurate and complete descriptions for all optimizations.
:::

::: tip Contributing Translations
If you would like to contribute a translation for optimizerDuck, please check out the [Contributing Translations](https://github.com/itsfatduck/optimizerDuck/blob/master/.github/CONTRIBUTING.md#-translations) guide for instructions on how to get involved.

Every contribution is welcome and appreciated, and it helps make optimizerDuck more accessible to users around the world! <3
:::

## Community

Join the optimizerDuck community to get help, share feedback, and connect with other users.

- **Discord**: Join our [Discord server](https://discord.gg/tDUBDCYw9Q) to interact with the development team and other users.
- **GitHub**: Star the repository, report bugs, or contribute on [GitHub](https://github.com/itsfatduck/optimizerDuck).

For more details, visit the [Community](/docs/community) page.

## Get Started with Optimization

Explore the guides below to optimize and manage your system effectively:

- [Features](/docs/features/features) - Toggle built-in Windows behaviors such as taskbar, desktop, Explorer, and gaming options.
- [Optimize](/docs/features/optimize) - Improve overall system performance.
- [Bloatware](/docs/features/bloatware) - Remove unwanted pre-installed applications.
- [Startup Manager](/docs/features/startup-manager) - Control and manage startup programs.
- [Scheduled Tasks](/docs/features/scheduled-tasks) - Manage scheduled tasks.
- [Disk Cleanup](/docs/features/disk-cleanup) - Free up disk space by removing unnecessary files.

## Contribute

If optimizerDuck has been helpful to you, here are a few ways you can support the project and help keep it growing.

- [Support Me](/docs/contribute/support-me)
- [Contribute](/docs/contribute/overview)

## Important Best Practices

Before you dive into optimizing your Windows system, please keep the following tips in mind:

::: warning Create a Restore Point
Always create a Windows System Restore Point or a backup before applying system optimizations. This ensures you can revert changes instantly if something doesn't work as expected.
:::

- **Restart Your PC:** Remember to restart your computer after applying optimizations so that all registry and system changes take effect properly.
- **Check for Updates:** Even though optimizerDuck updates often, keep an eye on the GitHub repository for new releases to benefit from the latest features and bug fixes.
