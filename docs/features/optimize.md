# Optimize

This document helps you understand how to optimize your system using optimizerDuck.

## What is Optimization?

Optimization generally refers to modifying system settings to ensure your operating system runs faster, utilizes fewer resources, and better protects your privacy. Windows ships with many default settings designed around generic use cases, data collection, or features that simply aren't relevant to every user.

In optimizerDuck, "Optimization" applies specifically to configuring network settings, disabling unnecessary telemetry features, adjusting registry values to prioritize performance, and removing resource-hungry background services. These targeted adjustments collectively refine your system by cutting down on latency, ensuring your hardware works efficiently, and limiting the amount of background data sent back to Microsoft.

Learn more about optimization [here (FAQ, Optimizing)](/docs/faq/optimizing#how-are-these-optimizations-applied) or [here (Wikipedia)](https://en.wikipedia.org/wiki/Optimization_(computer_science)).

## Apply an optimization

<ImagePreview 
  src="/features/optimize/apply.png" 
  caption="Optimization items organized into grid sections"
/>

When you navigate to the **Optimize** tab within the application, you are presented with an organized grid of specific system enhancements. To keep everything accessible, optimizerDuck neatly categorizes these options rather than presenting a confusing list of technical commands. 

Each optimization card provides a comprehensive description explaining precisely how the tweak affects your system, completely removing the guesswork. Additionally, tags are used so you can quickly filter and find optimizations that match your specific goals, whether that means boosting gaming performance, enhancing network speed, or increasing privacy. 

Before applying an optimization, you can review its built-in safety rating. The tool classifies changes into three levels: **Safe**, **Caution**, and **Risky**, allowing you to implement changes with confidence based on how they interact with Windows services.

To apply an optimization, simply locate the card for the tweak you wish to perform and click the **toggle switch** in the bottom-right corner. A progress dialog will appear, showing the progress of the optimization. Once the optimization is applied, the switch will turn yellow (applied), indicating that the optimization is applied.

::: warning Some optimizations require an internet connection
Certain optimizations, specifically those that download updated configurations or interact with network drivers, need an active internet connection to be successfully applied. You will see a **"Network connection required"** tag with a Wi-Fi icon below the optimization name if this is the case.
:::

::: warning Remember to restart your computer
Due to the way Windows manages its registry and background services, many of these changes will not be visible immediately. After applying new optimizations, you need to restart your computer to ensure all modifications take effect.
:::

## Revert an optimization

I understand that changing system settings can sometimes lead to unexpected behaviors entirely depending on your specific hardware or installed software. Because each optimization has a different risk profile, optimizerDuck ensures that none of these changes are permanent.

If you experience any issues or simply decide you don't like how a specific setting behaves after applying it, you can easily revert it. All you need to do is open the module again, find the corresponding optimization card, and click the **toggle switch** to turn it off. This action restores your system to the state it was in right before you applied the optimization.
