# Scheduled Tasks

View and manage Windows scheduled tasks.

## What are scheduled tasks?

Windows has a built-in scheduler that lets programs and scripts run automatically at specific times, when you log in, or after system events.

This is useful for system maintenance like backups and security updates, but many third-party applications create their own scheduled tasks that run telemetry, launch update checkers on boot, or pre-load services you didn't ask for. Managing these tasks puts you back in control.

## How to disable or enable a scheduled task?

<ImagePreview 
  src="/features/scheduled-tasks/tasks.webp" 
  caption="Scheduled Tasks"
/>

In the **Scheduled Tasks** view, you can see all the automated processes currently configured on your system. Rather than having to dig through Windows' complex legacy "Task Scheduler" application, optimizerDuck provides a clean, modern interface showing everything you need.

If you spot a task from an application you recognize but don't want running automatically, you can turn it off. To disable a task, find it in the list and click the **toggle switch** located on the left side of the task card. The switch will turn gray, indicating that the task will no longer trigger on its schedule. 

To restore the automated process, flip the switch back. A notification will always pop up to confirm that the changes were successfully applied to the Windows Task Scheduler.

<Card title="Start and Stop actions" icon="lightbulb">

When a task is disabled (toggled off), the **Start** and **Stop** action buttons on its card are automatically disabled to prevent confusion.

</Card>

## How to permanently remove a scheduled task?

Sometimes disabling a task isn't enough, especially if it belongs to an application you've already uninstalled but that left behind junk records. In these cases, you can delete the scheduled task entirely.

To do this, locate the unwanted task and click on the **garbage can icon** positioned on its card. Because this action removes the task configuration permanently from Windows, optimizerDuck will ask you for confirmation first. This prevents you from accidentally deleting something important. Once confirmed, a notification will verify that the task registry has been successfully cleared.

## Be careful

The Task Scheduler is a powerful core Windows component. Because it handles everything from system backups to driver operations, you must exercise caution. 

Only modify or remove scheduled tasks that you completely recognize, such as update checkers for specific software you've installed (like Adobe, Google Chrome, or specific games). 

<Card title="Warning" type="warning" icon="triangle-exclamation">

**DO NOT** touch scheduled tasks that you are unfamiliar with. Some entries may be related to critical system services from Microsoft or hardware drivers for your graphics, network, or audio devices. Modifying these can lead to system instability, broken features, or crashes. If you are unsure about what a specific task does, leave it enabled or search online using the task's name to find more information.

</Card>
