import { type ReactNode, useEffect, useMemo } from "react";
import type { ThemeState } from "@/types/theme-types";
import {
  getPresetThemeStyles,
  defaultPresets,
  getDefaultPresetKey,
} from "@/theme-presets";
import { applyThemeToElement } from "@/apply-theme";
import {
  ThemePresetContext,
  type ThemePresetContextValue,
} from "@/contexts/theme-context";
import { useStore } from "@nanostores/react";
import {
  $themePreset,
  setThemePreset as setStorePreset,
} from "@/stores/theme-preset-store";

interface ThemePresetProviderProps {
  children: ReactNode;
  isDark: boolean; // External theme mode - true for dark, false for light
  defaultPreset?: string;
}

export function ThemePresetProvider({
  children,
  isDark,
  defaultPreset,
}: ThemePresetProviderProps) {
  const currentPresetKey = useStore($themePreset);

  // Initialize default preset if provided
  useEffect(() => {
    if (defaultPreset) {
      const currentPreset = $themePreset.get();
      const fallbackPresetKey = getDefaultPresetKey();

      // Only set the defaultPreset if the current preset is still the fallback first preset
      // This allows users to override the default while preserving user selections
      if (currentPreset === fallbackPresetKey) {
        if (defaultPresets[defaultPreset]) {
          setStorePreset(defaultPreset);
        } else {
          console.warn(
            `ThemePresetProvider: defaultPreset "${defaultPreset}" is not a valid preset key. Available presets:`,
            Object.keys(defaultPresets),
          );
        }
      }
    }
  }, [defaultPreset]);

  // Create theme state based on external theme mode
  const themeState: ThemeState = useMemo(
    () => ({
      preset: currentPresetKey,
      styles: getPresetThemeStyles(currentPresetKey, defaultPresets),
      currentMode: isDark ? "dark" : "light",
    }),
    [currentPresetKey, isDark],
  );

  const setPreset = (newPreset: string) => {
    setStorePreset(newPreset);
  };

  // Apply theme to DOM when theme state changes
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    applyThemeToElement(themeState, root);
  }, [themeState]);

  const value: ThemePresetContextValue = {
    preset: currentPresetKey,
    setPreset,
    presets: defaultPresets,
    themeState,
  };

  return (
    <ThemePresetContext.Provider value={value}>
      {children}
    </ThemePresetContext.Provider>
  );
}
