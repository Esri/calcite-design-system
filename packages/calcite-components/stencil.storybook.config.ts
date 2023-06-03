import { create as baseConfigCreator } from "./stencil.config";
import { OutputTargetWww } from "@stencil/core/internal";

export const create: typeof baseConfigCreator = () => {
  const docsConfig = baseConfigCreator();

  const wwwOutputTarget = docsConfig.outputTargets?.find((element) => element.type === "www") as OutputTargetWww;
  wwwOutputTarget.copy = wwwOutputTarget.copy?.filter((item) => !item.src.includes("demos"));
  wwwOutputTarget.dir = "__docs-temp__";
  docsConfig.outputTargets = [wwwOutputTarget];

  return docsConfig;
};

export const config = create();
