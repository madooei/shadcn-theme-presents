// Export your React components here
export { default as ThemePresetSelector } from "@/components/theme-preset-selector";

// Export theme preset functionality
export { ThemePresetProvider } from "@/providers/theme-provider";
export { useThemePreset } from "@/hooks/use-theme-preset";

// Export theme presets
export { defaultPresets } from "./theme-presets";
export {
  amberMinimal,
  amethystHaze,
  boldTech,
  bubblegum,
  caffeine,
  candyland,
  catppuccin,
  cleanSlate,
  cosmicNight,
  cyberpunk,
  defaultBlue,
  defaultGray,
  defaultGreen,
  defaultNeutral,
  defaultOrange,
  defaultRed,
  defaultRose,
  defaultSlate,
  defaultStone,
  defaultViolet,
  defaultYellow,
  defaultZinc,
  doom64,
  elegantLuxury,
  graphite,
  kodamaGrove,
  midnightBloom,
  mochaMousse,
  modernMinimal,
  nature,
  newYork,
  neoBrutalism,
  notebook,
  oceanBreeze,
  pastelDreams,
  perpetuity,
  quantumRose,
  retroArcade,
  roseGold,
  solarDusk,
  sunsetHorizon,
  supabase,
  t3Chat,
  tangerine,
  twitter,
  vintagePaper,
  allPresets,
} from "./presets";

// Export all types defined in `types/theme-types` for TypeScript users
export * from "./types/theme-types";
