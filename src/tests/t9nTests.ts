import { E2EPage } from "@stencil/core/testing";
import { simplePageSetup } from "./commonTests";

export async function defaultMessages(componentTagOrHTML: string, page?: E2EPage): Promise<void> {
  if (!page) {
    page = await simplePageSetup(componentTagOrHTML);
  }
  const component = await page.find(componentTagOrHTML);
  await page.waitForChanges();
  const messages = await component.getProperty("messages");
  expect(Object.keys(messages).length).not.toBe(0);
}

export async function withIntlPropsAsAttributes(page: E2EPage, componentTagOrHTML: string): Promise<void> {
  const component = await page.find(componentTagOrHTML);

  const props = await page.$eval(componentTagOrHTML, (element: Element) => {
    const intlProps = [];
    for (const key in element) {
      if (key.startsWith("intl") && !!element[key]) {
        intlProps.push(key.replace("intl", "").toLowerCase());
      }
    }
    return intlProps;
  });

  const messages = await component.getProperty("messages");

  for (const prop in props) {
    expect(await component.getProperty(`intl${prop.toUpperCase()}`)).toEqual(messages.prop);
  }
}

export async function overrideMessages(
  componentTagOrHTML: string,
  messageOverrides: Record<string, string>,
  page?: E2EPage
): Promise<void> {
  if (!page) {
    page = await simplePageSetup(componentTagOrHTML);
  }

  const component = await page.find(componentTagOrHTML);
  component.setProperty("messageOverrides", messageOverrides);
  await page.waitForChanges();

  const messages = await component.getProperty("messages");

  for (const prop in messageOverrides) {
    expect(messages[prop]).toEqual(messageOverrides[prop]);
  }
}
