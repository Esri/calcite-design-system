import { OutputTargetDistCustomElements, OutputTargetWww } from "@stencil/core/internal";
import { create as baseConfigCreator } from "./stencil.config";

export const create: typeof baseConfigCreator = () => {
  const docsConfig = baseConfigCreator();

  const wwwOutputTarget = docsConfig.outputTargets?.find((element) => element.type === "www") as OutputTargetWww;
  wwwOutputTarget.copy = wwwOutputTarget.copy?.filter((item) => !item.src.includes("demos"));
  wwwOutputTarget.dir = "__docs-temp__";

  const componentsOutputTarget = docsConfig.outputTargets?.find(
    (element) => element.type === "dist-custom-elements",
  ) as OutputTargetDistCustomElements;
  componentsOutputTarget.dir = "__docs-temp__/components";

  docsConfig.outputTargets = [componentsOutputTarget, wwwOutputTarget];
  return docsConfig;
};

export const config = create();
