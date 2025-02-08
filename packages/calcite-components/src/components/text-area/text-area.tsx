import {
  Component,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  VNode,
  Watch,
  Method,
  Host,
  State,
  forceUpdate,
} from "@stencil/core";
import { throttle } from "lodash-es";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { slotChangeHasAssignedElement, toAriaBoolean } from "../../utils/dom";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  componentFocusable,
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
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
import { CharacterLengthObj } from "./interfaces";
import { TextAreaMessages } from "./assets/text-area/t9n";
import { CSS, IDS, SLOTS, RESIZE_TIMEOUT } from "./resources";

/**
 * @slot - A slot for adding text.
 * @slot footer-start - A slot for adding content to the start of the component's footer.
 * @slot footer-end - A slot for adding content to the end of the component's footer.
 */

@Component({
  tag: "calcite-text-area",
  styleUrl: "text-area.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class TextArea
  implements
    FormComponent,
    LabelableComponent,
    LocalizedComponent,
    LoadableComponent,
    T9nComponent,
    InteractiveComponent,
    Omit<TextualInputComponent, "pattern">
{
  //--------------------------------------------------------------------------
  //
  //  Global attributes
  //
  //--------------------------------------------------------------------------

  @Watch("autofocus")
  @Watch("spellcheck")
  handleGlobalAttributesChanged(): void {
    forceUpdate(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Specifies the component's number of columns.
   *
   * @mdn [cols](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols)
   */
  @Prop({ reflect: true }) columns: number;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /**
   * When `true`, number values are displayed with a group separator corresponding to the language and country format.
   */
  @Prop({ reflect: true }) groupSeparator = false;

  /**
   * Accessible name for the component.
   */
  @Prop() label: string;

  /**
   * Specifies the minimum number of characters allowed.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-minlength)
   */
  @Prop({ reflect: true }) minLength: number;

  /**
   * Specifies the maximum number of characters allowed.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-maxlength)
   */
  @Prop({ reflect: true }) maxLength: number;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TextAreaMessages;

  /** Specifies the validation message to display under the component. */
  @Prop() validationMessage: string;

  /** Specifies the validation icon to display under the component. */
  @Prop({ reflect: true }) validationIcon: IconNameOrString | boolean;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated in form util when syncing hidden input
  @Prop({ mutable: true }) validity: MutableValidityState = {
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

  /**
   * Specifies the name of the component.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-name)
   */
  @Prop({ reflect: true }) name: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  /**
   * Specifies the placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-placeholder)
   */
  @Prop() placeholder: string;

  /**
   * When `true`, the component's `value` can be read, but cannot be modified.
   *
   * @readonly
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop({ reflect: true }) readOnly = false;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @mdn [required]https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies if the component is resizable. */
  @Prop({ reflect: true }) resize: "both" | "horizontal" | "vertical" | "none" = "both";

  /**
   * Specifies the component's number of rows.
   *
   * @mdn [rows](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows)
   */
  @Prop({ reflect: true }) rows: number;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

  /** The component's value. */
  @Prop({ mutable: true }) value = "";

  /**
   * Specifies the wrapping mechanism for the text.
   *
   * @mdn [wrap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap)
   */
  @Prop({ reflect: true }) wrap: "soft" | "hard" = "soft";

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TextAreaMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Event Emitters
  //
  //--------------------------------------------------------------------------
  /**
   * Fires each time a new `value` is typed.
   */
  @Event() calciteTextAreaInput: EventEmitter<void>;

  /**
   * Fires each time a new `value` is typed and committed.
   */
  @Event() calciteTextAreaChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
    this.setTextAreaHeight();
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  render(): VNode {
    const hasFooter = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <textarea
            aria-describedby={this.guid}
            aria-errormessage={IDS.validationMessage}
            aria-invalid={toAriaBoolean(
              this.status === "invalid" || this.isCharacterLimitExceeded(),
            )}
            aria-label={getLabelText(this)}
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
            <slot onSlotchange={this.contentSlotChangeHandler} />
          </span>
          <footer
            class={{
              [CSS.footer]: true,
              [CSS.readOnly]: this.readOnly,
              [CSS.hide]: !hasFooter,
            }}
            ref={(el) => (this.footerEl = el)}
          >
            <div
              class={{
                [CSS.container]: true,
                [CSS.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements,
              }}
            >
              <slot
                name={SLOTS.footerStart}
                onSlotchange={(event) =>
                  (this.startSlotHasElements = slotChangeHasAssignedElement(event))
                }
              />
              <slot
                name={SLOTS.footerEnd}
                onSlotchange={(event) =>
                  (this.endSlotHasElements = slotChangeHasAssignedElement(event))
                }
              />
            </div>
            {this.renderCharacterLimit()}
          </footer>
          <HiddenFormInputSlot component={this} />
          {this.isCharacterLimitExceeded() && (
            <span aria-live="polite" class={CSS.assistiveText} id={this.guid}>
              {this.replacePlaceHoldersInMessages()}
            </span>
          )}
          {this.validationMessage && this.status === "invalid" ? (
            <Validation
              icon={this.validationIcon}
              id={IDS.validationMessage}
              message={this.validationMessage}
              scale={this.scale}
              status={this.status}
            />
          ) : null}
        </InteractiveContainer>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.textAreaEl.focus();
  }

  /** Selects the text of the component's `value`. */
  @Method()
  async selectText(): Promise<void> {
    await componentLoaded(this);
    this.textAreaEl.select();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTextAreaElement;

  defaultValue: TextArea["value"];

  footerEl: HTMLElement;

  formEl: HTMLFormElement;

  labelEl: HTMLCalciteLabelElement;

  textAreaEl: HTMLTextAreaElement;

  @State() defaultMessages: TextAreaMessages;

  @State() endSlotHasElements: boolean;

  @State() startSlotHasElements: boolean;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private guid = guid();

  private localizedCharacterLengthObj: CharacterLengthObj;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick(): void {
    this.setFocus();
  }

  handleInput = (event: InputEvent): void => {
    this.value = event.target["value"];
    this.calciteTextAreaInput.emit();
  };

  handleChange = (): void => {
    this.calciteTextAreaChange.emit();
  };

  contentSlotChangeHandler = (): void => {
    if (!this.value) {
      const nodes = this.el.childNodes;
      nodes.forEach((el) => {
        if (el.nodeName === "#text") {
          this.value = el.nodeValue.trim();
        }
      });
    }
  };

  renderCharacterLimit = (): VNode | null => {
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
  };

  getLocalizedCharacterLength(): CharacterLengthObj {
    const currentLength = this.value ? this.value.length.toString() : "0";
    const maxLength = this.maxLength.toString();
    if (this.numberingSystem === "latn") {
      return { currentLength, maxLength };
    }

    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "never",
      useGrouping: this.groupSeparator,
    };
    return {
      currentLength: numberStringFormatter.localize(currentLength),
      maxLength: numberStringFormatter.localize(maxLength),
    };
  }

  resizeObserver = createObserver("resize", async () => {
    await componentLoaded(this);
    const { textAreaHeight, textAreaWidth, elHeight, elWidth, footerHeight, footerWidth } =
      this.getHeightAndWidthOfElements();
    if (footerWidth > 0 && footerWidth !== textAreaWidth) {
      this.footerEl.style.width = `${textAreaWidth}px`;
    }
    if (elWidth !== textAreaWidth || elHeight !== textAreaHeight + (footerHeight || 0)) {
      this.setHeightAndWidthToAuto();
    }
  });

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.setCustomValidity("");
    if (this.isCharacterLimitExceeded()) {
      input.setCustomValidity(this.replacePlaceHoldersInMessages());
    }

    syncHiddenFormInput("textarea", this, input);
  }

  setTextAreaEl = (el: HTMLTextAreaElement): void => {
    this.textAreaEl = el;
    this.resizeObserver.observe(el);
  };

  setTextAreaHeight(): void {
    const { textAreaHeight, elHeight, footerHeight } = this.getHeightAndWidthOfElements();
    if (footerHeight > 0 && textAreaHeight + footerHeight != elHeight) {
      this.textAreaEl.style.height = `${elHeight - footerHeight}px`;
    }
  }

  getHeightAndWidthOfElements(): {
    textAreaHeight: number;
    textAreaWidth: number;
    elHeight: number;
    elWidth: number;
    footerHeight: number;
    footerWidth: number;
  } {
    const { height: textAreaHeight, width: textAreaWidth } =
      this.textAreaEl.getBoundingClientRect();
    const { height: elHeight, width: elWidth } = this.el.getBoundingClientRect();
    const { height: footerHeight, width: footerWidth } = this.footerEl.getBoundingClientRect();

    return {
      textAreaHeight,
      textAreaWidth,
      elHeight,
      elWidth,
      footerHeight,
      footerWidth,
    };
  }

  private replacePlaceHoldersInMessages(): string {
    return this.messages.tooLong
      .replace("{maxLength}", this.localizedCharacterLengthObj.maxLength)
      .replace("{currentLength}", this.localizedCharacterLengthObj.currentLength);
  }

  // height and width are set to auto here to avoid overlapping on to neighboring elements in the layout when user starts resizing.
  // throttle is used to avoid flashing of textarea when user resizes.
  private setHeightAndWidthToAuto = throttle(
    (): void => {
      if (this.resize === "vertical" || this.resize === "both") {
        this.el.style.height = "auto";
      }
      if (this.resize === "horizontal" || this.resize === "both") {
        this.el.style.width = "auto";
      }
    },
    RESIZE_TIMEOUT,
    { leading: false },
  );

  private isCharacterLimitExceeded(): boolean {
    return this.value?.length > this.maxLength;
  }
}
