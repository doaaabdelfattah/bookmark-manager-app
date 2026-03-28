"use client";

import { useTheme } from "next-themes";
import DarkTheme from "@/public/assets/images/icon-dark-theme.svg";
import LightTheme from "@/public/assets/images/icon-light-theme.svg";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      className="min-h-8 p-1"
      variant="default"
      value={theme}
      type="single"
    >
      <ToggleGroupItem
        onClick={() => setTheme("light")}
        value="light"
        aria-label="light theme"
      >
        <LightTheme />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => setTheme("dark")}
        value="dark"
        aria-label="dark theme"
      >
        <DarkTheme />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
