"use client";

import { useEffect } from "react";
import { useStore } from "../providers/StoreProvider";
import { buildThemeVars } from "../../utils/theme";

export default function ThemeTokens() {
  const { storeData } = useStore();
  const primaryColor =
    storeData.design?.primaryColor || "#5d0f99";
  const secondaryColor =
    storeData.design?.secondaryColor || "#870f99";
  const fontFamily = storeData.design?.fontFamily ?? undefined;

  useEffect(() => {
    const vars = buildThemeVars(
      primaryColor,
      secondaryColor,
      fontFamily
    );
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [primaryColor, secondaryColor, fontFamily]);

  return null;
}
