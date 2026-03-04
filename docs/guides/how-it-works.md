# Under the Hood: How it Works

For advanced users and developers who want to understand exactly what **optimizerDuck** is doing behind the scenes, this guide explains its core mechanisms.

## System Interaction

optimizerDuck does not use "black magic" or deeply injected resident drivers. Instead, it acts as a very capable UI wrapper for native Windows APIs and command-line tools. Everything the app does can theoretically be done manually, optimizerDuck just makes it safe, fast, and automated.

### 1. Registry Edits

The vast majority of Windows behaviors (telemetry, context menus, hidden settings) are controlled via the Windows Registry. optimizerDuck reads and writes to specific Registry keys (`HKLM`, `HKCU`, etc.) to toggle these features.
- *Example: Disabling Bing search in the Start Menu by creating a specific DWORD value.*

Learn more:
- [Microsoft Docs: Registry](https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry)
- [RegistryService.cs](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/OptimizationServices/RegistryService.cs) - The source code for the RegistryService class.

### 2. Windows Services
Many background processes running on Windows are managed as system services. optimizerDuck interacts with the Service Control Manager (SCM) to modify their startup type
- *For example, changing a service from **Automatic** to **Manual** or **Disabled**.*

Learn more:
- [Microsoft Docs: Service Control Manager](https://learn.microsoft.com/en-us/windows/win32/services/service-control-manager)
- [ServiceProcessService.cs](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/OptimizationServices/ServiceProcessService.cs) - The source code for the ServiceProcessService class.

### 3. Scheduled Tasks

To manage scheduled tasks, optimizerDuck uses the Task Scheduler API. This allows the application to create, modify, and delete scheduled tasks on the system.
- *For example, disabling the "Windows Defender Antivirus" scheduled task.*

Learn more:
- [Microsoft Docs: Task Scheduler](https://learn.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page)
- [NuGet package: TaskScheduler](https://www.nuget.org/packages/TaskScheduler/)
- [ScheduledTasksService.cs](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/OptimizationServices/ScheduledTasksService.cs) - The source code for the ScheduledTasksService class.

### 4. PowerShell & CMD Execution
For actions like removing built-in UWP apps (Bloatware) or running advanced system cleanups, optimizerDuck programmatically executes PowerShell scripts (`Remove-AppxPackage`) and CMD commands in the background without showing an annoying black terminal window.

Learn more:
- [Microsoft Docs: PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/overview)
- [Microsoft Docs: CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd)
- [ShellService.cs](https://github.com/itsfatduck/optimizerDuck/blob/master/optimizerDuck/Services/OptimizationServices/ShellService.cs) - The source code for the ShellService class.

## The Revert System

We don't just change your settings blindly. We ensure you have a safety net.

Whenever you apply an optimization, the application:
1. **Reads** the current state of the Registry key or Service.
2. **Saves** that exact original state into a local `.json` file.
3. **Applies** the new optimized state.

These `.json` backups are stored in `%localappdata%\optimizerDuck\Revert\`. When you choose to revert a tweak, the app simply reads this file and writes the original value back to the system.

## Transparency & Open Source

Because optimizerDuck is completely open-source, you don't have to take our word for it. You can browse the C# and WPF source code on [GitHub](https://github.com/itsfatduck/optimizerDuck) to see the exact code used for every single toggle in the application.
