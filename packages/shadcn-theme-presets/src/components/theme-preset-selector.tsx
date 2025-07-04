import React, { useCallback, useMemo, useState } from "react";
import { Check, PaletteIcon, Search, Shuffle } from "lucide-react";

import { useThemePreset } from "@/hooks/use-theme-preset";
import { Badge } from "@madooei/shadcn-all-in-one/badge";
import { Button } from "@madooei/shadcn-all-in-one/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@madooei/shadcn-all-in-one/command";
import { Input } from "@madooei/shadcn-all-in-one/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@madooei/shadcn-all-in-one/popover";
import { ScrollArea } from "@madooei/shadcn-all-in-one/scroll-area";
import { Separator } from "@madooei/shadcn-all-in-one/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@madooei/shadcn-all-in-one/tooltip";
import { TooltipButton } from "@madooei/shadcn-all-in-one/tooltip-button";
import { cn } from "@madooei/shadcn-all-in-one/utils";

// Convert interface to type alias
type ThemePresetSelectorProps = React.ComponentProps<typeof Button>;

interface ColorBoxProps {
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color }) => (
  <div
    className="border-muted h-3 w-3 rounded-sm border"
    style={{ backgroundColor: color }}
  />
);

interface ThemeColorsProps {
  presetName: string;
}

const ThemeColors: React.FC<ThemeColorsProps> = ({ presetName }) => {
  const { themeState, presets } = useThemePreset();
  const resolvedMode = themeState.currentMode;
  const styles =
    presets[presetName]?.styles[resolvedMode] ||
    themeState.styles[resolvedMode];

  return (
    <div className="flex gap-0.5">
      <ColorBox color={styles.primary} />
      <ColorBox color={styles.accent} />
      <ColorBox color={styles.secondary} />
      <ColorBox color={styles.border} />
    </div>
  );
};

const isThemeNew = (createdAt?: string) => {
  if (!createdAt) return false;
  const createdDate = new Date(createdAt);
  const timePeriod = new Date();
  timePeriod.setDate(timePeriod.getDate() - 5);
  return createdDate > timePeriod;
};

const ThemeControls = () => {
  const { presets, setPreset } = useThemePreset();
  const presetNames = useMemo(() => Object.keys(presets), [presets]);

  const randomize = useCallback(() => {
    const random = Math.floor(Math.random() * presetNames.length);
    setPreset(presetNames[random]);
  }, [presetNames, setPreset]);

  return (
    <div className="flex gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={randomize}
          >
            <Shuffle className="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs">Random theme</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const ThemePresetSelector: React.FC<ThemePresetSelectorProps> = ({
  className,
  ...props
}) => {
  const { preset, setPreset, presets } = useThemePreset();
  const currentPreset = preset;
  const [search, setSearch] = useState("");

  const presetNames = useMemo(() => Object.keys(presets), [presets]);

  const filteredPresets = useMemo(() => {
    const filteredList =
      search.trim() === ""
        ? presetNames
        : Object.entries(presets)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, presetDef]) =>
              presetDef.label?.toLowerCase().includes(search.toLowerCase()),
            )
            .map(([name]) => name);

    return filteredList.sort((a, b) => {
      const labelA = presets[a]?.label || a;
      const labelB = presets[b]?.label || b;
      return labelA.localeCompare(labelB);
    });
  }, [presetNames, search, presets]);

  return (
    <div className={cn("flex w-full items-center", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <TooltipButton
            variant="ghost"
            size="icon"
            className="w-7 h-7 flex-shrink-0"
            tooltipContent="Toggle theme preset"
            {...props}
          >
            <PaletteIcon />
          </TooltipButton>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="center">
          <Command className="h-100 w-full rounded-lg border shadow-md">
            <div className="flex w-full items-center">
              <div className="flex w-full items-center border-b p-1">
                <Search className="size-4 shrink-0 opacity-50 ml-2 mr-3" />
                <Input
                  placeholder="Search themes..."
                  className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pl-3 pr-1 py-2">
              <div className="text-muted-foreground text-xs">
                {filteredPresets.length} theme
                {filteredPresets.length !== 1 ? "s" : ""}
              </div>
              <ThemeControls />
            </div>
            <Separator />
            <ScrollArea className="h-[500px] max-h-[70vh]">
              <CommandEmpty>No themes found.</CommandEmpty>
              <CommandGroup heading="Themes" className="mb-4">
                {filteredPresets.map((presetName, index) => (
                  <CommandItem
                    key={`${presetName}-${index}`}
                    value={`${presetName}-${index}`}
                    onSelect={() => {
                      setPreset(presetName);
                      setSearch("");
                    }}
                    className="data-[highlighted]:bg-secondary/50 flex items-center gap-2 py-2"
                  >
                    <ThemeColors presetName={presetName} />
                    <div className="flex flex-1 items-center gap-2">
                      <span className="text-sm font-medium capitalize">
                        {presets[presetName]?.label || presetName}
                      </span>
                      {presets[presetName]?.createdAt &&
                        isThemeNew(presets[presetName]?.createdAt) && (
                          <Badge
                            variant="secondary"
                            className="rounded-full text-xs"
                          >
                            New
                          </Badge>
                        )}
                    </div>
                    {presetName === currentPreset && (
                      <Check className="h-4 w-4 shrink-0 opacity-70" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemePresetSelector;
