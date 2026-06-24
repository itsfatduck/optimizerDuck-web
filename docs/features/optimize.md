# Optimize

This document helps you understand how to optimize your system using optimizerDuck.

## What is Optimization?

Optimization generally refers to modifying system settings to ensure your operating system runs faster, utilizes fewer resources, and better protects your privacy. Windows ships with many default settings designed around generic use cases, data collection, or features that simply aren't relevant to every user.

In optimizerDuck, "Optimization" applies to configuring network settings, disabling unnecessary telemetry, adjusting registry values for performance, and removing resource-hungry background services. These adjustments reduce latency, improve hardware efficiency, and limit background data sent to Microsoft.

Learn more about optimization [here (FAQ, Optimizing)](/docs/faq/optimizing#how-are-these-optimizations-applied) or [here (Wikipedia)](<https://en.wikipedia.org/wiki/Optimization_(computer_science)>).

## Apply an optimization

<ImagePreview 
  src="/features/optimize/apply.webp" 
  caption="Optimization items organized into grid sections"
/>

When you open the **Optimize** tab, you see an organized grid of system enhancements grouped by category.

Each card describes exactly how the tweak affects your system, and tags let you filter by goal: gaming, network, privacy, and more.

optimizerDuck also displays **Windows10Only** and **Windows11Only** tags on optimizations that are specific to a particular version, so you can see at a glance whether a tweak applies to your system.

Before applying an optimization, you can review its built-in safety rating. The tool classifies changes into three levels: **Safe**, **Caution**, and **Risky**, allowing you to implement changes with confidence based on how they interact with Windows services.

To apply an optimization, locate the card for the tweak you want and click the **toggle switch** in the bottom-right corner. A progress dialog will appear, showing the progress of the optimization. Once the optimization is applied, the switch will turn yellow to indicate the change.

<Card title="Some optimizations require an internet connection" type="warning" icon="triangle-exclamation">

Certain optimizations, specifically those that download updated configurations or interact with network drivers, need an active internet connection to be successfully applied. You will see a **"Network connection required"** tag with a Wi-Fi icon below the optimization name if this is the case.

</Card>

<Card title="Remember to restart your computer" type="warning" icon="triangle-exclamation">

Due to the way Windows manages its registry and background services, many of these changes will not be visible immediately. After applying new optimizations, you need to restart your computer to ensure all modifications take effect.

</Card>

## Revert an optimization

Each optimization has a different risk profile, so optimizerDuck ensures that none of these changes are permanent.

If you experience issues or decide you don't like how a setting behaves after applying it, revert it. Open the module again, find the optimization card, and click the **toggle switch** to turn it off. This action restores your system to the state it was in right before you applied the optimization.
