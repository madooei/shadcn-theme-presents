import type {
  ThemeState,
  ThemeStyleProps,
  ThemeStyles,
} from "@/types/theme-types";

// Convert color to HSL format
export function colorToHsl(color: string): string {
  // Simple RGB to HSL conversion for hex colors
  if (color.startsWith("#")) {
    // Convert hex to rgb
    let r = 0,
      g = 0,
      b = 0;

    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    }

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h} ${s}% ${l}%)`;
  }

  // If it's already in HSL format or other format, return as is
  return color;
}

// Common non-color CSS variables
const COMMON_STYLES = [
  "font-sans",
  "font-serif",
  "font-mono",
  "radius",
  "shadow-opacity",
  "shadow-blur",
  "shadow-spread",
  "shadow-offset-x",
  "shadow-offset-y",
  "letter-spacing",
  "spacing",
] as const;

// Type for common style keys
type CommonStyleKey = (typeof COMMON_STYLES)[number];

// Update the class on the root element
function updateThemeClass(root: HTMLElement, mode: "light" | "dark"): void {
  if (mode === "light") {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }
}

// Apply CSS variables to an element
function applyStyleToElement(
  element: HTMLElement,
  key: string,
  value: string,
): void {
  element.style.setProperty(`--${key}`, value);
}

// Apply common styles (fonts, radius, etc.)
function applyCommonStyles(
  root: HTMLElement,
  themeStyles: ThemeStyleProps,
): void {
  Object.entries(themeStyles)
    .filter(([key]) => COMMON_STYLES.includes(key as CommonStyleKey))
    .forEach(([key, value]) => {
      if (typeof value === "string") {
        applyStyleToElement(root, key, value);
      }
    });
}

// Apply theme colors
function applyThemeColors(
  root: HTMLElement,
  themeStyles: ThemeStyles,
  mode: "light" | "dark",
): void {
  Object.entries(themeStyles[mode]).forEach(([key, value]) => {
    if (
      typeof value === "string" &&
      !COMMON_STYLES.includes(key as CommonStyleKey)
    ) {
      const hslValue = colorToHsl(value);
      applyStyleToElement(root, key, hslValue);
    }
  });
}

// Main function to apply theme to an element
export function applyThemeToElement(
  themeState: ThemeState,
  rootElement: HTMLElement,
): void {
  const { currentMode: mode, styles: themeStyles } = themeState;

  if (!rootElement) return;

  updateThemeClass(rootElement, mode);
  // Apply common styles based on the 'light' mode definition
  applyCommonStyles(rootElement, themeStyles.light);
  // Apply mode-specific colors
  applyThemeColors(rootElement, themeStyles, mode);
}
