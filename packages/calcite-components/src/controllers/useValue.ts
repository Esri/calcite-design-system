import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";

interface ValueComponent {
  value: string;
}

interface ValueController {
  userChangedValue: boolean;
}

/**
 * A controller for managing form component values
 *
 */
export const useValue = makeGenericController<ValueController, ValueComponent>((component: LitElement, controller) => {
  console.log("constructor", component);

  controller.onConnected(() => console.log("connectedCallback"));
  controller.onDisconnected(() => console.log("disconnectedCallback"));
  controller.onLoad(async () => {
    await Promise.resolve();
    console.log("load");
  });
  controller.onLoaded(() => console.log("loaded"));
  controller.onUpdate((changes) => console.log("willUpdate", changes));
  controller.onUpdated((changes) => console.log("updated", changes));
  return {
    userChangedValue: false,
  };
});
