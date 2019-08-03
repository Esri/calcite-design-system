'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {};
/**
 * Namespaces
 */
const SVG_NS = 'http://www.w3.org/2000/svg';

const isDef = (v) => v != null;
const toLowerCase = (str) => str.toLowerCase();
const isComplexType = (o) => ['object', 'function'].includes(typeof o);

const parsePropertyValue = (propValue, propType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if ( propType & 4 /* Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return (propValue === 'false' ? false : propValue === '' || !!propValue);
        }
        if ( propType & 2 /* Number */) {
            // force it to be a number
            return parseFloat(propValue);
        }
        if ( propType & 1 /* String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};

const CONTENT_REF_ID = 'r';
const ORG_LOCATION_ID = 'o';
const SLOT_NODE_ID = 's';
const TEXT_NODE_ID = 't';
const HYDRATED_CLASS = 'hydrated';
const HYDRATE_ID = 's-id';
const HYDRATE_CHILD_ID = 'c-id';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
    let scopeId = getScopeId(cmpMeta.$tagName$);
    let style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = (styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc);
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            let appliedStyles = rootAppliedStyles.get(styleContainerNode);
            let styleElm;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, appliedStyles = new Set());
            }
            if (!appliedStyles.has(scopeId)) {
                {
                    {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    {
                        styleElm.setAttribute(HYDRATE_ID, scopeId);
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if ( !styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [
                ...styleContainerNode.adoptedStyleSheets,
                style
            ];
        }
    }
    return scopeId;
};
const attachStyles = (elm, cmpMeta, mode) => {
    const styleId = addStyle( elm.getRootNode(), cmpMeta);
    if ( cmpMeta.$flags$ & 10 /* needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = styleId;
        elm.classList.add(styleId + '-h');
    }
};
const getScopeId = (tagName, mode) => 'sc-' + ( tagName);

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
    let child = null;
    let simple = false;
    let lastSimple = false;
    let key;
    let slotName;
    let vNodeChildren = [];
    const walk = (c) => {
        for (let i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if (simple = typeof nodeName !== 'function' && !isComplexType(child)) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? { $flags$: 0, $text$: child } : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if ( vnodeData) {
        // normalize class / classname attributes
        {
            key = vnodeData.key || undefined;
        }
        {
            slotName = vnodeData.name;
        }
        {
            const classData = vnodeData.className || vnodeData.class;
            if (classData) {
                vnodeData.class = typeof classData !== 'object'
                    ? classData
                    : Object.keys(classData)
                        .filter(k => classData[k])
                        .join(' ');
            }
        }
    }
    if ( typeof nodeName === 'function') {
        // nodeName is a functional component
        return nodeName(vnodeData, vNodeChildren, vdomFnUtils);
    }
    const vnode = {
        $flags$: 0,
        $tag$: nodeName,
        $children$: vNodeChildren.length > 0 ? vNodeChildren : null,
        $elm$: undefined,
        $attrs$: vnodeData,
    };
    {
        vnode.$key$ = key;
    }
    {
        vnode.$name$ = slotName;
    }
    return vnode;
};
const Host = {};
const isHost = (node) => {
    return node && node.$tag$ === Host;
};
const vdomFnUtils = {
    'forEach': (children, cb) => children.map(convertToPublic).forEach(cb),
    'map': (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate)
};
const convertToPublic = (node) => {
    return {
        vattrs: node.$attrs$,
        vchildren: node.$children$,
        vkey: node.$key$,
        vname: node.$name$,
        vtag: node.$tag$,
        vtext: node.$text$
    };
};
const convertToPrivate = (node) => {
    return {
        $flags$: 0,
        $attrs$: node.vattrs,
        $children$: node.vchildren,
        $key$: node.vkey,
        $name$: node.vname,
        $tag$: node.vtag,
        $text$: node.vtext
    };
};

/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
    if (oldValue === newValue) {
        return;
    }
    if ( memberName === 'class') {
        const classList = elm.classList;
        parseClassList(oldValue).forEach(cls => classList.remove(cls));
        parseClassList(newValue).forEach(cls => classList.add(cls));
    }
    else if ( memberName === 'style') {
        // update style attribute, css properties and values
        {
            for (const prop in oldValue) {
                if (!newValue || newValue[prop] == null) {
                    {
                        elm.style[prop] = '';
                    }
                }
            }
        }
        for (const prop in newValue) {
            if (!oldValue || newValue[prop] !== oldValue[prop]) {
                {
                    elm.style[prop] = newValue[prop];
                }
            }
        }
    }
    else if ( memberName === 'key') ;
    else if ( memberName === 'ref') {
        // minifier will clean this up
        if (newValue) {
            newValue(elm);
        }
    }
    else if ( memberName.startsWith('on') && !isMemberInElement(elm, memberName)) {
        // Event Handlers
        // so if the member name starts with "on" and the 3rd characters is
        // a capital letter, and it's not already a member on the element,
        // then we're assuming it's an event listener
        if (isMemberInElement(elm, toLowerCase(memberName))) {
            // standard event
            // the JSX attribute could have been "onMouseOver" and the
            // member name "onmouseover" is on the element's prototype
            // so let's add the listener "mouseover", which is all lowercased
            memberName = toLowerCase(memberName.substring(2));
        }
        else {
            // custom event
            // the JSX attribute could have been "onMyCustomEvent"
            // so let's trim off the "on" prefix and lowercase the first character
            // and add the listener "myCustomEvent"
            // except for the first character, we keep the event name case
            memberName = toLowerCase(memberName[2]) + memberName.substring(3);
        }
        if (oldValue) {
            plt.rel(elm, memberName, oldValue, false);
        }
        if (newValue) {
            plt.ael(elm, memberName, newValue, false);
        }
    }
    else {
        // Set property if it exists and it's not a SVG
        const isProp = isMemberInElement(elm, memberName);
        const isComplex = isComplexType(newValue);
        const isCustomElement = elm.tagName.includes('-');
        if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
            try {
                if (isCustomElement) {
                    elm[memberName] = newValue;
                }
                else if (elm[memberName] !== newValue || '') {
                    elm[memberName] = newValue || '';
                }
            }
            catch (e) { }
        }
        /**
         * Need to manually update attribute if:
         * - memberName is not an attribute
         * - if we are rendering the host element in order to reflect attribute
         * - if it's a SVG, since properties might not work in <svg>
         * - if the newValue is null/undefined or 'false'.
         */
        const isXlinkNs =  isSvg && (memberName !== (memberName = memberName.replace(/^xlink\:?/, ''))) ? true : false;
        if (newValue == null || newValue === false) {
            if (isXlinkNs) {
                elm.removeAttributeNS(XLINK_NS, toLowerCase(memberName));
            }
            else {
                elm.removeAttribute(memberName);
            }
        }
        else if ((!isProp || (flags & 4 /* isHost */) || isSvg) && !isComplex) {
            newValue = newValue === true ? '' : newValue.toString();
            if (isXlinkNs) {
                elm.setAttributeNS(XLINK_NS, toLowerCase(memberName), newValue);
            }
            else {
                elm.setAttribute(memberName, newValue);
            }
        }
    }
};
const parseClassList = (value) => (!value) ? [] : value.split(/\s+/).filter(c => c);

const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = (newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host) ? newVnode.$elm$.host : newVnode.$elm$;
    const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};

let scopeId;
let contentRef;
let hostTagName;
let useNativeShadowDom = false;
let checkSlotFallbackVisibility = false;
let checkSlotRelocate = false;
let isSvgMode = false;
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
    // tslint:disable-next-line: prefer-const
    let newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    let oldVNode;
    if ( !useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if (newVNode.$tag$ === 'slot') {
            if (scopeId) {
                // scoped css needs to add its scoped id to the parent element
                parentElm.classList.add(scopeId + '-s');
            }
            if (!newVNode.$children$) {
                // slot element does not have fallback content
                // create an html comment we'll use to always reference
                // where actual slot content should sit next to
                newVNode.$flags$ |= 1 /* isSlotReference */;
            }
            else {
                // slot element has fallback content
                // still create an element that "mocks" the slot element
                newVNode.$flags$ |= 2 /* isSlotFallback */;
            }
        }
    }
    if (isDef(newVNode.$text$)) {
        // create text node
        newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else if ( newVNode.$flags$ & 1 /* isSlotReference */) {
        // create a slot reference node
        newVNode.$elm$ =  doc.createComment(`slot-reference:${hostTagName}`) ;
    }
    else {
        // create element
        elm = newVNode.$elm$ = (( (isSvgMode || newVNode.$tag$ === 'svg'))
            ? doc.createElementNS(SVG_NS, newVNode.$tag$)
            : doc.createElement(( newVNode.$flags$ & 2 /* isSlotFallback */) ? 'slot-fb' : newVNode.$tag$));
        {
            isSvgMode = newVNode.$tag$ === 'svg' ? true : (newVNode.$tag$ === 'foreignObject' ? false : isSvgMode);
        }
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if ( isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i, elm);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
        {
            if (newVNode.$tag$ === 'svg') {
                // Only reset the SVG context when we're exiting <svg> element
                isSvgMode = false;
            }
            else if (newVNode.$elm$.tagName === 'foreignObject') {
                // Reenter SVG context when we're exiting <foreignObject> element
                isSvgMode = true;
            }
        }
    }
    {
        newVNode.$elm$['s-hn'] = hostTagName;
        if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
            // remember the content reference comment
            newVNode.$elm$['s-sr'] = true;
            // remember the content reference comment
            newVNode.$elm$['s-cr'] = contentRef;
            // remember the slot name, or empty string for default slot
            newVNode.$elm$['s-sn'] = newVNode.$name$ || '';
            // check if we've got an old vnode for this slot
            oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
            if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                // we've got an old slot vnode and the wrapper is being replaced
                // so let's move the old slot content back to it's original location
                putBackInOriginalLocation(oldParentVNode.$elm$, false);
            }
        }
    }
    return newVNode.$elm$;
};
const putBackInOriginalLocation = (parentElm, recursive) => {
    plt.$flags$ |= 1 /* isTmpDisconnected */;
    const oldSlotChildNodes = parentElm.childNodes;
    for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        const childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
            // // this child node in the old element is from another component
            // // remove this node from the old slot's parent
            // childNode.remove();
            // and relocate it back to it's original location
            parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
            // remove the old original location comment entirely
            // later on the patch function will know what to do
            // and move this to the correct spot in need be
            childNode['s-ol'].remove();
            childNode['s-ol'] = undefined;
            checkSlotRelocate = true;
        }
        if (recursive) {
            putBackInOriginalLocation(childNode, recursive);
        }
    }
    plt.$flags$ &= ~1 /* isTmpDisconnected */;
};
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
    let containerElm = (( parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
    let childNode;
    if ( containerElm.shadowRoot && toLowerCase(containerElm.tagName) === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx, parentElm);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode,  referenceNode(before) );
            }
        }
    }
};
const removeVnodes = (vnodes, startIdx, endIdx, elm) => {
    for (; startIdx <= endIdx; ++startIdx) {
        if (isDef(vnodes[startIdx])) {
            elm = vnodes[startIdx].$elm$;
            callNodeRefs(vnodes[startIdx], true);
            {
                // we're removing this element
                // so it's possible we need to show slot fallback content now
                checkSlotFallbackVisibility = true;
                if (elm['s-ol']) {
                    // remove the original location comment
                    elm['s-ol'].remove();
                }
                else {
                    // it's possible that child nodes of the node
                    // that's being removed are slot nodes
                    putBackInOriginalLocation(elm, true);
                }
            }
            // remove the vnode's element from the dom
            elm.remove();
        }
    }
};
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let idxInOld = 0;
    let i = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let node;
    let elmToMove;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // Vnode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // Vnode moved right
            if ( (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
            }
            patch(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            if ( (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
            }
            patch(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            // createKeyToOldIdx
            idxInOld = -1;
            {
                for (i = oldStartIdx; i <= oldEndIdx; ++i) {
                    if (oldCh[i] && isDef(oldCh[i].$key$) && oldCh[i].$key$ === newStartVnode.$key$) {
                        idxInOld = i;
                        break;
                    }
                }
            }
            if ( idxInOld >= 0) {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.$tag$ !== newStartVnode.$tag$) {
                    node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
                }
                else {
                    patch(elmToMove, newStartVnode);
                    oldCh[idxInOld] = undefined;
                    node = elmToMove.$elm$;
                }
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                // new element
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                {
                    parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        addVnodes(parentElm, (newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$), newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if ( newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
const isSameVnode = (vnode1, vnode2) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.$tag$ === vnode2.$tag$) {
        if ( vnode1.$tag$ === 'slot') {
            return vnode1.$name$ === vnode2.$name$;
        }
        {
            return vnode1.$key$ === vnode2.$key$;
        }
        return true;
    }
    return false;
};
const referenceNode = (node) => {
    // this node was relocated to a new location in the dom
    // because of some other component's slot
    // but we still have an html comment in place of where
    // it's original location was according to it's original vdom
    return (node && node['s-ol']) || node;
};
const parentReferenceNode = (node) => (node['s-ol'] ? node['s-ol'] : node).parentNode;
const patch = (oldVNode, newVNode) => {
    const elm = newVNode.$elm$ = oldVNode.$elm$;
    const oldChildren = oldVNode.$children$;
    const newChildren = newVNode.$children$;
    let defaultHolder;
    {
        // test if we're rendering an svg element, or still rendering nodes inside of one
        // only add this to the when the compiler sees we're using an svg somewhere
        isSvgMode = elm &&
            isDef(elm.parentNode) &&
            elm.ownerSVGElement !== undefined;
        isSvgMode = newVNode.$tag$ === 'svg' ? true : (newVNode.$tag$ === 'foreignObject' ? false : isSvgMode);
    }
    if (!isDef(newVNode.$text$)) {
        // element node
        {
            if ( newVNode.$tag$ === 'slot') ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if ( isDef(oldChildren) && isDef(newChildren)) {
            // looks like there's child vnodes for both the old and new vnodes
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (isDef(newChildren)) {
            // no old child vnodes, but there are new child vnodes to add
            if ( isDef(oldVNode.$text$)) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if ( isDef(oldChildren)) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
    }
    else if ( (defaultHolder = elm['s-cr'])) {
        // this element has slotted content
        defaultHolder.parentNode.textContent = newVNode.$text$;
    }
    else if ( oldVNode.$text$ !== newVNode.$text$) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.textContent = newVNode.$text$;
    }
    if ( isSvgMode && newVNode.$tag$ === 'svg') {
        isSvgMode = false;
    }
};
const updateFallbackSlotVisibility = (elm, childNode, childNodes, i, ilen, j, slotNameAttr, nodeType) => {
    childNodes = elm.childNodes;
    for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode.nodeType === 1 /* ElementNode */) {
            if (childNode['s-sr']) {
                // this is a slot fallback node
                // get the slot name for this slot reference node
                slotNameAttr = childNode['s-sn'];
                // by default always show a fallback slot node
                // then hide it if there are other slots in the light dom
                childNode.hidden = false;
                for (j = 0; j < ilen; j++) {
                    if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
                        // this sibling node is from a different component
                        nodeType = childNodes[j].nodeType;
                        if (slotNameAttr !== '') {
                            // this is a named fallback slot node
                            if (nodeType === 1 /* ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                        else {
                            // this is a default fallback slot node
                            // any element or text node (with content)
                            // should hide the default fallback slot node
                            if (nodeType === 1 /* ElementNode */ || (nodeType === 3 /* TextNode */ && childNodes[j].textContent.trim() !== '')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                    }
                }
            }
            // keep drilling down
            updateFallbackSlotVisibility(childNode);
        }
    }
};
const relocateNodes = [];
const relocateSlotContent = (elm) => {
    // tslint:disable-next-line: prefer-const
    let childNodes = elm.childNodes;
    let ilen = childNodes.length;
    let i = 0;
    let j = 0;
    let nodeType = 0;
    let childNode;
    let node;
    let hostContentNodes;
    let slotNameAttr;
    for (ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr'])) {
            // first got the content reference comment node
            // then we got it's parent, which is where all the host content is in now
            hostContentNodes = node.parentNode.childNodes;
            slotNameAttr = childNode['s-sn'];
            for (j = hostContentNodes.length - 1; j >= 0; j--) {
                node = hostContentNodes[j];
                if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                    // let's do some relocating to its new home
                    // but never relocate a content reference node
                    // that is suppose to always represent the original content location
                    nodeType = node.nodeType;
                    if (((nodeType === 3 /* TextNode */ || nodeType === 8 /* CommentNode */) && slotNameAttr === '') ||
                        (nodeType === 1 /* ElementNode */ && node.getAttribute('slot') === null && slotNameAttr === '') ||
                        (nodeType === 1 /* ElementNode */ && node.getAttribute('slot') === slotNameAttr)) {
                        // it's possible we've already decided to relocate this node
                        if (!relocateNodes.some(r => r.$nodeToRelocate$ === node)) {
                            // made some changes to slots
                            // let's make sure we also double check
                            // fallbacks are correctly hidden or shown
                            checkSlotFallbackVisibility = true;
                            node['s-sn'] = slotNameAttr;
                            // add to our list of nodes to relocate
                            relocateNodes.push({
                                $slotRefNode$: childNode,
                                $nodeToRelocate$: node
                            });
                        }
                    }
                }
            }
        }
        if (childNode.nodeType === 1 /* ElementNode */) {
            relocateSlotContent(childNode);
        }
    }
};
const callNodeRefs = (vNode, isDestroy) => {
    if ( vNode) {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(isDestroy ? null : vNode.$elm$);
        vNode.$children$ && vNode.$children$.forEach(vChild => {
            callNodeRefs(vChild, isDestroy);
        });
    }
};
const renderVdom = (hostElm, hostRef, cmpMeta, renderFnResults) => {
    hostTagName = toLowerCase(hostElm.tagName);
    const oldVNode = hostRef.$vnode$ || { $flags$: 0 };
    const rootVnode = isHost(renderFnResults)
        ? renderFnResults
        : h(null, null, renderFnResults);
    if ( cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.forEach(([propName, attribute]) => rootVnode.$attrs$[attribute] = hostElm[propName]);
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = ( hostElm.shadowRoot || hostElm );
    {
        scopeId = hostElm['s-sc'];
    }
    {
        contentRef = hostElm['s-cr'];
        useNativeShadowDom = supportsShadowDom ;
        // always reset
        checkSlotRelocate = checkSlotFallbackVisibility = false;
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
    {
        if (checkSlotRelocate) {
            relocateSlotContent(rootVnode.$elm$);
            for (let i = 0; i < relocateNodes.length; i++) {
                const relocateNode = relocateNodes[i];
                if (!relocateNode.$nodeToRelocate$['s-ol']) {
                    // add a reference node marking this node's original location
                    // keep a reference to this node for later lookups
                    const orgLocationNode =  doc.createComment(`org-loc`)
                        ;
                    orgLocationNode['s-nr'] = relocateNode.$nodeToRelocate$;
                    relocateNode.$nodeToRelocate$.parentNode.insertBefore((relocateNode.$nodeToRelocate$['s-ol'] = orgLocationNode), relocateNode.$nodeToRelocate$);
                }
            }
            // while we're moving nodes around existing nodes, temporarily disable
            // the disconnectCallback from working
            plt.$flags$ |= 1 /* isTmpDisconnected */;
            for (let i = 0; i < relocateNodes.length; i++) {
                const relocateNode = relocateNodes[i];
                // by default we're just going to insert it directly
                // after the slot reference node
                const parentNodeRef = relocateNode.$slotRefNode$.parentNode;
                let insertBeforeNode = relocateNode.$slotRefNode$.nextSibling;
                let orgLocationNode = relocateNode.$nodeToRelocate$['s-ol'];
                while (orgLocationNode = orgLocationNode.previousSibling) {
                    let refNode = orgLocationNode['s-nr'];
                    if (refNode &&
                        refNode['s-sn'] === relocateNode.$nodeToRelocate$['s-sn'] &&
                        parentNodeRef === refNode.parentNode) {
                        refNode = refNode.nextSibling;
                        if (!refNode || !refNode['s-nr']) {
                            insertBeforeNode = refNode;
                            break;
                        }
                    }
                }
                if ((!insertBeforeNode && parentNodeRef !== relocateNode.$nodeToRelocate$.parentNode) ||
                    (relocateNode.$nodeToRelocate$.nextSibling !== insertBeforeNode)) {
                    // we've checked that it's worth while to relocate
                    // since that the node to relocate
                    // has a different next sibling or parent relocated
                    if (relocateNode.$nodeToRelocate$ !== insertBeforeNode) {
                        // add it back to the dom but in its new home
                        parentNodeRef.insertBefore(relocateNode.$nodeToRelocate$, insertBeforeNode);
                    }
                }
            }
            // done moving nodes around
            // allow the disconnect callback to work again
            plt.$flags$ &= ~1 /* isTmpDisconnected */;
        }
        if (checkSlotFallbackVisibility) {
            updateFallbackSlotVisibility(rootVnode.$elm$);
        }
        // always reset
        relocateNodes.length = 0;
    }
};

const scheduleUpdate = (elm, hostRef, cmpMeta, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
    }
    const instance =  hostRef.$lazyInstance$ ;
    let promise;
    if (isInitialLoad) {
        {
            hostRef.$flags$ |= 256 /* isListenReady */;
        }
        if ( hostRef.$queuedListeners$) {
            hostRef.$queuedListeners$.forEach(([methodName, event]) => safeCall(instance, methodName, event));
            hostRef.$queuedListeners$ = null;
        }
        {
            promise = safeCall(instance, 'componentWillLoad');
        }
    }
    else {
        {
            promise = safeCall(instance, 'componentWillUpdate');
        }
    }
    {
        promise = then(promise, () => safeCall(instance, 'componentWillRender'));
    }
    // there is no ancestorc omponent or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    const update = () => updateComponent(elm, hostRef, cmpMeta, instance, isInitialLoad);
    return then(promise,  () => writeTask(update)
        );
};
const updateComponent = (elm, hostRef, cmpMeta, instance, isInitialLoad) => {
    // updateComponent
    {
        hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
    }
    {
        elm['s-lr'] = false;
    }
    if ( isInitialLoad) {
        // DOM WRITE!
        attachStyles(elm, cmpMeta);
    }
    {
        {
            // tell the platform we're actively rendering
            // if a value is changed within a render() then
            // this tells the platform not to queue the change
            hostRef.$flags$ |= 4 /* isActiveRender */;
            try {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                renderVdom(elm, hostRef, cmpMeta,  instance.render() );
            }
            catch (e) {
                consoleError(e);
            }
            hostRef.$flags$ &= ~4 /* isActiveRender */;
        }
    }
    {
        try {
            // manually connected child components during server-side hydrate
            serverSideConnected(elm);
            if (isInitialLoad && (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */)) {
                // using only during server-side hydrate
                elm['s-sd'] = true;
            }
        }
        catch (e) {
            consoleError(e);
        }
    }
    // set that this component lifecycle rendering has completed
    {
        elm['s-lr'] = true;
    }
    {
        hostRef.$flags$ |= 2 /* hasRendered */;
    }
    if ( elm['s-rc'].length > 0) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        elm['s-rc'].forEach(cb => cb());
        elm['s-rc'].length = 0;
    }
    postUpdateComponent(elm, hostRef);
};
const postUpdateComponent = (elm, hostRef, ancestorsActivelyLoadingChildren) => {
    if ( !elm['s-al']) {
        const instance =  hostRef.$lazyInstance$ ;
        const ancestorComponent = hostRef.$ancestorComponent$;
        {
            safeCall(instance, 'componentDidRender');
        }
        if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
            hostRef.$flags$ |= 64 /* hasLoadedComponent */;
            {
                // DOM WRITE!
                // add the css class that this element has officially hydrated
                elm.classList.add(HYDRATED_CLASS);
            }
            {
                safeCall(instance, 'componentDidLoad');
            }
            {
                hostRef.$onReadyResolve$(elm);
            }
            if ( !ancestorComponent) {
                appDidLoad();
            }
        }
        // load events fire from bottom to top
        // the deepest elements load first then bubbles up
        if ( ancestorComponent) {
            // ok so this element already has a known ancestor component
            // let's make sure we remove this element from its ancestor's
            // known list of child elements which are actively loading
            if (ancestorsActivelyLoadingChildren = ancestorComponent['s-al']) {
                // remove this element from the actively loading map
                ancestorsActivelyLoadingChildren.delete(elm);
                // the ancestor's initializeComponent method will do the actual checks
                // to see if the ancestor is actually loaded or not
                // then let's call the ancestor's initializeComponent method if there's no length
                // (which actually ends up as this method again but for the ancestor)
                if (ancestorsActivelyLoadingChildren.size === 0) {
                    ancestorComponent['s-al'] = undefined;
                    ancestorComponent['s-init']();
                }
            }
            hostRef.$ancestorComponent$ = undefined;
        }
        // ( •_•)
        // ( •_•)>⌐■-■
        // (⌐■_■)
    }
};
const appDidLoad = () => {
    // on appload
    // we have finish the first big initial render
    {
        doc.documentElement.classList.add(HYDRATED_CLASS);
    }
};
const safeCall = (instance, method, arg) => {
    if (instance && instance[method]) {
        try {
            return instance[method](arg);
        }
        catch (e) {
            consoleError(e);
        }
    }
    return undefined;
};
const then = (promise, thenFn) => {
    return promise && promise.then ? promise.then(thenFn) : thenFn();
};
const serverSideConnected = (elm) => {
    const children = elm.children;
    if (children != null) {
        for (let i = 0, ii = children.length; i < ii; i++) {
            const childElm = children[i];
            if (typeof childElm.connectedCallback === 'function') {
                childElm.connectedCallback();
            }
            serverSideConnected(childElm);
        }
    }
};

const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm =  hostRef.$hostElement$ ;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    if (newVal !== oldVal && ( !(flags & 8 /* isConstructingInstance */) || oldVal === undefined)) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if ( hostRef.$lazyInstance$) {
            // get an array of method names of watch functions to call
            if ( cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.forEach(watchMethodName => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            ( hostRef.$lazyInstance$ )[watchMethodName].call(( hostRef.$lazyInstance$ ), newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e);
                        }
                    });
                }
            }
            if ( (flags & (4 /* isActiveRender */ | 2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(elm, hostRef, cmpMeta, false);
            }
        }
    }
};

const proxyComponent = (Cstr, cmpMeta, flags) => {
    if ( cmpMeta.$members$) {
        if ( Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.forEach(([memberName, [memberFlags]]) => {
            if ( ((memberFlags & 31 /* Prop */) ||
                (( flags & 2 /* proxyState */) &&
                    (memberFlags & 32 /* State */)))) {
                // proxyComponent - prop
                Object.defineProperty(prototype, memberName, {
                    get() {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true
                });
            }
            else if ( (flags & 1 /* isElementConstructor */) && (memberFlags & 64 /* Method */)) {
                // proxyComponent - method
                Object.defineProperty(prototype, memberName, {
                    value(...args) {
                        const ref = getHostRef(this);
                        return ref.$onReadyPromise$.then(() => ref.$lazyInstance$[memberName](...args));
                    }
                });
            }
        });
        if ( ( flags & 1 /* isElementConstructor */)) {
            const attrNameToPropName = new Map();
            prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                plt.jmp(() => {
                    const propName = attrNameToPropName.get(attrName);
                    this[propName] = newValue === null && typeof this[propName] === 'boolean'
                        ? false
                        : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if ( m[0] & 512 /* ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};

const addEventListeners = (elm, hostRef, listeners) => {
    hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || [];
    const removeFns = listeners.map(([flags, name, method]) => {
        const target = ( getHostListenerTarget(elm, flags) );
        const handler = hostListenerProxy(hostRef, method);
        const opts = hostListenerOpts(flags);
        plt.ael(target, name, handler, opts);
        return () => plt.rel(target, name, handler, opts);
    });
    return () => removeFns.forEach(fn => fn());
};
const hostListenerProxy = (hostRef, methodName) => {
    return (ev) => {
        {
            if (hostRef.$flags$ & 256 /* isListenReady */) {
                // instance is ready, let's call it's member method for this event
                hostRef.$lazyInstance$[methodName](ev);
            }
            else {
                hostRef.$queuedListeners$.push([methodName, ev]);
            }
        }
    };
};
const getHostListenerTarget = (elm, flags) => {
    if ( flags & 32 /* TargetBody */)
        return doc.body;
    if ( flags & 16 /* TargetParent */)
        return elm.parentElement;
    return elm;
};
const hostListenerOpts = (flags) =>  (flags & 2 /* Capture */) !== 0;

const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ( (hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
        // we haven't initialized this element yet
        hostRef.$flags$ |= 32 /* hasInitializedComponent */;
        if ( hostRef.$modeName$) {
            elm.setAttribute('s-mode', hostRef.$modeName$);
        }
        {
            // lazy loaded components
            // request the component's implementation to be
            // wired up with the host element
            Cstr = loadModule(cmpMeta);
            if (Cstr.then) {
                // Await creates a micro-task avoid if possible
                Cstr = await Cstr;
            }
            if ( !Cstr.isProxied) {
                // we'eve never proxied this Constructor before
                // let's add the getters/setters to its prototype before
                // the first time we create an instance of the implementation
                {
                    cmpMeta.$watchers$ = Cstr.watchers;
                }
                proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
                Cstr.isProxied = true;
            }
            // ok, time to construct the instance
            // but let's keep track of when we start and stop
            // so that the getters/setters don't incorrectly step on data
            {
                hostRef.$flags$ |= 8 /* isConstructingInstance */;
            }
            // construct the lazy-loaded component implementation
            // passing the hostRef is very important during
            // construction in order to directly wire together the
            // host element and the lazy-loaded instance
            try {
                new Cstr(hostRef);
            }
            catch (e) {
                consoleError(e);
            }
            {
                hostRef.$flags$ &= ~8 /* isConstructingInstance */;
            }
            {
                hostRef.$flags$ |= 128 /* isWatchReady */;
            }
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        if ( !Cstr.$isStyleRegistered$ && Cstr.style) {
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            let scopeId = getScopeId(cmpMeta.$tagName$);
            registerStyle(scopeId, style);
            Cstr.$isStyleRegistered$ = true;
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(elm, hostRef, cmpMeta, true);
    if ( ancestorComponent && ancestorComponent['s-lr'] === false && ancestorComponent['s-rc']) {
        // this is the intial load and this component it has an ancestor component
        // but the ancestor component has NOT fired its will update lifecycle yet
        // so let's just cool our jets and wait for the ancestor to continue first
        // this will get fired off when the ancestor component
        // finally gets around to rendering its lazy self
        // fire off the initial update
        ancestorComponent['s-rc'].push(schedule);
    }
    else {
        schedule();
    }
};

const fireConnectedCallback = (instance) => {
    {
        safeCall(instance, 'connectedCallback');
    }
};
const connectedCallback = (elm, cmpMeta) => {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        // connectedCallback
        const hostRef = getHostRef(elm);
        if ( cmpMeta.$listeners$) {
            // initialize our event listeners on the host element
            // we do this now so that we can listening to events that may
            // have fired even before the instance is ready
            hostRef.$rmListeners$ = addEventListeners(elm, hostRef, cmpMeta.$listeners$);
        }
        if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* hasConnected */;
            let hostId;
            if ( !hostId) {
                // initUpdate
                // if the slot polyfill is required we'll need to put some nodes
                // in here to act as original content anchors as we move nodes around
                // host element has been connected to the DOM
                {
                    setContentReference(elm);
                }
            }
            {
                // find the first ancestor component (if there is one) and register
                // this component as one of the actively loading child components for its ancestor
                let ancestorComponent = elm;
                while ((ancestorComponent = (ancestorComponent.parentNode || ancestorComponent.host))) {
                    // climb up the ancestors looking for the first
                    // component that hasn't finished its lifecycle update yet
                    if ( (ancestorComponent['s-init'] && ancestorComponent['s-lr'] === false)) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        hostRef.$ancestorComponent$ = ancestorComponent;
                        // ensure there is an array to contain a reference to each of the child components
                        // and set this component as one of the ancestor's child components it should wait on
                        (ancestorComponent['s-al'] = ancestorComponent['s-al'] || new Set()).add(elm);
                        break;
                    }
                }
            }
            {
                // connectedCallback, taskQueue, initialLoad
                // angular sets attribute AFTER connectCallback
                // https://github.com/angular/angular/issues/18909
                // https://github.com/angular/angular/issues/19940
                nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
            }
        }
        fireConnectedCallback(hostRef.$lazyInstance$);
    }
};
const setContentReference = (elm, contentRefElm) => {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    let crName;
    {
        crName = '';
    }
    contentRefElm = elm['s-cr'] = doc.createComment(crName);
    contentRefElm['s-cn'] = true;
    elm.insertBefore(contentRefElm, elm.firstChild);
};

const createEvent = (ref, name, flags) => {
    const elm = getElement(ref);
    return {
        emit: (detail) => elm.dispatchEvent(new ( win.CustomEvent )(name, {
            bubbles: !!(flags & 4 /* Bubbles */),
            composed: !!(flags & 2 /* Composed */),
            cancelable: !!(flags & 1 /* Cancellable */),
            detail
        }))
    };
};

const getElement = (ref) =>  getHostRef(ref).$hostElement$ ;

const insertVdomAnnotations = (doc) => {
    if (doc != null) {
        const docData = {
            hostIds: 0,
            rootLevelIds: 0
        };
        const orgLocationNodes = [];
        parseVNodeAnnotations(doc, doc.body, docData, orgLocationNodes);
        orgLocationNodes.forEach(orgLocationNode => {
            if (orgLocationNode != null) {
                const nodeRef = orgLocationNode['s-nr'];
                let hostId = nodeRef['s-host-id'];
                let nodeId = nodeRef['s-node-id'];
                let childId = `${hostId}.${nodeId}`;
                if (hostId == null) {
                    hostId = 0;
                    docData.rootLevelIds++;
                    nodeId = docData.rootLevelIds;
                    childId = `${hostId}.${nodeId}`;
                    if (nodeRef.nodeType === 1 /* ElementNode */) {
                        nodeRef.setAttribute(HYDRATE_CHILD_ID, childId);
                    }
                    else if (nodeRef.nodeType === 3 /* TextNode */) {
                        if (hostId === 0) {
                            const textContent = nodeRef.nodeValue.trim();
                            if (textContent === '') {
                                // useless whitespace node at the document root
                                orgLocationNode.remove();
                                return;
                            }
                        }
                        const commentBeforeTextNode = doc.createComment(childId);
                        commentBeforeTextNode.nodeValue = `${TEXT_NODE_ID}.${childId}`;
                        nodeRef.parentNode.insertBefore(commentBeforeTextNode, nodeRef);
                    }
                }
                let orgLocationNodeId = `${ORG_LOCATION_ID}.${childId}`;
                const orgLocationParentNode = orgLocationNode.parentElement;
                if (orgLocationParentNode && orgLocationParentNode['s-sd']) {
                    // ending with a . means that the parent element
                    // of this node's original location is a shadow dom element
                    // and this node is apart of the root level light dom
                    orgLocationNodeId += `.`;
                }
                orgLocationNode.nodeValue = orgLocationNodeId;
            }
        });
    }
};
const parseVNodeAnnotations = (doc, node, docData, orgLocationNodes) => {
    if (node == null) {
        return;
    }
    if (node['s-nr'] != null) {
        orgLocationNodes.push(node);
    }
    if (node.nodeType === 1 /* ElementNode */) {
        node.childNodes.forEach(childNode => {
            const hostRef = getHostRef(childNode);
            if (hostRef != null) {
                const cmpData = {
                    nodeIds: 0
                };
                insertVNodeAnnotations(doc, childNode, hostRef.$vnode$, docData, cmpData);
            }
            parseVNodeAnnotations(doc, childNode, docData, orgLocationNodes);
        });
    }
};
const insertVNodeAnnotations = (doc, hostElm, vnode, docData, cmpData) => {
    if (vnode != null) {
        const hostId = ++docData.hostIds;
        hostElm.setAttribute(HYDRATE_ID, hostId);
        if (hostElm['s-cr'] != null) {
            hostElm['s-cr'].nodeValue = `${CONTENT_REF_ID}.${hostId}`;
        }
        if (vnode.$children$ != null) {
            const depth = 0;
            vnode.$children$.forEach((vnodeChild, index) => {
                insertChildVNodeAnnotations(doc, vnodeChild, cmpData, hostId, depth, index);
            });
        }
    }
};
const insertChildVNodeAnnotations = (doc, vnodeChild, cmpData, hostId, depth, index) => {
    const childElm = vnodeChild.$elm$;
    if (childElm == null) {
        return;
    }
    const nodeId = cmpData.nodeIds++;
    const childId = `${hostId}.${nodeId}.${depth}.${index}`;
    childElm['s-host-id'] = hostId;
    childElm['s-node-id'] = nodeId;
    if (childElm.nodeType === 1 /* ElementNode */) {
        childElm.setAttribute(HYDRATE_CHILD_ID, childId);
    }
    else if (childElm.nodeType === 3 /* TextNode */) {
        const parentNode = childElm.parentNode;
        if (parentNode.nodeName !== 'STYLE') {
            const textNodeId = `${TEXT_NODE_ID}.${childId}`;
            const commentBeforeTextNode = doc.createComment(textNodeId);
            parentNode.insertBefore(commentBeforeTextNode, childElm);
        }
    }
    else if (childElm.nodeType === 8 /* CommentNode */) {
        if (childElm['s-sr']) {
            const slotName = (childElm['s-sn'] || '');
            const slotNodeId = `${SLOT_NODE_ID}.${childId}.${slotName}`;
            childElm.nodeValue = slotNodeId;
        }
    }
    if (vnodeChild.$children$ != null) {
        const childDepth = depth + 1;
        vnodeChild.$children$.forEach((vnode, index) => {
            insertChildVNodeAnnotations(doc, vnode, cmpData, hostId, childDepth, index);
        });
    }
};

function proxyHostElement(elm, cmpMeta) {
    if (typeof elm.componentOnReady !== 'function') {
        elm.componentOnReady = componentOnReady;
    }
    if (typeof elm.forceUpdate !== 'function') {
        elm.forceUpdate = forceUpdate;
    }
    if (cmpMeta.$members$ != null) {
        const hostRef = getHostRef(elm);
        const members = Object.entries(cmpMeta.$members$);
        members.forEach(([memberName, m]) => {
            const memberFlags = m[0];
            if (memberFlags & 31) {
                const attributeName = (m[1] || memberName);
                const attrValue = elm.getAttribute(attributeName);
                if (attrValue != null) {
                    const parsedAttrValue = parsePropertyValue(attrValue, memberFlags);
                    hostRef.$instanceValues$.set(memberName, parsedAttrValue);
                }
                const ownValue = elm[memberName];
                if (ownValue !== undefined) {
                    hostRef.$instanceValues$.set(memberName, ownValue);
                    delete elm[memberName];
                }
                Object.defineProperty(elm, memberName, {
                    get() {
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true
                });
            }
            else if (memberFlags & 64) {
                Object.defineProperty(elm, memberName, {
                    value() {
                        const ref = getHostRef(this);
                        const args = arguments;
                        return ref.$onReadyPromise$.then(() => ref.$lazyInstance$[memberName].apply(ref.$lazyInstance$, args)).catch(consoleError);
                    }
                });
            }
        });
    }
}
function componentOnReady() {
    return getHostRef(this).$onReadyPromise$;
}
function forceUpdate() { }

function hydrateComponent(win, results, tagName, elm, waitPromises) {
    const Cstr = getComponent(tagName);
    if (Cstr != null) {
        const cmpMeta = Cstr.cmpMeta;
        if (cmpMeta != null) {
            const hydratePromise = new Promise(async (resolve) => {
                try {
                    registerHost(elm);
                    proxyHostElement(elm, cmpMeta);
                    connectedCallback(elm, cmpMeta);
                    await elm.componentOnReady();
                    results.hydratedCount++;
                    const ref = getHostRef(elm);
                    const modeName = !ref.$modeName$ ? '$' : ref.$modeName$;
                    if (!results.hydratedComponents.some(c => c.tag === tagName && c.mode === modeName)) {
                        results.hydratedComponents.push({
                            tag: tagName,
                            mode: modeName
                        });
                    }
                }
                catch (e) {
                    win.console.error(e);
                }
                resolve();
            });
            waitPromises.push(hydratePromise);
        }
    }
}

function bootstrapHydrate(win, opts, done) {
    const results = {
        hydratedCount: 0,
        hydratedComponents: []
    };
    plt.$resourcesUrl$ = new URL(opts.resourcesUrl || './', doc.baseURI).href;
    try {
        const connectedElements = new Set();
        const waitPromises = [];
        const patchedConnectedCallback = function patchedConnectedCallback() {
            connectElements(win, opts, results, this, connectedElements, waitPromises);
        };
        const patchedComponentInit = function patchedComponentInit() {
            const hostRef = getHostRef(this);
            if (hostRef != null) {
                postUpdateComponent(this, hostRef);
            }
        };
        const patchComponent = function (elm) {
            const tagName = elm.nodeName.toLowerCase();
            if (elm.tagName.includes('-')) {
                const Cstr = getComponent(tagName);
                if (Cstr != null) {
                    if (typeof elm.connectedCallback !== 'function') {
                        elm.connectedCallback = patchedConnectedCallback;
                    }
                    if (typeof elm['s-init'] !== 'function') {
                        elm['s-rc'] = [];
                        elm['s-init'] = patchedComponentInit;
                    }
                }
            }
        };
        let orgDocumentCreateElement = win.document.createElement;
        win.document.createElement = function patchedCreateElement(tagName) {
            const elm = orgDocumentCreateElement.call(win.document, tagName);
            patchComponent(elm);
            return elm;
        };
        const patchChild = (elm) => {
            if (elm != null && elm.nodeType === 1) {
                patchComponent(elm);
                const children = elm.children;
                for (let i = 0, ii = children.length; i < ii; i++) {
                    patchChild(children[i]);
                }
            }
        };
        patchChild(win.document.body);
        const initConnectElement = (elm) => {
            if (elm != null && elm.nodeType === 1) {
                if (typeof elm.connectedCallback === 'function') {
                    elm.connectedCallback();
                }
                const children = elm.children;
                for (let i = 0, ii = children.length; i < ii; i++) {
                    initConnectElement(children[i]);
                }
            }
        };
        initConnectElement(win.document.body);
        Promise.all(waitPromises)
            .then(() => {
            try {
                waitPromises.length = 0;
                connectedElements.clear();
                if (opts.clientHydrateAnnotations) {
                    insertVdomAnnotations(win.document);
                }
                win.document.createElement = orgDocumentCreateElement;
                win = opts = orgDocumentCreateElement = null;
            }
            catch (e) {
                win.console.error(e);
            }
            done(results);
        })
            .catch(e => {
            try {
                win.console.error(e);
                waitPromises.length = 0;
                connectedElements.clear();
                win.document.createElement = orgDocumentCreateElement;
                win = opts = orgDocumentCreateElement = null;
            }
            catch (e) { }
            done(results);
        });
    }
    catch (e) {
        win.console.error(e);
        win = opts = null;
        done(results);
    }
}
function connectElements(win, opts, results, elm, connectedElements, waitPromises) {
    if (elm != null && elm.nodeType === 1 && results.hydratedCount < opts.maxHydrateCount && shouldHydrate(elm)) {
        const tagName = elm.nodeName.toLowerCase();
        if (tagName.includes('-') && !connectedElements.has(elm)) {
            connectedElements.add(elm);
            hydrateComponent(win, results, tagName, elm, waitPromises);
        }
        const children = elm.children;
        if (children != null) {
            for (let i = 0, ii = children.length; i < ii; i++) {
                connectElements(win, opts, results, children[i], connectedElements, waitPromises);
            }
        }
    }
}
function shouldHydrate(elm) {
    if (elm.nodeType === 9) {
        return true;
    }
    if (NO_HYDRATE_TAGS.has(elm.nodeName)) {
        return false;
    }
    if (elm.hasAttribute('no-prerender')) {
        return false;
    }
    const parentNode = elm.parentNode;
    if (parentNode == null) {
        return true;
    }
    return shouldHydrate(parentNode);
}
const NO_HYDRATE_TAGS = new Set([
    'CODE',
    'HEAD',
    'IFRAME',
    'INPUT',
    'OBJECT',
    'OUTPUT',
    'NOSCRIPT',
    'PRE',
    'SCRIPT',
    'SELECT',
    'STYLE',
    'TEMPLATE',
    'TEXTAREA'
]);

const cstrs = new Map();
const loadModule = (cmpMeta, _hostRef, _hmrVersionId) => {
    return new Promise(resolve => {
        resolve(cstrs.get(cmpMeta.$tagName$));
    });
};
const getComponent = (tagName) => {
    return cstrs.get(tagName);
};
const isMemberInElement = (elm, memberName) => {
    if (elm != null) {
        if (memberName in elm) {
            return true;
        }
        const hostRef = getComponent(elm.nodeName.toLowerCase());
        if (hostRef != null && hostRef.cmpMeta != null && hostRef.cmpMeta.$members$ != null) {
            return memberName in hostRef.cmpMeta.$members$;
        }
    }
    return false;
};
const registerComponents = (Cstrs) => {
    Cstrs.forEach(Cstr => {
        cstrs.set(Cstr.cmpMeta.$tagName$, Cstr);
    });
};
const win = window;
const doc = win.document;
const writeTask = (cb) => {
    process.nextTick(() => {
        try {
            cb();
        }
        catch (e) {
            consoleError(e);
        }
    });
};
const nextTick = (cb) => Promise.resolve().then(cb);
const consoleError = (e) => {
    if (e != null) {
        console.error(e.stack || e.message || e);
    }
};
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: (h) => h(),
    raf: (h) => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
};
const supportsShadowDom = false;
const hostRefs = new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerInstance = (lazyInstance, hostRef) => hostRefs.set(hostRef.$lazyInstance$ = lazyInstance, hostRef);
const registerHost = (elm) => {
    const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $instanceValues$: new Map(),
    };
    hostRef.$onReadyPromise$ = new Promise(r => hostRef.$onReadyResolve$ = r);
    return hostRefs.set(elm, hostRef);
};
const styles = new Map();

// File generated automatically by path-data.js, do not edit directly
const checkCircle24F = "M23 11.5A11.5 11.5 0 1 1 11.5 0 11.5 11.5 0 0 1 23 11.5zm-5.5-6.018l-8.5 8.5-3.5-3.5-2 2L9.018 18l.018-.018L11.018 16l8.5-8.5z";
const exclamationMarkTriangle24F = "M22.3 19.795l-9-17.901a1.5 1.5 0 0 0-2.597 0L1.7 19.795a1.502 1.502 0 0 0 0 1.502A1.456 1.456 0 0 0 2.998 22H21a1.458 1.458 0 0 0 1.299-.703 1.506 1.506 0 0 0 .001-1.502zM13 19h-2v-2h2zm0-3h-2V8h2z";
const lightbulb24F = "M11 13h1v4h-1zm3.895 5.45a.311.311 0 0 0-.12-.27l-.232-.18h-6.19l-.232.18a.312.312 0 0 0 .04.518l1.387.771-1.367.76a.311.311 0 0 0-.028.526l3.09 2.18a.356.356 0 0 0 .41 0l3.09-2.18a.311.311 0 0 0-.029-.527l-1.366-.759 1.388-.77a.312.312 0 0 0 .159-.25zM11.59 0l-.173.002L11.244 0a6.2 6.2 0 0 0-6.182 6.698c.31 2.575 2.784 5.207 2.939 6.134.13.78.116 1.844.199 2.472A2.542 2.542 0 0 0 9.088 17H10v-4.412L8.83 9.37l.94-.342L10.85 12h1.3l1.08-2.97.94.341L13 12.588V17h.745a2.542 2.542 0 0 0 .889-1.696c.083-.628.068-1.692.199-2.472.154-.927 2.628-3.559 2.938-6.134A6.2 6.2 0 0 0 11.59 0z";
const x24 = "M13.207 12.5l7.778 7.778-.707.707-7.778-7.778-7.778 7.778-.707-.707 7.778-7.778-7.778-7.778.707-.707 7.778 7.778 7.778-7.778.707.707z";
const x32 = "M16.707 16l10.607 10.606-.708.707L16 16.707 5.394 27.313l-.708-.707L15.293 16 4.686 5.394l.708-.707L16 15.293 26.606 4.687l.708.707z";

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

const createProviderConsumer = (defaultState, consumerRender) => {
    let listeners = new Map();
    let currentState = defaultState;
    const updateListener = (fields, instance) => {
        if (Array.isArray(fields)) {
            [...fields].forEach(fieldName => {
                instance[fieldName] = currentState[fieldName];
            });
        }
        else {
            instance[fields] = Object.assign({}, currentState);
        }
    };
    const subscribe = (instance, propList) => {
        if (!listeners.has(instance)) {
            listeners.set(instance, propList);
            updateListener(propList, instance);
        }
        return () => {
            if (listeners.has(instance)) {
                listeners.delete(instance);
            }
        };
    };
    const Provider = ({ state }, children) => {
        currentState = state;
        listeners.forEach(updateListener);
        return children;
    };
    const Consumer = (props, children) => {
        // The casting on subscribe is to allow for crossover through the stencil compiler
        // In the future we should allow for generics in components.
        return consumerRender(subscribe, children[0]);
    };
    const injectProps = (Cstr, fieldList) => {
        const CstrPrototype = Cstr.prototype;
        const cstrConnectedCallback = CstrPrototype.connectedCallback;
        const cstrDisconnectedCallback = CstrPrototype.disconnectedCallback;
        CstrPrototype.connectedCallback = function () {
            subscribe(this, fieldList);
            if (cstrConnectedCallback) {
                return cstrConnectedCallback.call(this);
            }
        };
        CstrPrototype.disconnectedCallback = function () {
            listeners.delete(this);
            if (cstrDisconnectedCallback) {
                cstrDisconnectedCallback.call(this);
            }
        };
    };
    return {
        Provider,
        Consumer,
        injectProps
    };
};

var AlertInterface = createProviderConsumer({
    currentAlert: "",
    queueLength: 0
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

/** Alerts are not meant to be used inline with content, or be present in view on page load.
 * As such, calcite-alert relies on calcite-alerts for positioning - displaying an alert on its own
 * will lead to unexpected and potentially undesireable results
 */
/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, link to page, etc.)
 */
class CalciteAlert {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.dismiss = false;
        /** Length before autodismissal (only used with `dismiss`) */
        this.duration = this.dismiss
            ? "medium"
            : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** If false, no icon will be shown in the alert */
        this.icon = false;
        /** Unique ID for this alert */
        /** @internal */
        this.alertId = this.el.id;
        /** @internal */
        this.currentAlert = "";
        /** @internal */
        this.queueLength = 0;
        this.durationDefaults = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        this.iconDefaults = {
            green: checkCircle24F,
            yellow: exclamationMarkTriangle24F,
            red: exclamationMarkTriangle24F,
            blue: lightbulb24F
        };
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 7);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 7);
    }
    /** watch for changes to currentAlert passed from <calcite-alerts> */
    watchCurrentAlert() {
        if (!this.active && this.currentAlert === this.alertId) {
            if (this.dismiss)
                setTimeout(() => this.closeCalciteAlert(), this.durationDefaults[this.duration]);
            setTimeout(() => (this.active = true), 300);
        }
        else {
            this.active = false;
        }
    }
    /** emit the `calciteAlertClose` event - <calcite-alerts> listens for this */
    async closeCalciteAlert() {
        this.calciteAlertClose.emit({ requestedAlert: this.alertId });
    }
    /**  emit the `calciteAlertOpen` event - <calcite-alerts> listens for this  */
    async openCalciteAlert() {
        this.calciteAlertOpen.emit({ requestedAlert: this.alertId });
    }
    connectedCallback() {
        // prop validations
        let colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        let durations = ["slow", "medium", "fast"];
        if (this.duration !== null && !durations.includes(this.duration))
            this.duration = "medium";
        let themes = ["dark", "light"];
        if (!themes.includes(this.theme))
            this.theme = "light";
    }
    setIcon() {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24" }, h("path", { d: path }))));
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.closeCalciteAlert() }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "32", width: "32", viewBox: "0 0 32 32" }, h("path", { d: x32 }))));
        const close = !this.dismiss ? closeButton : "";
        const icon = this.icon ? this.setIcon() : "";
        const count = (h("div", { class: `${this.queueLength > 0 ? "active " : ""}alert-count` }, "+", this.queueLength > 0 ? this.queueLength : 1));
        const progress = this.active && this.dismiss ? h("div", { class: "alert-dismiss" }) : "";
        return (h(Host, { active: !!this.active, dir: dir }, icon, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), count, close, progress));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "currentAlert": ["watchCurrentAlert"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-alert",
        "$members$": {
            "dismiss": [4],
            "duration": [513],
            "color": [513],
            "theme": [513],
            "icon": [4],
            "alertId": [1, "alert-id"],
            "currentAlert": [1, "current-alert"],
            "queueLength": [2, "queue-length"],
            "active": [32],
            "closeCalciteAlert": [64],
            "openCalciteAlert": [64]
        },
        "$listeners$": undefined,
        "$attrsToReflect$": []
    }; }
}
AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);

class CalciteAlerts {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.currentAlert = "";
        this.active = false;
        this.alertQueue = [];
        this.calciteAlertsClose = createEvent(this, "calciteAlertsClose", 7);
        this.calciteAlertsOpen = createEvent(this, "calciteAlertsOpen", 7);
    }
    /** Adds the requested alert to the alert queue, if not present */
    updateQueueOnOpen(event) {
        if (!this.alertQueue.includes(event.detail.requestedAlert)) {
            this.active = true;
            this.currentAlert = event.detail.requestedAlert;
            this.alertQueue.push(event.detail.requestedAlert);
            this.calciteAlertsOpen.emit({
                currentAlert: this.currentAlert,
                alertQueue: this.alertQueue
            });
        }
    }
    /** Closes the requested alert and removes from the queue, or removes from queue if not active */
    updateQueueOnClose(event) {
        if (this.alertQueue.includes(event.detail.requestedAlert))
            this.alertQueue = this.alertQueue.filter(e => e !== event.detail.requestedAlert);
        if (this.alertQueue.length < 1)
            setTimeout(() => {
                this.active = false;
            }, 400);
        this.calciteAlertsClose.emit({
            currentAlert: this.currentAlert,
            alertQueue: this.alertQueue
        });
    }
    componentWillUpdate() {
        this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : "";
    }
    render() {
        const alertState = {
            currentAlert: this.currentAlert,
            queueLength: this.alertQueue.length >= 2 ? this.alertQueue.length - 1 : 0
        };
        return (h(Host, { active: !!this.active }, h(AlertInterface.Provider, { state: alertState }, h("slot", null))));
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-alerts",
        "$members$": {
            "currentAlert": [32],
            "active": [32],
            "alertQueue": [32]
        },
        "$listeners$": [[0, "calciteAlertOpen", "updateQueueOnOpen"], [0, "calciteAlertClose", "updateQueueOnClose"]],
        "$attrsToReflect$": []
    }; }
}

/** @slot default text slot for button text */
/** Any attributes placed on <calcite-button> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** Using appearance=inline will also render as an anchor link. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */
class CalciteButton {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** specify the color of the button, defaults to blue */
        this.color = "blue";
        /** specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor */
        this.appearance = "solid";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify the width of the button, defaults to auto */
        this.width = "auto";
        /** optionally add a calcite-loader component inline to indicate loading is occuring. You can add and remove this prop depending on status  */
        this.loading = false;
        /** optionally pass icon path data to be positioned within the button - pass only raw path data from calcite ui helper  */
        this.icon = null;
        /**
         * @internal
         */
        // hastext prop for spacing graphic when text is present in slot
        this.hastext = false;
    }
    connectedCallback() {
        // prop validations
        let appearance = ["solid", "outline", "clear", "inline"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        let scale = ["xs", "s", "m", "l", "xl"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let width = ["auto", "half", "full"];
        if (!width.includes(this.width))
            this.width = "auto";
    }
    componentDidLoad() {
        let textSlot = this.el.shadowRoot.querySelector("slot");
        let textNode = textSlot ? textSlot.assignedNodes() : null;
        if (textNode && (textNode[0] !== undefined && textNode[0] !== null))
            this.hastext = true;
    }
    getAttributes() {
        // spreadable attributes to pass to component child, if they aren't props
        let props = [
            "appearance",
            "color",
            "loading",
            "scale",
            "width",
            "icon",
            "dir"
        ];
        return Array.from(this.el.attributes)
            .filter(a => !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign({}, acc, { [name]: value })), {});
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Type = this.href || this.appearance === "inline" ? "a" : "button";
        const role = Type === "a" ? "link" : "button";
        const loader = h("calcite-loader", { "is-active": true, inline: true });
        const graphic = this.loading ? (h("div", { class: "calcite-button--graphic" }, loader)) : this.icon ? (h("div", { class: "calcite-button--graphic" }, h("svg", { class: "calcite-button--icon", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" }, h("path", { d: this.icon })))) : null;
        return (h(Host, { dir: dir, hastext: this.hastext }, h(Type, Object.assign({}, attributes, { role: role }), graphic, h("slot", null))));
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-button",
        "$members$": {
            "color": [1537],
            "appearance": [1537],
            "scale": [1537],
            "width": [1537],
            "loading": [516],
            "href": [513],
            "icon": [513],
            "hastext": [1028]
        },
        "$listeners$": undefined,
        "$attrsToReflect$": []
    }; }
}

const ENTER = 13;
const SPACE = 32;
const PAGE_UP = 33;
const PAGE_DOWN = 34;
const END = 35;
const HOME = 36;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

class CalciteCheckbox {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** True if the checkbox is initially checked */
        this.checked = false;
        /**
         * True if the checkbox is initially indeterminate,
         * which is independent from its checked state
         * https://css-tricks.com/indeterminate-checkboxes/
         * */
        this.indeterminate = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** Size of the checkbox  */
        this.size = null;
        /** True if the checkbox is disabled */
        this.disabled = false;
        /** Determines what theme to use */
        this.theme = "light";
        this.toggle = () => {
            if (!this.disabled) {
                this.checked = !this.checked;
                this.indeterminate = false;
            }
        };
        this.indeterminatePath = "M4 7h8v2H4z";
        this.checkedPath = "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";
        this.getPath = () => this.indeterminate
            ? this.indeterminatePath
            : this.checked
                ? this.checkedPath
                : "";
        this.syncThisToProxyInput = () => {
            this.checked = this.inputProxy.hasAttribute("checked");
            this.name = this.inputProxy.name;
            this.value = this.inputProxy.value;
        };
        this.syncProxyInputToThis = () => {
            this.checked
                ? this.inputProxy.setAttribute("checked", "")
                : this.inputProxy.removeAttribute("checked");
            this.inputProxy.name = this.name;
            this.inputProxy.value = this.value;
        };
        this.calciteCheckboxChange = createEvent(this, "calciteCheckboxChange", 7);
    }
    onClick({ target }) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && target === this.inputProxy) ||
            (!this.el.closest("label") && target === this.el)) {
            this.toggle();
        }
    }
    keyDownHandler({ keyCode }) {
        if (keyCode === SPACE || keyCode === ENTER) {
            this.toggle();
        }
    }
    checkedWatcher() {
        this.calciteCheckboxChange.emit();
        this.checked
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    }
    connectedCallback() {
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        return (h(Host, { role: "checkbox", "aria-checked": this.checked, tabindex: this.disabled ? "-1" : "0" }, h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath(), fill: "white" })), h("slot", null)));
    }
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "checkbox";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        this.observer = new MutationObserver(this.syncThisToProxyInput);
        this.observer.observe(this.inputProxy, { attributes: true });
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checked": ["checkedWatcher"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-checkbox",
        "$members$": {
            "checked": [1540],
            "indeterminate": [1540],
            "name": [1537],
            "value": [1537],
            "size": [513],
            "disabled": [516],
            "theme": [513]
        },
        "$listeners$": [[0, "click", "onClick"], [0, "keydown", "keyDownHandler"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteExample {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Be sure to add a jsdoc comment describing your propery for the generated readme file.
         * If your property should be hidden from documentation, you can use the `@internal` tag
         */
        this.property = "default";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.state = "default";
        this.open = createEvent(this, "open", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        console.log(this.state);
        return h(Host, null);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        console.log(e);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Add a jsdoc comment describing your method and it's parameters (use `@param`).
     */
    async doThing() {
        return Promise.resolve(this.privateMethod());
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    privateMethod() { }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-example",
        "$members$": {
            "property": [1],
            "state": [32],
            "doThing": [64]
        },
        "$listeners$": [[0, "click", "onClick"]],
        "$attrsToReflect$": []
    }; }
}

function gen(counts) {
    return counts
        .map(count => {
        let out = "";
        for (let i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    })
        .join("-");
}
const guid = () => gen([2, 1, 1, 1, 3]);

class CalciteLoader {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Show the loader
         */
        this.isActive = false;
        /**
         * Inline loaders are smaller and will appear to the left of the text
         */
        this.inline = false;
        /**
         * Use indeterminate if finding actual progress value is impossible
         */
        this.type = "indeterminate";
        /**
         * Percent complete of 100, only valid for determinate indicators
         */
        this.value = 0;
        /**
         * Text which should appear under the loading indicator (optional)
         */
        this.text = "";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         */
        this.loaderBarOffsets = [0, 0, 0];
        /**
         * @internal
         */
        this.loaderBarRates = [1, 2.25, 3.5];
        /**
         * @internal
         */
        this.isEdge = false;
        /**
         * @internal
         */
        this.animationID = null;
        /**
         * @internal
         */
        this.guid = `calcite-loader-${guid()}`;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.isEdge = /Edge/.test(navigator.userAgent);
        if (this.isEdge) {
            this.updateOffset();
        }
    }
    componentDidUnload() {
        if (this.animationID) {
            window.cancelAnimationFrame(this.animationID);
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const id = this.el.id || this.guid;
        const ariaAttributes = {
            "aria-valuenow": this.value,
            "aria-valuemin": 0,
            "aria-valuemax": 100
        };
        const size = this.inline ? 16 : 56;
        const viewbox = this.inline ? "0 0 16 16" : "0 0 56 56";
        const isDeterminate = this.type === "determinate";
        const styleProperties = {};
        if (this.isEdge) {
            styleProperties["--calcite-loader-offset"] = `${this.loaderBarOffsets[0]}%`;
            styleProperties["--calcite-loader-offset2"] = `${this.loaderBarOffsets[1]}%`;
            styleProperties["--calcite-loader-offset3"] = `${this.loaderBarOffsets[2]}%`;
        }
        const progress = {
            "--calcite-loader-progress": `${-400 - this.value * 4}%`
        };
        return (h(Host, Object.assign({ id: id, dir: dir, role: "progressbar" }, (this.type === "determinate" ? ariaAttributes : {}), { style: styleProperties }), h("svg", { viewBox: viewbox, class: "loader__square" }, h("rect", { width: size, height: size })), h("svg", { viewBox: viewbox, class: "loader__square loader__square--2" }, h("rect", { width: size, height: size })), h("svg", { viewBox: viewbox, class: "loader__square loader__square--3", style: isDeterminate ? progress : {} }, h("rect", { width: size, height: size })), this.text ? h("div", { class: "loader__text" }, this.text) : "", this.value ? (h("div", { class: "loader__percentage" }, Math.floor(this.value))) : ("")));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    updateOffset() {
        this.loaderBarOffsets = this.rotateLoaderBars(this.loaderBarOffsets);
        this.animationID = window.requestAnimationFrame(() => this.updateOffset());
    }
    /**
     * @internal
     */
    rotateLoaderBars(barOffsets) {
        return barOffsets.map((offset, i) => {
            if (offset > -400) {
                return offset - this.loaderBarRates[i];
            }
            else {
                return 0;
            }
        });
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-loader",
        "$members$": {
            "isActive": [1540, "is-active"],
            "inline": [1540],
            "type": [1537],
            "value": [2],
            "text": [1],
            "loaderBarOffsets": [32],
            "isEdge": [32]
        },
        "$listeners$": undefined,
        "$attrsToReflect$": []
    }; }
}

/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
function queryShadowRoot(root, skipNode, isMatch, maxDepth = 20, depth = 0) {
    let matches = [];
    // If the depth is above the max depth, abort the searching here.
    if (depth >= maxDepth) {
        return matches;
    }
    // Traverses a slot element
    const traverseSlot = ($slot) => {
        // Only check nodes that are of the type Node.ELEMENT_NODE
        // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        const assignedNodes = $slot.assignedNodes().filter(node => node.nodeType === 1);
        if (assignedNodes.length > 0) {
            return queryShadowRoot(assignedNodes[0].parentElement, skipNode, isMatch, maxDepth, depth + 1);
        }
        return [];
    };
    // Go through each child and continue the traversing if necessary
    // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
    // Therefore we fallback to an empty array if it is undefined.
    const children = Array.from(root.children || []);
    for (const $child of children) {
        // Check if the node and its descendants should be skipped
        if (skipNode($child)) {
            continue;
        }
        // If the child matches we always add it
        if (isMatch($child)) {
            matches.push($child);
        }
        if ($child.shadowRoot != null) {
            matches.push(...queryShadowRoot($child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));
        }
        else if ($child.tagName === "SLOT") {
            matches.push(...traverseSlot($child));
        }
        else {
            matches.push(...queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1));
        }
    }
    return matches;
}

/**
 * Returns whether the element is hidden.
 * @param $elem
 */
function isHidden($elem) {
    return $elem.hasAttribute("hidden")
        || ($elem.hasAttribute("aria-hidden") && $elem.getAttribute("aria-hidden") !== "false")
        // A quick and dirty way to check whether the element is hidden.
        // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
        // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
        // we won't be able to catch it here. We accept it due to the huge performance benefits.
        || $elem.style.display === `none`
        || $elem.style.opacity === `0`
        || $elem.style.visibility === `hidden`
        || $elem.style.visibility === `collapse`;
}
/**
 * Returns whether the element is disabled.
 * @param $elem
 */
function isDisabled($elem) {
    return $elem.hasAttribute("disabled")
        || ($elem.hasAttribute("aria-disabled") && $elem.getAttribute("aria-disabled") !== "false");
}
/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
function isFocusable($elem) {
    // Discard elements that are removed from the tab order.
    if ($elem.getAttribute("tabindex") === "-1" || isHidden($elem) || isDisabled($elem)) {
        return false;
    }
    return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute("tabindex")
        // Anchor tags or area tags with a href set
        || ($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) && $elem.hasAttribute("href")
        // Form elements which are not disabled
        || ($elem instanceof HTMLButtonElement
            || $elem instanceof HTMLInputElement
            || $elem instanceof HTMLTextAreaElement
            || $elem instanceof HTMLSelectElement)
        // IFrames
        || $elem instanceof HTMLIFrameElement);
}

let timeouts = new Map();
/**
 * Debounces a callback.
 * @param cb
 * @param ms
 * @param id
 */
function debounce(cb, ms, id) {
    // Clear current timeout for id
    const timeout = timeouts.get(id);
    if (timeout != null) {
        window.clearTimeout(timeout);
    }
    // Set new timeout
    timeouts.set(id, window.setTimeout(() => {
        cb();
        timeouts.delete(id);
    }, ms));
}

/**
 * Template for the focus trap.
 */
const template = document.createElement("template");
template.innerHTML = `
	<div id="start"></div>
	<slot></slot>
	<div id="backup"></div>
	<div id="end"></div>
`;
/**
 * Focus trap web component.
 * @slot - Default content.
 */
class FocusTrap extends HTMLElement {
    /**
     * Attaches the shadow root.
     */
    constructor() {
        super();
        // The debounce id is used to distinguish this focus trap from others when debouncing
        this.debounceId = Math.random().toString();
        this._focused = false;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        this.focusLastElement = this.focusLastElement.bind(this);
        this.focusFirstElement = this.focusFirstElement.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
    }
    // Whenever one of these attributes changes we need to render the template again.
    static get observedAttributes() {
        return [
            "inactive"
        ];
    }
    /**
     * Determines whether the focus trap is active or not.
     * @attr
     */
    get inactive() {
        return this.hasAttribute("inactive");
    }
    set inactive(value) {
        value ? this.setAttribute("inactive", "") : this.removeAttribute("inactive");
    }
    /**
     * Returns whether the element currently has focus.
     */
    get focused() {
        return this._focused;
    }
    /**
     * Hooks up the element.
     */
    connectedCallback() {
        this.$backup = this.shadowRoot.querySelector("#backup");
        this.$start = this.shadowRoot.querySelector("#start");
        this.$end = this.shadowRoot.querySelector("#end");
        this.$start.addEventListener("focus", this.focusLastElement);
        this.$end.addEventListener("focus", this.focusFirstElement);
        // Focus out is called every time the user tabs around inside the element
        this.addEventListener("focusin", this.onFocusIn);
        this.addEventListener("focusout", this.onFocusOut);
        this.render();
    }
    /**
     * Tears down the element.
     */
    disconnectedCallback() {
        this.$start.removeEventListener("focus", this.focusLastElement);
        this.$end.removeEventListener("focus", this.focusFirstElement);
        this.removeEventListener("focusin", this.onFocusIn);
        this.removeEventListener("focusout", this.onFocusOut);
    }
    /**
     * When the attributes changes we need to re-render the template.
     */
    attributeChangedCallback() {
        this.render();
    }
    /**
     * Focuses the first focusable element in the focus trap.
     */
    focusFirstElement() {
        this.trapFocus();
    }
    /**
     * Focuses the last focusable element in the focus trap.
     */
    focusLastElement() {
        this.trapFocus(true);
    }
    /**
     * Returns a list of the focusable children found within the element.
     */
    getFocusableElements() {
        return queryShadowRoot(this, isHidden, isFocusable);
    }
    /**
     * Focuses on either the last or first focusable element.
     * @param {boolean} trapToEnd
     */
    trapFocus(trapToEnd) {
        if (this.inactive)
            return;
        let focusableChildren = this.getFocusableElements();
        if (focusableChildren.length > 0) {
            if (trapToEnd) {
                focusableChildren[focusableChildren.length - 1].focus();
            }
            else {
                focusableChildren[0].focus();
            }
            this.$backup.setAttribute("tabindex", "-1");
        }
        else {
            // If there are no focusable children we need to focus on the backup
            // to trap the focus. This is a useful behavior if the focus trap is
            // for example used in a dialog and we don't want the user to tab
            // outside the dialog even though there are no focusable children
            // in the dialog.
            this.$backup.setAttribute("tabindex", "0");
            this.$backup.focus();
        }
    }
    /**
     * When the element gains focus this function is called.
     */
    onFocusIn() {
        this.updateFocused(true);
    }
    /**
     * When the element looses its focus this function is called.
     */
    onFocusOut() {
        this.updateFocused(false);
    }
    /**
     * Updates the focused property and updates the view.
     * The update is debounced because the focusin and focusout out
     * might fire multiple times in a row. We only want to render
     * the element once, therefore waiting until the focus is "stable".
     * @param value
     */
    updateFocused(value) {
        debounce(() => {
            if (this.focused !== value) {
                this._focused = value;
                this.render();
            }
        }, 0, this.debounceId);
    }
    /**
     * Updates the template.
     */
    render() {
        if (!this.isConnected)
            return;
        this.$start.setAttribute("tabindex", !this.focused || this.inactive ? `-1` : `0`);
        this.$end.setAttribute("tabindex", !this.focused || this.inactive ? `-1` : `0`);
        this.focused ? this.setAttribute("focused", "") : this.removeAttribute("focused");
    }
}
window.customElements.define("focus-trap", FocusTrap);

class CalciteModal {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Optionally pass a function to run before close */
        this.beforeClose = () => Promise.resolve();
        /** Aria label for the close button */
        this.closeLabel = "Close";
        /** Set the overall size of the modal */
        this.size = "small";
        /** Select theme (light or dark) */
        this.theme = "light";
        this.hideBackButton = true;
        this.hideSecondaryButton = true;
        this.calciteModalOpen = createEvent(this, "calciteModalOpen", 7);
        this.calciteModalClose = createEvent(this, "calciteModalClose", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        const back = this.el.shadowRoot.querySelector("slot[name=back]");
        const secondary = this.el.shadowRoot.querySelector("slot[name=secondary]");
        back.addEventListener("slotchange", () => {
            this.hideBackButton = !hasSlottedContent(back);
        });
        secondary.addEventListener("slotchange", () => {
            this.hideSecondaryButton = !hasSlottedContent(secondary);
        });
    }
    render() {
        const dir = getElementDir(this.el);
        const theme = getElementTheme(this.el);
        return (h(Host, { role: "dialog", "aria-modal": "true", class: { "is-active": this.isActive }, dir: dir, theme: theme }, h("div", { class: "modal" }, h("focus-trap", { ref: el => (this.trap = el) }, h("div", { class: "modal__header" }, h("button", { class: "modal__close", "aria-label": this.closeLabel, onClick: () => this.close() }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24", fill: "currentColor" }, h("path", { d: x24 }))), h("header", { class: "modal__title" }, h("slot", { name: "header" }))), h("div", { class: "modal__content" }, h("slot", { name: "content" })), h("div", { class: {
                modal__footer: true,
                "modal__footer--hide-back": this.hideBackButton,
                "modal__footer--hide-secondary": this.hideSecondaryButton
            } }, h("slot", { name: "back" }), h("slot", { name: "secondary" }), h("slot", { name: "primary" }))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleEscape(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Open the modal */
    async open() {
        this.previousActiveElement = document.activeElement;
        this.isActive = true;
        // wait for the modal to open, then handle focus.
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.firstFocus) {
                    this.firstFocus.focus();
                }
                else {
                    this.trap.focusFirstElement();
                }
                resolve(this.el);
            }, 300);
            document.documentElement.classList.add("overflow-hidden");
            this.calciteModalOpen.emit();
        });
    }
    /** Close the modal, first running the `beforeClose` method */
    async close() {
        return this.beforeClose(this.el).then(() => {
            this.isActive = false;
            this.previousActiveElement.focus();
            document.documentElement.classList.remove("overflow-hidden");
            this.calciteModalClose.emit();
            return new Promise(resolve => {
                setTimeout(() => resolve(this.el), 300);
            });
        });
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-modal",
        "$members$": {
            "beforeClose": [16],
            "closeLabel": [1, "close-label"],
            "docked": [516],
            "firstFocus": [16],
            "size": [513],
            "color": [513],
            "theme": [513],
            "isActive": [32],
            "hideBackButton": [32],
            "hideSecondaryButton": [32],
            "open": [64],
            "close": [64]
        },
        "$listeners$": [[0, "keyup", "handleEscape"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteProgress {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Use indeterminate if finding actual progress value is impossible
         */
        this.type = "determinate";
        /**
         * Percent complete of 100
         */
        this.value = 0;
        /**
         * Text label for the progress indicator
         */
        this.text = null;
        /**
         * Fill bar in the opposite direction
         */
        this.reversed = false;
    }
    render() {
        return (h(Host, { class: "calcite-progress", type: this.type, reversed: this.reversed, style: {
                "--percentage-value": `${this.value * 100}%`
            } }, h("div", { class: "calcite-progress__text" }, this.text), h("slot", null)));
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 4,
        "$tagName$": "calcite-progress",
        "$members$": {
            "type": [1],
            "value": [2],
            "text": [1],
            "reversed": [4]
        },
        "$listeners$": undefined,
        "$attrsToReflect$": []
    }; }
}

const navigationKeys = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    space: " "
};
class CalciteRadioGroup {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * The component's theme.
         */
        this.theme = "light";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.hiddenInput = (() => {
            const input = document.createElement("input");
            input.type = "hidden";
            this.el.appendChild(input);
            return input;
        })();
        this.calciteRadioGroupChange = createEvent(this, "calciteRadioGroupChange", 7);
    }
    handleNameChange(value) {
        this.hiddenInput.name = value;
    }
    handleSelectedItemChange(newItem, oldItem) {
        if (newItem === oldItem) {
            return;
        }
        let match;
        const items = this.getItems();
        items.forEach(item => {
            const matches = item === newItem;
            if (matches) {
                match = item;
            }
        });
        if (match) {
            this.selectItem(match);
            this.calciteRadioGroupChange.emit();
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        const items = this.getItems();
        let lastChecked;
        items.forEach((item, index) => {
            item.tabIndex = -1;
            const next = items[index + 1];
            if (item.checked) {
                lastChecked = item;
            }
            if (next && next.checked && item.checked) {
                item.checked = false;
            }
        });
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
        const { hiddenInput } = this;
        if (this.name) {
            hiddenInput.name = this.name;
        }
        if (lastChecked) {
            hiddenInput.value = lastChecked.value;
        }
    }
    render() {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleClick(event) {
        if (event.target.localName === "calcite-radio-group-item") {
            this.selectItem(event.target);
        }
    }
    handleSelected(event) {
        event.stopPropagation();
        event.preventDefault();
        this.selectItem(event.target);
    }
    handleKeyDown(event) {
        const { key } = event;
        if (Object.values(navigationKeys).indexOf(key) === -1) {
            return;
        }
        event.preventDefault();
        const { el, selectedItem } = this;
        const dir = getElementDir(el);
        const moveBackwardKey = (dir === "rtl"
            ? key === navigationKeys.right
            : key === navigationKeys.left) || key === navigationKeys.up;
        const items = this.getItems();
        let selectedIndex = -1;
        items.forEach((item, index) => {
            if (item === selectedItem) {
                selectedIndex = index;
            }
        });
        if (moveBackwardKey) {
            const previous = selectedIndex === -1 || selectedIndex === 0
                ? items.item(items.length - 1)
                : items.item(selectedIndex - 1);
            this.selectItem(previous);
            return;
        }
        const moveForwardKey = (dir === "rtl"
            ? key === navigationKeys.left
            : key === navigationKeys.right) || key === navigationKeys.down;
        if (moveForwardKey) {
            const next = selectedIndex === -1
                ? items.item(1)
                : items.item(selectedIndex + 1) || items.item(0);
            this.selectItem(next);
            return;
        }
        if (key === navigationKeys.space) {
            this.selectItem(event.target);
            return;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getItems() {
        return this.el.querySelectorAll("calcite-radio-group-item");
    }
    selectItem(selected) {
        if (selected === this.selectedItem) {
            return;
        }
        const items = this.getItems();
        let match = null;
        items.forEach(item => {
            const matches = item.value === selected.value;
            item.checked = matches;
            item.tabIndex = matches ? 0 : -1;
            if (matches) {
                match = item;
            }
        });
        this.selectedItem = match;
        this.syncWithInputProxy(match);
        match && match.focus();
    }
    syncWithInputProxy(item) {
        this.hiddenInput.value = item ? item.value : "";
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "name": ["handleNameChange"],
        "selectedItem": ["handleSelectedItemChange"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-radio-group",
        "$members$": {
            "name": [1],
            "selectedItem": [8, "selected-item"],
            "theme": [513]
        },
        "$listeners$": [[0, "click", "handleClick"], [0, "calciteRadioGroupItemChange", "handleSelected"], [0, "keydown", "handleKeyDown"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteRadioGroupItem {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Indicates whether the control is checked.
         */
        this.checked = false;
        this.mutationObserver = new MutationObserver(() => this.syncFromExternalInput());
        this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
    }
    handleCheckedChange() {
        this.calciteRadioGroupItemChange.emit();
        this.syncToExternalInput();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let inputProxy = this.el.querySelector(`input[slot="input"]`);
        if (inputProxy) {
            this.value = inputProxy.value;
            this.checked = inputProxy.checked;
            this.mutationObserver.observe(inputProxy, { attributes: true });
        }
        this.inputProxy = inputProxy;
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }
    render() {
        const { checked, value } = this;
        return (h(Host, { role: "radio", "aria-checked": checked ? "true" : "false" }, h("label", null, h("slot", null, value), h("slot", { name: "input" }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    syncFromExternalInput() {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    }
    ;
    syncToExternalInput() {
        if (!this.inputProxy) {
            return;
        }
        this.inputProxy.value = this.value;
        this.inputProxy.toggleAttribute("checked", this.checked);
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-radio-group-item",
        "$members$": {
            "checked": [1540],
            "value": [8]
        },
        "$listeners$": undefined,
        "$attrsToReflect$": []
    }; }
}

class CalciteSlider {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Disable and gray out the slider
         */
        this.disabled = false;
        /**
         * Minimum selectable value
         */
        this.min = 0;
        /**
         * Maximum selectable value
         */
        this.max = 100;
        /**
         * Currently selected number (if single select)
         */
        this.value = null;
        /**
         * Snap selection along the step interval
         */
        this.snap = true;
        /**
         * Interval to move on up/down keys
         */
        this.step = 1;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         */
        this.guid = `calcite-loader-${guid()}`;
        /**
         * @internal
         */
        this.isRange = false;
        /**
         * @internal
         */
        this.tickValues = [];
        /**
         * @internal
         */
        this.activeProp = "value";
        this.calciteSliderUpdate = createEvent(this, "calciteSliderUpdate", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.isRange = !!(this.maxValue || this.maxValue === 0);
        this.tickValues = this.generateTickValues();
        this.value = this.bound(this.value);
        if (this.snap) {
            this.value = this.getClosestStep(this.value);
        }
        this.calciteSliderUpdate.emit();
    }
    render() {
        const id = this.el.id || this.guid;
        const dir = getElementDir(this.el);
        const min = this.minValue || this.min;
        const max = this.maxValue || this.value;
        const maxProp = this.isRange ? "maxValue" : "value";
        return (h(Host, { dir: dir, id: id, "is-range": this.isRange, style: {
                "--calcite-slider-range-max": `${100 -
                    this.getUnitInterval(max) * 100}%`,
                "--calcite-slider-range-min": `${this.getUnitInterval(min) * 100}%`
            } }, h("div", { class: "slider__track" }, h("div", { class: "slider__track__range" }), h("div", { class: "slider__ticks" }, this.tickValues.map(number => (h("span", { class: {
                slider__tick: true,
                "slider__tick--active": number >= min && number <= max
            }, style: {
                "--calcite-slider-tick-offset": `${this.getUnitInterval(number) * 100}%`
            } }, this.labelTicks ? (h("span", { class: {
                slider__tick__label: true,
                "slider__tick__label--min": number === this.min,
                "slider__tick__label--max": number === this.max
            } }, number)) : ("")))))), this.isRange ? (h("button", { ref: el => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: e => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, class: {
                slider__thumb: true,
                "slider__thumb--min": true,
                "slider__thumb--active": this.dragProp === "minValue",
                "slider__thumb--precise": this.precise
            } }, h("span", { class: "slider__handle" }), this.labelHandles ? (h("span", { class: "slider__handle__label", "aria-hidden": "true" }, this.minValue)) : (""))) : (""), h("button", { ref: el => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: e => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": this[maxProp], "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, class: {
                slider__thumb: true,
                "slider__thumb--max": true,
                "slider__thumb--active": this.dragProp === maxProp,
                "slider__thumb--precise": this.precise
            } }, h("span", { class: "slider__handle" }), this.labelHandles ? (h("span", { class: "slider__handle__label", "aria-hidden": "true" }, this[maxProp])) : (""))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        const value = this[this.activeProp];
        switch (e.keyCode) {
            case UP:
            case RIGHT:
                e.preventDefault();
                this[this.activeProp] = this.bound(value + this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case DOWN:
            case LEFT:
                e.preventDefault();
                this[this.activeProp] = this.bound(value - this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case PAGE_UP:
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value + this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case PAGE_DOWN:
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value - this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case HOME:
                e.preventDefault();
                this[this.activeProp] = this.bound(this.min, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case END:
                e.preventDefault();
                this[this.activeProp] = this.bound(this.max, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
        }
    }
    clickHandler(e) {
        const x = e.clientX || e.pageX;
        const num = this.translate(x);
        let prop = "value";
        if (this.isRange) {
            const closerToMax = Math.abs(this.maxValue - num) < Math.abs(this.minValue - num);
            prop = closerToMax ? "maxValue" : "minValue";
        }
        this[prop] = this.bound(num, prop);
        this.calciteSliderUpdate.emit();
        const handle = prop === "minValue" ? this.minHandle : this.maxHandle;
        handle.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    generateTickValues() {
        const ticks = [];
        let current = this.min;
        while (this.ticks && current < this.max + this.ticks) {
            ticks.push(current);
            current = current + this.ticks;
        }
        return ticks;
    }
    dragStart(prop, e) {
        if (e) {
            e.preventDefault();
        }
        this.dragProp = prop;
        this.activeProp = prop;
        this.dragListener = this.dragListener || this.dragUpdate.bind(this);
        document.addEventListener("mousemove", this.dragListener);
        document.addEventListener("touchmove", this.dragListener, {
            capture: false
        });
        document.addEventListener("mouseup", this.dragEnd.bind(this));
        document.addEventListener("touchend", this.dragEnd.bind(this), false);
        document.addEventListener("touchcancel", this.dragEnd.bind(this));
    }
    dragUpdate(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.dragProp) {
            const value = this.translate(e.clientX || e.pageX);
            this[this.dragProp] = this.bound(value, this.dragProp);
            this.calciteSliderUpdate.emit();
        }
    }
    dragEnd() {
        this.dragProp = null;
        document.removeEventListener("mousemove", this.dragListener);
        document.removeEventListener("touchmove", this.dragListener);
    }
    /**
     * If number is outside range, constrain to min or max
     * @internal
     */
    bound(num, prop) {
        num = Math.min(num, this.max);
        num = Math.max(num, this.min);
        // ensure that maxValue and minValue don't swap positions
        if (prop === "maxValue") {
            num = Math.max(num, this.minValue);
        }
        if (prop === "minValue") {
            num = Math.min(num, this.maxValue);
        }
        return num;
    }
    /**
     * Translate a pixel position to value along the range
     * @internal
     */
    translate(x) {
        const range = this.max - this.min;
        const percent = (x - this.el.offsetLeft) / this.el.offsetWidth;
        let value = this.bound(this.min + range * percent);
        if (this.snap && this.step) {
            value = this.getClosestStep(value);
        }
        return value;
    }
    /**
     * Get closest allowed value along stepped values
     * @internal
     */
    getClosestStep(num) {
        num = this.bound(num);
        if (this.step) {
            const step = Math.round(num / this.step) * this.step;
            num = this.bound(step);
        }
        return num;
    }
    /**
     * Get position of value along range as fractional value
     * @return {number} number in the unit interval [0,1]
     * @internal
     */
    getUnitInterval(num) {
        num = this.bound(num);
        const range = this.max - this.min;
        return (num - this.min) / range;
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-slider",
        "$members$": {
            "disabled": [1540],
            "min": [1538],
            "max": [1538],
            "value": [1538],
            "minValue": [2, "min-value"],
            "maxValue": [2, "max-value"],
            "minLabel": [1, "min-label"],
            "maxLabel": [1, "max-label"],
            "snap": [4],
            "step": [2],
            "pageStep": [2, "page-step"],
            "ticks": [2],
            "labelTicks": [516, "label-ticks"],
            "labelHandles": [516, "label-handles"],
            "precise": [4],
            "tickValues": [32],
            "activeProp": [32]
        },
        "$listeners$": [[0, "keydown", "keyDownHandler"], [0, "click", "clickHandler"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteSwitch {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** True if the switch is initially on */
        this.switched = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** What color the switch should be */
        this.color = "blue";
        this.syncThisToProxyInput = () => {
            this.switched = this.inputProxy.hasAttribute("checked");
            this.name = this.inputProxy.name;
            this.value = this.inputProxy.value;
        };
        this.syncProxyInputToThis = () => {
            this.switched
                ? this.inputProxy.setAttribute("checked", "")
                : this.inputProxy.removeAttribute("checked");
            this.inputProxy.setAttribute("name", this.name);
            this.inputProxy.setAttribute("value", this.value);
        };
        this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 7);
    }
    onClick(e) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && e.target === this.inputProxy) ||
            (!this.el.closest("label") && e.target === this.el)) {
            this.switched = !this.switched;
        }
    }
    keyDownHandler(e) {
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            this.switched = !this.switched;
        }
    }
    switchWatcher() {
        this.calciteSwitchChange.emit();
        this.switched
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    }
    connectedCallback() {
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        return (h(Host, { role: "checkbox", "aria-checked": this.switched, tabindex: "0" }, h("div", { class: "track" }, h("div", { class: "handle" })), h("slot", null)));
    }
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "checkbox";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        this.observer = new MutationObserver(this.syncThisToProxyInput);
        this.observer.observe(this.inputProxy, { attributes: true });
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "switched": ["switchWatcher"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-switch",
        "$members$": {
            "switched": [1540],
            "name": [1537],
            "value": [1537],
            "color": [1]
        },
        "$listeners$": [[0, "click", "onClick"], [0, "keydown", "keyDownHandler"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteTab {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Show this tab
         */
        this.isActive = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         */
        this.guid = `calcite-tab-title-${guid()}`;
        this.calciteTabRegister = createEvent(this, "calciteTabRegister", 7);
        this.calciteTabUnregister = createEvent(this, "calciteTabUnregister", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const id = this.el.id || this.guid;
        return (h(Host, { id: id, "aria-labeledby": this.labeledBy, "aria-expanded": this.isActive ? "true" : "false", role: "tabpanel" }, h("section", null, h("slot", null))));
    }
    componentDidLoad() {
        this.calciteTabRegister.emit();
    }
    componentDidUnload() {
        this.calciteTabUnregister.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    tabChangeHandler(event) {
        // to allow `<calcite-tabs>` to be nested we need to make sure this
        // `calciteTabChange` event was actually fired from a title that is a
        // child of the `<calcite-tabs>` that is the a parent of this tab.
        if (event.target.closest("calcite-tabs") !==
            this.el.closest("calcite-tabs")) {
            return;
        }
        if (this.tab) {
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
            });
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the index of this tab within the tab array
     */
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter(e => e.matches("calcite-tab")), this.el));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    updateAriaInfo(tabIds = [], titleIds = []) {
        this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-tab",
        "$members$": {
            "tab": [1537],
            "isActive": [1540, "is-active"],
            "labeledBy": [32],
            "getTabIndex": [64],
            "updateAriaInfo": [64]
        },
        "$listeners$": [[16, "calciteTabChange", "tabChangeHandler"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteTabNav {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabChange = createEvent(this, "calciteTabChange", 7);
    }
    selectedTabChanged() {
        if (localStorage &&
            this.storageId &&
            this.selectedTab !== undefined &&
            this.selectedTab !== null) {
            localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTab));
        }
        this.calciteTabChange.emit({
            tab: this.selectedTab
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        const storageKey = `calcite-tab-nav-${this.storageId}`;
        if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
            this.selectedTab = JSON.parse(localStorage.getItem(storageKey));
            this.calciteTabChange.emit({
                tab: this.selectedTab
            });
        }
    }
    render() {
        return (h(Host, { role: "tablist" }, h("nav", { class: "tab-nav" }, h("slot", null))));
    }
    componentDidRender() {
        // if every tab title is active select the first tab.
        if (this.tabTitles.every(title => !title.isActive) && !this.selectedTab) {
            this.tabTitles[0].getTabIdentifier().then(tab => {
                this.calciteTabChange.emit({
                    tab
                });
            });
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events Listeners
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    focusPreviousTabHandler(e) {
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const previousTab = this.tabTitles[currentIndex - 1] ||
            this.tabTitles[this.tabTitles.length - 1];
        previousTab.focus();
        e.stopPropagation();
        e.preventDefault();
    }
    /**
     * @internal
     */
    focusNextTabHandler(e) {
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const nextTab = this.tabTitles[currentIndex + 1] || this.tabTitles[0];
        nextTab.focus();
        e.stopPropagation();
        e.preventDefault();
    }
    /**
     * @internal
     */
    activateTabHandler(e) {
        if (e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
        else {
            this.selectedTab = this.getIndexOfTabTitle(e.target);
        }
        e.stopPropagation();
        e.preventDefault();
    }
    /**
     * @internal
     */
    globalTabChangeHandler(e) {
        if (this.syncId &&
            e.target !== this.el &&
            e.target.syncId === this.syncId &&
            this.selectedTab !== e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getIndexOfTabTitle(el) {
        return this.tabTitles.indexOf(el);
    }
    get tabTitles() {
        return this.el.shadowRoot.querySelector("slot").assignedElements();
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectedTab": ["selectedTabChanged"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-tab-nav",
        "$members$": {
            "storageId": [1, "storage-id"],
            "syncId": [1, "sync-id"],
            "selectedTab": [32]
        },
        "$listeners$": [[0, "calciteTabsFocusPrevious", "focusPreviousTabHandler"], [0, "calciteTabsFocusNext", "focusNextTabHandler"], [0, "calciteTabsActivate", "activateTabHandler"], [32, "calciteTabChange", "globalTabChangeHandler"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteTabTitle {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Show this tab title as selected
         */
        this.isActive = false;
        /**
         * @internal
         */
        this.guid = `calcite-tab-title-${guid()}`;
        this.calciteTabsActivate = createEvent(this, "calciteTabsActivate", 7);
        this.calciteTabsFocusNext = createEvent(this, "calciteTabsFocusNext", 7);
        this.calciteTabsFocusPrevious = createEvent(this, "calciteTabsFocusPrevious", 7);
        this.calciteTabTitleRegister = createEvent(this, "calciteTabTitleRegister", 7);
        this.calciteTabTitleUnregister = createEvent(this, "calciteTabTitleUnregister", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        if (this.tab && this.isActive) {
            this.calciteTabsActivate.emit({
                tab: this.tab
            });
        }
    }
    render() {
        const id = this.el.id || this.guid;
        return (h(Host, { id: id, "aria-controls": this.controls, "aria-expanded": this.isActive ? "true" : "false", role: "tab", tabindex: "0" }, h("a", null, h("slot", null))));
    }
    componentDidLoad() {
        this.calciteTabTitleRegister.emit();
    }
    componentDidUnload() {
        this.calciteTabTitleUnregister.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Events Listeners
    //
    //--------------------------------------------------------------------------
    tabChangeHandler(event) {
        if (this.tab) {
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
            });
        }
    }
    onClick() {
        this.calciteTabsActivate.emit({
            tab: this.tab
        });
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case SPACE:
            case ENTER:
                this.calciteTabsActivate.emit({
                    tab: this.tab
                });
                e.preventDefault();
                break;
            case RIGHT:
                if (getElementDir(this.el) === "ltr") {
                    this.calciteTabsFocusNext.emit();
                }
                else {
                    this.calciteTabsFocusPrevious.emit();
                }
                break;
            case LEFT:
                if (getElementDir(this.el) === "ltr") {
                    this.calciteTabsFocusPrevious.emit();
                }
                else {
                    this.calciteTabsFocusNext.emit();
                }
                break;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the index of this title within the nav
     */
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"), this.el));
    }
    /**
     * @internal
     */
    async getTabIdentifier() {
        return this.tab ? Promise.resolve(this.tab) : this.getTabIndex();
    }
    /**
     * @internal
     */
    async updateAriaInfo(tabIds = [], titleIds = []) {
        this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
        return Promise.resolve();
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-tab-title",
        "$members$": {
            "tab": [1537],
            "isActive": [1540, "is-active"],
            "controls": [32],
            "getTabIndex": [64],
            "getTabIdentifier": [64],
            "updateAriaInfo": [64]
        },
        "$listeners$": [[16, "calciteTabChange", "tabChangeHandler"], [0, "click", "onClick"], [0, "keydown", "keyDownHandler"]],
        "$attrsToReflect$": []
    }; }
}

class CalciteTabs {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Select theme (light or dark)
         */
        this.theme = "light";
        /**
         * Align tab titles to the edge or fully justify them across the tab nav ("center")
         */
        this.layout = "inline";
        //--------------------------------------------------------------------------
        //
        //  Events
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         *
         * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
         * attributes.
         */
        this.titles = [];
        /**
         * @internal
         *
         * Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes.
         */
        this.tabs = [];
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", null, h("slot", { name: "tab-nav" }), h("section", { class: "tab-contents" }, h("slot", null)))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    calciteTabTitleRegister(e) {
        this.titles = [...this.titles, e.target];
        this.registryHandler();
        e.stopPropagation();
    }
    /**
     * @internal
     */
    calciteTabTitleUnregister(e) {
        this.titles = this.titles.filter(el => el !== e.target);
        this.registryHandler();
        e.stopPropagation();
    }
    /**
     * @internal
     */
    calciteTabRegister(e) {
        this.tabs = [...this.tabs, e.target];
        this.registryHandler();
        e.stopPropagation();
    }
    /**
     * @internal
     */
    calciteTabUnregister(e) {
        this.tabs = this.tabs.filter(el => el !== e.target);
        this.registryHandler();
        e.stopPropagation();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     *
     * Matches up elements from the internal `tabs` and `titles` to automatically
     * update the ARIA attributes and link `<calcite-tab>` and
     * `<calcite-tab-title>` components.
     */
    async registryHandler() {
        var tabIds;
        var titleIds;
        // determine if we are using `tab` based or `index` based tab identifiers.
        if (this.tabs.some(e => e.tab) || this.titles.some(e => e.tab)) {
            // if we are using `tab` based identifiers sort by `tab` to account for
            // possible out of order tabs and get the id of each tab
            tabIds = this.tabs
                .sort((a, b) => a.tab.localeCompare(b.tab))
                .map(e => e.id);
            titleIds = this.titles
                .sort((a, b) => a.tab.localeCompare(b.tab))
                .map(e => e.id);
        }
        else {
            // if we are using index based tabs then the `<calcite-tab>` and
            // `<calcite-tab-title>` might have been rendered out of order so the
            // order of `this.tabs` and `this.titles` might not reflect the DOM state,
            // and might not match each other so we need to get the index of all the
            // tabs and titles in the DOM order to match them up as a source of truth
            const tabDomIndexes = await Promise.all(this.tabs.map(el => el.getTabIndex()));
            const titleDomIndexes = await Promise.all(this.titles.map(el => el.getTabIndex()));
            // once we have the DOM order as a source of truth we can build the
            // matching tabIds and titleIds arrays
            tabIds = tabDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = this.tabs[registryIndex].id;
                return ids;
            }, []);
            titleIds = titleDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = this.titles[registryIndex].id;
                return ids;
            }, []);
        }
        // pass all our new aria information to each `<calcite-tab>` and
        // `<calcite-tab-title>` which will check if they can update their internal
        // `controlled` or `labeledBy` states and re-render if necessary
        this.tabs.forEach(el => el.updateAriaInfo(tabIds, titleIds));
        this.titles.forEach(el => el.updateAriaInfo(tabIds, titleIds));
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-tabs",
        "$members$": {
            "theme": [513],
            "layout": [513],
            "titles": [32],
            "tabs": [32]
        },
        "$listeners$": [[0, "calciteTabTitleRegister", "calciteTabTitleRegister"], [0, "calciteTabTitleUnregister", "calciteTabTitleUnregister"], [0, "calciteTabRegister", "calciteTabRegister"], [0, "calciteTabUnregister", "calciteTabUnregister"]],
        "$attrsToReflect$": []
    }; }
}

class ContextConsumer {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.context = {};
        this.renderer = () => null;
    }
    connectedCallback() {
        if (this.subscribe != null) {
            this.unsubscribe = this.subscribe(this.el, 'context');
        }
    }
    disconnectedCallback() {
        if (this.unsubscribe != null) {
            this.unsubscribe();
        }
    }
    render() {
        return this.renderer(Object.assign({}, this.context));
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 0,
        "$tagName$": "context-consumer",
        "$members$": {
            "context": [16],
            "renderer": [16],
            "subscribe": [16],
            "unsubscribe": [32]
        },
        "$listeners$": undefined,
        "$attrsToReflect$": []
    }; }
}

const cmps = [
  CalciteAlert,
  CalciteAlerts,
  CalciteButton,
  CalciteCheckbox,
  CalciteExample,
  CalciteLoader,
  CalciteModal,
  CalciteProgress,
  CalciteRadioGroup,
  CalciteRadioGroupItem,
  CalciteSlider,
  CalciteSwitch,
  CalciteTab,
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs,
  ContextConsumer,
];
registerComponents(cmps);
styles.set('sc-calcite-alert','/*!\@body*/body.sc-calcite-alert{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-alert{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-alert{display:block}/*!\@:host*/.sc-calcite-alert-h{--calcite-alert-background:#fff;--calcite-alert-title-text:#404040;--calcite-alert-message-text:#555;--calcite-alert-icon-fill:#151515;--calcite-alert-close-background-hover:#f3f3f3;--calcite-alert-close-background-pressed:#eaeaea;--calcite-alert-count-text:#404040;--calcite-alert-count-border:#f3f3f3;--calcite-alert-dismiss-background:hsla(0,0%,100%,0.6);--calcite-alert-border-blue:#007ac2;--calcite-alert-border-green:#35ac46;--calcite-alert-border-red:#d83020;--calcite-alert-border-yellow:#edd317}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-alert-h{--calcite-alert-background:#2b2b2b;--calcite-alert-title-text:#f8f8f8;--calcite-alert-message-text:#f3f3f3;--calcite-alert-icon-fill:#d4d4d4;--calcite-alert-close-background-hover:#202020;--calcite-alert-close-background-pressed:#151515;--calcite-alert-count-text:#d4d4d4;--calcite-alert-count-border:#202020;--calcite-alert-dismiss-background:rgba(43,43,43,0.6);--calcite-alert-border-blue:#3db8ff;--calcite-alert-border-green:#3bed52;--calcite-alert-border-red:#ff0015;--calcite-alert-border-yellow:#fe3}/*!\@:host*/.sc-calcite-alert-h{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;pointer-events:none;z-index:102;margin:0 auto;width:50em;max-width:90%;max-height:0;background-color:var(--calcite-alert-background);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);border-radius:2px;opacity:0;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;-webkit-border-before:0 solid transparent;border-block-start:0 solid transparent}\@media only screen and (max-width:860px){/*!\@:host*/.sc-calcite-alert-h{width:100%;max-width:100%;border-radius:2px 2px 0 0;-webkit-box-shadow:0 -8px 16px 0 rgba(0,0,0,.15);box-shadow:0 -8px 16px 0 rgba(0,0,0,.15)}}/*!\@:host:host(.hydrated)*/.sc-calcite-alert-h (.hydrated).sc-calcite-alert-h{visibility:hidden!important}/*!\@:host:host([active])*/.sc-calcite-alert-h ([active]).sc-calcite-alert-h{opacity:1;max-height:100%;-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);pointer-events:auto;border-block-start-width:3px}/*!\@:host:host([active]):host(.hydrated)*/.sc-calcite-alert-h ([active]).sc-calcite-alert-h (.hydrated).sc-calcite-alert-h{visibility:visible!important}\@media only screen and (max-width:860px){/*!\@:host:host([active])*/.sc-calcite-alert-h ([active]).sc-calcite-alert-h{-webkit-transform:translateZ(0);transform:translateZ(0)}}/*!\@:host slot[name=alert-title]::slotted(div)*/.sc-calcite-alert-h slot[name=alert-title].sc-calcite-alert-s > div{font-size:1rem;line-height:1.5;color:var(--calcite-alert-title-text);font-weight:500}/*!\@:host slot[name=alert-link]::slotted(a),:host slot[name=alert-link]::slotted(calcite-button)*/.sc-calcite-alert-h slot[name=alert-link].sc-calcite-alert-s > a, .sc-calcite-alert-h slot[name=alert-link].sc-calcite-alert-s > calcite-button{font-size:.9375rem;line-height:1.5}/*!\@:host slot[name=alert-message]::slotted(div)*/.sc-calcite-alert-h slot[name=alert-message].sc-calcite-alert-s > div{display:inline;margin-right:.75rem;font-size:.9375rem;line-height:1.5;color:var(--calcite-alert-message-text)}/*!\@:host([dir=rtl]) slot[name=alert-message]::slotted(div)*/.sc-calcite-alert-h[dir=rtl] slot[name=alert-message].sc-calcite-alert-s > div{margin-right:unset;margin-left:.75rem}/*!\@.alert-content*/.alert-content.sc-calcite-alert{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;-webkit-padding-before:.75rem;padding-block-start:.75rem;-webkit-padding-after:.75rem;padding-block-end:.75rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}/*!\@.alert-content svg*/.alert-content.sc-calcite-alert svg.sc-calcite-alert{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){/*!\@.alert-content*/.alert-content.sc-calcite-alert{padding:1.5rem}}/*!\@.alert-content:first-of-type*/.alert-content.sc-calcite-alert:first-of-type{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}\@media only screen and (max-width:860px){/*!\@.alert-content*/.alert-content.sc-calcite-alert{-webkit-padding-before:1.5rem;padding-block-start:1.5rem;-webkit-padding-after:1.5rem;padding-block-end:1.5rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}}/*!\@.alert-icon*/.alert-icon.sc-calcite-alert{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}/*!\@.alert-icon svg*/.alert-icon.sc-calcite-alert svg.sc-calcite-alert{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){/*!\@.alert-icon*/.alert-icon.sc-calcite-alert{padding:1.5rem}}/*!\@.alert-close*/.alert-close.sc-calcite-alert{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;border-radius:0 0 2px 0}/*!\@.alert-close svg*/.alert-close.sc-calcite-alert svg.sc-calcite-alert{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){/*!\@.alert-close*/.alert-close.sc-calcite-alert{padding:1.5rem}}/*!\@.alert-close svg*/.alert-close.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-icon-fill)}/*!\@.alert-close:focus,.alert-close:hover*/.alert-close.sc-calcite-alert:focus, .alert-close.sc-calcite-alert:hover{background-color:var(--calcite-alert-close-background-hover)}/*!\@.alert-close:active*/.alert-close.sc-calcite-alert:active{background-color:var(--calcite-alert-close-background-pressed)}/*!\@:host([dir=rtl]) .alert-close*/[dir=rtl].sc-calcite-alert-h .alert-close.sc-calcite-alert{border-radius:0 0 0 2px}\@media only screen and (max-width:860px){/*!\@:host([dir=rtl]) .alert-close*/[dir=rtl].sc-calcite-alert-h .alert-close.sc-calcite-alert{border-radius:0}}/*!\@.alert-count*/.alert-count.sc-calcite-alert{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:space-evenly;justify-content:space-evenly;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:var(--calcite-alert-count-text);opacity:0;-webkit-border-start:0 solid transparent;border-inline-start:0 solid transparent;-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent;cursor:default;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@.alert-count.active*/.alert-count.active.sc-calcite-alert{visibility:visible;opacity:1;padding:0 .375rem;width:3rem;-webkit-border-start:1px solid var(--calcite-alert-count-border);border-inline-start:1px solid var(--calcite-alert-count-border);-webkit-border-end:1px solid var(--calcite-alert-count-border);border-inline-end:1px solid var(--calcite-alert-count-border)}/*!\@.alert-count.active:last-child*/.alert-count.active.sc-calcite-alert:last-child{-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent}\@media only screen and (max-width:860px){/*!\@.alert-count*/.alert-count.sc-calcite-alert{border-radius:0}}/*!\@.alert-dismiss*/.alert-dismiss.sc-calcite-alert{left:0;top:0;width:100%;z-index:103}/*!\@.alert-dismiss,.alert-dismiss:after*/.alert-dismiss.sc-calcite-alert, .alert-dismiss.sc-calcite-alert:after{display:block;position:absolute;right:0;height:3px}/*!\@.alert-dismiss:after*/.alert-dismiss.sc-calcite-alert:after{top:-3px;border-radius:2px 2px 0 0;content:\"\";background-color:var(--calcite-alert-dismiss-background);z-index:104}/*!\@:host([color=blue])*/[color=blue].sc-calcite-alert-h{border-block-start-color:var(--calcite-alert-border-blue)}/*!\@:host([color=blue]) .alert-icon svg*/[color=blue].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-blue)}/*!\@:host([color=red])*/[color=red].sc-calcite-alert-h{border-block-start-color:var(--calcite-alert-border-red)}/*!\@:host([color=red]) .alert-icon svg*/[color=red].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-red)}/*!\@:host([color=yellow])*/[color=yellow].sc-calcite-alert-h{border-block-start-color:var(--calcite-alert-border-yellow)}/*!\@:host([color=yellow]) .alert-icon svg*/[color=yellow].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-yellow)}/*!\@:host([color=green])*/[color=green].sc-calcite-alert-h{border-block-start-color:var(--calcite-alert-border-green)}/*!\@:host([color=green]) .alert-icon svg*/[color=green].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-green)}/*!\@:host([duration=fast]) .alert-dismiss:after*/[duration=fast].sc-calcite-alert-h .alert-dismiss.sc-calcite-alert:after{-webkit-animation:dismissProgress 6s ease-out;animation:dismissProgress 6s ease-out}/*!\@:host([duration=medium]) .alert-dismiss:after*/[duration=medium].sc-calcite-alert-h .alert-dismiss.sc-calcite-alert:after{-webkit-animation:dismissProgress 10s ease-out;animation:dismissProgress 10s ease-out}/*!\@:host([duration=slow]) .alert-dismiss:after*/[duration=slow].sc-calcite-alert-h .alert-dismiss.sc-calcite-alert:after{-webkit-animation:dismissProgress 14s ease-out;animation:dismissProgress 14s ease-out}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}');
styles.set('sc-calcite-alerts','/*!\@body*/body.sc-calcite-alerts{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-alerts{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-alerts{display:block}/*!\@:host*/.sc-calcite-alerts-h{display:none;position:fixed;left:0;right:0;bottom:0;pointer-events:none;z-index:101}/*!\@:host:host([active])*/.sc-calcite-alerts-h ([active]).sc-calcite-alerts-h{display:block}');
styles.set('sc-calcite-button','/*!\@body*/body.sc-calcite-button{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-button{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-button{display:block}/*!\@:host a,:host button*/.sc-calcite-button-h a.sc-calcite-button, .sc-calcite-button-h button.sc-calcite-button{position:relative;display:inline-block;padding:.375rem 1rem;text-decoration:none;width:auto;border-radius:0;border:none;line-height:inherit;font-family:inherit;-webkit-appearance:none;cursor:pointer;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@:host a:hover,:host button:hover*/.sc-calcite-button-h a.sc-calcite-button:hover, .sc-calcite-button-h button.sc-calcite-button:hover{text-decoration:none}/*!\@:host([width=half]) a,:host([width=half]) button*/[width=half].sc-calcite-button-h a.sc-calcite-button, [width=half].sc-calcite-button-h button.sc-calcite-button{width:50%}/*!\@:host([width=full]) a,:host([width=full]) button*/[width=full].sc-calcite-button-h a.sc-calcite-button, [width=full].sc-calcite-button-h button.sc-calcite-button{width:100%}/*!\@:host([hastext]) .calcite-button--graphic*/[hastext].sc-calcite-button-h .calcite-button--graphic.sc-calcite-button{margin-right:.5rem}/*!\@:host([hastext][dir=rtl]) .calcite-button--graphic*/[hastext][dir=rtl].sc-calcite-button-h .calcite-button--graphic.sc-calcite-button{margin-right:0;margin-left:.5rem}/*!\@.calcite-button--icon*/.calcite-button--icon.sc-calcite-button{height:16px;width:16px;margin:0 auto;line-height:inherit;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@.calcite-button--graphic*/.calcite-button--graphic.sc-calcite-button{display:-ms-inline-flexbox;display:inline-flex;top:2px;width:16px;height:16px;position:relative}/*!\@:host([appearance=solid][color=blue]) a,:host([appearance=solid][color=blue]) button*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button{color:#fff;background-color:#007ac2;border:1px solid #007ac2;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=solid][color=blue]) a:focus,:host([appearance=solid][color=blue]) a:hover,:host([appearance=solid][color=blue]) button:focus,:host([appearance=solid][color=blue]) button:hover*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{background-color:#2890ce;-webkit-box-shadow:inset 0 0 0 1px #007ac2;box-shadow:inset 0 0 0 1px #007ac2}/*!\@:host([appearance=solid][color=blue]) a:active,:host([appearance=solid][color=blue]) button:active*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button:active{background-color:#007ac2;border-color:#00619b;-webkit-box-shadow:inset 0 0 0 2px #00619b;box-shadow:inset 0 0 0 2px #00619b}/*!\@:host([appearance=solid][color=blue]) a .calcite-button--icon,:host([appearance=solid][color=blue]) button .calcite-button--icon*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#fff}/*!\@:host([appearance=solid][color=red]) a,:host([appearance=solid][color=red]) button*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button{color:#fff;background-color:#d83020;border:1px solid #d83020;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=solid][color=red]) a:focus,:host([appearance=solid][color=red]) a:hover,:host([appearance=solid][color=red]) button:focus,:host([appearance=solid][color=red]) button:hover*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button:hover{background-color:#e65240;-webkit-box-shadow:inset 0 0 0 1px #d83020;box-shadow:inset 0 0 0 1px #d83020}/*!\@:host([appearance=solid][color=red]) a:active,:host([appearance=solid][color=red]) button:active*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button:active{background-color:#d83020;border-color:#a82b1e;-webkit-box-shadow:inset 0 0 0 2px #a82b1e;box-shadow:inset 0 0 0 2px #a82b1e}/*!\@:host([appearance=solid][color=red]) a .calcite-button--icon,:host([appearance=solid][color=red]) button .calcite-button--icon*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#fff}/*!\@:host([appearance=solid][color=light]) a,:host([appearance=solid][color=light]) button*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button{color:#000;background-color:#f3f3f3;border:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=solid][color=light]) a:focus,:host([appearance=solid][color=light]) a:hover,:host([appearance=solid][color=light]) button:focus,:host([appearance=solid][color=light]) button:hover*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button:hover{background-color:#fff;-webkit-box-shadow:inset 0 0 0 1px #f3f3f3;box-shadow:inset 0 0 0 1px #f3f3f3}/*!\@:host([appearance=solid][color=light]) a:active,:host([appearance=solid][color=light]) button:active*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button:active{background-color:#f3f3f3;border-color:#eaeaea;-webkit-box-shadow:inset 0 0 0 2px #eaeaea;box-shadow:inset 0 0 0 2px #eaeaea}/*!\@:host([appearance=solid][color=light]) a .calcite-button--icon,:host([appearance=solid][color=light]) button .calcite-button--icon*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#000}/*!\@:host([appearance=solid][color=dark]) a,:host([appearance=solid][color=dark]) button*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button{color:#fff;background-color:#2b2b2b;border:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=solid][color=dark]) a:focus,:host([appearance=solid][color=dark]) a:hover,:host([appearance=solid][color=dark]) button:focus,:host([appearance=solid][color=dark]) button:hover*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{background-color:#404040;-webkit-box-shadow:inset 0 0 0 1px #2b2b2b;box-shadow:inset 0 0 0 1px #2b2b2b}/*!\@:host([appearance=solid][color=dark]) a:active,:host([appearance=solid][color=dark]) button:active*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button:active{background-color:#2b2b2b;border-color:#000;-webkit-box-shadow:inset 0 0 0 2px #000;box-shadow:inset 0 0 0 2px #000}/*!\@:host([appearance=solid][color=dark]) a .calcite-button--icon,:host([appearance=solid][color=dark]) button .calcite-button--icon*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#fff}/*!\@:host([appearance=outline][color=blue]) a,:host([appearance=outline][color=blue]) button*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button{color:#007ac2;background-color:#fff;border:1px solid #007ac2;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=blue]) a:hover,:host([appearance=outline][color=blue]) button:hover*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #007ac2;-webkit-box-shadow:inset 0 0 0 1px #007ac2;box-shadow:inset 0 0 0 1px #007ac2}/*!\@:host([appearance=outline][color=blue]) a:active,:host([appearance=outline][color=blue]) a:focus,:host([appearance=outline][color=blue]) button:active,:host([appearance=outline][color=blue]) button:focus*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:focus{color:#00619b;border-color:#00619b;-webkit-box-shadow:inset 0 0 0 2px #00619b;box-shadow:inset 0 0 0 2px #00619b}/*!\@:host([appearance=outline][color=blue]) a .calcite-button--icon,:host([appearance=outline][color=blue]) button .calcite-button--icon*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#007ac2}/*!\@:host([appearance=outline][color=red]) a,:host([appearance=outline][color=red]) button*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button{color:#d83020;background-color:#fff;border:1px solid #d83020;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=red]) a:hover,:host([appearance=outline][color=red]) button:hover*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #d83020;-webkit-box-shadow:inset 0 0 0 1px #d83020;box-shadow:inset 0 0 0 1px #d83020}/*!\@:host([appearance=outline][color=red]) a:active,:host([appearance=outline][color=red]) a:focus,:host([appearance=outline][color=red]) button:active,:host([appearance=outline][color=red]) button:focus*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:focus{color:#a82b1e;border-color:#a82b1e;-webkit-box-shadow:inset 0 0 0 2px #a82b1e;box-shadow:inset 0 0 0 2px #a82b1e}/*!\@:host([appearance=outline][color=red]) a .calcite-button--icon,:host([appearance=outline][color=red]) button .calcite-button--icon*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#d83020}/*!\@:host([appearance=outline][color=light]) a,:host([appearance=outline][color=light]) button*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button{color:#151515;background-color:#fff;border:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=light]) a:hover,:host([appearance=outline][color=light]) button:hover*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px #f3f3f3;box-shadow:inset 0 0 0 1px #f3f3f3}/*!\@:host([appearance=outline][color=light]) a:active,:host([appearance=outline][color=light]) a:focus,:host([appearance=outline][color=light]) button:active,:host([appearance=outline][color=light]) button:focus*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:focus{color:#000;border-color:#eaeaea;-webkit-box-shadow:inset 0 0 0 2px #eaeaea;box-shadow:inset 0 0 0 2px #eaeaea}/*!\@:host([appearance=outline][color=light]) a .calcite-button--icon,:host([appearance=outline][color=light]) button .calcite-button--icon*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#151515}/*!\@:host([appearance=outline][color=dark]) a,:host([appearance=outline][color=dark]) button*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button{color:#151515;background-color:#fff;border:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=dark]) a:hover,:host([appearance=outline][color=dark]) button:hover*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px #2b2b2b;box-shadow:inset 0 0 0 1px #2b2b2b}/*!\@:host([appearance=outline][color=dark]) a:active,:host([appearance=outline][color=dark]) a:focus,:host([appearance=outline][color=dark]) button:active,:host([appearance=outline][color=dark]) button:focus*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:focus{color:#000;border-color:#000;-webkit-box-shadow:inset 0 0 0 2px #000;box-shadow:inset 0 0 0 2px #000}/*!\@:host([appearance=outline][color=dark]) a .calcite-button--icon,:host([appearance=outline][color=dark]) button .calcite-button--icon*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#151515}/*!\@:host([appearance=clear][color=blue]) a,:host([appearance=clear][color=blue]) button*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button{color:#007ac2;background-color:transparent;border:1px solid #007ac2;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=blue]) a:hover,:host([appearance=clear][color=blue]) button:hover*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #007ac2;-webkit-box-shadow:inset 0 0 0 1px #007ac2;box-shadow:inset 0 0 0 1px #007ac2}/*!\@:host([appearance=clear][color=blue]) a:active,:host([appearance=clear][color=blue]) a:focus,:host([appearance=clear][color=blue]) button:active,:host([appearance=clear][color=blue]) button:focus*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:focus{color:#00619b;border-color:#00619b;-webkit-box-shadow:inset 0 0 0 2px #00619b;box-shadow:inset 0 0 0 2px #00619b}/*!\@:host([appearance=clear][color=blue]) a .calcite-button--icon,:host([appearance=clear][color=blue]) button .calcite-button--icon*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#007ac2}/*!\@:host([appearance=clear][color=red]) a,:host([appearance=clear][color=red]) button*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button{color:#d83020;background-color:transparent;border:1px solid #d83020;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=red]) a:hover,:host([appearance=clear][color=red]) button:hover*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #d83020;-webkit-box-shadow:inset 0 0 0 1px #d83020;box-shadow:inset 0 0 0 1px #d83020}/*!\@:host([appearance=clear][color=red]) a:active,:host([appearance=clear][color=red]) a:focus,:host([appearance=clear][color=red]) button:active,:host([appearance=clear][color=red]) button:focus*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:focus{color:#a82b1e;border-color:#a82b1e;-webkit-box-shadow:inset 0 0 0 2px #a82b1e;box-shadow:inset 0 0 0 2px #a82b1e}/*!\@:host([appearance=clear][color=red]) a .calcite-button--icon,:host([appearance=clear][color=red]) button .calcite-button--icon*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#d83020}/*!\@:host([appearance=clear][color=light]) a,:host([appearance=clear][color=light]) button*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button{color:#f8f8f8;background-color:transparent;border:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=light]) a:hover,:host([appearance=clear][color=light]) button:hover*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px #f3f3f3;box-shadow:inset 0 0 0 1px #f3f3f3}/*!\@:host([appearance=clear][color=light]) a:active,:host([appearance=clear][color=light]) a:focus,:host([appearance=clear][color=light]) button:active,:host([appearance=clear][color=light]) button:focus*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:focus{color:#fff;border-color:#eaeaea;-webkit-box-shadow:inset 0 0 0 2px #eaeaea;box-shadow:inset 0 0 0 2px #eaeaea}/*!\@:host([appearance=clear][color=light]) a .calcite-button--icon,:host([appearance=clear][color=light]) button .calcite-button--icon*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#f8f8f8}/*!\@:host([appearance=clear][color=dark]) a,:host([appearance=clear][color=dark]) button*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button{color:#151515;background-color:transparent;border:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=dark]) a:hover,:host([appearance=clear][color=dark]) button:hover*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px #2b2b2b;box-shadow:inset 0 0 0 1px #2b2b2b}/*!\@:host([appearance=clear][color=dark]) a:active,:host([appearance=clear][color=dark]) a:focus,:host([appearance=clear][color=dark]) button:active,:host([appearance=clear][color=dark]) button:focus*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:focus{color:#000;border-color:#000;-webkit-box-shadow:inset 0 0 0 2px #000;box-shadow:inset 0 0 0 2px #000}/*!\@:host([appearance=clear][color=dark]) a .calcite-button--icon,:host([appearance=clear][color=dark]) button .calcite-button--icon*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#151515}/*!\@:host([appearance=inline][color=blue]) a,:host([appearance=inline][color=blue]) button*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h button.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:#007ac2;font-weight:500;font-size:inherit;white-space:normal;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(rgba(0,122,194,.4)),to(rgba(0,122,194,.4)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(rgba(0,122,194,.4),rgba(0,122,194,.4));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 2px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=blue]) a:focus,:host([appearance=inline][color=blue]) a:hover,:host([appearance=inline][color=blue]) button:focus,:host([appearance=inline][color=blue]) button:hover*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=blue].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=inline][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{color:#2890ce;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=blue]) a:active,:host([appearance=inline][color=blue]) button:active*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=blue].sc-calcite-button-h button.sc-calcite-button:active{color:#007ac2;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=blue]) a .calcite-button--icon,:host([appearance=inline][color=blue]) button .calcite-button--icon*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#007ac2;max-height:.8571428571rem;-webkit-margin-end:.375rem;margin-inline-end:.375rem}/*!\@:host([appearance=inline][color=red]) a,:host([appearance=inline][color=red]) button*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h button.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:#d83020;font-weight:500;font-size:inherit;white-space:normal;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(rgba(216,48,32,.4)),to(rgba(216,48,32,.4)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(rgba(216,48,32,.4),rgba(216,48,32,.4));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 2px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=red]) a:focus,:host([appearance=inline][color=red]) a:hover,:host([appearance=inline][color=red]) button:focus,:host([appearance=inline][color=red]) button:hover*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=red].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=inline][color=red].sc-calcite-button-h button.sc-calcite-button:hover{color:#e65240;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=red]) a:active,:host([appearance=inline][color=red]) button:active*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=red].sc-calcite-button-h button.sc-calcite-button:active{color:#d83020;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=red]) a .calcite-button--icon,:host([appearance=inline][color=red]) button .calcite-button--icon*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#d83020;max-height:.8571428571rem;-webkit-margin-end:.375rem;margin-inline-end:.375rem}/*!\@:host([appearance=inline][color=light]) a,:host([appearance=inline][color=light]) button*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h button.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:#f3f3f3;font-weight:500;font-size:inherit;white-space:normal;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,95.3%,.4)),to(hsla(0,0%,95.3%,.4)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(hsla(0,0%,95.3%,.4),hsla(0,0%,95.3%,.4));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 2px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=light]) a:focus,:host([appearance=inline][color=light]) a:hover,:host([appearance=inline][color=light]) button:focus,:host([appearance=inline][color=light]) button:hover*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=light].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=inline][color=light].sc-calcite-button-h button.sc-calcite-button:hover{color:#fff;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=light]) a:active,:host([appearance=inline][color=light]) button:active*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=light].sc-calcite-button-h button.sc-calcite-button:active{color:#f3f3f3;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=light]) a .calcite-button--icon,:host([appearance=inline][color=light]) button .calcite-button--icon*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#f3f3f3;max-height:.8571428571rem;-webkit-margin-end:.375rem;margin-inline-end:.375rem}/*!\@:host([appearance=inline][color=dark]) a,:host([appearance=inline][color=dark]) button*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h button.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:#2b2b2b;font-weight:500;font-size:inherit;white-space:normal;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(rgba(43,43,43,.4)),to(rgba(43,43,43,.4)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(rgba(43,43,43,.4),rgba(43,43,43,.4));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 2px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=dark]) a:focus,:host([appearance=inline][color=dark]) a:hover,:host([appearance=inline][color=dark]) button:focus,:host([appearance=inline][color=dark]) button:hover*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=dark].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=inline][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{color:#404040;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=dark]) a:active,:host([appearance=inline][color=dark]) button:active*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=dark].sc-calcite-button-h button.sc-calcite-button:active{color:#2b2b2b;background-size:100% 2px,100% 1px}/*!\@:host([appearance=inline][color=dark]) a .calcite-button--icon,:host([appearance=inline][color=dark]) button .calcite-button--icon*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#2b2b2b;max-height:.8571428571rem;-webkit-margin-end:.375rem;margin-inline-end:.375rem}/*!\@:host([appearance=inline][dir=rtl]) a,:host([appearance=inline][dir=rtl]) button*/[appearance=inline][dir=rtl].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][dir=rtl].sc-calcite-button-h button.sc-calcite-button{background-position:100% 100%,100% 100%}/*!\@:host([scale=xs]:not([appearance=inline])) a,:host([scale=xs]:not([appearance=inline])) button*/[scale=xs].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xs].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem/ 6) calc(1.5rem* .3);font-size:.8125rem;line-height:1.5}/*!\@:host([scale=s]:not([appearance=inline])) a,:host([scale=s]:not([appearance=inline])) button*/[scale=s].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=s].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem/ 4) calc(1.5rem* .5);font-size:.875rem;line-height:1.5}/*!\@:host([scale=m]:not([appearance=inline])) a,:host([scale=m]:not([appearance=inline])) button*/[scale=m].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=m].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem/ 3) calc(1.5rem* .75);font-size:.9375rem;line-height:1.5}/*!\@:host([scale=l]:not([appearance=inline])) a,:host([scale=l]:not([appearance=inline])) button*/[scale=l].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=l].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem / 2) calc(1.5rem* 1);font-size:1.2019rem;line-height:1.5}\@media screen and (max-width:859px){/*!\@:host([scale=l]:not([appearance=inline])) a,:host([scale=l]:not([appearance=inline])) button*/[scale=l].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=l].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.1305rem}}\@media screen and (max-width:479px){/*!\@:host([scale=l]:not([appearance=inline])) a,:host([scale=l]:not([appearance=inline])) button*/[scale=l].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=l].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.0625rem}}/*!\@:host([scale=xl]:not([appearance=inline])) a,:host([scale=xl]:not([appearance=inline])) button*/[scale=xl].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xl].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem / 1.5) calc(1.5rem* 1.25);font-size:1.414rem;line-height:1.5}\@media screen and (max-width:859px){/*!\@:host([scale=xl]:not([appearance=inline])) a,:host([scale=xl]:not([appearance=inline])) button*/[scale=xl].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xl].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.33rem}}\@media screen and (max-width:479px){/*!\@:host([scale=xl]:not([appearance=inline])) a,:host([scale=xl]:not([appearance=inline])) button*/[scale=xl].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xl].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.25rem}}');
styles.set('sc-calcite-checkbox','/*!\@body*/body.sc-calcite-checkbox{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-checkbox{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-checkbox{display:block}/*!\@::slotted(input)*/.sc-calcite-checkbox-s > input{display:none}/*!\@:host*/.sc-calcite-checkbox-h{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;tap-highlight-color:transparent}/*!\@.check-svg,:host*/.check-svg.sc-calcite-checkbox, .sc-calcite-checkbox-h{display:inline-block;cursor:pointer}/*!\@.check-svg*/.check-svg.sc-calcite-checkbox{width:20px;height:20px;overflow:hidden;background-color:#fff;border:1px solid #757575;border-radius:2px;vertical-align:-.25em;margin-right:.25em;-webkit-transition:all .15s linear;transition:all .15s linear;-webkit-box-sizing:border-box;box-sizing:border-box}/*!\@:host([theme=dark]) .check-svg*/[theme=dark].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:transparent;border-color:#eaeaea}/*!\@:host([theme=dark][disabled]) .check-svg*/[theme=dark][disabled].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{border-color:#757575;background-color:#2b2b2b}/*!\@:host([theme=dark][checked]) .check-svg,:host([theme=dark][indeterminate]) .check-svg*/[theme=dark][checked].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox, [theme=dark][indeterminate].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#3db8ff}/*!\@:host([size=large]) .check-svg*/[size=large].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{width:24px;height:24px;border-radius:4px}/*!\@:host([size=small]) .check-svg*/[size=small].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{width:16px;height:16px}/*!\@:host([disabled])*/[disabled].sc-calcite-checkbox-h{pointer-events:none;cursor:default}/*!\@:host([disabled]) .check-svg*/[disabled].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#f3f3f3;border-color:#eaeaea}/*!\@:host([disabled][checked]) .check-svg,:host([disabled][indeterminate]) .check-svg*/[disabled][checked].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox, [disabled][indeterminate].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#84c1e8;border-color:#84c1e8}/*!\@:host([checked]) .check-svg,:host([indeterminate]) .check-svg*/[checked].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox, [indeterminate].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#007ac2;border:1px solid #007ac2}/*!\@:host(:focus),:host(:hover)*/.sc-calcite-checkbox-h:focus, .sc-calcite-checkbox-h:hover{outline:none}/*!\@:host(:focus) .check-svg,:host(:hover) .check-svg*/.sc-calcite-checkbox-h:focus .check-svg.sc-calcite-checkbox, .sc-calcite-checkbox-h:hover .check-svg.sc-calcite-checkbox{border-color:#0079c1!important;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.075),0 0 5px rgba(81,167,232,.5),0 0 5px rgba(81,167,232,.5);box-shadow:inset 0 1px 2px rgba(0,0,0,.075),0 0 5px rgba(81,167,232,.5),0 0 5px rgba(81,167,232,.5)}');
styles.set('sc-calcite-example','/*!\@body*/body.sc-calcite-example{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-example{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-example{display:block}');
styles.set('sc-calcite-loader','/*!\@body*/body.sc-calcite-loader{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-loader{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-loader{display:block}/*!\@:host*/.sc-calcite-loader-h{--calcite-loader-spot:#007ac2;--calcite-loader-spot-light:#009af2;--calcite-loader-spot-dark:#00619b;--calcite-loader-neutral:#eaeaea}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-loader-h{--calcite-loader-neutral:#151515}/*!\@:host*/.sc-calcite-loader-h{position:relative;display:none;padding-bottom:4rem;padding-top:4rem;margin-left:auto;margin-right:auto;min-height:54px;stroke:var(--calcite-loader-light);stroke-width:6px;stroke-dashoffset:0;fill:none;animation:loader-color-shift 2s linear infinite alternate-reverse}/*!\@:host([is-active])*/[is-active].sc-calcite-loader-h{display:block}/*!\@.loader__text*/.loader__text.sc-calcite-loader{margin-top:4rem;line-height:1.5}/*!\@.loader__percentage,.loader__text*/.loader__percentage.sc-calcite-loader, .loader__text.sc-calcite-loader{display:block;text-align:center;font-size:.875rem}/*!\@.loader__percentage*/.loader__percentage.sc-calcite-loader{left:50%;margin-top:27px;line-height:.25}/*!\@.loader__percentage,.loader__square*/.loader__percentage.sc-calcite-loader, .loader__square.sc-calcite-loader{width:54px;position:absolute;top:4rem;margin-left:-27px}/*!\@.loader__square*/.loader__square.sc-calcite-loader{height:54px;left:0;left:50%;stroke-dasharray:50% 350%;-webkit-animation:loader-clockwise 2s linear infinite;animation:loader-clockwise 2s linear infinite}/*!\@.loader__square--2*/.loader__square--2.sc-calcite-loader{stroke-dasharray:100% 225% 50% 25%;-webkit-animation:loader-clockwise 1s linear infinite;animation:loader-clockwise 1s linear infinite}/*!\@.loader__square--3*/.loader__square--3.sc-calcite-loader{stroke-dasharray:50% 50% 75% 225%;-webkit-animation:loader-clockwise 1.85s linear infinite;animation:loader-clockwise 1.85s linear infinite}\@supports (-ms-ime-align:auto){/*!\@.loader__square*/.loader__square.sc-calcite-loader{stroke-dashoffset:var(--calcite-loader-offset);-webkit-animation:none;animation:none}/*!\@.loader__square--2*/.loader__square--2.sc-calcite-loader{stroke-dashoffset:var(--calcite-loader-offset2)}/*!\@.loader__square--3*/.loader__square--3.sc-calcite-loader{stroke-dashoffset:var(--calcite-loader-offset3)}}/*!\@:host([type=determinate])*/[type=determinate].sc-calcite-loader-h{stroke:var(--calcite-loader-neutral);-webkit-animation:none;animation:none}/*!\@:host([type=determinate]) .loader__square--3*/[type=determinate].sc-calcite-loader-h .loader__square--3.sc-calcite-loader{stroke:var(--calcite-loader-spot);stroke-dasharray:400%;stroke-dashoffset:var(--calcite-loader-progress);-webkit-transition:all 50ms linear;transition:all 50ms linear;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation:none;animation:none}/*!\@:host([inline])*/[inline].sc-calcite-loader-h{stroke:currentColor;stroke-width:4px;-webkit-animation:none;animation:none;margin:0;padding-bottom:0;padding-top:0;position:relative;height:16px;min-height:16px;width:16px;margin-right:8px;vertical-align:-2px}/*!\@:host([inline][dir=rtl])*/[inline][dir=rtl].sc-calcite-loader-h{margin-left:8px;margin-right:0}/*!\@:host([is-active][inline])*/[is-active][inline].sc-calcite-loader-h{display:inline-block}/*!\@:host([inline]) .loader__square*/[inline].sc-calcite-loader-h .loader__square.sc-calcite-loader{margin:0;position:absolute;top:0;left:0;width:16px;height:16px}\@-webkit-keyframes loader-color-shift{0%{stroke:var(--calcite-loader-spot-light)}to{stroke:var(--calcite-loader-spot-dark)}}\@keyframes loader-color-shift{0%{stroke:var(--calcite-loader-spot-light)}to{stroke:var(--calcite-loader-spot-dark)}}\@-webkit-keyframes loader-clockwise{0%{stroke-dashoffset:0}to{stroke-dashoffset:-400%}}\@keyframes loader-clockwise{0%{stroke-dashoffset:0}to{stroke-dashoffset:-400%}}');
styles.set('sc-calcite-modal','/*!\@body*/body.sc-calcite-modal{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-modal{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-modal{display:block}/*!\@:host*/.sc-calcite-modal-h{--calcite-modal-background:#fff;--calcite-modal-hover:#f3f3f3;--calcite-modal-pressed:#eaeaea;--calcite-modal-header-text:#151515;--calcite-modal-body-text:#151515;--calcite-modal-scrim:rgba(0,0,0,0.75);--calcite-modal-border:#f3f3f3;--calcite-modal-red:#d83020;--calcite-modal-blue:#007ac2;position:fixed;top:0;right:0;bottom:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;overflow-y:hidden;color:var(--calcite-modal-body-text);opacity:0;visibility:hidden!important;background:var(--calcite-modal-scrim);-webkit-transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);z-index:101}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-modal-h{--calcite-modal-background:#353535;--calcite-modal-pressed:#202020;--calcite-modal-header-text:#fff;--calcite-modal-body-text:#f3f3f3;--calcite-modal-scrim:rgba(0,0,0,0.75);--calcite-modal-border:#2b2b2b;--calcite-modal-hover:#2b2b2b;--calcite-modal-red:#d90012;--calcite-modal-blue:#009af2}/*!\@.modal*/.modal.sc-calcite-modal{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:80vh;z-index:102;float:none;text-align:left;overflow-y:auto;-webkit-overflow-scrolling:touch;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:row-wrap;flex-wrap:row-wrap;opacity:0;visibility:hidden;-webkit-transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);margin:1.5rem}/*!\@:host(.is-active)*/.is-active.sc-calcite-modal-h{visibility:visible!important;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms}/*!\@:host(.is-active) .modal*/.is-active.sc-calcite-modal-h .modal.sc-calcite-modal{visibility:visible;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88)}/*!\@:host([dir=rtl]) .modal*/[dir=rtl].sc-calcite-modal-h .modal.sc-calcite-modal{text-align:right}/*!\@:host([theme=dark]) .modal*/[theme=dark].sc-calcite-modal-h .modal.sc-calcite-modal{border:1px solid #202020}/*!\@focus-trap*/focus-trap.sc-calcite-modal{-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column}/*!\@.modal__header,focus-trap*/.modal__header.sc-calcite-modal, focus-trap.sc-calcite-modal{display:-ms-flexbox;display:flex}/*!\@.modal__header*/.modal__header.sc-calcite-modal{background-color:var(--calcite-modal-background);-ms-flex:0;flex:0;max-width:100%;min-width:0;z-index:2;border-bottom:1px solid var(--calcite-modal-border)}/*!\@.modal__close*/.modal__close.sc-calcite-modal{padding:1.125rem;-ms-flex-order:2;order:2;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;color:var(--calcite-modal-body-text);outline:none;cursor:pointer}/*!\@.modal__close svg*/.modal__close.sc-calcite-modal svg.sc-calcite-modal{pointer-events:none}/*!\@.modal__close:focus,.modal__close:hover*/.modal__close.sc-calcite-modal:focus, .modal__close.sc-calcite-modal:hover{background-color:var(--calcite-modal-hover)}/*!\@.modal__close:active*/.modal__close.sc-calcite-modal:active{background-color:var(--calcite-modal-pressed)}/*!\@.modal__title*/.modal__title.sc-calcite-modal{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.75rem 1.5rem;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-order:1;order:1;min-width:0}/*!\@slot[name=header]::slotted(*)*/slot[name=header].sc-calcite-modal-s > *{margin:0;font-weight:400;font-size:1.414rem;line-height:1.5;color:var(--calcite-modal-header-text)}\@media screen and (max-width:859px){/*!\@slot[name=header]::slotted(*)*/slot[name=header].sc-calcite-modal-s > *{font-size:1.33rem}}\@media screen and (max-width:479px){/*!\@slot[name=header]::slotted(*)*/slot[name=header].sc-calcite-modal-s > *{font-size:1.25rem}}/*!\@.modal__content*/.modal__content.sc-calcite-modal{position:relative;padding:1.5rem;height:100%;-ms-flex:0;flex:0;overflow:auto;display:block;background-color:var(--calcite-modal-background);z-index:1}/*!\@slot[name=content]::slotted(*)*/slot[name=content].sc-calcite-modal-s > *{font-size:1rem;line-height:1.5}/*!\@.modal__footer*/.modal__footer.sc-calcite-modal{background-color:var(--calcite-modal-background);-ms-flex:0;flex:0;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;padding:1.2rem 1.125rem;border-top:1px solid var(--calcite-modal-border);z-index:2}/*!\@.modal__footer--hide-back slot[name=back],.modal__footer--hide-secondary slot[name=secondary]*/.modal__footer--hide-back.sc-calcite-modal slot[name=back].sc-calcite-modal, .modal__footer--hide-secondary.sc-calcite-modal slot[name=secondary].sc-calcite-modal{display:none}/*!\@slot[name=back]*/slot[name=back].sc-calcite-modal{display:block;margin-right:auto}/*!\@:host([dir=rtl]) slot[name=back]*/[dir=rtl].sc-calcite-modal-h slot[name=back].sc-calcite-modal{margin-left:auto;margin-right:unset}/*!\@slot[name=secondary]*/slot[name=secondary].sc-calcite-modal{display:block;margin:0 .375rem}/*!\@slot[name=primary]*/slot[name=primary].sc-calcite-modal{display:block}/*!\@:host([size=small]) .modal*/[size=small].sc-calcite-modal-h .modal.sc-calcite-modal{max-width:32rem}\@media screen and (max-width:35rem){/*!\@:host([size=small]) .modal*/[size=small].sc-calcite-modal-h .modal.sc-calcite-modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}/*!\@:host([size=small]) .modal__content*/[size=small].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 auto;flex:1 1 auto}/*!\@:host([size=small][docked])*/[size=small][docked].sc-calcite-modal-h{-ms-flex-align:end;align-items:flex-end}}/*!\@:host([size=medium]) .modal*/[size=medium].sc-calcite-modal-h .modal.sc-calcite-modal{max-width:64rem}\@media screen and (max-width:67rem){/*!\@:host([size=medium]) .modal*/[size=medium].sc-calcite-modal-h .modal.sc-calcite-modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}/*!\@:host([size=medium]) .modal__content*/[size=medium].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 auto;flex:1 1 auto}/*!\@:host([size=medium][docked])*/[size=medium][docked].sc-calcite-modal-h{-ms-flex-align:end;align-items:flex-end}}/*!\@:host([size=large]) .modal*/[size=large].sc-calcite-modal-h .modal.sc-calcite-modal{max-width:94rem}\@media screen and (max-width:97rem){/*!\@:host([size=large]) .modal*/[size=large].sc-calcite-modal-h .modal.sc-calcite-modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}/*!\@:host([size=large]) .modal__content*/[size=large].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 auto;flex:1 1 auto}/*!\@:host([size=large][docked])*/[size=large][docked].sc-calcite-modal-h{-ms-flex-align:end;align-items:flex-end}}/*!\@:host([size=fullscreen])*/[size=fullscreen].sc-calcite-modal-h{background-color:transparent}/*!\@:host([size=fullscreen]) .modal*/[size=fullscreen].sc-calcite-modal-h .modal.sc-calcite-modal{-webkit-transform:translate3D(0,20px,0) scale(.95);transform:translate3D(0,20px,0) scale(.95);height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}/*!\@:host([size=fullscreen]) .modal__content*/[size=fullscreen].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 auto;flex:1 1 auto}/*!\@:host(.is-active[size=fullscreen]) .modal*/.is-active[size=fullscreen].sc-calcite-modal-h .modal.sc-calcite-modal{-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}/*!\@:host([docked]) .modal*/[docked].sc-calcite-modal-h .modal.sc-calcite-modal{height:auto!important}/*!\@:host([docked]) .modal__content*/[docked].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:0;flex:0;height:auto}/*!\@:host([color=red]) .modal*/[color=red].sc-calcite-modal-h .modal.sc-calcite-modal{border-top:4px solid var(--calcite-modal-red);border-radius:2px 2px 0 0}/*!\@:host([color=blue]) .modal*/[color=blue].sc-calcite-modal-h .modal.sc-calcite-modal{border-top:4px solid var(--calcite-modal-blue);border-radius:2px 2px 0 0}\@media screen and (max-width:860px){/*!\@slot[name=header]::slotted(*)*/slot[name=header].sc-calcite-modal-s > *{font-size:1.2019rem;line-height:1.5}}\@media screen and (max-width:860px) and (max-width:859px){/*!\@slot[name=header]::slotted(*)*/slot[name=header].sc-calcite-modal-s > *{font-size:1.1305rem}}\@media screen and (max-width:860px) and (max-width:479px){/*!\@slot[name=header]::slotted(*)*/slot[name=header].sc-calcite-modal-s > *{font-size:1.0625rem}}\@media screen and (max-width:860px){/*!\@.modal__title*/.modal__title.sc-calcite-modal{padding:.375rem 1.0125rem}}\@media screen and (max-width:860px){/*!\@.modal__close,.modal__content*/.modal__close.sc-calcite-modal, .modal__content.sc-calcite-modal{padding:1.0125rem}}\@media screen and (max-width:860px){/*!\@.modal__footer*/.modal__footer.sc-calcite-modal{position:-webkit-sticky;position:sticky;bottom:0}}\@media screen and (max-width:480px){/*!\@.modal__footer*/.modal__footer.sc-calcite-modal{-ms-flex-direction:column;flex-direction:column}/*!\@slot[name=back],slot[name=secondary]*/slot[name=back].sc-calcite-modal, slot[name=secondary].sc-calcite-modal{margin:0 0 .375rem 0}}');
styles.set('sc-calcite-progress','body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tabs{display:block}.calcite-progress{position:relative;display:block}.calcite-progress:after,.calcite-progress:before{content:\"\";opacity:1;position:absolute;height:2px;top:0;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out}.calcite-progress:before{background-color:#007ac2;z-index:0;width:100%}.calcite-progress:after{background-color:hsla(0,0%,100%,.6);z-index:0}.calcite-progress[type=indeterminate]:after{width:20%;-webkit-animation:looping-progresss-bar-ani 1.5s linear infinite;animation:looping-progresss-bar-ani 1.5s linear infinite}.calcite-progress[type=determinate]:after{width:var(--percentage-value)}.calcite-progress__text{text-align:center}\@-webkit-keyframes looping-progresss-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}\@keyframes looping-progresss-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}');
styles.set('sc-calcite-radio-group','/*!\@body*/body.sc-calcite-radio-group{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-radio-group{overflow:hidden}/*!\@:host,calcite-tabs*/.sc-calcite-radio-group-h, calcite-tabs.sc-calcite-radio-group{display:block}/*!\@:host*/.sc-calcite-radio-group-h{--calcite-radio-group-color:#fff;--calcite-radio-group-border-color:#757575;--calcite-radio-group-color-active:#007ac2;--calcite-radio-group-text-color:#000;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#f8f8f8;font-size:.9375rem;line-height:1.5}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-radio-group-h{--calcite-radio-group-color:#2b2b2b;--calcite-radio-group-border-color:#202020;--calcite-radio-group-color-active:#009af2;--calcite-radio-group-text-color:#fff;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#353535}/*!\@::slotted(calcite-radio-group-item:focus),::slotted(calcite-radio-group-item[checked])*/.sc-calcite-radio-group-s > calcite-radio-group-item:focus, .sc-calcite-radio-group-s > calcite-radio-group-item[checked]{z-index:0}/*!\@slot*/slot.sc-calcite-radio-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}');
styles.set('sc-calcite-radio-group-item','/*!\@body*/body.sc-calcite-radio-group-item{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-radio-group-item{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-radio-group-item{display:block}/*!\@:host*/.sc-calcite-radio-group-item-h{display:-ms-flexbox;display:flex;background-color:var(--calcite-radio-group-color);color:var(--calcite-radio-group-text-color);padding:.5rem 1rem;line-height:1.25;margin:.25rem -1px 0 0;border:1px solid var(--calcite-radio-group-border-color);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background .1s ease-in-out,border-color .1s ease-in-out;transition:background .1s ease-in-out,border-color .1s ease-in-out;cursor:pointer}/*!\@:host(:hover)*/.sc-calcite-radio-group-item-h:hover{background-color:var(--calcite-radio-group-color-hover)}/*!\@:host([checked])*/[checked].sc-calcite-radio-group-item-h{background-color:var(--calcite-radio-group-color-active);border-color:var(--calcite-radio-group-color-active);color:var(--calcite-radio-group-text-color-active);cursor:default}/*!\@label*/label.sc-calcite-radio-group-item{cursor:pointer}/*!\@::slotted(input)*/.sc-calcite-radio-group-item-s > input{display:none}');
styles.set('sc-calcite-slider','/*!\@body*/body.sc-calcite-slider{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-slider{overflow:hidden}/*!\@:host,calcite-tabs*/.sc-calcite-slider-h, calcite-tabs.sc-calcite-slider{display:block}/*!\@:host*/.sc-calcite-slider-h{--calcite-slider-spot:#007ac2;padding:7px 0;margin:7px 0;position:relative}/*!\@:host([disabled])*/[disabled].sc-calcite-slider-h{opacity:.5;pointer-events:none}/*!\@:host([label-handles]),:host([precise])*/[label-handles].sc-calcite-slider-h, [precise].sc-calcite-slider-h{margin-top:21px}/*!\@:host([label-ticks]),:host([precise][is-range])*/[label-ticks].sc-calcite-slider-h, [precise][is-range].sc-calcite-slider-h{margin-bottom:21px}/*!\@:host([precise][label-handles])*/[precise][label-handles].sc-calcite-slider-h{margin-top:35px}/*!\@:host([precise][label-handles][is-range])*/[precise][label-handles][is-range].sc-calcite-slider-h{margin-bottom:35px}/*!\@.slider__thumb*/.slider__thumb.sc-calcite-slider{position:absolute;right:var(--calcite-slider-range-max);height:28px;width:28px;margin:-14px;-webkit-box-sizing:border-box;box-sizing:border-box;border:none;background:transparent;cursor:pointer;font-family:inherit;z-index:3}/*!\@.slider__thumb--min*/.slider__thumb--min.sc-calcite-slider{right:auto;left:var(--calcite-slider-range-min)}/*!\@.slider__handle*/.slider__handle.sc-calcite-slider{position:absolute;top:0;left:0;height:14px;width:14px;margin:7px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:100%;background-color:#fff;border:2px solid #959595;-webkit-transition:border .25s ease,background-color .25s ease,-webkit-box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,-webkit-box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,box-shadow .25s ease,-webkit-box-shadow .25s ease}/*!\@.slider__handle__label*/.slider__handle__label.sc-calcite-slider{position:absolute;left:0;bottom:28px;width:28px;height:.75em;font-size:.8125rem;line-height:1.5;line-height:1;color:#555;text-align:center}/*!\@.slider__thumb:hover .slider__handle*/.slider__thumb.sc-calcite-slider:hover .slider__handle.sc-calcite-slider{border-color:var(--calcite-slider-spot);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.1);box-shadow:0 0 16px 0 rgba(0,0,0,.1)}/*!\@.slider__thumb--active,.slider__thumb:focus*/.slider__thumb--active.sc-calcite-slider, .slider__thumb.sc-calcite-slider:focus{outline:none;z-index:4}/*!\@.slider__thumb--active .slider__handle,.slider__thumb:focus .slider__handle*/.slider__thumb--active.sc-calcite-slider .slider__handle.sc-calcite-slider, .slider__thumb.sc-calcite-slider:focus .slider__handle.sc-calcite-slider{background-color:var(--calcite-slider-spot);border-color:var(--calcite-slider-spot);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.2);box-shadow:0 0 16px 0 rgba(0,0,0,.2)}/*!\@.slider__thumb--precise*/.slider__thumb--precise.sc-calcite-slider{margin-top:-28px}/*!\@.slider__thumb--precise:after*/.slider__thumb--precise.sc-calcite-slider:after{content:\"\";display:block;position:absolute;top:14px;left:50%;width:2px;height:7px;background-color:#959595;margin-left:-1px;margin-top:7px;z-index:2}/*!\@.slider__thumb--active.slider__thumb--precise:after,.slider__thumb:focus.slider__thumb--precise:after*/.slider__thumb--active.slider__thumb--precise.sc-calcite-slider:after, .slider__thumb.sc-calcite-slider:focus.slider__thumb--precise:after{background-color:var(--calcite-slider-spot)}/*!\@.slider__thumb--precise.slider__thumb--min*/.slider__thumb--precise.slider__thumb--min.sc-calcite-slider{margin-top:-2px}/*!\@.slider__thumb--precise.slider__thumb--min .slider__handle__label*/.slider__thumb--precise.slider__thumb--min.sc-calcite-slider .slider__handle__label.sc-calcite-slider{bottom:unset;top:28px}/*!\@.slider__thumb--precise.slider__thumb--min:after*/.slider__thumb--precise.slider__thumb--min.sc-calcite-slider:after{top:0;margin-top:0}/*!\@.slider__track*/.slider__track.sc-calcite-slider{height:2px;border-radius:0;z-index:2;background-color:#cacaca;-webkit-transition:all .25s ease-in;transition:all .25s ease-in;position:relative}/*!\@.slider__track__range*/.slider__track__range.sc-calcite-slider{position:absolute;top:0;right:var(--calcite-slider-range-max);left:var(--calcite-slider-range-min);height:2px;background-color:var(--calcite-slider-spot)}/*!\@.slider__tick*/.slider__tick.sc-calcite-slider{position:absolute;top:-2px;width:2px;height:4px;left:var(--calcite-slider-tick-offset);margin-left:-2px;border:1px solid #fff;background-color:#959595}/*!\@.slider__tick--active*/.slider__tick--active.sc-calcite-slider{background-color:var(--calcite-slider-spot)}/*!\@.slider__tick__label*/.slider__tick__label.sc-calcite-slider{position:absolute;font-size:.8125rem;line-height:1.5;color:#555;width:4em;margin:14px -2em;text-align:center;display:block;pointer-events:none}/*!\@.slider__tick__label--min*/.slider__tick__label--min.sc-calcite-slider{left:0;margin:14px -3px;text-align:left}/*!\@.slider__tick__label--max*/.slider__tick__label--max.sc-calcite-slider{left:unset;right:0;margin:14px -3px;text-align:right}');
styles.set('sc-calcite-switch','/*!\@body*/body.sc-calcite-switch{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-switch{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-switch{display:block}/*!\@::slotted(input)*/.sc-calcite-switch-s > input{display:none}/*!\@:host*/.sc-calcite-switch-h{display:inline-block;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;tap-highlight-color:transparent}/*!\@.track*/.track.sc-calcite-switch{position:relative;display:inline-block;vertical-align:top;width:36px;height:20px;background-color:#f8f8f8;border-radius:30px;border:1px solid #eaeaea}/*!\@.handle,.track*/.handle.sc-calcite-switch, .track.sc-calcite-switch{-webkit-transition:all .25s ease;transition:all .25s ease}/*!\@.handle*/.handle.sc-calcite-switch{position:absolute;display:block;width:18px;height:18px;top:-1px;left:-1px;right:auto;background-color:#fff;border-radius:30px;border:2px solid #757575;-webkit-box-shadow:0 1px 1px 0 rgba(43,43,43,.2);box-shadow:0 1px 1px 0 rgba(43,43,43,.2)}/*!\@:host([switched]) .handle*/[switched].sc-calcite-switch-h .handle.sc-calcite-switch{right:-1px;left:auto;border-color:#004874;-webkit-box-shadow:0 2px 1px 0 rgba(43,43,43,.2);box-shadow:0 2px 1px 0 rgba(43,43,43,.2)}/*!\@:host([switched]) .track*/[switched].sc-calcite-switch-h .track.sc-calcite-switch{border-color:#00619b;background-color:#007ac2}/*!\@:host([switched][color=red]) .handle*/[switched][color=red].sc-calcite-switch-h .handle.sc-calcite-switch{border-color:#7c1d13}/*!\@:host([switched][color=red]) .track*/[switched][color=red].sc-calcite-switch-h .track.sc-calcite-switch{border-color:#7c1d13;background-color:#a82b1e}/*!\@:host(:focus),:host([switched]:focus)*/.sc-calcite-switch-h:focus, [switched].sc-calcite-switch-h:focus{outline:none}/*!\@:host(:focus) .track,:host([switched]:focus) .track*/.sc-calcite-switch-h:focus .track.sc-calcite-switch, [switched].sc-calcite-switch-h:focus .track.sc-calcite-switch{-webkit-box-shadow:0 0 4px 2px hsla(0,0%,45.9%,.9);box-shadow:0 0 4px 2px hsla(0,0%,45.9%,.9)}/*!\@:host(:hover) .track*/.sc-calcite-switch-h:hover .track.sc-calcite-switch{border-color:#eaeaea;background-color:#757575}/*!\@:host(:hover) .handle*/.sc-calcite-switch-h:hover .handle.sc-calcite-switch{border-color:#007ac2;-webkit-box-shadow:0 1px 2px 0 rgba(43,43,43,.2);box-shadow:0 1px 2px 0 rgba(43,43,43,.2)}/*!\@:host([color=red]:hover) .handle*/[color=red].sc-calcite-switch-h:hover .handle.sc-calcite-switch{border-color:#d83020}/*!\@:host([switched]:hover) .handle*/[switched].sc-calcite-switch-h:hover .handle.sc-calcite-switch{border-color:#004874}/*!\@:host([switched]:hover) .track*/[switched].sc-calcite-switch-h:hover .track.sc-calcite-switch{border-color:#00619b;background-color:#007ac2}/*!\@:host([switched][color=red]:hover) .handle*/[switched][color=red].sc-calcite-switch-h:hover .handle.sc-calcite-switch{border-color:#7c1d13}/*!\@:host([switched][color=red]:hover) .track*/[switched][color=red].sc-calcite-switch-h:hover .track.sc-calcite-switch{border-color:#7c1d13;background-color:#a82b1e}');
styles.set('sc-calcite-tab','/*!\@body*/body.sc-calcite-tab{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tab{overflow:hidden}/*!\@:host([is-active]) section,calcite-tabs*/[is-active].sc-calcite-tab-h section.sc-calcite-tab, calcite-tabs.sc-calcite-tab{display:block}/*!\@section*/section.sc-calcite-tab{display:none}');
styles.set('sc-calcite-tab-nav','/*!\@body*/body.sc-calcite-tab-nav{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tab-nav{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-tab-nav{display:block}/*!\@.tab-nav*/.tab-nav.sc-calcite-tab-nav{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--calcite-tabs-layout);justify-content:var(--calcite-tabs-layout);overflow:auto}/*!\@::slotted(calcite-tab-title)*/.sc-calcite-tab-nav-s > calcite-tab-title{margin-right:var(--calcite-tabs-tab-margin-start);margin-left:var(--calcite-tabs-tab-margin-end)}/*!\@:host([dir=rtl]) ::slotted(calcite-tab-title)*/.sc-calcite-tab-nav-h[dir=rtl] .sc-calcite-tab-nav-s > calcite-tab-title{margin-right:var(--calcite-tabs-tab-margin-end);margin-left:var(--calcite-tabs-tab-margin-start)}');
styles.set('sc-calcite-tab-title','/*!\@body*/body.sc-calcite-tab-title{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tab-title{overflow:hidden}/*!\@calcite-tabs*/calcite-tabs.sc-calcite-tab-title{display:block}/*!\@:host*/.sc-calcite-tab-title-h{-ms-flex:0 1 var(--calcite-tabs-tab-basis);flex:0 1 var(--calcite-tabs-tab-basis);outline:none}/*!\@:host(:active) a,:host(:focus) a,:host(:hover) a*/.sc-calcite-tab-title-h:active a.sc-calcite-tab-title, .sc-calcite-tab-title-h:focus a.sc-calcite-tab-title, .sc-calcite-tab-title-h:hover a.sc-calcite-tab-title{outline:none;text-decoration:none;color:var(--calcite-tabs-color-active);border-bottom-color:var(--calcite-tabs-border-hover)}/*!\@:host([is-active]) a*/[is-active].sc-calcite-tab-title-h a.sc-calcite-tab-title{color:var(--calcite-tabs-color-active);border-bottom-color:var(--calcite-tabs-border-active)}/*!\@a*/a.sc-calcite-tab-title{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.875rem;line-height:1.5;padding:.5rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;cursor:pointer;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;color:var(--calcite-tabs-color);outline:none;width:100%;display:block;text-align:var(--calcite-tabs-tab-text-align)}');
styles.set('sc-calcite-tabs','/*!\@body*/body.sc-calcite-tabs{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tabs{overflow:hidden}/*!\@:host,calcite-tabs*/.sc-calcite-tabs-h, calcite-tabs.sc-calcite-tabs{display:block}/*!\@:host*/.sc-calcite-tabs-h{--calcite-tabs-color:#2b2b2b;--calcite-tabs-border:#eaeaea;--calcite-tabs-border-hover:#dfdfdf;--calcite-tabs-color-active:#151515;--calcite-tabs-border-active:#007ac2;--calcite-tabs-layout:flex-start;--calcite-tabs-tab-basis:auto;--calcite-tabs-tab-text-align:start;--calcite-tabs-tab-margin-start:1.25rem;--calcite-tabs-tab-margin-end:0}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tabs-h{--calcite-tabs-color:#f3f3f3;--calcite-tabs-border:#404040;--calcite-tabs-border-hover:#757575;--calcite-tabs-color-active:#f8f8f8;--calcite-tabs-border-active:#fff}/*!\@:host([dir=rtl])*/[dir=rtl].sc-calcite-tabs-h{--calcite-tabs-tab-margin-start:0;--calcite-tabs-tab-margin-end:1.25rem}/*!\@:host([layout=center])*/[layout=center].sc-calcite-tabs-h{--calcite-tabs-layout:center;--calcite-tabs-tab-basis:200px;--calcite-tabs-tab-text-align:center;--calcite-tabs-tab-margin-start:1.25rem;--calcite-tabs-tab-margin-end:1.25rem}/*!\@.tab-contents*/.tab-contents.sc-calcite-tabs{border-top:1px solid var(--calcite-tabs-border)}');

exports.bootstrapHydrate = bootstrapHydrate;
