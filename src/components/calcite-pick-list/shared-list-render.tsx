import { Host, h, FunctionalComponent } from "@stencil/core";
import { JSXBase, VNode } from "@stencil/core/internal";
import { CSS } from "./resources";
import { getElementDir, getElementTheme } from "../../utils/dom";
import DOMAttributes = JSXBase.DOMAttributes;
import { handleFilter } from "./shared-list-logic";

interface ListProps extends DOMAttributes {
  disabled: boolean;
  loading: boolean;
  filterEnabled: boolean;
  dataForFilter: any;
  handleFilter: typeof handleFilter;
  textFilterPlaceholder: string;
  el: HTMLCalcitePickListElement | HTMLCalciteValueListElement;
}

export const List: FunctionalComponent<{ props: ListProps } & DOMAttributes> = ({
  props: {
    disabled,
    loading,
    filterEnabled,
    dataForFilter,
    handleFilter,
    textFilterPlaceholder,
    el
  },
  ...rest
}): VNode => {
  const defaultSlot = <slot />;

  return (
    <Host aria-busy={loading.toString()} aria-disabled={disabled.toString()} role="menu" {...rest}>
      <section>
        <header class={{ [CSS.sticky]: true }}>
          {filterEnabled ? (
            <calcite-filter
              aria-label={textFilterPlaceholder}
              data={dataForFilter}
              dir={getElementDir(el)}
              onCalciteFilterChange={handleFilter}
              placeholder={textFilterPlaceholder}
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
