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

export interface UseAffixWidth {
  getAffixElement: (affix: Affix) => HTMLElement | undefined;
  getTrailingWidth: (affix: Affix) => number;
}

/**
 * Exposes prefix/suffix affix elements for Field Group affix-width coordination.
 */
export const useAffixWidth = <T extends AffixWidthComponent>(
  refs: AffixWidthRefs,
): ReturnType<typeof makeGenericController<UseAffixWidth, T>> => {
  return makeGenericController<UseAffixWidth, T>(() => {
    return {
      getAffixElement: (affix): HTMLElement | undefined => refs[`${affix}Ref`].value,
      getTrailingWidth: (affix): number => refs.getTrailingWidth?.(affix) ?? 0,
    };
  });
};
