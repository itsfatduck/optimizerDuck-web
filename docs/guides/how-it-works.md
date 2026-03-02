# Under the Hood: How it Works

For advanced users and developers who want to understand exactly what **optimizerDuck** is doing behind the scenes, this guide explains its core mechanisms.

## System Interaction

optimizerDuck does not use "black magic" or deeply injected resident drivers. Instead, it acts as a very capable UI wrapper for native Windows APIs and command-line tools. Everything the app does can theoretically be done manually, optimizerDuck just makes it safe, fast, and automated.

### 1. Registry Edits
The vast majority of Windows behaviors (telemetry, context menus, hidden settings) are controlled via the Windows Registry. optimizerDuck reads and writes to specific Registry keys (`HKLM`, `HKCU`, etc.) to toggle these features.
- *Example: Disabling Bing search in the Start Menu by creating a specific DWORD value.*

### 2. Windows Services
Many background processes that consume RAM and CPU are actually Windows Services. optimizerDuck interacts with the Service Control Manager to change the startup type of these services (e.g., changing `Automatic` to `Disabled` or `Manual`).

### 3. PowerShell & CMD Execution
For actions like removing built-in UWP apps (Bloatware) or running advanced system cleanups, optimizerDuck programmatically executes PowerShell scripts (`Remove-AppxPackage`) and CMD commands in the background without showing an annoying black terminal window.

## The Revert System

We don't just change your settings blindly. We ensure you have a safety net.

Whenever you apply an optimization, the application:
1. **Reads** the current state of the Registry key or Service.
2. **Saves** that exact original state into a local `.json` file.
3. **Applies** the new optimized state.

These `.json` backups are stored in `%localappdata%\optimizerDuck\Revert\`. When you choose to revert a tweak, the app simply reads this file and writes the original value back to the system.

## Transparency & Open Source

Because optimizerDuck is completely open-source, you don't have to take our word for it. You can browse the C# and WPF source code on [GitHub](https://github.com/itsfatduck/optimizerDuck) to see the exact code used for every single toggle in the application.
