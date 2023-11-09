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
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { debounce } from "lodash-es";
import { filter } from "../../utils/filter";

import {
  getElementWidth,
  getTextWidth,
  isPrimaryPointerButton,
  toAriaBoolean,
} from "../../utils/dom";
import {
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  EffectivePlacement,
  filterComputedPlacements,
  FloatingCSS,
  FloatingUIComponent,
  LogicalPlacement,
  OverlayPositioning,
  reposition,
} from "../../utils/floating-ui";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm,
} from "../../utils/form";
import { guid } from "../../utils/guid";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Scale, SelectionMode } from "../interfaces";
import { ComboboxMessages } from "./assets/combobox/t9n";
import { ComboboxChildElement } from "./interfaces";
import { ComboboxChildSelector, ComboboxItem, ComboboxItemGroup, CSS } from "./resources";
import { getItemAncestors, getItemChildren, hasActiveChildren, isSingleLike } from "./utils";
import { XButton, CSS as XButtonCSS } from "../functional/XButton";
import { getIconScale } from "../../utils/component";

interface ItemData {
  label: string;
  value: string;
}

type DisplayMode = "show-all" | "single" | "fit-to-line";

const isGroup = (el: ComboboxChildElement): el is HTMLCalciteComboboxItemGroupElement =>
  el.tagName === ComboboxItemGroup;

const itemUidPrefix = "combobox-item-";
const chipUidPrefix = "combobox-chip-";
const labelUidPrefix = "combobox-label-";
const listboxUidPrefix = "combobox-listbox-";
const inputUidPrefix = "combobox-input-";

/**
 * @slot - A slot for adding `calcite-combobox-item`s.
 */
@Component({
  tag: "calcite-combobox",
  styleUrl: "combobox.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Combobox
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    OpenCloseComponent,
    FloatingUIComponent,
    T9nComponent,
    LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the value-clearing will be disabled.
   */
  @Prop({ reflect: true }) clearDisabled = false;

  /**
   * Controls the display behavior of multiple selected items.
   * This property does not apply when selection-mode is set to "single" or "single-persist".
   * - "show-all" displays every selected chip, wrapping to the next line if necessary
   * - "single" displays a single chip indicating the total amount of selected items
   * - "fit-to-line" only displays selected chips that fit horizontally, with a non-closable chip indicating additional selected items as needed
   */
  @Prop() displayMode: DisplayMode = "show-all";

  /**When `true`, displays and positions the component. */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);

    if (this.disabled) {
      this.open = false;
      return;
    }

    this.setMaxScrollerHeight();
  }

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  handleDisabledChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  /**
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /** Accessible name for the component. */
  @Prop() label!: string;

  /** Specifies the placeholder text for the input. */
  @Prop() placeholder: string;

  /** Specifies the placeholder icon for the input. */
  @Prop({ reflect: true }) placeholderIcon: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) placeholderIconFlipRtl = false;

  /** Specifies the maximum number of `calcite-combobox-item`s (including nested children) to display before displaying a scrollbar. */
  @Prop({ reflect: true }) maxItems = 0;

  @Watch("maxItems")
  maxItemsHandler(): void {
    this.setMaxScrollerHeight();
  }

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /** When `true`, allows entry of custom values, which are not in the original set of items. */
  @Prop({ reflect: true }) allowCustomValues: boolean;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition(true);
  }

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /**
   * Specifies the selection mode:
   * - "multiple" allows any number of selected items (default),
   * - "single" allows only one selection,
   * - "single-persist" allow and require one open item,
   * - "ancestors" is like multiple, but shows ancestors of selected items as selected, with only deepest children shown in chips.
   */
  @Prop({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "ancestors" | "multiple",
    SelectionMode
  > = "multiple";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("selectionMode")
  @Watch("scale")
  handlePropsChange(): void {
    this.updateItems();
  }

  /** The component's value(s) from the selected `calcite-combobox-item`(s). */
  @Prop({ mutable: true }) value: string | string[] = null;

  @Watch("value")
  valueHandler(value: string | string[]): void {
    if (!this.internalValueChangeFlag) {
      const items = this.getItems();
      if (Array.isArray(value)) {
        items.forEach((item) => (item.selected = value.includes(item.value)));
      } else if (value) {
        items.forEach((item) => (item.selected = value === item.value));
      } else {
        items.forEach((item) => (item.selected = false));
      }
      this.updateItems();
    }
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements: EffectivePlacement[];

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ComboboxMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ComboboxMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /*  wired up by t9n util */
  }

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteComboboxItemElement[] = [];

  @Watch("selectedItems")
  selectedItemsHandler(): void {
    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
  }

  /**
   * Specifies the component's filtered items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredItems: HTMLCalciteComboboxItemElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("pointerdown", { target: "document" })
  documentClickHandler(event: PointerEvent): void {
    if (this.disabled || !isPrimaryPointerButton(event)) {
      return;
    }

    const composedPath = event.composedPath();

    if (composedPath.includes(this.el) || composedPath.includes(this.referenceEl)) {
      return;
    }

    if (!this.allowCustomValues && this.textInput.value) {
      this.clearInputValue();
      this.filterItems("");
      this.updateActiveItemIndex(-1);
    }

    if (this.allowCustomValues && this.text.trim().length) {
      this.addCustomChip(this.text);
    }

    this.open = false;
  }

  @Listen("calciteComboboxItemChange")
  calciteComboboxItemChangeHandler(event: CustomEvent<HTMLCalciteComboboxItemElement>): void {
    if (this.ignoreSelectedEventsFlag) {
      return;
    }

    const target = event.target as HTMLCalciteComboboxItemElement;
    const newIndex = this.filteredItems.indexOf(target);
    this.updateActiveItemIndex(newIndex);
    this.toggleSelection(target, target.selected);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  @Method()
  async reposition(delayed = false): Promise<void> {
    const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;

    return reposition(
      this,
      {
        floatingEl,
        referenceEl,
        overlayPositioning,
        placement,
        flipPlacements: filteredFlipPlacements,
        type: "menu",
      },
      delayed
    );
  }

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.textInput?.focus();
    this.activeChipIndex = -1;
    this.activeItemIndex = -1;
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the selected item(s) changes.
   */
  @Event({ cancelable: false }) calciteComboboxChange: EventEmitter<void>;

  /** Fires when text is added to filter the options list. */
  @Event({ cancelable: false }) calciteComboboxFilterChange: EventEmitter<void>;

  /**
   * Fires when a selected item in the component is closed via its `calcite-chip`.
   */
  @Event({ cancelable: false }) calciteComboboxChipClose: EventEmitter<void>;

  /** Fires when the component is requested to be closed, and before the closing transition begins. */
  @Event({ cancelable: false }) calciteComboboxBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteComboboxClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteComboboxBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteComboboxOpen: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
    connectLabel(this);
    connectForm(this);

    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });

    this.updateItems();
    this.setFilteredPlacements();
    this.reposition(true);

    if (this.open) {
      this.openHandler();
      onToggleOpenCloseComponent(this);
    }
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    this.updateItems();
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    afterConnectDefaultValueSet(this, this.getValue());
    this.reposition(true);
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition(true);
      this.inputHeight = this.el.offsetHeight;
    }

    updateHostInteraction(this);
  }

  componentDidUpdate(): void {
    this.refreshDisplayMode();
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectInteractive(this);
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteComboboxElement;

  placement: LogicalPlacement = defaultMenuPlacement;

  filteredFlipPlacements: EffectivePlacement[];

  internalValueChangeFlag = false;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Combobox["value"];

  @State() items: HTMLCalciteComboboxItemElement[] = [];

  @State() groupItems: HTMLCalciteComboboxItemGroupElement[] = [];

  @State() needsIcon: boolean;

  @State() activeItemIndex = -1;

  @State() activeChipIndex = -1;

  @State() activeDescendant = "";

  @State() text = "";

  /** when search text is cleared, reset active to  */
  @Watch("text")
  textHandler(): void {
    this.updateActiveItemIndex(-1);
  }

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ComboboxMessages;

  @State() selectedHiddenChipsCount: number;

  @State() selectedIndicatorChipLabel: string;

  @State() selectedVisibleChipsCount: number;

  textInput: HTMLInputElement = null;

  data: ItemData[];

  mutationObserver = createObserver("mutation", () => this.updateItems());

  resizeObserver = createObserver("resize", () => {
    this.setMaxScrollerHeight();
    this.refreshDisplayMode();
  });

  private guid = guid();

  private inputHeight = 0;

  private floatingEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private chipContainerEl: HTMLDivElement;

  private listContainerEl: HTMLDivElement;

  private ignoreSelectedEventsFlag = false;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  private allSelectedIndicatorChipEl: HTMLCalciteChipElement;

  private allSelectedIndicatorChipCompactEl: HTMLCalciteChipElement;

  private selectedIndicatorChipEl: HTMLCalciteChipElement;

  private selectedIndicatorChipCompactEl: HTMLCalciteChipElement;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private clearValue(): void {
    this.ignoreSelectedEventsFlag = true;
    this.items.forEach((el) => (el.selected = false));
    this.ignoreSelectedEventsFlag = false;
    this.selectedItems = [];
    this.emitComboboxChange();
    this.open = false;
    this.updateActiveItemIndex(-1);
    this.resetText();
    this.filterItems("");
    this.setFocus();
  }

  private clearInputValue(): void {
    this.textInput.value = "";
    this.text = "";
  }

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterComputedPlacements(flipPlacements, el)
      : null;
  };

  getValue = (): string | string[] => {
    const items = this.selectedItems.map((item) => item?.value?.toString());
    return items?.length ? (items.length > 1 ? items : items[0]) : "";
  };

  onLabelClick = (): void => {
    this.setFocus();
  };

  private comboboxInViewport(): boolean {
    const bounding = this.el.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  private keyDownHandler = (event: KeyboardEvent): void => {
    const { key } = event;

    switch (key) {
      case "Tab":
        this.activeChipIndex = -1;
        this.activeItemIndex = -1;
        if (this.allowCustomValues && this.text) {
          this.addCustomChip(this.text, true);
          event.preventDefault();
        } else if (this.open) {
          this.open = false;
          event.preventDefault();
        } else if (!this.allowCustomValues && this.text) {
          this.clearInputValue();
          this.filterItems("");
          this.updateActiveItemIndex(-1);
        }
        break;
      case "ArrowLeft":
        this.previousChip();
        event.preventDefault();
        break;
      case "ArrowRight":
        this.nextChip();
        event.preventDefault();
        break;
      case "ArrowUp":
        event.preventDefault();
        if (this.open) {
          this.shiftActiveItemIndex(-1);
        }

        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (this.open) {
          this.shiftActiveItemIndex(1);
        } else {
          this.open = true;
          this.ensureRecentSelectedItemIsActive();
        }

        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case " ":
        if (!this.textInput.value) {
          if (!this.open) {
            this.open = true;
            this.shiftActiveItemIndex(1);
          }
          event.preventDefault();
        }
        break;
      case "Home":
        if (!this.open) {
          return;
        }
        event.preventDefault();
        this.updateActiveItemIndex(0);
        this.scrollToActiveItem();
        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case "End":
        if (!this.open) {
          return;
        }
        event.preventDefault();
        this.updateActiveItemIndex(this.filteredItems.length - 1);
        this.scrollToActiveItem();
        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case "Escape":
        if (!this.clearDisabled && !this.open) {
          this.clearValue();
        }

        this.open = false;
        event.preventDefault();
        break;
      case "Enter":
        if (this.activeItemIndex > -1) {
          this.toggleSelection(this.filteredItems[this.activeItemIndex]);
          event.preventDefault();
        } else if (this.activeChipIndex > -1) {
          this.removeActiveChip();
          event.preventDefault();
        } else if (this.allowCustomValues && this.text) {
          this.addCustomChip(this.text, true);
          event.preventDefault();
        } else if (!event.defaultPrevented) {
          if (submitForm(this)) {
            event.preventDefault();
          }
        }
        break;
      case "Delete":
      case "Backspace":
        if (this.activeChipIndex > -1) {
          event.preventDefault();
          this.removeActiveChip();
        } else if (!this.text && this.isMulti()) {
          event.preventDefault();
          this.removeLastChip();
        }
        break;
    }
  };

  private toggleCloseEnd = (): void => {
    this.open = false;
    this.el.removeEventListener("calciteComboboxClose", this.toggleCloseEnd);
  };

  private toggleOpenEnd = (): void => {
    this.open = false;
    this.el.removeEventListener("calciteComboboxOpen", this.toggleOpenEnd);
  };

  onBeforeOpen(): void {
    this.scrollToActiveItem();
    this.calciteComboboxBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteComboboxOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteComboboxBeforeClose.emit();
  }

  onClose(): void {
    this.calciteComboboxClose.emit();
  }

  setMaxScrollerHeight = async (): Promise<void> => {
    const { listContainerEl, open, referenceEl } = this;

    if (!listContainerEl || !open) {
      return;
    }

    await this.reposition(true);
    const maxScrollerHeight = this.getMaxScrollerHeight();
    listContainerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    listContainerEl.style.minWidth = `${referenceEl.clientWidth}px`;
    await this.reposition(true);
  };

  calciteChipCloseHandler = (comboboxItem: HTMLCalciteComboboxItemElement): void => {
    this.open = false;

    const selection = this.items.find((item) => item === comboboxItem);

    if (selection) {
      this.toggleSelection(selection, false);
    }

    this.calciteComboboxChipClose.emit();
  };

  clickHandler = (event: MouseEvent): void => {
    const composedPath = event.composedPath();

    if (composedPath.some((node: HTMLElement) => node.tagName === "CALCITE-CHIP")) {
      this.open = false;
      event.preventDefault();
      return;
    }

    if (composedPath.some((node: HTMLElement) => node.classList?.contains(XButtonCSS.button))) {
      this.clearValue();
      event.preventDefault();
      return;
    }

    this.open = !this.open;
    this.ensureRecentSelectedItemIsActive();
  };

  private ensureRecentSelectedItemIsActive(): void {
    const { selectedItems } = this;
    const targetIndex =
      selectedItems.length === 0 ? 0 : this.items.indexOf(selectedItems[selectedItems.length - 1]);

    this.updateActiveItemIndex(targetIndex);
  }

  private hideChip(chipEl: HTMLCalciteChipElement): void {
    chipEl.classList.add(CSS.chipInvisible);
  }

  private showChip(chipEl: HTMLCalciteChipElement): void {
    chipEl.classList.remove(CSS.chipInvisible);
  }

  private maxCompactBreakpoint: number;

  private refreshDisplayMode = async () => {
    await componentLoaded(this);

    if (isSingleLike(this.selectionMode)) {
      return;
    }

    if (!this.textInput) {
      return;
    }

    const {
      allSelectedIndicatorChipEl,
      allSelectedIndicatorChipCompactEl,
      chipContainerEl,
      displayMode,
      getSelectedItems,
      hideChip,
      placeholder,
      selectedIndicatorChipEl,
      selectedIndicatorChipCompactEl,
      showChip,
      textInput,
    } = this;

    const allSelected = this.isAllSelected();

    if (displayMode === "fit-to-line") {
      const chipEls = Array.from(this.el.shadowRoot.querySelectorAll("calcite-chip")).filter(
        (chipEl) => chipEl.hasAttribute("closable")
      );
      const { fontSize, fontFamily } = getComputedStyle(textInput);
      const chipContainerElWidth = getElementWidth(chipContainerEl);
      const chipContainerElGap = parseInt(getComputedStyle(chipContainerEl).gap.replace("px", ""));
      const inputTextWidth = getTextWidth(placeholder, `${fontSize} ${fontFamily}`);
      // TODO: use the 48px token here as the minimum input width.
      const inputWidth = (inputTextWidth || 48) + chipContainerElGap;
      const selectedIndicatorChipElWidth = selectedIndicatorChipEl.classList.contains(
        CSS.chipInvisible
      )
        ? 0
        : getElementWidth(selectedIndicatorChipEl);

      let availableHorizontalChipElSpace = Math.round(
        chipContainerElWidth - (selectedIndicatorChipElWidth + chipContainerElGap + inputWidth)
      );

      chipEls.forEach((chipEl: HTMLCalciteChipElement) => {
        if (chipEl.selected) {
          const chipElWidth = getElementWidth(chipEl);
          if (chipElWidth && chipElWidth < availableHorizontalChipElSpace) {
            availableHorizontalChipElSpace -= chipElWidth + chipContainerElGap;
            showChip(chipEl);
          } else {
            hideChip(chipEl);
          }
        } else {
          hideChip(chipEl);
        }
      });

      let newSelectedVisibleChipsCount = 0;
      chipEls.forEach((chipEl) => {
        if (chipEl.selected && !chipEl.classList.contains(CSS.chipInvisible)) {
          newSelectedVisibleChipsCount++;
        }
      });

      const newSelectedHiddenChipsCount = getSelectedItems().length - newSelectedVisibleChipsCount;

      if (newSelectedHiddenChipsCount !== this.selectedHiddenChipsCount) {
        this.selectedHiddenChipsCount = newSelectedHiddenChipsCount;
      }

      if (newSelectedVisibleChipsCount !== this.selectedVisibleChipsCount) {
        this.selectedVisibleChipsCount = newSelectedVisibleChipsCount;
      }

      const { selectedHiddenChipsCount, selectedVisibleChipsCount } = this;

      const newCompactBreakpoint = Math.round(
        getElementWidth(allSelectedIndicatorChipEl) + chipContainerElGap + inputWidth
      );

      if (!this.maxCompactBreakpoint || this.maxCompactBreakpoint < newCompactBreakpoint) {
        this.maxCompactBreakpoint = newCompactBreakpoint;
      }

      console.log(
        this.maxCompactBreakpoint,
        "selectedVisibleChipsCount",
        selectedVisibleChipsCount
      );

      if (allSelected && selectedVisibleChipsCount !== undefined && !selectedVisibleChipsCount) {
        hideChip(selectedIndicatorChipEl);
        // TODO: calculate the max width of the all selected chip + gap + placeholder text length to determine the compact breakpoint
        if (chipContainerElWidth < this.maxCompactBreakpoint) {
          hideChip(allSelectedIndicatorChipEl);
          showChip(allSelectedIndicatorChipCompactEl);
        } else {
          showChip(allSelectedIndicatorChipEl);
          hideChip(allSelectedIndicatorChipCompactEl);
        }
      }
      // } else if (selectedHiddenChipsCount > 0) {
      //   this.hideChip(allSelectedIndicatorChipEl);
      //   this.hideChip(allSelectedIndicatorChipCompactEl);
      //   this.showChip(selectedIndicatorChipEl);
      // } else {
      //   this.hideChip(allSelectedIndicatorChipEl);
      //   this.hideChip(allSelectedIndicatorChipCompactEl);
      //   this.hideChip(selectedIndicatorChipEl);
      // }
    } else if (displayMode === "single") {
      const selectedItemsCount = getSelectedItems().length;
      if (allSelected) {
        this.selectedIndicatorChipLabel = "All selected";
      } else if (selectedItemsCount > 0) {
        this.selectedIndicatorChipLabel = `${selectedItemsCount} selected`;
      } else {
        this.selectedIndicatorChipLabel = null;
      }
    }
  };

  setFloatingEl = (el: HTMLDivElement): void => {
    this.floatingEl = el;
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
  };

  setContainerEl = (el: HTMLDivElement): void => {
    this.resizeObserver.observe(el);
    this.listContainerEl = el;
    this.transitionEl = el;
  };

  setChipContainerEl = (el: HTMLDivElement): void => {
    this.resizeObserver.observe(el);
    this.chipContainerEl = el;
  };

  setReferenceEl = (el: HTMLDivElement): void => {
    this.referenceEl = el;
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
  };

  setAllSelectedIndicatorChipEl = (el: HTMLCalciteChipElement): void => {
    this.allSelectedIndicatorChipEl = el;
  };

  setAllSelectedIndicatorChipCompactEl = (el: HTMLCalciteChipElement): void => {
    this.allSelectedIndicatorChipCompactEl = el;
  };

  setSelectedIndicatorChipEl = (el: HTMLCalciteChipElement): void => {
    this.selectedIndicatorChipEl = el;
  };

  setSelectedIndicatorChipCompactEl = (el: HTMLCalciteChipElement): void => {
    this.selectedIndicatorChipCompactEl = el;
  };

  private getMaxScrollerHeight(): number {
    const items = this.getItemsAndGroups().filter((item) => !item.hidden);

    const { maxItems } = this;

    let itemsToProcess = 0;
    let maxScrollerHeight = 0;

    if (items.length > maxItems) {
      items.forEach((item) => {
        if (itemsToProcess < maxItems && maxItems > 0) {
          const height = this.calculateSingleItemHeight(item);
          if (height > 0) {
            maxScrollerHeight += height;
            itemsToProcess++;
          }
        }
      });
    }

    return maxScrollerHeight;
  }

  private calculateSingleItemHeight(item: ComboboxChildElement): number {
    if (!item) {
      return;
    }

    let height = item.offsetHeight;
    // if item has children items, don't count their height twice
    const children = Array.from(item.querySelectorAll<ComboboxChildElement>(ComboboxChildSelector));
    children
      .map((child) => child?.offsetHeight)
      .forEach((offsetHeight) => {
        height -= offsetHeight;
      });
    return height;
  }

  inputHandler = (event: Event): void => {
    const value = (event.target as HTMLInputElement).value;
    this.text = value;
    this.filterItems(value);
    if (value) {
      this.activeChipIndex = -1;
    }
  };

  getItemsAndGroups(): ComboboxChildElement[] {
    return [...this.groupItems, ...this.items];
  }

  private filterItems = (() => {
    const find = (item: ComboboxChildElement, filteredData: ItemData[]) =>
      item &&
      filteredData.some(({ label, value }) =>
        isGroup(item) ? label === item.label : value === item.value && label === item.textLabel
      );

    return debounce((text: string): void => {
      const filteredData = filter(this.data, text);
      const itemsAndGroups = this.getItemsAndGroups();

      itemsAndGroups.forEach((item) => {
        const hidden = !find(item, filteredData);
        item.hidden = hidden;
        const [parent, grandparent] = item.ancestors;

        if (find(parent, filteredData) || find(grandparent, filteredData)) {
          item.hidden = false;
        }

        if (!hidden) {
          item.ancestors.forEach((ancestor) => (ancestor.hidden = false));
        }
      });

      this.filteredItems = this.getFilteredItems();
      this.calciteComboboxFilterChange.emit();
    }, 100);
  })();

  internalComboboxChangeEvent = (): void => {
    this.calciteComboboxChange.emit();
  };

  private emitComboboxChange = debounce(this.internalComboboxChangeEvent, 0);

  toggleSelection(item: HTMLCalciteComboboxItemElement, value = !item.selected): void {
    if (
      !item ||
      (this.selectionMode === "single-persist" && item.selected && item.value === this.value)
    ) {
      return;
    }

    if (this.isMulti()) {
      item.selected = value;
      this.updateAncestors(item);
      this.selectedItems = this.getSelectedItems();
      this.emitComboboxChange();
      this.resetText();
      this.filterItems("");
    } else {
      this.ignoreSelectedEventsFlag = true;
      this.items.forEach((el) => (el.selected = el === item ? value : false));
      this.ignoreSelectedEventsFlag = false;
      this.selectedItems = this.getSelectedItems();
      this.emitComboboxChange();

      if (this.textInput) {
        this.textInput.value = item.textLabel;
      }
      this.open = false;
      this.updateActiveItemIndex(-1);
      this.resetText();
      this.filterItems("");
    }
  }

  updateAncestors(item: HTMLCalciteComboboxItemElement): void {
    if (this.selectionMode !== "ancestors") {
      return;
    }
    const ancestors = getItemAncestors(item);
    const children = getItemChildren(item);
    if (item.selected) {
      ancestors.forEach((el) => {
        (el as HTMLCalciteComboboxItemElement).selected = true;
      });
    } else {
      children.forEach((el) => (el.selected = false));
      [...ancestors].forEach((el) => {
        if (!hasActiveChildren(el)) {
          el.selected = false;
        }
      });
    }
  }

  getFilteredItems(): HTMLCalciteComboboxItemElement[] {
    return this.items.filter((item) => !item.hidden);
  }

  private getSelectedItems = (): HTMLCalciteComboboxItemElement[] => {
    if (!this.isMulti()) {
      const match = this.items.find(({ selected }) => selected);
      return match ? [match] : [];
    }

    return (
      this.items
        .filter(
          (item) =>
            item.selected && (this.selectionMode !== "ancestors" || !hasActiveChildren(item))
        )
        /** Preserve order of entered tags */
        .sort((a, b) => {
          const aIdx = this.selectedItems.indexOf(a);
          const bIdx = this.selectedItems.indexOf(b);
          if (aIdx > -1 && bIdx > -1) {
            return aIdx - bIdx;
          }
          return bIdx - aIdx;
        })
    );
  };

  private updateItems = (): void => {
    this.items = this.getItems();
    this.groupItems = this.getGroupItems();
    this.data = this.getData();
    this.selectedItems = this.getSelectedItems();
    this.filteredItems = this.getFilteredItems();
    this.needsIcon = this.getNeedsIcon();

    this.items.forEach((item) => {
      item.selectionMode = this.selectionMode;
      item.scale = this.scale;
    });

    if (!this.allowCustomValues) {
      this.setMaxScrollerHeight();
    }

    this.groupItems.forEach((groupItem, index, items) => {
      if (index === 0) {
        groupItem.afterEmptyGroup = false;
      }

      const nextGroupItem = items[index + 1];

      if (nextGroupItem) {
        nextGroupItem.afterEmptyGroup = groupItem.children.length === 0;
      }
    });
  };

  getData(): ItemData[] {
    return this.items.map((item) => ({
      filterDisabled: item.filterDisabled,
      value: item.value,
      label: item.textLabel,
    }));
  }

  getNeedsIcon(): boolean {
    return isSingleLike(this.selectionMode) && this.items.some((item) => item.icon);
  }

  resetText(): void {
    if (this.textInput) {
      this.textInput.value = "";
    }
    this.text = "";
  }

  getItems(): HTMLCalciteComboboxItemElement[] {
    const items: HTMLCalciteComboboxItemElement[] = Array.from(
      this.el.querySelectorAll(ComboboxItem)
    );
    return items.filter((item) => !item.disabled);
  }

  getGroupItems(): HTMLCalciteComboboxItemGroupElement[] {
    return Array.from(this.el.querySelectorAll(ComboboxItemGroup));
  }

  addCustomChip(value: string, focus?: boolean): void {
    const existingItem = this.items.find((el) => el.textLabel === value);
    if (existingItem) {
      this.toggleSelection(existingItem, true);
    } else {
      if (!this.isMulti()) {
        this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
      }
      const item = document.createElement(ComboboxItem) as HTMLCalciteComboboxItemElement;
      item.value = value;
      item.textLabel = value;
      item.selected = true;
      this.el.appendChild(item);
      this.resetText();
      if (focus) {
        this.setFocus();
      }
      this.updateItems();
      this.filterItems("");
      this.emitComboboxChange();
    }
  }

  removeActiveChip(): void {
    this.toggleSelection(this.selectedItems[this.activeChipIndex], false);
    this.setFocus();
  }

  removeLastChip(): void {
    this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
    this.setFocus();
  }

  previousChip(): void {
    if (this.text) {
      return;
    }
    const length = this.selectedItems.length - 1;
    const active = this.activeChipIndex;
    this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
    this.updateActiveItemIndex(-1);
    this.focusChip();
  }

  nextChip(): void {
    if (this.text || this.activeChipIndex === -1) {
      return;
    }
    const last = this.selectedItems.length - 1;
    const newIndex = this.activeChipIndex + 1;
    if (newIndex > last) {
      this.activeChipIndex = -1;
      this.setFocus();
    } else {
      this.activeChipIndex = newIndex;
      this.focusChip();
    }
    this.updateActiveItemIndex(-1);
  }

  focusChip(): void {
    const guid = this.selectedItems[this.activeChipIndex]?.guid;

    const chip = guid
      ? this.referenceEl.querySelector<HTMLCalciteChipElement>(`#${chipUidPrefix}${guid}`)
      : null;
    chip?.setFocus();
  }

  private scrollToActiveItem = (): void => {
    const activeItem = this.filteredItems[this.activeItemIndex];

    if (!activeItem) {
      return;
    }

    const height = this.calculateSingleItemHeight(activeItem);
    const { offsetHeight, scrollTop } = this.listContainerEl;
    if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
      this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
    } else if (activeItem.offsetTop < scrollTop) {
      this.listContainerEl.scrollTop = activeItem.offsetTop;
    }
  };

  shiftActiveItemIndex(delta: number): void {
    const { length } = this.filteredItems;
    const newIndex = (this.activeItemIndex + length + delta) % length;
    this.updateActiveItemIndex(newIndex);
    this.scrollToActiveItem();
  }

  updateActiveItemIndex(index: number): void {
    this.activeItemIndex = index;
    let activeDescendant: string = null;
    this.filteredItems.forEach((el, i) => {
      if (i === index) {
        el.active = true;
        activeDescendant = `${itemUidPrefix}${el.guid}`;
      } else {
        el.active = false;
      }
    });
    this.activeDescendant = activeDescendant;
    if (this.activeItemIndex > -1) {
      this.activeChipIndex = -1;
    }
  }

  private isAllSelected = (): boolean => {
    return this.getItems().length === this.getSelectedItems().length;
  };

  isMulti(): boolean {
    return !isSingleLike(this.selectionMode);
  }

  comboboxFocusHandler = (): void => {
    if (this.disabled) {
      return;
    }

    this.textInput?.focus();
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderChips(): VNode[] {
    const { activeChipIndex, scale, selectionMode, messages } = this;
    return this.selectedItems.map((item, i) => {
      const chipClasses = {
        chip: true,
        "chip--active": activeChipIndex === i,
      };
      const ancestors = [...getItemAncestors(item)].reverse();
      const pathLabel = [...ancestors, item].map((el) => el.textLabel);
      const label = selectionMode !== "ancestors" ? item.textLabel : pathLabel.join(" / ");
      return (
        <calcite-chip
          class={chipClasses}
          closable
          icon={item.icon}
          iconFlipRtl={item.iconFlipRtl}
          id={item.guid ? `${chipUidPrefix}${item.guid}` : null}
          key={item.textLabel}
          messageOverrides={{ dismissLabel: messages.removeTag }}
          onCalciteChipClose={() => this.calciteChipCloseHandler(item)}
          scale={scale}
          selected={item.selected}
          title={label}
          value={item.value}
        >
          {label}
        </calcite-chip>
      );
    });
  }

  renderAllSelectedIndicatorChip(): VNode {
    const { scale, setAllSelectedIndicatorChipEl } = this;
    const label = this.messages.allSelected || "All selected";
    return (
      <calcite-chip
        class={{ chip: true, [CSS.chipInvisible]: true }}
        ref={setAllSelectedIndicatorChipEl}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  renderAllSelectedIndicatorChipCompact(): VNode {
    const { scale, setAllSelectedIndicatorChipCompactEl } = this;
    const label = this.messages.all || "All";
    return (
      <calcite-chip
        class={{ chip: true, [CSS.chipInvisible]: true }}
        ref={setAllSelectedIndicatorChipCompactEl}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  renderSelectedIndicatorChip(): VNode {
    const { scale, selectedHiddenChipsCount, setSelectedIndicatorChipEl } = this;
    const label = `+${selectedHiddenChipsCount}`;
    return (
      <calcite-chip
        class={{ chip: true, [CSS.chipInvisible]: !selectedHiddenChipsCount }}
        ref={setSelectedIndicatorChipEl}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  renderSelectedIndicatorChipCompact(): VNode {
    const {
      scale,
      selectedHiddenChipsCount,
      selectedVisibleChipsCount,
      setSelectedIndicatorChipCompactEl,
    } = this;
    const label = `${selectedHiddenChipsCount || 0}`;
    return (
      <calcite-chip
        class={{
          chip: true,
          [CSS.chipInvisible]: selectedHiddenChipsCount > 0 && !selectedVisibleChipsCount,
        }}
        ref={setSelectedIndicatorChipCompactEl}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  renderInput(): VNode {
    const { guid, disabled, placeholder, selectionMode, selectedItems, open } = this;
    const single = isSingleLike(selectionMode);
    const selectedItem = selectedItems[0];
    const showLabel = !open && single && !!selectedItem;

    return (
      <span
        class={{
          "input-wrap": true,
          "input-wrap--single": single,
        }}
      >
        {showLabel && (
          <span
            class={{
              label: true,
              "label--icon": !!selectedItem?.icon,
            }}
            key="label"
          >
            {selectedItem.textLabel}
          </span>
        )}
        <input
          aria-activedescendant={this.activeDescendant}
          aria-autocomplete="list"
          aria-controls={`${listboxUidPrefix}${guid}`}
          aria-label={getLabelText(this)}
          class={{
            input: true,
            "input--single": true,
            "input--transparent": this.activeChipIndex > -1,
            "input--hidden": showLabel,
            "input--icon": !!this.placeholderIcon,
          }}
          disabled={disabled}
          id={`${inputUidPrefix}${guid}`}
          key="input"
          onFocus={this.comboboxFocusHandler}
          onInput={this.inputHandler}
          placeholder={placeholder}
          type="text"
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el) => (this.textInput = el as HTMLInputElement)}
        />
      </span>
    );
  }

  renderListBoxOptions(): VNode[] {
    return this.filteredItems.map((item) => (
      <li
        aria-selected={toAriaBoolean(item.selected)}
        id={item.guid ? `${itemUidPrefix}${item.guid}` : null}
        role="option"
        tabindex="-1"
      >
        {item.textLabel}
      </li>
    ));
  }

  renderFloatingUIContainer(): VNode {
    const { setFloatingEl, setContainerEl, open } = this;
    const classes = {
      [CSS.listContainer]: true,
      [FloatingCSS.animation]: true,
      [FloatingCSS.animationActive]: open,
    };

    return (
      <div
        aria-hidden="true"
        class={{
          "floating-ui-container": true,
          "floating-ui-container--active": open,
        }}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={setFloatingEl}
      >
        <div
          class={classes}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={setContainerEl}
        >
          <ul class={{ list: true, "list--hide": !open }}>
            <slot />
          </ul>
        </div>
      </div>
    );
  }

  renderIconStart(): VNode {
    const { selectedItems, placeholderIcon, selectionMode, placeholderIconFlipRtl } = this;
    const selectedItem = selectedItems[0];
    const selectedIcon = selectedItem?.icon;
    const singleSelectionMode = isSingleLike(selectionMode);

    const iconAtStart =
      !this.open && selectedItem
        ? !!selectedIcon && singleSelectionMode
        : !!this.placeholderIcon && (!selectedItem || singleSelectionMode);

    return (
      iconAtStart && (
        <span class="icon-start">
          <calcite-icon
            class="selected-icon"
            flipRtl={this.open && selectedItem ? selectedItem.iconFlipRtl : placeholderIconFlipRtl}
            icon={!this.open && selectedItem ? selectedIcon : placeholderIcon}
            scale={getIconScale(this.scale)}
          />
        </span>
      )
    );
  }

  renderIconEnd(): VNode {
    const { open } = this;
    return (
      <span class="icon-end">
        <calcite-icon
          icon={open ? "chevron-up" : "chevron-down"}
          scale={getIconScale(this.scale)}
        />
      </span>
    );
  }

  render(): VNode {
    const { displayMode, guid, label, open } = this;
    const singleSelectionMode = isSingleLike(this.selectionMode);
    const showAllDisplayMode = displayMode === "show-all";
    const singleDisplayMode = displayMode === "single";
    const fitToLineDisplayMode = !singleSelectionMode && displayMode === "fit-to-line";
    const isClearable = !this.clearDisabled && this.value?.length > 0;

    return (
      <Host onClick={this.comboboxFocusHandler}>
        <div
          aria-autocomplete="list"
          aria-controls={`${listboxUidPrefix}${guid}`}
          aria-expanded={toAriaBoolean(open)}
          aria-haspopup="listbox"
          aria-label={getLabelText(this)}
          aria-live="polite"
          aria-owns={`${listboxUidPrefix}${guid}`}
          class={{
            wrapper: true,
            "wrapper--single": singleSelectionMode || !this.selectedItems.length,
            "wrapper--active": open,
          }}
          onClick={this.clickHandler}
          onKeyDown={this.keyDownHandler}
          role="combobox"
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setReferenceEl}
        >
          <div
            class={{ "grid-input": true, "fit-to-line": fitToLineDisplayMode }}
            ref={this.setChipContainerEl}
          >
            {this.renderIconStart()}
            {!singleSelectionMode && !singleDisplayMode && this.renderChips()}
            {!singleSelectionMode && !showAllDisplayMode && this.renderSelectedIndicatorChip()}
            {/* {!singleSelectionMode &&
              !showAllDisplayMode &&
              this.renderSelectedIndicatorChipCompact()} */}
            {!singleSelectionMode && !showAllDisplayMode && this.renderAllSelectedIndicatorChip()}
            {!singleSelectionMode &&
              !showAllDisplayMode &&
              this.renderAllSelectedIndicatorChipCompact()}
            <label
              class="screen-readers-only"
              htmlFor={`${inputUidPrefix}${guid}`}
              id={`${labelUidPrefix}${guid}`}
            >
              {label}
            </label>
            {this.renderInput()}
          </div>
          {isClearable ? (
            <XButton
              disabled={this.disabled}
              key="close-button"
              label={this.messages.clear}
              scale={this.scale}
            />
          ) : null}
          {this.renderIconEnd()}
        </div>
        <ul
          aria-labelledby={`${labelUidPrefix}${guid}`}
          aria-multiselectable="true"
          class="screen-readers-only"
          id={`${listboxUidPrefix}${guid}`}
          role="listbox"
          tabIndex={-1}
        >
          {this.renderListBoxOptions()}
        </ul>
        {this.renderFloatingUIContainer()}
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }
}
