import { Scale } from "../../interfaces/Icon";
import { Theme } from "../../interfaces/common";
export declare class CalciteIcon {
    el: HTMLElement;
    /**
     * When true, the icon will be filled.
     */
    filled: boolean;
    /**
     * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
     */
    icon: string;
    /**
     * When true, the icon will be mirrored when the element direction is 'rtl'.
     */
    mirrored: boolean;
    /**
     * Icon scale. Can be "s" | "m" | "l".
     */
    scale: Scale;
    /**
     * The icon label.
     *
     * It is recommended to set this value if your icon is semantic.
     */
    textLabel: string;
    /**
     * Icon theme. Can be "light" or "dark".
     */
    theme: Theme;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): Promise<void>;
    render(): any;
    private intersectionObserver;
    private pathData;
    private visible;
    private loadIconPathData;
    private waitUntilVisible;
}
