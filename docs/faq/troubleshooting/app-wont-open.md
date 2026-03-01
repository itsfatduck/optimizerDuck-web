# App Won't Open

> The app crashes or fails to launch

If optimizerDuck fails to start, try the following solutions.

## Check system requirements

Make sure your system meets the minimum requirements:

| Requirement     | Details                                                |
| --------------- | ------------------------------------------------------ |
| **OS**          | Windows 10 or Windows 11 (64-bit)                      |
| **Permissions** | Administrator privileges required                      |
| **Disk space**  | At least 100 MB free on your system drive (usually C:) |

## Run as Administrator

optimizerDuck requires Administrator privileges to apply system optimizations.

1. Right-click the **optimizerDuck** application file
2. Select **"Run as administrator"**

::: tip
If you always want to run optimizerDuck as Administrator, right-click the file → **Properties** → **Compatibility** tab → check **"Run this program as an administrator"** → **OK**.
:::

## Check for corrupted download

Your download may have been interrupted or corrupted:

1. **Delete** the downloaded file
2. **Re-download** optimizerDuck from the [download page](/docs/download)
3. Try running the newly downloaded file

## Check disk space

If your system drive (C:) is nearly full, apps may fail to launch or behave unexpectedly:

1. Open **File Explorer**
2. Right-click your **C: drive** → **Properties**
3. Check the available free space

If space is low, try:

- Emptying the **Recycle Bin**
- Running **Disk Cleanup** (search for it in the Start menu)
- Moving large files to another drive

## Check for missing dependencies

In rare cases, optimizerDuck may require the **.NET Runtime** to be installed. If you see an error about missing frameworks:

1. Visit [Microsoft .NET Downloads](https://dotnet.microsoft.com/download)
2. Download and install the latest **.NET Desktop Runtime**
3. Restart your computer and try again
