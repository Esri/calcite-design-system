import {
  OutputTargetCustom,
  OutputTargetDist,
  OutputTargetDistTypes,
} from "@stencil/core/internal/stencil-public-compiler";
import { join } from "path";

export const generatePreactTypes: OutputTargetCustom["generator"] = async (
  config,
  compilerCtx,
  buildCtx,
): Promise<void> => {
  const { typesDir } = config.outputTargets.find(({ type }) => type === "dist" || type === "dist-types") as
    | OutputTargetDist
    | OutputTargetDistTypes;
  const outputPath = join(typesDir, "preact.d.ts");
  const types = buildCtx.components.map(getType).join("\n");
  await compilerCtx.fs.writeFile(outputPath, getTemplate(types));
};

function getTemplate(types: string): string {
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

function getType({ events, tagName, componentClassName }): string {
  const className = `Calcite${componentClassName}`;
  if (!events?.length) {
    return `
      "${tagName}": JSX.${className} & JSXInternal.HTMLAttributes<HTML${className}Element>`;
  } else {
    const stencilEvents = events.map(({ name }) => `"on${capitalize(name)}"`).join(" | ");
    const preactEvents = events
      .map(({ name }) => `"on${name}"?: (event: CustomEvent<any>) => void;`)
      .join("\n        ");
    return `
      "${tagName}": Omit<JSX.${className}, ${stencilEvents}> & JSXInternal.HTMLAttributes<HTML${className}Element> & {
        ${preactEvents}
      }`;
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
