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
  calciteInternalAffixChange: EventEmitter;
}

type AffixWidthOptions<T extends AffixWidthComponent> = {
  getTrailingWidth?: (affix: Affix) => number;
  trailingWidthReady?: () => Promise<void>;
  trailingWidthProperties?: (keyof T)[];
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
  trailingWidthReady: () => Promise<void>;
}

/**
 * Provides affix measurements, width overrides, and change notifications for Field Group affix-width coordination.
 */
export const useAffixWidth = <T extends AffixWidthComponent>(
  options: AffixWidthOptions<T> = {},
): ReturnType<typeof makeGenericController<UseAffixWidth, T>> => {
  const changeProperties: (keyof T)[] = [
    "prefixText",
    "scale",
    "suffixText",
    ...(options.trailingWidthProperties ?? []),
  ];

  return makeGenericController<UseAffixWidth, T>((component, controller) => {
    controller.onUpdated((changes: PropertyValues) => {
      if (changeProperties.some((property) => changes.has(property))) {
        component.calciteInternalAffixChange.emit();
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
      trailingWidthReady: async (): Promise<void> => {
        await options.trailingWidthReady?.();
      },
    };
  });
};
