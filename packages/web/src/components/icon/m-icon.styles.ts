export const iconStyles = `
  :host {
    --m-icon-size-value: 1em;
    color: currentColor;
    display: inline-flex;
    flex: 0 0 auto;
    inline-size: var(--m-icon-size-value);
    block-size: var(--m-icon-size-value);
    line-height: 1;
    vertical-align: -0.125em;
  }

  :host([size="xs"]) { --m-icon-size-value: 0.75rem; }
  :host([size="sm"]) { --m-icon-size-value: 0.875rem; }
  :host([size="md"]) { --m-icon-size-value: 1rem; }
  :host([size="lg"]) { --m-icon-size-value: 1.25rem; }
  :host([size="xl"]) { --m-icon-size-value: 1.5rem; }

  :host([color="default"]) { color: var(--m-color-text); }
  :host([color="muted"]) { color: var(--m-color-text-muted); }
  :host([color="primary"]) { color: var(--m-color-primary); }
  :host([color="success"]) { color: var(--m-color-success); }
  :host([color="warning"]) { color: var(--m-color-warning); }
  :host([color="danger"]) { color: var(--m-color-danger); }
  :host([color="current"]) { color: currentColor; }

  svg {
    block-size: 100%;
    display: block;
    inline-size: 100%;
    pointer-events: none;
  }
`;
