export abstract class MithraElement extends HTMLElement {
  protected readonly root: ShadowRoot;

  constructor(init: ShadowRootInit = { mode: "open" }) {
    super();
    this.root = this.shadowRoot ?? this.attachShadow(init);
  }
}
