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

optimizerDuck natively supports multiple languages to provide a better user experience globally. Supported languages include:

- 🇺🇸 **English (United States)** - Primary & recommended
- 🇻🇳 **Vietnamese (Tiếng Việt)**

**How to change the language:**

1. Open **optimizerDuck**.
2. Navigate to the **Settings** tab from the navigation bar.
3. Look for the **Language** card and its dropdown menu.
4. Select your preferred language.
5. Restart the application to apply the changes.

::: info Recommended Language
English is the recommended language as it provides the most accurate and complete descriptions for all optimizations.
:::

## Community

Join the optimizerDuck community to get help, share feedback, and connect with other users.

- **Discord**: Join our [Discord server](https://discord.gg/tDUBDCYw9Q) to interact with the development team and other users.
- **GitHub**: Star the repository, report bugs, or contribute on [GitHub](https://github.com/itsfatduck/optimizerDuck).

For more details, visit the [Community](/docs/community) page.

## Get Started with Optimization

Explore the guides below to optimize and manage your system effectively:

- [Optimize](/docs/guides/optimize) - Improve overall system performance.
- [Bloatware](/docs/guides/bloatware) - Remove unwanted pre-installed applications.
- [Startup Manager](/docs/guides/startup-manager) - Control and manage startup programs.
- [Scheduled Tasks](/docs/guides/scheduled-tasks) - Manage scheduled tasks.
- [Disk Cleanup](/docs/guides/disk-cleanup) - Free up disk space by removing unnecessary files.

## Contribute

If optimizerDuck has been helpful to you, here are a few ways you can support the project and help keep it growing.

- [Support Me](/docs/contribute/support-me)
- [Contribute](/docs/contribute/contribute)

## Important Best Practices

Before you dive into optimizing your Windows system, please keep the following tips in mind:

::: warning Create a Restore Point
Always create a Windows System Restore Point or a backup before applying system optimizations. This ensures you can revert changes instantly if something doesn't work as expected.
:::

- **Restart Your PC:** Remember to restart your computer after applying optimizations so that all registry and system changes take effect properly.
- **Check for Updates:** Even though optimizerDuck updates often, keep an eye on the GitHub repository for new releases to benefit from the latest features and bug fixes.
