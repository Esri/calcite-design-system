import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  VNode,
  Watch,
} from "@stencil/core";
import { getIconScale } from "../../utils/component";
import { focusElement } from "../../utils/dom";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
} from "../../utils/form";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
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
import { CSS } from "./resources";

type OptionOrGroup = HTMLCalciteOptionElement | HTMLCalciteOptionGroupElement;
type NativeOptionOrGroup = HTMLOptionElement | HTMLOptGroupElement;

function isOption(optionOrGroup: OptionOrGroup): optionOrGroup is HTMLCalciteOptionElement {
  return optionOrGroup.tagName === "CALCITE-OPTION";
}

function isOptionGroup(
  optionOrGroup: OptionOrGroup
): optionOrGroup is HTMLCalciteOptionGroupElement {
  return optionOrGroup.tagName === "CALCITE-OPTION-GROUP";
}

/**
 * @slot - A slot for adding `calcite-option`s.
 */
@Component({
  tag: "calcite-select",
  styleUrl: "select.scss",
  shadow: true,
})
export class Select
  implements LabelableComponent, FormComponent, InteractiveComponent, LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

  /**
   * Accessible name for the component.
   *
   */
  @Prop() label!: string;

  /** Specifies the `calcite-input-message` text to display under the component, primarily for form validation. */
  @Prop() messageText: string;

  /** Specifies the `calcite-input-message` icon to display under the component, primarily for form validation. */
  @Prop() messageIcon: string | boolean;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

  /** The component's `selectedOption` value. */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueHandler(value: string): void {
    const items = this.el.querySelectorAll("calcite-option");
    items.forEach((item) => (item.selected = item.value === value));
  }

  /**
   * The component's selected option `HTMLElement`.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedOption: HTMLCalciteOptionElement;

  @Watch("selectedOption")
  selectedOptionHandler(selectedOption: HTMLCalciteOptionElement): void {
    this.value = selectedOption?.value;
  }

  /**
   * Specifies the width of the component.
   */
  @Prop({ reflect: true }) width: Width = "auto";

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteSelectElement;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Select["value"];

  private componentToNativeEl = new Map<OptionOrGroup, NativeOptionOrGroup>();

  private mutationObserver = createObserver("mutation", () => this.populateInternalSelect());

  private selectEl: HTMLSelectElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const { el } = this;

    this.mutationObserver?.observe(el, {
      subtree: true,
      childList: true,
    });

    connectInteractive(this);
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    disconnectInteractive(this);
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    afterConnectDefaultValueSet(this, this.selectedOption?.value ?? "");
  }

  componentDidRender(): void {
    updateHostInteraction(this);
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

    focusElement(this.selectEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the `selectedOption` changes.
   */
  @Event({ cancelable: false }) calciteSelectChange: EventEmitter<void>;

  private handleInternalSelectChange = (): void => {
    const selected = this.selectEl.selectedOptions[0];
    this.selectFromNativeOption(selected);
    requestAnimationFrame(() => this.emitChangeEvent());
  };

  @Listen("calciteInternalOptionChange")
  @Listen("calciteInternalOptionGroupChange")
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick(): void {
    this.setFocus();
  }

  private updateNativeElement(
    optionOrGroup: OptionOrGroup,
    nativeOptionOrGroup: NativeOptionOrGroup
  ): void {
    nativeOptionOrGroup.disabled = optionOrGroup.disabled;
    nativeOptionOrGroup.label = optionOrGroup.label;

    if (isOption(optionOrGroup)) {
      const option = nativeOptionOrGroup as HTMLOptionElement;
      option.selected = optionOrGroup.selected;
      option.value = optionOrGroup.value;

      // need to set innerText for mobile
      // see https://stackoverflow.com/questions/35021620/ios-safari-not-showing-all-options-for-select-menu/41749701
      option.innerText = optionOrGroup.label;
    }
  }

  private populateInternalSelect = (): void => {
    const optionsAndGroups = Array.from(
      this.el.children as HTMLCollectionOf<OptionOrGroup | HTMLSlotElement>
    ).filter(
      (child) => child.tagName === "CALCITE-OPTION" || child.tagName === "CALCITE-OPTION-GROUP"
    ) as OptionOrGroup[];

    this.clearInternalSelect();

    optionsAndGroups.forEach((optionOrGroup) =>
      this.selectEl?.append(this.toNativeElement(optionOrGroup))
    );
  };

  private clearInternalSelect(): void {
    this.componentToNativeEl.forEach((value) => value.remove());
    this.componentToNativeEl.clear();
  }

  private storeSelectRef = (node: HTMLSelectElement): void => {
    this.selectEl = node;
    this.populateInternalSelect();

    const selected = this.selectEl.selectedOptions[0];
    this.selectFromNativeOption(selected);
  };

  private selectFromNativeOption(nativeOption: HTMLOptionElement): void {
    if (!nativeOption) {
      return;
    }

    let futureSelected: HTMLCalciteOptionElement;

    this.componentToNativeEl.forEach((nativeOptionOrGroup, optionOrGroup) => {
      if (isOption(optionOrGroup) && nativeOptionOrGroup === nativeOption) {
        optionOrGroup.selected = true;
        futureSelected = optionOrGroup;
        this.deselectAllExcept(optionOrGroup as HTMLCalciteOptionElement);
      }
    });

    if (futureSelected) {
      this.selectedOption = futureSelected;
    }
  }

  private toNativeElement(
    optionOrGroup: HTMLCalciteOptionElement | HTMLCalciteOptionGroupElement
  ): NativeOptionOrGroup {
    if (isOption(optionOrGroup)) {
      const option = document.createElement("option");
      this.updateNativeElement(optionOrGroup, option);
      this.componentToNativeEl.set(optionOrGroup, option);

      return option;
    }

    if (isOptionGroup(optionOrGroup)) {
      const group = document.createElement("optgroup");
      this.updateNativeElement(optionOrGroup, group);

      Array.from(optionOrGroup.children as HTMLCollectionOf<HTMLCalciteOptionElement>).forEach(
        (option) => {
          const nativeOption = this.toNativeElement(option);
          group.append(nativeOption);
          this.componentToNativeEl.set(optionOrGroup, nativeOption);
        }
      );

      this.componentToNativeEl.set(optionOrGroup, group);

      return group;
    }

    throw new Error("unsupported element child provided");
  }

  private deselectAllExcept(except: HTMLCalciteOptionElement): void {
    this.el.querySelectorAll<HTMLCalciteOptionElement>("calcite-option").forEach((option) => {
      if (option === except) {
        return;
      }

      option.selected = false;
    });
  }

  private emitChangeEvent = (): void => {
    this.calciteSelectChange.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderChevron(): VNode {
    return (
      <div class={CSS.iconContainer}>
        <calcite-icon class={CSS.icon} icon="chevron-down" scale={getIconScale(this.scale)} />
      </div>
    );
  }

  render(): VNode {
    return (
      <Host>
        <div class={CSS.wrapper}>
          <select
            aria-label={getLabelText(this)}
            class={CSS.select}
            disabled={this.disabled}
            onChange={this.handleInternalSelectChange}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.storeSelectRef}
          >
            <slot />
          </select>
          {this.renderChevron()}
          <HiddenFormInputSlot component={this} />
        </div>
        {this.messageText ? (
          <div class={CSS.messageContainer}>
            <calcite-input-message icon={this.messageIcon} scale={this.scale} status={this.status}>
              {this.messageText}
            </calcite-input-message>
          </div>
        ) : null}
      </Host>
    );
  }
}
