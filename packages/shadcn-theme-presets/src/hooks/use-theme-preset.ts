import { useContext } from "react";
import { ThemePresetContext } from "@/contexts/theme-context";

// Hook to use the theme preset context
export function useThemePreset() {
  const context = useContext(ThemePresetContext);

  if (context === undefined) {
    throw new Error("useThemePreset must be used within a ThemePresetProvider");
  }

  return context;
}
