export declare class CalciteTabs {
    el: HTMLElement;
    /**
     * Select theme (light or dark)
     */
    theme: "light" | "dark";
    /**
     * Align tab titles to the edge or fully justify them across the tab nav ("center")
     */
    layout: "center" | "inline";
    render(): any;
    /**
     * @internal
     */
    calciteTabTitleRegister(e: CustomEvent): void;
    /**
     * @internal
     */
    calciteTabTitleUnregister(e: CustomEvent): void;
    /**
     * @internal
     */
    calciteTabRegister(e: CustomEvent): void;
    /**
     * @internal
     */
    calciteTabUnregister(e: CustomEvent): void;
    /**
     * @internal
     *
     * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
     * attributes.
     */
    titles: HTMLCalciteTabTitleElement[];
    /**
     * @internal
     *
     * Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes.
     */
    tabs: HTMLCalciteTabElement[];
    /**
     * @internal
     *
     * Matches up elements from the internal `tabs` and `titles` to automatically
     * update the ARIA attributes and link `<calcite-tab>` and
     * `<calcite-tab-title>` components.
     */
    private registryHandler;
}
