import { ThemePresetProvider } from "@madooei/shadcn-theme-presets";
import CardsDemoPage from "./pages/cards-demo-page";

function App() {
  return (
    <ThemePresetProvider isDark={false} defaultPreset="perpetuity">
      <CardsDemoPage />
    </ThemePresetProvider>
  );
}

export default App;
