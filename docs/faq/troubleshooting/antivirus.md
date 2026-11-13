---
description: "Fix antivirus false positives flagging optimizerDuck. Step-by-step guide for Windows Defender, Avast, Bitdefender, Malwarebytes, Norton, and other antivirus software."
---

# Antivirus False Positive

> My antivirus flagged or deleted optimizerDuck

Some antivirus software may flag optimizerDuck as unwanted because it modifies system settings like Registry entries and Windows services. This is a **false positive**.

## How to fix

1. Open your antivirus software
2. Navigate to the quarantine or threat history section
3. Restore optimizerDuck and add it to the exclusion/whitelist

<Card title="Why does this happen?" icon="circle-info">

Optimization tools often trigger false positives because they interact with system components in ways similar to unwanted programs. Since optimizerDuck is open source, you can check exactly what it does by reviewing the [source code](https://github.com/itsfatduck/optimizerDuck).

</Card>

## Common antivirus software

Here are quick steps for popular antivirus programs:

### Windows Defender

<Steps>
  <Step title="Open **Windows Security**" />
  <Step title="Go to **Virus & threat protection**, then select **Protection history**" />
  <Step title="Find the optimizerDuck entry and select **Allow on device**" />
</Steps>

### Other antivirus (Avast, AVG, Kaspersky, etc.)

<Steps>
  <Step title="Open your antivirus application" />
  <Step title="Look for **Quarantine**, **Chest**, or **Threat History**" />
  <Step title="Find optimizerDuck and choose **Restore** or **Allow**" />
  <Step title="Add the file to the **Exclusion list** to prevent future detections" />
</Steps>

### Bitdefender

<Steps>
  <Step title="Open **Bitdefender** and go to **Protection**" />
  <Step title="Select **Advanced Threat Defense** and click **Manage exclusions**" />
  <Step title="Add the optimizerDuck `.exe` file or folder to the exclusion list" />
</Steps>

### Malwarebytes

<Steps>
  <Step title="Open **Malwarebytes** and go to **Detection History**" />
  <Step title="Find the optimizerDuck entry and select **Allow**" />
  <Step title="Open **Settings** > **General** > **Allow List** and add the optimizerDuck folder" />
</Steps>

### Norton

<Steps>
  <Step title="Open **Norton** and navigate to **Security** > **Quarantine**" />
  <Step title="Find optimizerDuck and click **Restore**" />
  <Step title="Add the file to the **Exception List** in **Settings** > **Antivirus** > **Exceptions**" />
</Steps>

## Still having issues?

If you continue to experience problems:

- Ask for help in our [Discord community](https://discord.gg/tDUBDCYw9Q)
- Report the issue on [GitHub Issues](https://github.com/itsfatduck/optimizerDuck/issues/new/choose)
