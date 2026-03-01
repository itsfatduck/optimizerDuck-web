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

1. Go to the [Download page](/download) to download the latest executable file.
2. After downloading, you will have `{{ latestRelease?.assets?.find(a => a.name.endsWith('.exe'))?.name || 'optimizerDuck.exe' }}` file.
3. Double-click the downloaded `.exe` file to run it.

::: tip Run as Administrator
For optimizerDuck to apply system-level optimizations effectively, it natively requests administrative privileges when required. You can also right-click the `.exe` file and select **Run as administrator** if you face any issues.
:::

## Changing Language

optimizerDuck natively supports multiple languages to provide a better user experience globally. Supported languages include:

- 🇺🇸 **English (United States)** — Primary & recommended
- 🇻🇳 **Vietnamese (Tiếng Việt)**
- 🇨🇳 **Chinese (Simplified) (简体中文)** _(AI translated)_
- 🇷🇺 **Russian (Русский)** _(AI translated)_

**How to change the language:**

1. Open **optimizerDuck**.
2. Navigate to the **Settings** context from the main menu.
3. Look for the **Language** dropdown.
4. Select your preferred language.
5. Restart the application to apply the changes.

::: info Recommended Language
English is the recommended language as it provides the most accurate and complete descriptions for all optimizations.
:::

## Changing Theme

You can easily configure the visual appearance of optimizerDuck to match your Windows system settings or personal preferences.

**How to change the theme:**

1. Open the **Settings** menu within the app.
2. Locate the **Theme** or **Appearance** option block.
3. Choose between **Light Mode** or **Dark Mode**.
4. The application's UI will instantly update to reflect your newly selected visual style.

## Important Best Practices

Before you dive into optimizing your Windows system, please keep the following tips in mind:

::: warning Create a Restore Point
Always create a Windows System Restore Point or a backup before applying system optimizations. This ensures you can revert changes instantly if something doesn't work as expected.
:::

- **Restart Your PC:** Remember to restart your computer after applying optimizations so that all registry and system changes take effect properly.
- **Check for Updates:** Even though optimizerDuck updates often, keep an eye on the GitHub repository for new releases to benefit from the latest features and bug fixes.
