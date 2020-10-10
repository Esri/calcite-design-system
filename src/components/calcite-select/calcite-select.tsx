import { Component, Host, h, Element, Prop, VNode, Listen, Method } from "@stencil/core";
import { focusElement, getElementDir } from "../../utils/dom";
import { Scale, Theme } from "../../interfaces/common";
import { CSS } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";

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

@Component({
  tag: "calcite-select",
  styleUrl: "calcite-select.scss",
  shadow: true
})
export class CalciteSelect {
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
   * Lists all options.
   *
   * @readonly
   */
  @Prop({
    mutable: true
  })
  options: HTMLCalciteOptionElement[] = [];

  /**
   * The component scale.
   */
  @Prop({
    reflect: true
  })
  scale: Scale = "m";

  /**
   * The component width.
   */
  @Prop({
    reflect: true
  })
  width: "auto" | "half" | "full" = "auto";

  /**
   * The selected option.
   *
   * @readonly
   */
  @Prop({
    mutable: true
  })
  selectedOption: HTMLCalciteOptionElement;

  /**
   * The component theme.
   */
  @Prop({
    reflect: true
  })
  theme: Theme = "light";

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  @Element()
  private el: HTMLCalciteSelectElement;

  private componentToNativeEl = new Map<OptionOrGroup, NativeOptionOrGroup>();

  private mutationObserver = new MutationObserver(() => this.populateInternalSelect());

  private selectEl: HTMLSelectElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const { el } = this;

    this.mutationObserver.observe(el, {
      subtree: true,
      childList: true
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.el);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Listen("calciteOptionChange")
  @Listen("calciteOptionGroupChange")
  protected handleOptionOrGroupChange(event: CustomEvent): void {
    event.stopPropagation();

    const optionOrGroup = event.target as OptionOrGroup;
    const nativeEl = this.componentToNativeEl.get(optionOrGroup);

    if (!nativeEl) {
      return;
    }

    this.syncProps(nativeEl, event.target as OptionOrGroup);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private syncProps(nativeOptionOrGroup: NativeOptionOrGroup, optionOrGroup: OptionOrGroup): void {
    nativeOptionOrGroup.disabled = optionOrGroup.disabled;
    nativeOptionOrGroup.label = optionOrGroup.label;

    if (isOption(optionOrGroup)) {
      const option = nativeOptionOrGroup as HTMLOptionElement;
      option.selected = optionOrGroup.selected;
      option.value = optionOrGroup.value;
    }
  }

  private populateInternalSelect = (): void => {
    this.emptyInternalSelect();

    Array.from(this.el.children as HTMLCollectionOf<OptionOrGroup>).forEach((optionOrGroup) =>
      this.selectEl.append(this.toNativeElement(optionOrGroup as any))
    );
  };

  private emptyInternalSelect(): void {
    Array.from(this.selectEl.children as HTMLCollectionOf<NativeOptionOrGroup>).forEach(
      (optionOrGroup) => {
        this.componentToNativeEl.clear();
        optionOrGroup.remove();
      }
    );
  }

  private storeSelectRef = (node: HTMLSelectElement): void => {
    this.selectEl = node;
    this.populateInternalSelect();
    this.updateReadOnlyProps();
  };

  private toNativeElement(
    optionOrGroup: HTMLCalciteOptionElement | HTMLCalciteOptionGroupElement
  ): NativeOptionOrGroup {
    if (isOption(optionOrGroup)) {
      const option = document.createElement("option");

      option.disabled = optionOrGroup.disabled;
      option.label = optionOrGroup.label;
      option.selected = optionOrGroup.selected;
      option.value = optionOrGroup.value;

      this.componentToNativeEl.set(optionOrGroup, option);

      return option;
    }

    if (isOptionGroup(optionOrGroup)) {
      const group = document.createElement("optgroup");

      group.disabled = optionOrGroup.disabled;
      group.label = optionOrGroup.label;

      Array.from(optionOrGroup.children).forEach((option) => {
        const nativeOption = this.toNativeElement(option as HTMLCalciteOptionElement);
        group.append(nativeOption);
        this.componentToNativeEl.set(optionOrGroup, nativeOption);
      });

      this.componentToNativeEl.set(optionOrGroup, group);

      return group;
    }

    throw new Error("unsupported element child provided");
  }

  private updateReadOnlyProps(): void {
    const { el } = this;

    const allOptions = Array.from(el.querySelectorAll<HTMLCalciteOptionElement>("calcite-option"));
    const groups = Array.from(
      el.querySelectorAll<HTMLCalciteOptionGroupElement>("calcite-option-group:not([disabled])")
    );

    this.options = allOptions;

    if (groups.length > 0) {
      const selectableOptions = groups
        .map((group) =>
          Array.from(
            group.querySelectorAll<HTMLCalciteOptionElement>("calcite-option:not([disabled])")
          )
        )
        .reduce((all, current) => [...all, ...current], []);

      if (selectableOptions.length > 0) {
        const firstSelected =
          selectableOptions.find((option) => option.selected) || selectableOptions[0];

        this.select(firstSelected);
        return;
      }

      this.select(selectableOptions.length > 0 ? selectableOptions[0] : allOptions[0]);
    } else {
      const selectableOptions = Array.from(
        el.querySelectorAll<HTMLCalciteOptionElement>("calcite-option:not([disabled])")
      );

      if (selectableOptions.length > 0) {
        const firstSelected =
          selectableOptions.find((option) => option.selected) || selectableOptions[0];

        this.select(firstSelected);
      }
    }
  }

  private select(option: HTMLCalciteOptionElement): void {
    this.selectedOption = option;
    this.deselectOptions(option);
  }

  private deselectOptions(except: HTMLCalciteOptionElement): void {
    this.options.forEach((option) => {
      if (option === except) {
        return;
      }

      option.selected = false;
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderChevron(): VNode {
    const rtl = getElementDir(this.el) === "rtl";

    return (
      <calcite-icon
        class={{ [CSS.icon]: true, [CSS_UTILITY.rtl]: rtl }}
        icon="chevron-down"
        scale="s"
      />
    );
  }

  render(): VNode {
    return (
      <Host>
        <select disabled={this.disabled} ref={this.storeSelectRef}>
          <slot />
        </select>
        {this.renderChevron()}
      </Host>
    );
  }
}
