import { persistentAtom } from "@nanostores/persistent";
import { defaultPresets, getDefaultPresetKey } from "@/theme-presets";
import type { ThemePreset } from "@/types/theme-types";

const DEBUG = false; // Can be toggled for debugging

const storageKey = "app-theme-preset";

// Helper to get the initial preset value
// It will check localStorage first (handled by persistentAtom)
// Then, if no prop is passed to ThemeProvider later, it falls back to the first default preset.
const initialPresetKey = getDefaultPresetKey();

// Persistent atom for the theme preset
// The initial value here is a fallback if localStorage is empty.
// ThemeProvider will have a chance to override this with its defaultPreset prop if needed.
export const $themePreset = persistentAtom<string>(
  storageKey,
  initialPresetKey,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

// Function to set the theme preset
export function setThemePreset(newPresetKey: string) {
  if (defaultPresets[newPresetKey]) {
    $themePreset.set(newPresetKey);
  } else {
    if (DEBUG) {
      console.warn(
        `Attempted to set invalid theme preset: ${newPresetKey}. Available presets:`,
        Object.keys(defaultPresets),
      );
    }
  }
}

// Function to get the actual theme preset object
export function getActivePreset(): ThemePreset {
  const currentPresetKey = $themePreset.get();
  return defaultPresets[currentPresetKey] || defaultPresets[initialPresetKey];
}

// Log changes in debug mode
if (DEBUG) {
  import("@nanostores/logger").then(({ logger }) => {
    logger({ $themePreset });
  });
}

// Export available presets for components that might need them (e.g., selectors)
export { defaultPresets };
