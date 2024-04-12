import { OutputTargetDist, OutputTargetDistCustomElements } from "@stencil/core/internal";
import { create as baseConfigCreator } from "./stencil.config";

export const create: typeof baseConfigCreator = () => {
  const docsConfig = baseConfigCreator();

  const componentsOutputTarget = docsConfig.outputTargets?.find(
    (element) => element.type === "dist-custom-elements",
  ) as OutputTargetDistCustomElements;
  componentsOutputTarget.dir = "__docs-temp__/components";

  const distOutputTarget = docsConfig.outputTargets?.find((element) => element.type === "dist") as OutputTargetDist;
  distOutputTarget.buildDir = "../__docs-temp__";
  // distOutputTarget.collectionDir = "../__docs-temp__/collection";
  // distOutputTarget.typesDir = "../__docs-temp__/types";
  // distOutputTarget.esmLoaderPath = "../__docs-temp__/loader";

  docsConfig.outputTargets = [componentsOutputTarget, distOutputTarget];
  return docsConfig;
};

export const config = create();
