import { throttle } from "es-toolkit";
import { createRef } from "lit/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/lumina/controllers";
import { PropertyValues } from "lit";
import { getLabelText } from "../../utils/label";
import { type LabelableComponent, useLabel } from "../../controllers/useLabel";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { createObserver, updateRefObserver } from "../../utils/observers";
import { guid } from "../../utils/guid";
import { Status } from "../interfaces";
import { InternalLabel } from "../functional/InternalLabel";
import { Validation } from "../functional/Validation";
import { TextualInputComponent } from "../input/common/input";
import { IconName } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { useCancelable } from "../../controllers/useCancelable";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { useForm } from "../../controllers/useForm";
import { CharacterLengthObj } from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS, NO_DIMENSIONS, RESIZE_TIMEOUT, SLOTS } from "./resources";
import { styles } from "./text-area.scss";
import type CommonT9nStrings from "../../../assets/common/t9n/messages.en.json";

declare global {
  interface DeclareElements {
    "calcite-text-area": TextArea;
  }
}

/**
 * @slot - A slot for adding text.
 * @slot label-content - A slot for rendering content next to the component's `labelText`.
 * @slot footer-start - A slot for adding content to the start of the component's footer.
 * @slot footer-end - A slot for adding content to the end of the component's footer.
 */
export class TextArea
  extends LitElement
  implements LabelableComponent, Omit<TextualInputComponent, "pattern">
{
  //#region Static Members

  static formAssociated = true;

  static override styles = styles;

  //#endregion

  //#region Private Properties

  attributeWatch = useWatchAttributes(
    ["autofocus", "spellcheck"],
    this.handleGlobalAttributesChanged,
  );

  defaultValue?: TextArea["value"];

  private footerRef = createRef<HTMLElement>();

  private loaderContainerRef = createRef<HTMLDivElement>();

  formSupport = useForm<this>({
    inputType: "text",
  })(this);

  private guid = guid();

  labelEl?: Label["el"];

  private textAreaEl?: HTMLTextAreaElement;

  private localizedCharacterLengthObj!: CharacterLengthObj;

  private resizeObserver = createObserver("resize", async () => {
    await this.componentOnReady();
    const { textAreaHeight, textAreaWidth, loaderHeight, elWidth, footerHeight, footerWidth } =
      this.getHeightAndWidthOfElements();
    if (footerWidth > 0 && footerWidth !== textAreaWidth) {
      this.footerRef.value!.style.width = `${textAreaWidth}px`;
    }

    if (this.resize === "none") {
      return;
    }

    const { width: elStyleWidth, height: elStyleHeight } = getComputedStyle(this.el);
    if (this.dimensionsDiffer(elWidth, textAreaWidth) && elStyleWidth !== "auto") {
      this.updateSizeToAuto("width");
    }
    if (
      loaderHeight > 0 &&
      textAreaHeight > 0 &&
      footerHeight > 0 &&
      this.dimensionsDiffer(loaderHeight, textAreaHeight + footerHeight) &&
      elStyleHeight !== "auto"
    ) {
      this.updateSizeToAuto("height");
    }
  });

  private cancelable = useCancelable<this>()(this);

  // height and width are set to auto here to avoid overlapping on to neighboring elements in the layout when user starts resizing.
  // throttle is used to avoid flashing of textarea when user resizes.
  private updateSizeToAuto = throttle(
    (dimension: "height" | "width"): void => {
      this.el.style[dimension] = "auto";
    },
    RESIZE_TIMEOUT,
    { edges: ["trailing"] },
  );

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  /**
   * @private
   */
  messagesCommon = useT9n<typeof CommonT9nStrings>({ name: "common" });

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  labelable = useLabel(this);

  //#endregion

  //#region State Properties

  @state() endSlotHasElements = false;

  @state() startSlotHasElements = false;

  //#endregion

  //#region Public Properties

  /**
   * Specifies the component's number of columns.
   *
   * @see [MDN - cols](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols)
   */
  @property({ reflect: true }) columns?: number;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @see [MDN - disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @property({ reflect: true }) disabled = false;

  /** @copyDoc */
  @property({ reflect: true }) form?: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /** @copyDoc */
  @property() label?: string;

  /** @copyDoc */
  @property() labelText?: string;

  /**
   * When `true`, prevents input beyond the `maxLength` value, mimicking native text area behavior.
   */
  @property({ reflect: true }) limitText = false;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * When the component resides in a form,
   * specifies the maximum number of characters allowed.
   *
   * @see [MDN - maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-maxlength)
   */
  @property({ reflect: true }) maxLength?: number;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides &
    typeof this.messagesCommon._overrides;

  /**
   * When the component resides in a form,
   * specifies the minimum number of characters allowed.
   *
   * @see [MDN - minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-minlength)
   */
  @property({ reflect: true }) minLength?: number;

  /**
   * Specifies the name of the component. Required to pass the component's value on form submission.
   *
   * @see [MDN - name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-name)
   */
  @property({ reflect: true }) name?: string;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem?: NumberingSystem;

  /**
   * Specifies the placeholder text for the component.
   *
   * @see [MDN - placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-placeholder)
   */
  @property() placeholder?: string;

  /**
   * When `true`, the component's `value` can be read, but cannot be modified.
   *
   * @see [MDN - readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @property({ reflect: true }) readOnly = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   *
   * @see [MDN - required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
   */
  @property({ reflect: true }) required = false;

  /** Specifies if the component is resizable. */
  @property({ reflect: true }) resize: "both" | "horizontal" | "vertical" | "none" = "both";

  /**
   * Specifies the component's number of rows.
   *
   * @see [MDN - rows](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows)
   */
  @property({ reflect: true }) rows?: number;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean, type: String }) validationIcon?:
    | IconName
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage?: string;

  /**
   * @copyDoc
   *
   * @readonly
   * @see [MDN - ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property({ readOnly: true }) validity!: ValidityState;

  /** The component's value. */
  @property() value = "";

  /**
   * Specifies the wrapping mechanism for the text.
   *
   * @see [MDN - wrap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap)
   */
  @property({ reflect: true }) wrap: "soft" | "hard" = "soft";

  //#endregion

  //#region Public Methods

  /** Selects the text of the component's `value`. */
  @method()
  async selectText(): Promise<void> {
    await this.componentOnReady();
    this.textAreaEl?.select();
  }

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.textAreaEl, options);
  }

  //#endregion

  //#region Events

  /** Fires each time a new `value` is typed and committed. */
  calciteTextAreaChange = createEvent();

  /** Fires each time a new `value` is typed. */
  calciteTextAreaInput = createEvent();

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.cancelable.add(this.updateSizeToAuto);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    let numberFormatOptionsChanged = false;

    if (
      changes.has("messages") ||
      changes.has("numberingSystem") ||
      changes.has("groupSeparator")
    ) {
      numberFormatOptionsChanged = true;
    }

    if (changes.has("value") || changes.has("maxLength") || numberFormatOptionsChanged) {
      this.updateNumberFormatter();

      this.localizedCharacterLengthObj = this.getLocalizedCharacterLength();
      this.formSupport.setCustomValidity(
        this.isCharacterLimitExceeded() ? this.replacePlaceholdersInMessages() : "",
      );
    }
  }

  override updated(): void {
    this.setTextAreaHeight();
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private dimensionsDiffer(dimensionA: number, dimensionB: number): boolean {
    const dimensionTolerance = 1;
    return Math.abs(dimensionA - dimensionB) > dimensionTolerance;
  }

  private updateNumberFormatter(): void {
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "never",
      useGrouping: this.groupSeparator,
    };
  }

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private handleInput(event: InputEvent): void {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.calciteTextAreaInput.emit();
  }

  private handleChange(): void {
    this.calciteTextAreaChange.emit();
  }

  private contentSlotChangeHandler(): void {
    if (!this.value) {
      const nodes = this.el.childNodes;
      nodes.forEach((el) => {
        if (el.nodeName === "#text" && el.nodeValue) {
          this.value = el.nodeValue.trim();
        }
      });
    }
  }

  private getLocalizedCharacterLength(): CharacterLengthObj {
    const currentLength = this.value?.length.toString() || "0";
    const maxLength = this.maxLength?.toString() || "0";
    if (this.numberingSystem === "latn") {
      return { currentLength, maxLength };
    }

    return {
      currentLength: numberStringFormatter.localize(currentLength),
      maxLength: numberStringFormatter.localize(maxLength),
    };
  }

  private setTextAreaEl(el: HTMLTextAreaElement): void {
    updateRefObserver(this.resizeObserver, this.textAreaEl, el);
    this.textAreaEl = el;
  }

  private setTextAreaHeight(): void {
    const { textAreaHeight, loaderHeight, footerHeight } = this.getHeightAndWidthOfElements();
    if (loaderHeight <= 0 || textAreaHeight <= 0 || footerHeight <= 0) {
      return;
    }

    if (this.dimensionsDiffer(textAreaHeight + footerHeight, loaderHeight)) {
      this.textAreaEl!.style.height = `${loaderHeight - footerHeight}px`;
    }
  }

  private getHeightAndWidthOfElements(): {
    textAreaHeight: number;
    textAreaWidth: number;
    loaderHeight: number;
    elWidth: number;
    footerHeight: number;
    footerWidth: number;
  } {
    const { height: textAreaHeight, width: textAreaWidth } = this.textAreaEl
      ? this.textAreaEl.getBoundingClientRect()
      : NO_DIMENSIONS;
    const { height: loaderHeight } = this.loaderContainerRef.value
      ? this.loaderContainerRef.value.getBoundingClientRect()
      : NO_DIMENSIONS;
    const { width: elWidth } = this.el.getBoundingClientRect();
    const { height: footerHeight, width: footerWidth } = this.footerRef.value
      ? this.footerRef.value.getBoundingClientRect()
      : NO_DIMENSIONS;

    return {
      textAreaHeight,
      textAreaWidth,
      loaderHeight,
      elWidth,
      footerHeight,
      footerWidth,
    };
  }

  private replacePlaceholdersInMessages(): string {
    return this.messages.tooLong
      .replace("{maxLength}", this.localizedCharacterLengthObj.maxLength)
      .replace("{currentLength}", this.localizedCharacterLengthObj.currentLength);
  }

  private isCharacterLimitExceeded(): boolean {
    return (this.maxLength !== undefined && this.value?.length > this.maxLength) || false;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const hasFooter = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
    const loader = (
      <div class={CSS.loader}>
        <calcite-progress label={this.messagesCommon.loading} type="indeterminate" />
      </div>
    );
    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div class={CSS.wrapper}>
          {this.labelText && (
            <InternalLabel
              labelText={this.labelText}
              onClick={this.onLabelClick}
              required={this.required}
              tooltipText={this.messagesCommon.required}
            />
          )}
          <div class={CSS.loaderContainer} ref={this.loaderContainerRef}>
            {this.loading ? loader : null}
            <textarea
              aria-describedby={this.guid}
              aria-errormessage={IDS.validationMessage}
              ariaInvalid={this.status === "invalid" || this.isCharacterLimitExceeded()}
              ariaLabel={getLabelText(this)}
              autofocus={this.el.autofocus}
              class={{
                [CSS.textArea]: true,
                [CSS.readOnly]: this.readOnly,
                [CSS.textAreaInvalid]: this.isCharacterLimitExceeded(),
                [CSS.footerSlotted]: this.endSlotHasElements && this.startSlotHasElements,
                [CSS.textAreaOnly]: !hasFooter,
              }}
              cols={this.columns}
              disabled={this.disabled}
              maxLength={this.limitText ? this.maxLength : undefined}
              name={this.name}
              onChange={this.handleChange}
              onInput={this.handleInput}
              placeholder={this.placeholder}
              readOnly={this.readOnly}
              ref={this.setTextAreaEl}
              required={this.required}
              rows={this.rows}
              spellcheck={this.el.spellcheck}
              value={this.value}
              wrap={this.wrap}
            />
            <span class={{ [CSS.content]: true }}>
              <slot onSlotChange={this.contentSlotChangeHandler} />
            </span>
            <footer
              class={{
                [CSS.footer]: true,
                [CSS.readOnly]: this.readOnly,
                [CSS.hide]: !hasFooter,
              }}
              ref={this.footerRef}
            >
              <div
                class={{
                  [CSS.container]: true,
                  [CSS.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements,
                }}
              >
                <slot
                  name={SLOTS.footerStart}
                  onSlotChange={(event) =>
                    (this.startSlotHasElements = slotChangeHasAssignedElement(event))
                  }
                />
                <slot
                  name={SLOTS.footerEnd}
                  onSlotChange={(event) =>
                    (this.endSlotHasElements = slotChangeHasAssignedElement(event))
                  }
                />
              </div>
              {this.renderCharacterLimit()}
            </footer>
            {this.isCharacterLimitExceeded() && (
              <span ariaLive="polite" class={CSS.assistiveText} id={this.guid}>
                {this.replacePlaceholdersInMessages()}
              </span>
            )}
          </div>
          {this.validationMessage && this.status === "invalid" ? (
            <Validation
              icon={this.validationIcon}
              id={IDS.validationMessage}
              message={this.validationMessage}
              scale={this.scale}
              status={this.status}
            />
          ) : null}
        </div>
      </this.interactiveContainer>
    );
  }

  private renderCharacterLimit(): JsxNode | null {
    if (this.maxLength) {
      return (
        <span class={CSS.characterLimit}>
          <span class={{ [CSS.characterOverLimit]: this.isCharacterLimitExceeded() }}>
            {this.localizedCharacterLengthObj.currentLength}
          </span>
          {"/"}
          {this.localizedCharacterLengthObj.maxLength}
        </span>
      );
    }
    return null;
  }

  //#endregion
}
