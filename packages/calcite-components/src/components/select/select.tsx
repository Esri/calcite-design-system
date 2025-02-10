// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { focusElement } from "../../utils/dom";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { Scale, Status, Width } from "../interfaces";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import type { Option } from "../option/option";
import type { OptionGroup } from "../option-group/option-group";
import type { Label } from "../label/label";
import { styles } from "./select.scss";
import { CSS, IDS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-select": Select;
  }
}

type OptionOrGroup = Option["el"] | OptionGroup["el"];
type NativeOptionOrGroup = HTMLOptionElement | HTMLOptGroupElement;

function isOption(optionOrGroup: OptionOrGroup): optionOrGroup is Option["el"] {
  return optionOrGroup.tagName === "CALCITE-OPTION";
}

function isOptionGroup(optionOrGroup: OptionOrGroup): optionOrGroup is OptionGroup["el"] {
  return optionOrGroup.tagName === "CALCITE-OPTION-GROUP";
}

/** @slot - A slot for adding `calcite-option`s. */
export class Select
  extends LitElement
  implements LabelableComponent, FormComponent, InteractiveComponent, LoadableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private componentToNativeEl = new Map<OptionOrGroup, NativeOptionOrGroup>();

  defaultValue: Select["value"];

  formEl: HTMLFormElement;

  labelEl: Label["el"];

  private mutationObserver = createObserver("mutation", () => this.populateInternalSelect());

  private selectEl: HTMLSelectElement;

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
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
   * The component's selected option `HTMLElement`.
   *
   * @readonly
   */
  @property() selectedOption: Option["el"];

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

  /** The component's `selectedOption` value. */
  @property() value: string = null;

  /** Specifies the width of the component. [Deprecated] The `"half"` value is deprecated, use `"full"` instead. */
  @property({ reflect: true }) width: Extract<Width, "auto" | "half" | "full"> = "auto";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusElement(this.selectEl);
  }

  // #endregion

  // #region Events

  /** Fires when the `selectedOption` changes. */
  calciteSelectChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalOptionChange", this.handleOptionOrGroupChange);
    this.listen("calciteInternalOptionGroupChange", this.handleOptionOrGroupChange);
  }

  override connectedCallback(): void {
    const { el } = this;

    this.mutationObserver?.observe(el, {
      subtree: true,
      childList: true,
    });

    connectLabel(this);
    connectForm(this);
  }

  load(): void {
    setUpLoadableComponent(this);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("value") && (this.hasUpdated || this.value !== null)) {
      this.updateItemsFromValue(this.value);
    }

    if (changes.has("selectedOption")) {
      this.value = this.selectedOption?.value;
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);

    if (typeof this.value === "string") {
      this.updateItemsFromValue(this.value);
    }

    this.populateInternalSelect();

    const selected = this.selectEl.selectedOptions[0];
    this.selectFromNativeOption(selected);
    afterConnectDefaultValueSet(this, this.selectedOption?.value ?? "");
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    disconnectLabel(this);
    disconnectForm(this);
  }

  // #endregion

  // #region Private Methods
  private handleInternalSelectChange(): void {
    const selected = this.selectEl.selectedOptions[0];
    this.selectFromNativeOption(selected);
    requestAnimationFrame(() => this.emitChangeEvent());
  }

  protected handleOptionOrGroupChange(event: CustomEvent): void {
    event.stopPropagation();

    const optionOrGroup = event.target as OptionOrGroup;
    const nativeEl = this.componentToNativeEl.get(optionOrGroup);

    if (!nativeEl) {
      return;
    }

    this.updateNativeElement(optionOrGroup, nativeEl);

    if (isOption(optionOrGroup) && optionOrGroup.selected) {
      this.deselectAllExcept(optionOrGroup);
      this.selectedOption = optionOrGroup;
    }
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private updateItemsFromValue(value: string): void {
    this.el
      .querySelectorAll("calcite-option")
      .forEach((item) => (item.selected = item.value === value));
  }

  private updateNativeElement(
    optionOrGroup: OptionOrGroup,
    nativeOptionOrGroup: NativeOptionOrGroup,
  ): void {
    nativeOptionOrGroup.disabled = optionOrGroup.disabled;
    nativeOptionOrGroup.label = optionOrGroup.label;

    if (isOption(optionOrGroup)) {
      const option = nativeOptionOrGroup as HTMLOptionElement;
      option.selected = optionOrGroup.selected;
      option.value = optionOrGroup.value;

      // need to set innerText for mobile
      // @see [iOS Safari now showing all options for select menu](https://stackoverflow.com/questions/35021620/ios-safari-not-showing-all-options-for-select-menu/41749701).
      option.innerText = optionOrGroup.label;
    }
  }

  private populateInternalSelect(): void {
    const optionsAndGroups = Array.from(
      this.el.children as HTMLCollectionOf<OptionOrGroup | HTMLSlotElement>,
    ).filter(
      (child) => child.tagName === "CALCITE-OPTION" || child.tagName === "CALCITE-OPTION-GROUP",
    ) as OptionOrGroup[];

    this.clearInternalSelect();

    optionsAndGroups.forEach((optionOrGroup) =>
      this.selectEl?.append(this.toNativeElement(optionOrGroup)),
    );
  }

  private clearInternalSelect(): void {
    this.componentToNativeEl.forEach((value) => value.remove());
    this.componentToNativeEl.clear();
  }

  private storeSelectRef(el: HTMLSelectElement): void {
    if (!el) {
      return;
    }

    this.selectEl = el;
  }

  private selectFromNativeOption(nativeOption: HTMLOptionElement): void {
    if (!nativeOption) {
      return;
    }

    let futureSelected: Option["el"];

    this.componentToNativeEl.forEach((nativeOptionOrGroup, optionOrGroup) => {
      if (isOption(optionOrGroup) && nativeOptionOrGroup === nativeOption) {
        optionOrGroup.selected = true;
        futureSelected = optionOrGroup;
        this.deselectAllExcept(optionOrGroup);
      }
    });

    if (futureSelected) {
      this.selectedOption = futureSelected;
    }
  }

  private toNativeElement(optionOrGroup: Option["el"] | OptionGroup["el"]): NativeOptionOrGroup {
    if (isOption(optionOrGroup)) {
      const option = document.createElement("option");
      this.updateNativeElement(optionOrGroup, option);
      this.componentToNativeEl.set(optionOrGroup, option);

      return option;
    }

    if (isOptionGroup(optionOrGroup)) {
      const group = document.createElement("optgroup");
      this.updateNativeElement(optionOrGroup, group);

      Array.from(optionOrGroup.children as HTMLCollectionOf<Option["el"]>).forEach((option) => {
        const nativeOption = this.toNativeElement(option);
        group.append(nativeOption);
        this.componentToNativeEl.set(optionOrGroup, nativeOption);
      });

      this.componentToNativeEl.set(optionOrGroup, group);

      return group;
    }

    throw new Error("unsupported element child provided");
  }

  private deselectAllExcept(except: Option["el"]): void {
    this.el.querySelectorAll<Option["el"]>("calcite-option").forEach((option) => {
      if (option === except) {
        return;
      }

      option.selected = false;
    });
  }

  private emitChangeEvent(): void {
    this.calciteSelectChange.emit();
  }

  // #endregion

  // #region Rendering

  private renderChevron(): JsxNode {
    return (
      <div class={CSS.iconContainer}>
        <calcite-icon class={CSS.icon} icon="chevron-down" scale={getIconScale(this.scale)} />
      </div>
    );
  }

  override render(): JsxNode {
    const { disabled } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        <div class={CSS.wrapper}>
          <select
            aria-errormessage={IDS.validationMessage}
            ariaInvalid={this.status === "invalid"}
            ariaLabel={getLabelText(this)}
            class={CSS.select}
            disabled={disabled}
            onChange={this.handleInternalSelectChange}
            ref={this.storeSelectRef}
          >
            <slot />
          </select>
          {this.renderChevron()}
          <HiddenFormInputSlot component={this} />
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
      </InteractiveContainer>
    );
  }

  // #endregion
}
