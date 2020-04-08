// turn a domNodeList into an array
export function nodeListToArray(domNodeList) {
    if (Array.isArray(domNodeList)) {
        return domNodeList;
    }
    else {
        return Array.prototype.slice.call(domNodeList);
    }
}
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
    typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}
export function hasSlottedContent(el) {
    const assignedNodes = el && el.assignedNodes();
    return assignedNodes && assignedNodes.length > 0;
}
export function getSlottedElements(wrapperEl, selector) {
    const slot = wrapperEl.querySelector("slot");
    const elements = slot ? slot.assignedElements() : wrapperEl.children;
    return nodeListToArray(elements).filter(el => el.matches(selector));
}
export function getDescribedByElement(element) {
    const id = element && element.getAttribute("aria-describedby");
    return (id && document.getElementById(id)) || null;
}
export const HOST_CSS = {
    hydratedInvisible: "hydrated--invisible"
};
