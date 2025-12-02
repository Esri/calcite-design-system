import { beforeAll } from "vitest";
import { css } from "../../../support/formatting";

beforeAll(() => {
  const style = document.createElement("style");
  style.innerHTML = css`
    :root {
      --calcite-duration-factor: 0;
    }
  `;
  document.head.append(style);
});
