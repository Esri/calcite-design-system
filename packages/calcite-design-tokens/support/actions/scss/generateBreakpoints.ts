import { promises } from "fs";
import StyleDictionary, { Dictionary, PlatformConfig, TransformedToken } from "style-dictionary";
import { isObjectOfStringsOrNumbers, transformMathSum } from "../../transforms/value/mathSum.js";

async function createFileIfNotExists(filePath, content) {
  try {
    const fileHandle = await promises.open(filePath, "wx");
    await fileHandle.writeFile(content);
    await fileHandle.close();
    console.log(`File created: ${filePath}`);
  } catch (err) {
    if (err.code === "EEXIST") {
      await promises.writeFile(filePath, content);
    } else {
      debugger;
      throw err;
    }
  }
}

async function removeFile(filePath) {
  try {
    await promises.unlink(filePath);
    console.log("File removed successfully:", filePath);
  } catch (err) {
    console.error("Error removing file:", err);
  }
}

const cleanSCSSBreakpoints = async function (dictionary: Dictionary, config: PlatformConfig) {
  console.log("Cleaning assets directory");
  await removeFile(config.buildPath + "breakpoints.scss");
};

const generateSCSSBreakpoints = async function (dictionary: Dictionary, config: PlatformConfig) {
  const breakpointTokens: TransformedToken[] = dictionary.allTokens.reduce((acc, token) => {
    if (token.isSource && token.type === "breakpoint") {
      acc.push({
        ...token,
        value: transformMathSum(token),
      });
    }
    return acc;
  }, []);
  if (breakpointTokens.length > 0) {
    const breakpointsString = breakpointTokens
      .reduce((acc, token) => {
        if (typeof token.value === "string" || typeof token.value === "number") {
          acc.push(`$${token.name}: ${token.value};`);
        } else if (isObjectOfStringsOrNumbers(token.value)) {
          Object.entries(token.value).forEach(([key, value]) => {
            acc.push(`$${token.name}-${key}: ${value}px;`);
          });
        }
        return acc;
      }, [])
      .join("\n");

    const filePath = `${config.buildPath}breakpoints.scss`;
    const content = [config.options.fileHeader, breakpointsString].join("\n\n");

    await createFileIfNotExists(filePath, content);
    debugger;
  }

  return;
};

export const ActionGenerateSCSSBreakpoints = "calcite/action/scss/generateBreakpoints";
export const registerGenerateSCSSBreakpoints = (sd: StyleDictionary): void =>
  sd.registerAction({
    name: ActionGenerateSCSSBreakpoints,
    do: generateSCSSBreakpoints,
    undo: cleanSCSSBreakpoints,
  });
