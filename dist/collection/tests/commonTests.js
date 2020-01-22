import { newE2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);
async function simplePageSetup(componentTag) {
    const page = await newE2EPage();
    await page.setContent(`<${componentTag}><${componentTag}/>`);
    return page;
}
export async function renders(componentTag) {
    const page = await simplePageSetup(componentTag);
    const element = await page.find(componentTag);
    expect(element).toHaveClass("hydrated");
    expect(await element.isVisible()).toBe(true);
}
export async function reflects(componentTag, propsToTest) {
    const page = await simplePageSetup(componentTag);
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
export async function defaults(componentTag, propsToTest) {
    const page = await simplePageSetup(componentTag);
    const element = await page.find(componentTag);
    for (const propAndValue of propsToTest) {
        const { propertyName, defaultValue } = propAndValue;
        const prop = await element.getProperty(propertyName);
        expect(prop).toBe(defaultValue);
    }
}
export async function hidden(componentTag) {
    const page = await simplePageSetup(componentTag);
    const element = await page.find(componentTag);
    element.setAttribute("hidden", "");
    await page.waitForChanges();
    expect(await element.isVisible()).toBe(false);
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
export async function accessible(componentTagOrHTML) {
    const page = await simplePageSetup(getTag(componentTagOrHTML));
    await page.addScriptTag({ path: require.resolve("axe-core") });
    expect(await page.evaluate(async (componentTag) => window.axe.run(componentTag), getTag(componentTagOrHTML))).toHaveNoViolations();
}
