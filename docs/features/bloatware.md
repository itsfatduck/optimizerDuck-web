# Bloatware

Manage and remove pre-installed applications that you don't need.

## What is Bloatware?

When you purchase a new Windows PC or install a fresh copy of the operating system, it often comes bundled with various pre-installed applications. While some might be useful, many of these apps, commonly referred to as "bloatware", are rarely used by the average person. Examples frequently include promotional games, trial software, and certain integrated Microsoft services like Xbox features or Office hubs that you may not need. 

These applications take up valuable storage space and may run background processes that consume system memory and CPU power. By analyzing your system and allowing you to safely remove these unnecessary programs, optimizerDuck can help you reclaim disk space, reduce background clutter, and potentially improve overall system responsiveness.

## Select applications to remove

<ImagePreview 
  src="/features/bloatware/selection.png" 
  caption="Select applications to remove"
/>

When you open the **Bloatware** tab, optimizerDuck thoroughly scans your system to present a comprehensive view of all pre-installed app packages. Instead of complex technical jargon, the interface presents each application with clear visual indicators. You can easily identify apps by their recognizable logo, publisher information, and the direct path to where they are installed on your drive. 

To help you make informed decisions, optimizerDuck also evaluates each application and assigns it a clear safety rating.

::: warning Safety levels

- **Safe:** These applications are generally non-essential to the core functioning of Windows. Removing them carries virtually no risk of breaking your system.
- **Caution:** These applications might be tied to certain built-in Windows features or could be dependencies for other software. It is highly recommended to create a system restore point or a backup before deciding to remove them.

Even for applications marked as "Safe", it's best practice to only select the ones you are completely sure you do not use. Don't blindly remove everything just because the app allows it.
:::

To mark an application for removal, simply check the box located next to its name. You can select as many applications as you want in a single session.

## Remove

<ImagePreview 
  src="/features/bloatware/confirmation.png" 
  caption="Confirmation dialog"
/>

After going through the list and carefully checking the boxes for all the applications you no longer want, click the **"Remove"** button located in the top menu bar. 

Before any changes are made to your system, optimizerDuck will display a final confirmation dialog summarizing all the applications you have scheduled for removal. This gives you a chance to double-check your selections. Once you click **"OK"**, the utility will systematically uninstall the selected packages from your computer. Some larger applications may take a few moments to completely detach from your system.
