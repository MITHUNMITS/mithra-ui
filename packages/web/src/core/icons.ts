export type MIconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type MIconColor =
  | "default"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "current";

export interface IconDefinition {
  readonly viewBox?: string;
  readonly body: string;
}

export interface IconProvider {
  readonly name: string;
  getIcon(name: string): IconDefinition | Promise<IconDefinition | undefined> | undefined;
}

type TablerIconNode = readonly [
  tagName: string,
  attributes: Record<string, string | number>
];

const providers = new Map<string, IconProvider>();
let activeProviderName = "tabler";
let tablerNodesPromise: Promise<Record<string, TablerIconNode[]>> | undefined;
const missingIconWarnings = new Set<string>();

export const iconSizes = new Set<MIconSize>(["xs", "sm", "md", "lg", "xl"]);
export const iconColors = new Set<MIconColor>([
  "default",
  "muted",
  "primary",
  "success",
  "warning",
  "danger",
  "current"
]);

export function registerIconProvider(provider: IconProvider, options: { active?: boolean } = {}): void {
  providers.set(provider.name, provider);

  if (options.active) {
    activeProviderName = provider.name;
  }
}

export function setActiveIconProvider(name: string): void {
  if (!providers.has(name)) {
    throw new Error(`Icon provider "${name}" is not registered.`);
  }

  activeProviderName = name;
}

export async function getIcon(name: string): Promise<IconDefinition | undefined> {
  const provider = providers.get(activeProviderName);
  const icon = await provider?.getIcon(name);

  if (icon) {
    return icon;
  }

  warnMissingIcon(name);
  return (await provider?.getIcon("alert-triangle")) ?? (await provider?.getIcon("x"));
}

export async function renderIconSvg(
  name: string,
  options: { strokeWidth?: string | number; label?: string | null } = {}
): Promise<string> {
  const icon = await getIcon(name);

  if (!icon) {
    return "";
  }

  const label = options.label?.trim();
  const strokeWidth = escapeAttribute(String(options.strokeWidth ?? 2));
  const ariaAttributes = label
    ? `role="img" aria-label="${escapeAttribute(label)}"`
    : 'aria-hidden="true"';

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${escapeAttribute(icon.viewBox ?? "0 0 24 24")}"
      fill="none"
      stroke="currentColor"
      stroke-width="${strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      ${ariaAttributes}
    >
      ${icon.body}
    </svg>
  `;
}

async function loadTablerNodes(): Promise<Record<string, TablerIconNode[]>> {
  tablerNodesPromise ??= import(
    "../../../../node_modules/@tabler/icons/tabler-nodes-outline.json"
  ).then((module) => module.default as unknown as Record<string, TablerIconNode[]>);

  return tablerNodesPromise;
}

function warnMissingIcon(name: string): void {
  if (
    missingIconWarnings.has(name) ||
    typeof console === "undefined" ||
    isProduction()
  ) {
    return;
  }

  missingIconWarnings.add(name);
  console.warn(`Mithra UI: icon "${name}" was not found. Rendering fallback icon.`);
}

function isProduction(): boolean {
  const runtime = globalThis as typeof globalThis & {
    process?: { env?: { NODE_ENV?: string } };
  };

  return (
    typeof runtime.process !== "undefined" &&
    typeof runtime.process.env !== "undefined" &&
    runtime.process.env.NODE_ENV === "production"
  );
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function toTablerName(name: string): string {
  const normalized = name.trim().toLowerCase();

  return iconAliases[normalized] ?? normalized;
}

function renderTablerNode([tagName, attributes]: TablerIconNode): string {
  const attrs = Object.entries(attributes)
    .map(([name, value]) => `${name}="${escapeAttribute(String(value))}"`)
    .join(" ");

  return `<${tagName}${attrs ? ` ${attrs}` : ""}></${tagName}>`;
}

const iconAliases: Record<string, string> = {
  alert: "alert-triangle",
  close: "x",
  info: "info-circle",
  loader: "loader-2",
  save: "device-floppy",
  warning: "alert-triangle"
};

const tablerIconProvider: IconProvider = {
  name: "tabler",
  async getIcon(name: string): Promise<IconDefinition | undefined> {
    const nodes = (await loadTablerNodes())[toTablerName(name)];

    if (!nodes) {
      return undefined;
    }

    return {
      viewBox: "0 0 24 24",
      body: nodes.map(renderTablerNode).join("")
    };
  }
};

registerIconProvider(tablerIconProvider, { active: true });
