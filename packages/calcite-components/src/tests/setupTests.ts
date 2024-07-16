let globalError: jest.SpyInstance;
let globalLog: jest.SpyInstance;

beforeAll(() => {
  globalError = jest.spyOn(global.console, "error");
  globalLog = jest.spyOn(global.console, "info").mockImplementation(() => null);
});

beforeEach(() => {
  globalError.mockClear();
  globalLog.mockClear();
});

// eslint-disable-next-line jest/no-standalone-expect
afterEach(() => expect(globalError).not.toHaveBeenCalled());

afterAll(() => {
  globalError.mockRestore();
  globalLog.mockRestore();
});
