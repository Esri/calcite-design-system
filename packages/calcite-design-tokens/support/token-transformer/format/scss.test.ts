import '../../../_mocks_/support/token-transformer/format/scss';
import { tokens as mockTokens } from "../../../_mocks_/mockStyleDictionaryTokens";
import * as platformMocks from "../../../_mocks_/mockPlatformTokens";
import { formatSCSS } from "./scss";

const mock = {
  dictionary: mockTokens,
  file: {
    destination: "light.scss"
  },
  formattedTokenSet: [
    ...platformMocks.scssBase,
    "",
    ...platformMocks.scssMixins,
    "",
    ...platformMocks.scssCSSRoot("light")
  ],
  options: {}
};

/**
 * END Test Setup
 */
let scssFile;
describe("formatting SCSS Variable output", () => {
  beforeAll(() => {
    scssFile = formatSCSS({ dictionary: mock.dictionary, file: mock.file, options: mock.options });
  });
  it("should transform token names and values into SCSS variables", () => {
    expect(scssFile).toContain(platformMocks.scssBase[0]);
    expect(scssFile).toContain(platformMocks.scssBase[1]);
  });
});
