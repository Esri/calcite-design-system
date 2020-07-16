import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteInput {
    el: HTMLCalciteInputElement;
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
    /** optionally display a clear button that displays when field has a value  */
    /** shows by default for search, time, date */
    /** will not display for type="textarea" */
    clearable?: boolean;
    /** input step */
    step?: number;
    /** input min */
    min?: number;
    /** input max */
    max?: number;
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
    /** is the input disabled  */
    disabled?: boolean;
    /** watcher to update number-to-string for min max */
    minWatcher(): void;
    maxWatcher(): void;
    stepWatcher(): void;
    connectedCallback(): void;
    componentDidLoad(): void;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    render(): any;
    handleLabelFocus(e: any): void;
    keyDownHandler(e: any): void;
    calciteInputFocus: EventEmitter;
    calciteInputBlur: EventEmitter;
    calciteInputInput: EventEmitter;
    /** focus the rendered child element */
    setFocus(): Promise<void>;
    /** keep track of the rendered child type */
    private childElType?;
    /** keep track of the rendered child type */
    private childEl?;
    /** determine if there is a slotted action for styling purposes */
    private hasAction;
    /** determine if there is a slotted action for styling purposes */
    private slottedActionEl?;
    /** track if the input is clearable */
    private isClearable;
    private minString?;
    private maxString?;
    private stepString?;
    /** map icons to colors */
    private iconTypeDefaults;
    private inputInputHandler;
    private inputBlurHandler;
    private inputFocusHandler;
    private determineClearable;
    private getAttributes;
    private clearInputValue;
    private updateNumberValue;
}
