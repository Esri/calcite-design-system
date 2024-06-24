import { E2EPage } from "@stencil/core/testing";

const testErrorMessages: string[] = [];

jest.mock("@stencil/core/testing", () => {
  const originalModule = jest.requireActual("@stencil/core/testing");
  return {
    ...originalModule,
    newE2EPage: async (options) => {
      const page: E2EPage = await originalModule.newE2EPage(options);

      page.on("console", async (message) => {
        if (!message.text().includes("JSHandle@error")) {
          return;
        }

        const messages = await Promise.all(message.args().map((arg) => arg.getProperty("message")));

        testErrorMessages.push(`${messages.filter(Boolean)}`);
      });

      return page;
    },
  };
});

beforeEach(() => (testErrorMessages.length = 0));

// eslint-disable-next-line jest/no-standalone-expect
afterEach(() => expect(testErrorMessages).toHaveLength(0));

afterAll(() => {
  jest.restoreAllMocks();
});
