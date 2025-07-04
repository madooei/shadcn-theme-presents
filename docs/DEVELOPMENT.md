# Development Guide

This document provides technical details for developers working on the shadcn-theme-presets project, including build architecture, development workflows, and theme-specific implementation patterns.

## Build Architecture

### TypeScript Configuration

**Multiple TypeScript Configurations:**

- `tsconfig.json` - Development configuration with all files included
- React JSX support with `"jsx": "react-jsx"` for modern JSX transform

**Key Settings:**

- Target: `ESNext` for modern JavaScript features
- Module: `ESNext` for ES modules
- JSX: `react-jsx` for automatic JSX runtime
- Strict mode enabled for type safety
- React types included

> [!TIP]
> For detailed information about TypeScript setup, see the [TypeScript Setup Guide](../../docs/guides/typescript.md).

### Build System (tsup)

**Why tsup for theme presets:**

- Fast builds with esbuild under the hood
- Dual format output (ESM + CJS) without complex configuration
- React JSX preservation for optimal compatibility
- Automatic declaration file generation
- Built-in code splitting and tree-shaking

**Configuration (`tsup.config.ts`):**

```typescript
export default defineConfig({
  entry: ["src/index.ts"], // Main entry point for theme presets
  format: ["esm", "cjs"], // Dual module format
  dts: true, // Generate .d.ts files
  jsx: "preserve", // Preserve JSX for React compatibility
  external: ["react", "react-dom", "@madooei/shadcn-all-in-one"], // Don't bundle peer dependencies
  sourcemap: true, // Source maps for debugging
  clean: true, // Clean output before build
  splitting: true, // Code splitting for better tree-shaking
  treeshake: true, // Remove unused code
});
```

### Module Format Strategy

**Dual ESM/CJS Support for Theme Presets:**

- Modern bundlers use ESM (`module` field)
- Legacy tools use CJS (`main` field)
- Individual theme preset exports for tree-shaking

**package.json Configuration:**

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  }
}
```

## Theme Preset Architecture

### Theme Structure

**Theme Preset Pattern:**

```typescript
export interface ThemePreset {
  name: string;
  colors: {
    background: string;
    foreground: string;
    // ... other color definitions
  };
  cssVars: Record<string, string>;
}
```

### Peer Dependencies Strategy

**Why Peer Dependencies for Theme Presets:**

- Prevents React version conflicts
- Allows host app to control React and shadcn/ui versions
- Reduces bundle size by not duplicating dependencies

**Current Peer Dependencies:**

```json
{
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0",
    "@madooei/shadcn-all-in-one": ">=0.2.1",
    "tailwindcss": ">=4.0.0"
  }
}
```

### Tree-Shaking Optimization

**Individual Theme Exports:**

- Each theme preset is exported individually
- Consumers can import specific themes: `import { perpetuity } from '@madooei/shadcn-theme-presets'`
- Reduces bundle size for apps using only some themes

## Testing Strategy

### React Testing Library Configuration

**Why React Testing Library:**

- Focuses on testing user interactions rather than implementation details
- Better integration with React components
- Simulates real user behavior

**Key Features Configured:**

- jsdom environment for DOM simulation
- React Testing Library utilities
- Component rendering helpers
- User interaction testing

**Test Patterns:**

- Theme preset validation tests
- Theme switching functionality tests
- Component rendering with different themes
- Accessibility testing with theme changes

### Testing Setup

**Vitest Configuration for Theme Presets:**

```typescript
// vitest.config.ts
export default defineConfig({
  environment: "jsdom", // DOM simulation for React
  setupFiles: ["./tests/setup.ts"], // React Testing Library setup
  test: {
    globals: true, // No need to import test functions
  },
});
```

**Test Setup File:**

```typescript
// tests/setup.ts
import "@testing-library/jest-dom"; // Additional matchers
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup(); // Clean up after each test
});
```

## Development Workflow

### Theme Development Mode

**The `npm run dev` Command:**

- Runs tsx in watch mode
- Hot reloads theme components
- TypeScript compilation on save
- Instant feedback for theme changes

### Validation Pipeline for Theme Presets

**The `npm run validate` Command:**

1. **Type checking** - `tsc --noEmit` (includes React JSX validation)
2. **Linting with auto-fix** - `eslint --fix` (includes React rules)
3. **Formatting with auto-fix** - `prettier --write .`
4. **Testing** - `vitest run` (includes theme preset tests)

### Theme-Specific Scripts

**Theme Development:**

- `npm run dev` - Watch mode for theme development
- `npm run build` - Build theme presets for distribution
- `npm run test` - Run theme preset tests
- `npm run test:watch` - Watch mode for test development

## Key Theme Implementation Patterns

### Theme Preset Pattern

**TypeScript Interface with Theme Structure:**

```typescript
export interface ThemePreset {
  name: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    chart: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
  cssVars: Record<string, string>;
}
```

### Runtime Validation for Theme Presets

**Peer Dependency Validation:**

```typescript
// src/utils/peer-deps.ts
export const validateThemeDependencies = () => {
  if (typeof React === "undefined") {
    throw new Error(
      "React is required but not found. Please install react as a peer dependency."
    );
  }
  if (typeof window !== "undefined" && !window.document) {
    throw new Error(
      "This package requires a browser environment to apply themes."
    );
  }
};
```

### Theme Application with Tailwind CSS

**Theme Application Pattern:**

```typescript
export const applyTheme = (preset: ThemePreset, isDark: boolean = false) => {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  Object.entries(preset.cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  // Apply dark mode class if needed
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};
```

## Code Quality Setup

### ESLint Configuration for Theme Presets

**Rules Applied:**

- TypeScript ESLint recommended rules
- React ESLint plugin for React-specific rules
- React Hooks rules for proper hooks usage
- JSX accessibility rules
- Prettier integration to avoid conflicts

### Theme Testing Patterns

**Theme Testing Strategy:**

```typescript
import { render, screen } from "@testing-library/react";
import { ThemePresetProvider } from "../src/providers/theme-provider";

describe("ThemePresetProvider", () => {
  it("applies theme correctly", () => {
    render(
      <ThemePresetProvider isDark={false} defaultPreset="perpetuity">
        <div data-testid="test-component">Test</div>
      </ThemePresetProvider>
    );
    
    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });

  it("switches themes when preset changes", () => {
    // Test theme switching functionality
  });
});
```

## File Organization

### Theme Preset Structure

```plaintext
src/
├── index.ts              # Main exports and public API
├── theme-presets.ts      # Default presets configuration
├── apply-theme.ts        # Theme application logic
├── components/
│   └── theme-preset-selector.tsx  # Theme selector component
├── hooks/
│   └── use-theme-preset.ts        # Theme management hook
├── providers/
│   └── theme-provider.tsx         # Theme provider component
├── stores/
│   └── theme-preset-store.ts      # Theme state management
├── types/
│   └── theme-types.ts             # Type definitions
└── presets/
    ├── index.ts                   # All presets export
    ├── perpetuity.ts              # Individual theme presets
    ├── cosmic-night.ts
    └── ...                        # Other theme presets
```

### Test Structure

```plaintext
tests/
├── setup.ts              # React Testing Library setup
└── index.test.tsx        # Comprehensive theme tests
```

## Technical Decisions

### Why These Tools for Theme Presets?

**tsup over webpack/rollup:** Simpler configuration, faster builds, better TypeScript integration

**React Testing Library over Enzyme:** Modern testing approach, better accessibility testing

**Tailwind CSS:** Utility-first styling, excellent tree-shaking, design system consistency

**Peer Dependencies:** Prevents React version conflicts, reduces bundle size

### Theme Development Philosophy

1. **Theme Reusability:** Design themes that work across different shadcn/ui configurations
2. **Accessibility First:** Ensure themes maintain proper contrast ratios and readability
3. **Bundle Optimization:** Minimize impact on host application bundle size
4. **TypeScript Safety:** Leverage TypeScript for better developer experience
5. **Testing Theme Behavior:** Test theme application and switching functionality

### Theme-Specific Considerations

**CSS Custom Properties:** Themes use CSS custom properties for dynamic theming, allowing runtime theme switching without page reloads.

**Peer Dependency Range:** Support React 19+ and shadcn/ui components while allowing newer versions for host applications.

**Styling Strategy:** Tailwind CSS provides consistent styling while allowing customization through theme presets and CSS custom properties.
