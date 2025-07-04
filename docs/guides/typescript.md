# TypeScript Setup Guide

This guide will walk you through setting up TypeScript in your projects, explaining the key configuration options and tools commonly used in modern TypeScript development. If you're already comfortable writing TypeScript code but need help with project setup, you're in the right place!

## Getting Started with TypeScript

### Installation

Before you can use TypeScript, you need to install it in your project:

```bash
# Create a new project (if you don't have one already)
mkdir my-typescript-project
cd my-typescript-project
npm init -y

# Install TypeScript and Node.js type definitions as dev dependencies
npm install --save-dev typescript @types/node
```

The `typescript` package gives you the TypeScript compiler (`tsc`), while `@types/node` provides type definitions for Node.js built-in modules.

### What is tsc?

`tsc` is the TypeScript Compiler. It serves two main purposes:

1. **Type Checking**: Validates your TypeScript code to catch errors before runtime
2. **Transpilation**: Converts TypeScript code to JavaScript that browsers or Node.js can execute

Common `tsc` commands:

```bash
# Initialize a TypeScript project (creates tsconfig.json)
npx tsc --init

# Type check without generating JavaScript files
npx tsc --noEmit

# Compile TypeScript to JavaScript
npx tsc

# Watch mode (recompile when files change)
npx tsc --watch
```

## Understanding tsconfig.json

The `tsconfig.json` file controls how TypeScript compiles your code. Here's a modern configuration explained line by line:

```json
{
  "compilerOptions": {
    "strict": true,                           /* Enables all strict type checking options */
    "target": "ESNext",                       /* Compiles to latest JavaScript features */
    "module": "ESNext",                       /* Uses modern ES modules syntax */
    "moduleResolution": "bundler",            /* Optimized for modern bundlers like Vite/webpack */
    "verbatimModuleSyntax": true,             /* Enforces explicit type imports for better tree-shaking */
    "forceConsistentCasingInFileNames": true, /* Ensures file name casing consistency across systems */
    "skipLibCheck": true,                     /* Speeds up compilation by skipping type checking of libraries */
    "noEmit": true,                           /* Doesn't generate JS files (useful when using bundlers) */
    "types": ["node"],                        /* Includes Node.js type definitions */
    "rootDir": ".",                           /* Specifies the root directory of input files */
    "outDir": "./dist",                       /* Specifies output directory for compiled files */
    "baseUrl": ".",                           /* Base directory to resolve non-relative module names */
    "paths": {                                /* Path mapping for module aliases */
      "@/*": ["src/*"]                        /* '@/file' will resolve to 'src/file' */
    }
  },
  "include": ["src/**/*", "tests/**/*"],      /* Files to include in compilation */
  "exclude": ["node_modules", "dist", "coverage"] /* Files to exclude from compilation */
}
```

### Multiple Configuration Files

Projects often use multiple TypeScript configuration files for different purposes:

#### Main Configuration (tsconfig.json)

The default configuration used for development.

#### Build Configuration (tsconfig.build.json)

Used specifically for production builds, typically with stricter settings:

```json
{
  "extends": "./tsconfig.json",           /* Inherits from base configuration */
  "compilerOptions": {
    "rootDir": "./src",                   /* Limits build to source files only */
  },
  "exclude": ["node_modules", "dist", "coverage", "tests"], /* Excludes test files */
  "include": ["src"]                      /* Only includes source files */
}
```

To use this configuration for type checking:

```json
// In package.json
"scripts": {
  "type-check": "tsc --noEmit --project tsconfig.build.json",
}
```

## Development Tools

### Running TypeScript Directly with TSX

For development, [tsx](https://tsx.is/) allows you to run TypeScript files directly without a separate compilation step:

```bash
# Install tsx
npm install --save-dev tsx
```

Add it to your `package.json` scripts:

```json
"scripts": {
  "dev": "tsx watch ./src/index.ts",
}
```

This lets you run and automatically reload your TypeScript code during development.

## Building Your TypeScript Project

Modern TypeScript projects typically use bundlers instead of `tsc` for production builds.

### For Frontend Applications: Vite

[Vite](https://vitejs.dev/) is a fast build tool for web applications:

```bash
npm install --save-dev vite
```

### For Libraries and Backend: tsup

[tsup](https://tsup.egoist.dev/) is a lightweight bundler built on esbuild, perfect for libraries and Node.js applications:

```bash
npm install --save-dev tsup
```

Create a `tsup.config.ts` file:

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  target: "node20",          /* Target Node.js version */
  entry: ["src/index.ts"],   /* Entry point files */
  outDir: "dist",            /* Output directory */
  format: ["esm", "cjs"],    /* Output both ES modules and CommonJS formats */
  sourcemap: true,           /* Generate source maps for debugging */
  clean: true,               /* Clean output directory before each build */
  dts: true,                 /* Generate declaration files (.d.ts) */
  splitting: true,           /* Code-split for better tree-shaking */
  treeshake: true,           /* Remove unused code */
  esbuildOptions(options) {
    options.alias = {
      "@": "./src",          /* Set up path aliases to match tsconfig */
    };
  },
});
```

Add it to your `package.json` scripts:

```json
"scripts": {
  "build": "tsup",
  "dev": "tsx watch ./src/index.ts",
  "type-check": "tsc --noEmit --project tsconfig.build.json"
}
```

## Putting It All Together

A typical modern TypeScript project workflow:

1. **Setup**: Install TypeScript and configure `tsconfig.json`
2. **Development**: Use `tsx` for quick development and testing
3. **Type Checking**: Use `tsc --noEmit` to verify type safety
4. **Building**: Use a bundler like `tsup` or `vite` for production builds

This approach gives you the best of both worlds: TypeScript's type safety during development and optimized builds for production.

## Why This Approach Works Well

1. **Development Speed**: Fast iteration with `tsx` without waiting for compilation
2. **Type Safety**: Catch errors early with TypeScript's type system
3. **Modern Output**: Generate optimal JavaScript for your target environment
4. **Bundle Optimization**: Smaller, faster code with tree-shaking and code splitting
5. **Path Aliases**: Cleaner imports with `@/` instead of messy relative paths