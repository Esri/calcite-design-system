export function getElementDir(el) {
    return getElementProp(el, "dir", "ltr");
}
export function getElementTheme(el) {
    return getElementProp(el, "theme", "light");
}
export function getElementProp(el, prop, value) {
    const closestWithProp = el.closest(`[${prop}]`);
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
export function focusElement(el) {
    if (!el) {
        return;
    }
    "setFocus" in el && typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}
export function getSlotted(element, slotName, options) {
    const slotSelector = `[slot="${slotName}"]`;
    if (options === null || options === void 0 ? void 0 : options.all) {
        return queryMultiple(element, slotSelector, options);
    }
    return querySingle(element, slotSelector, options);
}
function queryMultiple(element, slotSelector, options) {
    let matches = Array.from(element.querySelectorAll(slotSelector));
    matches = options && options.direct === false ? matches : matches.filter((el) => el.parentElement === element);
    const selector = options === null || options === void 0 ? void 0 : options.selector;
    return selector ? matches.map((item) => item.querySelector(selector)).filter((match) => !!match) : matches;
}
function querySingle(element, slotSelector, options) {
    let match = element.querySelector(slotSelector);
    match = options && options.direct === false ? match : (match === null || match === void 0 ? void 0 : match.parentElement) === element ? match : null;
    const selector = options === null || options === void 0 ? void 0 : options.selector;
    return selector ? match.querySelector(selector) : match;
}
