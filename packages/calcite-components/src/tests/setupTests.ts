const testErrorMessages: string[] = [];

beforeEach(() => (testErrorMessages.length = 0));

// eslint-disable-next-line jest/no-standalone-expect
afterEach(() => expect(testErrorMessages).toHaveLength(0));

afterAll(() => {
  jest.restoreAllMocks();
});
