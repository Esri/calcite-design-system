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
  State
} from "@stencil/core";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { slotChangeGetAssignedElements, toAriaBoolean } from "../../utils/dom";
import { CSS, SLOTS, RESIZE_TIMEOUT } from "./resources";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter
} from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { TextareaMessages } from "./assets/textarea/t9n";
import { throttle } from "lodash-es";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding text.
 * @slot footer-start - A slot for adding a leading footer.
 * @slot footer-end - A slot for adding a trailing footer.
 */

@Component({
  tag: "calcite-textarea",
  styleUrl: "textarea.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Textarea
  implements
    FormComponent,
    LabelableComponent,
    LocalizedComponent,
    LoadableComponent,
    T9nComponent,
    InteractiveComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteTextareaElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the component is focused on page load.
   *
   * @mdn [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
   */
  @Prop({ reflect: true }) autofocus = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies the placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-placeholder)
   */
  @Prop() placeholder: string;

  /**
   * When `true`, the component's value can be read, but cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop({ reflect: true }) readonly = false;

  /**
   * Specifies the number or rows allowed.
   *
   * @mdn [rows](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows)
   */
  @Prop({ reflect: true }) rows: number;

  /**
   * Specifies the number or columns allowed.
   *
   * @mdn [cols](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols)
   */
  @Prop({ reflect: true }) cols: number;

  /**
   * Specifies the maximum number of characters allowed.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-maxlength)
   */
  @Prop() maxlength: number;

  /**
   * Specifies the name of the component
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-name)
   */
  @Prop({ reflect: true }) name: string;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /**
   * Specifies the wrapping mechanism for the text.
   *
   * @mdn [wrap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap)
   */
  @Prop({ reflect: true }) wrap: "soft" | "hard" = "soft";

  /** The component's value. */
  @Prop({ mutable: true }) value: string;

  /** When `true`, disables horizantally and vertically resizing the component.*/
  @Prop({ reflect: true }) resizeDisabled = false;

  /** When `true`, disables horizantally resizing the component. */
  @Prop({ reflect: true }) horizantalResizeDisabled = false;

  /** When `true`, disables vertically resizing the component. */
  @Prop({ reflect: true }) verticalResizeDisabled = false;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @mdn [required]https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @Prop({ reflect: true }) required = false;

  /**
   * Accessible name for the component.
   */
  @Prop() label: string;

  // /** When `true`, the component will be marked as invalid. */
  // @Prop({ reflect: true }) invalid = false;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  /**
   * When `true`, number values are displayed with a group separator corresponding to the language and country format.
   */
  @Prop({ reflect: true }) groupSeparator = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: TextareaMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<TextareaMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  @Watch("disabled")
  disabledHandler(value: boolean): void {
    this.disablePointerEvents(value, this.startSlotElements);
    this.disablePointerEvents(value, this.endSlotElements);
  }

  //--------------------------------------------------------------------------
  //
  //  Event Emitters
  //
  //--------------------------------------------------------------------------
  /**
   * Fires each time a new `value` is typed.
   */
  @Event({ cancelable: true }) calciteTextareaInput: EventEmitter<void>;

  /**
   * Fires each time a new `value` is typed and committed.
   */
  @Event({ cancelable: true }) calciteTextareaChange: EventEmitter<void>;

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
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  render(): VNode {
    const hasFooter =
      !!this.startSlotElements?.length || !!this.endSlotElements?.length || !!this.maxlength;

    return (
      <Host>
        <textarea
          aria-invalid={toAriaBoolean(this.value?.length > this.maxlength)}
          aria-label={getLabelText(this)}
          autofocus={this.autofocus}
          class={{
            textarea: true,
            [CSS.resizeDisabled]: this.resizeDisabled,
            [CSS.resizeDisabledX]: this.horizantalResizeDisabled,
            [CSS.resizeDisabledY]: this.verticalResizeDisabled,
            [CSS.readonly]: this.readonly,
            [CSS.textareaInvalid]: this.value?.length > this.maxlength,
            [CSS.footerSlotted]: !!this.endSlotElements?.length && !!this.startSlotElements?.length,
            [CSS.borderColor]: !hasFooter,
            [CSS.blocksizeFull]: !hasFooter
          }}
          cols={this.cols}
          disabled={this.disabled}
          name={this.name}
          onChange={this.handleChange}
          onInput={this.handleInput}
          placeholder={this.placeholder}
          readonly={this.readonly}
          ref={this.setTextareaEl}
          required={this.required}
          rows={this.rows}
          value={this.value}
          wrap={this.wrap}
        />
        <span class="content">
          <slot onSlotchange={this.contentSlotChangeHandler} />
        </span>
        {
          <footer
            class={{
              [CSS.footer]: true,
              [CSS.readonly]: this.readonly,
              [CSS.hide]: !hasFooter
            }}
            key={CSS.footer}
            ref={this.setFooterEl}
          >
            <div class="slot-container">
              <slot name={SLOTS.footerStart} onSlotchange={this.footerStartSlotChangeHandler} />
              <slot name={SLOTS.footerEnd} onSlotchange={this.footerEndSlotChangeHandler} />
            </div>
            {this.renderCharacterLimit()}
          </footer>
        }
        <HiddenFormInputSlot component={this} />
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
    await componentLoaded(this);
    this.textareaEl.focus();
  }

  /** Selects all text of the component's `value`. */
  @Method()
  async selectText(): Promise<void> {
    this.textareaEl.select();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  formEl: HTMLFormElement;

  defaultValue: Textarea["value"];

  labelEl: HTMLCalciteLabelElement;

  textareaEl: HTMLTextAreaElement;

  footerEl: HTMLElement;

  @State() effectiveLocale = "";

  @State() endSlotElements: Element[];

  @State() startSlotElements: Element[];

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: TextareaMessages;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onFormReset(): void {
    this.value = this.defaultValue;
  }

  onLabelClick(): void {
    this.setFocus();
  }

  handleInput = (event: InputEvent): void => {
    this.value = event.target["value"];
    this.calciteTextareaInput.emit();
  };

  handleChange = (): void => {
    this.calciteTextareaChange.emit();
  };

  footerEndSlotChangeHandler = (event: Event): void => {
    this.endSlotElements = slotChangeGetAssignedElements(event);
    if (this.disabled) {
      this.disablePointerEvents(this.disabled, this.endSlotElements);
    }
  };

  footerStartSlotChangeHandler = (event: Event): void => {
    this.startSlotElements = slotChangeGetAssignedElements(event);
    if (this.disabled) {
      this.disablePointerEvents(this.disabled, this.startSlotElements);
    }
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

  renderCharacterLimit = (): VNode => {
    return this.maxlength ? (
      <span class={CSS.characterLimit}>
        <span class={{ [CSS.characterOverlimit]: this.value?.length > this.maxlength }}>
          {this.getLocalizedCharacterLength()}
        </span>
        {"/"}
        {numberStringFormatter.localize(this.maxlength.toString())}
      </span>
    ) : null;
  };

  getLocalizedCharacterLength(): string {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "never",
      useGrouping: this.groupSeparator
    };
    return numberStringFormatter.localize(this.value ? this.value.length.toString() : "0");
  }

  disablePointerEvents(disabled: boolean, slottedElements: Element[]): void {
    if (!!slottedElements?.length) {
      slottedElements.forEach((el: HTMLElement) => {
        el.style.pointerEvents = disabled ? "none" : "auto";
      });
    }
  }

  resizeObserver = createObserver("resize", (entries) => {
    const { width: textareaWidth, height: textareaHeight } =
      this.textareaEl.getBoundingClientRect();
    const { width: elWidth, height: elHeight } = this.el.getBoundingClientRect();
    const footerHeight = this.footerEl?.getBoundingClientRect().height;
    entries.forEach((entry) => {
      if (entry.target === this.footerEl) {
        if (footerHeight > 0) {
          textareaHeight + footerHeight != elHeight
            ? (this.textareaEl.style.height = `${elHeight - footerHeight}px`)
            : this.resizeObserver.unobserve(this.footerEl);
        }
      }
    });

    if (this.footerEl && footerHeight > 0) {
      this.footerEl.style.width = `${textareaWidth}px`;
    }

    if (
      elWidth !== textareaWidth ||
      elHeight !== this.textareaEl.getBoundingClientRect().height + (footerHeight || 0)
    ) {
      this.setHeightAndWidthToAuto();
    }
  });

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.setCustomValidity("");
    if (this.value?.length > this.maxlength) {
      input.setCustomValidity(this.messages.overLimit);
    }
  }

  setHeightAndWidthToAuto = throttle(
    (): void => {
      this.verticalResizeDisabled || (this.el.style.height = "auto");
      this.horizantalResizeDisabled || (this.el.style.width = "auto");
    },
    RESIZE_TIMEOUT,
    { leading: false, trailing: true }
  );

  setTextareaEl = (el: HTMLTextAreaElement): void => {
    this.textareaEl = el;
    this.resizeObserver.observe(el);
  };

  setFooterEl = (el: HTMLTextAreaElement): void => {
    this.footerEl = el;
    this.resizeObserver.observe(el);
  };
}
