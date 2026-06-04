export type CustomElementConstructorMap = Record<string, CustomElementConstructor>;

export interface RegisterOptions {
  registry?: CustomElementRegistry;
}

export function registerCustomElements(
  elements: CustomElementConstructorMap,
  options: RegisterOptions = {}
): void {
  const registry = options.registry ?? globalThis.customElements;

  if (!registry) {
    return;
  }

  for (const [tagName, elementConstructor] of Object.entries(elements)) {
    if (!registry.get(tagName)) {
      registry.define(tagName, elementConstructor);
    }
  }
}
