# Mithra UI

Mithra UI is a zero-config, framework-independent Web Components UI library.

The first package is `@mithra-ui/web`, built with native Web Components, Shadow DOM, TypeScript, Vite library mode, and CSS variables. It is designed to work in plain HTML, React, Next.js, Angular, Vue, Svelte, Laravel Blade, Django templates, PHP pages, and any environment that can render standards-based custom elements.

## Install

```sh
npm install @mithra-ui/web
```

## Monorepo Setup

```sh
npm install
```

## Build

```sh
npm run build
```

## Type Check

```sh
npm run typecheck
```

## Usage

Import the package once in your application entry:

```ts
import "@mithra-ui/web/theme.css";
import { applyTheme, register } from "@mithra-ui/web";

register();
applyTheme({ theme: "system", direction: "ltr" });
```

Use the first component:

```html
<m-button>Save</m-button>
<m-button variant="secondary">Cancel</m-button>
<m-button state="saving">Save</m-button>
<m-button state="success" success-text="Created">Create</m-button>
<m-button block rounded>Continue</m-button>
```

Use CSS variables to theme application surfaces and future Mithra UI components:

```css
body {
  background: var(--m-color-background);
  color: var(--m-color-text);
  font-family: var(--m-font-family);
}
```

Force dark mode:

```html
<html data-theme="dark">
  ...
</html>
```

Enable RTL:

```html
<html dir="rtl">
  ...
</html>
```

## HTML Example

Build the package first:

```sh
npm run build
```

Then open:

```text
examples/html/index.html
```

The example imports files from `packages/web/dist`, so it expects the library build output to exist.

## Package Structure

```text
mithra-ui/
  packages/
    web/
      src/
        components/
        core/
        styles/
        utils/
        index.ts
      package.json
      vite.config.ts
      tsconfig.json
  examples/
    html/
      index.html
  package.json
  tsconfig.json
  README.md
```

## Current Public API

- `register()` safely registers all Mithra UI custom elements, including `<m-button>`.
- `registerCustomElements(elements, options)` defines custom elements only when a tag has not already been registered.
- `applyTheme(options)` sets `data-theme` and `dir` on the document root or a provided root element.
- `theme.css` provides design tokens for light mode, dark mode, RTL, reduced motion, focus, spacing, radius, shadow, and typography.

## `<m-button>`

`<m-button>` is a Shadow DOM custom element that renders an internal native `<button>`.

```html
<m-button>Save</m-button>
<m-button variant="outline" size="lg">Continue</m-button>
<m-button state="loading" loading-text="Uploading...">Upload</m-button>
<m-button type="submit">Submit</m-button>
```

### Attributes

- `variant`: `primary`, `secondary`, `success`, `warning`, `danger`, `ghost`, `outline`, `link`. Default: `primary`.
- `size`: `sm`, `md`, `lg`. Default: `md`.
- `state`: `idle`, `loading`, `saving`, `success`, `error`. Default: `idle`.
- `loading`: boolean shortcut for the loading state.
- `disabled`: disables interaction.
- `block`: makes the button fill its container.
- `rounded`: uses a pill-shaped radius.
- `type`: `button`, `submit`, `reset`. Default: `button`.
- `loading-text`, `saving-text`, `success-text`, `error-text`: customize state labels.

Loading and saving states set `aria-disabled="true"` and prevent clicks. The spinner is hidden from assistive technology, while the state label remains readable.
