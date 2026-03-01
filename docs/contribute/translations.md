# Translations Guide

optimizerDuck uses the .NET Resources (`.resx`) system for localization. This allows the application to dynamically switch languages based on user preference.

## Language Files

All translation files are located in:
`optimizerDuck/Resources/Languages/`

- **`Translations.resx`**: The primary English source. All new keys must be added here first.
- **`Translations.[lang].resx`**: Locale-specific files (e.g., `Translations.vi-VN.resx` for Vietnamese).

## How to Contribute

### 1. Adding a New String

When adding a feature that requires text, add a new key-value pair to `Translations.resx` (English). Use a descriptive key name (e.g., `Settings.Language.Title`).

### 2. Translating for Existing Languages

Open the `.resx` file for your target language in Visual Studio's Resource Editor or a standard text editor. Copy the key from the English file and provide the translated value.

### 3. Adding a New Language

1. Copy `Translations.resx`.
2. Rename it using the appropriate language tag: `Translations.[language-tag].resx`.
3. Clear the values and provide translations for your language.

## Localization in XAML

We use a custom localization extension to bind resources in the UI. **Do not hardcode strings** in XAML files. Use the following syntax:

```xml
<TextBlock Text="{ext:Loc Settings.Language.Description}" />
```

## Guidelines

- **Accuracy**: Aim for natural-sounding translations rather than literal ones.
- **Technical Terms**: Keep standard technical terms (like "Registry", "DNS", "FPS") if they are commonly used in your language.
- **Placeholders**: If a string contains placeholders like `{0}`, ensure they remain in the translated version as they are used for dynamic data.

::: info Machine Translation
We use AI to provide initial translations for some languages. If a language is marked as "AI translated" in the app, it is a high priority for human review and refinement.
:::
