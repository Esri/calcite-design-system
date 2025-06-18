// @ts-strict-ignore
import { throttle } from "lodash-es";
import { createRef } from "lit-html/directives/ref.js";
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
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import { componentFocusable } from "../../utils/component";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { guid } from "../../utils/guid";
import { Status } from "../interfaces";
import { Validation } from "../functional/Validation";
import { syncHiddenFormInput, TextualInputComponent } from "../input/common/input";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { useCancelableResource } from "../../controllers/useCancelableResource";
import type { Label } from "../label/label";
import { CharacterLengthObj } from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS, NO_DIMENSIONS, RESIZE_TIMEOUT, SLOTS } from "./resources";
import { styles } from "./text-area.scss";

declare global {
  interface DeclareElements {
    "calcite-text-area": TextArea;
  }
}

/**
 * @slot - A slot for adding text.
 * @slot footer-start - A slot for adding content to the start of the component's footer.
 * @slot footer-end - A slot for adding content to the end of the component's footer.
 */
export class TextArea
  extends LitElement
  implements
    FormComponent,
    LabelableComponent,
    InteractiveComponent,
    Omit<TextualInputComponent, "pattern">
{
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  attributeWatch = useWatchAttributes(
    ["autofocus", "spellcheck"],
    this.handleGlobalAttributesChanged,
  );

  defaultValue: TextArea["value"];

  private footerEl = createRef<HTMLElement>();

  private validationMessageEl: HTMLDivElement;

  formEl: HTMLFormElement;

  private guid = guid();

  labelEl: Label["el"];

  private textAreaEl: HTMLTextAreaElement;

  private localizedCharacterLengthObj: CharacterLengthObj;

  private resizeObserver = createObserver("resize", async () => {
    await this.componentOnReady();
    const {
      textAreaHeight,
      textAreaWidth,
      elHeight,
      elWidth,
      footerHeight,
      footerWidth,
      validationMessageHeight,
    } = this.getHeightAndWidthOfElements();
    if (footerWidth > 0 && footerWidth !== textAreaWidth) {
      this.footerEl.value.style.width = `${textAreaWidth}px`;
    }

    if (this.resize === "none") {
      return;
    }

    const { width: elStyleWidth, height: elStyleHeight } = getComputedStyle(this.el);
    if (elWidth !== textAreaWidth && elStyleWidth !== "auto") {
      this.updateSizeToAuto("width");
    }
    if (
      elHeight !== textAreaHeight + footerHeight + validationMessageHeight &&
      elStyleHeight !== "auto"
    ) {
      this.updateSizeToAuto("height");
    }
  });

  private cancelableResource = useCancelableResource<this>({
    autoCancelOnDisconnect: true,
  })(this);

  // height and width are set to auto here to avoid overlapping on to neighboring elements in the layout when user starts resizing.
  // throttle is used to avoid flashing of textarea when user resizes.
  private updateSizeToAuto = throttle(
    (dimension: "height" | "width"): void => {
      this.el.style[dimension] = "auto";
    },
    RESIZE_TIMEOUT,
    { leading: false },
  );

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  //#endregion

  //#region State Properties

  @state() endSlotHasElements: boolean;

  @state() startSlotHasElements: boolean;

  //#endregion

  //#region Public Properties

  /**
   * Specifies the component's number of columns.
   *
   * @mdn [cols](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols)
   */
  @property({ reflect: true }) columns: number;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /** Accessible name for the component. */
  @property() label: string;

  /**
   * When `true`, prevents input beyond the `maxLength` value, mimicking native text area behavior.
   */
  @property({ reflect: true }) limitText = false;

  /**
   * When the component resides in a form,
   * specifies the maximum number of characters allowed.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-maxlength)
   */
  @property({ reflect: true }) maxLength: number;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When the component resides in a form,
   * specifies the minimum number of characters allowed.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-minlength)
   */
  @property({ reflect: true }) minLength: number;

  /**
   * Specifies the name of the component.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-name)
   */
  @property({ reflect: true }) name: string;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /**
   * Specifies the placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-placeholder)
   */
  @property() placeholder: string;

  /**
   * When `true`, the component's `value` can be read, but cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @property({ reflect: true }) readOnly = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   *
   * @mdn [required]https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @property({ reflect: true }) required = false;

  /** Specifies if the component is resizable. */
  @property({ reflect: true }) resize: "both" | "horizontal" | "vertical" | "none" = "both";

  /**
   * Specifies the component's number of rows.
   *
   * @mdn [rows](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows)
   */
  @property({ reflect: true }) rows: number;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon:
    | IconNameOrString
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage: string;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property() validity: MutableValidityState = {
    valid: false,
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
  };

  /** The component's value. */
  @property() value = "";

  /**
   * Specifies the wrapping mechanism for the text.
   *
   * @mdn [wrap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap)
   */
  @property({ reflect: true }) wrap: "soft" | "hard" = "soft";

  //#endregion

  //#region Public Methods

  /** Selects the text of the component's `value`. */
  @method()
  async selectText(): Promise<void> {
    await this.componentOnReady();
    this.textAreaEl.select();
  }

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.textAreaEl.focus();
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
    connectLabel(this);
    connectForm(this);
    this.cancelableResource.add(this.updateSizeToAuto);
  }

  override updated(): void {
    updateHostInteraction(this);
    this.setTextAreaHeight();
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private handleInput(event: InputEvent): void {
    this.value = event.target["value"];
    this.calciteTextAreaInput.emit();
  }

  private handleChange(): void {
    this.calciteTextAreaChange.emit();
  }

  private contentSlotChangeHandler(): void {
    if (!this.value) {
      const nodes = this.el.childNodes;
      nodes.forEach((el) => {
        if (el.nodeName === "#text") {
          this.value = el.nodeValue.trim();
        }
      });
    }
  }

  private getLocalizedCharacterLength(): CharacterLengthObj {
    const currentLength = this.value ? this.value.length.toString() : "0";
    const maxLength = this.maxLength.toString();
    if (this.numberingSystem === "latn") {
      return { currentLength, maxLength };
    }

    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "never",
      useGrouping: this.groupSeparator,
    };
    return {
      currentLength: numberStringFormatter.localize(currentLength),
      maxLength: numberStringFormatter.localize(maxLength),
    };
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.setCustomValidity("");
    if (this.isCharacterLimitExceeded()) {
      input.setCustomValidity(this.replacePlaceholdersInMessages());
    }

    syncHiddenFormInput("textarea", this, input);
  }

  private setTextAreaEl(el: HTMLTextAreaElement): void {
    if (!el) {
      return;
    }
    this.textAreaEl = el;
    this.resizeObserver?.observe(el);
  }

  private setTextAreaHeight(): void {
    const { textAreaHeight, elHeight, footerHeight, validationMessageHeight } =
      this.getHeightAndWidthOfElements();
    if (footerHeight > 0 && textAreaHeight + footerHeight + validationMessageHeight != elHeight) {
      this.textAreaEl.style.height = `${elHeight - footerHeight}px`;
    }
  }

  private getHeightAndWidthOfElements(): {
    textAreaHeight: number;
    textAreaWidth: number;
    elHeight: number;
    elWidth: number;
    footerHeight: number;
    footerWidth: number;
    validationMessageHeight: number;
  } {
    const { height: textAreaHeight, width: textAreaWidth } = this.textAreaEl
      ? this.textAreaEl.getBoundingClientRect()
      : NO_DIMENSIONS;
    const { height: elHeight, width: elWidth } = this.el.getBoundingClientRect();
    const { height: footerHeight, width: footerWidth } = this.footerEl.value
      ? this.footerEl.value.getBoundingClientRect()
      : NO_DIMENSIONS;

    const { height: validationMessageHeight } = this.validationMessageEl
      ? this.validationMessageEl.getBoundingClientRect()
      : NO_DIMENSIONS;

    return {
      textAreaHeight,
      textAreaWidth,
      elHeight,
      elWidth,
      footerHeight,
      footerWidth,
      validationMessageHeight,
    };
  }

  private replacePlaceholdersInMessages(): string {
    return this.messages.tooLong
      .replace("{maxLength}", this.localizedCharacterLengthObj.maxLength)
      .replace("{currentLength}", this.localizedCharacterLengthObj.currentLength);
  }

  private isCharacterLimitExceeded(): boolean {
    return this.value?.length > this.maxLength;
  }

  private setValidationRef(el: HTMLDivElement): void {
    if (!el) {
      return;
    }
    this.validationMessageEl = el;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const hasFooter = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.wrapper}>
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
            ref={this.footerEl}
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
          <HiddenFormInputSlot component={this} />
          {this.isCharacterLimitExceeded() && (
            <span ariaLive="polite" class={CSS.assistiveText} id={this.guid}>
              {this.replacePlaceholdersInMessages()}
            </span>
          )}
          {this.validationMessage && this.status === "invalid" ? (
            <Validation
              icon={this.validationIcon}
              id={IDS.validationMessage}
              message={this.validationMessage}
              ref={this.setValidationRef}
              scale={this.scale}
              status={this.status}
            />
          ) : null}
        </div>
      </InteractiveContainer>
    );
  }

  private renderCharacterLimit(): JsxNode | null {
    if (this.maxLength) {
      this.localizedCharacterLengthObj = this.getLocalizedCharacterLength();
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
