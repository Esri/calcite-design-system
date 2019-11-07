export interface AlertInterface {
    currentAlert: string;
    queueLength: number;
}
declare const _default: {
    Provider: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{
        state: AlertInterface;
    }>;
    Consumer: import("@stencil/state-tunnel/dist/types/stencil.core").FunctionalComponent<{}>;
    injectProps: (Cstr: any, fieldList: import("@stencil/state-tunnel/dist/types/declarations").PropList<AlertInterface>) => void;
};
export default _default;
