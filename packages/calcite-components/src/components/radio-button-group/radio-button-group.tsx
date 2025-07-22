// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  Fragment,
  h,
  method,
  state,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { createObserver } from "../../utils/observers";
import { Layout, Scale, Status } from "../interfaces";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import type { RadioButton } from "../radio-button/radio-button";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, IDS } from "./resources";
import { styles } from "./radio-button-group.scss";

declare global {
  interface DeclareElements {
    "calcite-radio-button-group": RadioButtonGroup;
  }
}

/** @slot - A slot for adding `calcite-radio-button`s. */
export class RadioButtonGroup extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private mutationObserver = createObserver("mutation", () => this.passPropsToRadioButtons());

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  @state() radioButtons: RadioButton["el"][] = [];

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Defines the layout of the component. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "horizontal";

  /**
   * Specifies the name of the component on form submission. Must be unique to other component instances.
   *
   * @required
   */
  @property({ reflect: true }) name: string;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected item.
   *
   * @readonly
   */
  @property() selectedItem: RadioButton["el"] = null;

  /** Specifies the status of the validation message. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon:
    | IconNameOrString
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage: string;

  // #endregion

  // #region Public Methods

  /** Sets focus on the fist focusable `calcite-radio-button` element in the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      if (this.selectedItem && !this.selectedItem.disabled) {
        return this.selectedItem;
      }

      return this.getFocusableRadioButton();
    });
  }

  // #endregion

  // #region Events

  /** Fires when the component has changed. */
  calciteRadioButtonGroupChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteRadioButtonChange", this.radioButtonChangeHandler);
  }

  override connectedCallback(): void {
    this.passPropsToRadioButtons();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) ||
      (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m"))
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

  // #endregion

  // #region Private Methods

  private passPropsToRadioButtons(): void {
    this.radioButtons = Array.from(this.el.querySelectorAll("calcite-radio-button"));
    this.selectedItem =
      Array.from(this.radioButtons)
        .reverse()
        .find((radioButton) => radioButton.checked) || null;
    if (this.radioButtons.length > 0) {
      this.radioButtons.forEach((radioButton) => {
        if (this.hasUpdated) {
          radioButton.disabled = this.disabled || radioButton.disabled;
        }
        radioButton.name = this.name;
        radioButton.required = this.required;
        radioButton.scale = this.scale;
      });
    }
  }

  private getFocusableRadioButton(): RadioButton["el"] | null {
    return this.radioButtons.find((radiobutton) => !radiobutton.disabled) ?? null;
  }

  private radioButtonChangeHandler(event: CustomEvent): void {
    this.selectedItem = event.target as RadioButton["el"];
    this.calciteRadioButtonGroupChange.emit();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "radiogroup";
    return (
      <>
        <div
          aria-errormessage={IDS.validationMessage}
          ariaInvalid={this.status === "invalid"}
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

  // #endregion
}
