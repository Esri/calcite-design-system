'use strict';

// turn a domNodeList into an array
function nodeListToArray(domNodeList) {
    if (Array.isArray(domNodeList)) {
        return domNodeList;
    }
    else {
        return Array.prototype.slice.call(domNodeList);
    }
}
function getElementDir(el) {
    return getElementProp(el, "dir", "ltr");
}
function getElementProp(el, prop, value) {
    const closestWithProp = el.closest(`[${prop}]`);
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
function focusElement(el) {
    if (!el) {
        return;
    }
    typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}
function getSlottedElements(wrapperEl, selector) {
    const slot = wrapperEl.querySelector("slot");
    const elements = slot ? slot.assignedElements() : wrapperEl.children;
    return nodeListToArray(elements).filter(el => el.matches(selector));
}
function getDescribedByElement(element) {
    const id = element && element.getAttribute("aria-describedby");
    return (id && document.getElementById(id)) || null;
}
const HOST_CSS = {
    hydratedInvisible: "hydrated--invisible"
};

exports.HOST_CSS = HOST_CSS;
exports.focusElement = focusElement;
exports.getDescribedByElement = getDescribedByElement;
exports.getElementDir = getElementDir;
exports.getElementProp = getElementProp;
exports.getSlottedElements = getSlottedElements;
exports.nodeListToArray = nodeListToArray;
