import { beforeAll } from "vitest";

beforeAll(() => {
  const style = document.createElement("style");
  style.innerHTML = `
    :root {
    --calcite-duration-factor: 0;
    }
  `;
  document.head.append(style);
});
