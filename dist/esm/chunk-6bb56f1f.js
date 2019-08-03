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
    return (el.closest("[dir='rtl']") && "rtl") || "ltr";
}
function getElementTheme(el) {
    return (el.closest("[theme='dark']") && "dark") || "light";
}
function hasSlottedContent(el) {
    const assignedNodes = el && el.assignedNodes();
    return assignedNodes && assignedNodes.length > 0;
}

export { getElementTheme as a, getElementDir as g, hasSlottedContent as h, nodeListToArray as n };
