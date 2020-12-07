let globalError: jest.SpyInstance;

beforeEach(() => {
  globalError = jest.spyOn(global.console, "error");
});

afterEach(() => {
  expect(globalError).not.toHaveBeenCalled();
  globalError.mockReset();
  globalError.mockRestore();
});
