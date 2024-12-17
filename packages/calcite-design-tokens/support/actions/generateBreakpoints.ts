import { promises } from "fs";
import StyleDictionary, { Dictionary, PlatformConfig, TransformedToken } from "style-dictionary";
import { isObjectOfStringsOrNumbers, transformValueMathSum } from "../transforms/value/mathSum.js";

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

const cleanBreakpoints = async function (dictionary: Dictionary, config: PlatformConfig) {
  console.log("Cleaning assets directory");
  await removeFile(config.buildPath + "breakpoints.scss");
};

const formatTokenOutput = (
  token: TransformedToken & { attributes?: TransformedToken["attributes"] & { nameSuffix?: string } },
  format: string,
): string => {
  switch (format) {
    case ".scss":
      return `$${token.name}${token.attributes.nameSuffix ? `-${token.attributes.nameSuffix}` : ""}: ${token.value}px;`;

    default:
      break;
  }
};

const generateBreakpoints = async function (dictionary: Dictionary, config: PlatformConfig) {
  const format = ".scss";
  const filePath = config.buildPath + "breakpoints" + format;
  const fileHeader = await Promise.resolve(
    typeof config.options.fileHeader === "function" ? config.options.fileHeader() : [config.options.fileHeader],
  );
  const breakpointTokens: TransformedToken[] = dictionary.allTokens.reduce((acc, token) => {
    if (token.isSource && token.type === "breakpoint") {
      acc.push({
        ...token,
        value: transformValueMathSum(token),
      });
    }
    return acc;
  }, []);
  if (breakpointTokens.length > 0) {
    const breakpointArray: string[] = [];
    const breakpointsString = breakpointTokens
      .reduce((acc, token) => {
        if (typeof token.value === "string" || typeof token.value === "number") {
          acc.push(formatTokenOutput(token, format));
        } else if (isObjectOfStringsOrNumbers(token.value)) {
          Object.entries(token.value).forEach(([nameSuffix, value]) => {
            const attributes = { ...token.attributes, nameSuffix };
            acc.push(formatTokenOutput({ ...token, value, attributes }, format));
          });
        }
        return acc;
      }, breakpointArray)
      .join("\n");

    const content = [...fileHeader, breakpointsString].join("\n");

    await createFileIfNotExists(filePath, content);
  }

  return;
};

export const ActionGenerateBreakpoints = "calcite/action/generateBreakpoints";
export const registerGenerateBreakpoints = (sd: typeof StyleDictionary): void =>
  sd.registerAction({
    name: ActionGenerateBreakpoints,
    do: generateBreakpoints,
    undo: cleanBreakpoints,
  });
