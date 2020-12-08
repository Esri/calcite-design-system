let globalError: jest.SpyInstance;

beforeAll(() => {
  globalError = jest.spyOn(global.console, "error");
});

beforeEach(() => globalError.mockClear());

afterEach(() => expect(globalError).not.toHaveBeenCalled());

afterAll(() => {
  globalError.mockClear();
  globalError.mockRestore();
});
