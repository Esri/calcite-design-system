// CodeSandbox exposes `process`, which makes it look like NodeJS. The only way to determine it should be
// be treated as the browser is the non-standard value they use for `process.platform`.
// https://nodejs.org/api/process.html#processplatform
type CodeSandboxWorkaround = NodeJS.Platform | "browser";

// https://github.com/flexdinesh/browser-or-node/blob/master/src/index.js
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null &&
  (process?.platform as CodeSandboxWorkaround) !== "browser";

export function autoDefine(component: string): () => Promise<void> | undefined {
  if (isBrowser && !isNode) {
    return async () => (await import(`@esri/calcite-components/dist/components/${component}.js`)).defineCustomElement();
  }
  return undefined;
}
