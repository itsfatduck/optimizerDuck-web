# Development Guide

This guide covers the technical setup and workflow for developers contributing to the optimizerDuck codebase.

## Tech Stack

- **Primary Language**: C# (Modern .NET)
- **UI Framework**: WPF with [WPF UI (lepoco)](https://wpfui.lepo.co/)
- **Testing**: xUnit with Coverlet for coverage
- **Build System**: .NET CLI / MSBuild

## Environment Setup

1. **Prerequisites**:
   - [Visual Studio 2022](https://visualstudio.microsoft.com/) (recommended) or JetBrains Rider.
   - .NET SDK (check `global.json` or project files for version).
2. **Clone the Repository**:
   ```bash
   git clone https://github.com/itsfatduck/optimizerDuck.git
   ```
3. **Build the Project**:
   Run the `build.bat` script in the root directory, or use the .NET CLI:
   ```bash
   dotnet build optimizerDuck.slnx
   ```

## Project Structure

- `optimizerDuck/`: Main application source.
  - `UI/`: XAML views, pages, and UI components.
  - `Services/`: Business logic and system level operations.
  - `Common/`: Utilities, helpers, and shared data converters.
  - `Resources/`: Assets and `.resx` translation files.
- `optimizerDuck.Test/`: xUnit test suite.

## Coding Standards

We follow standard C# naming conventions and use `.editorconfig` to enforce style consistency.

- **Naming**: `PascalCase` for classes and methods; `camelCase` for variables and parameters.
- **XAML**: Use the custom localization extension `{ext:Loc Key}` for all user-facing text.
- **Commits**: We use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat`: New features or optimizations.
  - `fix`: Bug fixes.
  - `refactor`: Code restructuring without functional changes.

## Testing

Ensure all tests pass before submitting a Pull Request:

```bash
dotnet test optimizerDuck.Test/optimizerDuck.Test.csproj
```

## Pull Request Process

1. Create a descriptive branch: `feature/your-feature-name`.
2. Ensure the project compiles and tests pass.
3. Include screenshots or GIFs if you are modifying the UI.
4. Link any related issues in the PR description.
