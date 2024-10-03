import { TemplateResult } from "lit-html";
import { h, LuminaJsx } from "@arcgis/lumina";
import { InteractiveContainer } from "../../utils/interactive";
import type { ValueListItem } from "../value-list-item/value-list-item";
import type { PickListItem } from "../pick-list-item/pick-list-item";
import type { Filter } from "../filter/filter";
import type { ValueList } from "../value-list/value-list";
import { handleFilter, handleFilterEvent } from "./shared-list-logic";
import { CSS, SLOTS } from "./resources";
import type { PickList } from "./pick-list";

type DOMAttributes = LuminaJsx.DOMAttributes<any>;

interface ListProps extends DOMAttributes {
  disabled: boolean;
  loading: boolean;
  filterEnabled: boolean;
  filterText: string;
  dataForFilter: any;
  handleFilter: typeof handleFilter;
  handleFilterEvent: typeof handleFilterEvent;
  filterPlaceholder: string;
  el: PickList["el"] | ValueList["el"];
  setFilterEl: (el: Filter["el"]) => void;
  setFilteredItems: (filteredItems: PickListItem["el"] | ValueListItem["el"][]) => void;
  dragEnabled?: boolean;
  storeAssistiveEl?: (el: HTMLSpanElement) => void;
}

export const List = ({
  props: {
    disabled,
    loading,
    filterEnabled,
    dataForFilter,
    handleFilterEvent,
    filterPlaceholder,
    filterText,
    setFilterEl,
    dragEnabled,
    storeAssistiveEl,
  },
}: {
  props: ListProps;
}): TemplateResult => {
  const defaultSlot = <slot />;
  return (
    <InteractiveContainer disabled={disabled}>
      <section>
        {dragEnabled ? (
          <span ariaLive="assertive" class="assistive-text" ref={storeAssistiveEl} />
        ) : null}
        <header class={{ [CSS.sticky]: true }}>
          {filterEnabled ? (
            <calcite-filter
              ariaLabel={filterPlaceholder}
              disabled={disabled}
              items={dataForFilter}
              oncalciteFilterChange={handleFilterEvent}
              placeholder={filterPlaceholder}
              ref={setFilterEl}
              value={filterText}
            />
          ) : null}
          <slot name={SLOTS.menuActions} />
        </header>
        {loading ? <calcite-scrim loading={loading} /> : null}
        {defaultSlot}
      </section>
    </InteractiveContainer>
  );
};

export default List;
