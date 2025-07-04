import type { ThemePreset } from "@/types/theme-types";
import { allPresets } from "./presets";

// Export the presets
export const defaultPresets: Record<string, ThemePreset> = allPresets;

// Function to get the first preset key (for default)
export function getDefaultPresetKey(): string {
  return Object.keys(defaultPresets)[0];
}

// Get preset theme styles - fallback to first preset if the requested preset doesn't exist
export function getPresetThemeStyles(
  name: string,
  presets: Record<string, ThemePreset>,
): ThemePreset["styles"] {
  // If the requested preset doesn't exist, use the first preset as default
  if (!presets[name]) {
    const defaultKey = getDefaultPresetKey();
    return presets[defaultKey].styles;
  }

  return presets[name].styles;
}
