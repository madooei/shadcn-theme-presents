# Roadmap for Shadcn Theme Presets

This document outlines the roadmap for the Shadcn Theme Presets project, detailing its current status, future plans, and key decisions made during development.

## Project Overview

The Shadcn Theme Presets project provides a comprehensive theming solution for shadcn/ui components. It offers over 40 pre-built theme presets, a React provider for theme management, a theme selector component, and utilities for dynamic theme switching. The project demonstrates best practices for React theme management, TypeScript integration, and Tailwind CSS theming.

## Current Status

### What's Complete ✅

- **Theme Preset Collection**: 40+ pre-built theme presets with diverse color schemes
- **Theme Management System**: React provider and hooks for theme state management
- **Theme Selector Component**: Searchable dropdown interface for runtime theme switching
- **Theme Application Logic**: CSS custom properties-based theme application
- **TypeScript Support**: Full type definitions for theme presets and components
- **Build System**: tsup configuration for ESM/CJS dual builds with React JSX support
- **Testing Framework**: Vitest with React Testing Library for theme functionality
- **Peer Dependencies**: Proper React, React-DOM, and shadcn/ui peer dependency setup
- **Example Applications**: Working examples with basic and advanced theme integration
- **Documentation System**: Comprehensive usage guides and integration examples

### In Progress 🚧

- **Store Optimization**: Updating the store to be more like the store of omni-themes (reduce dependencies, allow user select local storage key, provide logging with simple-logging)
- **Type Safety Enhancement**: Implementing an enum for theme presets to provide autocomplete and compile-time type safety when selecting presets
- **Architecture Migration**: Transitioning from React context provider to nanostores for improved performance and state management
- **Testing Infrastructure**: Adding comprehensive unit tests for theme functionality, preset validation, and component behavior
- **Developer Documentation**: Creating detailed documentation for adding new theme presets, including guidelines and best practices

## Project Evolution

### Key Decisions Made

- **Theme Preset Focus**: Specialized for shadcn/ui theming vs generic React theming
- **CSS Custom Properties**: Runtime theme switching without page reloads
- **Tree-Shaking First**: Individual theme exports to minimize bundle impact
- **Peer Dependencies**: React and shadcn/ui as peer dependencies to avoid version conflicts
- **Nano Stores**: Lightweight state management for theme persistence
- **Runtime Validation**: Peer dependency checks to provide helpful error messages

### Learnings and Insights

- **Theme Switching Performance**: CSS custom properties enable instant theme changes
- **Peer Dependencies**: Essential for React libraries to prevent version mismatches
- **Theme Composition**: Modular theme structure allows for easy customization
- **Testing Requirements**: Theme components need specialized testing for color and state changes
- **Styling Strategy**: CSS custom properties provide better performance than CSS-in-JS

### Recent Changes

- Migrated from standard-version to release-it for better GitHub integration
- Added comprehensive peer dependency validation with runtime checks
- Enhanced tree-shaking with individual theme exports
- Improved TypeScript configuration for theme preset development
- Added Tailwind CSS v4 support alongside v3 examples
- Implemented proper React Testing Library setup with jsdom

## Technical Architecture

### Core Components

**ThemePresetProvider** (`src/providers/theme-provider.tsx`)

- Theme state management with React context
- CSS custom properties application
- Dark/light mode integration
- Theme persistence with localStorage

**ThemePresetSelector** (`src/components/theme-preset-selector.tsx`)

- Searchable dropdown interface
- Visual color preview for themes
- Random theme selection
- Keyboard navigation support

**Theme Application** (`src/apply-theme.ts`)

- CSS custom properties application
- Dark mode class management
- Theme validation and error handling
- Performance optimization

**Theme Presets** (`src/presets/`)

- 40+ pre-built theme presets
- Consistent color system structure
- CSS custom properties generation
- TypeScript type safety

### Current Capabilities

- **Theme Management**: Complete theme switching and persistence system
- **Bundle Optimization**: Tree-shaking friendly exports for minimal impact
- **Styling Integration**: Tailwind CSS with CSS custom properties
- **Peer Dependency Management**: Runtime validation and helpful error messages
- **Testing Infrastructure**: React Testing Library with theme-specific test utilities
- **Build Flexibility**: Multiple output formats for different consumption patterns
- **Development Experience**: Hot reloading, TypeScript checking, and linting

## TODOs

### Current TODO

- **Store Optimization**: Update the store to be more like the store of omni-themes
  - Reduce dependencies
  - Allow user to select local storage key
  - Provide logging with simple-logging

## Success Criteria

- ✅ Production-ready theme preset library
- ✅ Optimal bundle sizes with tree-shaking support
- ✅ Comprehensive TypeScript support for theme management
- ✅ Proper peer dependency management
- ✅ Testing infrastructure for theme functionality
- ✅ Tailwind CSS integration with CSS custom properties
- ✅ Development toolchain for theme development
- 🚧 Store optimization and dependency reduction

## Getting Involved

The Shadcn Theme Presets project welcomes contributions in these areas:

- **Store Optimization**: Improving the theme store implementation
- **Theme Development**: Creating new theme presets with consistent color systems
- **Accessibility**: Theme contrast validation and accessibility testing
- **Performance**: Theme switching optimization and bundle size reduction
- **Documentation**: Theme usage guides and integration examples
- **Testing**: Theme functionality testing patterns and utilities

The project maintains focus on shadcn/ui theming while following the portable package template philosophy, ensuring themes are reusable, well-documented, and performant.

## Theme Categories

### Current Theme Categories

- **Default Themes**: Standard shadcn/ui color schemes (blue, gray, green, etc.)
- **Specialized Themes**: Unique visual styles (cosmic-night, cyberpunk, retro-arcade)
- **Brand Themes**: Company and platform-inspired themes (supabase, twitter, t3-chat)
- **Color-Focused Themes**: Single-color emphasis themes (amber-minimal, quantum-rose)
- **Nature-Inspired Themes**: Natural color palettes (nature, kodama-grove, ocean-breeze)
- **Luxury Themes**: Premium and elegant themes (elegant-luxury, rose-gold)
- **Minimal Themes**: Clean and simple designs (modern-minimal, clean-slate)
