import { createThemeStore } from "@madooei/omni-themes";

// Create theme store
export const {
  themes,           // Available themes array
  $theme,           // Current theme atom
  $resolvedTheme,   // Resolved theme atom (handles 'system')
  $systemTheme,     // System preference atom
  setTheme,         // Function to change theme
} = createThemeStore({});