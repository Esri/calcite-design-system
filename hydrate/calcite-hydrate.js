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
const HTML_NS = 'http://www.w3.org/1999/xhtml';

const isDef = (v) => v != null;
const isComplexType = (o) => {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};

let scopeId;
let contentRef;
let hostTagName;
let useNativeShadowDom = false;
let checkSlotFallbackVisibility = false;
let checkSlotRelocate = false;
let isSvgMode = false;
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
const createTime = (fnName, tagName = '') => {
    {
        return () => { return; };
    }
};
const uniqueTime = (key, measureText) => {
    {
        return () => { return; };
    }
};
const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
    let scopeId =  getScopeId(cmpMeta.$tagName$);
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
    const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    const scopeId = addStyle( elm.getRootNode(), cmpMeta);
    if ( cmpMeta.$flags$ & 10 /* needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
    }
    endAttachStyles();
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
    let key = null;
    let slotName = null;
    let simple = false;
    let lastSimple = false;
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
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if (vnodeData) {
        // normalize class / classname attributes
        if ( vnodeData.key) {
            key = vnodeData.key;
        }
        if ( vnodeData.name) {
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
    const vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    {
        vnode.$key$ = key;
    }
    {
        vnode.$name$ = slotName;
    }
    return vnode;
};
const newVNode = (tag, text) => {
    const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null
    };
    {
        vnode.$attrs$ = null;
    }
    {
        vnode.$key$ = null;
    }
    {
        vnode.$name$ = null;
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
    const vnode = newVNode(node.vtag, node.vtext);
    vnode.$attrs$ = node.vattrs;
    vnode.$children$ = node.vchildren;
    vnode.$key$ = node.vkey;
    vnode.$name$ = node.vname;
    return vnode;
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
    let isProp = isMemberInElement(elm, memberName);
    let ln = memberName.toLowerCase();
    if ( memberName === 'class') {
        const classList = elm.classList;
        const oldClasses = parseClassList(oldValue);
        const newClasses = parseClassList(newValue);
        classList.remove(...oldClasses.filter(c => c && !newClasses.includes(c)));
        classList.add(...newClasses.filter(c => c && !oldClasses.includes(c)));
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
    else if ( memberName === 'key')
        ;
    else if ( memberName === 'ref') {
        // minifier will clean this up
        if (newValue) {
            newValue(elm);
        }
    }
    else if ( !isProp && memberName[0] === 'o' && memberName[1] === 'n') {
        // Event Handlers
        // so if the member name starts with "on" and the 3rd characters is
        // a capital letter, and it's not already a member on the element,
        // then we're assuming it's an event listener
        if (memberName[2] === '-') {
            // on- prefixed events
            // allows to be explicit about the dom event to listen without any magic
            // under the hood:
            // <my-cmp on-click> // listens for "click"
            // <my-cmp on-Click> // listens for "Click"
            // <my-cmp on-ionChange> // listens for "ionChange"
            // <my-cmp on-EVENTS> // listens for "EVENTS"
            memberName = memberName.slice(3);
        }
        else if (isMemberInElement(win, ln)) {
            // standard event
            // the JSX attribute could have been "onMouseOver" and the
            // member name "onmouseover" is on the window's prototype
            // so let's add the listener "mouseover", which is all lowercased
            memberName = ln.slice(2);
        }
        else {
            // custom event
            // the JSX attribute could have been "onMyCustomEvent"
            // so let's trim off the "on" prefix and lowercase the first character
            // and add the listener "myCustomEvent"
            // except for the first character, we keep the event name case
            memberName = ln[2] + memberName.slice(3);
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
        const isComplex = isComplexType(newValue);
        if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
            try {
                if (!elm.tagName.includes('-')) {
                    let n = newValue == null ? '' : newValue;
                    // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                    if (memberName === 'list') {
                        isProp = false;
                        // tslint:disable-next-line: triple-equals
                    }
                    else if (oldValue == null || elm[memberName] != n) {
                        elm[memberName] = n;
                    }
                }
                else {
                    elm[memberName] = newValue;
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
        let xlink = false;
        {
            if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
                memberName = ln;
                xlink = true;
            }
        }
        if (newValue == null || newValue === false) {
            if ( xlink) {
                elm.removeAttributeNS(XLINK_NS, memberName);
            }
            else {
                elm.removeAttribute(memberName);
            }
        }
        else if ((!isProp || (flags & 4 /* isHost */) || isSvg) && !isComplex) {
            newValue = newValue === true ? '' : newValue;
            if ( xlink) {
                elm.setAttributeNS(XLINK_NS, memberName, newValue);
            }
            else {
                elm.setAttribute(memberName, newValue);
            }
        }
    }
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => (!value) ? [] : value.split(parseClassListRegex);
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
            newVNode.$flags$ |= (newVNode.$children$)
                // slot element has fallback content
                // still create an element that "mocks" the slot element
                ? 2 /* isSlotFallback */
                // slot element does not have fallback content
                // create an html comment we'll use to always reference
                // where actual slot content should sit next to
                : 1 /* isSlotReference */;
        }
    }
    if ( newVNode.$text$ !== null) {
        // create text node
        elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else if ( newVNode.$flags$ & 1 /* isSlotReference */) {
        // create a slot reference node
        elm = newVNode.$elm$ =  doc.createComment(`slot-reference:${hostTagName.toLowerCase()}`) ;
    }
    else {
        if ( !isSvgMode) {
            isSvgMode = newVNode.$tag$ === 'svg';
        }
        // create element
        elm = newVNode.$elm$ = ( doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, ( newVNode.$flags$ & 2 /* isSlotFallback */) ? 'slot-fb' : newVNode.$tag$)
            );
        if ( isSvgMode && newVNode.$tag$ === 'foreignObject') {
            isSvgMode = false;
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
            else if (elm.tagName === 'foreignObject') {
                // Reenter SVG context when we're exiting <foreignObject> element
                isSvgMode = true;
            }
        }
    }
    {
        elm['s-hn'] = hostTagName;
        if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
            // remember the content reference comment
            elm['s-sr'] = true;
            // remember the content reference comment
            elm['s-cr'] = contentRef;
            // remember the slot name, or empty string for default slot
            elm['s-sn'] = newVNode.$name$ || '';
            // check if we've got an old vnode for this slot
            oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
            if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                // we've got an old slot vnode and the wrapper is being replaced
                // so let's move the old slot content back to it's original location
                putBackInOriginalLocation(oldParentVNode.$elm$, false);
            }
        }
    }
    return elm;
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
    if ( containerElm.shadowRoot && containerElm.tagName === hostTagName) {
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
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnode = vnodes[startIdx]) {
            elm = vnode.$elm$;
            callNodeRefs(vnode);
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
                    if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
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
        isSvgMode = elm && elm.parentNode &&
            elm.ownerSVGElement !== undefined;
        isSvgMode = newVNode.$tag$ === 'svg' ? true : (newVNode.$tag$ === 'foreignObject' ? false : isSvgMode);
    }
    if ( newVNode.$text$ === null) {
        // element node
        {
            if ( newVNode.$tag$ === 'slot')
                ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if ( oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // no old child vnodes, but there are new child vnodes to add
            if ( oldVNode.$text$ !== null) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if ( oldChildren !== null) {
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
        elm.data = newVNode.$text$;
    }
    if ( isSvgMode && newVNode.$tag$ === 'svg') {
        isSvgMode = false;
    }
};
const updateFallbackSlotVisibility = (elm) => {
    // tslint:disable-next-line: prefer-const
    let childNodes = elm.childNodes;
    let childNode;
    let i;
    let ilen;
    let j;
    let slotNameAttr;
    let nodeType;
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
const callNodeRefs = (vNode) => {
    {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
        vNode.$children$ && vNode.$children$.forEach(callNodeRefs);
    }
};
const renderVdom = (hostElm, hostRef, cmpMeta, renderFnResults) => {
    hostTagName = hostElm.tagName;
    const oldVNode = hostRef.$vnode$ || newVNode(null, null);
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
const attachToAncestor = (hostRef, ancestorComponent) => {
    if ( ancestorComponent && !hostRef.$onRenderResolve$) {
        ancestorComponent['s-p'].push(new Promise(r => hostRef.$onRenderResolve$ = r));
    }
};
const scheduleUpdate = (elm, hostRef, cmpMeta, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
    }
    if ( hostRef.$flags$ & 4 /* isWaitingForChildren */) {
        hostRef.$flags$ |= 512 /* needsRerender */;
        return;
    }
    const endSchedule = createTime('scheduleUpdate', cmpMeta.$tagName$);
    const ancestorComponent = hostRef.$ancestorComponent$;
    const instance =  hostRef.$lazyInstance$ ;
    const update = () => updateComponent(elm, hostRef, cmpMeta, instance, isInitialLoad);
    attachToAncestor(hostRef, ancestorComponent);
    let promise;
    if (isInitialLoad) {
        {
            hostRef.$flags$ |= 256 /* isListenReady */;
            if (hostRef.$queuedListeners$) {
                hostRef.$queuedListeners$.forEach(([methodName, event]) => safeCall(instance, methodName, event));
                hostRef.$queuedListeners$ = null;
            }
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
    endSchedule();
    // there is no ancestorc omponent or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    return then(promise,  () => writeTask(update)
        );
};
const updateComponent = (elm, hostRef, cmpMeta, instance, isInitialLoad) => {
    // updateComponent
    const endUpdate = createTime('update', cmpMeta.$tagName$);
    const rc = elm['s-rc'];
    if ( isInitialLoad) {
        // DOM WRITE!
        attachStyles(elm, cmpMeta);
    }
    const endRender = createTime('render', cmpMeta.$tagName$);
    {
        {
            try {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                renderVdom(elm, hostRef, cmpMeta,  instance.render() );
            }
            catch (e) {
                consoleError(e);
            }
        }
    }
    {
        hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
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
    {
        hostRef.$flags$ |= 2 /* hasRendered */;
    }
    if ( rc) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        rc.forEach(cb => cb());
        elm['s-rc'] = undefined;
    }
    endRender();
    endUpdate();
    {
        const childrenPromises = elm['s-p'];
        const postUpdate = () => postUpdateComponent(elm, hostRef, cmpMeta);
        if (childrenPromises.length === 0) {
            postUpdate();
        }
        else {
            Promise.all(childrenPromises).then(postUpdate);
            hostRef.$flags$ |= 4 /* isWaitingForChildren */;
            childrenPromises.length = 0;
        }
    }
};
const postUpdateComponent = (elm, hostRef, cmpMeta) => {
    const endPostUpdate = createTime('postUpdate', cmpMeta.$tagName$);
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
        endPostUpdate();
        {
            hostRef.$onReadyResolve$(elm);
            if (!ancestorComponent) {
                appDidLoad();
            }
        }
    }
    else {
        {
            safeCall(instance, 'componentDidUpdate');
        }
        endPostUpdate();
    }
    {
        hostRef.$onInstanceResolve$(elm);
    }
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    {
        if (hostRef.$onRenderResolve$) {
            hostRef.$onRenderResolve$();
            hostRef.$onRenderResolve$ = undefined;
        }
        if (hostRef.$flags$ & 512 /* needsRerender */) {
            nextTick(() => scheduleUpdate(elm, hostRef, cmpMeta, false));
        }
        hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
const appDidLoad = (who) => {
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
    const instance =  hostRef.$lazyInstance$ ;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    if (newVal !== oldVal && ( !(flags & 8 /* isConstructingInstance */) || oldVal === undefined)) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if ( instance) {
            // get an array of method names of watch functions to call
            if ( cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.forEach(watchMethodName => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            instance[watchMethodName](newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e);
                        }
                    });
                }
            }
            if ( (flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
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
                        return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args));
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
    if ( flags & 8 /* TargetWindow */)
        return win;
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
                const endLoad = uniqueTime();
                Cstr = await Cstr;
                endLoad();
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
            const endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
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
            endNewInstance();
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        const scopeId =  getScopeId(cmpMeta.$tagName$);
        if ( !styles.has(scopeId) && Cstr.style) {
            const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            registerStyle(scopeId, style);
            endRegisterStyles();
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(elm, hostRef, cmpMeta, true);
    if ( ancestorComponent && ancestorComponent['s-rc']) {
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
        const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
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
                    if (
                        (ancestorComponent['s-p'])) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent));
                        break;
                    }
                }
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
            }
        }
        fireConnectedCallback(hostRef.$lazyInstance$);
        endConnected();
    }
};
const setContentReference = (elm) => {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    const crName =  '';
    const contentRefElm = elm['s-cr'] = doc.createComment(crName);
    contentRefElm['s-cn'] = true;
    elm.insertBefore(contentRefElm, elm.firstChild);
};
const createEvent = (ref, name, flags) => {
    const elm = getElement(ref);
    return {
        emit: (detail) => {
            return elm.dispatchEvent(new ( win.CustomEvent )(name, {
                bubbles: !!(flags & 4 /* Bubbles */),
                composed: !!(flags & 2 /* Composed */),
                cancelable: !!(flags & 1 /* Cancellable */),
                detail
            }));
        }
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
                        return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName].apply(ref.$lazyInstance$, args)).catch(consoleError);
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

function bootstrapHydrate(win, opts, done) {
    const results = {
        hydratedCount: 0,
        hydratedComponents: []
    };
    plt.$resourcesUrl$ = new URL(opts.resourcesUrl || './', doc.baseURI).href;
    try {
        const connectedElements = new Set();
        const createdElements = new Set();
        const patchedConnectedCallback = function patchedConnectedCallback() {
            return connectElement(this);
        };
        const patchElement = function (elm) {
            const tagName = elm.nodeName.toLowerCase();
            if (elm.tagName.includes('-')) {
                const Cstr = getComponent(tagName);
                if (Cstr != null && Cstr.cmpMeta) {
                    createdElements.add(elm);
                    elm.connectedCallback = patchedConnectedCallback;
                    registerHost(elm);
                    proxyHostElement(elm, Cstr.cmpMeta);
                }
            }
        };
        const orgDocumentCreateElement = win.document.createElement;
        win.document.createElement = function patchedCreateElement(tagName) {
            const elm = orgDocumentCreateElement.call(win.document, tagName);
            patchElement(elm);
            return elm;
        };
        const orgDocumentCreateElementNS = win.document.createElementNS;
        win.document.createElementNS = function patchedCreateElement(namespaceURI, tagName) {
            const elm = orgDocumentCreateElementNS.call(win.document, namespaceURI, tagName);
            patchElement(elm);
            return elm;
        };
        const patchChild = (elm) => {
            if (elm != null && elm.nodeType === 1) {
                patchElement(elm);
                const children = elm.children;
                for (let i = 0, ii = children.length; i < ii; i++) {
                    patchChild(children[i]);
                }
            }
        };
        const connectElement = (elm) => {
            createdElements.delete(elm);
            if (elm != null && elm.nodeType === 1 && results.hydratedCount < opts.maxHydrateCount && shouldHydrate(elm)) {
                const tagName = elm.nodeName.toLowerCase();
                if (tagName.includes('-') && !connectedElements.has(elm)) {
                    connectedElements.add(elm);
                    return hydrateComponent(win, results, tagName, elm);
                }
            }
            return Promise.resolve();
        };
        const flush = () => {
            const toConnect = Array.from(createdElements).filter(elm => elm.parentElement);
            if (toConnect.length > 0) {
                return Promise.all(toConnect.map(elm => connectElement(elm)));
            }
            return undefined;
        };
        patchChild(win.document.body);
        const waitLoop = () => {
            const waitForComponents = flush();
            if (waitForComponents === undefined) {
                return Promise.resolve();
            }
            return waitForComponents.then(() => waitLoop());
        };
        waitLoop()
            .then(() => {
            try {
                createdElements.clear();
                connectedElements.clear();
                if (opts.clientHydrateAnnotations) {
                    insertVdomAnnotations(win.document);
                }
                win.document.createElement = orgDocumentCreateElement;
                win.document.createElementNS = orgDocumentCreateElementNS;
            }
            catch (e) {
                win.console.error(e);
            }
            done(results);
        })
            .catch(e => {
            try {
                win.console.error(e);
                connectedElements.clear();
                win.document.createElement = orgDocumentCreateElement;
                win.document.createElementNS = orgDocumentCreateElementNS;
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
async function hydrateComponent(win, results, tagName, elm) {
    const Cstr = getComponent(tagName);
    if (Cstr != null) {
        const cmpMeta = Cstr.cmpMeta;
        if (cmpMeta != null) {
            try {
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
    return cstrs.get(cmpMeta.$tagName$);
};
const getComponent = (tagName) => {
    return cstrs.get(tagName);
};
const isMemberInElement = (elm, memberName) => {
    if (elm != null) {
        if (memberName in elm) {
            return true;
        }
        const nodeName = elm.nodeName;
        if (nodeName) {
            const hostRef = getComponent(nodeName.toLowerCase());
            if (hostRef != null && hostRef.cmpMeta != null && hostRef.cmpMeta.$members$ != null) {
                return memberName in hostRef.cmpMeta.$members$;
            }
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
        $renderCount$: 0
    };
    hostRef.$onInstancePromise$ = new Promise(r => hostRef.$onInstanceResolve$ = r);
    hostRef.$onReadyPromise$ = new Promise(r => hostRef.$onReadyResolve$ = r);
    elm['s-p'] = [];
    elm['s-rc'] = [];
    return hostRefs.set(elm, hostRef);
};
const Build = {
    isDev: false,
    isBrowser: false
};
const styles = new Map();

const TAB = 9;
const ENTER = 13;
const ESCAPE = 27;
const SPACE = 32;
const PAGE_UP = 33;
const PAGE_DOWN = 34;
const END = 35;
const HOME = 36;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

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
    const closestWithProp = el.closest(`[${prop}]`);
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
function getSlottedElements(wrapperEl, selector) {
    const slot = wrapperEl.querySelector("slot");
    const elements = slot ? slot.assignedElements() : wrapperEl.children;
    return nodeListToArray(elements).filter(el => el.matches(selector));
}

class CalciteAccordion {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** specify the theme of accordion, defaults to light */
        this.theme = "light";
        /** specify the scale of accordion, defaults to m */
        this.scale = "m";
        /** specify the appearance - default (containing border), or minimal (no containing border), defaults to default */
        this.appearance = "default";
        /** specify the placement of the icon in the header, defaults to end */
        this.iconPosition = "end";
        /** specify the selection mode - multi (allow any number of open items), single (allow one open item),
         * or single-persist (allow and require one open item), defaults to multi */
        this.selectionMode = "multi";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of Accordion items */
        this.items = [];
        /** keep track of whether the items have been sorted so we don't re-sort */
        this.sorted = false;
        /** keep track of the requested item for multi mode */
        this.requestedAccordionItem = "";
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map(a => a.item);
        this.calciteAccordionItemHasChanged = createEvent(this, "calciteAccordionItemHasChanged", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let appearance = ["default", "minimal"];
        if (!appearance.includes(this.appearance))
            this.appearance = "default";
        let iconPosition = ["start", "end"];
        if (!iconPosition.includes(this.iconPosition))
            this.iconPosition = "end";
        let theme = ["light", "dark"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let selectionMode = ["multi", "single", "single-persist"];
        if (!selectionMode.includes(this.selectionMode))
            this.selectionMode = "multi";
    }
    componentDidLoad() {
        if (!this.sorted) {
            this.items = this.sortItems(this.items);
            this.sorted = true;
        }
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabindex: "-1" }, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteAccordionItemKeyEvent(e) {
        let item = e.detail.item;
        let itemToFocus = e.target;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (item.keyCode) {
            case DOWN:
                if (isLastItem)
                    this.focusFirstItem();
                else
                    this.focusNextItem(itemToFocus);
                break;
            case UP:
                if (isFirstItem)
                    this.focusLastItem();
                else
                    this.focusPrevItem(itemToFocus);
                break;
            case HOME:
                this.focusFirstItem();
                break;
            case END:
                this.focusLastItem();
                break;
        }
    }
    registerCalciteAccordionItem(e) {
        const item = {
            item: e.target,
            position: e.detail.position
        };
        this.items.push(item);
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail.requestedAccordionItem;
        this.calciteAccordionItemHasChanged.emit({
            requestedAccordionItem: this.requestedAccordionItem
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    focusFirstItem() {
        const firstItem = this.items[0];
        this.focusElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        this.focusElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        this.focusElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        this.focusElement(prevItem);
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    focusElement(item) {
        const target = item;
        target.focus();
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-accordion",
        "$members$": {
            "theme": [1537],
            "scale": [1537],
            "appearance": [1537],
            "iconPosition": [1537, "icon-position"],
            "selectionMode": [1537, "selection-mode"]
        },
        "$listeners$": [[0, "calciteAccordionItemKeyEvent", "calciteAccordionItemKeyEvent"], [0, "registerCalciteAccordionItem", "registerCalciteAccordionItem"], [0, "calciteAccordionItemSelected", "updateActiveItemOnChange"]],
        "$lazyBundleIds$": "-",
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

const checkCircle24F = "M23 11.5A11.5 11.5 0 1 1 11.5 0 11.5 11.5 0 0 1 23 11.5zm-5.5-6.018l-8.5 8.5-3.5-3.5-2 2L9.018 18l.018-.018L11.018 16l8.5-8.5z";

const chevronLeft16 = "M9.707 4l-4 4 4 4H8.293l-4-4 4-4z";

const chevronRight16 = "M6.293 12l4-4-4-4h1.414l4 4-4 4z";

const exclamationMarkTriangle24F = "M22.3 19.795l-9-17.901a1.5 1.5 0 0 0-2.597 0L1.7 19.795a1.502 1.502 0 0 0 0 1.502A1.456 1.456 0 0 0 2.998 22H21a1.458 1.458 0 0 0 1.299-.703 1.506 1.506 0 0 0 .001-1.502zM13 19h-2v-2h2zm0-3h-2V8h2z";

const lightbulb24F = "M11 13h1v4h-1zm3.895 5.45a.311.311 0 0 0-.12-.27l-.232-.18h-6.19l-.232.18a.312.312 0 0 0 .04.518l1.387.771-1.367.76a.311.311 0 0 0-.028.526l3.09 2.18a.356.356 0 0 0 .41 0l3.09-2.18a.311.311 0 0 0-.029-.527l-1.366-.759 1.388-.77a.312.312 0 0 0 .159-.25zM11.59 0l-.173.002L11.244 0a6.2 6.2 0 0 0-6.182 6.698c.31 2.575 2.784 5.207 2.939 6.134.13.78.116 1.844.199 2.472A2.542 2.542 0 0 0 9.088 17H10v-4.412L8.83 9.37l.94-.342L10.85 12h1.3l1.08-2.97.94.341L13 12.588V17h.745a2.542 2.542 0 0 0 .889-1.696c.083-.628.068-1.692.199-2.472.154-.927 2.628-3.559 2.938-6.134A6.2 6.2 0 0 0 11.59 0z";

const x16 = "M8.718 8l5.303 5.303-.707.707L8.01 8.707 2.707 14.01 2 13.303 7.303 8 2 2.697l.707-.707L8.01 7.293l5.304-5.303.707.707z";

const x24 = "M13.207 12.5l7.778 7.778-.707.707-7.778-7.778-7.778 7.778-.707-.707 7.778-7.778-7.778-7.778.707-.707 7.778 7.778 7.778-7.778.707.707z";

const x32 = "M16.707 16l10.607 10.606-.708.707L16 16.707 5.394 27.313l-.708-.707L15.293 16 4.686 5.394l.708-.707L16 15.293 26.606 4.687l.708.707z";

const CalciteIcon = ({ path, size, svgAttributes, title }) => (h("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, fill: "currentColor", viewBox: `0 0 ${size} ${size}` }, svgAttributes),
    title ? h("title", null, title) : null,
    h("path", { d: path })));

class CalciteAccordionItem {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** unique id for Accordion item */
        this.accordionItemId = `calcite-accordion-item-${guid()}`;
        /** what selection mode is the parent accordion in */
        this.selectionMode = getElementProp(this.el, "selection-mode", "multi");
        /** handle clicks on item header */
        this.itemHeaderClickHander = () => this.emitRequestedItem();
        this.calciteAccordionItemKeyEvent = createEvent(this, "calciteAccordionItemKeyEvent", 7);
        this.calciteAccordionItemSelected = createEvent(this, "calciteAccordionItemSelected", 7);
        this.closeCalciteAccordionItem = createEvent(this, "closeCalciteAccordionItem", 7);
        this.registerCalciteAccordionItem = createEvent(this, "registerCalciteAccordionItem", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.itemPosition = this.getItemPosition();
        this.registerCalciteAccordionItem.emit({
            position: this.itemPosition
        });
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabindex: "0", "aria-expanded": this.active ? "true" : "false" }, h("div", { class: "accordion-item-header", onClick: this.itemHeaderClickHander }, h("span", { class: "accordion-item-title" }, this.itemTitle), h("div", { class: "accordion-item-icon" }, h(CalciteIcon, { size: "16", path: chevronLeft16 }))), h("div", { class: "accordion-item-content" }, h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        switch (e.keyCode) {
            case SPACE:
            case ENTER:
                this.emitRequestedItem();
                e.preventDefault();
                break;
            case UP:
            case DOWN:
            case HOME:
            case END:
                this.calciteAccordionItemKeyEvent.emit({ item: e });
                e.preventDefault();
                break;
        }
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail.requestedAccordionItem;
        this.determineActiveItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    determineActiveItem() {
        switch (this.selectionMode) {
            case "multi":
                if (this.accordionItemId === this.requestedAccordionItem)
                    this.active = !this.active;
                break;
            case "single":
                if (this.accordionItemId === this.requestedAccordionItem)
                    this.active = !this.active;
                else
                    this.active = false;
                break;
            case "single-persist":
                this.active = this.accordionItemId === this.requestedAccordionItem;
                break;
        }
    }
    emitRequestedItem() {
        this.calciteAccordionItemSelected.emit({
            requestedAccordionItem: this.accordionItemId
        });
    }
    getItemPosition() {
        const parent = this.el.parentElement;
        return Array.prototype.indexOf.call(parent.querySelectorAll("calcite-accordion-item"), this.el);
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-accordion-item",
        "$members$": {
            "active": [1540],
            "itemTitle": [1, "item-title"]
        },
        "$listeners$": [[0, "keydown", "keyDownHandler"], [16, "calciteAccordionItemHasChanged", "updateActiveItemOnChange"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
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
        return (h(Host, { active: this.active, dir: dir }, icon, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), count, close, progress));
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
        "$lazyBundleIds$": "-",
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
        return (h(Host, { active: this.active }, h(AlertInterface.Provider, { state: alertState }, h("slot", null))));
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
        "$lazyBundleIds$": "-",
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
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the color of the button, defaults to blue */
        this.color = "blue";
        /** specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor */
        this.appearance = "solid";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify the width of the button, defaults to auto */
        this.width = "auto";
        /** optionally add a calcite-loader component to the button, disabling interaction.  */
        this.loading = false;
        /** optionally used with icon, select where to position the icon */
        this.iconposition = "start";
        /** @internal */
        /** hastext prop for spacing icon when text is present in slot */
        this.hasText = false;
        /** @internal */
        /** keep track of the rendered child type -  */
        this.childEl = "button";
        // act on a requested or nearby form based on type
        this.handleClick = (e) => {
            // this.type refers to type attribute, not child element type
            if (this.childEl === "button" && this.type !== "button") {
                const requestedForm = this.el.getAttribute("form");
                const targetForm = requestedForm
                    ? document.getElementsByName(`${requestedForm}`)[0]
                    : this.el.closest("form");
                if (targetForm) {
                    const targetFormSubmitFunction = targetForm.onsubmit;
                    switch (this.type) {
                        case "submit":
                            if (targetFormSubmitFunction)
                                targetFormSubmitFunction();
                            else if (targetForm.checkValidity())
                                targetForm.submit();
                            else
                                targetForm.reportValidity();
                            break;
                        case "reset":
                            targetForm.reset();
                            break;
                    }
                }
                e.preventDefault();
            }
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let appearance = ["solid", "outline", "clear", "inline", "transparent"];
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
        let theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        let iconposition = ["start", "end"];
        if (this.icon !== null && !iconposition.includes(this.iconposition))
            this.iconposition = "start";
        this.childEl = this.href
            ? "a"
            : this.appearance === "inline"
                ? "span"
                : "button";
    }
    componentWillLoad() {
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Tag = this.childEl;
        const role = this.childEl === "span" ? "button" : null;
        const tabIndex = this.childEl === "span" ? 0 : null;
        const loader = (h("div", { class: "calcite-button--loader" }, h("calcite-loader", { "is-active": true, inline: true })));
        const icon = (h("svg", { class: "calcite-button--icon", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" }, h("path", { d: this.icon })));
        return (h(Host, { dir: dir, hasText: this.hasText }, h(Tag, Object.assign({}, attributes, { role: role, tabindex: tabIndex, onClick: e => this.handleClick(e), disabled: this.disabled }), this.icon && this.iconposition === "start" ? icon : null, this.loading ? loader : null, h("slot", null), this.icon && this.iconposition === "end" ? icon : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = [
            "appearance",
            "color",
            "dir",
            "hasText",
            "icon",
            "iconposition",
            "id",
            "loading",
            "scale",
            "width",
            "theme"
        ];
        return Array.from(this.el.attributes)
            .filter(a => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-button",
        "$members$": {
            "color": [1537],
            "appearance": [1537],
            "theme": [513],
            "scale": [1537],
            "width": [1537],
            "loading": [516],
            "href": [513],
            "icon": [513],
            "iconposition": [1537],
            "disabled": [516],
            "hasText": [1028, "has-text"],
            "childEl": [1, "child-el"]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

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
    keyDownHandler(e) {
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            e.preventDefault();
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
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class CalciteDateDay {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * day of the month to be shown.
         */
        this.day = 0;
        /**
         * Enables tells whether day enabled for the user click.
         */
        this.enable = true;
        /**
         * Selected tells whether day is selected.
         */
        this.selected = false;
        /**
         * Active tells whether day is Actively in focus.
         */
        this.active = false;
        this.calciteDaySelect = createEvent(this, "calciteDaySelect", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        return (h(Host, { class: `${this.active ? "active" : ""}
        ${this.enable ? "enabled" : "disabled"}
        ${this.selected ? "selected-day" : ""}`, role: "gridcell", tabindex: this.selected || this.active ? 0 : -1 }, h("span", { class: "day" }, this.day)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick() {
        this.enable && (this.selected = true) && this.calciteDaySelect.emit();
    }
    keyDownHandler(e) {
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            this.enable && (this.selected = true) && this.calciteDaySelect.emit();
        }
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-date-day",
        "$members$": {
            "day": [2],
            "enable": [4],
            "selected": [4],
            "active": [4],
            "hover": [32]
        },
        "$listeners$": [[0, "click", "onClick"], [0, "keydown", "keyDownHandler"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class CalciteDateMonth {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Month number starting 0 as January for which the calendar is shown.
         */
        this.month = 0;
        /**
         * Year for which the calendar is shown.
         */
        this.year = 0;
        /**
         * pass the locale in which user wants to show the date.
         */
        this.locale = "en-US";
        /**
         * Localized string for previous month.
         */
        this.prevMonthLabel = "";
        /**
         * Localized string for next month.
         */
        this.nextMonthLabel = "";
        this.calciteMonthChange = createEvent(this, "calciteMonthChange", 7);
        this.calciteYearChange = createEvent(this, "calciteYearChange", 7);
    }
    monthChange() {
        this.calciteMonthChange.emit();
    }
    yearChange() {
        this.calciteYearChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        let localizedMonth = this.getLocalizedMonths()[this.month];
        return (h(Host, null, h("div", { class: "month-year", "aria-hidden": "true" }, h("button", { class: "left-icon", "aria-label": this.prevMonthLabel, onClick: () => this.selectPrevMonth(), onKeyDown: event => this.selectPrevMonthOnEnter(event) }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" }, h("path", { d: "M11.783 14H9.017l-6-6 6-6h2.766l-6 6z" }))), h("div", { class: "month-year-text" }, h("span", { class: "month", role: "heading" }, localizedMonth), h("input", { class: "year", type: "number", value: this.year, min: this.min && this.min.getFullYear(), max: this.max && this.max.getFullYear(), onChange: event => this.onYearChange(event) })), h("button", { class: "right-icon", "aria-label": this.nextMonthLabel, onClick: () => this.selectNextMonth(), onKeyDown: event => this.selectNextMonthOnEnter(event) }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" }, h("path", { d: "M10.217 8l-6-6h2.766l6 6-6 6H4.217z" }))))));
    }
    selectPrevMonth() {
        if (this.month === 0) {
            if (this.validateYear(this.year - 1)) {
                this.year -= 1;
            }
            else {
                return;
            }
        }
        if (this.validateMonth((12 + this.month - 1) % 12, this.year)) {
            this.month = (12 + this.month - 1) % 12;
        }
    }
    selectPrevMonthOnEnter(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectPrevMonth();
        }
    }
    selectNextMonth() {
        if (this.month === 11) {
            if (this.validateYear(this.year + 1)) {
                this.year += 1;
            }
            else {
                return;
            }
        }
        if (this.validateMonth((this.month + 1) % 12, this.year)) {
            this.month = (this.month + 1) % 12;
        }
    }
    selectNextMonthOnEnter(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectNextMonth();
        }
    }
    validateYear(year) {
        let isValid = true;
        if (this.min) {
            isValid = isValid && year >= this.min.getFullYear();
        }
        if (this.max) {
            isValid = isValid && year <= this.max.getFullYear();
        }
        return isValid;
    }
    validateMonth(month, year) {
        let isValid = true;
        if (this.min) {
            isValid =
                isValid &&
                    (this.validateYear(year)
                        ? year === this.min.getFullYear()
                            ? month >= this.min.getMonth()
                            : true
                        : false);
        }
        if (this.max) {
            isValid =
                isValid &&
                    (this.validateYear(year)
                        ? year === this.max.getFullYear()
                            ? month <= this.max.getMonth()
                            : true
                        : false);
        }
        return isValid;
    }
    onYearChange(event) {
        this.year = parseInt(event.target.value);
    }
    getLocalizedMonths() {
        let m = 0, months = [], date = new Date();
        for (; m < 12; m++) {
            date.setMonth(m);
            months.push(new Intl.DateTimeFormat(this.locale, {
                month: "long"
            }).format(date));
        }
        return months;
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "month": ["monthChange"],
        "year": ["yearChange"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-date-month-header",
        "$members$": {
            "month": [2],
            "year": [2],
            "selectedDate": [16],
            "min": [16],
            "max": [16],
            "locale": [1],
            "prevMonthLabel": [1, "prev-month-label"],
            "nextMonthLabel": [1, "next-month-label"]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class CalciteDateMonth$1 {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Month number starting 0 as January for which the calendar is shown.
         */
        this.month = 0;
        /**
         * Year for which the calendar is shown.
         */
        this.year = 0;
        /**
         * Sun by default
         * 0: Sunday
         * 1: Monday
         * 2: Tuesday
         * 3: Wednesday
         * 4: Thursday
         * 5: Friday
         * 6: Saturday
         */
        this.startOfWeek = 0;
        /**
         * pass the locale in which user wants to show the date.
         */
        this.locale = "en-US";
        this.calciteDateSelect = createEvent(this, "calciteDateSelect", 7);
        this.calciteActiveDateChange = createEvent(this, "calciteActiveDateChange", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        let weekDays = this.getLocalizedWeekday(), curMonDays = [
            ...Array(new Date(this.year, this.month + 1, 0).getDate()).keys()
        ], prevMonDays = this.getPrevMonthdays(this.month, this.year), nextMonDays = this.getNextMonthdays(this.month, this.year), splitDays = [], days = [
            ...prevMonDays.map(prev => (h("calcite-date-day", { day: prev, enable: false }))),
            ...curMonDays.map(cur => (h("calcite-date-day", { day: cur + 1, enable: this.validateDate(cur + 1, this.month, this.year), selected: this.isSelectedDate(this.year, this.month, cur + 1), active: this.activeDate.getDate() === cur + 1, onCalciteDaySelect: () => this.onSelectDate(cur + 1) }))),
            ...nextMonDays.map(next => (h("calcite-date-day", { day: next + 1, enable: false })))
        ];
        for (let i = 0; i < days.length; i += 7)
            splitDays.push(days.slice(i, i + 7));
        return (h(Host, null, h("div", { class: "calender", role: "grid" }, h("div", { class: "week-headers", role: "presentation" }, weekDays.map(weekday => (h("span", { class: "week-header", role: "columnheader" }, weekday)))), splitDays.map(days => (h("div", { class: "week-days", role: "row" }, days))))));
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case UP:
                e.preventDefault();
                this.addDaysToActiveDate(-7);
                break;
            case RIGHT:
                e.preventDefault();
                this.addDaysToActiveDate(1);
                break;
            case DOWN:
                e.preventDefault();
                this.addDaysToActiveDate(7);
                break;
            case LEFT:
                e.preventDefault();
                this.addDaysToActiveDate(-1);
                break;
            case PAGE_UP:
                e.preventDefault();
                this.addMonthToActiveDate(-1);
                break;
            case PAGE_DOWN:
                e.preventDefault();
                this.addMonthToActiveDate(1);
                break;
            case HOME:
                e.preventDefault();
                this.activeDate.setDate(1);
                this.addDaysToActiveDate();
                break;
            case END:
                e.preventDefault();
                this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
                this.addDaysToActiveDate();
                break;
            case ENTER:
            case SPACE:
                e.preventDefault();
                this.selectedDate = new Date(this.activeDate);
                this.calciteDateSelect.emit();
                break;
            case ESCAPE:
                e.preventDefault();
                this.activeDate = new Date(this.selectedDate);
                this.calciteActiveDateChange.emit();
                break;
        }
    }
    mouseoverHandler(e) {
        let day = e.target.day || this.activeDate.getDate();
        if (day != this.activeDate.getDate()) {
            let [activeDay, activeMonth, activeYear] = [
                day,
                this.activeDate.getMonth(),
                this.activeDate.getFullYear()
            ];
            if (this.validateDate(activeDay, activeMonth, activeYear)) {
                this.activeDate = new Date(activeYear, activeMonth, activeDay);
                this.calciteActiveDateChange.emit();
            }
        }
    }
    addMonthToActiveDate(step) {
        let [activeDay, activeMonth, activeYear] = [
            this.activeDate.getDate(),
            this.activeDate.getMonth(),
            this.activeDate.getFullYear()
        ];
        activeMonth += step;
        if (activeMonth === 12) {
            activeMonth = 0;
            activeYear += 1;
        }
        if (activeMonth === -1) {
            activeMonth = 11;
            activeYear -= 1;
        }
        if (this.validateDate(activeDay, activeMonth, activeYear)) {
            this.activeDate = new Date(activeYear, activeMonth, activeDay);
            this.calciteActiveDateChange.emit();
        }
    }
    addDaysToActiveDate(step = 0) {
        let [activeDay, activeMonth, activeYear] = [
            this.activeDate.getDate(),
            this.activeDate.getMonth(),
            this.activeDate.getFullYear()
        ];
        activeDay += step;
        let noOfDaysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        let noOfDaysInPrevMonth = new Date(activeYear, activeMonth, 0).getDate();
        if (activeDay > noOfDaysInMonth) {
            activeDay -= noOfDaysInMonth;
            activeMonth += 1;
            if (activeMonth === 12) {
                activeMonth = 0;
                activeYear += 1;
            }
        }
        if (activeDay < 0) {
            activeDay = noOfDaysInPrevMonth + activeDay;
            activeMonth -= 1;
            if (activeMonth === -1) {
                activeMonth = 11;
                activeYear -= 1;
            }
        }
        if (this.validateDate(activeDay, activeMonth, activeYear)) {
            this.activeDate = new Date(activeYear, activeMonth, activeDay);
            this.calciteActiveDateChange.emit();
        }
    }
    onSelectDate(date) {
        this.selectedDate = new Date(this.year, this.month, date);
        this.calciteDateSelect.emit();
    }
    isSelectedDate(year, month, day) {
        let date = new Date(year, month, day);
        return date.toDateString() === this.selectedDate.toDateString();
    }
    validateDate(day, month, year) {
        let isValid = true;
        if (this.min) {
            let minYear = this.min.getFullYear();
            let minMonth = this.min.getMonth();
            let minDay = this.min.getDate();
            isValid =
                isValid &&
                    (minYear < year
                        ? true
                        : minYear === year && minMonth < month
                            ? true
                            : minMonth === month && minDay < day
                                ? true
                                : false);
        }
        if (this.max) {
            let maxYear = this.max.getFullYear();
            let maxMonth = this.max.getMonth();
            let maxDay = this.max.getDate();
            isValid =
                isValid &&
                    (maxYear > year
                        ? true
                        : maxYear === year && maxMonth > month
                            ? true
                            : maxMonth === month && maxDay > day
                                ? true
                                : false);
        }
        return isValid;
    }
    getPrevMonthdays(month, year) {
        let startDay = new Date(year, month, 1).getDay(), days = [], prevMonDays = new Date(year, month, 0).getDate();
        if (startDay === this.startOfWeek) {
            return days;
        }
        for (let i = (6 - this.startOfWeek + startDay) % 7; i >= 0; i--) {
            days.push(prevMonDays - i);
        }
        return days;
    }
    getNextMonthdays(month, year) {
        let endDay = new Date(year, month + 1, 0).getDay(), days = [];
        if (endDay === (this.startOfWeek + 6) % 7) {
            return days;
        }
        return [...Array((6 - (endDay - this.startOfWeek)) % 7).keys()];
    }
    getLocalizedWeekday() {
        let w = 1, startWeek = [], endWeek = [], date = new Date();
        for (; w < 8; w++) {
            date.setDate(w);
            let day = new Intl.DateTimeFormat(this.locale, {
                weekday: "short"
            }).format(date);
            date.getDay() === this.startOfWeek || startWeek.length > 0
                ? startWeek.push(day)
                : endWeek.push(day);
        }
        return [...startWeek, ...endWeek];
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-date-month",
        "$members$": {
            "month": [2],
            "year": [2],
            "selectedDate": [16],
            "activeDate": [16],
            "min": [16],
            "max": [16],
            "startOfWeek": [2, "start-of-week"],
            "locale": [1]
        },
        "$listeners$": [[0, "keydown", "keyDownHandler"], [1, "mouseover", "mouseoverHandler"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class CalciteDatePicker {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Value of the form control
         */
        this.value = "";
        /**
         * Name of the form control (useful for specifying input/label relationship)
         */
        this.min = "";
        /**
         * Value of the form control
         */
        this.max = "";
        /**
         * Localized string for previous month.
         */
        this.prevMonthLabel = "";
        /**
         * Localized string for next month.
         */
        this.nextMonthLabel = "";
        /**
         * Sun by default
         * 0: Sunday
         * 1: Monday
         * 2: Tuesday
         * 3: Wednesday
         * 4: Thursday
         * 5: Friday
         * 6: Saturday
         */
        this.startOfWeek = 0;
        /**
         * pass the locale in which user wants to show the date.
         */
        this.locale = "en-US";
        /**
         * Expanded state of the calander.
         */
        this.showCalendar = false;
        /**
         * Active date.
         */
        this.activeDate = new Date(this.value) || new Date();
        this.syncThisToProxyInput = () => {
            this.value = new Intl.DateTimeFormat(this.locale).format(new Date(`${this.inputProxy.value} `));
            this.min = this.inputProxy.min;
            this.max = this.inputProxy.max;
        };
        this.syncProxyInputToThis = () => {
            this.inputProxy.value = new Date(`${this.value} `)
                .toISOString()
                .substr(0, 10);
            this.inputProxy.min = this.min;
            this.inputProxy.max = this.max;
        };
        this.calciteDateChange = createEvent(this, "calciteDateChange", 7);
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
        let selectedDate = this.value ? new Date(`${this.value}`) : new Date();
        return (h(Host, { role: "application", expanded: this.showCalendar, onBlur: () => this.closeCalendar() }, h("div", { class: `date-input-wrapper ${this.showCalendar ? "expanded" : ""}`, role: "application" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "calendar-icon", viewBox: "0 0 16 16", width: "16", height: "16" }, h("path", { d: "M16 16H0V6h16zM3 7H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 10H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 13H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM5 2V1h6v1zm9-1v1h1v2H1V2h1V1H0v4h16V1zM4 0H3v2h1zm9 0h-1v2h1z" })), h("input", { type: "text", placeholder: "dd/mm/yyyy", value: this.value, class: "date-input", onFocus: () => this.expandCalendar() })), this.showCalendar && (h("div", { class: "calendar-picker-wrapper" }, h("calcite-date-month-header", { month: this.getMonth(), year: this.getYear(), selectedDate: selectedDate, prevMonthLabel: this.prevMonthLabel, nextMonthLabel: this.nextMonthLabel, locale: this.locale, min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, onCalciteMonthChange: e => this.setMonth(e.target), onCalciteYearChange: e => this.setYear(e.target) }), h("calcite-date-month", { month: this.getMonth(), year: this.getYear(), min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, selectedDate: selectedDate, activeDate: this.activeDate, startOfWeek: this.startOfWeek, locale: this.locale, onCalciteDateSelect: evt => this.setDate(evt.target), onCalciteActiveDateChange: evt => this.setActiveDate(evt.target) }))), h("slot", null)));
    }
    setActiveDate(target) {
        this.activeDate = new Date(target.activeDate);
    }
    expandCalendar() {
        this.showCalendar = true;
    }
    closeCalendar() {
        this.showCalendar = true;
    }
    getMonth() {
        return this.activeDate.getMonth();
    }
    getYear() {
        return this.activeDate.getFullYear();
    }
    setMonth(target) {
        this.activeDate = new Date(this.activeDate.setMonth(target.month));
    }
    setYear(target) {
        this.activeDate = new Date(this.activeDate.setFullYear(target.year));
    }
    setDate(target) {
        // Set date to in dd/mm/yyyy format.
        this.activeDate = new Date(target.selectedDate);
        this.value = target.selectedDate.toISOString().substr(0, 10);
        this.syncProxyInputToThis();
        this.calciteDateChange.emit();
    }
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "date";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-date-picker",
        "$members$": {
            "value": [513],
            "min": [513],
            "max": [513],
            "prevMonthLabel": [1, "prev-month-label"],
            "nextMonthLabel": [1, "next-month-label"],
            "startOfWeek": [2, "start-of-week"],
            "locale": [1],
            "showCalendar": [32],
            "activeDate": [32]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class CalciteDropdown {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the alignment of dropdrown, defaults to left */
        this.alignment = "left";
        /** specify the alignment of dropdrown, defaults to left */
        this.theme = "light";
        /** specify the scale of dropdrown, defaults to m */
        this.scale = "m";
        /** created list of dropdown items */
        this.items = [];
        /** keep track of whether the groups have been sorted so we don't re-sort */
        this.sorted = false;
        /** unique id for dropdown */
        /** @internal */
        this.dropdownId = `calcite-dropdown-${guid()}`;
        this.sortItems = (items) => items
            .sort((a, b) => a.position - b.position)
            .concat.apply([], this.items.map(item => item.items));
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let alignment = ["left", "right", "center"];
        if (!alignment.includes(this.alignment))
            this.alignment = "left";
        let theme = ["light", "dark"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    componentDidLoad() {
        this.trigger = this.el.querySelector("[slot=dropdown-trigger]");
        if (!this.sorted) {
            this.items = this.sortItems(this.items);
            this.sorted = true;
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const expanded = this.active.toString();
        return (h(Host, { dir: dir, active: this.active, id: this.dropdownId }, h("slot", { name: "dropdown-trigger", "aria-haspopup": "true", "aria-expanded": expanded }), h("div", { class: "calcite-dropdown-wrapper", role: "menu" }, h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    openDropdown(e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            this.openCalciteDropdown(e);
            e.preventDefault();
        }
    }
    closeCalciteDropdownOnClick(e) {
        if (this.active && e.target.offsetParent.id !== this.dropdownId)
            this.closeCalciteDropdown();
    }
    closeCalciteDropdownOnEvent() {
        this.closeCalciteDropdown();
    }
    keyDownHandler(e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            if (e.target.nodeName !== "BUTTON" &&
                e.target.nodeName !== "CALCITE-BUTTON") {
                switch (e.keyCode) {
                    case SPACE:
                    case ENTER:
                        this.openCalciteDropdown(e);
                        break;
                    case ESCAPE:
                        this.closeCalciteDropdown();
                        break;
                }
            }
            else if (e.keyCode === ESCAPE || (e.shiftKey && e.keyCode === TAB)) {
                this.closeCalciteDropdown();
            }
        }
    }
    calciteDropdownItemKeyEvent(item) {
        let e = item.detail.item;
        // handle edge
        let itemToFocus = e.target.nodeName !== "A" ? e.target : e.target.parentNode;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (e.keyCode) {
            case TAB:
                if (isLastItem && !e.shiftKey)
                    this.closeCalciteDropdown();
                else if (isFirstItem && e.shiftKey)
                    this.closeCalciteDropdown();
                else if (e.shiftKey)
                    this.focusPrevItem(itemToFocus);
                else
                    this.focusNextItem(itemToFocus);
                break;
            case DOWN:
                this.focusNextItem(itemToFocus);
                break;
            case UP:
                this.focusPrevItem(itemToFocus);
                break;
            case HOME:
                this.focusFirstItem();
                break;
            case END:
                this.focusLastItem();
                break;
        }
    }
    calciteDropdownMouseover(item) {
        const itemToFocus = item.detail.target;
        itemToFocus.focus();
    }
    registerCalciteDropdownGroup(e) {
        const items = {
            items: e.detail.items,
            position: e.detail.position
        };
        this.items.push(items);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    closeCalciteDropdown() {
        this.active = false;
        this.trigger.focus();
    }
    focusFirstItem() {
        const firstItem = this.items[0];
        this.getFocusableElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        this.getFocusableElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        this.getFocusableElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        this.getFocusableElement(prevItem);
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    getFocusableElement(item) {
        const target = item.attributes.isLink
            ? item.shadowRoot.querySelector("a")
            : item;
        target.focus();
    }
    openCalciteDropdown(e) {
        this.active = !this.active;
        // if invoked by key, focus item, and accomodate animation time
        if (!e.detail) {
            setTimeout(() => this.focusFirstItem(), 50);
        }
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-dropdown",
        "$members$": {
            "alignment": [1537],
            "theme": [1537],
            "scale": [1537],
            "active": [32]
        },
        "$listeners$": [[0, "click", "openDropdown"], [8, "click", "closeCalciteDropdownOnClick"], [0, "closeCalciteDropdown", "closeCalciteDropdownOnEvent"], [0, "keydown", "keyDownHandler"], [0, "calciteDropdownItemKeyEvent", "calciteDropdownItemKeyEvent"], [0, "calciteDropdownItemMouseover", "calciteDropdownMouseover"], [0, "registerCalciteDropdownGroup", "registerCalciteDropdownGroup"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

var DropdownInterface = createProviderConsumer({
    requestedDropdownGroup: "",
    requestedDropdownItem: ""
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

class CalciteDropdownGroup {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.requestedDropdownGroup = "";
        this.requestedDropdownItem = "";
        /** optionally set a group title for display */
        this.grouptitle = null;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        /** unique id for dropdown group */
        /** @internal */
        this.dropdownGroupId = `calcite-dropdown-group-${guid()}`;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map(a => a.item);
        this.calciteDropdownItemHasChanged = createEvent(this, "calciteDropdownItemHasChanged", 7);
        this.registerCalciteDropdownGroup = createEvent(this, "registerCalciteDropdownGroup", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.groupPosition = this.getGroupPosition();
        this.items = this.sortItems(this.items);
        this.registerCalciteDropdownGroup.emit({
            items: this.items,
            position: this.groupPosition
        });
    }
    render() {
        const theme = getElementTheme(this.el);
        const scale = getElementProp(this.el, "scale", "m");
        const dropdownState = {
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        };
        const grouptitle = this.grouptitle ? (h("span", { class: "dropdown-title" }, this.grouptitle)) : null;
        return (h(Host, { theme: theme, scale: scale, id: this.dropdownGroupId }, grouptitle, h(DropdownInterface.Provider, { state: dropdownState }, h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteDropdownItemHasChanged.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        });
    }
    registerCalciteDropdownItem(e) {
        const item = {
            item: e.detail.item,
            position: e.detail.position
        };
        this.items.push(item);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getGroupPosition() {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-dropdown-group",
        "$members$": {
            "grouptitle": [513],
            "requestedDropdownGroup": [32],
            "requestedDropdownItem": [32]
        },
        "$listeners$": [[0, "calciteDropdownItemSelected", "updateActiveItemOnChange"], [0, "registerCalciteDropdownItem", "registerCalciteDropdownItem"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class CalciteDropdownItem {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** @internal */
        this.requestedDropdownGroup = "";
        /** @internal */
        this.requestedDropdownItem = "";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** unique id for dropdown item */
        /** @internal */
        this.dropdownItemId = `calcite-dropdown-item-${guid()}`;
        this.calciteDropdownItemKeyEvent = createEvent(this, "calciteDropdownItemKeyEvent", 7);
        this.calciteDropdownItemMouseover = createEvent(this, "calciteDropdownItemMouseover", 7);
        this.calciteDropdownItemSelected = createEvent(this, "calciteDropdownItemSelected", 7);
        this.closeCalciteDropdown = createEvent(this, "closeCalciteDropdown", 7);
        this.registerCalciteDropdownItem = createEvent(this, "registerCalciteDropdownItem", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.currentDropdownGroup = this.el.parentElement.id;
        this.itemPosition = this.getItemPosition();
        this.registerCalciteDropdownItem.emit({
            item: this.el,
            position: this.itemPosition
        });
    }
    componentDidUpdate() {
        this.determineActiveItem();
    }
    render() {
        const dir = getElementDir(this.el);
        const theme = getElementTheme(this.el);
        const scale = getElementProp(this.el, "scale", "m");
        if (!this.href) {
            return (h(Host, { theme: theme, dir: dir, scale: scale, id: this.dropdownItemId, tabindex: "0", role: "menuitem", "aria-selected": this.active ? "true" : "false" }, h("slot", null)));
        }
        else {
            return (h(Host, { theme: theme, dir: dir, scale: scale, id: this.dropdownItemId, tabindex: "0", role: "menuitem", "aria-selected": this.active ? "true" : "false", isLink: true }, h("a", { href: this.href, title: this.linktitle }, h("slot", null))));
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        this.emitRequestedItem(e);
    }
    onMouseover(e) {
        this.calciteDropdownItemMouseover.emit(e);
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case SPACE:
            case ENTER:
                this.emitRequestedItem(e);
                if (e.path && e.path[0].nodeName === "A")
                    e.click();
                break;
            case ESCAPE:
                this.closeCalciteDropdown.emit();
                break;
            case TAB:
            case UP:
            case DOWN:
            case HOME:
            case END:
                this.calciteDropdownItemKeyEvent.emit({ item: e });
                break;
        }
        e.preventDefault();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    determineActiveItem() {
        if (this.requestedDropdownItem === this.dropdownItemId) {
            this.active = true;
        }
        else if (this.requestedDropdownGroup === this.currentDropdownGroup) {
            this.active = false;
        }
    }
    emitRequestedItem(e) {
        this.calciteDropdownItemSelected.emit({
            requestedDropdownItem: e.target.id,
            requestedDropdownGroup: e.target
                .parentElement.id
        });
        this.closeCalciteDropdown.emit();
    }
    getItemPosition() {
        const group = this.el.parentElement;
        return Array.prototype.indexOf.call(group.querySelectorAll("calcite-dropdown-item"), this.el);
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-dropdown-item",
        "$members$": {
            "active": [1540],
            "requestedDropdownGroup": [1, "requested-dropdown-group"],
            "requestedDropdownItem": [1, "requested-dropdown-item"],
            "href": [1],
            "linktitle": [1]
        },
        "$listeners$": [[0, "click", "onClick"], [1, "mouseover", "onMouseover"], [0, "keydown", "keyDownHandler"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}
//--------------------------------------------------------------------------
//
//  Inject Props
//
//--------------------------------------------------------------------------
DropdownInterface.injectProps(CalciteDropdownItem, [
    "requestedDropdownItem",
    "requestedDropdownGroup"
]);

class CalciteExample {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Be sure to add a jsdoc comment describing your property for the generated readme file.
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
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

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
    componentWillLoad() {
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
        "$lazyBundleIds$": "-",
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
        return ["inactive"];
    }
    /**
     * Determines whether the focus trap is active or not.
     * @attr
     */
    get inactive() {
        return this.hasAttribute("inactive");
    }
    set inactive(value) {
        value
            ? this.setAttribute("inactive", "")
            : this.removeAttribute("inactive");
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
        this.focused
            ? this.setAttribute("focused", "")
            : this.removeAttribute("focused");
    }
}
if (window && window.customElements) {
    window.customElements.define("focus-trap", FocusTrap);
}

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
        this.calciteModalOpen = createEvent(this, "calciteModalOpen", 7);
        this.calciteModalClose = createEvent(this, "calciteModalClose", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        const theme = getElementTheme(this.el);
        return (h(Host, { role: "dialog", "aria-modal": "true", class: { "is-active": this.isActive }, dir: dir, theme: theme }, h("div", { class: "modal" }, h("div", { "data-focus-fence": "true", tabindex: "0", onFocus: this.focusLastElement.bind(this) }), h("div", { class: "modal__header" }, h("button", { class: "modal__close", "aria-label": this.closeLabel, ref: (el) => this.closeButton = el, onClick: () => this.close() }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24", fill: "currentColor" }, h("path", { d: x24 }))), h("header", { class: "modal__title" }, h("slot", { name: "header" }))), h("div", { class: "modal__content", ref: (el) => this.modalContent = el }, h("slot", { name: "content" })), h("div", { class: "modal__footer" }, h("span", { class: "modal__back" }, h("slot", { name: "back" })), h("span", { class: "modal__secondary" }, h("slot", { name: "secondary" })), h("span", { class: "modal__primary" }, h("slot", { name: "primary" }))), h("div", { "data-focus-fence": "true", tabindex: "0", onFocus: this.focusFirstElement.bind(this) }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleEscape(e) {
        if (this.isActive && !this.disableEscape && e.key === "Escape") {
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
                    const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable);
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                    else {
                        this.closeButton && this.closeButton.focus();
                    }
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
    /** Set the scroll top of the modal content */
    async scrollContent(top = 0, left = 0) {
        if (this.modalContent) {
            if (this.modalContent.scrollTo) {
                this.modalContent.scrollTo({ top, left, behavior: 'smooth' });
            }
            else {
                this.modalContent.scrollTop = top;
                this.modalContent.scrollLeft = left;
            }
        }
    }
    focusFirstElement() {
        this.closeButton && this.closeButton.focus();
    }
    focusLastElement() {
        const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable)
            .filter(el => !el.getAttribute("data-focus-fence"));
        if (focusableElements.length > 0) {
            focusableElements[focusableElements.length - 1].focus();
        }
        else {
            this.closeButton && this.closeButton.focus();
        }
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
            "disableEscape": [4, "disable-escape"],
            "size": [513],
            "color": [513],
            "theme": [513],
            "isActive": [32],
            "open": [64],
            "close": [64],
            "scrollContent": [64]
        },
        "$listeners$": [[8, "keyup", "handleEscape"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

const CSS = {
    container: "container",
    containerOpen: "container--open",
    containerPointer: "container--pointer",
    contentContainer: "content-container",
    imageContainer: "image-container",
    closeButton: "close-button",
    content: "content"
};

function getPlacement(el, placement) {
    const values = ["left", "right"];
    if (getElementDir(el) === "rtl") {
        values.reverse();
    }
    return placement
        .replace(/leading/gi, values[0])
        .replace(/trailing/gi, values[1]);
}

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce$1 = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce$1(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/**
 * @slot image - A slot for adding an image. The image will appear above the other slot content.
 */
class CalcitePopover {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Adds a click handler to the referenceElement to toggle open the Popover.
         */
        this.addClickHandle = false;
        /**
         * Display a close button within the Popover.
         */
        this.closeButton = false;
        /**
         * Prevents flipping the popover's placement when it starts to overlap its reference element.
         */
        this.disableFlip = false;
        /**
         * Removes the caret pointer.
         */
        this.disablePointer = false;
        /**
         * Makes the popover flow toward the inner of the reference element.
         */
        this.flowInner = false;
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        /** Text for close button. */
        this.textClose = "Close";
        /** Select theme (light or dark) */
        this.theme = "light";
        /**
         * Offset the position of the popover in the horizontal direction.
         */
        this.xOffset = 0;
        /**
         * Offset the position of the popover in the vertical direction.
         */
        this.yOffset = 0;
        this._referenceElement = this.getReferenceElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || `calcite-popover-${guid()}`;
        };
        this.addReferenceAria = () => {
            const { _referenceElement } = this;
            if (_referenceElement &&
                !_referenceElement.hasAttribute("aria-describedby")) {
                _referenceElement.setAttribute("aria-describedby", this.getId());
            }
        };
        this.clickHandler = () => {
            this.toggle();
        };
        this.addReferenceListener = () => {
            const { _referenceElement, addClickHandle } = this;
            if (!_referenceElement || !addClickHandle) {
                return;
            }
            _referenceElement.addEventListener("click", this.clickHandler);
        };
        this.removeReferenceListener = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeEventListener("click", this.clickHandler);
        };
        this.hide = () => {
            this.open = false;
        };
    }
    interactionElementHandler() {
        this.removeReferenceListener();
        this.addReferenceListener();
    }
    openHandler(open) {
        if (open) {
            this.reposition();
        }
        else {
            this.destroyPopper();
        }
    }
    placementHandler() {
        this.destroyPopper();
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferenceListener();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListener();
        this.addReferenceAria();
        this.destroyPopper();
        this.reposition();
    }
    xOffsetHandler() {
        this.destroyPopper();
        this.reposition();
    }
    yOffsetHandler() {
        this.destroyPopper();
        this.reposition();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.reposition();
        this.addReferenceListener();
        this.addReferenceAria();
    }
    componentDidUnload() {
        this.removeReferenceListener();
        this.destroyPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async reposition() {
        const { popper } = this;
        popper ? this.updatePopper(popper) : this.createPopper();
    }
    async toggle() {
        this.open = !this.open;
    }
    getReferenceElement() {
        const { referenceElement } = this;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    }
    getModifiers() {
        const verticalRE = /top|bottom/gi;
        const autoRE = /auto/gi;
        const { disableFlip, flowInner, placement, xOffset, yOffset } = this;
        const offsetEnabled = !!(yOffset || xOffset) && !autoRE.test(placement);
        const offsets = [yOffset, xOffset];
        if (verticalRE.test(placement)) {
            offsets.reverse();
        }
        return {
            preventOverflow: {
                enabled: false
            },
            flip: {
                enabled: !disableFlip
            },
            hide: {
                enabled: false
            },
            inner: {
                enabled: flowInner
            },
            offset: {
                enabled: !!offsetEnabled,
                offset: offsets.join(",")
            }
        };
    }
    createPopper() {
        const { el, open, placement, _referenceElement } = this;
        if (!_referenceElement || !open) {
            return;
        }
        const newPopper = new Popper(_referenceElement, el, {
            eventsEnabled: false,
            placement: getPlacement(el, placement),
            modifiers: this.getModifiers()
        });
        window.addEventListener("resize", newPopper.scheduleUpdate, {
            passive: true
        });
        this.popper = newPopper;
    }
    updatePopper(popper) {
        popper.options.placement = getPlacement(this.el, this.placement);
        popper.options.modifiers = Object.assign(Object.assign({}, popper.options.modifiers), this.getModifiers());
        popper.scheduleUpdate();
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
            window.removeEventListener("resize", popper.scheduleUpdate);
            popper.destroy();
        }
        this.popper = null;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderImage() {
        return this.el.querySelector("[slot=image]") ? (h("div", { class: CSS.imageContainer }, h("slot", { name: "image" }))) : null;
    }
    renderCloseButton() {
        const { closeButton, textClose } = this;
        return closeButton ? (h("button", { "aria-label": textClose, title: textClose, class: { [CSS.closeButton]: true }, onClick: this.hide }, h(CalciteIcon, { size: "16", path: x16 }))) : null;
    }
    render() {
        const { _referenceElement, open, disablePointer } = this;
        const displayed = _referenceElement && open;
        return (h(Host, { role: "dialog", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: {
                [CSS.container]: true,
                [CSS.containerOpen]: displayed,
                [CSS.containerPointer]: !disablePointer
            } }, h("div", { class: CSS.contentContainer }, this.renderImage(), h("div", { class: CSS.content }, h("slot", null), this.renderCloseButton())))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "addClickHandle": ["interactionElementHandler"],
        "open": ["openHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"],
        "xOffset": ["xOffsetHandler"],
        "yOffset": ["yOffsetHandler"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-popover",
        "$members$": {
            "addClickHandle": [516, "add-click-handle"],
            "closeButton": [516, "close-button"],
            "disableFlip": [516, "disable-flip"],
            "disablePointer": [516, "disable-pointer"],
            "flowInner": [516, "flow-inner"],
            "open": [516],
            "placement": [513],
            "referenceElement": [1, "reference-element"],
            "textClose": [1, "text-close"],
            "theme": [513],
            "xOffset": [514, "x-offset"],
            "yOffset": [514, "y-offset"],
            "_referenceElement": [32],
            "reposition": [64],
            "toggle": [64]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
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
        /** Select theme (light or dark) */
        this.theme = "light";
    }
    render() {
        const theme = getElementTheme(this.el);
        return (h(Host, { class: "calcite-progress", type: this.type, reversed: this.reversed, style: {
                "--percentage-value": `${this.value * 100}%`
            }, theme: theme }, h("div", { class: "calcite-progress--track" }), h("div", { class: {
                "calcite-progress--bar": true,
                "--indeterminate": this.type === "indeterminate",
                "--determinate": this.type === "determinate"
            } }), h("div", { class: "calcite-progress--text" }, this.text), h("slot", null)));
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-progress",
        "$members$": {
            "type": [1],
            "value": [2],
            "text": [1],
            "reversed": [4],
            "theme": [513]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
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
        /** The component's theme. */
        this.theme = "light";
        /** The scale of the button */
        this.scale = "m";
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
        const items = this.getItems();
        const match = Array.from(items)
            .filter(item => item === newItem)
            .pop();
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
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        const items = this.getItems();
        let lastChecked = Array.from(items)
            .filter(item => item.checked)
            .pop();
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
        const { hiddenInput, name } = this;
        if (name) {
            hiddenInput.name = name;
        }
        if (lastChecked) {
            hiddenInput.value = lastChecked.value;
        }
    }
    componentDidLoad() {
        this.hasLoaded = true;
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
        // only fire after initial setup to prevent semi-infinite loops
        if (this.hasLoaded) {
            event.stopPropagation();
            event.preventDefault();
            this.selectItem(event.target);
        }
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
            if ((matches && !item.checked) || (!matches && item.checked)) {
                item.checked = matches;
            }
            item.tabIndex = matches ? 0 : -1;
            if (matches) {
                match = item;
            }
        });
        this.selectedItem = match;
        this.syncWithInputProxy(match);
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
            "selectedItem": [16],
            "theme": [513],
            "scale": [513]
        },
        "$listeners$": [[0, "click", "handleClick"], [0, "calciteRadioGroupItemChange", "handleSelected"], [0, "keydown", "handleKeyDown"]],
        "$lazyBundleIds$": "-",
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
        this.mutationObserver = this.getMutationObserver();
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
        }
        this.inputProxy = inputProxy;
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }
    render() {
        const { checked, value } = this;
        const scale = getElementProp(this.el, "scale", "m");
        return (h(Host, { role: "radio", "aria-checked": checked ? "true" : "false", scale: scale }, h("label", null, h("slot", null, value), h("slot", { name: "input" }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getMutationObserver() {
        return (Build.isBrowser &&
            new MutationObserver(() => this.syncFromExternalInput()));
    }
    syncFromExternalInput() {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    }
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
        "$lazyBundleIds$": "-",
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
        /** Select theme (light or dark) */
        this.theme = "light";
        /** Disable and gray out the slider */
        this.disabled = false;
        /** Minimum selectable value */
        this.min = 0;
        /** Maximum selectable value */
        this.max = 100;
        /** Currently selected number (if single select) */
        this.value = null;
        /** Snap selection along the step interval */
        this.snap = true;
        /** Interval to move on up/down keys */
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
        const theme = getElementTheme(this.el);
        const min = this.minValue || this.min;
        const max = this.maxValue || this.value;
        const maxProp = this.isRange ? "maxValue" : "value";
        return (h(Host, { dir: dir, theme: theme, id: id, "is-range": this.isRange, style: {
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
        if (this.dragListener) {
            this.dragEnd();
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
        const { left, width } = this.el.getBoundingClientRect();
        const percent = (x - left) / width;
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
            "theme": [513],
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
        "$lazyBundleIds$": "-",
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
        /** The scale of the button */
        this.scale = "m";
        /** The component's theme. */
        this.theme = "light";
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
            e.preventDefault();
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
        // prop validations
        let color = ["blue", "red"];
        if (!color.includes(this.color))
            this.color = "blue";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { role: "checkbox", dir: dir, "aria-checked": this.switched, tabindex: "0" }, h("div", { class: "track" }, h("div", { class: "handle" })), h("slot", null)));
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
            "color": [1537],
            "scale": [1537],
            "theme": [1537]
        },
        "$listeners$": [[0, "click", "onClick"], [0, "keydown", "keyDownHandler"]],
        "$lazyBundleIds$": "-",
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
        return Promise.resolve();
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
        "$lazyBundleIds$": "-",
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
        return (h(Host, { role: "tablist" }, h("nav", { class: "tab-nav", ref: el => (this.tabNavEl = el) }, h("slot", null))));
    }
    componentDidRender() {
        // if every tab title is active select the first tab.
        if (this.tabTitles.length &&
            this.tabTitles.every(title => !title.isActive) &&
            !this.selectedTab) {
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
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getIndexOfTabTitle(el) {
        return this.tabTitles.indexOf(el);
    }
    get tabTitles() {
        if (this.tabNavEl) {
            return getSlottedElements(this.tabNavEl, "calcite-tab-title");
        }
        return [];
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
        "$lazyBundleIds$": "-",
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
        "$lazyBundleIds$": "-",
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
        return (h(Host, { dir: dir }, h("div", null, h("slot", { name: "tab-nav" }), h("section", null, h("slot", null)))));
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
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

const CSS$1 = {
    container: "tooltip-container",
    containerOpen: "tooltip-container--open",
    contentContainer: "tooltip-content-container"
};

class CalciteTooltip {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        /** Select theme (light or dark) */
        this.theme = "light";
        this._referenceElement = this.getReferenceElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || `calcite-tooltip-${guid()}`;
        };
        this.addReferenceAria = () => {
            const { _referenceElement } = this;
            if (_referenceElement &&
                !_referenceElement.hasAttribute("aria-describedby")) {
                _referenceElement.setAttribute("aria-describedby", this.getId());
            }
        };
        this.addReferenceListeners = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.addEventListener("mouseenter", this.show);
            _referenceElement.addEventListener("mouseleave", this.hide);
            _referenceElement.addEventListener("focus", this.show);
            _referenceElement.addEventListener("blur", this.hide);
        };
        this.removeReferenceListeners = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeEventListener("mouseenter", this.show);
            _referenceElement.removeEventListener("mouseleave", this.hide);
            _referenceElement.removeEventListener("focus", this.show);
            _referenceElement.removeEventListener("blur", this.hide);
        };
        this.show = () => {
            this.open = true;
        };
        this.hide = () => {
            this.open = false;
        };
    }
    openHandler(open) {
        if (open) {
            this.reposition();
        }
        else {
            this.destroyPopper();
        }
    }
    placementHandler() {
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferenceListeners();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListeners();
        this.addReferenceAria();
        this.destroyPopper();
        this.reposition();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.addReferenceListeners();
        this.addReferenceAria();
        this.reposition();
    }
    componentDidUnload() {
        this.removeReferenceListeners();
        this.destroyPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async reposition() {
        const { popper } = this;
        popper ? this.updatePopper(popper) : this.createPopper();
    }
    getReferenceElement() {
        const { referenceElement } = this;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    }
    getModifiers() {
        return {
            preventOverflow: {
                enabled: false
            },
            hide: {
                enabled: false
            }
        };
    }
    createPopper() {
        const { _referenceElement, el, open, placement } = this;
        if (!_referenceElement || !open) {
            return;
        }
        const newPopper = new Popper(_referenceElement, el, {
            eventsEnabled: false,
            placement: getPlacement(el, placement),
            modifiers: this.getModifiers()
        });
        window.addEventListener("resize", newPopper.scheduleUpdate, {
            passive: true
        });
        this.popper = newPopper;
    }
    updatePopper(popper) {
        popper.options.placement = getPlacement(this.el, this.placement);
        popper.options.modifiers = Object.assign(Object.assign({}, popper.options.modifiers), this.getModifiers());
        popper.scheduleUpdate();
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
            window.removeEventListener("resize", popper.scheduleUpdate);
            popper.destroy();
        }
        this.popper = null;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { _referenceElement, open } = this;
        const displayed = _referenceElement && open;
        return (h(Host, { role: "tooltip", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: {
                [CSS$1.container]: true,
                [CSS$1.containerOpen]: displayed
            } }, h("div", { class: CSS$1.contentContainer }, h("slot", null)))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-tooltip",
        "$members$": {
            "open": [516],
            "placement": [513],
            "referenceElement": [1, "reference-element"],
            "theme": [513],
            "_referenceElement": [32],
            "reposition": [64]
        },
        "$listeners$": undefined,
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

var TreeSelectionMode;
(function (TreeSelectionMode) {
    TreeSelectionMode["Single"] = "single";
    TreeSelectionMode["Multi"] = "multi";
    TreeSelectionMode["Children"] = "children";
    TreeSelectionMode["MultiChildren"] = "multi-children";
})(TreeSelectionMode || (TreeSelectionMode = {}));

class CalciteTree {
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
        this.lines = false;
        this.root = true;
        this.theme = "light";
        this.size = "m";
        this.selectionMode = TreeSelectionMode.Single;
        this.calciteTreeSelect = createEvent(this, "calciteTreeSelect", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    componentWillRender() {
        const parent = this.el.parentElement.closest("calcite-tree");
        this.theme = getElementTheme(this.el);
        this.lines = parent ? parent.lines : this.lines;
        this.size = parent ? parent.size : this.size;
        this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
        this.root = parent ? false : true;
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { tabindex: this.root ? "1" : undefined, dir: dir, "aria-role": this.root ? "tree" : undefined, "aria-multiselectable": this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren }, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onFocus() {
        if (this.root) {
            const selectedNode = this.el.querySelector("calcite-tree-item[selected]");
            const firstNode = this.el.querySelector("calcite-tree-item");
            (selectedNode || firstNode).focus();
        }
    }
    onClick(e) {
        const target = e.target;
        const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
        const shouldSelect = this.selectionMode !== null &&
            (!target.hasChildren ||
                (target.hasChildren &&
                    (this.selectionMode === TreeSelectionMode.Children ||
                        this.selectionMode === TreeSelectionMode.MultiChildren)));
        const shouldModifyToCurrentSelection = e.detail.modifyCurrentSelection &&
            (this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren);
        const shouldSelectChildren = this.selectionMode === TreeSelectionMode.MultiChildren ||
            this.selectionMode === TreeSelectionMode.Children;
        const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
            (((this.selectionMode === TreeSelectionMode.Single ||
                this.selectionMode === TreeSelectionMode.Multi) &&
                childItems.length <= 0) ||
                (this.selectionMode === TreeSelectionMode.Children ||
                    this.selectionMode === TreeSelectionMode.MultiChildren));
        const shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren;
        if (this.root) {
            const targetItems = [];
            if (shouldSelect) {
                targetItems.push(target);
            }
            if (shouldSelectChildren) {
                childItems.forEach(treeItem => {
                    targetItems.push(treeItem);
                });
            }
            if (shouldClearCurrentSelection) {
                const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
                selectedItems.forEach(treeItem => {
                    if (!targetItems.includes(treeItem)) {
                        treeItem.selected = false;
                    }
                });
            }
            if (shouldExpandTarget && !e.detail.forceToggle) {
                target.expanded = true;
            }
            if (shouldModifyToCurrentSelection) {
                window.getSelection().removeAllRanges();
            }
            if ((shouldModifyToCurrentSelection && target.selected) ||
                (shouldSelectChildren && e.detail.forceToggle)) {
                targetItems.forEach(treeItem => {
                    treeItem.selected = false;
                });
            }
            else {
                targetItems.forEach(treeItem => {
                    treeItem.selected = true;
                });
            }
        }
        if (this.root) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.calciteTreeSelect.emit({
            selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter(i => i.selected)
        });
    }
    get el() { return getElement(this); }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-tree",
        "$members$": {
            "lines": [1540],
            "root": [1540],
            "theme": [1537],
            "size": [1537],
            "selectionMode": [1537, "selection-mode"]
        },
        "$listeners$": [[0, "focus", "onFocus"], [0, "calciteTreeItemSelect", "onClick"]],
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

class CalciteTreeItem {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Be sure to add a jsdoc comment describing your property for the generated readme file.
         * If your property should be hidden from documentation, you can use the `@internal` tag
         */
        this.selected = false;
        this.depth = -1;
        this.hasChildren = null;
        this.expanded = false;
        this.parentExpanded = false;
        this.iconClickHandler = (event) => {
            event.stopPropagation();
            this.expanded = !this.expanded;
            this.calciteTreeItemSelect.emit({
                modifyCurrentSelection: event.shiftKey,
                forceToggle: true
            });
        };
        this.childrenClickHandler = (event) => event.stopPropagation();
        this.calciteTreeItemSelect = createEvent(this, "calciteTreeItemSelect", 7);
    }
    expandedHandler(newValue) {
        if (this.childrenSlotWrapper) {
            const [childTree] = getSlottedElements(this.childrenSlotWrapper, "calcite-tree");
            if (childTree) {
                const items = getSlottedElements(childTree, "calcite-tree-item");
                items.forEach(item => (item.parentExpanded = newValue));
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillRender() {
        this.hasChildren = !!this.el.querySelector("calcite-tree");
        let parentTree = this.el.closest("calcite-tree");
        this.selectionMode = parentTree.selectionMode;
        this.depth = 0;
        let nextParentTree;
        while (parentTree) {
            nextParentTree = parentTree.parentElement.closest("calcite-tree");
            if (nextParentTree === parentTree) {
                break;
            }
            else {
                parentTree = nextParentTree;
                this.depth = this.depth + 1;
            }
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const icon = this.hasChildren ? (h("svg", { class: "calcite-tree-chevron", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", viewBox: "0 0 16 16", onClick: this.iconClickHandler, "data-test-id": "icon" }, h("path", { d: chevronRight16 }))) : null;
        return (h(Host, { tabindex: this.parentExpanded || this.depth === 1 ? "0" : "-1", dir: dir, "aria-role": "treeitem", "aria-hidden": this.parentExpanded || this.depth === 1 ? undefined : "true", "aria-selected": this.selected
                ? "true"
                : this.selectionMode === TreeSelectionMode.Multi ||
                    this.selectionMode === TreeSelectionMode.MultiChildren
                    ? "false"
                    : undefined, "aria-expanded": this.hasChildren ? (this.expanded ? "true" : "false") : undefined }, h("div", { class: "calcite-tree-node", ref: el => (this.defaultSlotWrapper = el) }, icon, h("slot", null)), h("div", { class: "calcite-tree-children", "data-test-id": "calcite-tree-children", role: this.hasChildren ? "group" : undefined, ref: el => (this.childrenSlotWrapper = el), onClick: this.childrenClickHandler }, h("slot", { name: "children" }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        // Solve for if the item is clicked somewhere outside the slotted anchor.
        // Anchor is triggered anywhere you click
        const [link] = getSlottedElements(this.defaultSlotWrapper, "a");
        if (link && (e.composedPath()[0].tagName.toLowerCase() !== "a")) {
            const target = link.target === "" ? "_self" : link.target;
            window.open(link.href, target);
        }
        this.expanded = !this.expanded;
        this.calciteTreeItemSelect.emit({
            modifyCurrentSelection: e.shiftKey,
            forceToggle: false
        });
    }
    keyDownHandler(e) {
        let root;
        switch (e.keyCode) {
            case SPACE:
                this.selected = !this.selected;
                e.preventDefault();
                e.stopPropagation();
                break;
            case ENTER:
                // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
                const link = nodeListToArray(this.el.children).find(e => e.matches("a"));
                if (link) {
                    link.click();
                    this.selected = true;
                }
                else {
                    this.selected = !this.selected;
                }
                e.preventDefault();
                e.stopPropagation();
                break;
            case LEFT:
                // When focus is on an open node, closes the node.
                if (this.hasChildren && this.expanded) {
                    this.expanded = false;
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
                const parentItem = this.el.parentElement.closest("calcite-tree-item");
                if (parentItem && (!this.hasChildren || this.expanded === false)) {
                    parentItem.focus();
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a root node that is also either an end node or a closed node, does nothing.
                break;
            case RIGHT:
                // When focus is on a closed node, opens the node; focus does not move.
                if (this.hasChildren && this.expanded === false) {
                    this.expanded = true;
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a open node, moves focus to the first child node.
                if (this.hasChildren && this.expanded) {
                    this.el.querySelector("calcite-tree-item").focus();
                    break;
                }
                // When focus is on an end node, does nothing.
                break;
            case UP:
                const previous = this.el
                    .previousElementSibling;
                if (previous && previous.matches("calcite-tree-item")) {
                    previous.focus();
                }
                break;
            case DOWN:
                const next = this.el.nextElementSibling;
                if (next && next.matches("calcite-tree-item")) {
                    next.focus();
                }
                break;
            case HOME:
                root = this.el.closest("calcite-tree[root]");
                const firstNode = root.querySelector("calcite-tree-item");
                firstNode.focus();
                break;
            case END:
                root = this.el.closest("calcite-tree[root]");
                let currentNode = root.children[root.children.length - 1]; // last child
                let currentTree = nodeListToArray(currentNode.children).find(e => e.matches("calcite-tree"));
                while (currentTree) {
                    currentNode = currentTree.children[root.children.length - 1];
                    currentTree = nodeListToArray(currentNode.children).find(e => e.matches("calcite-tree"));
                }
                currentNode.focus();
                break;
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "expanded": ["expandedHandler"]
    }; }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "calcite-tree-item",
        "$members$": {
            "selected": [1540],
            "depth": [1538],
            "hasChildren": [1540, "has-children"],
            "expanded": [1540],
            "parentExpanded": [1028, "parent-expanded"],
            "selectionMode": [32]
        },
        "$listeners$": [[0, "click", "onClick"], [0, "keydown", "keyDownHandler"]],
        "$lazyBundleIds$": "-",
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
        "$lazyBundleIds$": "-",
        "$attrsToReflect$": []
    }; }
}

const cmps = [
  CalciteAccordion,
  CalciteAccordionItem,
  CalciteAlert,
  CalciteAlerts,
  CalciteButton,
  CalciteCheckbox,
  CalciteDateDay,
  CalciteDateMonth,
  CalciteDateMonth$1,
  CalciteDatePicker,
  CalciteDropdown,
  CalciteDropdownGroup,
  CalciteDropdownItem,
  CalciteExample,
  CalciteLoader,
  CalciteModal,
  CalcitePopover,
  CalciteProgress,
  CalciteRadioGroup,
  CalciteRadioGroupItem,
  CalciteSlider,
  CalciteSwitch,
  CalciteTab,
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs,
  CalciteTooltip,
  CalciteTree,
  CalciteTreeItem,
  ContextConsumer,
];
registerComponents(cmps);
styles.set('sc-calcite-accordion','/*!\@:root*/.sc-calcite-accordion:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-accordion-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-accordion-h{display:none}/*!\@body*/body.sc-calcite-accordion{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-accordion{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-accordion{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-accordion{display:block}/*!\@a*/a.sc-calcite-accordion{color:#007ac2}/*!\@:host*/.sc-calcite-accordion-h{--calcite-accordion-border-color:#dfdfdf;--calcite-accordion-item-background-color:#fff;--calcite-accordion-item-color:#6a6a6a;--calcite-accordion-item-color-hover:#4a4a4a;--calcite-accordion-item-color-active:#151515;--calcite-accordion-item-border-color:#dfdfdf;--calcite-accordion-item-hover-icon-fill:#007ac2}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-accordion-h{--calcite-accordion-border-color:#404040;--calcite-accordion-item-background-color:#2b2b2b;--calcite-accordion-item-color:#9f9f9f;--calcite-accordion-item-color-hover:#bfbfbf;--calcite-accordion-item-color-active:#fff;--calcite-accordion-item-border-color:#404040;--calcite-accordion-item-hover-icon-fill:#00a0ff}/*!\@:host([scale=s])*/[scale=s].sc-calcite-accordion-h{--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.8125rem;line-height:1.5}/*!\@:host([scale=m])*/[scale=m].sc-calcite-accordion-h{--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.875rem;line-height:1.5}/*!\@:host([scale=l])*/[scale=l].sc-calcite-accordion-h{--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.9375rem;line-height:1.5}/*!\@:host([icon-position=start])*/[icon-position=start].sc-calcite-accordion-h{--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-rotation:180deg;--calcite-accordion-item-active-icon-rotation:270deg;--calcite-accordion-item-icon-rotation-rtl:0deg;--calcite-accordion-item-active-icon-rotation-rtl:-90deg;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(--calcite-accordion-item-spacing-unit)}/*!\@:host([icon-position=end])*/[icon-position=end].sc-calcite-accordion-h{--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-rotation:0deg;--calcite-accordion-item-active-icon-rotation:-90deg;--calcite-accordion-item-icon-rotation-rtl:180deg;--calcite-accordion-item-active-icon-rotation-rtl:270deg;--calcite-accordion-item-icon-spacing-start:var(--calcite-accordion-item-spacing-unit);--calcite-accordion-item-icon-spacing-end:0}/*!\@:host([appearance=minimal])*/[appearance=minimal].sc-calcite-accordion-h{--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0}/*!\@:host*/.sc-calcite-accordion-h{display:block;position:relative;max-width:100%;border:1px solid var(--calcite-accordion-border-color);border-bottom:none}/*!\@:host([appearance=minimal])*/[appearance=minimal].sc-calcite-accordion-h{border:1px solid transparent}');
styles.set('sc-calcite-accordion-item','/*!\@:root*/.sc-calcite-accordion-item:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-accordion-item-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-accordion-item-h{display:none}/*!\@body*/body.sc-calcite-accordion-item{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-accordion-item{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-accordion-item{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-accordion-item{display:block}/*!\@a*/a.sc-calcite-accordion-item{color:#007ac2}/*!\@:host*/.sc-calcite-accordion-item-h{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--calcite-accordion-item-background-color);color:var(--calcite-accordion-item-color);-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out;text-decoration:none;outline:none;position:relative}/*!\@:host([active])*/[active].sc-calcite-accordion-item-h{color:var(--calcite-accordion-item-color-active)}/*!\@:host([active]) .accordion-item-content*/[active].sc-calcite-accordion-item-h .accordion-item-content.sc-calcite-accordion-item{display:block}/*!\@.accordion-item-header*/.accordion-item-header.sc-calcite-accordion-item{display:-ms-flexbox;display:flex;-ms-flex-direction:var(--calcite-accordion-item-flex-direction);flex-direction:var(--calcite-accordion-item-flex-direction);-ms-flex-align:center;align-items:center;cursor:pointer}/*!\@.accordion-item-content,.accordion-item-header*/.accordion-item-content.sc-calcite-accordion-item, .accordion-item-header.sc-calcite-accordion-item{padding:var(--calcite-accordion-item-padding);border-bottom:1px solid var(--calcite-accordion-item-border-color);-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}/*!\@.accordion-item-header **/.accordion-item-header.sc-calcite-accordion-item *.sc-calcite-accordion-item{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}/*!\@.accordion-item-content*/.accordion-item-content.sc-calcite-accordion-item{display:none}/*!\@.accordion-item-icon*/.accordion-item-icon.sc-calcite-accordion-item{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end)}/*!\@.accordion-item-icon svg*/.accordion-item-icon.sc-calcite-accordion-item svg.sc-calcite-accordion-item{fill:var(--calcite-accordion-item-color);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation));transform:rotate(var(--calcite-accordion-item-icon-rotation))}/*!\@:host(:focus) .accordion-item-icon svg,:host(:hover) .accordion-item-icon svg*/.sc-calcite-accordion-item-h:focus .accordion-item-icon.sc-calcite-accordion-item svg.sc-calcite-accordion-item, .sc-calcite-accordion-item-h:hover .accordion-item-icon.sc-calcite-accordion-item svg.sc-calcite-accordion-item{fill:var(--calcite-accordion-item-hover-icon-fill)}/*!\@:host([dir=rtl]) .accordion-item-icon*/[dir=rtl].sc-calcite-accordion-item-h .accordion-item-icon.sc-calcite-accordion-item{margin-left:var(--calcite-accordion-item-icon-spacing-end);margin-right:var(--calcite-accordion-item-icon-spacing-start)}/*!\@:host([dir=rtl]) .accordion-item-icon svg*/[dir=rtl].sc-calcite-accordion-item-h .accordion-item-icon.sc-calcite-accordion-item svg.sc-calcite-accordion-item{-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}/*!\@:host([active]) .accordion-item-icon svg*/[active].sc-calcite-accordion-item-h .accordion-item-icon.sc-calcite-accordion-item svg.sc-calcite-accordion-item{fill:var(--calcite-accordion-item-color-active);-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation));transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}/*!\@:host([active][dir=rtl]) .accordion-item-icon svg*/[active][dir=rtl].sc-calcite-accordion-item-h .accordion-item-icon.sc-calcite-accordion-item svg.sc-calcite-accordion-item{-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}/*!\@.accordion-item-title*/.accordion-item-title.sc-calcite-accordion-item{margin-right:auto}/*!\@:host([dir=rtl]) .accordion-item-title*/[dir=rtl].sc-calcite-accordion-item-h .accordion-item-title.sc-calcite-accordion-item{margin-right:0;margin-left:auto}/*!\@:host(:focus) .accordion-item-title,:host(:hover) .accordion-item-title*/.sc-calcite-accordion-item-h:focus .accordion-item-title.sc-calcite-accordion-item, .sc-calcite-accordion-item-h:hover .accordion-item-title.sc-calcite-accordion-item{color:var(--calcite-accordion-item-color-hover)}/*!\@:host(:active) .accordion-item-title,:host(:focus) .accordion-item-title,:host([active]) .accordion-item-title*/.sc-calcite-accordion-item-h:active .accordion-item-title.sc-calcite-accordion-item, .sc-calcite-accordion-item-h:focus .accordion-item-title.sc-calcite-accordion-item, [active].sc-calcite-accordion-item-h .accordion-item-title.sc-calcite-accordion-item{color:var(--calcite-accordion-item-color-active);font-weight:500}');
styles.set('sc-calcite-alert','/*!\@:root*/.sc-calcite-alert:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-alert-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-alert-h{display:none}/*!\@body*/body.sc-calcite-alert{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-alert{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-alert{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-alert{display:block}/*!\@a*/a.sc-calcite-alert{color:#007ac2}/*!\@:host*/.sc-calcite-alert-h{--calcite-alert-background:#fff;--calcite-alert-title-text:#404040;--calcite-alert-message-text:#555;--calcite-alert-icon-fill:#151515;--calcite-alert-close-background-hover:#f3f3f3;--calcite-alert-close-background-pressed:#eaeaea;--calcite-alert-count-text:#404040;--calcite-alert-count-border:#f3f3f3;--calcite-alert-dismiss-background:hsla(0,0%,100%,0.8);--calcite-alert-border-blue:#007ac2;--calcite-alert-border-green:#35ac46;--calcite-alert-border-red:#d83020;--calcite-alert-border-yellow:#edd317}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-alert-h{--calcite-alert-background:#2b2b2b;--calcite-alert-title-text:#f8f8f8;--calcite-alert-message-text:#f3f3f3;--calcite-alert-icon-fill:#d4d4d4;--calcite-alert-close-background-hover:#202020;--calcite-alert-close-background-pressed:#151515;--calcite-alert-count-text:#d4d4d4;--calcite-alert-count-border:#202020;--calcite-alert-dismiss-background:rgba(43,43,43,0.8);--calcite-alert-border-blue:#00a0ff;--calcite-alert-border-green:#36da43;--calcite-alert-border-red:#fe583e;--calcite-alert-border-yellow:#ffc900}/*!\@:host*/.sc-calcite-alert-h{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;pointer-events:none;z-index:102;margin:0 auto;width:50em;max-width:90%;max-height:0;background-color:var(--calcite-alert-background);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);border-radius:2px;opacity:0;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;border-top:0 solid transparent}\@media only screen and (max-width:860px){/*!\@:host*/.sc-calcite-alert-h{width:100%;max-width:100%;border-radius:2px 2px 0 0;-webkit-box-shadow:0 -8px 16px 0 rgba(0,0,0,.15);box-shadow:0 -8px 16px 0 rgba(0,0,0,.15)}}/*!\@:host:host(.hydrated)*/.sc-calcite-alert-h (.hydrated).sc-calcite-alert-h{visibility:hidden!important}/*!\@:host([active])*/[active].sc-calcite-alert-h{opacity:1;max-height:100%;-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);pointer-events:auto;border-top-width:3px}/*!\@:host([active]):host(.hydrated)*/[active].sc-calcite-alert-h (.hydrated).sc-calcite-alert-h{visibility:visible!important}\@media only screen and (max-width:860px){/*!\@:host([active])*/[active].sc-calcite-alert-h{-webkit-transform:translateZ(0);transform:translateZ(0)}}/*!\@div::slotted([slot=alert-title]),slot[name=alert-title]::slotted(div)*/div.sc-calcite-alert-s > [slot=alert-title], slot[name=alert-title].sc-calcite-alert-s > div{font-size:1rem;line-height:1.5;color:var(--calcite-alert-title-text);font-weight:500}/*!\@::slotted(calcite-button)*/.sc-calcite-alert-s > calcite-button{font-size:.9375rem;line-height:1.5}/*!\@div::slotted([slot=alert-message]),slot[name=alert-message]::slotted(div)*/div.sc-calcite-alert-s > [slot=alert-message], slot[name=alert-message].sc-calcite-alert-s > div{display:inline;margin-right:.75rem;font-size:.9375rem;line-height:1.5;color:var(--calcite-alert-message-text)}/*!\@:host([dir=rtl]) div::slotted([slot=alert-message]),:host([dir=rtl]) slot[name=alert-message]::slotted(div)*/.sc-calcite-alert-h[dir=rtl] div.sc-calcite-alert-s > [slot=alert-message], .sc-calcite-alert-h[dir=rtl] slot[name=alert-message].sc-calcite-alert-s > div{margin-right:unset;margin-left:.75rem}/*!\@.alert-content*/.alert-content.sc-calcite-alert{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:.75rem .75rem .75rem 0}/*!\@.alert-content svg*/.alert-content.sc-calcite-alert svg.sc-calcite-alert{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){/*!\@.alert-content*/.alert-content.sc-calcite-alert{padding:1.5rem}}/*!\@.alert-content:first-of-type*/.alert-content.sc-calcite-alert:first-of-type{padding-left:1.5rem}\@media only screen and (max-width:860px){/*!\@.alert-content*/.alert-content.sc-calcite-alert{padding:1.5rem .75rem 1.5rem 0}}/*!\@:host([dir=rtl]) .alert-content:first-of-type*/[dir=rtl].sc-calcite-alert-h .alert-content.sc-calcite-alert:first-of-type{padding-right:1.5rem;padding-left:none}\@media only screen and (max-width:860px){/*!\@:host([dir=rtl]) .alert-content*/[dir=rtl].sc-calcite-alert-h .alert-content.sc-calcite-alert{padding:1.5rem 0 1.5rem .75rem}}/*!\@.alert-icon*/.alert-icon.sc-calcite-alert{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}/*!\@.alert-icon svg*/.alert-icon.sc-calcite-alert svg.sc-calcite-alert{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){/*!\@.alert-icon*/.alert-icon.sc-calcite-alert{padding:1.5rem}}/*!\@.alert-close*/.alert-close.sc-calcite-alert{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;border-radius:0 0 2px 0}/*!\@.alert-close svg*/.alert-close.sc-calcite-alert svg.sc-calcite-alert{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){/*!\@.alert-close*/.alert-close.sc-calcite-alert{padding:1.5rem}}/*!\@.alert-close svg*/.alert-close.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-icon-fill)}/*!\@.alert-close:focus,.alert-close:hover*/.alert-close.sc-calcite-alert:focus, .alert-close.sc-calcite-alert:hover{background-color:var(--calcite-alert-close-background-hover)}/*!\@.alert-close:active*/.alert-close.sc-calcite-alert:active{background-color:var(--calcite-alert-close-background-pressed)}/*!\@:host([dir=rtl]) .alert-close*/[dir=rtl].sc-calcite-alert-h .alert-close.sc-calcite-alert{border-radius:0 0 0 2px}\@media only screen and (max-width:860px){/*!\@:host([dir=rtl]) .alert-close*/[dir=rtl].sc-calcite-alert-h .alert-close.sc-calcite-alert{border-radius:0}}/*!\@.alert-count*/.alert-count.sc-calcite-alert{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:var(--calcite-alert-count-text);opacity:0;border-left:0 solid transparent;border-right:0 solid transparent;cursor:default;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@.alert-count.active*/.alert-count.active.sc-calcite-alert{visibility:visible;opacity:1;padding:0 .375rem;width:3rem;border-left:1px solid var(--calcite-alert-count-border);border-right:1px solid var(--calcite-alert-count-border)}/*!\@.alert-count.active:last-child*/.alert-count.active.sc-calcite-alert:last-child{border-right:0 solid transparent}\@media only screen and (max-width:860px){/*!\@.alert-count*/.alert-count.sc-calcite-alert{border-radius:0}}/*!\@:host([dir=rtl]).active:last-child*/[dir=rtl].active.sc-calcite-alert-h:last-child{border-left:1px solid var(--calcite-alert-count-border);border-right:0 solid transparent}/*!\@.alert-dismiss*/.alert-dismiss.sc-calcite-alert{left:0;top:0;width:100%;z-index:103}/*!\@.alert-dismiss,.alert-dismiss:after*/.alert-dismiss.sc-calcite-alert, .alert-dismiss.sc-calcite-alert:after{display:block;position:absolute;right:0;height:3px}/*!\@.alert-dismiss:after*/.alert-dismiss.sc-calcite-alert:after{top:-3px;border-radius:2px 2px 0 0;content:\"\";background-color:var(--calcite-alert-dismiss-background);z-index:104}/*!\@:host([color=blue])*/[color=blue].sc-calcite-alert-h{border-top-color:var(--calcite-alert-border-blue)}/*!\@:host([color=blue]) .alert-icon svg*/[color=blue].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-blue)}/*!\@:host([color=red])*/[color=red].sc-calcite-alert-h{border-top-color:var(--calcite-alert-border-red)}/*!\@:host([color=red]) .alert-icon svg*/[color=red].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-red)}/*!\@:host([color=yellow])*/[color=yellow].sc-calcite-alert-h{border-top-color:var(--calcite-alert-border-yellow)}/*!\@:host([color=yellow]) .alert-icon svg*/[color=yellow].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-yellow)}/*!\@:host([color=green])*/[color=green].sc-calcite-alert-h{border-top-color:var(--calcite-alert-border-green)}/*!\@:host([color=green]) .alert-icon svg*/[color=green].sc-calcite-alert-h .alert-icon.sc-calcite-alert svg.sc-calcite-alert{fill:var(--calcite-alert-border-green)}/*!\@:host([duration=fast]) .alert-dismiss:after*/[duration=fast].sc-calcite-alert-h .alert-dismiss.sc-calcite-alert:after{-webkit-animation:dismissProgress 6s ease-out;animation:dismissProgress 6s ease-out}/*!\@:host([duration=medium]) .alert-dismiss:after*/[duration=medium].sc-calcite-alert-h .alert-dismiss.sc-calcite-alert:after{-webkit-animation:dismissProgress 10s ease-out;animation:dismissProgress 10s ease-out}/*!\@:host([duration=slow]) .alert-dismiss:after*/[duration=slow].sc-calcite-alert-h .alert-dismiss.sc-calcite-alert:after{-webkit-animation:dismissProgress 14s ease-out;animation:dismissProgress 14s ease-out}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:.8}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:.8}to{width:100%;opacity:1}}');
styles.set('sc-calcite-alerts','/*!\@:root*/.sc-calcite-alerts:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-alerts-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-alerts-h{display:none}/*!\@body*/body.sc-calcite-alerts{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-alerts{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-alerts{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-alerts{display:block}/*!\@a*/a.sc-calcite-alerts{color:#007ac2}/*!\@:host*/.sc-calcite-alerts-h{display:none;position:fixed;left:0;right:0;bottom:0;pointer-events:none;z-index:101}/*!\@:host([active])*/[active].sc-calcite-alerts-h{display:block}');
styles.set('sc-calcite-button','/*!\@:root*/.sc-calcite-button:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-button-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-button-h{display:none}/*!\@body*/body.sc-calcite-button{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-button{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-button{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-button{display:block}/*!\@a*/a.sc-calcite-button{color:#007ac2}/*!\@:host*/.sc-calcite-button-h{display:inline-block;width:auto;--calcite-button-blue:#007ac2;--calcite-button-blue-hover:#2890ce;--calcite-button-blue-pressed:#00619b;--calcite-button-red:#d83020;--calcite-button-red-hover:#e65240;--calcite-button-red-pressed:#a82b1e;--calcite-button-dark:#353535;--calcite-button-dark-hover:#404040;--calcite-button-dark-pressed:#2b2b2b;--calcite-button-blue-inline-underline:rgba(0,122,194,0.2);--calcite-button-red-inline-underline:rgba(216,48,32,0.2);--calcite-button-blue-solid-color:#fff;--calcite-button-red-solid-color:#fff;--calcite-button-outline-background:#fff;--calcite-button-outline-color:#0b0b0b;--calcite-button-outline-color-pressed:#0b0b0b}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-button-h{--calcite-button-blue:#00a0ff;--calcite-button-blue-hover:#0087d7;--calcite-button-blue-pressed:#47bbff;--calcite-button-red:#fe583e;--calcite-button-red-hover:#f3381b;--calcite-button-red-pressed:#ff7465;--calcite-button-dark:#353535;--calcite-button-dark-hover:#2b2b2b;--calcite-button-dark-pressed:#404040;--calcite-button-blue-inline-underline:rgba(0,160,255,0.2);--calcite-button-red-inline-underline:rgba(254,88,62,0.2);--calcite-button-blue-solid-color:#0b0b0b;--calcite-button-red-solid-color:#0b0b0b;--calcite-button-outline-background:#151515;--calcite-button-outline-color:#fff;--calcite-button-outline-color-pressed:#fff}/*!\@:host([appearance=inline])*/[appearance=inline].sc-calcite-button-h{display:inline}/*!\@:host a,:host button,:host span*/.sc-calcite-button-h a.sc-calcite-button, .sc-calcite-button-h button.sc-calcite-button, .sc-calcite-button-h span.sc-calcite-button{position:relative;display:block;padding:.375rem 1rem;text-decoration:none;width:100%;border-radius:0;border:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;line-height:inherit;font-family:inherit;-webkit-appearance:none;cursor:pointer;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@:host a:hover,:host button:hover,:host span:hover*/.sc-calcite-button-h a.sc-calcite-button:hover, .sc-calcite-button-h button.sc-calcite-button:hover, .sc-calcite-button-h span.sc-calcite-button:hover{text-decoration:none}/*!\@:host([width=auto])*/[width=auto].sc-calcite-button-h{width:auto}/*!\@:host([width=half])*/[width=half].sc-calcite-button-h{width:50%}/*!\@:host([width=full])*/[width=full].sc-calcite-button-h{width:100%}/*!\@.calcite-button--icon*/.calcite-button--icon.sc-calcite-button{display:-ms-inline-flexbox;display:inline-flex;top:2px;position:relative;height:16px;width:16px;margin:0 auto;line-height:inherit;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@:host([disabled]) a,:host([disabled]) button,:host([disabled]) span*/[disabled].sc-calcite-button-h a.sc-calcite-button, [disabled].sc-calcite-button-h button.sc-calcite-button, [disabled].sc-calcite-button-h span.sc-calcite-button{pointer-events:none;opacity:.4}/*!\@:host([hastext][iconposition=start]) .calcite-button--icon*/[hastext][iconposition=start].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-right:.5rem}/*!\@:host([hastext][iconposition=start][dir=rtl]) .calcite-button--icon*/[hastext][iconposition=start][dir=rtl].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-right:0;margin-left:.5rem}/*!\@:host([hastext][iconposition=end]) .calcite-button--icon*/[hastext][iconposition=end].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-left:.5rem}/*!\@:host([hastext][iconposition=end][dir=rtl]) .calcite-button--icon*/[hastext][iconposition=end][dir=rtl].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-left:0;margin-right:.5rem}/*!\@:host([appearance=inline]) .calcite-button--icon*/[appearance=inline].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{max-height:.75rem;top:0}/*!\@:host([appearance=inline][iconposition=start]) .calcite-button--icon*/[appearance=inline][iconposition=start].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-right:.375rem}/*!\@:host([appearance=inline][iconposition=start][dir=rtl]) .calcite-button--icon*/[appearance=inline][iconposition=start][dir=rtl].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-left:.375rem;margin-right:0}/*!\@:host([appearance=inline][iconposition=end]) .calcite-button--icon*/[appearance=inline][iconposition=end].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-left:.375rem}/*!\@:host([appearance=inline][iconposition=end][dir=rtl]) .calcite-button--icon*/[appearance=inline][iconposition=end][dir=rtl].sc-calcite-button-h .calcite-button--icon.sc-calcite-button{margin-left:0;margin-right:.375rem}/*!\@.calcite-button--loader*/.calcite-button--loader.sc-calcite-button{display:-ms-flexbox;display:flex;position:absolute;top:0;left:0;right:0;bottom:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}/*!\@.calcite-button--loader calcite-loader*/.calcite-button--loader.sc-calcite-button calcite-loader.sc-calcite-button{margin:0}/*!\@:host([loading]) a,:host([loading]) button*/[loading].sc-calcite-button-h a.sc-calcite-button, [loading].sc-calcite-button-h button.sc-calcite-button{color:transparent!important;pointer-events:none}/*!\@:host([loading]) a .calcite-button--icon,:host([loading]) button .calcite-button--icon*/[loading].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [loading].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{opacity:0}/*!\@:host([appearance=solid][color=blue]) a,:host([appearance=solid][color=blue]) button*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-blue-solid-color);background-color:var(--calcite-button-blue);border:1px solid transparent}/*!\@:host([appearance=solid][color=blue]) a:focus,:host([appearance=solid][color=blue]) a:hover,:host([appearance=solid][color=blue]) button:focus,:host([appearance=solid][color=blue]) button:hover*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{background-color:var(--calcite-button-blue-hover)}/*!\@:host([appearance=solid][color=blue]) a:active,:host([appearance=solid][color=blue]) button:active*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button:active{background-color:var(--calcite-button-blue)}/*!\@:host([appearance=solid][color=blue]) a .calcite-button--icon,:host([appearance=solid][color=blue]) button .calcite-button--icon*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue-solid-color)}/*!\@:host([appearance=solid][color=blue]) a calcite-loader,:host([appearance=solid][color=blue]) button calcite-loader*/[appearance=solid][color=blue].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=solid][color=blue].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-blue-solid-color)}/*!\@:host([appearance=solid][color=red]) a,:host([appearance=solid][color=red]) button*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-red-solid-color);background-color:var(--calcite-button-red);border:1px solid transparent}/*!\@:host([appearance=solid][color=red]) a:focus,:host([appearance=solid][color=red]) a:hover,:host([appearance=solid][color=red]) button:focus,:host([appearance=solid][color=red]) button:hover*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button:hover{background-color:var(--calcite-button-red-hover)}/*!\@:host([appearance=solid][color=red]) a:active,:host([appearance=solid][color=red]) button:active*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button:active{background-color:var(--calcite-button-red)}/*!\@:host([appearance=solid][color=red]) a .calcite-button--icon,:host([appearance=solid][color=red]) button .calcite-button--icon*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red-solid-color)}/*!\@:host([appearance=solid][color=red]) a calcite-loader,:host([appearance=solid][color=red]) button calcite-loader*/[appearance=solid][color=red].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=solid][color=red].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-red-solid-color)}/*!\@:host([appearance=solid][color=light]) a,:host([appearance=solid][color=light]) button*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button{color:#000;background-color:#f3f3f3;border:1px solid transparent}/*!\@:host([appearance=solid][color=light]) a:focus,:host([appearance=solid][color=light]) a:hover,:host([appearance=solid][color=light]) button:focus,:host([appearance=solid][color=light]) button:hover*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button:hover{background-color:#fff}/*!\@:host([appearance=solid][color=light]) a:active,:host([appearance=solid][color=light]) button:active*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button:active{background-color:#f3f3f3}/*!\@:host([appearance=solid][color=light]) a .calcite-button--icon,:host([appearance=solid][color=light]) button .calcite-button--icon*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#000}/*!\@:host([appearance=solid][color=light]) a calcite-loader,:host([appearance=solid][color=light]) button calcite-loader*/[appearance=solid][color=light].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=solid][color=light].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:#000}/*!\@:host([appearance=solid][color=dark]) a,:host([appearance=solid][color=dark]) button*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button{color:#fff;background-color:var(--calcite-button-dark);border:1px solid transparent}/*!\@:host([appearance=solid][color=dark]) a:focus,:host([appearance=solid][color=dark]) a:hover,:host([appearance=solid][color=dark]) button:focus,:host([appearance=solid][color=dark]) button:hover*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button:focus, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{background-color:var(--calcite-button-dark-hover)}/*!\@:host([appearance=solid][color=dark]) a:active,:host([appearance=solid][color=dark]) button:active*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button:active{background-color:var(--calcite-button-dark)}/*!\@:host([appearance=solid][color=dark]) a .calcite-button--icon,:host([appearance=solid][color=dark]) button .calcite-button--icon*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#fff}/*!\@:host([appearance=solid][color=dark]) a calcite-loader,:host([appearance=solid][color=dark]) button calcite-loader*/[appearance=solid][color=dark].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=solid][color=dark].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:#fff}/*!\@:host([appearance=outline][color=blue]) a,:host([appearance=outline][color=blue]) button*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-blue);background-color:var(--calcite-button-outline-background);border:1px solid var(--calcite-button-blue);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=blue]) a:hover,:host([appearance=outline][color=blue]) button:hover*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid var(--calcite-button-blue);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-button-blue);box-shadow:inset 0 0 0 1px var(--calcite-button-blue)}/*!\@:host([appearance=outline][color=blue]) a:active,:host([appearance=outline][color=blue]) a:focus,:host([appearance=outline][color=blue]) button:active,:host([appearance=outline][color=blue]) button:focus*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-blue-pressed);border-color:var(--calcite-button-blue-pressed);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-button-blue-pressed);box-shadow:inset 0 0 0 2px var(--calcite-button-blue-pressed)}/*!\@:host([appearance=outline][color=blue]) a:active .calcite-button--icon,:host([appearance=outline][color=blue]) a:focus .calcite-button--icon,:host([appearance=outline][color=blue]) button:active .calcite-button--icon,:host([appearance=outline][color=blue]) button:focus .calcite-button--icon*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue-pressed)}/*!\@:host([appearance=outline][color=blue]) a .calcite-button--icon,:host([appearance=outline][color=blue]) button .calcite-button--icon*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue)}/*!\@:host([appearance=outline][color=blue]) a calcite-loader,:host([appearance=outline][color=blue]) button calcite-loader*/[appearance=outline][color=blue].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=outline][color=blue].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-blue)}/*!\@:host([appearance=outline][color=red]) a,:host([appearance=outline][color=red]) button*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-red);background-color:var(--calcite-button-outline-background);border:1px solid var(--calcite-button-red);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=red]) a:hover,:host([appearance=outline][color=red]) button:hover*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid var(--calcite-button-red);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-button-red);box-shadow:inset 0 0 0 1px var(--calcite-button-red)}/*!\@:host([appearance=outline][color=red]) a:active,:host([appearance=outline][color=red]) a:focus,:host([appearance=outline][color=red]) button:active,:host([appearance=outline][color=red]) button:focus*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-red-pressed);border-color:var(--calcite-button-red-pressed);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-button-red-pressed);box-shadow:inset 0 0 0 2px var(--calcite-button-red-pressed)}/*!\@:host([appearance=outline][color=red]) a:active .calcite-button--icon,:host([appearance=outline][color=red]) a:focus .calcite-button--icon,:host([appearance=outline][color=red]) button:active .calcite-button--icon,:host([appearance=outline][color=red]) button:focus .calcite-button--icon*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red-pressed)}/*!\@:host([appearance=outline][color=red]) a .calcite-button--icon,:host([appearance=outline][color=red]) button .calcite-button--icon*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red)}/*!\@:host([appearance=outline][color=red]) a calcite-loader,:host([appearance=outline][color=red]) button calcite-loader*/[appearance=outline][color=red].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=outline][color=red].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-red)}/*!\@:host([appearance=outline][color=light]) a,:host([appearance=outline][color=light]) button*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-outline-color);background-color:var(--calcite-button-outline-background);border:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=light]) a:hover,:host([appearance=outline][color=light]) button:hover*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px #f3f3f3;box-shadow:inset 0 0 0 1px #f3f3f3}/*!\@:host([appearance=outline][color=light]) a:active,:host([appearance=outline][color=light]) a:focus,:host([appearance=outline][color=light]) button:active,:host([appearance=outline][color=light]) button:focus*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-outline-pressed);border-color:#eaeaea;-webkit-box-shadow:inset 0 0 0 2px #eaeaea;box-shadow:inset 0 0 0 2px #eaeaea}/*!\@:host([appearance=outline][color=light]) a:active .calcite-button--icon,:host([appearance=outline][color=light]) a:focus .calcite-button--icon,:host([appearance=outline][color=light]) button:active .calcite-button--icon,:host([appearance=outline][color=light]) button:focus .calcite-button--icon*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-outline-pressed)}/*!\@:host([appearance=outline][color=light]) a .calcite-button--icon,:host([appearance=outline][color=light]) button .calcite-button--icon*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-outline-color)}/*!\@:host([appearance=outline][color=light]) a calcite-loader,:host([appearance=outline][color=light]) button calcite-loader*/[appearance=outline][color=light].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=outline][color=light].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-outline-color)}/*!\@:host([appearance=outline][color=dark]) a,:host([appearance=outline][color=dark]) button*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-outline-color);background-color:var(--calcite-button-outline-background);border:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=outline][color=dark]) a:hover,:host([appearance=outline][color=dark]) button:hover*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px #2b2b2b;box-shadow:inset 0 0 0 1px #2b2b2b}/*!\@:host([appearance=outline][color=dark]) a:active,:host([appearance=outline][color=dark]) a:focus,:host([appearance=outline][color=dark]) button:active,:host([appearance=outline][color=dark]) button:focus*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:active, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-outline-pressed);border-color:#000;-webkit-box-shadow:inset 0 0 0 2px #000;box-shadow:inset 0 0 0 2px #000}/*!\@:host([appearance=outline][color=dark]) a:active .calcite-button--icon,:host([appearance=outline][color=dark]) a:focus .calcite-button--icon,:host([appearance=outline][color=dark]) button:active .calcite-button--icon,:host([appearance=outline][color=dark]) button:focus .calcite-button--icon*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-outline-pressed)}/*!\@:host([appearance=outline][color=dark]) a .calcite-button--icon,:host([appearance=outline][color=dark]) button .calcite-button--icon*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-outline-color)}/*!\@:host([appearance=outline][color=dark]) a calcite-loader,:host([appearance=outline][color=dark]) button calcite-loader*/[appearance=outline][color=dark].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=outline][color=dark].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-outline-color)}/*!\@:host([appearance=clear][color=blue]) a,:host([appearance=clear][color=blue]) button*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-blue);background-color:transparent;border:1px solid var(--calcite-button-blue);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=blue]) a:hover,:host([appearance=clear][color=blue]) button:hover*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid var(--calcite-button-blue);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-button-blue);box-shadow:inset 0 0 0 1px var(--calcite-button-blue)}/*!\@:host([appearance=clear][color=blue]) a:active,:host([appearance=clear][color=blue]) a:focus,:host([appearance=clear][color=blue]) button:active,:host([appearance=clear][color=blue]) button:focus*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-blue-pressed);border-color:var(--calcite-button-blue-pressed);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-button-blue-pressed);box-shadow:inset 0 0 0 2px var(--calcite-button-blue-pressed)}/*!\@:host([appearance=clear][color=blue]) a:active .calcite-button--icon,:host([appearance=clear][color=blue]) a:focus .calcite-button--icon,:host([appearance=clear][color=blue]) button:active .calcite-button--icon,:host([appearance=clear][color=blue]) button:focus .calcite-button--icon*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue-pressed)}/*!\@:host([appearance=clear][color=blue]) a .calcite-button--icon,:host([appearance=clear][color=blue]) button .calcite-button--icon*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue)}/*!\@:host([appearance=clear][color=blue]) a calcite-loader,:host([appearance=clear][color=blue]) button calcite-loader*/[appearance=clear][color=blue].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=clear][color=blue].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-blue)}/*!\@:host([appearance=clear][color=red]) a,:host([appearance=clear][color=red]) button*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-red);background-color:transparent;border:1px solid var(--calcite-button-red);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=red]) a:hover,:host([appearance=clear][color=red]) button:hover*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid var(--calcite-button-red);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-button-red);box-shadow:inset 0 0 0 1px var(--calcite-button-red)}/*!\@:host([appearance=clear][color=red]) a:active,:host([appearance=clear][color=red]) a:focus,:host([appearance=clear][color=red]) button:active,:host([appearance=clear][color=red]) button:focus*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-red-pressed);border-color:var(--calcite-button-red-pressed);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-button-red-pressed);box-shadow:inset 0 0 0 2px var(--calcite-button-red-pressed)}/*!\@:host([appearance=clear][color=red]) a:active .calcite-button--icon,:host([appearance=clear][color=red]) a:focus .calcite-button--icon,:host([appearance=clear][color=red]) button:active .calcite-button--icon,:host([appearance=clear][color=red]) button:focus .calcite-button--icon*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red-pressed)}/*!\@:host([appearance=clear][color=red]) a .calcite-button--icon,:host([appearance=clear][color=red]) button .calcite-button--icon*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red)}/*!\@:host([appearance=clear][color=red]) a calcite-loader,:host([appearance=clear][color=red]) button calcite-loader*/[appearance=clear][color=red].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=clear][color=red].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-red)}/*!\@:host([appearance=clear][color=light]) a,:host([appearance=clear][color=light]) button*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button{color:#f8f8f8;background-color:transparent;border:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=light]) a:hover,:host([appearance=clear][color=light]) button:hover*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #f3f3f3;-webkit-box-shadow:inset 0 0 0 1px #f3f3f3;box-shadow:inset 0 0 0 1px #f3f3f3}/*!\@:host([appearance=clear][color=light]) a:active,:host([appearance=clear][color=light]) a:focus,:host([appearance=clear][color=light]) button:active,:host([appearance=clear][color=light]) button:focus*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:focus{color:#fff;border-color:#eaeaea;-webkit-box-shadow:inset 0 0 0 2px #eaeaea;box-shadow:inset 0 0 0 2px #eaeaea}/*!\@:host([appearance=clear][color=light]) a:active .calcite-button--icon,:host([appearance=clear][color=light]) a:focus .calcite-button--icon,:host([appearance=clear][color=light]) button:active .calcite-button--icon,:host([appearance=clear][color=light]) button:focus .calcite-button--icon*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:#fff}/*!\@:host([appearance=clear][color=light]) a .calcite-button--icon,:host([appearance=clear][color=light]) button .calcite-button--icon*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#f8f8f8}/*!\@:host([appearance=clear][color=light]) a calcite-loader,:host([appearance=clear][color=light]) button calcite-loader*/[appearance=clear][color=light].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=clear][color=light].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:#f8f8f8}/*!\@:host([appearance=clear][color=dark]) a,:host([appearance=clear][color=dark]) button*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button{color:#151515;background-color:transparent;border:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}/*!\@:host([appearance=clear][color=dark]) a:hover,:host([appearance=clear][color=dark]) button:hover*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{border-color:1px solid #2b2b2b;-webkit-box-shadow:inset 0 0 0 1px #2b2b2b;box-shadow:inset 0 0 0 1px #2b2b2b}/*!\@:host([appearance=clear][color=dark]) a:active,:host([appearance=clear][color=dark]) a:focus,:host([appearance=clear][color=dark]) button:active,:host([appearance=clear][color=dark]) button:focus*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:active, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:focus{color:#000;border-color:#000;-webkit-box-shadow:inset 0 0 0 2px #000;box-shadow:inset 0 0 0 2px #000}/*!\@:host([appearance=clear][color=dark]) a:active .calcite-button--icon,:host([appearance=clear][color=dark]) a:focus .calcite-button--icon,:host([appearance=clear][color=dark]) button:active .calcite-button--icon,:host([appearance=clear][color=dark]) button:focus .calcite-button--icon*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:#000}/*!\@:host([appearance=clear][color=dark]) a .calcite-button--icon,:host([appearance=clear][color=dark]) button .calcite-button--icon*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#151515}/*!\@:host([appearance=clear][color=dark]) a calcite-loader,:host([appearance=clear][color=dark]) button calcite-loader*/[appearance=clear][color=dark].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=clear][color=dark].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:#151515}/*!\@:host([appearance=transparent][color=blue]) a,:host([appearance=transparent][color=blue]) button*/[appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-blue);background-color:transparent;border:1px solid transparent}/*!\@:host([appearance=transparent][color=blue]) a:hover,:host([appearance=transparent][color=blue]) button:hover*/[appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button:hover{color:var(--calcite-button-blue-hover)}/*!\@:host([appearance=transparent][color=blue]) a:hover .calcite-button--icon,:host([appearance=transparent][color=blue]) button:hover .calcite-button--icon*/[appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue-hover)}/*!\@:host([appearance=transparent][color=blue]) a:active,:host([appearance=transparent][color=blue]) a:focus,:host([appearance=transparent][color=blue]) button:active,:host([appearance=transparent][color=blue]) button:focus*/[appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button:active, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-blue-pressed)}/*!\@:host([appearance=transparent][color=blue]) a:active .calcite-button--icon,:host([appearance=transparent][color=blue]) a:focus .calcite-button--icon,:host([appearance=transparent][color=blue]) button:active .calcite-button--icon,:host([appearance=transparent][color=blue]) button:focus .calcite-button--icon*/[appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue-pressed)}/*!\@:host([appearance=transparent][color=blue]) a .calcite-button--icon,:host([appearance=transparent][color=blue]) button .calcite-button--icon*/[appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue)}/*!\@:host([appearance=transparent][color=blue]) a calcite-loader,:host([appearance=transparent][color=blue]) button calcite-loader*/[appearance=transparent][color=blue].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=transparent][color=blue].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-blue)}/*!\@:host([appearance=transparent][color=red]) a,:host([appearance=transparent][color=red]) button*/[appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button{color:var(--calcite-button-red);background-color:transparent;border:1px solid transparent}/*!\@:host([appearance=transparent][color=red]) a:hover,:host([appearance=transparent][color=red]) button:hover*/[appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button:hover{color:var(--calcite-button-red-hover)}/*!\@:host([appearance=transparent][color=red]) a:hover .calcite-button--icon,:host([appearance=transparent][color=red]) button:hover .calcite-button--icon*/[appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red-hover)}/*!\@:host([appearance=transparent][color=red]) a:active,:host([appearance=transparent][color=red]) a:focus,:host([appearance=transparent][color=red]) button:active,:host([appearance=transparent][color=red]) button:focus*/[appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button:active, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button:focus{color:var(--calcite-button-red-pressed)}/*!\@:host([appearance=transparent][color=red]) a:active .calcite-button--icon,:host([appearance=transparent][color=red]) a:focus .calcite-button--icon,:host([appearance=transparent][color=red]) button:active .calcite-button--icon,:host([appearance=transparent][color=red]) button:focus .calcite-button--icon*/[appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red-pressed)}/*!\@:host([appearance=transparent][color=red]) a .calcite-button--icon,:host([appearance=transparent][color=red]) button .calcite-button--icon*/[appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red)}/*!\@:host([appearance=transparent][color=red]) a calcite-loader,:host([appearance=transparent][color=red]) button calcite-loader*/[appearance=transparent][color=red].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=transparent][color=red].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-red)}/*!\@:host([appearance=transparent][color=light]) a,:host([appearance=transparent][color=light]) button*/[appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button{color:#f3f3f3;background-color:transparent;border:1px solid transparent}/*!\@:host([appearance=transparent][color=light]) a:hover,:host([appearance=transparent][color=light]) button:hover*/[appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button:hover{color:#fff}/*!\@:host([appearance=transparent][color=light]) a:hover .calcite-button--icon,:host([appearance=transparent][color=light]) button:hover .calcite-button--icon*/[appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:#fff}/*!\@:host([appearance=transparent][color=light]) a:active,:host([appearance=transparent][color=light]) a:focus,:host([appearance=transparent][color=light]) button:active,:host([appearance=transparent][color=light]) button:focus*/[appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button:active, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button:focus{color:#eaeaea}/*!\@:host([appearance=transparent][color=light]) a:active .calcite-button--icon,:host([appearance=transparent][color=light]) a:focus .calcite-button--icon,:host([appearance=transparent][color=light]) button:active .calcite-button--icon,:host([appearance=transparent][color=light]) button:focus .calcite-button--icon*/[appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:#eaeaea}/*!\@:host([appearance=transparent][color=light]) a .calcite-button--icon,:host([appearance=transparent][color=light]) button .calcite-button--icon*/[appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#f3f3f3}/*!\@:host([appearance=transparent][color=light]) a calcite-loader,:host([appearance=transparent][color=light]) button calcite-loader*/[appearance=transparent][color=light].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=transparent][color=light].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:#f3f3f3}/*!\@:host([appearance=transparent][color=dark]) a,:host([appearance=transparent][color=dark]) button*/[appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button{color:#2b2b2b;background-color:transparent;border:1px solid transparent}/*!\@:host([appearance=transparent][color=dark]) a:hover,:host([appearance=transparent][color=dark]) button:hover*/[appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button:hover{color:#404040}/*!\@:host([appearance=transparent][color=dark]) a:hover .calcite-button--icon,:host([appearance=transparent][color=dark]) button:hover .calcite-button--icon*/[appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:#404040}/*!\@:host([appearance=transparent][color=dark]) a:active,:host([appearance=transparent][color=dark]) a:focus,:host([appearance=transparent][color=dark]) button:active,:host([appearance=transparent][color=dark]) button:focus*/[appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button:active, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button:focus{color:#151515}/*!\@:host([appearance=transparent][color=dark]) a:active .calcite-button--icon,:host([appearance=transparent][color=dark]) a:focus .calcite-button--icon,:host([appearance=transparent][color=dark]) button:active .calcite-button--icon,:host([appearance=transparent][color=dark]) button:focus .calcite-button--icon*/[appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button:active .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button{fill:#151515}/*!\@:host([appearance=transparent][color=dark]) a .calcite-button--icon,:host([appearance=transparent][color=dark]) button .calcite-button--icon*/[appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#2b2b2b}/*!\@:host([appearance=transparent][color=dark]) a calcite-loader,:host([appearance=transparent][color=dark]) button calcite-loader*/[appearance=transparent][color=dark].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=transparent][color=dark].sc-calcite-button-h button.sc-calcite-button calcite-loader.sc-calcite-button{color:#2b2b2b}/*!\@:host([appearance=inline][color=blue]) a,:host([appearance=inline][color=blue]) span*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:var(--calcite-button-blue);font-weight:500;font-size:inherit;white-space:normal;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(var(--calcite-button-blue-inline-underline)),to(var(--calcite-button-blue-inline-underline)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(var(--calcite-button-blue-inline-underline),var(--calcite-button-blue-inline-underline));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 1px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=blue]) a:focus,:host([appearance=inline][color=blue]) a:hover,:host([appearance=inline][color=blue]) span:focus,:host([appearance=inline][color=blue]) span:hover*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button:focus, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button:hover{color:var(--calcite-button-blue-hover);background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=blue]) a:focus .calcite-button--icon,:host([appearance=inline][color=blue]) a:hover .calcite-button--icon,:host([appearance=inline][color=blue]) span:focus .calcite-button--icon,:host([appearance=inline][color=blue]) span:hover .calcite-button--icon*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue-hover)}/*!\@:host([appearance=inline][color=blue]) a:active,:host([appearance=inline][color=blue]) span:active*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button:active{color:var(--calcite-button-blue);background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=blue]) a .calcite-button--icon,:host([appearance=inline][color=blue]) span .calcite-button--icon*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-blue)}/*!\@:host([appearance=inline][color=blue]) a calcite-loader,:host([appearance=inline][color=blue]) span calcite-loader*/[appearance=inline][color=blue].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=inline][color=blue].sc-calcite-button-h span.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-blue)}/*!\@:host([appearance=inline][color=red]) a,:host([appearance=inline][color=red]) span*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:var(--calcite-button-red);font-weight:500;font-size:inherit;white-space:normal;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(var(--calcite-button-red-inline-underline)),to(var(--calcite-button-red-inline-underline)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(var(--calcite-button-red-inline-underline),var(--calcite-button-red-inline-underline));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 1px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=red]) a:focus,:host([appearance=inline][color=red]) a:hover,:host([appearance=inline][color=red]) span:focus,:host([appearance=inline][color=red]) span:hover*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button:focus, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button:hover{color:var(--calcite-button-red-hover);background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=red]) a:focus .calcite-button--icon,:host([appearance=inline][color=red]) a:hover .calcite-button--icon,:host([appearance=inline][color=red]) span:focus .calcite-button--icon,:host([appearance=inline][color=red]) span:hover .calcite-button--icon*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red-hover)}/*!\@:host([appearance=inline][color=red]) a:active,:host([appearance=inline][color=red]) span:active*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button:active{color:var(--calcite-button-red);background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=red]) a .calcite-button--icon,:host([appearance=inline][color=red]) span .calcite-button--icon*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:var(--calcite-button-red)}/*!\@:host([appearance=inline][color=red]) a calcite-loader,:host([appearance=inline][color=red]) span calcite-loader*/[appearance=inline][color=red].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=inline][color=red].sc-calcite-button-h span.sc-calcite-button calcite-loader.sc-calcite-button{color:var(--calcite-button-red)}/*!\@:host([appearance=inline][color=light]) a,:host([appearance=inline][color=light]) span*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:#f3f3f3;font-weight:500;font-size:inherit;white-space:normal;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,.2)),to(hsla(0,0%,100%,.2)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(hsla(0,0%,100%,.2),hsla(0,0%,100%,.2));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 1px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=light]) a:focus,:host([appearance=inline][color=light]) a:hover,:host([appearance=inline][color=light]) span:focus,:host([appearance=inline][color=light]) span:hover*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button:focus, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button:hover{color:#fff;background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=light]) a:focus .calcite-button--icon,:host([appearance=inline][color=light]) a:hover .calcite-button--icon,:host([appearance=inline][color=light]) span:focus .calcite-button--icon,:host([appearance=inline][color=light]) span:hover .calcite-button--icon*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:#fff}/*!\@:host([appearance=inline][color=light]) a:active,:host([appearance=inline][color=light]) span:active*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button:active{color:#f3f3f3;background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=light]) a .calcite-button--icon,:host([appearance=inline][color=light]) span .calcite-button--icon*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#f3f3f3}/*!\@:host([appearance=inline][color=light]) a calcite-loader,:host([appearance=inline][color=light]) span calcite-loader*/[appearance=inline][color=light].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=inline][color=light].sc-calcite-button-h span.sc-calcite-button calcite-loader.sc-calcite-button{color:#f3f3f3}/*!\@:host([appearance=inline][color=dark]) a,:host([appearance=inline][color=dark]) span*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button{display:inline;padding:0;outline:none;border:none;color:#2b2b2b;font-weight:500;font-size:inherit;white-space:normal;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear,left top,left bottom,from(currentColor),to(currentColor)),-webkit-gradient(linear,left top,left bottom,from(rgba(64,64,64,.2)),to(rgba(64,64,64,.2)));background-image:linear-gradient(currentColor,currentColor),linear-gradient(rgba(64,64,64,.2),rgba(64,64,64,.2));background-position:0 100%,100% 100%;background-repeat:no-repeat,no-repeat;background-size:0 1px,100% 1px;-webkit-transition:all .15s ease-in-out,background-size .3s ease-in-out;transition:all .15s ease-in-out,background-size .3s ease-in-out}/*!\@:host([appearance=inline][color=dark]) a:focus,:host([appearance=inline][color=dark]) a:hover,:host([appearance=inline][color=dark]) span:focus,:host([appearance=inline][color=dark]) span:hover*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:focus, [appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:hover, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button:focus, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button:hover{color:#404040;background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=dark]) a:focus .calcite-button--icon,:host([appearance=inline][color=dark]) a:hover .calcite-button--icon,:host([appearance=inline][color=dark]) span:focus .calcite-button--icon,:host([appearance=inline][color=dark]) span:hover .calcite-button--icon*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button:focus .calcite-button--icon.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button:hover .calcite-button--icon.sc-calcite-button{fill:#404040}/*!\@:host([appearance=inline][color=dark]) a:active,:host([appearance=inline][color=dark]) span:active*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button:active, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button:active{color:#2b2b2b;background-size:100% 1px,100% 1px}/*!\@:host([appearance=inline][color=dark]) a .calcite-button--icon,:host([appearance=inline][color=dark]) span .calcite-button--icon*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button .calcite-button--icon.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button .calcite-button--icon.sc-calcite-button{fill:#2b2b2b}/*!\@:host([appearance=inline][color=dark]) a calcite-loader,:host([appearance=inline][color=dark]) span calcite-loader*/[appearance=inline][color=dark].sc-calcite-button-h a.sc-calcite-button calcite-loader.sc-calcite-button, [appearance=inline][color=dark].sc-calcite-button-h span.sc-calcite-button calcite-loader.sc-calcite-button{color:#2b2b2b}/*!\@:host([appearance=inline][dir=rtl]) a,:host([appearance=inline][dir=rtl]) span*/[appearance=inline][dir=rtl].sc-calcite-button-h a.sc-calcite-button, [appearance=inline][dir=rtl].sc-calcite-button-h span.sc-calcite-button{background-position:100% 100%,100% 100%}/*!\@:host([scale=xs]:not([appearance=inline])) a,:host([scale=xs]:not([appearance=inline])) button*/[scale=xs].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xs].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem/ 6) calc(1.5rem* .3);font-size:.8125rem;line-height:1.5}/*!\@:host([scale=s]:not([appearance=inline])) a,:host([scale=s]:not([appearance=inline])) button*/[scale=s].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=s].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem/ 4) calc(1.5rem* .5);font-size:.875rem;line-height:1.5}/*!\@:host([scale=m]:not([appearance=inline])) a,:host([scale=m]:not([appearance=inline])) button*/[scale=m].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=m].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem/ 3) calc(1.5rem* .75);font-size:.9375rem;line-height:1.5}/*!\@:host([scale=l]:not([appearance=inline])) a,:host([scale=l]:not([appearance=inline])) button*/[scale=l].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=l].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem / 2) calc(1.5rem* 1);font-size:1.2019rem;line-height:1.5}\@media screen and (max-width:859px){/*!\@:host([scale=l]:not([appearance=inline])) a,:host([scale=l]:not([appearance=inline])) button*/[scale=l].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=l].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.1305rem}}\@media screen and (max-width:479px){/*!\@:host([scale=l]:not([appearance=inline])) a,:host([scale=l]:not([appearance=inline])) button*/[scale=l].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=l].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.0625rem}}/*!\@:host([scale=xl]:not([appearance=inline])) a,:host([scale=xl]:not([appearance=inline])) button*/[scale=xl].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xl].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{padding:calc(1.5rem / 1.5) calc(1.5rem* 1.25);font-size:1.414rem;line-height:1.5}\@media screen and (max-width:859px){/*!\@:host([scale=xl]:not([appearance=inline])) a,:host([scale=xl]:not([appearance=inline])) button*/[scale=xl].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xl].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.33rem}}\@media screen and (max-width:479px){/*!\@:host([scale=xl]:not([appearance=inline])) a,:host([scale=xl]:not([appearance=inline])) button*/[scale=xl].sc-calcite-button-h:not([appearance=inline]) a.sc-calcite-button, [scale=xl].sc-calcite-button-h:not([appearance=inline]) button.sc-calcite-button{font-size:1.25rem}}');
styles.set('sc-calcite-checkbox','/*!\@:root*/.sc-calcite-checkbox:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-checkbox-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-checkbox-h{display:none}/*!\@body*/body.sc-calcite-checkbox{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-checkbox{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-checkbox{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-checkbox{display:block}/*!\@a*/a.sc-calcite-checkbox{color:#007ac2}/*!\@::slotted(input)*/.sc-calcite-checkbox-s > input{display:none}/*!\@:host*/.sc-calcite-checkbox-h{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}/*!\@.check-svg,:host*/.check-svg.sc-calcite-checkbox, .sc-calcite-checkbox-h{display:inline-block}/*!\@.check-svg*/.check-svg.sc-calcite-checkbox{width:20px;height:20px;overflow:hidden;background-color:#fff;border:1px solid #757575;border-radius:2px;vertical-align:-.25em;margin-right:.25em;pointer-events:none;-webkit-transition:all .15s linear;transition:all .15s linear;-webkit-box-sizing:border-box;box-sizing:border-box}/*!\@:host([theme=dark]) .check-svg*/[theme=dark].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:transparent;border-color:#eaeaea}/*!\@:host([theme=dark][disabled]) .check-svg*/[theme=dark][disabled].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{border-color:#757575;background-color:#2b2b2b}/*!\@:host([theme=dark][checked]) .check-svg,:host([theme=dark][indeterminate]) .check-svg*/[theme=dark][checked].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox, [theme=dark][indeterminate].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#3db8ff}/*!\@:host([size=large]) .check-svg*/[size=large].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{width:24px;height:24px;border-radius:4px}/*!\@:host([size=small]) .check-svg*/[size=small].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{width:16px;height:16px}/*!\@:host([disabled])*/[disabled].sc-calcite-checkbox-h{pointer-events:none;cursor:default}/*!\@:host([disabled]) .check-svg*/[disabled].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#f3f3f3;border-color:#eaeaea}/*!\@:host([disabled][checked]) .check-svg,:host([disabled][indeterminate]) .check-svg*/[disabled][checked].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox, [disabled][indeterminate].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#84c1e8;border-color:#84c1e8}/*!\@:host([checked]) .check-svg,:host([indeterminate]) .check-svg*/[checked].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox, [indeterminate].sc-calcite-checkbox-h .check-svg.sc-calcite-checkbox{background-color:#007ac2;border:1px solid #007ac2}/*!\@:host(:focus),:host(:hover)*/.sc-calcite-checkbox-h:focus, .sc-calcite-checkbox-h:hover{outline:none}/*!\@:host(:focus) .check-svg,:host(:hover) .check-svg*/.sc-calcite-checkbox-h:focus .check-svg.sc-calcite-checkbox, .sc-calcite-checkbox-h:hover .check-svg.sc-calcite-checkbox{border-color:#0079c1!important;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.075),0 0 5px rgba(81,167,232,.5),0 0 5px rgba(81,167,232,.5);box-shadow:inset 0 1px 2px rgba(0,0,0,.075),0 0 5px rgba(81,167,232,.5),0 0 5px rgba(81,167,232,.5)}');
styles.set('sc-calcite-date-day','/*!\@:root*/.sc-calcite-date-day:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-date-day-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-date-day-h{display:none}/*!\@body*/body.sc-calcite-date-day{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-date-day{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-date-day{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-date-day{display:block}/*!\@a*/a.sc-calcite-date-day{color:#007ac2}/*!\@:host*/.sc-calcite-date-day-h{outline:none;color:#6a6a6a;padding:.3rem .4rem;cursor:pointer;width:calc(100% / 7)}/*!\@:host,:host .day*/.sc-calcite-date-day-h, .sc-calcite-date-day-h .day.sc-calcite-date-day{display:-ms-flexbox;display:flex}/*!\@:host .day*/.sc-calcite-date-day-h .day.sc-calcite-date-day{width:100%;border-radius:100%;font-size:14px;font-weight:500;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:2rem;width:2rem}/*!\@:host(.active) .day,:host(:focus) .day,:host(:hover) .day*/.active.sc-calcite-date-day-h .day.sc-calcite-date-day, .sc-calcite-date-day-h:focus .day.sc-calcite-date-day, .sc-calcite-date-day-h:hover .day.sc-calcite-date-day{background-color:#eaeaea;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;color:#151515}/*!\@:host(.selected-day) .day,:host(:focus.active) .day*/.selected-day.sc-calcite-date-day-h .day.sc-calcite-date-day, .sc-calcite-date-day-h:focus.active .day.sc-calcite-date-day{-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:#007ac2;border-radius:100%;color:#fff;font-weight:500}/*!\@:host(.disabled)*/.disabled.sc-calcite-date-day-h{cursor:default}/*!\@:host(.active) .disabled .day,:host(.disabled) .day,:host(:hover) .disabled .day*/.active.sc-calcite-date-day-h .disabled.sc-calcite-date-day .day.sc-calcite-date-day, .disabled.sc-calcite-date-day-h .day.sc-calcite-date-day, .sc-calcite-date-day-h:hover .disabled.sc-calcite-date-day .day.sc-calcite-date-day{color:#bfbfbf;background:none}');
styles.set('sc-calcite-date-month-header','/*!\@:root*/.sc-calcite-date-month-header:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-date-month-header-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-date-month-header-h{display:none}/*!\@body*/body.sc-calcite-date-month-header{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-date-month-header{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-date-month-header{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-date-month-header{display:block}/*!\@a*/a.sc-calcite-date-month-header{color:#007ac2}/*!\@.month-year*/.month-year.sc-calcite-date-month-header{display:-ms-flexbox;display:flex}/*!\@input*/input.sc-calcite-date-month-header{font-family:inherit;text-align:center}/*!\@.left-icon,.right-icon*/.left-icon.sc-calcite-date-month-header, .right-icon.sc-calcite-date-month-header{fill:#bfbfbf;-ms-flex-positive:1;flex-grow:1;outline:none;padding:0;border:none;color:inherit;background-color:transparent;cursor:pointer;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@.left-icon:focus,.left-icon:hover,.right-icon:focus,.right-icon:hover*/.left-icon.sc-calcite-date-month-header:focus, .left-icon.sc-calcite-date-month-header:hover, .right-icon.sc-calcite-date-month-header:focus, .right-icon.sc-calcite-date-month-header:hover{fill:#000;background-color:#f3f3f3}/*!\@.left-icon:active,.right-icon:active*/.left-icon.sc-calcite-date-month-header:active, .right-icon.sc-calcite-date-month-header:active{background-color:#eaeaea}/*!\@.month-year-text*/.month-year-text.sc-calcite-date-month-header{padding:.5rem;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-positive:1;flex-grow:1;width:50%;-ms-flex-pack:center;justify-content:center}/*!\@.month,.year*/.month.sc-calcite-date-month-header, .year.sc-calcite-date-month-header{color:#000;font-size:1rem;line-height:1.5;font-weight:500}/*!\@.year*/.year.sc-calcite-date-month-header{border:none;width:60px;padding:0;margin:0}');
styles.set('sc-calcite-date-month','/*!\@:root*/.sc-calcite-date-month:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-date-month-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-date-month-h{display:none}/*!\@body*/body.sc-calcite-date-month{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-date-month{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-date-month{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-date-month{display:block}/*!\@a*/a.sc-calcite-date-month{color:#007ac2}/*!\@.calender .week-headers*/.calender.sc-calcite-date-month .week-headers.sc-calcite-date-month{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;border-bottom:1px solid #f3f3f3;border-top:1px solid #f3f3f3}/*!\@.calender .week-headers .week-header*/.calender.sc-calcite-date-month .week-headers.sc-calcite-date-month .week-header.sc-calcite-date-month{color:#555;padding:.75rem 0;text-transform:uppercase;font-weight:600;font-size:11px;width:calc(100% / 7);text-align:center}/*!\@.calender .week-days*/.calender.sc-calcite-date-month .week-days.sc-calcite-date-month{outline:none;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}');
styles.set('sc-calcite-date-picker','/*!\@:root*/.sc-calcite-date-picker:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-date-picker-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-date-picker-h{display:none}/*!\@body*/body.sc-calcite-date-picker{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-date-picker{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-date-picker{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-date-picker{display:block}/*!\@a*/a.sc-calcite-date-picker{color:#007ac2}/*!\@::slotted(input)*/.sc-calcite-date-picker-s > input{display:none}/*!\@:host*/.sc-calcite-date-picker-h{display:inline-block;vertical-align:top}/*!\@:host .date-input-wrapper*/.sc-calcite-date-picker-h .date-input-wrapper.sc-calcite-date-picker{border:1px solid #dfdfdf;position:relative}/*!\@:host .date-input-wrapper.expanded*/.sc-calcite-date-picker-h .date-input-wrapper.expanded.sc-calcite-date-picker{border:none;border-bottom:1px solid #dfdfdf}/*!\@:host .date-input-wrapper.open,:host .date-input-wrapper:active,:host .date-input-wrapper:focus*/.sc-calcite-date-picker-h .date-input-wrapper.open.sc-calcite-date-picker, .sc-calcite-date-picker-h .date-input-wrapper.sc-calcite-date-picker:active, .sc-calcite-date-picker-h .date-input-wrapper.sc-calcite-date-picker:focus{border-color:transparent;border-bottom:1px solid #dfdfdf}/*!\@:host .date-input-wrapper .calendar-icon*/.sc-calcite-date-picker-h .date-input-wrapper.sc-calcite-date-picker .calendar-icon.sc-calcite-date-picker{fill:grey;position:absolute;top:.8333333333rem;left:1.3043478261rem}/*!\@:host .date-input-wrapper .date-input*/.sc-calcite-date-picker-h .date-input-wrapper.sc-calcite-date-picker .date-input.sc-calcite-date-picker{color:#555;-webkit-box-sizing:border-box;box-sizing:border-box;border:none;font-weight:400;font-size:16px;font-family:inherit;padding:.75rem;width:100%;margin:0;padding-left:3rem}/*!\@:host .date-input-wrapper .date-input:active,:host .date-input-wrapper .date-input:focus*/.sc-calcite-date-picker-h .date-input-wrapper.sc-calcite-date-picker .date-input.sc-calcite-date-picker:active, .sc-calcite-date-picker-h .date-input-wrapper.sc-calcite-date-picker .date-input.sc-calcite-date-picker:focus{outline:none}/*!\@:host([expanded])*/[expanded].sc-calcite-date-picker-h{background-color:#fff;border:1px solid #dfdfdf;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15)}');
styles.set('sc-calcite-dropdown','/*!\@:root*/.sc-calcite-dropdown:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-dropdown-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-dropdown-h{display:none}/*!\@body*/body.sc-calcite-dropdown{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-dropdown{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-dropdown{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-dropdown{display:block}/*!\@a*/a.sc-calcite-dropdown{color:#007ac2}/*!\@:host*/.sc-calcite-dropdown-h{--calcite-dropdown-background-color:#fff;--calcite-dropdown-border-color:#eaeaea}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-dropdown-h{--calcite-dropdown-background-color:#2b2b2b;--calcite-dropdown-border-color:#404040}/*!\@:host*/.sc-calcite-dropdown-h{position:relative;display:inline-block}/*!\@:host([active]) .calcite-dropdown-wrapper*/[active].sc-calcite-dropdown-h .calcite-dropdown-wrapper.sc-calcite-dropdown{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1;visibility:visible}/*!\@:host .calcite-dropdown-wrapper*/.sc-calcite-dropdown-h .calcite-dropdown-wrapper.sc-calcite-dropdown{-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;visibility:hidden;opacity:0;display:block;position:absolute;left:0;z-index:200;overflow:auto;width:auto;width:12.5rem;background:var(--calcite-dropdown-background-color);border:1px solid var(--calcite-dropdown-border-color);border-radius:2px;-webkit-box-shadow:0 0 12px 0 rgba(0,0,0,.15);box-shadow:0 0 12px 0 rgba(0,0,0,.15)}/*!\@:host([alignment=right]) .calcite-dropdown-wrapper,:host([dir=rtl]) .calcite-dropdown-wrapper*/[alignment=right].sc-calcite-dropdown-h .calcite-dropdown-wrapper.sc-calcite-dropdown, [dir=rtl].sc-calcite-dropdown-h .calcite-dropdown-wrapper.sc-calcite-dropdown{right:0;left:unset}/*!\@:host([dir=rtl][alignment=right]) .calcite-dropdown-wrapper*/[dir=rtl][alignment=right].sc-calcite-dropdown-h .calcite-dropdown-wrapper.sc-calcite-dropdown{right:unset;left:0}/*!\@:host([alignment=center]) .calcite-dropdown-wrapper*/[alignment=center].sc-calcite-dropdown-h .calcite-dropdown-wrapper.sc-calcite-dropdown{right:0;left:0;margin-right:auto;margin-left:auto}');
styles.set('sc-calcite-dropdown-group','/*!\@:root*/.sc-calcite-dropdown-group:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-dropdown-group-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-dropdown-group-h{display:none}/*!\@body*/body.sc-calcite-dropdown-group{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-dropdown-group{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-dropdown-group{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-dropdown-group{display:block}/*!\@a*/a.sc-calcite-dropdown-group{color:#007ac2}/*!\@:host*/.sc-calcite-dropdown-group-h{--calcite-dropdown-group-color:#4a4a4a;--calcite-dropdown-group-border-color:#eaeaea}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-dropdown-group-h{--calcite-dropdown-group-color:#bfbfbf;--calcite-dropdown-group-border-color:#404040}/*!\@:host([scale=s])*/[scale=s].sc-calcite-dropdown-group-h{--calcite-dropdown-group-padding:0.5rem 0}/*!\@:host([scale=m])*/[scale=m].sc-calcite-dropdown-group-h{--calcite-dropdown-group-padding:0.75rem 0}/*!\@:host([scale=l])*/[scale=l].sc-calcite-dropdown-group-h{--calcite-dropdown-group-padding:1rem 0}/*!\@:host .dropdown-title*/.sc-calcite-dropdown-group-h .dropdown-title.sc-calcite-dropdown-group{display:block;margin:0 1rem -1px 1rem;padding:var(--calcite-dropdown-group-padding);border-bottom:1px solid var(--calcite-dropdown-group-border-color);color:var(--calcite-dropdown-group-color);font-weight:600;word-wrap:break-word;cursor:default;font-size:.875rem;line-height:1.5}');
styles.set('sc-calcite-dropdown-item','\@charset \"UTF-8\";/*!\@:root*/.sc-calcite-dropdown-item:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-dropdown-item-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-dropdown-item-h{display:none}/*!\@body*/body.sc-calcite-dropdown-item{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-dropdown-item{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-dropdown-item{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-dropdown-item{display:block}/*!\@a*/a.sc-calcite-dropdown-item{color:#007ac2}/*!\@:host*/.sc-calcite-dropdown-item-h{--calcite-dropdown-item-color:#4a4a4a;--calcite-dropdown-item-color-hover:#151515;--calcite-dropdown-item-color-active:#151515;--calcite-dropdown-item-background-color-hover:#f3f3f3;--calcite-dropdown-item-background-color-pressed:#eaeaea;--calcite-dropdown-item-dot-active-color:#007ac2}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-dropdown-item-h{--calcite-dropdown-item-color:#4a4a4a;--calcite-dropdown-item-color-hover:#fff;--calcite-dropdown-item-color-active:#fff;--calcite-dropdown-item-background-color-hover:#353535;--calcite-dropdown-item-background-color-pressed:#404040;--calcite-dropdown-item-dot-active-color:#00a0ff}/*!\@:host([scale=s])*/[scale=s].sc-calcite-dropdown-item-h{--calcite-dropdown-item-padding:0.3rem 1rem 0.3rem 2.25rem}/*!\@:host([scale=m])*/[scale=m].sc-calcite-dropdown-item-h{--calcite-dropdown-item-padding:0.5rem 1rem 0.5rem 2.25rem}/*!\@:host([scale=l])*/[scale=l].sc-calcite-dropdown-item-h{--calcite-dropdown-item-padding:0.75rem 1rem 0.75rem 2.25rem}/*!\@:host([dir=rtl][scale=s])*/[dir=rtl][scale=s].sc-calcite-dropdown-item-h{--calcite-dropdown-item-padding:0.3rem 2.25rem 0.3rem 1rem}/*!\@:host([dir=rtl][scale=m])*/[dir=rtl][scale=m].sc-calcite-dropdown-item-h{--calcite-dropdown-item-padding:0.5rem 2.25rem 0.5rem 1rem}/*!\@:host([dir=rtl][scale=l])*/[dir=rtl][scale=l].sc-calcite-dropdown-item-h{--calcite-dropdown-item-padding:0.75rem 2.25rem 0.75rem 1rem}/*!\@:host*/.sc-calcite-dropdown-item-h{display:block;font-size:.875rem;line-height:1.5;color:var(--calcite-dropdown-item-color);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;padding:var(--calcite-dropdown-item-padding);cursor:pointer;text-decoration:none;outline:none;position:relative}/*!\@:host(:active),:host(:focus),:host(:hover)*/.sc-calcite-dropdown-item-h:active, .sc-calcite-dropdown-item-h:focus, .sc-calcite-dropdown-item-h:hover{background-color:var(--calcite-dropdown-item-background-color-hover);color:var(--calcite-dropdown-item-color-hover);text-decoration:none}/*!\@:host(:active)*/.sc-calcite-dropdown-item-h:active{background-color:var(--calcite-dropdown-item-background-color-pressed)}/*!\@:host:before*/.sc-calcite-dropdown-item-h:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:grey;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}/*!\@:host(:active):before,:host(:focus):before,:host(:hover):before*/.sc-calcite-dropdown-item-h:active:before, .sc-calcite-dropdown-item-h:focus:before, .sc-calcite-dropdown-item-h:hover:before{opacity:1}/*!\@:host([dir=rtl]):before*/[dir=rtl].sc-calcite-dropdown-item-h:before{left:unset;right:1rem}/*!\@:host([active])*/[active].sc-calcite-dropdown-item-h{color:var(--calcite-dropdown-item-color-active);font-weight:500}/*!\@:host([active]):before*/[active].sc-calcite-dropdown-item-h:before{opacity:1;color:var(--calcite-dropdown-item-dot-active-color)}/*!\@:host([islink])*/[islink].sc-calcite-dropdown-item-h{padding:0}/*!\@:host([islink]):before*/[islink].sc-calcite-dropdown-item-h:before{display:none}/*!\@:host([islink]) a*/[islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item{display:block;position:relative;padding:var(--calcite-dropdown-item-padding);color:var(--calcite-dropdown-item-color);text-decoration:none;outline:none}/*!\@:host([islink]) a:before*/[islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:grey;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}/*!\@:host([islink]) a:active,:host([islink]) a:focus,:host([islink]) a:hover*/[islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:active, [islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:focus, [islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:hover{background-color:var(--calcite-dropdown-item-background-color-hover);text-decoration:none}/*!\@:host([islink]) a:active:before,:host([islink]) a:focus:before,:host([islink]) a:hover:before*/[islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:active:before, [islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:focus:before, [islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:hover:before{opacity:1}/*!\@:host([islink]) a:active*/[islink].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:active{background-color:var(--calcite-dropdown-item-background-color-pressed)}/*!\@:host([islink][active]) a*/[islink][active].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item{color:var(--calcite-dropdown-item-color-active);font-weight:500}/*!\@:host([islink][active]) a:before*/[islink][active].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:before{opacity:1;color:var(--calcite-dropdown-item-dot-active-color)}/*!\@:host([islink][dir=rtl]) a*/[islink][dir=rtl].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item{padding:var(--calcite-dropdown-item-padding)}/*!\@:host([islink][dir=rtl]) a:before*/[islink][dir=rtl].sc-calcite-dropdown-item-h a.sc-calcite-dropdown-item:before{left:unset;right:1rem}');
styles.set('sc-calcite-example','/*!\@:root*/.sc-calcite-example:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-example-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-example-h{display:none}/*!\@body*/body.sc-calcite-example{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-example{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-example{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-example{display:block}/*!\@a*/a.sc-calcite-example{color:#007ac2}');
styles.set('sc-calcite-loader','/*!\@:root*/.sc-calcite-loader:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-loader-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-loader-h{display:none}/*!\@body*/body.sc-calcite-loader{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-loader{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-loader{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-loader{display:block}/*!\@a*/a.sc-calcite-loader{color:#007ac2}/*!\@:host*/.sc-calcite-loader-h{--calcite-loader-spot:#007ac2;--calcite-loader-spot-light:#009af2;--calcite-loader-spot-dark:#00619b;--calcite-loader-neutral:#eaeaea}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-loader-h{--calcite-loader-neutral:#151515}/*!\@:host*/.sc-calcite-loader-h{position:relative;display:none;padding-bottom:4rem;padding-top:4rem;margin-left:auto;margin-right:auto;min-height:54px;stroke:var(--calcite-loader-light);stroke-width:6px;stroke-dashoffset:0;fill:none;animation:loader-color-shift 2s linear infinite alternate-reverse}/*!\@:host([is-active])*/[is-active].sc-calcite-loader-h{display:block}/*!\@.loader__text*/.loader__text.sc-calcite-loader{margin-top:4rem;line-height:1.5}/*!\@.loader__percentage,.loader__text*/.loader__percentage.sc-calcite-loader, .loader__text.sc-calcite-loader{display:block;text-align:center;font-size:.875rem}/*!\@.loader__percentage*/.loader__percentage.sc-calcite-loader{left:50%;margin-top:27px;line-height:.25}/*!\@.loader__percentage,.loader__square*/.loader__percentage.sc-calcite-loader, .loader__square.sc-calcite-loader{width:54px;position:absolute;top:4rem;margin-left:-27px}/*!\@.loader__square*/.loader__square.sc-calcite-loader{height:54px;left:0;left:50%;stroke-dasharray:50% 350%;-webkit-animation:loader-clockwise 2s linear infinite;animation:loader-clockwise 2s linear infinite}/*!\@.loader__square--2*/.loader__square--2.sc-calcite-loader{stroke-dasharray:100% 225% 50% 25%;-webkit-animation:loader-clockwise 1s linear infinite;animation:loader-clockwise 1s linear infinite}/*!\@.loader__square--3*/.loader__square--3.sc-calcite-loader{stroke-dasharray:50% 50% 75% 225%;-webkit-animation:loader-clockwise 1.85s linear infinite;animation:loader-clockwise 1.85s linear infinite}\@supports (-ms-ime-align:auto){/*!\@.loader__square*/.loader__square.sc-calcite-loader{stroke-dashoffset:var(--calcite-loader-offset);-webkit-animation:none;animation:none}/*!\@.loader__square--2*/.loader__square--2.sc-calcite-loader{stroke-dashoffset:var(--calcite-loader-offset2)}/*!\@.loader__square--3*/.loader__square--3.sc-calcite-loader{stroke-dashoffset:var(--calcite-loader-offset3)}}/*!\@:host([type=determinate])*/[type=determinate].sc-calcite-loader-h{stroke:var(--calcite-loader-neutral);-webkit-animation:none;animation:none}/*!\@:host([type=determinate]) .loader__square--3*/[type=determinate].sc-calcite-loader-h .loader__square--3.sc-calcite-loader{stroke:var(--calcite-loader-spot);stroke-dasharray:400%;stroke-dashoffset:var(--calcite-loader-progress);-webkit-transition:all 50ms linear;transition:all 50ms linear;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation:none;animation:none}/*!\@:host([inline])*/[inline].sc-calcite-loader-h{stroke:currentColor;stroke-width:4px;-webkit-animation:none;animation:none;margin:0;padding-bottom:0;padding-top:0;position:relative;height:16px;min-height:16px;width:16px;margin-right:8px;vertical-align:-2px}/*!\@:host([inline][dir=rtl])*/[inline][dir=rtl].sc-calcite-loader-h{margin-left:8px;margin-right:0}/*!\@:host([is-active][inline])*/[is-active][inline].sc-calcite-loader-h{display:inline-block}/*!\@:host([inline]) .loader__square*/[inline].sc-calcite-loader-h .loader__square.sc-calcite-loader{margin:0;position:absolute;top:0;left:0;width:16px;height:16px}\@-webkit-keyframes loader-color-shift{0%{stroke:var(--calcite-loader-spot-light)}to{stroke:var(--calcite-loader-spot-dark)}}\@keyframes loader-color-shift{0%{stroke:var(--calcite-loader-spot-light)}to{stroke:var(--calcite-loader-spot-dark)}}\@-webkit-keyframes loader-clockwise{0%{stroke-dashoffset:0}to{stroke-dashoffset:-400%}}\@keyframes loader-clockwise{0%{stroke-dashoffset:0}to{stroke-dashoffset:-400%}}');
styles.set('sc-calcite-modal','/*!\@:root*/.sc-calcite-modal:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-modal-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-modal-h{display:none}/*!\@body*/body.sc-calcite-modal{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-modal{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-modal{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-modal{display:block}/*!\@a*/a.sc-calcite-modal{color:#007ac2}/*!\@:host*/.sc-calcite-modal-h{--calcite-modal-background:#fff;--calcite-modal-hover:#f3f3f3;--calcite-modal-pressed:#eaeaea;--calcite-modal-header-text:#151515;--calcite-modal-body-text:#151515;--calcite-modal-scrim:rgba(0,0,0,0.75);--calcite-modal-border:#f3f3f3;--calcite-modal-accent-red:#d83020;--calcite-modal-accent-blue:#007ac2;position:fixed;top:0;right:0;bottom:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;overflow-y:hidden;color:var(--calcite-modal-body-text);opacity:0;visibility:hidden!important;background:var(--calcite-modal-scrim);-webkit-transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);z-index:101}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-modal-h{--calcite-modal-background:#2b2b2b;--calcite-modal-hover:#353535;--calcite-modal-pressed:#404040;--calcite-modal-header-text:#fff;--calcite-modal-body-text:#f3f3f3;--calcite-modal-border:#353535;--calcite-modal-accent-red:#fe583e;--calcite-modal-accent-blue:#00a0ff}/*!\@.modal*/.modal.sc-calcite-modal{-webkit-box-sizing:border-box;box-sizing:border-box;z-index:102;float:none;text-align:left;-webkit-overflow-scrolling:touch;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:row-wrap;flex-wrap:row-wrap;opacity:0;visibility:hidden;-webkit-transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0);background-color:var(--calcite-modal-background);-webkit-box-shadow:0 0 20px 0 rgba(0,0,0,.3);box-shadow:0 0 20px 0 rgba(0,0,0,.3);border-radius:2px;margin:1.5rem;width:100%}/*!\@:host(.is-active)*/.is-active.sc-calcite-modal-h{visibility:visible!important;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms}/*!\@:host(.is-active) .modal*/.is-active.sc-calcite-modal-h .modal.sc-calcite-modal{visibility:visible;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88);transition:transform .3s cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity .3s cubic-bezier(.215,.44,.42,.88),max-width .3s cubic-bezier(.215,.44,.42,.88),max-height .3s cubic-bezier(.215,.44,.42,.88),-webkit-transform .3s cubic-bezier(.215,.44,.42,.88)}/*!\@:host([dir=rtl]) .modal*/[dir=rtl].sc-calcite-modal-h .modal.sc-calcite-modal{text-align:right}/*!\@.modal__header*/.modal__header.sc-calcite-modal{background-color:var(--calcite-modal-background);-ms-flex:0;flex:0;display:-ms-flexbox;display:flex;max-width:100%;min-width:0;z-index:2;border-bottom:1px solid var(--calcite-modal-border);border-radius:2px 2px 0 0}/*!\@.modal__close*/.modal__close.sc-calcite-modal{padding:1.125rem;margin:0;-ms-flex-order:2;order:2;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;color:var(--calcite-modal-body-text);outline:none;cursor:pointer;border-radius:0 2px 0 0}/*!\@.modal__close svg*/.modal__close.sc-calcite-modal svg.sc-calcite-modal{pointer-events:none}/*!\@.modal__close:focus,.modal__close:hover*/.modal__close.sc-calcite-modal:focus, .modal__close.sc-calcite-modal:hover{background-color:var(--calcite-modal-hover)}/*!\@.modal__close:active*/.modal__close.sc-calcite-modal:active{background-color:var(--calcite-modal-pressed)}/*!\@:host([dir=rtl]) .modal__close*/[dir=rtl].sc-calcite-modal-h .modal__close.sc-calcite-modal{border-radius:2px 0 0 0}/*!\@.modal__title*/.modal__title.sc-calcite-modal{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.75rem 1.5rem;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-order:1;order:1;min-width:0}/*!\@::slotted([slot=header]),slot[name=header]::slotted(*)*/.sc-calcite-modal-s > [slot=header], slot[name=header].sc-calcite-modal-s > *{margin:0;font-weight:400;font-size:1.414rem;line-height:1.5;color:var(--calcite-modal-header-text)}\@media screen and (max-width:859px){/*!\@::slotted([slot=header]),slot[name=header]::slotted(*)*/.sc-calcite-modal-s > [slot=header], slot[name=header].sc-calcite-modal-s > *{font-size:1.33rem}}\@media screen and (max-width:479px){/*!\@::slotted([slot=header]),slot[name=header]::slotted(*)*/.sc-calcite-modal-s > [slot=header], slot[name=header].sc-calcite-modal-s > *{font-size:1.25rem}}/*!\@.modal__content*/.modal__content.sc-calcite-modal{position:relative;padding:1.5rem;height:100%;overflow:auto;max-height:calc(100vh - 12rem);overflow-y:auto;display:block;background-color:var(--calcite-modal-background);z-index:1}/*!\@::slotted([slot=content]),slot[name=content]::slotted(*)*/.sc-calcite-modal-s > [slot=content], slot[name=content].sc-calcite-modal-s > *{font-size:1rem;line-height:1.5}/*!\@.modal__footer*/.modal__footer.sc-calcite-modal{display:-ms-flexbox;display:flex;-ms-flex:0;flex:0;-ms-flex-pack:end;justify-content:flex-end;padding:1.2rem 1.125rem;margin-top:auto;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 2px 2px;width:100%;background-color:var(--calcite-modal-background);border-top:1px solid var(--calcite-modal-border);z-index:2}/*!\@.modal__footer--hide-back .modal__back,.modal__footer--hide-secondary .modal__secondary*/.modal__footer--hide-back.sc-calcite-modal .modal__back.sc-calcite-modal, .modal__footer--hide-secondary.sc-calcite-modal .modal__secondary.sc-calcite-modal{display:none}/*!\@.modal__back*/.modal__back.sc-calcite-modal{display:block;margin-right:auto}/*!\@:host([dir=rtl]) .modal__back*/[dir=rtl].sc-calcite-modal-h .modal__back.sc-calcite-modal{margin-left:auto;margin-right:unset}/*!\@.modal__secondary*/.modal__secondary.sc-calcite-modal{display:block;margin:0 .375rem}/*!\@slot[name=primary]*/slot[name=primary].sc-calcite-modal{display:block}/*!\@:host([size=small]) .modal*/[size=small].sc-calcite-modal-h .modal.sc-calcite-modal{width:auto;max-width:32rem}\@media screen and (max-width:35rem){/*!\@:host([size=small]) .modal*/[size=small].sc-calcite-modal-h .modal.sc-calcite-modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0;border-radius:0}/*!\@:host([size=small]) .modal__content*/[size=small].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 0px;flex:1 1 0;max-height:unset}/*!\@:host([size=small]) .modal__footer,:host([size=small]) .modal__header*/[size=small].sc-calcite-modal-h .modal__footer.sc-calcite-modal, [size=small].sc-calcite-modal-h .modal__header.sc-calcite-modal{-ms-flex:inherit;flex:inherit}/*!\@:host([size=small][docked])*/[size=small][docked].sc-calcite-modal-h{-ms-flex-align:end;align-items:flex-end}}/*!\@:host([size=medium]) .modal*/[size=medium].sc-calcite-modal-h .modal.sc-calcite-modal{max-width:48rem}\@media screen and (max-width:51rem){/*!\@:host([size=medium]) .modal*/[size=medium].sc-calcite-modal-h .modal.sc-calcite-modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0;border-radius:0}/*!\@:host([size=medium]) .modal__content*/[size=medium].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 0px;flex:1 1 0;max-height:unset}/*!\@:host([size=medium]) .modal__footer,:host([size=medium]) .modal__header*/[size=medium].sc-calcite-modal-h .modal__footer.sc-calcite-modal, [size=medium].sc-calcite-modal-h .modal__header.sc-calcite-modal{-ms-flex:inherit;flex:inherit}/*!\@:host([size=medium][docked])*/[size=medium][docked].sc-calcite-modal-h{-ms-flex-align:end;align-items:flex-end}}/*!\@:host([size=large]) .modal*/[size=large].sc-calcite-modal-h .modal.sc-calcite-modal{max-width:94rem}\@media screen and (max-width:97rem){/*!\@:host([size=large]) .modal*/[size=large].sc-calcite-modal-h .modal.sc-calcite-modal{height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0;border-radius:0}/*!\@:host([size=large]) .modal__content*/[size=large].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 0px;flex:1 1 0;max-height:unset}/*!\@:host([size=large]) .modal__footer,:host([size=large]) .modal__header*/[size=large].sc-calcite-modal-h .modal__footer.sc-calcite-modal, [size=large].sc-calcite-modal-h .modal__header.sc-calcite-modal{-ms-flex:inherit;flex:inherit}/*!\@:host([size=large][docked])*/[size=large][docked].sc-calcite-modal-h{-ms-flex-align:end;align-items:flex-end}}/*!\@:host([size=fullscreen])*/[size=fullscreen].sc-calcite-modal-h{background-color:transparent}/*!\@:host([size=fullscreen]) .modal*/[size=fullscreen].sc-calcite-modal-h .modal.sc-calcite-modal{-webkit-transform:translate3D(0,20px,0) scale(.95);transform:translate3D(0,20px,0) scale(.95);height:100vh;max-height:100vh;width:100vw;max-width:100vw;margin:0}/*!\@:host([size=fullscreen]) .modal__content*/[size=fullscreen].sc-calcite-modal-h .modal__content.sc-calcite-modal{-ms-flex:1 1 auto;flex:1 1 auto}/*!\@:host([size=fullscreen]) .modal__footer,:host([size=fullscreen]) .modal__header*/[size=fullscreen].sc-calcite-modal-h .modal__footer.sc-calcite-modal, [size=fullscreen].sc-calcite-modal-h .modal__header.sc-calcite-modal{-ms-flex:inherit;flex:inherit}/*!\@:host(.is-active[size=fullscreen]) .modal*/.is-active[size=fullscreen].sc-calcite-modal-h .modal.sc-calcite-modal{-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}/*!\@:host(.is-active[size=fullscreen]) .modal__footer,:host(.is-active[size=fullscreen]) .modal__header*/.is-active[size=fullscreen].sc-calcite-modal-h .modal__footer.sc-calcite-modal, .is-active[size=fullscreen].sc-calcite-modal-h .modal__header.sc-calcite-modal{border-radius:0}/*!\@:host([docked]) .modal*/[docked].sc-calcite-modal-h .modal.sc-calcite-modal{height:auto!important}/*!\@:host([docked]) .modal__content*/[docked].sc-calcite-modal-h .modal__content.sc-calcite-modal{height:auto;-ms-flex:1;flex:1}\@media screen and (max-width:860px){/*!\@:host([docked]) .modal*/[docked].sc-calcite-modal-h .modal.sc-calcite-modal{border-radius:2px 2px 0 0}/*!\@:host([docked]) .modal__close*/[docked].sc-calcite-modal-h .modal__close.sc-calcite-modal{border-radius:0 2px 0 0}}\@media screen and (max-width:860px){/*!\@:host([docked][dir=rtl]) .modal__close*/[docked][dir=rtl].sc-calcite-modal-h .modal__close.sc-calcite-modal{border-radius:2px 0 0 0}}/*!\@:host([color=red]) .modal*/[color=red].sc-calcite-modal-h .modal.sc-calcite-modal{border-top:4px solid var(--calcite-modal-accent-red)}/*!\@:host([color=blue]) .modal*/[color=blue].sc-calcite-modal-h .modal.sc-calcite-modal{border-top:4px solid var(--calcite-modal-accent-blue)}/*!\@:host([color=blue]) .modal__header,:host([color=red]) .modal__header*/[color=blue].sc-calcite-modal-h .modal__header.sc-calcite-modal, [color=red].sc-calcite-modal-h .modal__header.sc-calcite-modal{border-radius:0}\@media screen and (max-width:860px){/*!\@::slotted([slot=header]),slot[name=header]::slotted(*)*/.sc-calcite-modal-s > [slot=header], slot[name=header].sc-calcite-modal-s > *{font-size:1.2019rem;line-height:1.5}}\@media screen and (max-width:860px) and (max-width:859px){/*!\@::slotted([slot=header]),slot[name=header]::slotted(*)*/.sc-calcite-modal-s > [slot=header], slot[name=header].sc-calcite-modal-s > *{font-size:1.1305rem}}\@media screen and (max-width:860px) and (max-width:479px){/*!\@::slotted([slot=header]),slot[name=header]::slotted(*)*/.sc-calcite-modal-s > [slot=header], slot[name=header].sc-calcite-modal-s > *{font-size:1.0625rem}}\@media screen and (max-width:860px){/*!\@.modal__title*/.modal__title.sc-calcite-modal{padding:.375rem 1.0125rem}}\@media screen and (max-width:860px){/*!\@.modal__close,.modal__content*/.modal__close.sc-calcite-modal, .modal__content.sc-calcite-modal{padding:1.0125rem}}\@media screen and (max-width:860px){/*!\@.modal__footer*/.modal__footer.sc-calcite-modal{position:-webkit-sticky;position:sticky;bottom:0}}\@media screen and (max-width:480px){/*!\@.modal__footer*/.modal__footer.sc-calcite-modal{-ms-flex-direction:column;flex-direction:column}/*!\@.modal__back,.modal__secondary*/.modal__back.sc-calcite-modal, .modal__secondary.sc-calcite-modal{margin:0;margin-bottom:.375rem}}');
styles.set('sc-calcite-popover','/*!\@:root*/.sc-calcite-popover:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-popover-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-popover-h{display:none}/*!\@body*/body.sc-calcite-popover{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-popover{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-popover{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-popover{display:block}/*!\@a*/a.sc-calcite-popover{color:#007ac2}/*!\@:host*/.sc-calcite-popover-h{--calcite-popover-background:#fff;--calcite-popover-primary-text:var(--calcite-global-ui-text-1);--calcite-popover-close-hover:#f3f3f3;--calcite-popover-close-pressed:#eaeaea;display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-popover-h{--calcite-popover-background:#2b2b2b;--calcite-popover-primary-text:#fff;--calcite-popover-close-hover:#353535;--calcite-popover-close-pressed:#404040}/*!\@.container*/.container.sc-calcite-popover{border-radius:3px;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);overflow:hidden;position:relative;visibility:hidden}/*!\@.container--open*/.container--open.sc-calcite-popover{visibility:visible}/*!\@.content-container*/.content-container.sc-calcite-popover{max-width:350px;-ms-flex-direction:column;flex-direction:column;background:var(--calcite-popover-background);color:var(--calcite-popover-primary-text)}/*!\@.content,.content-container*/.content.sc-calcite-popover, .content-container.sc-calcite-popover{display:-ms-flexbox;display:flex}/*!\@.content*/.content.sc-calcite-popover{-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;line-height:24px}/*!\@.close-button*/.close-button.sc-calcite-popover{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;width:40px;height:45px;z-index:1;background:var(--calcite-popover-background);color:var(--calcite-popover-primary-text);padding:16px 12px;border:none;display:block;cursor:pointer;border-top-right-radius:2px}/*!\@.close-button:hover*/.close-button.sc-calcite-popover:hover{background:var(--calcite-popover-close-hover)}/*!\@.close-button:active*/.close-button.sc-calcite-popover:active{background:var(--calcite-popover-close-pressed)}/*!\@.image-container*/.image-container.sc-calcite-popover{overflow:hidden;max-height:200px;margin:5px}/*!\@slot[name=image]::slotted(img)*/slot[name=image].sc-calcite-popover-s > img{height:auto;width:100%;max-height:200px;-o-object-position:50% 50%;object-position:50% 50%;-o-object-fit:cover;object-fit:cover}/*!\@:host*/.sc-calcite-popover-h{--calcite-popper-background:#fff}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-popover-h{--calcite-popper-background:#2b2b2b}/*!\@.container--pointer .content-container:after*/.container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{position:absolute;content:\"\";font-size:0;line-height:0}/*!\@:host([x-placement=top-start]) .container--pointer .content-container:after*/[x-placement=top-start].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{top:100%;left:5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=top]) .container--pointer .content-container:after*/[x-placement=top].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{top:100%;left:50%;margin-left:-5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=top-end]) .container--pointer .content-container:after*/[x-placement=top-end].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{top:100%;right:5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=right-start]) .container--pointer .content-container:after*/[x-placement=right-start].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{right:100%;top:5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=right]) .container--pointer .content-container:after*/[x-placement=right].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{right:100%;top:50%;margin-top:-5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=right-end]) .container--pointer .content-container:after*/[x-placement=right-end].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{right:100%;bottom:5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=bottom-start]) .container--pointer .content-container:after*/[x-placement=bottom-start].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{bottom:100%;left:5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=bottom]) .container--pointer .content-container:after*/[x-placement=bottom].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{bottom:100%;left:50%;margin-left:-5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=bottom-end]) .container--pointer .content-container:after*/[x-placement=bottom-end].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{bottom:100%;right:5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=left-start]) .container--pointer .content-container:after*/[x-placement=left-start].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{left:100%;top:5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=left]) .container--pointer .content-container:after*/[x-placement=left].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{left:100%;top:50%;margin-top:-5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=left-end]) .container--pointer .content-container:after*/[x-placement=left-end].sc-calcite-popover-h .container--pointer.sc-calcite-popover .content-container.sc-calcite-popover:after{left:100%;bottom:5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement*=bottom]) .container--pointer,:host([x-placement*=top]) .container--pointer*/[x-placement*=bottom].sc-calcite-popover-h .container--pointer.sc-calcite-popover, [x-placement*=top].sc-calcite-popover-h .container--pointer.sc-calcite-popover{margin:5px 0}/*!\@:host([x-placement*=left]) .container--pointer,:host([x-placement*=right]) .container--pointer*/[x-placement*=left].sc-calcite-popover-h .container--pointer.sc-calcite-popover, [x-placement*=right].sc-calcite-popover-h .container--pointer.sc-calcite-popover{margin:0 5px}');
styles.set('sc-calcite-progress','/*!\@:root*/.sc-calcite-progress:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-progress-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-progress-h{display:none}/*!\@body*/body.sc-calcite-progress{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-progress{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-progress{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-progress{display:block}/*!\@a*/a.sc-calcite-progress{color:#007ac2}/*!\@:host*/.sc-calcite-progress-h{--calcite-progress-color:#007ac2;--calcite-track-color:#eaeaea;position:relative;display:block}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-progress-h{--calcite-progress-color:#00a0ff;--calcite-track-color:#353535}/*!\@.calcite-progress--bar,.calcite-progress--track*/.calcite-progress--bar.sc-calcite-progress, .calcite-progress--track.sc-calcite-progress{content:\"\";opacity:1;position:absolute;height:2px;top:0;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out}/*!\@.calcite-progress--track*/.calcite-progress--track.sc-calcite-progress{background:var(--calcite-track-color);z-index:0;width:100%}/*!\@.calcite-progress--bar*/.calcite-progress--bar.sc-calcite-progress{background-color:var(--calcite-progress-color);z-index:0}/*!\@.--indeterminate*/.--indeterminate.sc-calcite-progress{width:20%;-webkit-animation:looping-progress-bar-ani 1.5s linear infinite;animation:looping-progress-bar-ani 1.5s linear infinite}/*!\@.--determinate*/.--determinate.sc-calcite-progress{width:var(--percentage-value)}/*!\@.calcite-progress--text*/.calcite-progress--text.sc-calcite-progress{padding:20px 0 0 0}\@-webkit-keyframes looping-progress-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}\@keyframes looping-progress-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}');
styles.set('sc-calcite-radio-group','/*!\@:root*/.sc-calcite-radio-group:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-radio-group-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-radio-group-h{display:none}/*!\@body*/body.sc-calcite-radio-group{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-radio-group{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-radio-group{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-radio-group{display:block}/*!\@a*/a.sc-calcite-radio-group{color:#007ac2}/*!\@:host*/.sc-calcite-radio-group-h{display:-ms-flexbox;display:flex;--calcite-radio-group-color:#fff;--calcite-radio-group-border-color:#d4d4d4;--calcite-radio-group-color-active:#007ac2;--calcite-radio-group-text-color:#000;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#f8f8f8;--calcite-radio-group-padding:0.5rem 1rem}/*!\@:host([scale=s])*/[scale=s].sc-calcite-radio-group-h{--calcite-radio-group-padding:0.25rem 0.75rem}/*!\@:host([scale=m])*/[scale=m].sc-calcite-radio-group-h{--calcite-radio-group-padding:0.4rem 1rem}/*!\@:host([scale=l])*/[scale=l].sc-calcite-radio-group-h{--calcite-radio-group-padding:0.5rem 1.5rem}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-radio-group-h{--calcite-radio-group-color:#2b2b2b;--calcite-radio-group-border-color:#353535;--calcite-radio-group-color-active:#009af2;--calcite-radio-group-text-color:#fff;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#353535}/*!\@::slotted(calcite-radio-group-item:focus),::slotted(calcite-radio-group-item[checked])*/.sc-calcite-radio-group-s > calcite-radio-group-item:focus, .sc-calcite-radio-group-s > calcite-radio-group-item[checked]{z-index:0}');
styles.set('sc-calcite-radio-group-item','/*!\@:root*/.sc-calcite-radio-group-item:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-radio-group-item-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-radio-group-item-h{display:none}/*!\@body*/body.sc-calcite-radio-group-item{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-radio-group-item{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-radio-group-item{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-radio-group-item{display:block}/*!\@a*/a.sc-calcite-radio-group-item{color:#007ac2}/*!\@:host*/.sc-calcite-radio-group-item-h{display:-ms-flexbox;display:flex;background-color:var(--calcite-radio-group-color);color:var(--calcite-radio-group-text-color);padding:var(--calcite-radio-group-padding);line-height:1.25;margin:.25rem -1px 0 0;border:1px solid var(--calcite-radio-group-border-color);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background .1s ease-in-out,border-color .1s ease-in-out;transition:background .1s ease-in-out,border-color .1s ease-in-out;cursor:pointer}/*!\@:host([scale=s])*/[scale=s].sc-calcite-radio-group-item-h{font-size:.8125rem;line-height:1.5}/*!\@:host([scale=m])*/[scale=m].sc-calcite-radio-group-item-h{font-size:.9375rem;line-height:1.5}/*!\@:host([scale=l])*/[scale=l].sc-calcite-radio-group-item-h{font-size:1rem;line-height:1.5}/*!\@:host(:hover)*/.sc-calcite-radio-group-item-h:hover{background-color:var(--calcite-radio-group-color-hover)}/*!\@:host([checked])*/[checked].sc-calcite-radio-group-item-h{background-color:var(--calcite-radio-group-color-active);border-color:var(--calcite-radio-group-color-active);color:var(--calcite-radio-group-text-color-active);cursor:default}/*!\@label*/label.sc-calcite-radio-group-item{pointer-events:none}/*!\@::slotted(input)*/.sc-calcite-radio-group-item-s > input{display:none}');
styles.set('sc-calcite-slider','/*!\@:root*/.sc-calcite-slider:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-slider-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-slider-h{display:none}/*!\@body*/body.sc-calcite-slider{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-slider{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-slider{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-slider{display:block}/*!\@a*/a.sc-calcite-slider{color:#007ac2}/*!\@:host*/.sc-calcite-slider-h{--calcite-slider-spot:#007ac2;--calcite-slider-tick:#959595;--calcite-slider-label:#555;--calcite-slider-track:#cacaca;--calcite-slider-handle:#fff;display:block;padding:7px 0;margin:7px 0;position:relative}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-slider-h{--calcite-slider-spot:#00a0ff;--calcite-slider-tick:#404040;--calcite-slider-label:#cacaca;--calcite-slider-track:#4a4a4a;--calcite-slider-handle:#2b2b2b}/*!\@:host([disabled])*/[disabled].sc-calcite-slider-h{opacity:.5;pointer-events:none}/*!\@:host([label-handles]),:host([precise])*/[label-handles].sc-calcite-slider-h, [precise].sc-calcite-slider-h{margin-top:21px}/*!\@:host([label-ticks]),:host([precise][is-range])*/[label-ticks].sc-calcite-slider-h, [precise][is-range].sc-calcite-slider-h{margin-bottom:21px}/*!\@:host([precise][label-handles])*/[precise][label-handles].sc-calcite-slider-h{margin-top:35px}/*!\@:host([precise][label-handles][is-range])*/[precise][label-handles][is-range].sc-calcite-slider-h{margin-bottom:35px}/*!\@.slider__thumb*/.slider__thumb.sc-calcite-slider{position:absolute;right:var(--calcite-slider-range-max);height:28px;width:28px;margin:-14px;-webkit-box-sizing:border-box;box-sizing:border-box;border:none;background:transparent;cursor:pointer;font-family:inherit;z-index:3}/*!\@.slider__thumb--min*/.slider__thumb--min.sc-calcite-slider{right:auto;left:var(--calcite-slider-range-min)}/*!\@.slider__handle*/.slider__handle.sc-calcite-slider{position:absolute;top:0;left:0;height:14px;width:14px;margin:7px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:100%;background-color:var(--calcite-slider-handle);border:2px solid var(--calcite-slider-tick);-webkit-transition:border .25s ease,background-color .25s ease,-webkit-box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,-webkit-box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,box-shadow .25s ease,-webkit-box-shadow .25s ease}/*!\@.slider__handle__label*/.slider__handle__label.sc-calcite-slider{position:absolute;left:0;bottom:28px;width:28px;height:.75em;font-size:.8125rem;line-height:1.5;line-height:1;color:var(--calcite-slider-label);text-align:center}/*!\@.slider__thumb:hover .slider__handle*/.slider__thumb.sc-calcite-slider:hover .slider__handle.sc-calcite-slider{border-color:var(--calcite-slider-spot);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.1);box-shadow:0 0 16px 0 rgba(0,0,0,.1)}/*!\@.slider__thumb--active,.slider__thumb:focus*/.slider__thumb--active.sc-calcite-slider, .slider__thumb.sc-calcite-slider:focus{outline:none;z-index:4}/*!\@.slider__thumb--active .slider__handle,.slider__thumb:focus .slider__handle*/.slider__thumb--active.sc-calcite-slider .slider__handle.sc-calcite-slider, .slider__thumb.sc-calcite-slider:focus .slider__handle.sc-calcite-slider{background-color:var(--calcite-slider-spot);border-color:var(--calcite-slider-spot);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.2);box-shadow:0 0 16px 0 rgba(0,0,0,.2)}/*!\@.slider__thumb--precise*/.slider__thumb--precise.sc-calcite-slider{margin-top:-28px}/*!\@.slider__thumb--precise:after*/.slider__thumb--precise.sc-calcite-slider:after{content:\"\";display:block;position:absolute;top:14px;left:50%;width:2px;height:7px;background-color:var(--calcite-slider-tick);margin-left:-1px;margin-top:7px;z-index:2}/*!\@.slider__thumb--active.slider__thumb--precise:after,.slider__thumb:focus.slider__thumb--precise:after*/.slider__thumb--active.slider__thumb--precise.sc-calcite-slider:after, .slider__thumb.sc-calcite-slider:focus.slider__thumb--precise:after{background-color:var(--calcite-slider-spot)}/*!\@.slider__thumb--precise.slider__thumb--min*/.slider__thumb--precise.slider__thumb--min.sc-calcite-slider{margin-top:-2px}/*!\@.slider__thumb--precise.slider__thumb--min .slider__handle__label*/.slider__thumb--precise.slider__thumb--min.sc-calcite-slider .slider__handle__label.sc-calcite-slider{bottom:unset;top:28px}/*!\@.slider__thumb--precise.slider__thumb--min:after*/.slider__thumb--precise.slider__thumb--min.sc-calcite-slider:after{top:0;margin-top:0}/*!\@.slider__track*/.slider__track.sc-calcite-slider{height:2px;border-radius:0;z-index:2;background-color:var(--calcite-slider-track);-webkit-transition:all .25s ease-in;transition:all .25s ease-in;position:relative}/*!\@.slider__track__range*/.slider__track__range.sc-calcite-slider{position:absolute;top:0;right:var(--calcite-slider-range-max);left:var(--calcite-slider-range-min);height:2px;background-color:var(--calcite-slider-spot)}/*!\@.slider__tick*/.slider__tick.sc-calcite-slider{position:absolute;top:-2px;width:2px;height:4px;left:var(--calcite-slider-tick-offset);margin-left:-3px;border:1px solid var(--calcite-slider-handle);border-right-width:2px;border-left-width:2px;background-color:var(--calcite-slider-tick)}/*!\@.slider__tick--active*/.slider__tick--active.sc-calcite-slider{background-color:var(--calcite-slider-spot)}/*!\@.slider__tick__label*/.slider__tick__label.sc-calcite-slider{position:absolute;font-size:.8125rem;line-height:1.5;color:var(--calcite-slider-label);width:4em;margin:14px -2em;text-align:center;display:block;pointer-events:none}/*!\@.slider__tick__label--min*/.slider__tick__label--min.sc-calcite-slider{left:0;margin:14px -3px;text-align:left}/*!\@.slider__tick__label--max*/.slider__tick__label--max.sc-calcite-slider{left:unset;right:0;margin:14px -3px;text-align:right}');
styles.set('sc-calcite-switch','/*!\@:root*/.sc-calcite-switch:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-switch-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-switch-h{display:none}/*!\@body*/body.sc-calcite-switch{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-switch{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-switch{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-switch{display:block}/*!\@a*/a.sc-calcite-switch{color:#007ac2}/*!\@:host*/.sc-calcite-switch-h{--calcite-switch-track-background:#f3f3f3;--calcite-switch-track-border:#d4d4d4;--calcite-switch-handle-background:#fff;--calcite-switch-handle-border:#959595;--calcite-switch-hover-handle-border:#2890ce;--calcite-switch-hover-track-background:#eaeaea;--calcite-switch-hover-track-border:#bfbfbf;--calcite-switch-switched-track-background:#2890ce;--calcite-switch-switched-track-border:#00619b;--calcite-switch-switched-handle-border:#007ac2;--calcite-switch-switched-hover-track-background:#007ac2;--calcite-switch-switched-hover-track-border:#2890ce;--calcite-switch-switched-hover-handle-border:#00619b;--calcite-switch-box-shadow-color:hsla(0,0%,45.9%,0.5);--calcite-switch-switched-box-shadow-color:rgba(0,122,194,0.5)}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-switch-h{--calcite-switch-track-background:#353535;--calcite-switch-track-border:#555;--calcite-switch-handle-background:#2b2b2b;--calcite-switch-handle-border:#959595;--calcite-switch-hover-handle-border:#0087d7;--calcite-switch-hover-track-background:#404040;--calcite-switch-hover-track-border:grey;--calcite-switch-switched-track-background:#0087d7;--calcite-switch-switched-track-border:#00a0ff;--calcite-switch-switched-handle-border:#00a0ff;--calcite-switch-switched-hover-track-background:#00a0ff;--calcite-switch-switched-hover-track-border:#00a0ff;--calcite-switch-switched-hover-handle-border:#0087d7;--calcite-switch-switched-box-shadow-color:rgba(0,160,255,0.5)}/*!\@:host([color=red])*/[color=red].sc-calcite-switch-h{--calcite-switch-switched-track-background:#e65240;--calcite-switch-switched-track-border:#d83020;--calcite-switch-hover-handle-border:#e65240;--calcite-switch-switched-handle-border:#d83020;--calcite-switch-switched-hover-track-background:#d83020;--calcite-switch-switched-hover-track-border:#e65240;--calcite-switch-switched-hover-handle-border:#a82b1e;--calcite-switch-switched-box-shadow-color:rgba(216,48,32,0.5)}/*!\@:host([theme=dark][color=red])*/[theme=dark][color=red].sc-calcite-switch-h{--calcite-switch-switched-track-background:#f3381b;--calcite-switch-switched-track-border:#fe583e;--calcite-switch-hover-handle-border:#f3381b;--calcite-switch-switched-handle-border:#fe583e;--calcite-switch-switched-hover-track-background:#fe583e;--calcite-switch-switched-hover-track-border:#ff7465;--calcite-switch-switched-hover-handle-border:#ff7465;--calcite-switch-switched-box-shadow-color:rgba(254,88,62,0.5)}/*!\@:host([scale=s])*/[scale=s].sc-calcite-switch-h{--calcite-switch-track-width:28px;--calcite-switch-track-height:16px;--calcite-switch-handle-size:14px}/*!\@:host([scale=m])*/[scale=m].sc-calcite-switch-h{--calcite-switch-track-width:36px;--calcite-switch-track-height:20px;--calcite-switch-handle-size:18px}/*!\@:host([scale=l])*/[scale=l].sc-calcite-switch-h{--calcite-switch-track-width:44px;--calcite-switch-track-height:24px;--calcite-switch-handle-size:22px}/*!\@::slotted(input)*/.sc-calcite-switch-s > input{display:none}/*!\@:host*/.sc-calcite-switch-h{display:inline-block;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;top:-.1em;tap-highlight-color:transparent;margin-right:.5em}/*!\@.track*/.track.sc-calcite-switch{position:relative;display:inline-block;vertical-align:top;width:var(--calcite-switch-track-width);height:var(--calcite-switch-track-height);background-color:var(--calcite-switch-track-background);border-radius:30px;border:1px solid var(--calcite-switch-track-border)}/*!\@.handle,.track*/.handle.sc-calcite-switch, .track.sc-calcite-switch{pointer-events:none;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@.handle*/.handle.sc-calcite-switch{position:absolute;display:block;width:var(--calcite-switch-handle-size);height:var(--calcite-switch-handle-size);top:-1px;left:-1px;right:auto;background-color:var(--calcite-switch-handle-background);border-radius:30px;border:2px solid var(--calcite-switch-handle-border)}/*!\@:host(:focus),:host(:hover)*/.sc-calcite-switch-h:focus, .sc-calcite-switch-h:hover{outline:none}/*!\@:host(:focus) .track,:host(:hover) .track*/.sc-calcite-switch-h:focus .track.sc-calcite-switch, .sc-calcite-switch-h:hover .track.sc-calcite-switch{background-color:var(--calcite-switch-hover-track-background);border-color:var(--calcite-switch-hover-track-border);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.1);box-shadow:0 0 16px 0 rgba(0,0,0,.1)}/*!\@:host(:focus) .handle,:host(:hover) .handle*/.sc-calcite-switch-h:focus .handle.sc-calcite-switch, .sc-calcite-switch-h:hover .handle.sc-calcite-switch{border-color:var(--calcite-switch-hover-handle-border);-webkit-box-shadow:0 0 12px 0 rgba(0,0,0,.05);box-shadow:0 0 12px 0 rgba(0,0,0,.05);right:auto}/*!\@:host([switched]) .track*/[switched].sc-calcite-switch-h .track.sc-calcite-switch{background-color:var(--calcite-switch-switched-track-background);border-color:var(--calcite-switch-switched-track-border)}/*!\@:host([switched]) .handle*/[switched].sc-calcite-switch-h .handle.sc-calcite-switch{right:-1px;left:auto;border-color:var(--calcite-switch-switched-handle-border);-webkit-box-shadow:0 0 12px 0 rgba(0,0,0,.05);box-shadow:0 0 12px 0 rgba(0,0,0,.05)}/*!\@:host([switched]:focus) .track*/[switched].sc-calcite-switch-h:focus .track.sc-calcite-switch{-webkit-box-shadow:0 0 6px 1px var(--calcite-switch-switched-box-shadow-color);box-shadow:0 0 6px 1px var(--calcite-switch-switched-box-shadow-color)}/*!\@:host([switched]:hover) .track*/[switched].sc-calcite-switch-h:hover .track.sc-calcite-switch{background-color:var(--calcite-switch-switched-hover-track-background);border-color:var(--calcite-switch-switched-hover-track-border)}/*!\@:host([switched]:hover) .handle*/[switched].sc-calcite-switch-h:hover .handle.sc-calcite-switch{border-color:var(--calcite-switch-switched-hover-handle-border)}/*!\@:host([dir=rtl])*/[dir=rtl].sc-calcite-switch-h{margin-right:0;margin-left:.5em}/*!\@:host([dir=rtl]) .handle*/[dir=rtl].sc-calcite-switch-h .handle.sc-calcite-switch{left:auto;right:-1px}/*!\@:host([dir=rtl]:hover) .handle*/[dir=rtl].sc-calcite-switch-h:hover .handle.sc-calcite-switch{right:1px;left:auto}/*!\@:host([dir=rtl][switched]) .handle,:host([dir=rtl][switched]:active) .handle,:host([dir=rtl][switched]:focus) .handle*/[dir=rtl][switched].sc-calcite-switch-h .handle.sc-calcite-switch, [dir=rtl][switched].sc-calcite-switch-h:active .handle.sc-calcite-switch, [dir=rtl][switched].sc-calcite-switch-h:focus .handle.sc-calcite-switch{right:auto;left:-1px}');
styles.set('sc-calcite-tab','/*!\@:root*/.sc-calcite-tab:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tab-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-tab-h{display:none}/*!\@body*/body.sc-calcite-tab{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tab{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-tab{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-tab{display:block}/*!\@a*/a.sc-calcite-tab{color:#007ac2}/*!\@:host([is-active]) section*/[is-active].sc-calcite-tab-h section.sc-calcite-tab{display:block}/*!\@section*/section.sc-calcite-tab{display:none}');
styles.set('sc-calcite-tab-nav','/*!\@:root*/.sc-calcite-tab-nav:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tab-nav-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-tab-nav-h{display:none}/*!\@body*/body.sc-calcite-tab-nav{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tab-nav{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-tab-nav{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-tab-nav{display:block}/*!\@a*/a.sc-calcite-tab-nav{color:#007ac2}/*!\@.tab-nav*/.tab-nav.sc-calcite-tab-nav{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--calcite-tabs-layout);justify-content:var(--calcite-tabs-layout);overflow:auto}/*!\@::slotted(calcite-tab-title)*/.sc-calcite-tab-nav-s > calcite-tab-title{margin-right:var(--calcite-tabs-tab-margin-start);margin-left:var(--calcite-tabs-tab-margin-end)}/*!\@:host([dir=rtl]) ::slotted(calcite-tab-title)*/.sc-calcite-tab-nav-h[dir=rtl] .sc-calcite-tab-nav-s > calcite-tab-title{margin-right:var(--calcite-tabs-tab-margin-end);margin-left:var(--calcite-tabs-tab-margin-start)}');
styles.set('sc-calcite-tab-title','/*!\@:root*/.sc-calcite-tab-title:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tab-title-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-tab-title-h{display:none}/*!\@body*/body.sc-calcite-tab-title{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tab-title{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-tab-title{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-tab-title{display:block}/*!\@a*/a.sc-calcite-tab-title{color:#007ac2}/*!\@:host*/.sc-calcite-tab-title-h{-ms-flex:0 1 var(--calcite-tabs-tab-basis);flex:0 1 var(--calcite-tabs-tab-basis);outline:none}/*!\@:host(:active) a,:host(:focus) a,:host(:hover) a*/.sc-calcite-tab-title-h:active a.sc-calcite-tab-title, .sc-calcite-tab-title-h:focus a.sc-calcite-tab-title, .sc-calcite-tab-title-h:hover a.sc-calcite-tab-title{outline:none;text-decoration:none;color:var(--calcite-global-ui-text-1);border-bottom-color:var(--calcite-tabs-border-hover)}/*!\@:host([is-active]) a*/[is-active].sc-calcite-tab-title-h a.sc-calcite-tab-title{color:var(--calcite-global-ui-text-1);border-bottom-color:var(--calcite-global-ui-blue);font-weight:500}/*!\@a*/a.sc-calcite-tab-title{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.875rem;line-height:1.5;padding:.75rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;cursor:pointer;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;color:var(--calcite-global-ui-text-3);outline:none;width:100%;display:block;text-align:var(--calcite-tabs-tab-text-align)}');
styles.set('sc-calcite-tabs','/*!\@:root*/.sc-calcite-tabs:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tabs-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-tabs-h{display:none}/*!\@body*/body.sc-calcite-tabs{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tabs{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-tabs{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-tabs{display:block}/*!\@a*/a.sc-calcite-tabs{color:#007ac2}/*!\@:host*/.sc-calcite-tabs-h{display:block;--calcite-tabs-border:#eaeaea;--calcite-tabs-border-hover:#dfdfdf;--calcite-tabs-color-active:#151515;--calcite-tabs-layout:flex-start;--calcite-tabs-tab-basis:auto;--calcite-tabs-tab-text-align:start;--calcite-tabs-tab-margin-start:1.25rem;--calcite-tabs-tab-margin-end:0}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tabs-h{--calcite-tabs-border:#404040;--calcite-tabs-border-hover:#4a4a4a;--calcite-tabs-color-active:#f8f8f8}/*!\@:host([dir=rtl])*/[dir=rtl].sc-calcite-tabs-h{--calcite-tabs-tab-margin-start:0;--calcite-tabs-tab-margin-end:1.25rem}/*!\@:host([layout=center])*/[layout=center].sc-calcite-tabs-h{--calcite-tabs-layout:center;--calcite-tabs-tab-basis:200px;--calcite-tabs-tab-text-align:center;--calcite-tabs-tab-margin-start:1.25rem;--calcite-tabs-tab-margin-end:1.25rem}/*!\@section*/section.sc-calcite-tabs{border-top:1px solid var(--calcite-tabs-border)}');
styles.set('sc-calcite-tooltip','/*!\@:root*/.sc-calcite-tooltip:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tooltip-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-tooltip-h{display:none}/*!\@body*/body.sc-calcite-tooltip{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tooltip{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-tooltip{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-tooltip{display:block}/*!\@a*/a.sc-calcite-tooltip{color:#007ac2}/*!\@:host*/.sc-calcite-tooltip-h{--calcite-tooltip-primary-text:#151515;--calcite-tooltip-background:#fff;display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tooltip-h{--calcite-tooltip-primary-text:#fff;--calcite-tooltip-background:#2b2b2b}/*!\@.tooltip-container*/.tooltip-container.sc-calcite-tooltip{visibility:hidden;position:relative;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15)}/*!\@.tooltip-container--open*/.tooltip-container--open.sc-calcite-tooltip{visibility:visible}/*!\@.tooltip-content-container*/.tooltip-content-container.sc-calcite-tooltip{background:var(--calcite-tooltip-background);max-width:300px;max-height:300px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:500;color:var(--calcite-tooltip-primary-text);padding:12px 16px;font-size:.8125rem;line-height:1.5}/*!\@:host*/.sc-calcite-tooltip-h{--calcite-popper-background:#fff}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tooltip-h{--calcite-popper-background:#2b2b2b}/*!\@.tooltip-content-container:after*/.tooltip-content-container.sc-calcite-tooltip:after{position:absolute;content:\"\";font-size:0;line-height:0}/*!\@:host([x-placement=top-start]) .tooltip-content-container:after*/[x-placement=top-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{left:5px}/*!\@:host([x-placement=top-start]) .tooltip-content-container:after,:host([x-placement=top]) .tooltip-content-container:after*/[x-placement=top-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after, [x-placement=top].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{top:100%;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=top]) .tooltip-content-container:after*/[x-placement=top].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{left:50%;margin-left:-5px}/*!\@:host([x-placement=top-end]) .tooltip-content-container:after*/[x-placement=top-end].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{top:100%;right:5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=right-start]) .tooltip-content-container:after*/[x-placement=right-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{top:5px}/*!\@:host([x-placement=right-start]) .tooltip-content-container:after,:host([x-placement=right]) .tooltip-content-container:after*/[x-placement=right-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after, [x-placement=right].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{right:100%;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=right]) .tooltip-content-container:after*/[x-placement=right].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{top:50%;margin-top:-5px}/*!\@:host([x-placement=right-end]) .tooltip-content-container:after*/[x-placement=right-end].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{right:100%;bottom:5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=bottom-start]) .tooltip-content-container:after*/[x-placement=bottom-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{left:5px}/*!\@:host([x-placement=bottom-start]) .tooltip-content-container:after,:host([x-placement=bottom]) .tooltip-content-container:after*/[x-placement=bottom-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after, [x-placement=bottom].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{bottom:100%;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=bottom]) .tooltip-content-container:after*/[x-placement=bottom].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{left:50%;margin-left:-5px}/*!\@:host([x-placement=bottom-end]) .tooltip-content-container:after*/[x-placement=bottom-end].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{bottom:100%;right:5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}/*!\@:host([x-placement=left-start]) .tooltip-content-container:after*/[x-placement=left-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{top:5px}/*!\@:host([x-placement=left-start]) .tooltip-content-container:after,:host([x-placement=left]) .tooltip-content-container:after*/[x-placement=left-start].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after, [x-placement=left].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{left:100%;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement=left]) .tooltip-content-container:after*/[x-placement=left].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{top:50%;margin-top:-5px}/*!\@:host([x-placement=left-end]) .tooltip-content-container:after*/[x-placement=left-end].sc-calcite-tooltip-h .tooltip-content-container.sc-calcite-tooltip:after{left:100%;bottom:5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}/*!\@:host([x-placement*=bottom]) .tooltip-container,:host([x-placement*=top]) .tooltip-container*/[x-placement*=bottom].sc-calcite-tooltip-h .tooltip-container.sc-calcite-tooltip, [x-placement*=top].sc-calcite-tooltip-h .tooltip-container.sc-calcite-tooltip{margin:5px 0}/*!\@:host([x-placement*=left]) .tooltip-container,:host([x-placement*=right]) .tooltip-container*/[x-placement*=left].sc-calcite-tooltip-h .tooltip-container.sc-calcite-tooltip, [x-placement*=right].sc-calcite-tooltip-h .tooltip-container.sc-calcite-tooltip{margin:0 5px}');
styles.set('sc-calcite-tree','/*!\@:root*/.sc-calcite-tree:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tree-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-tree-h{display:none}/*!\@body*/body.sc-calcite-tree{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tree{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-tree{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-tree{display:block}/*!\@a*/a.sc-calcite-tree{color:#007ac2}/*!\@:host*/.sc-calcite-tree-h{display:block;outline:none;--calcite-tree-text:#404040;--calcite-tree-text-hover:#151515;--calcite-tree-text-active:#0b0b0b;--calcite-tree-chevron:#bfbfbf;--calcite-tree-chevron-hover:#6a6a6a;--calcite-tree-chevron-active:#007ac2;--calcite-tree-vertical-padding:0.375rem;--calcite-tree-indicator:#bfbfbf;--calcite-tree-indicator-active:#007ac2;--calcite-tree-indicator-first-start:0.1rem;--calcite-tree-indicator-first-end:auto;--calcite-tree-indicator-distance-start:0.15rem;--calcite-tree-indicator-distance-end:auto;--calcite-tree-icon-edge-distance-start:-0.2rem;--calcite-tree-icon-edge-distance-end:0;--calcite-tree-icon-content-distance-start:0.375rem;--calcite-tree-icon-content-distance-end:0;--calcite-tree-indent-start:1.4rem;--calcite-tree-indent-end:0;--calcite-tree-children-indent-start:0.25rem;--calcite-tree-children-indent-end:0;--calcite-tree-children-padding-start:1rem;--calcite-tree-children-padding-end:0;--calcite-tree-line-position-start:0.05rem;--calcite-tree-line-position-end:0;--calcite-tree-parent-line-position-start:-0.95rem;--calcite-tree-parent-line-position-end:0;--calcite-tree-line-width:1px;--calcite-tree-hover-line-width:3px}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tree-h{--calcite-tree-text:#d4d4d4;--calcite-tree-text-hover:#eaeaea;--calcite-tree-text-active:#f3f3f3;--calcite-tree-chevron:#555;--calcite-tree-chevron-hover:#959595;--calcite-tree-chevron-active:#00a0ff;--calcite-tree-indicator:#555;--calcite-tree-indicator-active:#00a0ff}/*!\@:host([lines])*/[lines].sc-calcite-tree-h{--calcite-tree-line:#eaeaea;--calcite-tree-line-hover:#cacaca;--calcite-tree-line-active:#007ac2}/*!\@:host([lines][theme=dark])*/[lines][theme=dark].sc-calcite-tree-h{--calcite-tree-line:#555;--calcite-tree-line-hover:grey;--calcite-tree-line-active:#00a0ff}/*!\@:host([size=s])*/[size=s].sc-calcite-tree-h{--calcite-tree-hover-line-width:2px;--calcite-tree-vertical-padding:0.1875rem;--calcite-tree-children-indent-start:0rem;--calcite-tree-children-padding-start:0.8rem;--calcite-tree-line-position-start:0.3rem;--calcite-tree-parent-line-position-start:-0.5rem}/*!\@:host([dir=rtl])*/[dir=rtl].sc-calcite-tree-h{--calcite-tree-indicator-first-start:0;--calcite-tree-indicator-first-end:0.1rem;--calcite-tree-indicator-distance-start:auto;--calcite-tree-indicator-distance-end:0.15rem;--calcite-tree-icon-edge-distance-start:auto;--calcite-tree-icon-edge-distance-end:-0.2rem;--calcite-tree-icon-content-distance-start:0;--calcite-tree-icon-content-distance-end:0.375rem;--calcite-tree-indent-start:0;--calcite-tree-indent-end:1.4rem;--calcite-tree-children-indent-start:0;--calcite-tree-children-indent-end:0.25rem;--calcite-tree-children-padding-start:0;--calcite-tree-children-padding-end:1rem;--calcite-tree-line-position-start:0;--calcite-tree-line-position-end:0.05rem;--calcite-tree-parent-line-position-start:0;--calcite-tree-parent-line-position-end:-0.95rem}/*!\@:host([dir=rtl][size=s])*/[dir=rtl][size=s].sc-calcite-tree-h{--calcite-tree-children-indent-end:0rem;--calcite-tree-children-padding-end:0.8rem;--calcite-tree-line-position-end:0.3rem;--calcite-tree-parent-line-position-end:-0.5rem}');
styles.set('sc-calcite-tree-item','\@charset \"UTF-8\";/*!\@:root*/.sc-calcite-tree-item:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}/*!\@:host([theme=dark])*/[theme=dark].sc-calcite-tree-item-h{--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}/*!\@:host([hidden])*/[hidden].sc-calcite-tree-item-h{display:none}/*!\@body*/body.sc-calcite-tree-item{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}/*!\@.overflow-hidden*/.overflow-hidden.sc-calcite-tree-item{overflow:hidden}/*!\@calcite-tab*/calcite-tab.sc-calcite-tree-item{display:none}/*!\@calcite-tab[is-active]*/calcite-tab[is-active].sc-calcite-tree-item{display:block}/*!\@a*/a.sc-calcite-tree-item{color:#007ac2}/*!\@:host*/.sc-calcite-tree-item-h{display:block;color:var(--calcite-tree-text);cursor:pointer;outline:none;max-width:100%}/*!\@::slotted(*),:host*/.sc-calcite-tree-item-s > *, .sc-calcite-tree-item-h{font-size:.875rem;line-height:1.5}/*!\@::slotted(*)*/.sc-calcite-tree-item-s > *{color:var(--calcite-tree-text)!important}/*!\@::slotted(*),::slotted(*):hover*/.sc-calcite-tree-item-s > *, .sc-calcite-tree-item-s > *:hover{text-decoration:none!important}/*!\@.calcite-tree-children*/.calcite-tree-children.sc-calcite-tree-item{z-index:1;margin-left:var(--calcite-tree-children-indent-start);margin-right:var(--calcite-tree-children-indent-end);padding-left:var(--calcite-tree-children-padding-start);padding-right:var(--calcite-tree-children-padding-end);position:relative;-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0;overflow:hidden;-webkit-transition:.15s cubic-bezier(.215,.44,.42,.88),opacity .15s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.15s cubic-bezier(.215,.44,.42,.88),opacity .15s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;height:0;-webkit-transform-origin:top;transform-origin:top}/*!\@.calcite-tree-children:after*/.calcite-tree-children.sc-calcite-tree-item:after{-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-line-position-start);right:var(--calcite-tree-line-position-end);top:0;position:absolute}/*!\@:host([expanded])>.calcite-tree-children*/[expanded].sc-calcite-tree-item-h > .calcite-tree-children.sc-calcite-tree-item{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1;height:auto}/*!\@:host([has-children]) .calcite-tree-children:focus:after,:host([has-children]) .calcite-tree-children:hover:after*/[has-children].sc-calcite-tree-item-h .calcite-tree-children.sc-calcite-tree-item:focus:after, [has-children].sc-calcite-tree-item-h .calcite-tree-children.sc-calcite-tree-item:hover:after{background:var(--calcite-tree-line-hover)}/*!\@.calcite-tree-node*/.calcite-tree-node.sc-calcite-tree-item{display:-ms-flexbox;display:flex;padding:var(--calcite-tree-vertical-padding) 0;padding-left:var(--calcite-tree-indent-start);padding-right:var(--calcite-tree-indent-end);position:relative}/*!\@.calcite-tree-node:before*/.calcite-tree-node.sc-calcite-tree-item:before{content:\"•\";left:var(--calcite-tree-indicator-distance-start);right:var(--calcite-tree-indicator-distance-end);opacity:0;color:var(--calcite-tree-indicator)}/*!\@.calcite-tree-node:after,.calcite-tree-node:before*/.calcite-tree-node.sc-calcite-tree-item:after, .calcite-tree-node.sc-calcite-tree-item:before{position:absolute;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}/*!\@.calcite-tree-node:after*/.calcite-tree-node.sc-calcite-tree-item:after{content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-parent-line-position-start);right:var(--calcite-tree-parent-line-position-end);top:0}/*!\@:host([depth=\"1\"])>.calcite-tree-node:after*/[depth=\"1\"].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:after{display:none}/*!\@:host([has-children])>.calcite-tree-node*/[has-children].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item{padding-left:0;padding-right:0}/*!\@:host([has-children])>.calcite-tree-node:before*/[has-children].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:before{display:none}/*!\@:host([depth=\"1\"])>.calcite-tree-children:before,:host([depth=\"1\"])>.calcite-tree-node:before*/[depth=\"1\"].sc-calcite-tree-item-h > .calcite-tree-children.sc-calcite-tree-item:before, [depth=\"1\"].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:before{left:var(--calcite-tree-indicator-first-start);right:var(--calcite-tree-indicator-first-end)}/*!\@.calcite-tree-node:hover:before,:host(:focus) .calcite-tree-node:before,:host([selected]) .calcite-tree-node:hover:before*/.calcite-tree-node.sc-calcite-tree-item:hover:before, .sc-calcite-tree-item-h:focus .calcite-tree-node.sc-calcite-tree-item:before, [selected].sc-calcite-tree-item-h .calcite-tree-node.sc-calcite-tree-item:hover:before{opacity:1}/*!\@.calcite-tree-node:hover:after,:host(:focus) .calcite-tree-node:after,:host([selected]) .calcite-tree-node:hover:after*/.calcite-tree-node.sc-calcite-tree-item:hover:after, .sc-calcite-tree-item-h:focus .calcite-tree-node.sc-calcite-tree-item:after, [selected].sc-calcite-tree-item-h .calcite-tree-node.sc-calcite-tree-item:hover:after{width:var(--calcite-tree-hover-line-width);background:var(--calcite-tree-line-hover);z-index:2}/*!\@.calcite-tree-node:hover ::slotted(*),:host(:focus) .calcite-tree-node ::slotted(*),:host([selected]) .calcite-tree-node:hover ::slotted(*)*/.calcite-tree-node:hover .sc-calcite-tree-item-s > *, .sc-calcite-tree-item-h:focus .calcite-tree-node .sc-calcite-tree-item-s > *, .sc-calcite-tree-item-h[selected] .calcite-tree-node:hover .sc-calcite-tree-item-s > *{color:var(--calcite-tree-text-hover)}/*!\@.calcite-tree-node:hover .calcite-tree-chevron,:host(:focus) .calcite-tree-node .calcite-tree-chevron,:host([selected]) .calcite-tree-node:hover .calcite-tree-chevron*/.calcite-tree-node.sc-calcite-tree-item:hover .calcite-tree-chevron.sc-calcite-tree-item, .sc-calcite-tree-item-h:focus .calcite-tree-node.sc-calcite-tree-item .calcite-tree-chevron.sc-calcite-tree-item, [selected].sc-calcite-tree-item-h .calcite-tree-node.sc-calcite-tree-item:hover .calcite-tree-chevron.sc-calcite-tree-item{fill:var(--calcite-tree-chevron-hover)}/*!\@.calcite-tree-node:hover .calcite-tree-indicator,:host(:focus) .calcite-tree-node .calcite-tree-indicator,:host([selected]) .calcite-tree-node:hover .calcite-tree-indicator*/.calcite-tree-node.sc-calcite-tree-item:hover .calcite-tree-indicator.sc-calcite-tree-item, .sc-calcite-tree-item-h:focus .calcite-tree-node.sc-calcite-tree-item .calcite-tree-indicator.sc-calcite-tree-item, [selected].sc-calcite-tree-item-h .calcite-tree-node.sc-calcite-tree-item:hover .calcite-tree-indicator.sc-calcite-tree-item{fill:var(--calcite-tree-indicator-hover)}/*!\@:host([selected])>.calcite-tree-node,:host([selected])>.calcite-tree-node:hover*/[selected].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item, [selected].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:hover{color:var(--calcite-tree-text-active);font-weight:500}/*!\@:host([selected])>.calcite-tree-node:before,:host([selected])>.calcite-tree-node:hover:before*/[selected].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:before, [selected].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:hover:before{opacity:1;color:var(--calcite-tree-indicator-active)}/*!\@:host([selected])>.calcite-tree-node:after,:host([selected])>.calcite-tree-node:hover:after*/[selected].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:after, [selected].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:hover:after{background:var(--calcite-tree-line-active);width:var(--calcite-tree-hover-line-width);z-index:2}/*!\@:host([selected])>.calcite-tree-node ::slotted(*),:host([selected])>.calcite-tree-node:hover ::slotted(*)*/.sc-calcite-tree-item-h[selected]>.calcite-tree-node .sc-calcite-tree-item-s > *, .sc-calcite-tree-item-h[selected]>.calcite-tree-node:hover .sc-calcite-tree-item-s > *{color:var(--calcite-tree-text-active)}/*!\@:host([has-children][expanded])>.calcite-tree-node*/[has-children][expanded].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item{color:var(--calcite-tree-text-active);font-weight:500}/*!\@:host([has-children][expanded])>.calcite-tree-node:after*/[has-children][expanded].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:after{background:var(--calcite-tree-line-active)}/*!\@:host([has-children][expanded])>.calcite-tree-node:before*/[has-children][expanded].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:before{opacity:1;color:var(--calcite-tree-indicator-active)}/*!\@:host([has-children][expanded])>.calcite-tree-node ::slotted(*)*/.sc-calcite-tree-item-h[has-children][expanded]>.calcite-tree-node .sc-calcite-tree-item-s > *{color:var(--calcite-tree-text-active)}/*!\@:host([has-children][expanded][selected])>.calcite-tree-node:after*/[has-children][expanded][selected].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item:after{background:var(--calcite-tree-line-active);width:var(--calcite-tree-hover-line-width);z-index:2}/*!\@.calcite-tree-chevron*/.calcite-tree-chevron.sc-calcite-tree-item{-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:0 0 auto;flex:0 0 auto;position:relative;-ms-flex-item-align:center;align-self:center;left:var(--calcite-tree-icon-edge-distance-start);right:var(--calcite-tree-icon-edge-distance-end);margin-right:var(--calcite-tree-icon-content-distance-start);margin-left:var(--calcite-tree-icon-content-distance-end);-webkit-transform:rotate(0deg);transform:rotate(0deg);fill:var(--calcite-tree-chevron)}/*!\@:host([dir=rtl]) .calcite-tree-chevron*/[dir=rtl].sc-calcite-tree-item-h .calcite-tree-chevron.sc-calcite-tree-item{-webkit-transform:rotate(180deg);transform:rotate(180deg)}/*!\@:host(:focus) .calcite-tree-chevron,:host(:hover) .calcite-tree-chevron*/.sc-calcite-tree-item-h:focus .calcite-tree-chevron.sc-calcite-tree-item, .sc-calcite-tree-item-h:hover .calcite-tree-chevron.sc-calcite-tree-item{fill:var(--calcite-tree-chevron-hover);stroke:var(--calcite-tree-chevron-hover);stroke-width:.75}/*!\@:host([expanded])>.calcite-tree-node>.calcite-tree-chevron*/[expanded].sc-calcite-tree-item-h > .calcite-tree-node.sc-calcite-tree-item > .calcite-tree-chevron.sc-calcite-tree-item{-webkit-transform:rotate(90deg);transform:rotate(90deg);fill:var(--calcite-tree-chevron-active);stroke-width:.75;stroke:var(--calcite-tree-chevron-active)}');

exports.bootstrapHydrate = bootstrapHydrate;
