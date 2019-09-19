export interface DropdownInterface {
    requestedDropdownGroup: string;
    requestedDropdownItem: string;
}
declare const _default: {
    Provider: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{
        state: DropdownInterface;
    }>;
    Consumer: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{}>;
    injectProps: (Cstr: any, fieldList: import("@stencil/state-tunnel/dist/types/declarations").PropList<DropdownInterface>) => void;
};
export default _default;
