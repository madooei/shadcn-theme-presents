import type { ThemePreset } from "@/types/theme-types";

import { amberMinimal } from "./amber-minimal";
import { amethystHaze } from "./amethyst-haze";
import { boldTech } from "./bold-tech";
import { bubblegum } from "./bubblegum";
import { caffeine } from "./caffeine";
import { candyland } from "./candyland";
import { catppuccin } from "./catppuccin";
import { cleanSlate } from "./clean-slate";
import { cosmicNight } from "./cosmic-night";
import { cyberpunk } from "./cyberpunk";
import { defaultBlue } from "./default-blue";
import { defaultGray } from "./default-gray";
import { defaultGreen } from "./default-green";
import { defaultNeutral } from "./default-neutral";
import { defaultOrange } from "./default-orange";
import { defaultRed } from "./default-red";
import { defaultRose } from "./default-rose";
import { defaultSlate } from "./default-slate";
import { defaultStone } from "./default-stone";
import { defaultViolet } from "./default-violet";
import { defaultYellow } from "./default-yellow";
import { defaultZinc } from "./default-zinc";
import { doom64 } from "./doom-64";
import { elegantLuxury } from "./elegant-luxury";
import { graphite } from "./graphite";
import { kodamaGrove } from "./kodama-grove";
import { midnightBloom } from "./midnight-bloom";
import { mochaMousse } from "./mocha-mousse";
import { modernMinimal } from "./modern-minimal";
import { nature } from "./nature";
import { newYork } from "./new-york";
import { neoBrutalism } from "./neo-brutalism";
import { northernLights } from "./northern-lights";
import { notebook } from "./notebook";
import { oceanBreeze } from "./ocean-breeze";
import { pastelDreams } from "./pastel-dreams";
import { perpetuity } from "./perpetuity";
import { quantumRose } from "./quantum-rose";
import { retroArcade } from "./retro-arcade";
import { roseGold } from "./rose-gold";
import { solarDusk } from "./solar-dusk";
import { sunsetHorizon } from "./sunset-horizon";
import { supabase } from "./supabase";
import { t3Chat } from "./t3-chat";
import { tangerine } from "./tangerine";
import { twitter } from "./twitter";
import { vintagePaper } from "./vintage-paper";

// Export all individual presets for direct access
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
  northernLights,
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
};

// Export a combined record of all presets
export const allPresets: Record<string, ThemePreset> = {
  "amber-minimal": amberMinimal,
  "amethyst-haze": amethystHaze,
  "bold-tech": boldTech,
  bubblegum: bubblegum,
  caffeine: caffeine,
  candyland: candyland,
  catppuccin: catppuccin,
  "clean-slate": cleanSlate,
  "cosmic-night": cosmicNight,
  cyberpunk: cyberpunk,
  "default-blue": defaultBlue,
  "default-gray": defaultGray,
  "default-green": defaultGreen,
  "default-neutral": defaultNeutral,
  "default-orange": defaultOrange,
  "default-red": defaultRed,
  "default-rose": defaultRose,
  "default-slate": defaultSlate,
  "default-stone": defaultStone,
  "default-violet": defaultViolet,
  "default-yellow": defaultYellow,
  "default-zinc": defaultZinc,
  "doom-64": doom64,
  "elegant-luxury": elegantLuxury,
  graphite: graphite,
  "kodama-grove": kodamaGrove,
  "midnight-bloom": midnightBloom,
  "mocha-mousse": mochaMousse,
  "modern-minimal": modernMinimal,
  nature: nature,
  "new-york": newYork,
  "neo-brutalism": neoBrutalism,
  "northern-lights": northernLights,
  notebook: notebook,
  "ocean-breeze": oceanBreeze,
  "pastel-dreams": pastelDreams,
  perpetuity: perpetuity,
  "quantum-rose": quantumRose,
  "retro-arcade": retroArcade,
  "rose-gold": roseGold,
  "solar-dusk": solarDusk,
  "sunset-horizon": sunsetHorizon,
  supabase: supabase,
  "t3-chat": t3Chat,
  tangerine: tangerine,
  twitter: twitter,
  "vintage-paper": vintagePaper,
  // Add more presets as needed
};
