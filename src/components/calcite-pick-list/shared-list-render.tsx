import { Host, h } from "@stencil/core";
import { VNode } from "@stencil/core/internal";
import { CSS } from "./resources";
import { getElementDir, getElementTheme } from "../../utils/dom";

export const List = ({ props, ...rest }): VNode => {
  const {
    disabled,
    loading,
    filterEnabled,
    dataForFilter,
    handleFilter,
    textFilterPlaceholder,
    el
  } = props;
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
