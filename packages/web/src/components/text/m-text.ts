import { MithraElement } from "../../core/mithra-element";
import {
  readTextToken,
  textAlignments,
  textAnimations,
  textColors,
  textElements,
  textFamilies,
  textFormats,
  textGradients,
  textLeadings,
  textSizes,
  textTrackings,
  textVariants,
  textWeights,
  type MTextAlign,
  type MTextAnimation,
  type MTextAs,
  type MTextColor,
  type MTextFamily,
  type MTextFormat,
  type MTextGradient,
  type MTextLeading,
  type MTextSize,
  type MTextTracking,
  type MTextVariant,
  type MTextWeight
} from "../../core/typography";
import { textStyles } from "./m-text.styles";

const observedTextAttributes = [
  "variant",
  "family",
  "size",
  "mobile-size",
  "tablet-size",
  "desktop-size",
  "weight",
  "color",
  "align",
  "as",
  "leading",
  "tracking",
  "truncate",
  "lines",
  "loading",
  "href",
  "target",
  "rel",
  "copyable",
  "tooltip",
  "editable",
  "gradient",
  "glow",
  "animation",
  "format",
  "value",
  "locale",
  "currency"
];

export class MText extends MithraElement {
  static get observedAttributes(): string[] {
    return observedTextAttributes;
  }

  #hasRendered = false;

  connectedCallback(): void {
    if (!this.#hasRendered) {
      this.#render();
      this.#hasRendered = true;
    }
  }

  attributeChangedCallback(): void {
    if (this.#hasRendered) {
      this.#sync();
    }
  }

  get variant(): MTextVariant {
    return readTextToken(this.getAttribute("variant"), textVariants, "body");
  }

  set variant(value: MTextVariant) {
    this.setAttribute("variant", value);
  }

  get family(): MTextFamily {
    return readTextToken(this.getAttribute("family"), textFamilies, "sans");
  }

  set family(value: MTextFamily) {
    this.setAttribute("family", value);
  }

  get size(): MTextSize {
    return readTextToken(this.getAttribute("size"), textSizes, "md");
  }

  set size(value: MTextSize) {
    this.setAttribute("size", value);
  }

  get mobileSize(): MTextSize | null {
    return readOptionalTextToken(this.getAttribute("mobile-size"), textSizes);
  }

  set mobileSize(value: MTextSize | null) {
    setOptionalAttribute(this, "mobile-size", value);
  }

  get tabletSize(): MTextSize | null {
    return readOptionalTextToken(this.getAttribute("tablet-size"), textSizes);
  }

  set tabletSize(value: MTextSize | null) {
    setOptionalAttribute(this, "tablet-size", value);
  }

  get desktopSize(): MTextSize | null {
    return readOptionalTextToken(this.getAttribute("desktop-size"), textSizes);
  }

  set desktopSize(value: MTextSize | null) {
    setOptionalAttribute(this, "desktop-size", value);
  }

  get weight(): MTextWeight {
    return readTextToken(this.getAttribute("weight"), textWeights, "normal");
  }

  set weight(value: MTextWeight) {
    this.setAttribute("weight", value);
  }

  get color(): MTextColor {
    return readTextToken(this.getAttribute("color"), textColors, "default");
  }

  set color(value: MTextColor) {
    this.setAttribute("color", value);
  }

  get align(): MTextAlign {
    return readTextToken(this.getAttribute("align"), textAlignments, "left");
  }

  set align(value: MTextAlign) {
    this.setAttribute("align", value);
  }

  get as(): MTextAs {
    return readTextToken(this.getAttribute("as"), textElements, "span");
  }

  set as(value: MTextAs) {
    this.setAttribute("as", value);
  }

  get leading(): MTextLeading {
    return readTextToken(this.getAttribute("leading"), textLeadings, "normal");
  }

  set leading(value: MTextLeading) {
    this.setAttribute("leading", value);
  }

  get tracking(): MTextTracking {
    return readTextToken(this.getAttribute("tracking"), textTrackings, "normal");
  }

  set tracking(value: MTextTracking) {
    this.setAttribute("tracking", value);
  }

  get animation(): MTextAnimation {
    return readTextToken(this.getAttribute("animation"), textAnimations, "none");
  }

  set animation(value: MTextAnimation) {
    this.setAttribute("animation", value);
  }

  get format(): MTextFormat | null {
    return readOptionalTextToken(this.getAttribute("format"), textFormats);
  }

  set format(value: MTextFormat | null) {
    setOptionalAttribute(this, "format", value);
  }

  get gradient(): MTextGradient | null {
    if (!this.hasAttribute("gradient")) {
      return null;
    }

    return readTextToken(this.getAttribute("gradient"), textGradients, "default");
  }

  set gradient(value: MTextGradient | null) {
    setOptionalAttribute(this, "gradient", value);
  }

  get href(): string | null {
    return this.getAttribute("href");
  }

  set href(value: string | null) {
    setOptionalAttribute(this, "href", value);
  }

  #render(): void {
    this.root.innerHTML = `<style>${textStyles}</style>${this.#createTextMarkup()}`;
    this.#sync();
  }

  #sync(): void {
    const current = this.root.querySelector(".text");
    const tagName = this.#getRenderedTagName();

    if (!current) {
      this.root.append(this.#createTextElement(tagName));
    } else if (current.localName !== tagName) {
      current?.replaceWith(this.#createTextElement(tagName));
    }

    this.#syncAttributes();
    this.#syncContent();
  }

  #syncAttributes(): void {
    const element = this.root.querySelector<HTMLElement>(".text");

    if (!element) {
      return;
    }

    normalizeAttribute(this, "variant", this.variant);
    normalizeAttribute(this, "family", this.family);
    normalizeAttribute(this, "size", this.size);
    normalizeOptionalAttribute(this, "mobile-size", this.mobileSize);
    normalizeOptionalAttribute(this, "tablet-size", this.tabletSize);
    normalizeOptionalAttribute(this, "desktop-size", this.desktopSize);
    normalizeAttribute(this, "weight", this.weight);
    normalizeAttribute(this, "color", this.color);
    normalizeAttribute(this, "align", this.align);
    normalizeAttribute(this, "as", this.as);
    normalizeAttribute(this, "leading", this.leading);
    normalizeAttribute(this, "tracking", this.tracking);
    normalizeAttribute(this, "animation", this.animation);

    element.style.removeProperty("--m-text-mobile-size");
    element.style.removeProperty("--m-text-tablet-size");
    element.style.removeProperty("--m-text-desktop-size");
    element.style.removeProperty("--m-text-lines");

    setResponsiveSizeProperty(element, "mobile", this.mobileSize);
    setResponsiveSizeProperty(element, "tablet", this.tabletSize);
    setResponsiveSizeProperty(element, "desktop", this.desktopSize);

    const lines = readPositiveInteger(this.getAttribute("lines"));

    if (lines) {
      element.style.setProperty("--m-text-lines", String(lines));
      this.setAttribute("lines", String(lines));
    } else if (this.hasAttribute("lines")) {
      this.removeAttribute("lines");
    }

    if (this.href && element instanceof HTMLAnchorElement) {
      element.href = this.href;
      setOptionalDomAttribute(element, "target", this.getAttribute("target"));
      setOptionalDomAttribute(element, "rel", this.#getLinkRel());
    }

    if (this.hasAttribute("editable")) {
      element.setAttribute("contenteditable", "true");
      element.setAttribute("role", "textbox");
      element.addEventListener("input", this.#handleEditableInput);
    } else {
      element.removeAttribute("contenteditable");
      element.removeAttribute("role");
      element.removeEventListener("input", this.#handleEditableInput);
    }

    setOptionalDomAttribute(element, "title", this.getAttribute("tooltip"));
  }

  #syncContent(): void {
    const element = this.root.querySelector<HTMLElement>(".text");

    if (!element) {
      return;
    }

    const content = this.#getRenderedContent();
    const tooltip = this.getAttribute("tooltip");
    const copyButton = this.hasAttribute("copyable")
      ? `<button class="copy" type="button" aria-label="Copy text" title="Copy text">Copy</button>`
      : "";
    const tooltipMarkup = tooltip
      ? `<span class="tooltip" role="tooltip">${escapeHtml(tooltip)}</span>`
      : "";

    element.innerHTML = this.hasAttribute("loading")
      ? `<span class="skeleton" aria-hidden="true"></span><span class="sr-only">Loading</span>${copyButton}${tooltipMarkup}`
      : `${content}${copyButton}${tooltipMarkup}`;

    this.root.querySelector(".copy")?.addEventListener("click", this.#handleCopy);
  }

  #getRenderedTagName(): string {
    return this.href ? "a" : this.as;
  }

  #createTextMarkup(): string {
    return this.#createTextElement(this.#getRenderedTagName()).outerHTML;
  }

  #createTextElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.className = "text";
    element.innerHTML = "<slot></slot>";
    return element;
  }

  #getRenderedContent(): string {
    if (this.format) {
      return escapeHtml(formatTextValue(this.#getRawText(), this.format, this));
    }

    if (this.hasAttribute("editable")) {
      return escapeHtml(this.#getRawText());
    }

    return "<slot></slot>";
  }

  #getRawText(): string {
    return this.getAttribute("value") ?? this.textContent?.trim() ?? "";
  }

  #getCopyText(): string {
    if (this.format) {
      return formatTextValue(this.#getRawText(), this.format, this);
    }

    const textElement = this.root.querySelector<HTMLElement>(".text");
    const copyButtonText = this.hasAttribute("copyable") ? "Copy" : "";
    const tooltipText = this.getAttribute("tooltip") ?? "";

    return (textElement?.innerText ?? this.textContent ?? "")
      .replace(copyButtonText, "")
      .replace(tooltipText, "")
      .trim();
  }

  #getLinkRel(): string | null {
    const rel = this.getAttribute("rel");

    if (rel) {
      return rel;
    }

    return this.getAttribute("target") === "_blank" ? "noopener noreferrer" : null;
  }

  #handleCopy = (): void => {
    const value = this.#getCopyText();

    void navigator.clipboard?.writeText(value);
    this.dispatchEvent(
      new CustomEvent("m-copy", {
        bubbles: true,
        composed: true,
        detail: { value }
      })
    );
  };

  #handleEditableInput = (event: Event): void => {
    const value = (event.currentTarget as HTMLElement).innerText;

    this.dispatchEvent(
      new CustomEvent("m-change", {
        bubbles: true,
        composed: true,
        detail: { value }
      })
    );
  };
}

export class MDisplay extends MText {
  connectedCallback(): void {
    applyPreset(this, { variant: "display", as: "h1", size: "5xl", weight: "extrabold" });
    super.connectedCallback();
  }
}

export class MHeading extends MText {
  connectedCallback(): void {
    applyPreset(this, { variant: "heading", as: "h2", size: "3xl", weight: "bold" });
    super.connectedCallback();
  }
}

export class MTitle extends MText {
  connectedCallback(): void {
    applyPreset(this, { variant: "title", as: "h3", size: "xl", weight: "semibold" });
    super.connectedCallback();
  }
}

export class MBody extends MText {
  connectedCallback(): void {
    applyPreset(this, { variant: "body", as: "p", size: "md", weight: "normal" });
    super.connectedCallback();
  }
}

export class MCaption extends MText {
  connectedCallback(): void {
    applyPreset(this, { variant: "caption", as: "span", size: "sm", color: "muted" });
    super.connectedCallback();
  }
}

function readOptionalTextToken<T extends string>(
  value: string | null,
  allowedValues: Set<T>
): T | null {
  return value && allowedValues.has(value as T) ? (value as T) : null;
}

function setOptionalAttribute(
  element: HTMLElement,
  name: string,
  value: string | null
): void {
  if (value) {
    element.setAttribute(name, value);
  } else {
    element.removeAttribute(name);
  }
}

function normalizeAttribute(element: HTMLElement, name: string, value: string): void {
  if (element.getAttribute(name) !== value) {
    element.setAttribute(name, value);
  }
}

function normalizeOptionalAttribute(
  element: HTMLElement,
  name: string,
  value: string | null
): void {
  if (value && element.getAttribute(name) !== value) {
    element.setAttribute(name, value);
  }

  if (!value && element.hasAttribute(name)) {
    element.removeAttribute(name);
  }
}

function setOptionalDomAttribute(
  element: HTMLElement,
  name: string,
  value: string | null
): void {
  if (value) {
    element.setAttribute(name, value);
  } else {
    element.removeAttribute(name);
  }
}

function setResponsiveSizeProperty(
  element: HTMLElement,
  breakpoint: "mobile" | "tablet" | "desktop",
  size: MTextSize | null
): void {
  if (size) {
    element.style.setProperty(`--m-text-${breakpoint}-size`, `var(--m-text-${size})`);
  }
}

function readPositiveInteger(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function formatTextValue(value: string, format: MTextFormat, element: HTMLElement): string {
  const locale = element.getAttribute("locale") || getDefaultLocale();

  if (format === "currency") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: element.getAttribute("currency") || "USD"
    }).format(Number(value));
  }

  if (format === "percent") {
    return new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2
    }).format(Number(value));
  }

  if (format === "compact") {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(Number(value));
  }

  if (format === "date") {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium"
    }).format(new Date(value));
  }

  return formatRelativeTime(value, locale);
}

function formatRelativeTime(value: string, locale: string): string {
  const timestamp = new Date(value).getTime();
  const diffSeconds = Math.round((timestamp - Date.now()) / 1000);
  const absSeconds = Math.abs(diffSeconds);
  const divisions: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1]
  ];
  const [unit, seconds] = divisions.find(([, amount]) => absSeconds >= amount) ?? [
    "second",
    1
  ];

  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
    Math.round(diffSeconds / seconds),
    unit
  );
}

function getDefaultLocale(): string {
  return typeof navigator !== "undefined" && navigator.language
    ? navigator.language
    : "en-US";
}

function applyPreset(element: HTMLElement, attributes: Record<string, string>): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (!element.hasAttribute(name)) {
      element.setAttribute(name, value);
    }
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
