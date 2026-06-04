export const buttonStyles = `
  :host {
    display: inline-flex;
    vertical-align: middle;
    direction: var(--m-direction, inherit);
    font-family: var(--m-font-family);
  }

  :host([block]) {
    display: flex;
    width: 100%;
  }

  .button {
    --m-button-bg: var(--m-color-primary);
    --m-button-border: var(--m-color-primary);
    --m-button-color: var(--m-color-primary-contrast);
    --m-button-hover-bg: color-mix(in srgb, var(--m-button-bg), #000 10%);
    --m-button-hover-border: color-mix(in srgb, var(--m-button-border), #000 10%);
    --m-button-active-bg: color-mix(in srgb, var(--m-button-bg), #000 18%);
    --m-button-shadow: 0 1px 2px rgb(15 23 42 / 0.12);

    align-items: center;
    appearance: none;
    background: var(--m-button-bg);
    border: 1px solid var(--m-button-border);
    border-radius: var(--m-radius-md);
    box-shadow: var(--m-button-shadow);
    box-sizing: border-box;
    color: var(--m-button-color);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-size: var(--m-font-size-md);
    font-weight: 650;
    gap: var(--m-space-2);
    inline-size: 100%;
    justify-content: center;
    line-height: 1.25;
    min-block-size: 2.5rem;
    padding: 0 var(--m-space-4);
    position: relative;
    text-align: center;
    text-decoration: none;
    transition:
      background-color var(--m-duration-normal) var(--m-easing-standard),
      border-color var(--m-duration-normal) var(--m-easing-standard),
      box-shadow var(--m-duration-normal) var(--m-easing-standard),
      color var(--m-duration-normal) var(--m-easing-standard),
      transform var(--m-duration-fast) var(--m-easing-standard);
    user-select: none;
    white-space: nowrap;
  }

  :host(:not([block])) .button {
    inline-size: auto;
  }

  :host([rounded]) .button {
    border-radius: 999px;
  }

  :host([size="sm"]) .button {
    font-size: var(--m-font-size-sm);
    gap: var(--m-space-1);
    min-block-size: 2rem;
    padding: 0 var(--m-space-3);
  }

  :host([size="lg"]) .button {
    font-size: var(--m-font-size-lg);
    gap: var(--m-space-3);
    min-block-size: 3rem;
    padding: 0 var(--m-space-6);
  }

  :host([variant="secondary"]) .button {
    --m-button-bg: var(--m-color-surface);
    --m-button-border: var(--m-color-border);
    --m-button-color: var(--m-color-text);
    --m-button-hover-bg: var(--m-color-surface-elevated);
    --m-button-hover-border: var(--m-color-primary);
  }

  :host([variant="success"]) .button {
    --m-button-bg: #16a34a;
    --m-button-border: #16a34a;
    --m-button-color: #ffffff;
  }

  :host([variant="warning"]) .button {
    --m-button-bg: #d97706;
    --m-button-border: #d97706;
    --m-button-color: #ffffff;
  }

  :host([variant="danger"]) .button {
    --m-button-bg: #dc2626;
    --m-button-border: #dc2626;
    --m-button-color: #ffffff;
  }

  :host([variant="ghost"]) .button {
    --m-button-bg: transparent;
    --m-button-border: transparent;
    --m-button-color: var(--m-color-text);
    --m-button-hover-bg: var(--m-color-surface);
    --m-button-hover-border: transparent;
    --m-button-active-bg: color-mix(in srgb, var(--m-color-surface), #000 8%);
    --m-button-shadow: none;
  }

  :host([variant="outline"]) .button {
    --m-button-bg: transparent;
    --m-button-border: var(--m-color-primary);
    --m-button-color: var(--m-color-primary);
    --m-button-hover-bg: color-mix(in srgb, var(--m-color-primary), transparent 90%);
    --m-button-hover-border: var(--m-color-primary);
    --m-button-active-bg: color-mix(in srgb, var(--m-color-primary), transparent 84%);
    --m-button-shadow: none;
  }

  :host([variant="link"]) .button {
    --m-button-bg: transparent;
    --m-button-border: transparent;
    --m-button-color: var(--m-color-primary);
    --m-button-hover-bg: transparent;
    --m-button-hover-border: transparent;
    --m-button-active-bg: transparent;
    --m-button-shadow: none;
    min-block-size: auto;
    padding-inline: 0;
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }

  .button:hover:not(:disabled) {
    background: var(--m-button-hover-bg);
    border-color: var(--m-button-hover-border);
  }

  .button:active:not(:disabled) {
    background: var(--m-button-active-bg);
    transform: translateY(1px);
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: 3px solid var(--m-color-focus-ring);
    outline-offset: 2px;
  }

  .button:disabled,
  .button[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.58;
    transform: none;
  }

  .state-icon,
  .spinner {
    block-size: 1em;
    flex: 0 0 auto;
    inline-size: 1em;
  }

  .spinner {
    animation: m-button-spin var(--m-button-spinner-duration, 780ms) linear infinite;
    border: 2px solid currentColor;
    border-block-start-color: transparent;
    border-radius: 999px;
  }

  .state-icon {
    display: inline-block;
    font-size: 1.05em;
    line-height: 1;
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @keyframes m-button-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .button,
    .spinner {
      animation-duration: 0ms;
      transition-duration: 0ms;
    }

    .button:active:not(:disabled) {
      transform: none;
    }
  }
`;
