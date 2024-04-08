import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher";
import Color from "tinycolor2";
import { CalledTransformerFunction, TransformerConfig } from "../utils";

export const matcher: Matcher = (token) => {
  return token.type === "color";
};

function deeplyNestedColorValue(val) {
  if (typeof val === "string") {
    let color = Color(val);

    if (val.includes("rgba") || color.getAlpha() === 0) {
      const hexMatch = val.match(/#[\w\d]{3,6}/g);
      const opacityMatch = val.match(/[\d\.]+(?=\))/);
      if (hexMatch) {
        color = Color(hexMatch[0]);

        if (opacityMatch) {
          color.setAlpha(opacityMatch);
        }
      }
      return color.toRgbString();
    } else {
      const color = Color(val);
      return color.toHexString();
    }
  } else {
    const valContexts = Object.keys(val);
    if (valContexts && val[valContexts[0]]) {
      const returnValue = {};

      for (let i = 0; i < valContexts.length; i++) {
        const context = valContexts[i];
        returnValue[context] = deeplyNestedColorValue(val[context]);
      }

      return returnValue;
    }
  }
}

export const transformTransitiveValueColorCSS: CalledTransformerFunction<string> = (token) => {
  return deeplyNestedColorValue(token.value);
};

export const registerValueColorCSS = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: transitiveValueColorCSS,
    transformer: transformTransitiveValueColorCSS,
    type: "value",
    transitive: true,
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

// https://amzn.github.io/style-dictionary/#/transforms?id=colorcss
export const transitiveValueColorCSS = "calcite/color/css";
