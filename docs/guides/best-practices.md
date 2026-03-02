# Best Practices

optimizerDuck offers dozens of tweaks, but **you don't need to enable all of them**. In fact, checking every single box without understanding what it does is a bad idea.

Here are our recommended best practices to ensure you get the best performance without breaking your system.

## 1. Always Create a Restore Point
We cannot stress this enough. Before your first optimization session, create a Windows System Restore point. If anything goes wrong, you can roll back Windows in minutes.

## 2. Don't Check Everything Blindly
Read the description of the optimization before clicking it. 
- If you use a Bluetooth headset, **do not** disable the Bluetooth service.
- If you use the Microsoft Store, **do not** remove its background processes.
- If you print documents, **do not** disable the Print Spooler.

## 3. Profiles based on your usage

### For Hardcore Gamers
If maximum FPS and lowest latency are your only goals:
- Apply all **Performance**, **Latency**, and **Power** optimizations.
- Apply **Privacy** and **Telemetry** disable tweaks to stop background HDD/CPU usage.
- Use the **Disable Power Throttling** optimizations.

### For Office & Daily Users
If you use your PC for study, work, or casual browsing:
- Stick to **UI / UX** tweaks (like disabling Bing Search in start menu, speeding up menu animations).
- Use the [**Bloatware**](/docs/guides/bloatware) remover to uninstall pre-installed junk apps.
- Only disable Services if you are 100% sure you do not need them.

### For Developers & Creators
- Be very careful when disabling **Network** or **Virtualization** services, as tools like Docker, WSL, or Git might rely on them.
- Focus strictly on cleaning up Disk Space and disabling consumer Bloatware.

## 4. Don't Forget to Restart
Most Registry and Service changes require a full system restart to take effect properly. If you've applied 10 tweaks and feel no difference, save your work and reboot your PC.
