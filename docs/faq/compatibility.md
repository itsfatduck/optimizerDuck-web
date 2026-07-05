---
description: "optimizerDuck compatibility guide covering anti-cheat systems like Vanguard and EAC, antivirus false positives, offline use, Windows Server, and work environments."
---

# Compatibility & Conflicts

A common concern with optimization tools is whether they will break other software, especially games that use strict Anti-Cheat systems.

## Anti-Cheat Systems (Vanguard, BattlEye, EAC)

**optimizerDuck is entirely safe to use alongside Anti-Cheat systems.** 

We do not inject DLLs into processes, we do not modify kernel memory, and we do not alter game files. The optimizations only adjust standard Windows settings (like disabling background telemetry or changing power plans). 
- Games like *Valorant* (Vanguard), *CS2* (VAC), and *Apex Legends* (EAC) will **not** flag optimizerDuck or ban you for using it.

## Antivirus Software

Some Antivirus applications (including Windows Defender) might flag optimization tools as "HackTools" or "PUPs" (Potentially Unwanted Programs). 
- This is a **false positive**. Because the app modifies the Registry and stops background services, heuristic scanners sometimes get overly suspicious.
- You can read more about this in our [Antivirus False Positive](/docs/faq/troubleshooting/antivirus) troubleshooting guide.

## Crash Logs

If optimizerDuck encounters an unexpected error, crash logs are automatically saved to help with troubleshooting and diagnostics.

Logs are stored locally at:

```text
%localappdata%\optimizerDuck\Crashes\*.log
```

These logs contain diagnostic information about the crash and can be shared with the development team for debugging. They do **not** contain any personal data.

To report a crash:

1. Navigate to `%localappdata%\optimizerDuck\Crashes\`
2. Find the most recent `.log` file
3. Attach it to a [GitHub Issue](https://github.com/itsfatduck/optimizerDuck/issues/new/choose) or share it in [Discord](https://discord.gg/tDUBDCYw9Q)

## Does optimizerDuck work offline?

Yes. The core functionality of optimizerDuck works entirely offline. The app does not require an internet connection to apply optimizations, revert changes, or use built-in tools like the Startup Manager, Scheduled Tasks, Bloatware Remover, and System Dashboard.

<Card title="Some optimizations require internet" type="warning" icon="triangle-exclamation">

Certain optimizations, such as those that download updated configurations or interact with network drivers, may need an active internet connection. These are clearly tagged with a **"Network connection required"** badge in the app.

</Card>

## Windows Updates

It is highly recommended to run Windows Update **before** applying optimizations, so your system is on the latest stable build. After updating, you may want to pause updates temporarily to prevent Windows from resetting your optimizations.

**Note:** Windows feature updates (major version upgrades) can occasionally reset Registry values and service configurations to defaults. If this happens, simply re-apply your previous optimizations from the app.

## Can I use optimizerDuck on Windows Server or other Windows editions?

No. optimizerDuck is designed and tested specifically for Windows 10 (x64) and Windows 11 (x64) consumer editions (Home, Pro, Enterprise). Windows Server editions are not supported, as they use different service configurations and lack certain APIs that optimizerDuck relies on.

Older versions like Windows 7 or 8 are also not supported.

## Work Environment (Office / Developers)

If you are using a work computer:
- Be careful with the **Network** and **Privacy** optimizations. Disabling critical services like the Print Spooler or Remote Desktop may break your ability to print documents or access company servers.
- Please refer to our [Best Practices](/docs/guides/best-practices) for advice on safe optimizing.

## I found a bug / want to request a feature

Open an [issue](https://github.com/itsfatduck/optimizerDuck/issues) on GitHub with as much detail as possible: your Windows version, what optimizations you applied, and what went wrong. Feature requests are also welcome.
