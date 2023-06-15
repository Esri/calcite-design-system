import { ThemeFileInterface, getThemes } from "./getThemes";

const mockThemes: ThemeFileInterface[] = [
  {
    name: "fake-name",
    id: "0",
    selectedTokenSets: {
      tokenFile1: "enabled",
      tokenFile2: "source",
      tokenFile3: "disabled"
    }
  },
  {
    name: "fake-other-name",
    id: "1",
    selectedTokenSets: {
      tokenFile2: "enabled",
      tokenFile3: "source",
      tokenFile4: "disabled"
    }
  }
];

const mockTransformedThemes = [
  {
    name: "fake-name",
    id: "0",
    disabled: ["tokenFile3"],
    enabled: ["tokenFile1"],
    source: ["tokenFile2"]
  },
  {
    name: "fake-other-name",
    id: "1",
    disabled: ["tokenFile4"],
    enabled: ["tokenFile2"],
    source: ["tokenFile3"]
  }
];

describe("Get themes", () => {
  it("should map over each theme and return an array of theme objects", async () => {
    const testThemes = await getThemes(mockThemes);
    expect(testThemes).toMatchObject(mockTransformedThemes);
  });
});
