import { debounce, escapeRegExp } from "lodash-es";
import { calciteSize48 } from "@esri/calcite-design-tokens/dist/es6/core.js";
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  createEvent,
  h,
  JsxNode,
  LitElement,
  method,
  property,
  state,
  stringOrBoolean,
} from "@arcgis/lumina";
import { filter } from "../../utils/filter";
import { getElementWidth, getTextWidth } from "../../utils/dom";
import {
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  filterValidFlipPlacements,
  FlipPlacement,
  FloatingCSS,
  FloatingUIComponent,
  hideFloatingUI,
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
  MutableValidityState,
  submitForm,
} from "../../utils/form";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
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
import { createObserver } from "../../utils/observers";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { DEBOUNCE } from "../../utils/resources";
import { Scale, SelectionMode, Status } from "../interfaces";
import { CSS as XButtonCSS, XButton } from "../functional/XButton";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Chip } from "../chip/chip";
import type { ComboboxItemGroup as HTMLCalciteComboboxItemGroupElement } from "../combobox-item-group/combobox-item-group";
import type { ComboboxItem as HTMLCalciteComboboxItemElement } from "../combobox-item/combobox-item";
import type { Label } from "../label/label";
import T9nStrings from "./assets/t9n/combobox.t9n.en.json";
import { ComboboxChildElement, GroupData, ItemData, SelectionDisplay } from "./interfaces";
import { ComboboxChildSelector, ComboboxItem, ComboboxItemGroup, CSS, IDS } from "./resources";
import {
  getItemAncestors,
  getItemChildren,
  getLabel,
  hasActiveChildren,
  isSingleLike,
} from "./utils";
import { styles } from "./combobox.scss";

declare global {
  interface DeclareElements {
    "calcite-combobox": Combobox;
  }
}

const itemUidPrefix = "combobox-item-";
const chipUidPrefix = "combobox-chip-";
const labelUidPrefix = "combobox-label-";
const listboxUidPrefix = "combobox-listbox-";
const inputUidPrefix = "combobox-input-";

/** @slot - A slot for adding `calcite-combobox-item`s. */
export class Combobox
  extends LitElement
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    OpenCloseComponent,
    FloatingUIComponent,
    LoadableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private internalComboboxChangeEvent = (): void => {
    this.calciteComboboxChange.emit();
  };

  private allSelectedIndicatorChipEl: Chip["el"];

  private chipContainerEl: HTMLDivElement;

  private data: ItemData[];

  defaultValue: Combobox["value"];

  private emitComboboxChange = debounce(this.internalComboboxChangeEvent, 0);

  private filterItems = (() => {
    const find = (item: ComboboxChildElement, filteredData: ItemData[]) =>
      item && filteredData.some(({ el }) => item === el);

    return debounce((text: string, setOpenToEmptyState = false, emit = true): void => {
      const filteredData = filter([...this.data, ...this.groupData], text, [
        "description",
        "label",
        "metadata",
        "shortHeading",
      ]);
      const itemsAndGroups = this.getItemsAndGroups();

      const matchAll = text === "";

      itemsAndGroups.forEach((item) => {
        if (matchAll) {
          item.hidden = false;
          return;
        }

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

      this.filterTextMatchPattern =
        this.filterText && new RegExp(`(${escapeRegExp(this.filterText)})`, "i");

      this.filteredItems = this.getFilteredItems();
      this.filteredItems.forEach((item) => {
        item.filterTextMatchPattern = this.filterTextMatchPattern;
      });

      if (setOpenToEmptyState) {
        this.open = this.filterText.trim().length > 0 && this.filteredItems.length > 0;
      }

      if (emit) {
        this.calciteComboboxFilterChange.emit();
      }
    }, DEBOUNCE.filter);
  })();

  private _filterText = "";

  private filterTextMatchPattern: RegExp;

  private filteredFlipPlacements: FlipPlacement[];

  floatingEl: HTMLDivElement;

  formEl: HTMLFormElement;

  private getSelectedItems = (): HTMLCalciteComboboxItemElement["el"][] => {
    if (!this.isMulti()) {
      const match = this.items.find(({ selected }) => selected);
      return match ? [match] : [];
    }

    return (
      this.items
        .filter(
          (item) =>
            item.selected && (this.selectionMode !== "ancestors" || !hasActiveChildren(item)),
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

  private groupData: GroupData[];

  private guid = guid();

  private ignoreSelectedEventsFlag = false;

  private inputHeight = 0;

  private internalValueChangeFlag = false;

  labelEl: Label["el"];

  private listContainerEl: HTMLDivElement;

  private maxCompactBreakpoint: number;

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  onLabelClick = (): void => {
    this.setFocus();
  };

  openTransitionProp = "opacity";

  placement: LogicalPlacement = defaultMenuPlacement;

  referenceEl: HTMLDivElement;

  private resizeObserver = createObserver("resize", () => {
    this.setMaxScrollerHeight();
    this.refreshSelectionDisplay();
  });

  private selectedIndicatorChipEl: Chip["el"];

  private get showingInlineIcon(): boolean {
    const { placeholderIcon, selectionMode, selectedItems, open } = this;
    const selectedItem = selectedItems[0];
    const selectedIcon = selectedItem?.icon;
    const singleSelectionMode = isSingleLike(selectionMode);

    return !open && selectedItem
      ? !!selectedIcon && singleSelectionMode
      : !!placeholderIcon && (!selectedItem || singleSelectionMode);
  }

  private textInput = createRef<HTMLInputElement>();

  transitionEl: HTMLDivElement;

  private _value: string | string[] = null;

  // #endregion

  // #region State Properties

  @state() activeChipIndex = -1;

  @state() activeDescendant = "";

  @state() activeItemIndex = -1;

  @state() compactSelectionDisplay = false;

  @state() groupItems: HTMLCalciteComboboxItemGroupElement["el"][] = [];

  @state() items: HTMLCalciteComboboxItemElement["el"][] = [];

  @state() needsIcon: boolean;

  @state() selectedHiddenChipsCount = 0;

  @state() selectedVisibleChipsCount = 0;

  // #endregion

  // #region Public Properties

  /** When `true`, allows entry of custom values, which are not in the original set of items. */
  @property({ reflect: true }) allowCustomValues: boolean;

  /** When `true`, the value-clearing will be disabled. */
  @property({ reflect: true }) clearDisabled = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Text for the component's filter input field. */
  @property({ reflect: true })
  get filterText(): string {
    return this._filterText;
  }

  set filterText(filterText: string) {
    const oldFilterText = this._filterText;
    if (filterText !== oldFilterText) {
      this._filterText = filterText;
      this.filterTextChange(filterText);
    }
  }

  /**
   * Specifies the component's filtered items.
   *
   * @readonly
   */
  @property() filteredItems: HTMLCalciteComboboxItemElement["el"][] = [];

  /** Specifies the component's fallback slotted content placement when it's initial placement has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

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

  /** Specifies the maximum number of `calcite-combobox-item`s (including nested children) to display before displaying a scrollbar. */
  @property({ reflect: true }) maxItems = 0;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the placeholder text for the input. */
  @property() placeholder: string;

  /** Specifies the placeholder icon for the input. */
  @property({ reflect: true }) placeholderIcon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) placeholderIconFlipRtl = false;

  /** When `true`, the component's value can be read, but controls are not accessible and the value cannot be modified. */
  @property({ reflect: true }) readOnly = false;

  /** When `true`, the component must have a value in order for the form to submit. */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: HTMLCalciteComboboxItemElement["el"][] = [];

  /**
   * When `selectionMode` is `"ancestors"` or `"multiple"`, specifies the display of multiple `calcite-combobox-item` selections, where:
   *
   * `"all"` displays all selections with individual `calcite-chip`s,
   *
   * `"fit"` displays individual `calcite-chip`s that scale to the component's size, including a non-closable `calcite-chip`, which provides the number of additional `calcite-combobox-item` selections not visually displayed, and
   *
   * `"single"` displays one `calcite-chip` with the total number of selections.
   */
  @property({ reflect: true }) selectionDisplay: SelectionDisplay = "all";

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"multiple"` allows any number of selections,
   *
   * `"single"` allows only one selection,
   *
   * `"single-persist"` allows one selection and prevents de-selection, and
   *
   * `"ancestors"` allows multiple selections, but shows ancestors of selected items as selected, with only deepest children shown in chips.
   */
  @property({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "ancestors" | "multiple",
    SelectionMode
  > = "multiple";

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

  /** The component's value(s) from the selected `calcite-combobox-item`(s). */
  @property()
  get value(): string | string[] {
    return this._value;
  }

  set value(value: string | string[]) {
    const oldValue = this._value;
    if (value !== oldValue) {
      this._value = value;
      this.valueHandler(value);
    }
  }

  // #endregion

  // #region Public Methods

  /**
   * Updates the position of the component.
   *
   * @param delayed Reposition the component after a delay
   * @returns Promise
   */
  @method()
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
      delayed,
    );
  }

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.textInput.value?.focus();
    this.activeChipIndex = -1;
    this.activeItemIndex = -1;
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed, and before the closing transition begins. */
  calciteComboboxBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteComboboxBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the selected item(s) changes. */
  calciteComboboxChange = createEvent({ cancelable: false });

  /** Fires when a selected item in the component is closed via its `calcite-chip`. */
  calciteComboboxChipClose = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteComboboxClose = createEvent({ cancelable: false });

  /** Fires when text is added to filter the options list. */
  calciteComboboxFilterChange = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteComboboxOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listenOn(document, "click", this.documentClickHandler);
    this.listen("calciteComboboxItemChange", this.calciteComboboxItemChangeHandler);
    this.listen("calciteInternalComboboxItemChange", this.calciteInternalComboboxItemChangeHandler);
    this.listen("click", this.comboboxFocusHandler);
  }

  override connectedCallback(): void {
    connectLabel(this);
    connectForm(this);

    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });

    this.updateItems();
    this.setFilteredPlacements();

    if (this.open) {
      this.openHandler();
      onToggleOpenCloseComponent(this);
    }

    connectFloatingUI(this);
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
    this.updateItems();
    this.filterItems(this.filterText, false, false);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledChange(this.disabled);
    }

    if (changes.has("maxItems") && (this.hasUpdated || this.maxItems !== 0)) {
      this.setMaxScrollerHeight();
    }

    if (
      changes.has("overlayPositioning") &&
      (this.hasUpdated || this.overlayPositioning !== "absolute")
    ) {
      this.reposition(true);
    }

    if (
      (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "multiple")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m"))
    ) {
      this.updateItems();
    }

    if (changes.has("flipPlacements")) {
      this.flipPlacementsHandler();
    }

    if (changes.has("selectedItems") && (this.hasUpdated || this.selectedItems?.length > 0)) {
      this.selectedItemsHandler();
    }
  }

  override updated(): void {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition(true);
      this.inputHeight = this.el.offsetHeight;
    }

    updateHostInteraction(this);

    if (!this.hasUpdated) {
      this.refreshSelectionDisplay();
    }
  }

  loaded(): void {
    afterConnectDefaultValueSet(this, this.getValue());
    connectFloatingUI(this);
    setComponentLoaded(this);
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this);
  }

  // #endregion

  // #region Private Methods

  private filterTextChange(value: string): void {
    this.updateActiveItemIndex(-1);
    this.filterItems(value, true);
  }

  private openHandler(): void {
    onToggleOpenCloseComponent(this);

    if (this.disabled) {
      return;
    }

    this.setMaxScrollerHeight();
  }

  private handleDisabledChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  private valueHandler(value: string | string[]): void {
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

  private flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  private selectedItemsHandler(): void {
    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
  }

  private async documentClickHandler(event: MouseEvent): Promise<void> {
    if (this.disabled || event.composedPath().includes(this.el)) {
      return;
    }

    await this.componentOnReady();

    if (!this.allowCustomValues && this.filterText) {
      this.clearInputValue();
      this.filterItems("");
      this.updateActiveItemIndex(-1);
    }

    if (this.allowCustomValues && this.filterText.trim().length) {
      this.addCustomChip(this.filterText);
    }

    this.open = false;
  }

  private calciteComboboxItemChangeHandler(
    event: CustomEvent<HTMLCalciteComboboxItemElement["el"]>,
  ): void {
    if (this.ignoreSelectedEventsFlag) {
      return;
    }

    const target = event.target as HTMLCalciteComboboxItemElement["el"];
    const newIndex = this.filteredItems.indexOf(target);
    this.updateActiveItemIndex(newIndex);
    this.toggleSelection(target, target.selected);
  }

  private calciteInternalComboboxItemChangeHandler(
    event: CustomEvent<HTMLCalciteComboboxItemElement["el"]>,
  ): void {
    event.stopPropagation();
    this.updateItems();
  }

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
    this.textInput.value.value = "";
    this.filterText = "";
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : null;
  }

  private getValue(): string | string[] {
    const items = this.selectedItems.map((item) => item?.value?.toString());
    return items?.length ? (items.length > 1 ? items : items[0]) : "";
  }

  private comboboxInViewport(): boolean {
    const bounding = this.el.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (this.readOnly) {
      return;
    }

    const { key } = event;

    switch (key) {
      case "Tab":
        this.activeChipIndex = -1;
        this.activeItemIndex = -1;
        if (this.allowCustomValues && this.filterText) {
          this.addCustomChip(this.filterText, true);
          event.preventDefault();
        } else if (this.open) {
          this.open = false;
          event.preventDefault();
        } else if (!this.allowCustomValues && this.filterText) {
          this.clearInputValue();
          this.filterItems("");
          this.updateActiveItemIndex(-1);
        }
        break;
      case "ArrowLeft":
        if (this.activeChipIndex !== -1 || this.textInput.value.selectionStart === 0) {
          this.previousChip();
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        if (this.activeChipIndex !== -1) {
          this.nextChip();
          event.preventDefault();
        }
        break;
      case "ArrowUp":
        if (this.filteredItems.length) {
          event.preventDefault();
          if (this.open) {
            this.shiftActiveItemIndex(-1);
          }

          if (!this.comboboxInViewport()) {
            this.el.scrollIntoView();
          }
        }
        break;
      case "ArrowDown":
        if (this.filteredItems.length) {
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
        }
        break;
      case " ":
        if (!this.textInput.value.value && !event.defaultPrevented) {
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
        if (this.open && this.activeItemIndex > -1) {
          const item = this.filteredItems[this.activeItemIndex];
          this.toggleSelection(item, !item.selected);
          event.preventDefault();
        } else if (this.activeChipIndex > -1) {
          this.removeActiveChip();
          event.preventDefault();
        } else if (this.allowCustomValues && this.filterText) {
          this.addCustomChip(this.filterText, true);
          event.preventDefault();
        } else if (!event.defaultPrevented) {
          if (submitForm(this)) {
            event.preventDefault();
          }
        }
        break;
      case "Delete":
      case "Backspace": {
        const notDeletable =
          this.selectionDisplay === "single" ||
          (this.selectionDisplay === "fit" && this.selectedHiddenChipsCount > 0);
        if (notDeletable) {
          return;
        }
        if (this.activeChipIndex > -1) {
          event.preventDefault();
          this.removeActiveChip();
        } else if (!this.filterText && this.isMulti()) {
          event.preventDefault();
          this.removeLastChip();
        }
        break;
      }
    }
  }

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
    hideFloatingUI(this);
  }

  private async setMaxScrollerHeight(): Promise<void> {
    const { listContainerEl, open, referenceEl } = this;

    if (!listContainerEl || !open) {
      return;
    }

    await this.reposition(true);
    const maxScrollerHeight = this.getMaxScrollerHeight();
    listContainerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    listContainerEl.style.minWidth = `${referenceEl.clientWidth}px`;
    await this.reposition(true);
  }

  private calciteChipCloseHandler(comboboxItem: HTMLCalciteComboboxItemElement["el"]): void {
    this.open = false;

    const selection = this.items.find((item) => item === comboboxItem);

    if (selection) {
      this.toggleSelection(selection, false);
    }

    this.calciteComboboxChipClose.emit();
  }

  private clickHandler(event: MouseEvent): void {
    if (this.readOnly) {
      return;
    }

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
  }

  private ensureRecentSelectedItemIsActive(): void {
    const { selectedItems } = this;
    const targetIndex =
      selectedItems.length === 0 ? 0 : this.items.indexOf(selectedItems[selectedItems.length - 1]);

    this.updateActiveItemIndex(targetIndex);
  }

  private hideChip(chipEl: Chip["el"]): void {
    chipEl.classList.add(CSS.chipInvisible);
  }

  private showChip(chipEl: Chip["el"]): void {
    chipEl.classList.remove(CSS.chipInvisible);
  }

  private refreshChipDisplay({
    chipEls,
    availableHorizontalChipElSpace,
    chipContainerElGap,
  }): void {
    chipEls.forEach((chipEl: Chip["el"]) => {
      if (!chipEl.selected) {
        this.hideChip(chipEl);
      } else {
        const chipElWidth = getElementWidth(chipEl);
        if (chipElWidth && chipElWidth < availableHorizontalChipElSpace) {
          availableHorizontalChipElSpace -= chipElWidth + chipContainerElGap;
          this.showChip(chipEl);
          return;
        }
      }
      this.hideChip(chipEl);
    });
  }

  private async refreshSelectionDisplay() {
    await componentLoaded(this);

    if (isSingleLike(this.selectionMode)) {
      return;
    }

    if (!this.textInput.value) {
      return;
    }

    const {
      allSelectedIndicatorChipEl,
      chipContainerEl,
      selectionDisplay,
      placeholder,
      selectedIndicatorChipEl,
      textInput: { value: textInput },
    } = this;

    const chipContainerElGap = parseInt(getComputedStyle(chipContainerEl).gap.replace("px", ""));
    const chipContainerElWidth = getElementWidth(chipContainerEl);
    const { fontSize, fontFamily } = getComputedStyle(textInput);
    const inputTextWidth = getTextWidth(placeholder, `${fontSize} ${fontFamily}`);
    const inputWidth = (inputTextWidth || parseInt(calciteSize48)) + chipContainerElGap;
    const allSelectedIndicatorChipElWidth = getElementWidth(allSelectedIndicatorChipEl);
    const selectedIndicatorChipElWidth = getElementWidth(selectedIndicatorChipEl);
    const largestSelectedIndicatorChipWidth = Math.max(
      allSelectedIndicatorChipElWidth,
      selectedIndicatorChipElWidth,
    );

    this.setCompactSelectionDisplay({
      chipContainerElGap,
      chipContainerElWidth,
      inputWidth,
      largestSelectedIndicatorChipWidth,
    });

    if (selectionDisplay === "fit") {
      const chipEls = Array.from(this.el.shadowRoot.querySelectorAll("calcite-chip")).filter(
        (chipEl) => chipEl.closable,
      );

      const availableHorizontalChipElSpace = Math.round(
        chipContainerElWidth -
          ((this.selectedHiddenChipsCount > 0 ? selectedIndicatorChipElWidth : 0) +
            chipContainerElGap +
            inputWidth +
            chipContainerElGap),
      );

      this.refreshChipDisplay({ availableHorizontalChipElSpace, chipContainerElGap, chipEls });
      this.setVisibleAndHiddenChips(chipEls);
    }
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;
    connectFloatingUI(this);
  }

  private setCompactSelectionDisplay({
    chipContainerElGap,
    chipContainerElWidth,
    inputWidth,
    largestSelectedIndicatorChipWidth,
  }): void {
    const newCompactBreakpoint = Math.round(
      largestSelectedIndicatorChipWidth + chipContainerElGap + inputWidth,
    );
    if (!this.maxCompactBreakpoint || this.maxCompactBreakpoint < newCompactBreakpoint) {
      this.maxCompactBreakpoint = newCompactBreakpoint;
    }
    this.compactSelectionDisplay = chipContainerElWidth < this.maxCompactBreakpoint;
  }

  private setContainerEl(el: HTMLDivElement): void {
    if (el) {
      this.resizeObserver?.observe(el);
    }
    this.listContainerEl = el;
    this.transitionEl = el;
  }

  private setChipContainerEl(el: HTMLDivElement): void {
    if (el) {
      this.resizeObserver?.observe(el);
    }
    this.chipContainerEl = el;
  }

  private setReferenceEl(el: HTMLDivElement): void {
    this.referenceEl = el;
    connectFloatingUI(this);
  }

  private setAllSelectedIndicatorChipEl(el: Chip["el"]): void {
    this.allSelectedIndicatorChipEl = el;
  }

  private setSelectedIndicatorChipEl(el: Chip["el"]): void {
    this.selectedIndicatorChipEl = el;
  }

  private setVisibleAndHiddenChips(chipEls: Chip["el"][]): void {
    let newSelectedVisibleChipsCount = 0;
    chipEls.forEach((chipEl) => {
      if (chipEl.selected && !chipEl.classList.contains(CSS.chipInvisible)) {
        newSelectedVisibleChipsCount++;
      }
    });
    if (newSelectedVisibleChipsCount !== this.selectedVisibleChipsCount) {
      this.selectedVisibleChipsCount = newSelectedVisibleChipsCount;
    }
    const newSelectedHiddenChipsCount =
      this.getSelectedItems().length - newSelectedVisibleChipsCount;
    if (newSelectedHiddenChipsCount !== this.selectedHiddenChipsCount) {
      this.selectedHiddenChipsCount = newSelectedHiddenChipsCount;
    }
  }

  private getMaxScrollerHeight(): number {
    const items = this.getItemsAndGroups().filter((item) => !item.hidden);

    const { maxItems } = this;

    let itemsToProcess = 0;
    let maxScrollerHeight = 0;

    if (items.length > maxItems) {
      items.forEach((item) => {
        if (itemsToProcess < maxItems) {
          const height = this.calculateScrollerHeight(item);
          if (height > 0) {
            maxScrollerHeight += height;
            itemsToProcess++;
          }
        }
      });
    }

    return maxScrollerHeight;
  }

  private calculateScrollerHeight(item: ComboboxChildElement): number {
    if (!item) {
      return;
    }

    // if item has children items, don't count their height twice
    const parentHeight = item.getBoundingClientRect().height;
    const childrenTotalHeight = Array.from(
      item.querySelectorAll<ComboboxChildElement>(ComboboxChildSelector),
    ).reduce((total, child) => total + child.getBoundingClientRect().height, 0);

    return parentHeight - childrenTotalHeight;
  }

  private inputHandler(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterText = value;
  }

  private getItemsAndGroups(): ComboboxChildElement[] {
    return [...this.groupItems, ...this.items];
  }

  private toggleSelection(item: HTMLCalciteComboboxItemElement["el"], value: boolean): void {
    if (
      !item ||
      (this.selectionMode === "single-persist" &&
        item.selected &&
        item.value === this.value &&
        !value)
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

      if (this.textInput.value) {
        this.textInput.value.value = getLabel(item);
      }
      this.open = false;
      this.updateActiveItemIndex(-1);
      this.resetText();
      this.filterItems("");
    }
  }

  private updateAncestors(item: HTMLCalciteComboboxItemElement["el"]): void {
    if (this.selectionMode !== "ancestors") {
      return;
    }
    const ancestors = getItemAncestors(item);
    const children = getItemChildren(item);
    if (item.selected) {
      ancestors.forEach((el) => {
        el.selected = true;
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

  private getFilteredItems(): HTMLCalciteComboboxItemElement["el"][] {
    return this.filterText === "" ? this.items : this.items.filter((item) => !item.hidden);
  }

  private updateItems(): void {
    this.items = this.getItems();
    this.groupItems = this.getGroupItems();
    this.data = this.getData();
    this.groupData = this.getGroupData();
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
  }

  private getData(): ItemData[] {
    return this.items.map((item) => ({
      description: item.description,
      filterDisabled: item.filterDisabled,
      label: item.heading || item.textLabel,
      metadata: item.metadata,
      shortHeading: item.shortHeading,
      el: item, // used for matching items to data
    }));
  }

  private getGroupData(): GroupData[] {
    return this.groupItems.map((groupItem) => ({
      label: groupItem.label,
      el: groupItem,
    }));
  }

  private getNeedsIcon(): boolean {
    return isSingleLike(this.selectionMode) && this.items.some((item) => item.icon);
  }

  private resetText(): void {
    if (this.textInput.value) {
      this.textInput.value.value = "";
    }
    this.filterText = "";
  }

  private getItems(): HTMLCalciteComboboxItemElement["el"][] {
    const items: HTMLCalciteComboboxItemElement["el"][] = Array.from(
      this.el.querySelectorAll(ComboboxItem),
    );
    return items.filter((item) => !item.disabled);
  }

  private getGroupItems(): HTMLCalciteComboboxItemGroupElement["el"][] {
    return Array.from(this.el.querySelectorAll(ComboboxItemGroup));
  }

  private addCustomChip(value: string, focus?: boolean): void {
    const existingItem = this.items.find((el) => (el.heading || el.textLabel) === value);
    if (existingItem) {
      this.toggleSelection(existingItem, true);
    } else {
      if (!this.isMulti()) {
        this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
      }
      const item = document.createElement(
        // TODO: [MIGRATION] If this is dynamically creating a web component, please read the docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#rendering-jsx-outside-the-component
        "calcite-combobox-item",
      );
      item.value = value;
      item.heading = value;
      item.selected = true;
      this.el.prepend(item);
      this.resetText();
      if (focus) {
        this.setFocus();
      }
      this.updateItems();
      this.filterItems("");
      this.open = true;
      this.emitComboboxChange();
    }
  }

  private removeActiveChip(): void {
    this.toggleSelection(this.selectedItems[this.activeChipIndex], false);
    this.setFocus();
  }

  private removeLastChip(): void {
    this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
    this.setFocus();
  }

  private previousChip(): void {
    const length = this.selectedItems.length - 1;
    const active = this.activeChipIndex;
    this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
    this.updateActiveItemIndex(-1);
    this.focusChip();
  }

  private nextChip(): void {
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

  private focusChip(): void {
    const guid = this.selectedItems[this.activeChipIndex]?.guid;

    const chip = guid
      ? this.referenceEl.querySelector<Chip["el"]>(`#${chipUidPrefix}${guid}`)
      : null;
    chip?.setFocus();
  }

  private scrollToActiveItem(): void {
    const activeItem = this.filteredItems[this.activeItemIndex];

    if (!activeItem) {
      return;
    }

    const height = this.calculateScrollerHeight(activeItem);
    const { offsetHeight, scrollTop } = this.listContainerEl;
    if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
      this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
    } else if (activeItem.offsetTop < scrollTop) {
      this.listContainerEl.scrollTop = activeItem.offsetTop;
    }
  }

  private shiftActiveItemIndex(delta: number): void {
    const { length } = this.filteredItems;
    const newIndex = (this.activeItemIndex + length + delta) % length;
    this.updateActiveItemIndex(newIndex);
    this.scrollToActiveItem();
  }

  private updateActiveItemIndex(index: number): void {
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

  private isAllSelected(): boolean {
    return this.getItems().length === this.getSelectedItems().length;
  }

  private isMulti(): boolean {
    return !isSingleLike(this.selectionMode);
  }

  private comboboxFocusHandler(): void {
    if (this.disabled) {
      return;
    }

    this.textInput.value?.focus();
  }

  // #endregion

  // #region Rendering

  private renderChips(): JsxNode {
    const { activeChipIndex, readOnly, scale, selectionMode, messages } = this;
    return this.selectedItems.map((item, i) => {
      const chipClasses = {
        chip: true,
        "chip--active": activeChipIndex === i,
      };
      const ancestors = [...getItemAncestors(item)].reverse();
      const itemLabel = getLabel(item);
      const pathLabel = [...ancestors, item].map((el) => getLabel(el));
      const label = selectionMode !== "ancestors" ? itemLabel : pathLabel.join(" / ");

      return (
        <calcite-chip
          appearance={readOnly ? "outline" : "solid"}
          class={chipClasses}
          closable={!readOnly}
          data-test-id={`chip-${i}`}
          icon={item.icon}
          iconFlipRtl={item.iconFlipRtl}
          id={item.guid ? `${chipUidPrefix}${item.guid}` : null}
          key={itemLabel}
          label={label}
          messageOverrides={{ dismissLabel: messages.removeTag }}
          onFocusIn={() => (this.activeChipIndex = i)}
          oncalciteChipClose={() => this.calciteChipCloseHandler(item)}
          scale={scale}
          selected={item.selected}
          tabIndex={activeChipIndex === i ? 0 : -1}
          title={label}
          value={item.value}
        >
          {label}
        </calcite-chip>
      );
    });
  }

  private renderAllSelectedIndicatorChip(): JsxNode {
    const {
      compactSelectionDisplay,
      scale,
      selectedVisibleChipsCount,
      setAllSelectedIndicatorChipEl,
    } = this;
    const label = this.messages.allSelected;
    return (
      <calcite-chip
        class={{
          chip: true,
          [CSS.chipInvisible]: !(
            this.isAllSelected() &&
            !selectedVisibleChipsCount &&
            !compactSelectionDisplay
          ),
        }}
        label={label}
        ref={setAllSelectedIndicatorChipEl}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  private renderAllSelectedIndicatorChipCompact(): JsxNode {
    const { compactSelectionDisplay, scale, selectedVisibleChipsCount } = this;
    const label = this.messages.all || "All";
    return (
      <calcite-chip
        class={{
          chip: true,
          [CSS.chipInvisible]: !(
            this.isAllSelected() &&
            !selectedVisibleChipsCount &&
            compactSelectionDisplay
          ),
        }}
        label={label}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  private renderSelectedIndicatorChip(): JsxNode {
    const {
      compactSelectionDisplay,
      selectionDisplay,
      getSelectedItems,
      scale,
      selectedHiddenChipsCount,
      selectedVisibleChipsCount,
      setSelectedIndicatorChipEl,
    } = this;
    let chipInvisible: boolean;
    let label: string;

    if (compactSelectionDisplay) {
      chipInvisible = true;
    } else {
      if (selectionDisplay === "single") {
        const selectedItemsCount = getSelectedItems().length;
        if (this.isAllSelected()) {
          chipInvisible = true;
        } else if (selectedItemsCount > 0) {
          chipInvisible = false;
        } else {
          chipInvisible = true;
        }
        label = `${selectedItemsCount} ${this.messages.selected}`;
      } else if (selectionDisplay === "fit") {
        chipInvisible = !!(
          (this.isAllSelected() && selectedVisibleChipsCount === 0) ||
          selectedHiddenChipsCount === 0
        );
        label =
          selectedVisibleChipsCount > 0
            ? `+${selectedHiddenChipsCount}`
            : `${selectedHiddenChipsCount} ${this.messages.selected}`;
      }
    }
    return (
      <calcite-chip
        class={{
          chip: true,
          [CSS.chipInvisible]: chipInvisible,
        }}
        label={label}
        ref={setSelectedIndicatorChipEl}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  private renderSelectedIndicatorChipCompact(): JsxNode {
    const {
      compactSelectionDisplay,
      selectionDisplay,
      getSelectedItems,
      scale,
      selectedHiddenChipsCount,
    } = this;
    let chipInvisible: boolean;
    let label: string;

    if (compactSelectionDisplay) {
      const selectedItemsCount = getSelectedItems().length;
      if (this.isAllSelected()) {
        chipInvisible = true;
      } else if (selectionDisplay === "fit") {
        chipInvisible = !(selectedHiddenChipsCount > 0);
        label = `${selectedHiddenChipsCount || 0}`;
      } else if (selectionDisplay === "single") {
        chipInvisible = !(selectedItemsCount > 0);
        label = `${selectedItemsCount}`;
      }
    } else {
      chipInvisible = true;
    }
    return (
      <calcite-chip
        class={{
          chip: true,
          [CSS.chipInvisible]: chipInvisible,
        }}
        label={label}
        scale={scale}
        title={label}
        value=""
      >
        {label}
      </calcite-chip>
    );
  }

  private renderInput(): JsxNode {
    const { guid, disabled, placeholder, selectionMode, selectedItems, open } = this;
    const single = isSingleLike(selectionMode);
    const selectedItem = selectedItems[0];
    const showLabel = !open && single && !!selectedItem && !this.filterText;

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
            {getLabel(selectedItem)}
          </span>
        )}
        <input
          aria-activedescendant={this.activeDescendant}
          aria-controls={`${listboxUidPrefix}${guid}`}
          aria-errormessage={IDS.validationMessage}
          aria-owns={`${listboxUidPrefix}${guid}`}
          ariaAutoComplete="list"
          ariaExpanded={open}
          ariaHasPopup="listbox"
          ariaInvalid={this.status === "invalid"}
          ariaLabel={getLabelText(this)}
          class={{
            [CSS.input]: true,
            "input--single": true,
            [CSS.inputHidden]: showLabel,
            "input--icon": this.showingInlineIcon && !!this.placeholderIcon,
          }}
          data-test-id="input"
          disabled={disabled}
          id={`${inputUidPrefix}${guid}`}
          key="input"
          onFocus={this.comboboxFocusHandler}
          onInput={this.inputHandler}
          placeholder={placeholder}
          readOnly={this.readOnly}
          ref={this.textInput}
          role="combobox"
          tabIndex={this.activeChipIndex === -1 ? 0 : -1}
          type="text"
          value={this.filterText}
        />
      </span>
    );
  }

  private renderListBoxOptions(): JsxNode {
    return this.filteredItems.map((item) => (
      <li
        ariaSelected={item.selected}
        id={item.guid ? `${itemUidPrefix}${item.guid}` : null}
        role="option"
        tabIndex="-1"
      >
        {item.heading || item.textLabel}
      </li>
    ));
  }

  private renderFloatingUIContainer(): JsxNode {
    const { setFloatingEl, setContainerEl, open } = this;
    const classes = {
      [CSS.listContainer]: true,
      [FloatingCSS.animation]: true,
      [FloatingCSS.animationActive]: open,
    };

    return (
      <div ariaHidden="true" class={CSS.floatingUIContainer} ref={setFloatingEl}>
        <div class={classes} ref={setContainerEl}>
          <ul class={{ list: true, "list--hide": !open }}>
            <slot />
          </ul>
        </div>
      </div>
    );
  }

  private renderSelectedOrPlaceholderIcon(): JsxNode {
    const { open, placeholderIcon, placeholderIconFlipRtl, selectedItems } = this;
    const selectedItem = selectedItems[0];
    const selectedIcon = selectedItem?.icon;
    const showPlaceholder = placeholderIcon && (open || !selectedItem);

    return (
      this.showingInlineIcon && (
        <span class="icon-start" key="selected-placeholder-icon">
          <calcite-icon
            class={{
              [CSS.selectedIcon]: !showPlaceholder,
              [CSS.placeholderIcon]: showPlaceholder,
            }}
            flipRtl={showPlaceholder ? placeholderIconFlipRtl : selectedItem.iconFlipRtl}
            icon={showPlaceholder ? placeholderIcon : selectedIcon}
            scale={getIconScale(this.scale)}
          />
        </span>
      )
    );
  }

  private renderChevronIcon(): JsxNode {
    const { open } = this;
    return (
      <span class="icon-end" key="chevron">
        <calcite-icon
          class={CSS.icon}
          icon={open ? "chevron-up" : "chevron-down"}
          scale={getIconScale(this.scale)}
        />
      </span>
    );
  }

  override render(): JsxNode {
    const { selectionDisplay, guid, label, open, readOnly } = this;
    const singleSelectionMode = isSingleLike(this.selectionMode);
    const allSelectionDisplay = selectionDisplay === "all";
    const singleSelectionDisplay = selectionDisplay === "single";
    const fitSelectionDisplay = !singleSelectionMode && selectionDisplay === "fit";
    const isClearable = !this.clearDisabled && this.value?.length > 0;

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          ariaLive="polite"
          class={{
            wrapper: true,
            "wrapper--single": singleSelectionMode || !this.selectedItems.length,
            "wrapper--active": open,
          }}
          onClick={this.clickHandler}
          onKeyDown={this.keyDownHandler}
          ref={this.setReferenceEl}
        >
          {this.renderSelectedOrPlaceholderIcon()}
          <div
            class={{
              "grid-input": true,
              [CSS.selectionDisplayFit]: fitSelectionDisplay,
              [CSS.selectionDisplaySingle]: singleSelectionDisplay,
            }}
            key="grid"
            ref={this.setChipContainerEl}
          >
            {!singleSelectionMode && !singleSelectionDisplay && this.renderChips()}
            {!singleSelectionMode &&
              !allSelectionDisplay && [
                this.renderSelectedIndicatorChip(),
                this.renderSelectedIndicatorChipCompact(),
                this.renderAllSelectedIndicatorChip(),
                this.renderAllSelectedIndicatorChipCompact(),
              ]}
            <label
              class="screen-readers-only"
              htmlFor={`${inputUidPrefix}${guid}`}
              id={`${labelUidPrefix}${guid}`}
            >
              {label}
            </label>
            {this.renderInput()}
          </div>
          {!readOnly && isClearable ? (
            <XButton
              disabled={this.disabled}
              key="close-button"
              label={this.messages.clear}
              scale={this.scale}
            />
          ) : null}
          {!readOnly && this.renderChevronIcon()}
        </div>
        <ul
          aria-labelledby={`${labelUidPrefix}${guid}`}
          ariaMultiSelectable="true"
          class="screen-readers-only"
          id={`${listboxUidPrefix}${guid}`}
          role="listbox"
          tabIndex={-1}
        >
          {this.renderListBoxOptions()}
        </ul>
        {this.renderFloatingUIContainer()}
        <HiddenFormInputSlot component={this} />
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
