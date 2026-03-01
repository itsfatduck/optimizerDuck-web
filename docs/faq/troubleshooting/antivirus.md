# Antivirus False Positive

> My antivirus flagged or deleted optimizerDuck

Some antivirus software may flag optimizerDuck as potentially unwanted because it modifies system settings such as Registry entries and Windows services. This is a **false positive**.

## How to fix

1. Open your antivirus software
2. Navigate to the quarantine or threat history section
3. Restore optimizerDuck and add it to the exclusion/whitelist

::: info Why does this happen?
Optimization tools often trigger false positives because they interact with system components in ways that are similar to potentially unwanted programs (PUPs). Since optimizerDuck is open source, you can verify exactly what the app does by reviewing the [source code](https://github.com/itsfatduck/optimizerDuck).
:::

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
