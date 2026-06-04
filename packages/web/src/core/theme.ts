export type MithraTheme = "light" | "dark" | "system";
export type MithraDirection = "ltr" | "rtl";

export interface ThemeOptions {
  root?: HTMLElement;
  theme?: MithraTheme;
  direction?: MithraDirection;
}

export function applyTheme(options: ThemeOptions = {}): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = options.root ?? document.documentElement;

  if (options.theme) {
    if (options.theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", options.theme);
    }
  }

  if (options.direction) {
    root.setAttribute("dir", options.direction);
  }
}
