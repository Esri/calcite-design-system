const util = require("util");
util.inspect.defaultOptions.depth = null; // allow more info from errors to show in log

let globalError: jest.SpyInstance;

beforeAll(() => {
  globalError = jest.spyOn(global.console, "error");
});

beforeEach(() => globalError.mockClear());

// eslint-disable-next-line jest/no-standalone-expect
afterEach(async () => {
  if (globalError.mock.calls.length > 0) {
    await new Promise<void>((resolve, reject) => setTimeout(() => resolve(), 10000));
  }

  expect(globalError).not.toHaveBeenCalled();
});

afterAll(() => {
  globalError.mockClear();
  globalError.mockRestore();
});
