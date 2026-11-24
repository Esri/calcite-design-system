import { beforeAll, inject } from "vitest";

declare module "vitest" {
  interface ProvidedContext {
    timeZone: string;
  }
}

beforeAll(() => {
  const expectedTimeZone = inject("timeZone");
  const actualTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (actualTimeZone !== expectedTimeZone) {
    throw new Error(`Expected browser timezone "${expectedTimeZone}", received "${actualTimeZone}".`);
  }
});
