import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type FC,
} from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "theme";

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Read theme from localStorage or system preference
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Apply theme class immediately to avoid flash
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
