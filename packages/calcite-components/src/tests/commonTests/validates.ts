import { toHaveNoViolations } from "jest-axe";
import { HtmlValidate } from "html-validate/node";
import { getTagAndPage } from "./utils";
import { ComponentTestSetup } from "./interfaces";

expect.extend(toHaveNoViolations);

const validator = new HtmlValidate();

export function validates(componentTestSetup: ComponentTestSetup): void {
  it("is valid HTML", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    const component = await page.find(tag);

    const markup = component.shadowRoot.innerHTML.replaceAll(`=""`, "");

    const validation = await validator.validateString(markup);

    if (validation.results.length > 0) {
      const message = validation.results
        .map((result) => result.messages.map((message) => `Error: ${message.message}`).join("\n"))
        .concat(`Source:\n ${markup}`)
        .join("\n");
      throw new Error(message);
    }
  });
}
