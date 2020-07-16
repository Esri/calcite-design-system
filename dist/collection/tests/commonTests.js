import { newE2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { config } from "../../stencil.config";
export const HYDRATED_ATTR = config.hydratedFlag.name;
expect.extend(toHaveNoViolations);
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
    return newE2EPage({
        html: isHTML(componentTagOrHTML)
            ? componentTagOrHTML
            : `<${componentTag}><${componentTag}/>`,
        failOnConsoleError: true,
    });
}
export async function accessible(componentTagOrHTML) {
    const page = await simplePageSetup(componentTagOrHTML);
    await page.addScriptTag({ path: require.resolve("axe-core") });
    expect(await page.evaluate(async (componentTag) => window.axe.run(componentTag), getTag(componentTagOrHTML))).toHaveNoViolations();
}
export async function renders(componentTagOrHTML, invisible) {
    const page = await simplePageSetup(componentTagOrHTML);
    const element = await page.find(getTag(componentTagOrHTML));
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(await element.isVisible()).toBe(!invisible);
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
