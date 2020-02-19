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
function getElementTheme(el) {
    return getElementProp(el, "theme", "light");
}
function getElementProp(el, prop, value) {
    var closestWithProp = el.closest("[" + prop + "]");
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
function getSlottedElements(wrapperEl, selector) {
    var slot = wrapperEl.querySelector("slot");
    var elements = slot ? slot.assignedElements() : wrapperEl.children;
    return nodeListToArray(elements).filter(function (el) { return el.matches(selector); });
}
var HOST_CSS = {
    hydratedInvisible: "hydrated--invisible"
};
export { HOST_CSS as H, getElementTheme as a, getElementProp as b, getSlottedElements as c, getElementDir as g, nodeListToArray as n };
