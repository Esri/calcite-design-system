import { PropertyValues } from "lit";
import {
  createEvent,
  Fragment,
  JsxNode,
  h,
  LitElement,
  method,
  property,
  state,
  stringOrBoolean,
} from "@arcgis/lumina";
import { createObserver } from "../../utils/observers";
import { Layout, Scale, Status } from "../types";
import { InternalLabel } from "../functional/InternalLabel";
import { Validation } from "../functional/Validation";
import { useT9n } from "../../controllers/useT9n";
import { IconName } from "../icon/types";
import type { RadioButton } from "../radio-button/radio-button";
import { useFocusable } from "../../controllers/useFocusable";
import { CSS, IDS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./radio-button-group.scss";
import { clearValidationMessage, displayValidationMessage } from "../../controllers/useForm";

declare global {
  interface DeclareElements {
    "calcite-radio-button-group": RadioButtonGroup;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the space between slotted components in the component.
     *
     * @public
     */
    "--calcite-radio-button-group-gap": "*";
    /**
     * Specifies the margin spacing at the top of the `calcite-input-message`.
     *
     * @public
     */
    "--calcite-radio-button-input-message-spacing": "*";
  }
}

/** @public */
interface RadioButtonGroupSlots {
  /**
   * A slot for adding `calcite-radio-button`s.
   *
   * @public
   */
  "": Node[];
  /**
   * A slot for rendering content next to the component's `labelText`.
   *
   * @public
   */
  "label-content": Node[];
}

/**
 * @public
 * @docGroup Radio Button
 */
export class RadioButtonGroup extends LitElement {
  //#region Type-only metadata members

  /** @public */
  override ["@slots"]!: RadioButtonGroupSlots;

  //#endregion

  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  /**
   * Made into a prop for testing purposes only
   */
  messages = useT9n<typeof T9nStrings>();

  private mutationObserver = createObserver("mutation", () => this.passPropsToRadioButtons());

  private focusSetter = useFocusable<this>()(this);

  private _disabled = false;

  private disabledWasSet = false;

  //#endregion

  //#region State Properties

  @state() radioButtons: RadioButton["el"][] = [];

  //#endregion

  //#region Public Properties

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @public
   */
  @property({ reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this.disabledWasSet = true;
  }

  /**
   * @public
   * @copyDoc
   */
  @property() labelText?: string;

  /**
   * Specifies the layout of the component.
   *
   * @public
   */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "horizontal";

  /**
   * @public
   * @copyDoc
   */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * @public
   * @copyDoc
   * @required
   */
  @property({ reflect: true }) name!: string;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   *
   * @public
   */
  @property({ reflect: true }) required = false;

  /**
   * Specifies the size of the component.
   *
   * @public
   */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected item.
   *
   * @public
   * @readonly
   */
  @property() selectedItem: RadioButton["el"] | null = null;

  /**
   * Specifies the status of the validation message.
   *
   * @public
   */
  @property({ reflect: true }) status: Status = "idle";

  /**
   * Specifies the validation icon to display under the component.
   *
   * @public
   */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon?: IconName | boolean;

  /**
   * Specifies the validation message to display under the component.
   *
   * @public
   */
  @property() validationMessage?: string;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the fist focusable `calcite-radio-button` element in the component.
   *
   * @public
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.selectedItem && !this.selectedItem.disabled
        ? this.selectedItem
        : this.getFocusableRadioButton();
    }, options);
  }

  //#endregion

  //#region Events

  /**
   * Fires when the component has changed.
   *
   * @public
   */
  calciteRadioButtonGroupChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteRadioButtonChange", this.radioButtonChangeHandler);
    this.listen("calciteInvalid", this.handleInvalidFormEvent);
    this.listen("luminaFormResetCallback", () => {
      if (this.status === "invalid") {
        clearValidationMessage(this);
      }
    });
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) ||
      (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) ||
      (changes.has("status") && this.hasUpdated)
    ) {
      this.passPropsToRadioButtons();
    }
  }

  loaded(): void {
    this.passPropsToRadioButtons();
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private handleInvalidFormEvent(event: CustomEvent): void {
    const message =
      this.validationMessage || (event.target as RadioButton["el"]).validationMessage || "";
    displayValidationMessage(this, {
      message,
      icon: true,
      status: "invalid",
    });
  }

  private passPropsToRadioButtons(): void {
    // TODO: refactor this to look just for radio-button elements that are a member of the parent <form>
    this.radioButtons = Array.from(this.el.querySelectorAll("calcite-radio-button"));
    this.selectedItem =
      Array.from(this.radioButtons)
        .reverse()
        .find((radioButton) => radioButton.checked) ?? null;

    this.radioButtons.forEach((radioButton) => {
      if (this.disabledWasSet) {
        radioButton.disabled = this.disabled;
      }

      radioButton.name = this.name;
      radioButton.required = this.required;
      radioButton.scale = this.scale;
      radioButton.status = this.status;
    });
  }

  private getFocusableRadioButton(): RadioButton["el"] | undefined {
    return this.radioButtons.find((radiobutton) => !radiobutton.disabled);
  }

  private radioButtonChangeHandler(event: CustomEvent): void {
    this.selectedItem = event.target as RadioButton["el"];
    if (this.required && this.selectedItem && this.status === "invalid") {
      clearValidationMessage(this);
    }
    this.calciteRadioButtonGroupChange.emit();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "radiogroup";
    return (
      <>
        {this.labelText && (
          <InternalLabel
            labelText={this.labelText}
            required={this.required}
            tooltipText={this.messages.required}
          />
        )}
        <div
          aria-errormessage={IDS.validationMessage}
          ariaInvalid={this.status === "invalid"}
          ariaRequired={this.required}
          class={CSS.itemWrapper}
        >
          <slot />
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
      </>
    );
  }

  //#endregion
}
