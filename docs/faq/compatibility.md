# Compatibility & Conflicts

A common concern with optimization tools is whether they will break other software, especially games that use strict Anti-Cheat systems.

## Anti-Cheat Systems (Vanguard, BattlEye, EAC)

**optimizerDuck is entirely safe to use alongside Anti-Cheat systems.** 

We do not inject DLLs into processes, we do not modify kernel memory, and we do not alter game files. The optimizations only adjust standard Windows settings (like disabling background telemetry or changing power plans). 
- Games like *Valorant* (Vanguard), *CS2* (VAC), and *Apex Legends* (EAC) will **not** flag optimizerDuck or ban you for using it.

## Antivirus Software

Some Antivirus applications (including Windows Defender) might flag optimization tools as "HackTools" or "PUPs" (Potentially Unwanted Programs). 
- This is a **false positive**. Because the app modifies the Registry and stops background services, heuristic scanners sometimes get overly suspicious.
- You can read more about this in our [Antivirus False Positive](/docs/faq/troubleshooting/antivirus) troubleshooting guide.

## Windows Updates

It is highly recommended to run Windows Update **before** applying optimizations, and after updating windows, you should run pause it as well to prevent windows from updating again and resetting your optimizations.

## Work Environment (Office / Developers)

If you are using a work computer:
- Be careful with the **Network** and **Privacy** optimizations. Disabling critical services like the Print Spooler or Remote Desktop may break your ability to print documents or access company servers.
- Please refer to our [Best Practices](/docs/guides/best-practices) for advice on safe optimizing.
