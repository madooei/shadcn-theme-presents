import { createContext, useContext } from "react";
import type { ThemePreset, ThemeState } from "@/types/theme-types";

export interface ThemePresetContextValue {
  preset: string; // The key of the current preset
  setPreset: (preset: string) => void;
  presets: Record<string, ThemePreset>; // All available presets
  themeState: ThemeState; // Includes resolvedMode, presetKey, and styles
}

export const ThemePresetContext = createContext<
  ThemePresetContextValue | undefined
>(undefined);

export const useThemePresetContext = () => {
  const context = useContext(ThemePresetContext);
  if (!context) {
    throw new Error(
      "useThemePresetContext must be used within a ThemePresetProvider",
    );
  }
  return context;
};
