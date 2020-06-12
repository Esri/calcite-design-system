import { newE2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);
async function setUpPage(content) {
    const page = await newE2EPage();
    await page.setContent(content);
    return page;
}
function isHTML(tagOrHTML) {
    return tagOrHTML.trim().startsWith("<");
}
function getTag(tagOrHTML) {
    if (isHTML(tagOrHTML)) {
        const regex = /[>\s]/;
        const trimmedTag = tagOrHTML.trim();
        return trimmedTag.substring(1, trimmedTag.search(regex));
    }
    return tagOrHTML;
}
async function simplePageSetup(componentTagOrHTML) {
    const componentTag = getTag(componentTagOrHTML);
    return setUpPage(isHTML(componentTagOrHTML)
        ? componentTagOrHTML
        : `<${componentTag}><${componentTag}/>`);
}
export async function accessible(componentTagOrHTML) {
    const page = await simplePageSetup(componentTagOrHTML);
    await page.addScriptTag({ path: require.resolve("axe-core") });
    expect(await page.evaluate(async (componentTag) => window.axe.run(componentTag), getTag(componentTagOrHTML))).toHaveNoViolations();
}
export async function renders(componentTagOrHTML) {
    const page = await simplePageSetup(componentTagOrHTML);
    const element = await page.find(getTag(componentTagOrHTML));
    expect(element).toHaveClass("hydrated");
    expect(await element.isVisible()).toBe(true);
}
export async function reflects(componentTagOrHTML, propsToTest) {
    const page = await simplePageSetup(componentTagOrHTML);
    const componentTag = getTag(componentTagOrHTML);
    const element = await page.find(componentTag);
    for (const propAndValue of propsToTest) {
        const { propertyName, value } = propAndValue;
        const componentAttributeSelector = `${componentTag}[${propertyName}]`;
        element.setProperty(propertyName, value);
        await page.waitForChanges();
        expect(await page.find(componentAttributeSelector)).toBeTruthy();
        if (typeof value === "boolean") {
            element.setProperty(propertyName, !value);
            await page.waitForChanges();
            expect(await page.find(componentAttributeSelector)).toBeNull();
            element.setProperty(propertyName, value);
            await page.waitForChanges();
            expect(await page.find(componentAttributeSelector)).toBeTruthy();
        }
    }
}
export async function defaults(componentTagOrHTML, propsToTest) {
    const page = await simplePageSetup(componentTagOrHTML);
    const element = await page.find(getTag(componentTagOrHTML));
    for (const propAndValue of propsToTest) {
        const { propertyName, defaultValue } = propAndValue;
        const prop = await element.getProperty(propertyName);
        expect(prop).toEqual(defaultValue);
    }
}
export async function hidden(componentTagOrHTML) {
    const page = await simplePageSetup(componentTagOrHTML);
    const element = await page.find(getTag(componentTagOrHTML));
    element.setAttribute("hidden", "");
    await page.waitForChanges();
    expect(await element.isVisible()).toBe(false);
}
