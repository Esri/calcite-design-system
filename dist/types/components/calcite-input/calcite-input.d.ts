import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteInput {
    el: HTMLElement;
    /** specify the status of the input field, determines message and icons */
    status: "invalid" | "valid" | "idle";
    /** specify if the input is in loading state */
    loading: boolean;
    /** specify the scale of the input, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the alignment of the value of the input */
    alignment: "start" | "end";
    /** input value */
    value?: string;
    /** input step */
    step?: string;
    /** input min */
    min?: string;
    /** input max */
    max?: string;
    /** optionally add prefix  **/
    prefixText?: string;
    /** optionally add suffix  **/
    suffixText?: string;
    /** for recognized input types, show an icon if applicable */
    icon: string | boolean;
    /** specify the input type */
    type: "color" | "date" | "datetime-local" | "email" | "file" | "image" | "month" | "number" | "password" | "search" | "tel" | "text" | "textarea" | "time" | "url" | "week";
    /** specify the placement of the number buttons */
    numberButtonType?: "vertical" | "horizontal" | "none";
    /** specify the alignment of dropdown, defaults to left */
    theme: "light" | "dark";
    /** is the input required */
    required: boolean;
    /** should the input autofocus */
    autofocus: boolean;
    /** explicitly whitelist placeholder attribute */
    placeholder: string;
    connectedCallback(): void;
    componentDidLoad(): void;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    render(): any;
    calciteInputLabelSelected(e: CustomEvent): void;
    calciteInputFocus: EventEmitter;
    calciteInputBlur: EventEmitter;
    calciteInputChange: EventEmitter;
    /** focus the rendered child element */
    setFocus(): Promise<void>;
    /** keep track of the rendered child type */
    private childElType?;
    /** keep track of the rendered child type */
    private childEl?;
    /** determine if there is a slotted action for styling purposes */
    private hasAction;
    /** map icons to colors */
    private iconTypeDefaults;
    private focusChildEl;
    private inputChangeHandler;
    private inputBlurHandler;
    private inputFocusHandler;
    private getAttributes;
    private updateNumberValue;
}
