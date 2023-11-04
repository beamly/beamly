"use client";

import { useTheme } from "next-themes";
import React from "react";

import { DarkModeButton, LightModeButton } from "./buttons/mode-buttons";

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return resolvedTheme === "light" ? (
    <DarkModeButton onClick={() => setTheme("dark")} />
  ) : (
    <LightModeButton onClick={() => setTheme("light")} />
  );
}
