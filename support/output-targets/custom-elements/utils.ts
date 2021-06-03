import { setAssetPath } from "./index";

export function commitAssetPath(path: string): void {
  setAssetPath(path);
}

export function register(tagToConstructor: Record<string, CustomElementConstructor>): void {
  Object.keys(tagToConstructor).forEach((tag) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, tagToConstructor[tag]);
    }
  });
}
