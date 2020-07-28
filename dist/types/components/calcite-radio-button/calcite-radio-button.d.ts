import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteRadioButton {
    el: HTMLElement;
    /** The checked state of the radio button. */
    checked: boolean;
    checkedChanged(newChecked: boolean, oldChecked: boolean): void;
    /** The disabled state of the radio button. */
    disabled?: boolean;
    disabledChanged(disabled: boolean): void;
    /** The focused state of the radio button. */
    focused: boolean;
    focusedChanged(focused: boolean): void;
    /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
    guid: string;
    /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
    hidden: boolean;
    hiddenChanged(newHidden: boolean): void;
    /** The name of the radio button.  <code>name</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
    name: string;
    nameChanged(newName: string): void;
    /** Requires that a value is selected for the radio button group before the parent form will submit. */
    required: boolean;
    requiredChanged(required: boolean): void;
    /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
    scale: "s" | "m" | "l";
    validateScale(newScale: string): void;
    /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
    theme: "light" | "dark";
    validateTheme(newTheme: string): void;
    /** The value of the radio button. */
    value: string;
    private input;
    private titleAttributeObserver;
    private checkFirstRadioButton;
    private setupTitleAttributeObserver;
    private uncheckOtherRadioButtonsInGroup;
    calciteRadioButtonChange: EventEmitter;
    check(): void;
    onInputBlur(): void;
    connectedCallback(): void;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    private renderHiddenRadioInput;
    render(): any;
}
