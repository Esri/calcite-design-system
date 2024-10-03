let globalError: jest.SpyInstance;
let globalInfo: jest.SpyInstance;

beforeAll(() => {
  globalError = jest.spyOn(global.console, "error");
  globalInfo = jest.spyOn(global.console, "info").mockImplementation(() => null);
});

beforeEach(() => {
  globalError.mockClear();
  globalInfo.mockClear();
});

// eslint-disable-next-line jest/no-standalone-expect
afterEach(() => expect(globalError).not.toHaveBeenCalled());

afterAll(() => {
  globalError.mockRestore();
  globalInfo.mockRestore();
});
