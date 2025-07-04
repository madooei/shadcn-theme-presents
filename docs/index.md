# Shadcn Theme Presets

This package allows you to import theme presets to customize shadcn/ui components. It also provides a React component to select among a set of presets at runtime.

> [!NOTE]
> Credit goes to [tweakcn](https://tweakcn.com/), a visual theme editor for shadcn/ui components with Tailwind CSS support. That project is open-source and this project is a derivite of it. All the presets available in this project are extracted from tweakcn.

**Features:**

- Written in TypeScript
- Builds to modern ES modules
- Provides TypeScript type definitions
- ESLint for code linting
- Prettier for code formatting
- Vitest for testing
- Tsup for building
- React component optimization with tree-shaking
- Tailwind CSS integration

## Installation

```bash
npm install @madooei/shadcn-theme-presets
```

**Peer Dependencies**: This package requires React, React DOM, and Tailwind CSS as peer dependencies:

```bash
npm install react react-dom tailwindcss
```

## Usage

The `@madooei/shadcn-theme-presets` package provides a comprehensive theming solution for shadcn/ui components. It includes a provider for theme management, a selector component for runtime theme switching, and a collection of pre-built theme presets.

### Basic Setup

Wrap your application with the `ThemePresetProvider` to enable theme functionality:

```tsx
import { ThemePresetProvider } from "@madooei/shadcn-theme-presets";

function App() {
  return (
    <ThemePresetProvider isDark={false} defaultPreset="perpetuity">
      <YourApp />
    </ThemePresetProvider>
  );
}
```

### Advanced Setup with Theme Toggle

For applications that need both theme presets and dark/light mode switching, you can integrate with external theme management:

```tsx
import { useStore } from "@nanostores/react";
import { ThemePresetProvider } from "@madooei/shadcn-theme-presets";
import { $resolvedTheme } from "./lib/theme-store";

function App() {
  const resolvedTheme = useStore($resolvedTheme);

  return (
    <ThemePresetProvider
      isDark={resolvedTheme === "dark"}
      defaultPreset="default-neutral"
    >
      <YourApp />
    </ThemePresetProvider>
  );
}
```

## Components

### ThemePresetProvider

The main provider component that manages theme state and applies themes to your application.

**Props:**

- `children: ReactNode` - Your application components
- `isDark: boolean` - External theme mode (true for dark, false for light)
- `defaultPreset?: string` - Initial theme preset to use (optional)

**Example:**

```tsx
<ThemePresetProvider isDark={false} defaultPreset="perpetuity">
  <YourApp />
</ThemePresetProvider>
```

### ThemePresetSelector

A pre-built component that provides a searchable dropdown interface for selecting theme presets at runtime.

**Features:**

- Search functionality to filter themes
- Visual color preview for each theme
- Random theme selection
- "New" badge for recently added themes
- Keyboard navigation support

**Example:**

```tsx
import { ThemePresetSelector } from "@madooei/shadcn-theme-presets";

function Header() {
  return (
    <header>
      <ThemePresetSelector />
    </header>
  );
}
```

## Hooks

### useThemePreset

A React hook that provides access to the current theme state and functions to modify it.

**Returns:**

- `preset: string` - Current theme preset name
- `setPreset: (preset: string) => void` - Function to change the theme preset
- `presets: Record<string, ThemePreset>` - All available theme presets
- `themeState: ThemeState` - Current theme state object

**Example:**

```tsx
import { useThemePreset } from "@madooei/shadcn-theme-presets";

function MyComponent() {
  const { preset, setPreset, presets } = useThemePreset();

  return (
    <div>
      <p>Current theme: {preset}</p>
      <button onClick={() => setPreset("perpetuity")}>
        Switch to Perpetuity
      </button>
    </div>
  );
}
```

## Available Theme Presets

The package includes over 40 pre-built theme presets, including:

- **Default themes**: `default-blue`, `default-gray`, `default-green`, `default-neutral`, `default-orange`, `default-red`, `default-rose`, `default-slate`, `default-stone`, `default-violet`, `default-yellow`, `default-zinc`
- **Specialized themes**: `perpetuity`, `cosmic-night`, `cyberpunk`, `retro-arcade`, `elegant-luxury`, `modern-minimal`
- **Brand themes**: `supabase`, `twitter`, `t3-chat`
- **Color-focused themes**: `amber-minimal`, `amethyst-haze`, `bold-tech`, `bubblegum`, `caffeine`, `candyland`, `catppuccin`, `quantum-rose`, `rose-gold`, `tangerine`
- **Nature-inspired themes**: `nature`, `kodama-grove`, `northern-lights`, `ocean-breeze`, `sunset-horizon`
- **And many more...**

You can import individual presets or use the `allPresets` object:

```tsx
import { perpetuity, allPresets } from "@madooei/shadcn-theme-presets";

// Use a specific preset
console.log(perpetuity);

// Access all presets
console.log(Object.keys(allPresets));
```

## Integration Examples

### Basic Integration

For simple applications that just need theme presets:

```tsx
import { ThemePresetProvider } from "@madooei/shadcn-theme-presets";

function App() {
  return (
    <ThemePresetProvider isDark={false} defaultPreset="perpetuity">
      <CardsDemoPage />
    </ThemePresetProvider>
  );
}
```

### Advanced Integration with Theme Toggle

For applications that need both theme presets and dark/light mode switching:

```tsx
import { useStore } from "@nanostores/react";
import { ThemePresetProvider } from "@madooei/shadcn-theme-presets";
import { TooltipProvider } from "@madooei/shadcn-all-in-one/tooltip";
import { $resolvedTheme } from "./lib/theme-store";

function App() {
  const resolvedTheme = useStore($resolvedTheme);

  return (
    <ThemePresetProvider
      isDark={resolvedTheme === "dark"}
      defaultPreset="default-neutral"
    >
      <TooltipProvider>
        <Header />
        <CardsDemoPage />
      </TooltipProvider>
    </ThemePresetProvider>
  );
}
```

The library automatically applies theme styles to the document root element, ensuring that all shadcn/ui components within the provider will use the selected theme colors.

### Styling

This package **requires Tailwind CSS** for styling. Components use Tailwind utility classes and will not display correctly without Tailwind CSS properly configured in your project.

Configure your `tailwind.config.js` to include the component library:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include the component library so Tailwind finds its classes
    "./node_modules/@madooei/shadcn-all-in-one/dist/**/*.{js,cjs}",
    "./node_modules/@madooei/shadcn-theme-presets/dist/**/*.{js,cjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Cloning the Repository

To make your workflow more organized, it's a good idea to clone this repository into a directory named `react-package-workspace`. This helps differentiate the workspace from the `shadcn-theme-presets` located in the `packages` directory.

```bash
git clone https://github.com/madooei/shadcn-theme-presets shadcn-theme-presets-workspace

cd shadcn-theme-presets-workspace
```

## Repository Structure

- `packages` — Contains the primary package(s) for this repository (e.g., `shadcn-theme-presets`). Each package is self-contained and can be copied out and used independently.
- `examples` — Contains examples of how to use the packages. Each example is a minimal, standalone project.
- `playgrounds` — Contains demos of the dependencies of the primary package(s). Each playground is a minimal, standalone project.
- `docs` — Contains various documentation for users and developers.
- `.github` — Contains GitHub-specific files, such as workflows and issue templates.

## How to Use This Repo

- To work on a package, go to `packages/<package-name>` and follow its README.
- To try an example, go to `examples/<example-name>` and follow its README.
- To run the playground, go to `playground/<package-name>` and follow its README.
- For documentation, see the `docs` folder.

### Using a VSCode Multi-root Workspace

With Visual Studio Code, you can enhance your development experience by using a multi-root workspace to access packages, examples, and playgrounds simultaneously. This approach is more efficient than opening the root directory, or each package or example separately.

To set up a multi-root workspace:

1. Open Visual Studio Code.
2. Navigate to `File > Open Workspace from File...`.
3. Select the `shadcn-theme-presets.code-workspace` file located at the root of the repository. This action will open all specified folders in one workspace.

The `shadcn-theme-presets.code-workspace` file can be customized to include different folders or settings. Here's a typical configuration:

```json
{
  "folders": [
    {
      "path": "packages/shadcn-theme-presets"
    },
    {
      "path": "examples/basic"
    }
  ],
  "settings": {
    // Add any workspace-specific settings here, for example:
    "git.openRepositoryInParentFolders": "always"
  }
}
```

## Developing the Package

Change to the package directory and install dependencies:

```bash
cd packages/shadcn-theme-presets
npm install
```

- Read the [Project Roadmap](../../docs/ROADMAP.md) for project goals, status, evolution, and development guidelines.
- Read the [Development Guide](../../docs/DEVELOPMENT.md) for detailed information on the package architecture, build configuration, and implementation patterns.
- Follow the [Contributing Guide](../../docs/CONTRIBUTING.md) for contribution guidelines, coding standards, and best practices.

## Package Management

When you are ready to publish your package:

```bash
npm run release
```

This single command will:

- Validate your code with the full validation pipeline
- Analyze commits to determine version bump
- Update package.json version and changelog
- Build the package
- Create and push git tag
- Create GitHub release
- Publish to NPM

> [!TIP]
> For detailed information about package publishing, versioning, and local development workflows, see the [NPM Package Management Guide](../../docs/guides/npm-package.md).
