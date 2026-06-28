---
description: "Fix antivirus false positives flagging optimizerDuck. Step-by-step guide for Windows Defender, Avast, Bitdefender, Malwarebytes, Norton, and other antivirus software."
---

# Antivirus False Positive

> My antivirus flagged or deleted optimizerDuck

Some antivirus software may flag optimizerDuck as potentially unwanted because it modifies system settings such as Registry entries and Windows services. This is a **false positive**.

## How to fix

1. Open your antivirus software
2. Navigate to the quarantine or threat history section
3. Restore optimizerDuck and add it to the exclusion/whitelist

<Card title="Why does this happen?" icon="circle-info">

Optimization tools often trigger false positives because they interact with system components in ways that are similar to potentially unwanted programs (PUPs). Since optimizerDuck is open source, you can verify exactly what the app does by reviewing the [source code](https://github.com/itsfatduck/optimizerDuck).

</Card>

## Common antivirus software

Here are quick steps for popular antivirus programs:

### Windows Defender

1. Open **Windows Security**
2. Go to **Virus & threat protection** → **Protection history**
3. Find the optimizerDuck entry and select **Allow on device**

### Other antivirus (Avast, AVG, Kaspersky, etc.)

1. Open your antivirus application
2. Look for **Quarantine**, **Chest**, or **Threat History**
3. Find optimizerDuck and choose **Restore** or **Allow**
4. Add the file to the **Exclusion list** to prevent future detections

### Bitdefender

1. Open **Bitdefender** → **Protection** → **Advanced Threat Defense**
2. Click **Manage exclusions**
3. Add the optimizerDuck `.exe` file or folder to the exclusion list

### Malwarebytes

1. Open **Malwarebytes** → **Detection History**
2. Find the optimizerDuck entry and select **Allow**
3. Go to **Settings** → **General** → **Allow List** and add the optimizerDuck folder

### Norton

1. Open **Norton** → **Security** → **Quarantine**
2. Find optimizerDuck and click **Restore**
3. Add the file to the **Exception List** in **Settings** → **Antivirus** → **Exceptions**

## Still having issues?

If you continue to experience problems:

- Ask for help in our [Discord community](https://discord.gg/tDUBDCYw9Q)
- Report the issue on [GitHub Issues](https://github.com/itsfatduck/optimizerDuck/issues/new/choose)
