export type MTextVariant =
  | "display"
  | "heading"
  | "title"
  | "body"
  | "caption"
  | "overline";

export type MTextFamily = "sans" | "serif" | "mono";
export type MTextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";
export type MTextWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
export type MTextColor =
  | "default"
  | "muted"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type MTextAlign = "left" | "center" | "right" | "justify";
export type MTextAs = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type MTextLeading = "tight" | "normal" | "relaxed";
export type MTextTracking = "tight" | "normal" | "wide";
export type MTextGradient = "default" | "sunset" | "ocean" | "neon";
export type MTextAnimation = "none" | "fade" | "slide" | "zoom" | "typing";
export type MTextFormat = "currency" | "percent" | "compact" | "date" | "relative-time";

export const textVariants = new Set<MTextVariant>([
  "display",
  "heading",
  "title",
  "body",
  "caption",
  "overline"
]);

export const textSizes = new Set<MTextSize>([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl"
]);

export const textWeights = new Set<MTextWeight>([
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold"
]);

export const textColors = new Set<MTextColor>([
  "default",
  "muted",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info"
]);

export const textAlignments = new Set<MTextAlign>([
  "left",
  "center",
  "right",
  "justify"
]);

export const textElements = new Set<MTextAs>([
  "span",
  "p",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6"
]);

export const textFamilies = new Set<MTextFamily>(["sans", "serif", "mono"]);
export const textLeadings = new Set<MTextLeading>(["tight", "normal", "relaxed"]);
export const textTrackings = new Set<MTextTracking>(["tight", "normal", "wide"]);
export const textGradients = new Set<MTextGradient>(["default", "sunset", "ocean", "neon"]);
export const textAnimations = new Set<MTextAnimation>(["none", "fade", "slide", "zoom", "typing"]);
export const textFormats = new Set<MTextFormat>([
  "currency",
  "percent",
  "compact",
  "date",
  "relative-time"
]);

export function readTextToken<T extends string>(
  value: string | null,
  allowedValues: Set<T>,
  fallback: T
): T {
  return value && allowedValues.has(value as T) ? (value as T) : fallback;
}
