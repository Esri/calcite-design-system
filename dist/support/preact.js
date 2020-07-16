import { join } from "path";
export const generatePreactTypes = async (config, compilerCtx, buildCtx) => {
    const { typesDir } = config.outputTargets.find((o) => o.typesDir);
    const outputPath = join(typesDir, "preact.d.ts");
    const types = buildCtx.components.map(getType).join("\n");
    await compilerCtx.fs.writeFile(outputPath, getTemplate(types));
};
function getTemplate(types) {
    return `
import { JSXInternal } from "preact/src/jsx";
import { JSX } from "./components";

declare module "preact/src/jsx" {
  namespace JSXInternal {
    interface IntrinsicElements {
      ${types};
    }
  }
}
  `;
}
function getType({ events, tagName, componentClassName }) {
    if (!(events === null || events === void 0 ? void 0 : events.length)) {
        return `
      "${tagName}": JSX.${componentClassName} & JSXInternal.HTMLAttributes<HTML${componentClassName}Element>`;
    }
    else {
        const stencilEvents = events
            .map(({ name }) => `"on${capitalize(name)}"`)
            .join(" | ");
        const preactEvents = events
            .map(({ name }) => `"on${name}"?: (event: CustomEvent<any>) => void;`)
            .join("\n        ");
        return `
      "${tagName}": Omit<JSX.${componentClassName}, ${stencilEvents}> & JSXInternal.HTMLAttributes<HTML${componentClassName}Element> & {
        ${preactEvents}
      }`;
    }
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
