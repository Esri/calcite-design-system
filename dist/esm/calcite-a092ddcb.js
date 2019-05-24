const BUILD = {"allRenderFn":true,"cmpDidLoad":true,"cmpDidUnload":false,"cmpDidUpdate":false,"cmpDidRender":false,"cmpWillLoad":true,"cmpWillUpdate":true,"cmpWillRender":false,"connectedCallback":true,"disconnectedCallback":true,"element":false,"event":true,"hasRenderFn":true,"lifecycle":true,"hostListener":true,"hostListenerTargetWindow":false,"hostListenerTargetDocument":false,"hostListenerTargetBody":false,"hostListenerTargetParent":true,"hostListenerTarget":true,"member":true,"method":true,"mode":false,"noVdomRender":false,"observeAttribute":true,"prop":true,"propMutable":true,"reflect":true,"scoped":false,"shadowDom":true,"slot":true,"slotRelocation":true,"state":true,"style":true,"svg":true,"updatable":true,"vdomAttribute":true,"vdomClass":true,"vdomFunctional":true,"vdomKey":true,"vdomListener":true,"vdomRef":true,"vdomRender":true,"vdomStyle":true,"vdomText":true,"watchCallback":true,"taskQueue":true,"lazyLoad":true,"hydrateServerSide":false,"cssVarShim":true,"hydrateClientSide":false,"isDebug":false,"isDev":false,"lifecycleDOMEvents":false,"profile":false,"hotModuleReplacement":false,"constructableCSS":true,"cssAnnotations":true};
const NAMESPACE = 'calcite';

const win = window;
const doc = document;
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    raf: (h) => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
};
const supportsShadowDom = !!doc.documentElement.attachShadow;
const supportsListenerOptions = /*@__PURE__*/ (() => {
    let supportsListenerOptions = false;
    try {
        doc.addEventListener('e', null, Object.defineProperty({}, 'passive', {
            get() { supportsListenerOptions = true; }
        }));
    }
    catch (e) { }
    return supportsListenerOptions;
})();
const supportsConstructibleStylesheets = (() => {
    try {
        new CSSStyleSheet();
        return true;
    }
    catch (e) { }
    return false;
})();

const hostRefs = new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerInstance = (lazyInstance, hostRef) => hostRefs.set(hostRef.$lazyInstance$ = lazyInstance, hostRef);
const registerHost = (elm) => {
    // TODO: it's so ugly, but minifies really well
    {
        const hostRef = {
            $flags$: 0,
            $hostElement$: elm
        };
        hostRef.$onReadyPromise$ = new Promise(r => hostRef.$onReadyResolve$ = r);
        {
            hostRef.$instanceValues$ = new Map();
        }
        return hostRefs.set(elm, hostRef);
    }
};
const isMemberInElement = (elm, memberName) => memberName in elm;

const consoleError = (e) => console.error(e);

const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
    // loadModuleImport
    const bundleId = cmpMeta.$lazyBundleIds$;
    return import(
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.(system|cjs)\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${''}`).then(importedModule => importedModule[cmpMeta.$tagName$.replace(/-/g, '_')], consoleError);
};

const styles = new Map();
const cssVarShim = win.__stencil_cssshim;

let queueCongestion = 0;
let queuePending = false;
const queueDomReads = [];
const queueDomWrites = [];
const queueDomWritesLow = [];
const queueTask = (queue) => (cb) => {
    // queue dom reads
    queue.push(cb);
    if (!queuePending) {
        queuePending = true;
        plt.raf(flush);
    }
};
const consume = (queue) => {
    for (let i = 0; i < queue.length; i++) {
        try {
            queue[i](performance.now());
        }
        catch (e) {
            consoleError(e);
        }
    }
    queue.length = 0;
};
const consumeTimeout = (queue, timeout) => {
    let i = 0;
    let ts = 0;
    while (i < queue.length && (ts = performance.now()) < timeout) {
        try {
            queue[i++](ts);
        }
        catch (e) {
            consoleError(e);
        }
    }
    if (i === queue.length) {
        queue.length = 0;
    }
    else if (i !== 0) {
        queue.splice(0, i);
    }
};
const flush = () => {
    queueCongestion++;
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
    consume(queueDomReads);
    const timeout = (plt.$flags$ & 6 /* queueMask */) === 2 /* appLoaded */
        ? performance.now() + (7 * Math.ceil(queueCongestion * (1.0 / 22.0)))
        : Infinity;
    // DOM WRITES!!!
    consumeTimeout(queueDomWrites, timeout);
    consumeTimeout(queueDomWritesLow, timeout);
    if (queueDomWrites.length > 0) {
        queueDomWritesLow.push(...queueDomWrites);
        queueDomWrites.length = 0;
    }
    if (queuePending = ((queueDomReads.length + queueDomWrites.length + queueDomWritesLow.length) > 0)) {
        // still more to do yet, but we've run out of time
        // let's let this thing cool off and try again in the next tick
        plt.raf(flush);
    }
    else {
        queueCongestion = 0;
    }
};
const writeTask = /*@__PURE__*/ queueTask(queueDomWrites);

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

function getDynamicImportFunction(namespace) {
    return `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
}

const patchEsm = () => {
    // @ts-ignore
    if (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return import('./css-shim-229ebf7a-229ebf7a.js');
    }
    return Promise.resolve();
};
const patchBrowser = async () => {
    // @ts-ignore
    const importMeta = "";
    if (importMeta !== '') {
        return Promise.resolve(new URL('.', importMeta).href);
    }
    else {
        const scriptElm = Array.from(doc.querySelectorAll('script')).find(s => (s.src.includes(`/${NAMESPACE}.esm.js`) ||
            s.getAttribute('data-namespace') === NAMESPACE));
        const resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, doc.baseURI));
        patchDynamicImport(resourcesUrl.href);
        if (!window.customElements) {
            // @ts-ignore
            await import('./dom-7eb7509a-7eb7509a.js');
        }
        return resourcesUrl.href;
    }
};
const patchDynamicImport = (base) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        win[importFunctionName] = new Function('w', 'return import(w);');
    }
    catch (e) {
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], { type: 'application/javascript' }));
                mod = new Promise(resolve => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const HYDRATED_CLASS = 'hydrated';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText) => {
    let style = styles.get(scopeId);
    if (supportsConstructibleStylesheets) {
        style = (style || new CSSStyleSheet());
        style.replace(cssText);
    }
    else {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, tagName, mode, hostElm) => {
    let scopeId = getScopeId(tagName, mode);
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
                    if (cssVarShim) {
                        styleElm = cssVarShim.createHostStyle(hostElm, scopeId, style);
                        const newScopeId = styleElm['s-sc'];
                        if (newScopeId) {
                            scopeId = newScopeId;
                            // we don't want to add this styleID to the appliedStyles Set
                            // since the cssVarShim might need to apply several different
                            // stylesheets for the same component
                            appliedStyles = null;
                        }
                    }
                    else {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    styleContainerNode.appendChild(styleElm);
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [
                ...styleContainerNode.adoptedStyleSheets,
                style
            ];
        }
    }
    return scopeId;
};
const attachStyles = (elm, cmpMeta, mode) => {
    const styleId = addStyle((supportsShadowDom && elm.shadowRoot)
        ? elm.shadowRoot
        : elm.getRootNode(), cmpMeta.$tagName$, mode, elm);
    if (cmpMeta.$flags$ & 10 /* needsScopedEncapsulation */) {
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
const getScopeId = (tagName, mode) => 'sc-' + (tagName);

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const stack = [];
function h(nodeName, vnodeData) {
    let children = null;
    let lastSimple = false;
    let simple = false;
    let i = arguments.length;
    let vkey;
    let vname;
    for (; i-- > 2;) {
        stack.push(arguments[i]);
    }
    while (stack.length > 0) {
        let child = stack.pop();
        if (child && child.pop !== undefined) {
            for (i = child.length; i--;) {
                stack.push(child[i]);
            }
        }
        else {
            if (typeof child === 'boolean') {
                child = null;
            }
            if ((simple = typeof nodeName !== 'function')) {
                if (child == null) {
                    child = '';
                }
                else if (typeof child === 'number') {
                    child = String(child);
                }
                else if (typeof child !== 'string') {
                    simple = false;
                }
            }
            if (simple && lastSimple) {
                children[children.length - 1].$text$ += child;
            }
            else if (children === null) {
                children = [simple ? { $flags$: 0, $text$: child } : child];
            }
            else {
                children.push(simple ? { $flags$: 0, $text$: child } : child);
            }
            lastSimple = simple;
        }
    }
    {
        if (vnodeData != null) {
            // normalize class / classname attributes
            if (vnodeData.className) {
                vnodeData['class'] = vnodeData.className;
            }
            if (typeof vnodeData['class'] === 'object') {
                for (i in vnodeData['class']) {
                    if (vnodeData['class'][i]) {
                        stack.push(i);
                    }
                }
                vnodeData['class'] = stack.join(' ');
                stack.length = 0;
            }
            if (vnodeData.key != null) {
                vkey = vnodeData.key;
            }
            if (vnodeData.name != null) {
                vname = vnodeData.name;
            }
        }
    }
    if (typeof nodeName === 'function') {
        // nodeName is a functional component
        return nodeName(vnodeData, children || [], vdomFnUtils);
    }
    const vnode = {
        $tag$: nodeName,
        $children$: children,
        $elm$: undefined,
        $flags$: 0
    };
    {
        vnode.$attrs$ = vnodeData;
    }
    {
        vnode.$text$ = undefined;
    }
    {
        vnode.$key$ = vkey;
    }
    {
        vnode.$name$ = vname;
    }
    return vnode;
}
const Host = {};
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
    if (memberName === 'class' && !isSvg) {
        // Class
        {
            const oldList = parseClassList(oldValue);
            const baseList = parseClassList(elm.className).filter(item => !oldList.includes(item));
            elm.className = baseList.concat(parseClassList(newValue).filter(item => !baseList.includes(item))).join(' ');
        }
    }
    else if (memberName === 'style') {
        // update style attribute, css properties and values
        {
            for (const prop in oldValue) {
                if (!newValue || newValue[prop] == null) {
                    if (prop.includes('-')) {
                        elm.style.removeProperty(prop);
                    }
                    else {
                        elm.style[prop] = '';
                    }
                }
            }
        }
        for (const prop in newValue) {
            if (!oldValue || newValue[prop] !== oldValue[prop]) {
                if (prop.includes('-')) {
                    elm.style.setProperty(prop, newValue[prop]);
                }
                else {
                    elm.style[prop] = newValue[prop];
                }
            }
        }
    }
    else if (memberName === 'key') ;
    else if (memberName === 'ref') {
        // minifier will clean this up
        if (newValue) {
            newValue(elm);
        }
    }
    else if (memberName.startsWith('on') && !isMemberInElement(elm, memberName)) {
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
        const isComplex = ['object', 'function'].includes(typeof newValue);
        if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
            try {
                elm[memberName] = newValue == null && elm.tagName.indexOf('-') === -1 ? '' : newValue;
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
        const isXlinkNs = isSvg && (memberName !== (memberName = memberName.replace(/^xlink\:?/, ''))) ? true : false;
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
const parseClassList = (value) => (!value) ? [] : value.split(' ');

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
            if (newVnodeAttrs[memberName] == null && oldVnodeAttrs[memberName] != null) {
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
    const newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    let oldVNode;
    if (!useNativeShadowDom) {
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
    else if (newVNode.$flags$ & 1 /* isSlotReference */) {
        // create a slot reference node
        newVNode.$elm$ = doc.createTextNode('');
    }
    else {
        // create element
        elm = newVNode.$elm$ = ((isSvgMode || newVNode.$tag$ === 'svg')
            ? doc.createElementNS(SVG_NS, newVNode.$tag$)
            : doc.createElement((newVNode.$flags$ & 2 /* isSlotFallback */) ? 'slot-fb' : newVNode.$tag$));
        {
            isSvgMode = newVNode.$tag$ === 'svg' ? true : (newVNode.$tag$ === 'foreignObject' ? false : isSvgMode);
        }
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if (isDef(scopeId) && elm['s-si'] !== scopeId) {
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
        if (newVNode.$tag$ === 'svg') {
            // Only reset the SVG context when we're exiting SVG element
            isSvgMode = false;
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
    let containerElm = ((parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
    let childNode;
    if (containerElm.shadowRoot && toLowerCase(containerElm.tagName) === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx, parentElm);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode, referenceNode(before));
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
            if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
                putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
            }
            patch(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
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
            if (idxInOld >= 0) {
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
    else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
const isSameVnode = (vnode1, vnode2) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.$tag$ === vnode2.$tag$) {
        if (vnode1.$tag$ === 'slot') {
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
    if (node && node['s-ol']) {
        // this node was relocated to a new location in the dom
        // because of some other component's slot
        // but we still have an html comment in place of where
        // it's original location was according to it's original vdom
        return node['s-ol'];
    }
    return node;
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
            if (newVNode.$tag$ === 'slot') ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if (isDef(oldChildren) && isDef(newChildren)) {
            // looks like there's child vnodes for both the old and new vnodes
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (isDef(newChildren)) {
            // no old child vnodes, but there are new child vnodes to add
            if (isDef(oldVNode.$text$)) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if (isDef(oldChildren)) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
    }
    else if (defaultHolder = elm['s-cr']) {
        // this element has slotted content
        defaultHolder.parentNode.textContent = newVNode.$text$;
    }
    else if (oldVNode.$text$ !== newVNode.$text$) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.textContent = newVNode.$text$;
    }
    {
        // reset svgMode when svg node is fully patched
        if (isSvgMode && 'svg' === newVNode.$tag$) {
            isSvgMode = false;
        }
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
                        if (!relocateNodes.some(r => r.nodeToRelocate === node)) {
                            // made some changes to slots
                            // let's make sure we also double check
                            // fallbacks are correctly hidden or shown
                            checkSlotFallbackVisibility = true;
                            node['s-sn'] = slotNameAttr;
                            // add to our list of nodes to relocate
                            relocateNodes.push({
                                slotRefNode: childNode,
                                nodeToRelocate: node
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
    if (vNode) {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(isDestroy ? null : vNode.$elm$);
        vNode.$children$ && vNode.$children$.forEach(vChild => {
            callNodeRefs(vChild, isDestroy);
        });
    }
};
const isHost = (node) => {
    return node && node.$tag$ === Host;
};
const renderVdom = (hostElm, hostRef, cmpMeta, renderFnResults) => {
    const oldVNode = hostRef.$vnode$ || { $flags$: 0 };
    hostTagName = toLowerCase(hostElm.tagName);
    if (isHost(renderFnResults)) {
        renderFnResults.$tag$ = null;
    }
    else {
        renderFnResults = h(null, null, renderFnResults);
    }
    if (cmpMeta.$attrsToReflect$) {
        renderFnResults.$attrs$ = renderFnResults.$attrs$ || {};
        cmpMeta.$attrsToReflect$.forEach(([propName, attribute]) => renderFnResults.$attrs$[attribute] = hostElm[propName]);
    }
    renderFnResults.$flags$ |= 4 /* isHost */;
    hostRef.$vnode$ = renderFnResults;
    renderFnResults.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm);
    {
        scopeId = hostElm['s-sc'];
    }
    {
        contentRef = hostElm['s-cr'];
        useNativeShadowDom = supportsShadowDom && (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) !== 0;
        // always reset
        checkSlotRelocate = checkSlotFallbackVisibility = false;
    }
    // synchronous patch
    patch(oldVNode, renderFnResults);
    {
        if (checkSlotRelocate) {
            relocateSlotContent(renderFnResults.$elm$);
            for (let i = 0; i < relocateNodes.length; i++) {
                const relocateNode = relocateNodes[i];
                if (!relocateNode.nodeToRelocate['s-ol']) {
                    // add a reference node marking this node's original location
                    // keep a reference to this node for later lookups
                    const orgLocationNode = doc.createTextNode('');
                    orgLocationNode['s-nr'] = relocateNode.nodeToRelocate;
                    relocateNode.nodeToRelocate.parentNode.insertBefore((relocateNode.nodeToRelocate['s-ol'] = orgLocationNode), relocateNode.nodeToRelocate);
                }
            }
            // while we're moving nodes around existing nodes, temporarily disable
            // the disconnectCallback from working
            plt.$flags$ |= 1 /* isTmpDisconnected */;
            for (let i = 0; i < relocateNodes.length; i++) {
                const relocateNode = relocateNodes[i];
                // by default we're just going to insert it directly
                // after the slot reference node
                const parentNodeRef = relocateNode.slotRefNode.parentNode;
                let insertBeforeNode = relocateNode.slotRefNode.nextSibling;
                let orgLocationNode = relocateNode.nodeToRelocate['s-ol'];
                while (orgLocationNode = orgLocationNode.previousSibling) {
                    let refNode = orgLocationNode['s-nr'];
                    if (refNode && refNode) {
                        if (refNode['s-sn'] === relocateNode.nodeToRelocate['s-sn']) {
                            if (parentNodeRef === refNode.parentNode) {
                                if ((refNode = refNode.nextSibling) && refNode && !refNode['s-nr']) {
                                    insertBeforeNode = refNode;
                                    break;
                                }
                            }
                        }
                    }
                }
                if ((!insertBeforeNode && parentNodeRef !== relocateNode.nodeToRelocate.parentNode) ||
                    (relocateNode.nodeToRelocate.nextSibling !== insertBeforeNode)) {
                    // we've checked that it's worth while to relocate
                    // since that the node to relocate
                    // has a different next sibling or parent relocated
                    if (relocateNode.nodeToRelocate !== insertBeforeNode) {
                        // add it back to the dom but in its new home
                        parentNodeRef.insertBefore(relocateNode.nodeToRelocate, insertBeforeNode);
                    }
                }
            }
            // done moving nodes around
            // allow the disconnect callback to work again
            plt.$flags$ &= ~1 /* isTmpDisconnected */;
        }
        if (checkSlotFallbackVisibility) {
            updateFallbackSlotVisibility(renderFnResults.$elm$);
        }
        // always reset
        relocateNodes.length = 0;
    }
};

const safeCall = async (instance, method) => {
    if (instance && instance[method]) {
        try {
            await instance[method]();
        }
        catch (e) {
            consoleError(e);
        }
    }
};
const scheduleUpdate = async (elm, hostRef, cmpMeta, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
    }
    const instance = hostRef.$lazyInstance$;
    if (isInitialLoad) {
        {
            await safeCall(instance, 'componentWillLoad');
        }
    }
    else {
        {
            await safeCall(instance, 'componentWillUpdate');
        }
    }
    // there is no ancestorc omponent or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    {
        writeTask(() => updateComponent(elm, hostRef, cmpMeta, isInitialLoad, instance));
    }
};
const updateComponent = (elm, hostRef, cmpMeta, isInitialLoad, instance) => {
    // updateComponent
    {
        hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
    }
    {
        elm['s-lr'] = false;
    }
    if (isInitialLoad) {
        // DOM WRITE!
        attachStyles(elm, cmpMeta, hostRef.$modeName$);
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
                renderVdom(elm, hostRef, cmpMeta, instance.render());
            }
            catch (e) {
                consoleError(e);
            }
            hostRef.$flags$ &= ~4 /* isActiveRender */;
        }
    }
    if (cssVarShim) {
        cssVarShim.updateHost(elm);
    }
    // set that this component lifecycle rendering has completed
    {
        elm['s-lr'] = true;
    }
    {
        hostRef.$flags$ |= 2 /* hasRendered */;
    }
    if (elm['s-rc'].length > 0) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        elm['s-rc'].forEach(cb => cb());
        elm['s-rc'].length = 0;
    }
    postUpdateComponent(elm, hostRef);
};
const postUpdateComponent = (elm, hostRef, ancestorsActivelyLoadingChildren) => {
    if (!elm['s-al']) {
        const instance = hostRef.$lazyInstance$;
        const ancestorComponent = hostRef.$ancestorComponent$;
        if (!(hostRef.$flags$ & 512 /* hasLoadedComponent */)) {
            hostRef.$flags$ |= 512 /* hasLoadedComponent */;
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
            if (!ancestorComponent) {
                // on appload
                // we have finish the first big initial render
                doc.documentElement.classList.add(HYDRATED_CLASS);
                {
                    setTimeout(() => plt.$flags$ |= 2 /* appLoaded */, 999);
                }
            }
        }
        // load events fire from bottom to top
        // the deepest elements load first then bubbles up
        if (ancestorComponent) {
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

const disconnectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        {
            if (hostRef.$rmListeners$) {
                hostRef.$rmListeners$();
                hostRef.$rmListeners$ = undefined;
            }
        }
        // clear CSS var-shim tracking
        if (cssVarShim) {
            cssVarShim.removeHost(elm);
        }
        const instance = hostRef.$lazyInstance$;
        {
            safeCall(instance, 'disconnectedCallback');
        }
    }
};

const parsePropertyValue = (propValue, expectedPropType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && typeof propValue !== 'object' && typeof propValue !== 'function') {
        if (expectedPropType & 4 /* Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return (propValue === 'false' ? false : propValue === '' || !!propValue);
        }
        if (expectedPropType & 2 /* Number */) {
            // force it to be a number
            return parseFloat(propValue);
        }
        if (expectedPropType & 1 /* String */) {
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

const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm = hostRef.$hostElement$;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    if (newVal !== oldVal && (!(flags & 8 /* isConstructingInstance */) || oldVal === undefined)) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if (hostRef.$lazyInstance$) {
            // get an array of method names of watch functions to call
            if (cmpMeta.$watchers$ &&
                (flags & (1 /* hasConnected */ | 8 /* isConstructingInstance */)) === 1 /* hasConnected */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.forEach(watchMethodName => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            (hostRef.$lazyInstance$)[watchMethodName].call((hostRef.$lazyInstance$), newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e);
                        }
                    });
                }
            }
            if ((flags & (4 /* isActiveRender */ | 2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(elm, hostRef, cmpMeta, false);
            }
        }
    }
};

const proxyComponent = (Cstr, cmpMeta, isElementConstructor, proxyState) => {
    if (cmpMeta.$members$) {
        if (Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        members.forEach(([memberName, [memberFlags]]) => {
            if ((memberFlags & 31) || (proxyState && (memberFlags & 32 /* State */))) {
                // proxyComponent - prop
                Object.defineProperty(Cstr.prototype, memberName, {
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
            else if (isElementConstructor && (memberFlags & 64 /* Method */)) {
                // proxyComponent - method
                Object.defineProperty(Cstr.prototype, memberName, {
                    value(...args) {
                        const ref = getHostRef(this);
                        return ref.$onReadyPromise$.then(() => ref.$lazyInstance$[memberName](...args));
                    }
                });
            }
        });
        if (isElementConstructor) {
            const attrNameToPropName = new Map();
            Cstr.prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                const propName = attrNameToPropName.get(attrName);
                this[propName] = newValue === null && typeof this[propName] === 'boolean'
                    ? false
                    : newValue;
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if (m[0] & 512 /* ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};

const addEventListeners = (elm, hostRef, listeners) => {
    const removeFns = listeners.map(([flags, name, method]) => {
        const target = (getHostListenerTarget(elm, flags));
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
            if (hostRef.$lazyInstance$) {
                // instance is ready, let's call it's member method for this event
                return hostRef.$lazyInstance$[methodName](ev);
            }
            else {
                return hostRef.$onReadyPromise$.then(() => hostRef.$lazyInstance$[methodName](ev)).catch(consoleError);
            }
        }
    };
};
const getHostListenerTarget = (elm, flags) => {
    if (flags & 16 /* TargetParent */)
        return elm.parentElement;
    return elm;
};
const hostListenerOpts = (flags) => supportsListenerOptions ?
    {
        'passive': (flags & 1 /* Passive */) !== 0,
        'capture': (flags & 2 /* Capture */) !== 0,
    }
    : (flags & 2 /* Capture */) !== 0;

const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ((hostRef.$flags$ & 256 /* hasInitializedComponent */) === 0) {
        // we haven't initialized this element yet
        hostRef.$flags$ |= 256 /* hasInitializedComponent */;
        {
            // lazy loaded components
            // request the component's implementation to be
            // wired up with the host element
            Cstr = await loadModule(cmpMeta, hostRef, hmrVersionId);
            if (!Cstr.isProxied) {
                // we'eve never proxied this Constructor before
                // let's add the getters/setters to its prototype before
                // the first time we create an instance of the implementation
                {
                    cmpMeta.$watchers$ = Cstr.watchers;
                }
                proxyComponent(Cstr, cmpMeta, 0, 1);
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
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        if (!Cstr.isStyleRegistered && Cstr.style) {
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            let scopeId = getScopeId(cmpMeta.$tagName$, hostRef.$modeName$);
            if (cmpMeta.$flags$ & 8 /* needsShadowDomShim */) {
                style = await import('./shadow-css-984bac74-549b16dd.js').then(m => m.scopeCss(style, scopeId, false));
            }
            registerStyle(scopeId, style);
            Cstr.isStyleRegistered = true;
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    if (ancestorComponent && !ancestorComponent['s-lr'] && ancestorComponent['s-rc']) {
        // this is the intial load and this component it has an ancestor component
        // but the ancestor component has NOT fired its will update lifecycle yet
        // so let's just cool our jets and wait for the ancestor to continue first
        ancestorComponent['s-rc'].push(() => 
        // this will get fired off when the ancestor component
        // finally gets around to rendering its lazy self
        // fire off the initial update
        initializeComponent(elm, hostRef, cmpMeta));
    }
    else {
        scheduleUpdate(elm, hostRef, cmpMeta, true);
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
        if (cmpMeta.$listeners$) {
            // initialize our event listeners on the host element
            // we do this now so that we can listening to events that may
            // have fired even before the instance is ready
            hostRef.$rmListeners$ = addEventListeners(elm, hostRef, cmpMeta.$listeners$);
        }
        if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* hasConnected */;
            let hostId;
            if (!hostId) {
                // initUpdate
                // if the slot polyfill is required we'll need to put some nodes
                // in here to act as original content anchors as we move nodes around
                // host element has been connected to the DOM
                if (cmpMeta.$flags$ & 4 ||
                    (cmpMeta.$flags$ & 8 /* needsShadowDomShim */)) {
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
                    if ((ancestorComponent['s-init'] && !ancestorComponent['s-lr']) || (BUILD.hydrateClientSide && ancestorComponent.nodeType === 1 /* ElementNode */ && ancestorComponent.hasAttribute('s-id'))) {
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
            // Lazy properties
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if (cmpMeta.$members$) {
                Object.entries(cmpMeta.$members$).forEach(([memberName, [memberFlags]]) => {
                    if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
                        const value = elm[memberName];
                        delete elm[memberName];
                        elm[memberName] = value;
                    }
                });
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
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

const bootstrapLazy = (lazyBundles, options = {}) => {
    const cmpTags = [];
    const exclude = options.exclude || [];
    const head = doc.head;
    const customElements = win.customElements;
    const y = /*@__PURE__*/ head.querySelector('meta[charset]');
    const visibilityStyle = /*@__PURE__*/ doc.createElement('style');
    Object.assign(plt, options);
    plt.$resourcesUrl$ = new URL(options.resourcesUrl || '/', doc.baseURI).href;
    if (options.syncQueue) {
        plt.$flags$ |= 4 /* queueSync */;
    }
    lazyBundles.forEach(lazyBundle => lazyBundle[1].forEach(compactMeta => {
        const cmpMeta = {
            $flags$: compactMeta[0],
            $tagName$: compactMeta[1],
            $members$: compactMeta[2],
            $listeners$: compactMeta[3],
        };
        {
            cmpMeta.$attrsToReflect$ = [];
        }
        {
            cmpMeta.$watchers$ = {};
        }
        if (!supportsShadowDom && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            cmpMeta.$flags$ |= 8 /* needsShadowDomShim */;
        }
        const tagName = cmpMeta.$tagName$;
        const HostElement = class extends HTMLElement {
            // StencilLazyHost
            constructor(self) {
                // @ts-ignore
                super(self);
                self = this;
                {
                    this['s-lr'] = false;
                    this['s-rc'] = [];
                }
                registerHost(self);
                if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
                    // this component is using shadow dom
                    // and this browser supports shadow dom
                    // add the read-only property "shadowRoot" to the host element
                    if (supportsShadowDom) {
                        self.attachShadow({ 'mode': 'open' });
                    }
                    else if (!('shadowRoot' in self)) {
                        self.shadowRoot = self;
                    }
                }
            }
            connectedCallback() {
                connectedCallback(this, cmpMeta);
            }
            disconnectedCallback() {
                disconnectedCallback(this);
            }
            's-init'() {
                const hostRef = getHostRef(this);
                if (hostRef.$lazyInstance$) {
                    postUpdateComponent(this, hostRef);
                }
            }
            's-hmr'(hmrVersionId) {
            }
            forceUpdate() {
                {
                    const hostRef = getHostRef(this);
                    scheduleUpdate(this, hostRef, cmpMeta, false);
                }
            }
            componentOnReady() {
                return getHostRef(this).$onReadyPromise$;
            }
        };
        cmpMeta.$lazyBundleIds$ = lazyBundle[0];
        if (!exclude.includes(tagName) && !customElements.get(tagName)) {
            cmpTags.push(tagName);
            customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1, 0));
        }
    }));
    // visibilityStyle.innerHTML = cmpTags.map(t => `${t}:not(.hydrated)`) + '{display:none}';
    visibilityStyle.innerHTML = cmpTags + '{visibility:hidden}.hydrated{visibility:inherit}';
    visibilityStyle.setAttribute('data-styles', '');
    head.insertBefore(visibilityStyle, y ? y.nextSibling : head.firstChild);
};

const createEvent = (ref, name, flags) => {
    const elm = getElement(ref);
    return {
        emit: (detail) => elm.dispatchEvent(new (CustomEvent)(name, {
            bubbles: !!(flags & 4 /* Bubbles */),
            composed: !!(flags & 2 /* Composed */),
            cancelable: !!(flags & 1 /* Cancellable */),
            detail
        }))
    };
};

const getElement = (ref) => getHostRef(ref).$hostElement$;

export { patchBrowser as a, bootstrapLazy as b, patchEsm as c, h as d, registerInstance as e, createEvent as f, Host as g, getElement as h };
