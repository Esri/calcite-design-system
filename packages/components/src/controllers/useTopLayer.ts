import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { Ref } from "lit/directives/ref.js";

export interface UseTopLayer {
  /**
   * Shows the target element on the top layer.
   */
  show: () => Promise<void>;

  /**
   * Hides the target element from the top layer.
   */
  hide: () => Promise<void>;
}

export interface UseTopLayerOptions {
  /**
   * When true, the top-layer placement will be disabled regardless of `topLayerDisabled`.
   */
  disabledOverride?: () => boolean;

  /**
   * The target element or a Ref to the target element to show on the top layer.
   */
  target: (() => HTMLElement | undefined) | Ref<HTMLElement>;
}

export interface TopLayerComponent extends LitElement {
  /**
   * When true, disables top layer placement when the component is open.
   *
   * @mdn [Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  topLayerDisabled?: boolean;
}

export const useTopLayer = <T extends TopLayerComponent>(
  options: UseTopLayerOptions,
): ReturnType<typeof makeGenericController<UseTopLayer, T>> => {
  return makeGenericController<UseTopLayer, T>((component) => {
    async function togglePopover(open: boolean): Promise<void> {
      await component.componentOnReady();
      const nativePopoverEl = typeof options.target === "function" ? options.target() : options.target.value;

      if (
        !nativePopoverEl ||
        options.disabledOverride?.() ||
        ("topLayerDisabled" in component && component.topLayerDisabled === true)
      ) {
        return;
      }

      if (open) {
        nativePopoverEl.showPopover();
      } else {
        nativePopoverEl.hidePopover();
      }
    }

    return {
      show: async () => {
        await togglePopover(true);
      },
      hide: async () => {
        await togglePopover(false);
      },
    };
  });
};
