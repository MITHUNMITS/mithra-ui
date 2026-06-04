import { MithraElement } from "../../core/mithra-element";
import {
  iconColors,
  iconSizes,
  renderIconSvg,
  type MIconColor,
  type MIconSize
} from "../../core/icons";
import { iconStyles } from "./m-icon.styles";

export class MIcon extends MithraElement {
  static get observedAttributes(): string[] {
    return ["name", "size", "color", "stroke-width", "label"];
  }

  #hasRendered = false;
  #renderVersion = 0;

  connectedCallback(): void {
    if (!this.#hasRendered) {
      this.#render();
      this.#hasRendered = true;
    }
  }

  attributeChangedCallback(): void {
    if (this.#hasRendered) {
      void this.#sync();
    }
  }

  get name(): string {
    return this.getAttribute("name") ?? "";
  }

  set name(value: string) {
    this.setAttribute("name", value);
  }

  get size(): MIconSize {
    return readToken(this.getAttribute("size"), iconSizes, "md");
  }

  set size(value: MIconSize) {
    this.setAttribute("size", value);
  }

  get color(): MIconColor {
    return readToken(this.getAttribute("color"), iconColors, "current");
  }

  set color(value: MIconColor) {
    this.setAttribute("color", value);
  }

  get strokeWidth(): string {
    return this.getAttribute("stroke-width") ?? "2";
  }

  set strokeWidth(value: string) {
    this.setAttribute("stroke-width", value);
  }

  get label(): string | null {
    return this.getAttribute("label");
  }

  set label(value: string | null) {
    if (value) {
      this.setAttribute("label", value);
    } else {
      this.removeAttribute("label");
    }
  }

  #render(): void {
    this.root.innerHTML = `<style>${iconStyles}</style><span class="icon"></span>`;
    void this.#sync();
  }

  async #sync(): Promise<void> {
    const renderVersion = ++this.#renderVersion;
    const icon = this.root.querySelector(".icon");

    if (!icon) {
      return;
    }

    if (this.getAttribute("size") !== this.size) {
      this.setAttribute("size", this.size);
    }

    if (this.getAttribute("color") !== this.color) {
      this.setAttribute("color", this.color);
    }

    const label = this.label;
    this.setAttribute("aria-hidden", label ? "false" : "true");
    const svg = await renderIconSvg(this.name, {
      strokeWidth: this.strokeWidth,
      label
    });

    if (renderVersion === this.#renderVersion) {
      icon.innerHTML = svg;
    }
  }
}

function readToken<T extends string>(
  value: string | null,
  allowedValues: Set<T>,
  fallback: T
): T {
  return value && allowedValues.has(value as T) ? (value as T) : fallback;
}
