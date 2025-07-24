import { createContext } from "react";

export interface ThemeCtx {
  theme: "light" | "dark";
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  toggle: () => {},
});
