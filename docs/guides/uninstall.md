# Uninstalling & Reverting

Since **optimizerDuck** is a portable application, uninstalling it is incredibly simple. However, before you delete the app, you may want to revert any system changes you made.

## Step 1: Revert Optimizations

If you want to restore your computer to its original state before using optimizerDuck:

1. Open **optimizerDuck**.
2. Navigate to the **Optimize** tab.
3. Select the optimizations you want to undo and click the toggle switch to turn it off.
4. Wait for the application to restore the original Registry keys, services, and settings.
5. **Restart your PC** to ensure all restored settings take effect.

::: warning
If you delete the app and its data folder before reverting, you will lose the JSON backups of your original settings, making it harder to revert changes automatically.
:::

## Step 2: Delete App Data (Optional)

optimizerDuck stores a few configuration files and revert backups locally. If you want to completely wipe its footprint:

1. Press `Win + R` to open the Run dialog.
2. Type `%localappdata%` and press Enter.
3. Locate the `optimizerDuck` folder and delete it.

## Step 3: Delete the App

Because there is no traditional installer or uninstaller, you just need to delete the `optimizerDuck.exe` file that you originally downloaded.

And that's it! optimizerDuck has been completely removed from your system.
