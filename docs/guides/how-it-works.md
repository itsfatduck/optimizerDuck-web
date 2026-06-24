# How optimizerDuck Works

This guide explains what optimizerDuck actually does when you apply optimizations. Whether you're a developer or a regular user, this will help you understand the technical side.

## What optimizerDuck Actually Does

optimizerDuck doesn't use hidden drivers or anything mysterious. It automates Windows built-in tools through a graphical interface. Every change can be done manually through Windows; we make it faster and easier.

## The Four Main Methods

optimizerDuck interacts with Windows using four different approaches. Here's how each one works:

### 1. Registry Edits

**What it is:** The Windows Registry is a database that stores Windows configuration settings. Things like context menu options, startup programs, and system behaviors are all controlled here.

**How optimizerDuck uses it:** When you toggle a setting, optimizerDuck reads or writes specific registry keys. For example, to disable Bing search in the Start Menu, it changes a registry value from 1 to 0.

**Why this matters:** Most Windows optimizations work through registry edits. We only modify well-documented keys that have been tested.

- [Microsoft Docs: Registry](https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry)
- [View Source Code](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/Optimization/Providers/RegistryService.cs)

### 2. Windows Services

**What it is:** Windows Services are background processes that run automatically. Examples include Windows Update, print spooler, and various system utilities. Each service has a startup type: Automatic, Manual, Disabled, or Delayed Start.

**How optimizerDuck uses it:** We change the startup type of services. If you don't use Windows Fax and Scan, we can set that service to Manual so it only starts when you actually need it.

**Why this matters:** Disabling unused services reduces background resource usage and can improve boot time.

- [Microsoft Docs: Service Control Manager](https://learn.microsoft.com/en-us/windows/win32/services/service-control-manager)
- [View Source Code](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/Optimization/Providers/ServiceProcessService.cs)

### 3. Scheduled Tasks

**What it is:** Windows Task Scheduler allows programs to run automatically at specific times or events. Many applications create scheduled tasks that run at login or on a schedule without telling you.

**How optimizerDuck uses it:** We can disable these tasks. For example, some apps create tasks that run every time you log in to check for updates. We can disable those to speed up login.

**Why this matters:** Fewer background tasks means less CPU usage and faster startup.

- [Microsoft Docs: Task Scheduler](https://learn.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page)
- [View Source Code](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/Optimization/Providers/ScheduledTaskService.cs)

### 4. PowerShell and CMD Commands

**What it is:** PowerShell and CMD are command-line interfaces for Windows. They can execute system commands that aren't available through the graphical interface.

**How optimizerDuck uses it:** For operations like removing pre-installed apps (bloatware) or system cleanup, we run PowerShell commands in the background. The commands execute silently without showing a terminal window.

**Why this matters:** Some Windows features can only be controlled through command-line tools. We handle the technical parts so you don't have to.

- [Microsoft Docs: PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/overview)
- [View Source Code](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/Optimization/Providers/ShellService.cs)

## The Revert System

Changing system settings can be risky. That's why optimizerDuck automatically backs up the original state before making any changes.

**How it works:**

1. optimizerDuck reads the current value before changing anything
2. It saves that original value to a JSON file on your computer
3. Then it applies the new setting

Backup files are stored here:

```
%localappdata%\optimizerDuck\Revert\
```

**To undo a change:**

- Click the toggle button again to revert
- optimizerDuck reads the backup file and restores the original value
- Your system returns to its previous state

You can safely try different optimizations. If something doesn't work as expected, just revert it.

## Open Source

optimizerDuck is completely open source. This means:

- All source code is publicly available on GitHub
- Anyone can review the code for security issues
- There are no hidden operations or data collection

You can verify everything yourself by browsing the code at [github.com/itsfatduck/optimizerDuck](https://github.com/itsfatduck/optimizerDuck).
