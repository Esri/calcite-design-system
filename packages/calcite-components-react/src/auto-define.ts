const isBrowser = (): boolean =>
  ![typeof window, typeof document, typeof location].includes("undefined") &&
  [typeof process, typeof global].includes("undefined") &&
  window.location === location &&
  window.document === document;

export function autoDefine(component: string): () => Promise<void> | undefined {
  if (isBrowser()) {
    return async () => (await import(`@esri/calcite-components/dist/components/${component}.js`)).defineCustomElement();
  }
  return undefined;
}
