# Features

The **Features** section lets you enable or disable specific
Windows behaviors without digging through Settings, Control Panel,
or the registry. It covers quality-of-life changes like taskbar
preferences, File Explorer behavior, gaming switches, and desktop icons.

> **Note:** This is a preview feature currently under active development.

## What the Features section is for

The **Features** section was introduced in optimizerDuck `v2.7.1` as a new,
dedicated area for Windows feature toggles. It complements the existing
**Optimize** section rather than replacing it.

In general:

- use **Features** for Windows interface and behavior toggles
- use **Optimize** for performance, privacy, and system tuning

## Open and browse categories

<ImagePreview 
  src="/features/features/app.png" 
  caption="Features categories overview"/>

When you open the **Features** tab, optimizerDuck shows a category overview as a
list of cards. Each card includes a name, an icon, and a short description so
you can quickly jump to the part of Windows you want to customize.

Inside a category page, optimizerDuck provides:

- a search box to filter features by name or description
- a sort menu to organize items by name or current enabled state
- section grouping so related toggles stay together
- a single switch on each card to enable or disable that feature

## Enable or disable a feature

Using a feature toggle is intentionally simple.

1. Open the **Features** tab.
2. Select the category that matches what you want to change.
3. Optionally search or sort the list.
4. Find the card for the Windows behavior you want.
5. Use the switch on the right side of the card to turn it on or off.

Each card includes a short description pulled directly from the app's localized
resources, so you can understand what the switch changes before applying it.

## How changes are applied

Most feature toggles work by writing the underlying registry values.

For shell-related features, the app restarts **Explorer** so taskbar,
Explorer, and desktop changes take effect immediately. Gaming and
system-level settings may still require a sign-out or reboot.

## Things to keep in mind

The Features section is convenient, but it still changes real Windows settings.
Keep these points in mind before making larger batches of changes.

<Card title="Feature behavior depends on Windows version" icon="triangle-exclamation">

Some toggles only make sense on certain Windows versions. For example, classic
context menu behavior is specific to Windows 11, while other taskbar options may
behave differently across Windows 10 and Windows 11.

</Card>

<Card title="Many toggles are easy to reverse" icon="lightbulb">

Unlike one-way tweaks, feature switches are built around enabling and disabling
the same Windows behavior. If you do not like the result, return to the same
card and switch it back.

</Card>

## Why use this instead of changing Windows manually?

optimizerDuck brings together settings normally spread across:

- the Settings app
- File Explorer options
- taskbar personalization menus
- older Control Panel pages
- registry-based hidden switches