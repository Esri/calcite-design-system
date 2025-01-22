import { makeController } from "@arcgis/components-controllers";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../utils/openCloseComponent";

export interface UseOpenClose {
  afterToggle: (c: any) => void;
}

interface UseOpenCloseOptions {
  transitionEl: OpenCloseComponent["transitionEl"];
  transitionProp: OpenCloseComponent["transitionProp"];
  openProp: {
    name: string;
    value: boolean;
  };
  events: {
    onBeforeOpen: OpenCloseComponent["onBeforeOpen"];
    onOpen: OpenCloseComponent["onOpen"];
    onBeforeClose: OpenCloseComponent["onBeforeClose"];
    onClose: OpenCloseComponent["onClose"];
  };
}

export const useOpenClose = (options: UseOpenCloseOptions): UseOpenClose =>
  makeController<UseOpenClose>(() => {
    const opts = {
      transitionEl: options.transitionEl,
      transitionProp: options.transitionProp,
      openProp: options.openProp.name,
      onBeforeOpen: options.events.onBeforeOpen,
      onOpen: options.events.onOpen,
      onBeforeClose: options.events.onBeforeClose,
      onClose: options.events.onClose,
    };

    return {
      afterToggle: (override: any) => {
        onToggleOpenCloseComponent(opts, override);
      },
    };
  });
