import { existsSync } from "fs";
import { transformTokens } from "."

describe('Token transformer integration tests', () => {
  beforeAll(() => {
    return transformTokens();
  })

  it('should build', () => {
    expect(existsSync('build')).toBeTruthy();
  })
})
