const registerTransforms = jest.fn().mockResolvedValue(true);

jest.mock("@tokens-studio/sd-transforms", () => {
  const originalModule = jest.requireActual("@tokens-studio/sd-transforms");
  return {
    __esModule: true,
    ...originalModule,
    registerTransforms
  };
});

const registerFormat = jest.fn();
const registerFilter = jest.fn();
const registerTransform = jest.fn();
const cleanAllPlatforms = jest.fn();
const buildAllPlatforms = jest.fn();
const extend = jest.fn().mockReturnValue({
  cleanAllPlatforms,
  buildAllPlatforms
});

const mockStyleDictionary = jest.fn().mockReturnValue({
  registerFormat,
  registerTransform,
  registerFilter,
  extend
});

jest.mock("style-dictionary", mockStyleDictionary);

const mockFileName = "mock-file-name";
const mockHeadlessFileName = "mock-headless-file-name";
const parseName = jest.fn((name) => {
  return name.includes("headless") ? mockHeadlessFileName : mockFileName;
});
jest.mock("./utils/parseName.js", () => {
  const originalModule = jest.requireActual("./utils/parseName.js");
  return {
    __esModule: true,
    ...originalModule,
    parseName
  };
});

import { run } from "./sd-run";

const mockTokenDir = "mock-tokens";
const mockBuildPath = "mock-dist";
const mockTheme = {
  enabled: ["set1", "set2"],
  source: ["set3", "set4", "set5"],
  name: "fake-theme",
  disabled: []
};
const mockHeadlessTheme = {
  enabled: ["set1", "set2"],
  source: ["set3", "set4", "set5"],
  name: "fake-headless-theme",
  disabled: []
};
const mockStyleDictionaryInclude = ["mock-tokens/set3.json", "mock-tokens/set4.json", "mock-tokens/set5.json"];
const mockStyleDictionarySource = ["mock-tokens/set1.json", "mock-tokens/set2.json"];
const mockStyleDictionaryOptions = {
  enabled: mockTheme.enabled,
  source: mockTheme.source,
  disabled: mockTheme.disabled,
  outputReferences: false,
  sourceReferencesOnly: false
};

const mockStyleDictionaryHeadlessOptions = {
  enabled: mockTheme.enabled,
  source: mockTheme.source,
  disabled: mockTheme.disabled,
  outputReferences: true,
  sourceReferencesOnly: false
};

const mockFormatter = jest.fn();
const mockCamelNameTransformer = jest.fn();
const mockKebabNameTransformer = jest.fn();
const mockFilterMatcher = jest.fn();
const mockParserReturnValue = jest.fn();
const mockParser = jest.fn().mockReturnValue(mockParserReturnValue);
c;
describe("Style Dictionary Runner", () => {
  beforeAll(() => {
    run(mockTokenDir, mockBuildPath, mockTheme);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it.skip("should call StyleDictionary.extend with a parsed fileName", () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        platforms: {
          scss: {
            files: [
              {
                destination: `${mockFileName}.scss`
              }
            ]
          }
        }
      })
    );
  });
  it.skip('should generate "include" files from themes source list', () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        include: mockStyleDictionaryInclude
      })
    );
  });

  it.skip('should generate "source" files from themes enabled list', () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        source: mockStyleDictionarySource
      })
    );
  });

  it.skip('should generate an "options" object from theme', () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        platforms: {
          scss: {
            files: [
              {
                options: mockStyleDictionaryOptions
              }
            ]
          }
        }
      })
    );
  });

  it.skip('should call "registerTransforms" from Token Studio', () => {
    expect(registerTransforms).toHaveBeenCalledWith(mockStyleDictionary, { expand: false });
  });

  it.skip('should register the "calcite/scss" format', () => {
    expect(registerFormat).toHaveBeenCalledWith({
      name: "calcite/scss",
      formatter: mockFormatter
    });
  });

  it.skip('should register the "name/calcite/camel" transformer', () => {
    expect(registerFormat).toHaveBeenCalledWith({
      name: "name/calcite/camel",
      type: "name",
      transformer: mockCamelNameTransformer
    });
  });

  it.skip('should register the "name/calcite/kebab" transformer', () => {
    expect(registerFormat).toHaveBeenCalledWith({
      name: "name/calcite/kebab",
      type: "name",
      transformer: mockKebabNameTransformer
    });
  });

  it.skip('should register the "filterSource" filter', () => {
    expect(registerFormat).toHaveBeenCalledWith({
      name: "filterSource",
      matcher: mockFilterMatcher
    });
  });

  it.skip('should transform tokens for the "CSS" and "SCSS" platforms', () => {
    const call = extend.mock.calls[0][0];
    const platforms = Object.keys(call.platforms);

    expect(platforms.length).toBe(2);
    expect(platforms).toMatchObject(["css", "scss"]);
  });

  it.skip("should call parser", () => {
    expect(mockParser).toHaveBeenCalledWith(mockStyleDictionaryInclude, mockTheme.source, mockTheme.enabled);
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        parsers: [
          {
            parse: mockParserReturnValue
          }
        ]
      })
    );
  });

  it.skip("should clean and build all platforms", () => {
    expect(cleanAllPlatforms).toHaveBeenCalled();
    expect(buildAllPlatforms).toHaveBeenCalled();
  });

  it.skip("should call scss transforms", () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        platforms: {
          scss: {
            transforms: [
              "ts/descriptionToComment",
              "ts/size/px",
              "ts/opacity",
              "ts/size/lineheight",
              "ts/type/fontWeight",
              "ts/resolveMath",
              "ts/size/css/letterspacing",
              "ts/color/css/hexrgba",
              "ts/color/modifiers",
              "name/calcite/kebab"
            ]
          }
        }
      })
    );
  });

  it.skip("should call css transforms", () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        platforms: {
          css: {
            transforms: [
              "ts/descriptionToComment",
              "ts/size/px",
              "ts/opacity",
              "ts/size/lineheight",
              "ts/type/fontWeight",
              "ts/resolveMath",
              "ts/size/css/letterspacing",
              "ts/color/css/hexrgba",
              "ts/color/modifiers",
              "name/calcite/kebab"
            ]
          }
        }
      })
    );
  });

  it.skip("should not throw an error", () => {
    expect(console.error).not.toHaveBeenCalled();
  });
});

describe("Style Dictionary Runner for Headless files", () => {
  beforeAll(() => {
    run(mockTokenDir, mockBuildPath, mockHeadlessTheme);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.skip('should generate an "options" object from theme', () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        platforms: {
          scss: {
            files: [
              {
                options: mockStyleDictionaryHeadlessOptions
              }
            ]
          }
        }
      })
    );
  });

  it.skip("should use filter on headless theme", () => {
    expect(extend).toHaveBeenCalledWith(
      expect.objectContaining({
        platforms: {
          scss: {
            files: [
              {
                filter: "filterSource"
              }
            ]
          }
        }
      })
    );
  });
});
