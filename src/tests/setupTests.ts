let globalError: jest.SpyInstance;

beforeAll(() => {
  globalError = jest.spyOn(global.console, "error");
});

beforeEach(() => globalError.mockClear());

// eslint-disable-next-line jest/no-standalone-expect
afterEach(() => expect(globalError).not.toHaveBeenCalled());

afterAll(() => {
  globalError.mockClear();
  globalError.mockRestore();
});
