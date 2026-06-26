# Troubleshooting

Having trouble downloading or running optimizerDuck? Browse the topics below for solutions to common issues.

| Issue                                                            | Description                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------ |
| [SmartScreen Warning](/docs/faq/troubleshooting/smartscreen)     | "Windows protected your PC" popup when opening the app |
| [Antivirus False Positive](/docs/faq/troubleshooting/antivirus)  | Your antivirus flagged or deleted optimizerDuck        |
| [Download Issues](/docs/faq/troubleshooting/download)            | The download won't start or gets blocked               |
| [App Won't Open](/docs/faq/troubleshooting/app-wont-open)        | The app crashes or fails to launch                     |
| [App Running Slowly](/docs/faq/troubleshooting/slow-performance) | optimizerDuck is unresponsive or slow                  |
| [Something Broke](/docs/faq/troubleshooting/revert-changes)      | Issues after applying optimizations                    |

---

## Common Issues

### The app fails to start or crashes on launch

Make sure you are running as **Administrator**. optimizerDuck requires elevated privileges to function. If it still crashes, download the latest version from [Releases](https://github.com/itsfatduck/optimizerDuck/releases/latest); an outdated build may be incompatible with your Windows version.

### Changes don't seem to take effect after applying

Some optimizations require a **system restart** to apply fully. If a tweak doesn't appear to work after restarting, try applying it again or check the revert section to verify the change was saved.

### Revert file is missing or corrupted

Revert files are stored in `%localappdata%\optimizerDuck\Revert\`. If a file is accidentally deleted or corrupted, you can restore it from a backup or create a **System Restore Point** beforehand as a fallback.

### Windows Update resets my settings

Windows feature updates occasionally reset certain registry values and service configurations to defaults. Simply re-apply your previous optimizations from the app after a major update.

### I found a bug / want to request a feature

Open an [issue](https://github.com/itsfatduck/optimizerDuck/issues) on GitHub with as much detail as possible: your Windows version, what you applied, and what went wrong. Feature requests are also welcome.

<Card title="Still need help?" icon="lightbulb">

If your issue is not listed here, you can ask for help in our [Discord community](https://discord.gg/tDUBDCYw9Q) or report a bug on [GitHub Issues](https://github.com/itsfatduck/optimizerDuck/issues/new/choose).

</Card>
