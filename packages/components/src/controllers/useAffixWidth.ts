import { makeGenericController } from "@arcgis/lumina/controllers";
import type { EventEmitter, LitElement } from "@arcgis/lumina";
import type { PropertyValues } from "lit";
import type { Ref } from "lit/directives/ref.js";
import type { Scale } from "../components/types";

interface AffixWidthComponent extends LitElement {
  prefixRef: Ref<HTMLElement>;
  suffixRef: Ref<HTMLElement>;
  prefixText?: string;
  suffixText?: string;
  scale: Scale;
  calciteInternalInputAffixChange: EventEmitter;
}

type AffixWidthOptions = {
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
  options: AffixWidthOptions = {},
): ReturnType<typeof makeGenericController<UseAffixWidth, T>> => {
  return makeGenericController<UseAffixWidth, T>((component, controller) => {
    controller.onUpdated((changes: PropertyValues<AffixWidthComponent>) => {
      if (changes.has("prefixText") || changes.has("scale") || changes.has("suffixText")) {
        component.calciteInternalInputAffixChange.emit();
      }
    });

    return {
      getAffixWidth: (affix): number => Math.ceil(component[`${affix}Ref`].value?.getBoundingClientRect().width ?? 0),
      getTrailingWidth: (affix): number => options.getTrailingWidth?.(affix) ?? 0,
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
