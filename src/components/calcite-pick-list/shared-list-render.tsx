import { FunctionalComponent, h, Host, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { CSS } from "./resources";
import { getElementDir, getElementTheme } from "../../utils/dom";
import { handleFilter } from "./shared-list-logic";
import DOMAttributes = JSXBase.DOMAttributes;

interface ListProps extends DOMAttributes {
  disabled: boolean;
  loading: boolean;
  filterEnabled: boolean;
  dataForFilter: any;
  handleFilter: typeof handleFilter;
  filterPlaceholder: string;
  el: HTMLCalcitePickListElement | HTMLCalciteValueListElement;
}

export const List: FunctionalComponent<{ props: ListProps } & DOMAttributes> = ({
  props: { disabled, loading, filterEnabled, dataForFilter, handleFilter, filterPlaceholder, el },
  ...rest
}): VNode => {
  const defaultSlot = <slot />;
  return (
    <Host aria-busy={loading.toString()} aria-disabled={disabled.toString()} role="menu" {...rest}>
      <section>
        <header class={{ [CSS.sticky]: true }}>
          {filterEnabled ? (
            <calcite-filter
              aria-label={filterPlaceholder}
              data={dataForFilter}
              dir={getElementDir(el)}
              onCalciteFilterChange={handleFilter}
              placeholder={filterPlaceholder}
            />
          ) : null}
          <slot name="menu-actions" />
        </header>
        {loading || disabled ? (
          <calcite-scrim loading={loading} theme={getElementTheme(el)}>
            {defaultSlot}
          </calcite-scrim>
        ) : (
          defaultSlot
        )}
      </section>
    </Host>
  );
};

export default List;
