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
    return (el.closest("[dir='rtl']") && "rtl") || "ltr";
}
