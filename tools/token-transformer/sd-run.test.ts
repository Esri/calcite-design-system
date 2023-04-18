import { run } from "./sd-run";
import { existsSync } from "node:fs";

describe('integration tests', () => {
  beforeAll(async () => {
    await run();
  });

  it('should generate a build directory', () => {
    expect(existsSync('build')).toBe(true);
  })
});
