import { MithraElement } from "../../core/mithra-element";
import { buttonStyles } from "./m-button.styles";

export type MButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "ghost"
  | "outline"
  | "link";

export type MButtonSize = "sm" | "md" | "lg";
export type MButtonState = "idle" | "loading" | "saving" | "success" | "error";
export type MButtonType = "button" | "submit" | "reset";

const variants = new Set<MButtonVariant>([
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "ghost",
  "outline",
  "link"
]);

const sizes = new Set<MButtonSize>(["sm", "md", "lg"]);
const states = new Set<MButtonState>([
  "idle",
  "loading",
  "saving",
  "success",
  "error"
]);
const types = new Set<MButtonType>(["button", "submit", "reset"]);

export class MButton extends MithraElement {
  static get observedAttributes(): string[] {
    return [
      "variant",
      "size",
      "state",
      "loading",
      "disabled",
      "block",
      "rounded",
      "type",
      "loading-text",
      "saving-text",
      "success-text",
      "error-text"
    ];
  }

  #button: HTMLButtonElement | null = null;
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

  focus(options?: FocusOptions): void {
    this.#button?.focus(options);
  }

  blur(): void {
    this.#button?.blur();
  }

  get variant(): MButtonVariant {
    return readToken(this.getAttribute("variant"), variants, "primary");
  }

  set variant(value: MButtonVariant) {
    this.setAttribute("variant", value);
  }

  get size(): MButtonSize {
    return readToken(this.getAttribute("size"), sizes, "md");
  }

  set size(value: MButtonSize) {
    this.setAttribute("size", value);
  }

  get state(): MButtonState {
    return this.loading ? "loading" : readToken(this.getAttribute("state"), states, "idle");
  }

  set state(value: MButtonState) {
    this.setAttribute("state", value);
  }

  get type(): MButtonType {
    return readToken(this.getAttribute("type"), types, "button");
  }

  set type(value: MButtonType) {
    this.setAttribute("type", value);
  }

  get loading(): boolean {
    return this.hasAttribute("loading");
  }

  set loading(value: boolean) {
    toggleBooleanAttribute(this, "loading", value);
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    toggleBooleanAttribute(this, "disabled", value);
  }

  get block(): boolean {
    return this.hasAttribute("block");
  }

  set block(value: boolean) {
    toggleBooleanAttribute(this, "block", value);
  }

  get rounded(): boolean {
    return this.hasAttribute("rounded");
  }

  set rounded(value: boolean) {
    toggleBooleanAttribute(this, "rounded", value);
  }

  #render(): void {
    this.root.innerHTML = `
      <style>${buttonStyles}</style>
      <button part="button" class="button">
        <span part="label" class="label"></span>
      </button>
    `;

    this.#button = this.root.querySelector("button");
    this.#button?.addEventListener("click", this.#handleClick);
    this.#sync();
  }

  #sync(): void {
    if (!this.#button) {
      return;
    }

    const state = this.state;
    const isBusy = state === "loading" || state === "saving";
    const isDisabled = this.disabled || isBusy;

    this.#button.type = this.type;
    this.#button.disabled = this.disabled;
    this.#button.setAttribute("aria-disabled", String(isDisabled));
    this.#button.setAttribute("data-state", state);
    this.#button.innerHTML = this.#getButtonContent(state);

    if (this.getAttribute("variant") !== this.variant) {
      this.setAttribute("variant", this.variant);
    }

    if (this.getAttribute("size") !== this.size) {
      this.setAttribute("size", this.size);
    }

    if (this.getAttribute("state") !== this.state && !this.loading) {
      this.setAttribute("state", this.state);
    }

    if (this.getAttribute("type") !== this.type) {
      this.setAttribute("type", this.type);
    }
  }

  #getButtonContent(state: MButtonState): string {
    if (state === "loading") {
      return `${spinnerMarkup()}<span part="label" class="label">${escapeHtml(
        this.getAttribute("loading-text") ?? "Loading..."
      )}</span>`;
    }

    if (state === "saving") {
      return `${spinnerMarkup()}<span part="label" class="label">${escapeHtml(
        this.getAttribute("saving-text") ?? "Saving..."
      )}</span>`;
    }

    if (state === "success") {
      return `${stateIconMarkup("check", "✓")}<span part="label" class="label">${escapeHtml(
        this.getAttribute("success-text") ?? "Saved"
      )}</span>`;
    }

    if (state === "error") {
      return `${stateIconMarkup("error", "!")}<span part="label" class="label">${escapeHtml(
        this.getAttribute("error-text") ?? "Failed"
      )}</span>`;
    }

    return `<span part="label" class="label"><slot></slot></span>`;
  }

  #handleClick = (event: MouseEvent): void => {
    const state = this.state;
    const isBusy = state === "loading" || state === "saving";

    if (this.disabled || isBusy) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    queueMicrotask(() => {
      if (event.defaultPrevented) {
        return;
      }

      const form = this.closest("form");

      if (this.type === "submit") {
        form?.requestSubmit();
      }

      if (this.type === "reset") {
        form?.reset();
      }
    });
  };
}

function readToken<T extends string>(
  value: string | null,
  allowedValues: Set<T>,
  fallback: T
): T {
  return value && allowedValues.has(value as T) ? (value as T) : fallback;
}

function toggleBooleanAttribute(
  element: HTMLElement,
  name: string,
  value: boolean
): void {
  if (value) {
    element.setAttribute(name, "");
  } else {
    element.removeAttribute(name);
  }
}

function spinnerMarkup(): string {
  return `<span part="spinner" class="spinner" aria-hidden="true"></span>`;
}

function stateIconMarkup(part: string, icon: string): string {
  return `<span part="${part}" class="state-icon" aria-hidden="true">${icon}</span>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
