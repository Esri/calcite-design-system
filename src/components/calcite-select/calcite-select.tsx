import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Listen,
  Method,
  Prop,
  VNode
} from "@stencil/core";
import { Direction, focusElement, getElementDir } from "../../utils/dom";
import { Scale, Width } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel } from "../../utils/label";
import { CSS } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import { createObserver } from "../../utils/observers";

type CalciteOptionOrGroup = HTMLCalciteOptionElement | HTMLCalciteOptionGroupElement;
type NativeOptionOrGroup = HTMLOptionElement | HTMLOptGroupElement;

function isOption(optionOrGroup: CalciteOptionOrGroup): optionOrGroup is HTMLCalciteOptionElement {
  return optionOrGroup.tagName === "CALCITE-OPTION";
}

function isOptionGroup(
  optionOrGroup: CalciteOptionOrGroup
): optionOrGroup is HTMLCalciteOptionGroupElement {
  return optionOrGroup.tagName === "CALCITE-OPTION-GROUP";
}

/**
 * @slot - A slot for adding `calcite-option`s.
 */
@Component({
  tag: "calcite-select",
  styleUrl: "calcite-select.scss",
  shadow: true
})
export class CalciteSelect implements LabelableComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When true, it prevents the option from being selected.
   */
  @Prop({
    reflect: true
  })
  disabled = false;

  /**
   * The component's label. This is required for accessibility purposes.
   *
   */
  @Prop()
  label!: string;

  /**
   * The component scale.
   */
  @Prop({
    reflect: true
  })
  scale: Scale = "m";

  /**
   * The currently selected option.
   *
   * @readonly
   */
  @Prop({ mutable: true })
  selectedOption: HTMLCalciteOptionElement;

  /**
   * The component width.
   */
  @Prop({
    reflect: true
  })
  width: Width = "auto";

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  @Element()
  el: HTMLCalciteSelectElement;

  private componentToNativeEl = new Map<CalciteOptionOrGroup, NativeOptionOrGroup>();

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
      childList: true
    });

    connectLabel(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    disconnectLabel(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.selectEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * This event will fire whenever the selected option changes.
   */
  @Event()
  calciteSelectChange: EventEmitter<void>;

  private handleInternalSelectChange = (): void => {
    const selected = this.selectEl.selectedOptions[0];
    this.selectFromNativeOption(selected);
    requestAnimationFrame(() => this.emitChangeEvent());
  };

  @Listen("calciteOptionChange")
  @Listen("calciteOptionGroupChange")
  protected handleOptionOrGroupChange(event: CustomEvent): void {
    event.stopPropagation();

    const optionOrGroup = event.target as CalciteOptionOrGroup;
    const nativeEl = this.componentToNativeEl.get(optionOrGroup);

    if (!nativeEl) {
      return;
    }

    this.updateNativeElement(optionOrGroup, nativeEl);

    if (isOption(optionOrGroup) && optionOrGroup.selected) {
      this.deselectAllExcept(optionOrGroup);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick = (): void => {
    this.setFocus();
  };

  private updateNativeElement(
    optionOrGroup: CalciteOptionOrGroup,
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
    const optionsAndGroups = Array.from(this.el.children as HTMLCollectionOf<CalciteOptionOrGroup>);

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
      requestAnimationFrame(() => (this.selectedOption = futureSelected));
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

  renderChevron(dir: Direction): VNode {
    return (
      <div class={{ [CSS.iconContainer]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
        <calcite-icon class={CSS.icon} icon="chevron-down" scale="s" />
      </div>
    );
  }

  render(): VNode {
    const dir = getElementDir(this.el);

    return (
      <Fragment>
        <select
          aria-label={this.label}
          class={{ [CSS.select]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
          disabled={this.disabled}
          onChange={this.handleInternalSelectChange}
          ref={this.storeSelectRef}
        >
          <slot />
        </select>
        {this.renderChevron(dir)}
      </Fragment>
    );
  }
}
