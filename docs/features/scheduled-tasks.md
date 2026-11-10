---
description: "Manage Windows Scheduled Tasks with optimizerDuck. Disable or remove unnecessary automated processes from third-party apps to improve system performance."
---

# Scheduled Tasks

View and manage Windows scheduled tasks.

## What are scheduled tasks?

Windows has a built-in scheduler that lets programs and scripts run automatically at specific times, when you log in, or after system events.

This is useful for maintenance like backups and updates. But many third-party apps create their own tasks that run telemetry, check for updates on boot, or pre-load services you didn't ask for. Managing these tasks puts you back in control.

## How to disable or enable a scheduled task?

<ImagePreview 
  src="/features/scheduled-tasks/tasks.webp" 
  caption="Scheduled Tasks"
/>

In the **Scheduled Tasks** view, you can see all automated processes on your system. Instead of using the complex Windows Task Scheduler app, optimizerDuck shows everything you need in a clean interface.

To turn off a task, find it in the list and click the **toggle switch** on the left. The switch turns gray, and the task stops running on its schedule.

To turn it back on, just flip the switch again. That's it!

<Card title="Start and Stop actions" icon="lightbulb">

When a task is disabled (toggled off), the **Start** and **Stop** action buttons on its card are automatically disabled to prevent confusion.

</Card>

## How to permanently remove a scheduled task?

Sometimes disabling a task is not enough, especially if it belongs to an app you already uninstalled. In these cases, you can delete the task entirely.

Find the task and click the **trash icon** on its card. optimizerDuck will ask for confirmation first. Click confirm, and the task is permanently removed.

## Be careful

The Task Scheduler handles everything from system backups to driver operations. Be careful.

Only modify tasks you recognize, like update checkers for apps you installed (Adobe, Chrome, games).

<Card title="Only touch what you know" type="warning" icon="triangle-exclamation">

Only modify tasks you recognize, such as update checkers for apps you installed (like Chrome, Spotify, or games). If you are not sure what a task does, leave it alone to keep your system safe.

</Card>
