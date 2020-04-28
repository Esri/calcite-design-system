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
function focusElement(el) {
    if (!el) {
        return;
    }
    typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}
function getSlottedElements(wrapperEl, selector) {
    var slot = wrapperEl.querySelector("slot");
    var elements = slot ? slot.assignedElements() : wrapperEl.children;
    return nodeListToArray(elements).filter(function (el) { return el.matches(selector); });
}
function getDescribedByElement(element) {
    var id = element && element.getAttribute("aria-describedby");
    return (id && document.getElementById(id)) || null;
}
var HOST_CSS = {
    hydratedInvisible: "hydrated--invisible"
};
export { HOST_CSS as H, getElementTheme as a, getElementProp as b, getDescribedByElement as c, getSlottedElements as d, focusElement as f, getElementDir as g, nodeListToArray as n };
