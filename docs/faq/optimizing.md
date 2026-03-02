# Optimizing

Frequently Asked Questions about optimizing, reverting, and how it impacts your system.

## How are these optimizations applied?

The optimizations are not magic. We have coded services to safely modify or remove Registry keys, adjust the startup mode of Windows services, and run targeted Shell commands. Everything has been carefully coded and tested before release. 

Every optimization comes with a clear name and description, making it easy for you to understand exactly what it does to your system before you apply it.

You can learn more about optimization [here (Wikipedia)](https://en.wikipedia.org/wiki/Optimization_(computer_science)).

## What are the benefits of optimizing Windows?

Optimizing Windows can help you to:

- Improve overall performance and system responsiveness
- Reduce system latency and input delay
- Free up wasted resources like RAM and CPU cycles
- Reduce micro stutters and game freezes
- Disable unnecessary background features, bloatware, and telemetries

## What are the risks of optimizing Windows?

Optimizing Windows can be risky if not done correctly. Some common risks include:

- System instability or unexpected app behaviors
- Data loss or corrupted Windows components
- Missing features (e.g., losing Bluetooth capabilities if you disable its service)
- Performance issues caused by conflicts with third-party software or user modifications

**Always create a restore point or backup before applying system changes.**

## Can I double my FPS with this application?

It is highly unlikely, but not entirely impossible. The optimizations provided here primarily help your system by freeing up resources, reducing latency, and eliminating stutters.

You will notice your system feeling faster, and your games might gain some extra FPS because they can utilize more system resources. However, the most reliable way to significantly increase FPS is by upgrading your hardware, improving cooling, or overclocking. Applying software optimizations alone will rarely double your FPS.

## Where do these optimizations come from?

Most of the optimizations included here are researched and inspired by various online sources, including Reddit, YouTube, Discord servers, WinUtil, and other optimization websites. We rigorously test them before adding them to the app.

## How does this app save the changes it makes?

When you apply an optimization, the application records the changes and saves the original data into a JSON file, intended to easily help you revert your system back to the original state.

These backup files are stored locally at:

```bat
%localappdata%\optimizerDuck\Revert\
```