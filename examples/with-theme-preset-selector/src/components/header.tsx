import { ThemeToggle } from "./theme-toggle";
import { ThemePresetSelector } from "@madooei/shadcn-theme-presets";

export function Header() {
  return (
    <header className="border-b bg-background/40 backdrop-blur px-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <p className="font-bold">Theme Presets Demo</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemePresetSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
