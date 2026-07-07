---
description: "Manage Windows startup programs with optimizerDuck's Startup Manager. Disable unnecessary startup apps, improve boot times, and control what runs automatically."
---

# Startup Manager

Manage the applications that automatically run when your computer starts up.

## What is the Startup Manager?

When you log into Windows, several programs start automatically. This is helpful for tools like antivirus, but many third-party apps add themselves to this list during installation. These extra programs use CPU and RAM, and they slow down boot time.

The Startup Manager gives you control over this process. It shows all startup triggers (registry entries, startup folders, and logon scheduled tasks) in one dashboard.

## Viewing startup items

<ImagePreview 
  src="/features/startup-manager/app.webp" 
  caption="Startup Manager (Startup Apps)"
/>

When you open the **Startup Manager** tab, optimizerDuck shows a clean list of every program set to run at startup.

The interface shows each app's name, description, where the trigger is (registry or folder), and the exact command it runs.

The view has two sections: **Startup Apps** (traditional startup paths) and **Scheduled Tasks (Logon)** (tasks that run when you sign in).

## Disabling or enabling a startup program

To improve boot time, find a program you don't need at startup and disable it.

1. Find the program in the list.
2. Click the **toggle switch** on the left to disable it.
3. The switch will update, and the program won't run at next boot.

To re-enable it, click the toggle switch again.

## Disabling or enabling a startup scheduled task (Logon)

<ImagePreview 
  src="/features/startup-manager/schedule.webp" 
  caption="Startup Manager (Startup Schedule)"
/>

Some apps bypass normal startup lists by creating a Task Scheduler entry set to run "At log on". optimizerDuck shows these in the **Startup Schedule** section.

Managing these works the same way. Review the task details and use the toggle switch to enable or disable them.

<Card title="Tip" icon="lightbulb">

Disabling a startup program or scheduled task does not uninstall, delete, or break it. You are simply stopping it from opening automatically. You can always open the program manually from your Start menu or desktop shortcut whenever you actually need to use it.

</Card>

## What should I disable?

Knowing what to turn off can be intimidating, but as a general rule of thumb, you only need a few essential services running continuously.

- **Safe to disable:** Cloud storage sync clients (if you don't need instant syncing), chat applications like Discord, Skype, or Microsoft Teams, media players, game launchers, and software update checkers.
- **Keep enabled:** Security and antivirus software, necessary hardware drivers (such as your audio control panel, graphics card companion software, or mouse/keyboard software), and crucial system utilities.

<Card title="Warning" type="warning" icon="triangle-exclamation">

Always be cautious when disabling startup items you do not immediately recognize. Some generic-sounding processes might actually be related to critical system services or important driver functionality. If you are ever unsure what an item does, the safest course of action is to leave it enabled or search online using the program's provided name and command line for more context.

</Card>
