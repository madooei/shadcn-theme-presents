import { useStore } from "@nanostores/react";
import CardsDemoPage from "./pages/cards-demo-page";
import { $resolvedTheme } from "./lib/theme-store";
import { ThemePresetProvider } from "@madooei/shadcn-theme-presets";
import { TooltipProvider } from "@madooei/shadcn-all-in-one/tooltip";
import { Header } from "./components/header";

function App() {
  const resolvedTheme = useStore($resolvedTheme);

  return (
    <ThemePresetProvider
      isDark={resolvedTheme === "dark"}
      defaultPreset="default-neutral"
    >
      <TooltipProvider>
        <Header />
        <CardsDemoPage />
      </TooltipProvider>
    </ThemePresetProvider>
  );
}

export default App;
