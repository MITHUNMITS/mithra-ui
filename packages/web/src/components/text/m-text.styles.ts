export const textStyles = `
  :host {
    display: inline;
    font-family: var(--m-font-sans);
  }

  .text {
    color: var(--m-text-color, var(--m-color-text));
    display: contents;
    font: inherit;
    font-family: var(--m-text-family, var(--m-font-sans));
    font-size: var(--m-text-size, var(--m-text-md));
    font-weight: var(--m-text-weight, var(--m-font-normal));
    letter-spacing: var(--m-text-tracking, var(--m-tracking-normal));
    line-height: var(--m-text-leading, var(--m-leading-normal));
    margin: 0;
    min-inline-size: 0;
    position: relative;
    text-align: var(--m-text-align, left);
  }

  :host([as="p"]),
  :host([as="div"]),
  :host([as="h1"]),
  :host([as="h2"]),
  :host([as="h3"]),
  :host([as="h4"]),
  :host([as="h5"]),
  :host([as="h6"]) {
    display: block;
  }

  :host([as="p"]) .text,
  :host([as="div"]) .text,
  :host([as="h1"]) .text,
  :host([as="h2"]) .text,
  :host([as="h3"]) .text,
  :host([as="h4"]) .text,
  :host([as="h5"]) .text,
  :host([as="h6"]) .text,
  :host([href]) .text {
    display: block;
  }

  :host([href]) {
    display: inline-block;
  }

  :host([href]) .text {
    color: var(--m-text-color, var(--m-color-primary));
    text-decoration: underline;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.2em;
  }

  :host([copyable]) .text,
  :host([editable]) .text,
  :host([gradient]) .text,
  :host([glow]) .text,
  :host([loading]) .text,
  :host([tooltip]) .text {
    display: inline-block;
  }

  :host([href]) .text:hover {
    color: color-mix(in srgb, var(--m-text-color, var(--m-color-primary)), black 14%);
  }

  :host([href]) .text:focus-visible,
  :host([editable]) .text:focus-visible {
    border-radius: var(--m-radius-sm);
    outline: 3px solid var(--m-color-focus-ring);
    outline-offset: 2px;
  }

  :host([variant="display"]) .text {
    --m-text-size: var(--m-text-4xl);
    --m-text-weight: var(--m-font-bold);
    --m-text-leading: var(--m-leading-tight);
    --m-text-tracking: var(--m-tracking-tight);
  }

  :host([variant="heading"]) .text {
    --m-text-size: var(--m-text-2xl);
    --m-text-weight: var(--m-font-bold);
    --m-text-leading: var(--m-leading-tight);
  }

  :host([variant="title"]) .text {
    --m-text-size: var(--m-text-lg);
    --m-text-weight: var(--m-font-semibold);
    --m-text-leading: var(--m-leading-tight);
  }

  :host([variant="caption"]) .text {
    --m-text-size: var(--m-text-sm);
    --m-text-color: var(--m-color-text-muted);
  }

  :host([variant="overline"]) .text {
    --m-text-size: var(--m-text-xs);
    --m-text-weight: var(--m-font-bold);
    --m-text-tracking: var(--m-tracking-wide);
    text-transform: uppercase;
  }

  :host([family="sans"]) .text { --m-text-family: var(--m-font-sans); }
  :host([family="serif"]) .text { --m-text-family: var(--m-font-serif); }
  :host([family="mono"]) .text { --m-text-family: var(--m-font-mono); }

  :host([size="xs"]) .text { --m-text-size: var(--m-text-xs); }
  :host([size="sm"]) .text { --m-text-size: var(--m-text-sm); }
  :host([size="md"]) .text { --m-text-size: var(--m-text-md); }
  :host([size="lg"]) .text { --m-text-size: var(--m-text-lg); }
  :host([size="xl"]) .text { --m-text-size: var(--m-text-xl); }
  :host([size="2xl"]) .text { --m-text-size: var(--m-text-2xl); }
  :host([size="3xl"]) .text { --m-text-size: var(--m-text-3xl); }
  :host([size="4xl"]) .text { --m-text-size: var(--m-text-4xl); }
  :host([size="5xl"]) .text { --m-text-size: var(--m-text-5xl); }
  :host([size="6xl"]) .text { --m-text-size: var(--m-text-6xl); }

  :host([weight="light"]) .text { --m-text-weight: var(--m-font-light); }
  :host([weight="normal"]) .text { --m-text-weight: var(--m-font-normal); }
  :host([weight="medium"]) .text { --m-text-weight: var(--m-font-medium); }
  :host([weight="semibold"]) .text { --m-text-weight: var(--m-font-semibold); }
  :host([weight="bold"]) .text { --m-text-weight: var(--m-font-bold); }
  :host([weight="extrabold"]) .text { --m-text-weight: var(--m-font-extrabold); }

  :host([leading="tight"]) .text { --m-text-leading: var(--m-leading-tight); }
  :host([leading="normal"]) .text { --m-text-leading: var(--m-leading-normal); }
  :host([leading="relaxed"]) .text { --m-text-leading: var(--m-leading-relaxed); }

  :host([tracking="tight"]) .text { --m-text-tracking: var(--m-tracking-tight); }
  :host([tracking="normal"]) .text { --m-text-tracking: var(--m-tracking-normal); }
  :host([tracking="wide"]) .text { --m-text-tracking: var(--m-tracking-wide); }

  :host([color="default"]) .text { --m-text-color: var(--m-color-text); }
  :host([color="muted"]) .text { --m-text-color: var(--m-color-text-muted); }
  :host([color="primary"]) .text { --m-text-color: var(--m-color-primary); }
  :host([color="secondary"]) .text { --m-text-color: var(--m-color-secondary, #475569); }
  :host([color="success"]) .text { --m-text-color: var(--m-color-success); }
  :host([color="warning"]) .text { --m-text-color: var(--m-color-warning); }
  :host([color="danger"]) .text { --m-text-color: var(--m-color-danger); }
  :host([color="info"]) .text { --m-text-color: var(--m-color-info, #0ea5e9); }

  :host([align="left"]) .text { --m-text-align: left; }
  :host([align="center"]) .text { --m-text-align: center; }
  :host([align="right"]) .text { --m-text-align: right; }
  :host([align="justify"]) .text { --m-text-align: justify; }

  :host([truncate]) {
    display: block;
    min-inline-size: 0;
  }

  :host([truncate]) .text {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :host([lines]) {
    display: block;
    min-inline-size: 0;
  }

  :host([lines]) .text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--m-text-lines, 2);
    overflow: hidden;
  }

  .skeleton {
    animation: m-text-skeleton 1.2s ease-in-out infinite;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--m-color-border), transparent 15%),
      color-mix(in srgb, var(--m-color-surface-elevated), white 20%),
      color-mix(in srgb, var(--m-color-border), transparent 15%)
    );
    background-size: 200% 100%;
    border-radius: var(--m-radius-sm);
    display: inline-block;
    min-block-size: 1em;
    min-inline-size: min(18rem, 100%);
    vertical-align: middle;
  }

  .sr-only {
    block-size: 1px;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    inline-size: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }

  :host([gradient]) .text {
    --m-text-gradient: linear-gradient(135deg, #2f57f1 0%, #7c3aed 100%);
    background: var(--m-text-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  :host([gradient="sunset"]) .text {
    --m-text-gradient: linear-gradient(135deg, #f97316 0%, #ef4444 52%, #db2777 100%);
  }

  :host([gradient="ocean"]) .text {
    --m-text-gradient: linear-gradient(135deg, #0ea5e9 0%, #2563eb 48%, #14b8a6 100%);
  }

  :host([gradient="neon"]) .text {
    --m-text-gradient: linear-gradient(135deg, #22c55e 0%, #06b6d4 44%, #a855f7 100%);
  }

  :host([glow]) .text {
    text-shadow: 0 0 18px color-mix(in srgb, var(--m-text-color, var(--m-color-primary)), transparent 45%);
  }

  :host([animation="fade"]) .text {
    animation: m-text-fade 280ms var(--m-easing-standard);
  }

  :host([animation="slide"]) .text {
    animation: m-text-slide 320ms var(--m-easing-standard);
  }

  :host([animation="zoom"]) .text {
    animation: m-text-zoom 260ms var(--m-easing-standard);
  }

  :host([animation="typing"]) .text {
    display: inline-block;
    max-inline-size: max-content;
    overflow: hidden;
    white-space: nowrap;
    animation: m-text-typing 1.3s steps(28, end);
  }

  .copy {
    appearance: none;
    background: var(--m-color-surface);
    border: 1px solid var(--m-color-border);
    border-radius: var(--m-radius-sm);
    color: var(--m-color-text-muted);
    cursor: pointer;
    font: inherit;
    font-size: var(--m-text-xs);
    font-weight: var(--m-font-semibold);
    margin-inline-start: var(--m-space-2);
    padding: 0.125rem 0.375rem;
    vertical-align: middle;
  }

  .copy:hover {
    border-color: var(--m-color-primary);
    color: var(--m-color-primary);
  }

  .copy:focus-visible {
    outline: 3px solid var(--m-color-focus-ring);
    outline-offset: 2px;
  }

  .tooltip {
    background: #0f172a;
    border-radius: var(--m-radius-sm);
    color: white;
    font-size: var(--m-text-xs);
    inset-block-end: calc(100% + 0.5rem);
    inset-inline-start: 50%;
    max-inline-size: 16rem;
    opacity: 0;
    padding: 0.25rem 0.5rem;
    pointer-events: none;
    position: absolute;
    transform: translateX(-50%) translateY(0.25rem);
    transition:
      opacity var(--m-duration-fast) var(--m-easing-standard),
      transform var(--m-duration-fast) var(--m-easing-standard);
    white-space: nowrap;
    z-index: 20;
  }

  .text:hover .tooltip,
  .text:focus-visible .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  :host([editable]) .text {
    border-radius: var(--m-radius-sm);
    cursor: text;
  }

  @media (max-width: 639px) {
    .text {
      font-size: var(--m-text-mobile-size, var(--m-text-size, var(--m-text-md)));
    }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    .text {
      font-size: var(--m-text-tablet-size, var(--m-text-size, var(--m-text-md)));
    }
  }

  @media (min-width: 1024px) {
    .text {
      font-size: var(--m-text-desktop-size, var(--m-text-size, var(--m-text-md)));
    }
  }

  @keyframes m-text-skeleton {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }

  @keyframes m-text-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes m-text-slide {
    from {
      opacity: 0;
      transform: translateY(0.375rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes m-text-zoom {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes m-text-typing {
    from { inline-size: 0; }
    to { inline-size: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .text,
    .skeleton,
    .tooltip {
      animation-duration: 0ms;
      transition-duration: 0ms;
    }
  }
`;
