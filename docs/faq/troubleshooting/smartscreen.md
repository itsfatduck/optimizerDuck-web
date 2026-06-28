---
description: "Fix Windows SmartScreen warning when opening optimizerDuck. Click 'More info' then 'Run anyway' to bypass the 'Windows protected your PC' message safely."
---

# SmartScreen Warning

> "Windows protected your PC"

## What is SmartScreen?

SmartScreen is a security feature in Windows that helps protect you from malicious software. It works by checking the reputation of files that you download and run, and it will block any files that it deems suspicious.

## Why am I seeing this warning?

When you first run optimizerDuck, Windows SmartScreen may display a warning that says **"Windows protected your PC"**. This happens because the app is not digitally signed with a paid code signing certificate.

**This is safe to bypass.** optimizerDuck is open source and you can review the entire source code on [GitHub](https://github.com/itsfatduck/optimizerDuck).

## How to fix

1. Click **"More info"** on the SmartScreen popup
2. Click **"Run anyway"**

<Card title="Tip" icon="lightbulb">

This warning only appears the first time you run the application. After that, Windows will remember your choice.

</Card>

## The app still won't open after clicking "Run anyway"?

If SmartScreen lets the file through but the app still crashes or fails to launch:

1. Make sure you are running as **Administrator**: right-click the `.exe` and select **Run as administrator**
2. Download the latest version from [Releases](https://github.com/itsfatduck/optimizerDuck/releases/latest): an outdated build may be incompatible with your Windows version
3. See the [App Won't Open](/docs/faq/troubleshooting/app-wont-open) guide for more detailed troubleshooting

## Still having issues?

If you continue to experience problems:

- Ask for help in our [Discord community](https://discord.gg/tDUBDCYw9Q)
- Report the issue on [GitHub Issues](https://github.com/itsfatduck/optimizerDuck/issues/new/choose)
