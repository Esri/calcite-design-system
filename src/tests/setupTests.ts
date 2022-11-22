import util from "util";
util.inspect.defaultOptions.depth = null; // allow more info from errors to show in log

let globalError: jest.SpyInstance;

beforeAll(() => {
  globalError = jest.spyOn(global.console, "error");
});

beforeEach(() => globalError.mockClear());

afterEach(async () => {
  if (globalError.mock.calls.length > 0) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
  }
  // eslint-disable-next-line jest/no-standalone-expect
  expect(globalError).not.toHaveBeenCalled();
});

afterAll(() => {
  globalError.mockClear();
  globalError.mockRestore();
});
