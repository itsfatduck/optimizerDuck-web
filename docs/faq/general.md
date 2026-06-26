# General

Frequently Asked Questions and Answers about optimizerDuck in general. Let's cover the basics.

## What is optimizerDuck?

optimizerDuck helps you optimize and clean up your Windows operating system.

<Card title="Disclaimer" type="warning" icon="triangle-exclamation">

optimizerDuck is provided "as is", without warranty of any kind.

By using this tool, you agree that the authors are not responsible for:

- System instability
- Data loss
- Performance issues caused by third party software or user modifications

**Always create a restore point or backup before applying system changes.**

</Card>

## Is optimizerDuck safe to use?

Yes. optimizerDuck is fully open-source under the GPL v3 license, meaning anyone can inspect, audit, or build the source code themselves. Every release is built automatically by GitHub Actions from the public source, with no hidden modifications, no unsigned binaries injected after build.

The app does not collect any telemetry, usage data, or personal information. See the [Privacy Policy](https://github.com/itsfatduck/optimizerDuck/blob/master/PRIVACY.md).

Each optimization comes with a clear risk rating (Safe, Moderate, or Risky) so you know exactly what each change does before applying it. Automatic backups and one-click reverts are built into every change.

## Does this app offer anything other than optimizations?

Yes! The app is built with several integrated tools to make your experience easier, so you do not need to download additional software. For example, it includes a bloatware removal tool, a startup manager, and more. Feel free to download it and explore all the features.

## Is optimizerDuck free?

Yes, optimizerDuck is 100% free and open-source. There are no hidden fees, subscriptions, or paywalls for any of the features. 

## What versions of Windows are supported?

Currently, optimizerDuck officially supports Windows 10 and Windows 11. Older versions like Windows 7 or 8 are not supported as they lack modern APIs and structures required for some features to function safely and correctly.

## Does optimizerDuck collect my data?

No. The app contains zero telemetry, analytics, or phone-home functionality. It runs entirely offline and does not send any data anywhere. All configuration and backup data is stored locally on your machine at:

```bat
%localappdata%\optimizerDuck\
```

For full details, see the [Privacy Policy](https://github.com/itsfatduck/optimizerDuck/blob/master/PRIVACY.md).

## Do I need administrator rights?

Yes. optimizerDuck modifies system settings, Registry keys, and Windows services, so it requires administrator privileges to run. The app natively requests administrative privileges when launched.

## Is optimizerDuck portable?

Yes. optimizerDuck runs as a single `.exe` file with no installation required. There is no installer, no registry entries are created for the app itself, and you can run it directly from any folder. No traces are left behind when you delete the executable.

## How do I update optimizerDuck?

optimizerDuck **automatically checks for updates** every time you launch the app. It compares your current version against the latest release available on [GitHub Releases](https://github.com/itsfatduck/optimizerDuck/releases).

If you are using an older version and a newer one exists, you will see a prominent notification banner right on the **Dashboard** page the moment the app opens. Just click the download link in the notification to get the latest version.

To update manually, simply:

1. Download the latest version from the [GitHub Releases page](https://github.com/itsfatduck/optimizerDuck/releases)
2. Replace your existing `.exe` file with the new one

Your revert backups and settings are stored separately in `%localappdata%\optimizerDuck\` and will carry over automatically, so updating will not affect any of your saved configurations.

## Can I build optimizerDuck from source myself?

Yes! If you prefer to build the executable yourself rather than downloading a pre-built release:

1. Clone the repository:
   ```bash
   git clone https://github.com/itsfatduck/optimizerDuck.git
   cd optimizerDuck
   ```
2. Restore and build:
   ```bash
   dotnet restore optimizerDuck.slnx
   dotnet build optimizerDuck.slnx --configuration Release
   ```
3. Run tests to verify:
   ```bash
   dotnet test optimizerDuck.Test/optimizerDuck.Test.csproj
   ```

You'll need the .NET 10 SDK and a Windows machine. This process is also how the official releases are built via GitHub Actions.

## How do I contribute translations?

optimizerDuck relies on community contributions for translations. If you'd like to add or improve a translation:

1. Check the [CONTRIBUTING.md](https://github.com/itsfatduck/optimizerDuck/blob/master/CONTRIBUTING.md) guide for translation instructions
2. Translation files are located in `Resources/Languages/Translations.*.resx`
3. Submit a pull request with your changes

Currently, optimizerDuck supports 13 languages. See the [Getting Started guide](/docs/guides/getting-started#changing-language) for the full list.

## How can I report bugs, contribute, or request features?

We welcome community feedback and contributions! You can submit issues, report bugs, or request new features at [this link](https://github.com/itsfatduck/optimizerDuck/issues/new/choose). If you'd like to get your hands dirty, be sure to check out our [Contribute section](/docs/contribute/overview).
