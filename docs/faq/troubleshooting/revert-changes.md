---
description: "Learn how to revert optimizerDuck system changes. Use System Restore, toggle off specific optimizations, fix network or audio issues, and restore missing backup files."
---

# Something Broke After Optimizing

> Issues after applying optimizations

If you experience problems after using optimizerDuck to apply optimizations, don't panic. There are several ways to revert the changes.

## Use System Restore

If you created a restore point before applying changes (as recommended), you can revert your system to its previous state:

1. Open the Start menu and search for **"Create a restore point"**
2. Click **"System Restore..."**
3. Select the restore point created before you applied optimizations
4. Follow the prompts to complete the restoration
5. Your computer will restart automatically

<Card title="Create a restore point first" icon="triangle-exclamation">

Always create a system restore point **before** applying optimizations. This gives you a safety net to revert any changes.

</Card>

## Toggle off specific optimizations

If you know which optimization caused the issue:

1. Open **optimizerDuck**
2. Find the optimization that may have caused the problem
3. **Toggle it off** to revert that specific change
4. Restart your computer

## Common issues and fixes

### Internet not working after optimization

Some network-related optimizations may cause connectivity issues on certain configurations:

1. Open **optimizerDuck** and disable any network-related optimizations
2. Open **Command Prompt** as Administrator and run:
   ```bat
   netsh winsock reset
   netsh int ip reset
   ipconfig /flushdns
   ```
3. Restart your computer

### Audio or display issues

If you experience audio or display problems:

1. Open **optimizerDuck** and disable any visual or multimedia-related optimizations
2. Check **Device Manager** for any warning icons on your devices
3. Update your drivers from the manufacturer's website
4. Restart your computer

### Changes don't seem to take effect after applying

If you've applied an optimization but don't notice any difference:

1. **Restart your computer**: many optimizations (especially Registry and service changes) require a full reboot to take effect
2. Open **optimizerDuck** and check that the toggle switch is still in the **on** position (yellow)
3. If it was reverted, apply it again and restart
4. Some tweaks are subtle by design: they reduce background resource usage rather than providing a visible change

### Revert file is missing or corrupted

optimizerDuck saves a JSON backup of your original settings before making any changes. These files are stored at:

```text
%localappdata%\optimizerDuck\Revert\
```

If a revert file is accidentally deleted or becomes corrupted:

1. You can still revert changes **manually** by toggling the optimization off: optimizerDuck will restore Windows to its default state for that setting
2. If you created a **System Restore Point** beforehand (recommended), use that as a fallback
3. If neither option works, you may need to manually reverse the change by searching online for the default Windows value

To avoid this in the future, always create a System Restore Point before applying new optimizations.

## Still having issues?

If you continue to experience problems:

- Ask for help in our [Discord community](https://discord.gg/tDUBDCYw9Q)
- Report the issue on [GitHub Issues](https://github.com/itsfatduck/optimizerDuck/issues/new/choose)
