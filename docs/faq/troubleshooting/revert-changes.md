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

::: warning
Always create a system restore point **before** applying optimizations. This gives you a safety net to revert any changes.
:::

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
   ```
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

## Still having issues?

If you cannot resolve the issue:

- Ask for help in our [Discord community](https://discord.gg/tDUBDCYw9Q)
- Report the issue on [GitHub Issues](https://github.com/itsfatduck/optimizerDuck/issues/new/choose) with details about which optimizations you applied
