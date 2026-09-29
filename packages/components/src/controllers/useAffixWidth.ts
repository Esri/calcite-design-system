import { makeGenericController } from "@arcgis/lumina/controllers";

type AffixWidthComponent = {
  el: HTMLElement;
  prefixText?: string;
  suffixText?: string;
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
  syncAffixWidths: () => boolean;
}

/**
 * Measures rendered prefix and suffix text for Field Group affix-width coordination.
 */
export const useAffixWidth = <T extends AffixWidthComponent>(
  refs: AffixWidthRefs,
): ReturnType<typeof makeGenericController<UseAffixWidth, T>> => {
  return makeGenericController<UseAffixWidth, T>((component) => {
    const syncAffixWidth = (affixRef: { value?: HTMLElement }, affixText: string | undefined): boolean => {
      const affix = affixRef.value;

      if (!affix) {
        return !affixText;
      }

      const previousWidth = affix.style.width;

      if (!affixText) {
        affix.style.removeProperty("width");
        return !!previousWidth;
      }

      affix.style.removeProperty("width");

      const width = `${Math.ceil(affix.getBoundingClientRect().width)}px`;

      if (previousWidth === width) {
        affix.style.width = previousWidth;
        return false;
      }

      affix.style.width = width;
      return true;
    };

    return {
      getAffixElement: (affix): HTMLElement | undefined => refs[`${affix}Ref`].value,
      getTrailingWidth: (affix): number => refs.getTrailingWidth?.(affix) ?? 0,
      syncAffixWidths: (): boolean => {
        const prefixWidthChanged = syncAffixWidth(refs.prefixRef, component.prefixText);
        const suffixWidthChanged = syncAffixWidth(refs.suffixRef, component.suffixText);

        return prefixWidthChanged || suffixWidthChanged;
      },
    };
  });
};
