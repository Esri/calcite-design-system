import { EventEmitter } from "../../stencil-public-runtime";
import { DataSeries } from "../../interfaces/Graph";
export declare class CalciteSlider {
    el: HTMLElement;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** Disable and gray out the slider */
    disabled: boolean;
    /** Minimum selectable value */
    min: number;
    /** Maximum selectable value */
    max: number;
    /** Currently selected number (if single select) */
    value: null | number;
    /** Currently selected lower number (if multi-select) */
    minValue?: number;
    /** Currently selected upper number (if multi-select) */
    maxValue?: number;
    /** Label for first (or only) handle (ex. "Temperature, lower bound") */
    minLabel: string;
    /** Label for second handle if needed (ex. "Temperature, upper bound") */
    maxLabel?: string;
    /** Snap selection along the step interval */
    snap?: boolean;
    /** Interval to move on up/down keys */
    step?: number;
    /** Interval to move on page up/page down keys */
    pageStep?: number;
    /** Show tick marks on the number line at provided interval */
    ticks?: number;
    /** Label tick marks with their numeric value. */
    labelTicks?: boolean;
    /** Label handles with their numeric value */
    labelHandles?: boolean;
    /** Use finer point for handles */
    precise?: boolean;
    /** Display a histogram above the slider */
    histogram?: DataSeries;
    histogramWatcher(newHistogram: any): void;
    /** Indicates if a histogram is present */
    hasHistogram: boolean;
    componentWillLoad(): void;
    componentDidRender(): void;
    render(): any;
    private renderGraph;
    private renderTickLabel;
    handleLabelFocus(e: any): void;
    keyDownHandler(e: KeyboardEvent): void;
    clickHandler(e: MouseEvent): void;
    /**
     * Fires on all updates to the slider.
     * :warning: Will be fired frequently during drag. If you are performing any
     * expensive operations consider using a debounce or throttle to avoid
     * locking up the main thread.
     */
    calciteSliderUpdate: EventEmitter;
    setFocus(): Promise<void>;
    /** @internal */
    private guid;
    /** @internal */
    private isRange;
    /** @internal */
    private dragProp;
    /** @internal */
    private lastDragProp;
    /** @internal */
    private minHandle;
    /** @internal */
    private maxHandle;
    /** @internal */
    private dragListener;
    /** @internal */
    private tickValues;
    /** @internal */
    private activeProp;
    /** @internal */
    private minMaxValueRange;
    /** @internal */
    private minValueDragRange;
    /** @internal */
    private maxValueDragRange;
    private generateTickValues;
    private dragStart;
    private dragUpdate;
    private dragEnd;
    /**
     * If number is outside range, constrain to min or max
     * @internal
     */
    private bound;
    /**
     * Translate a pixel position to value along the range
     * @internal
     */
    private translate;
    /**
     * Get closest allowed value along stepped values
     * @internal
     */
    private getClosestStep;
    private getFontSizeForElement;
    /**
     * Get position of value along range as fractional value
     * @return {number} number in the unit interval [0,1]
     * @internal
     */
    private getUnitInterval;
    private adjustHostObscuredHandleLabel;
    private hyphenateCollidingRangeHandleLabels;
    /**
     * Hides bounding tick labels that are obscured by either handle.
     */
    private hideObscuredBoundingTickLabels;
    /**
     * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
     * @internal
     */
    private getHostOffset;
    /**
     * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
     * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
     * @param minValueLabel
     * @param valueLabel
     */
    private getRangeLabelOverlap;
    /**
     * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle button element.
     * @param minLabel
     * @param handle
     */
    private isMinTickLabelObscured;
    /**
     * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle button element.
     * @param maxLabel
     * @param handle
     */
    private isMaxTickLabelObscured;
}
