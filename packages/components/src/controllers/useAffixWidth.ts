import { makeGenericController } from "@arcgis/lumina/controllers";

type AffixWidthComponent = {
  el: HTMLElement;
};

type AffixWidthRefs = {
  prefixRef: { value?: HTMLElement };
  suffixRef: { value?: HTMLElement };
  getTrailingWidth?: (affix: Affix) => number;
};

export type Affix = "prefix" | "suffix";

const affixWidthCustomProperty: Record<Affix, string> = {
  prefix: "--calcite-internal-input-affix-prefix-width",
  suffix: "--calcite-internal-input-affix-suffix-width",
};

export interface UseAffixWidth {
  getAffixWidth: (affix: Affix) => number;
  getTrailingWidth: (affix: Affix) => number;
  setAffixWidth: (affix: Affix, width: number | undefined) => void;
}

/**
 * Exposes prefix/suffix affix elements for Field Group affix-width coordination.
 */
export const useAffixWidth = <T extends AffixWidthComponent>(
  refs: AffixWidthRefs,
): ReturnType<typeof makeGenericController<UseAffixWidth, T>> => {
  return makeGenericController<UseAffixWidth, T>((component) => {
    return {
      getAffixWidth: (affix): number => Math.ceil(refs[`${affix}Ref`].value?.getBoundingClientRect().width ?? 0),
      getTrailingWidth: (affix): number => refs.getTrailingWidth?.(affix) ?? 0,
      setAffixWidth: (affix, width): void => {
        const property = affixWidthCustomProperty[affix];

        if (width === undefined) {
          component.el.style.removeProperty(property);
          return;
        }

        component.el.style.setProperty(property, `${width}px`);
      },
    };
  });
};
