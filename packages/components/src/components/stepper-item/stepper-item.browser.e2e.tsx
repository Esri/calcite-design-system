import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, disabled, focusable, hidden, renders, t9n, themed } from "../../tests/common";

import { CSS } from "./resources";

describe("defaults", () => {
  defaults(() => mount("calcite-stepper-item"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-stepper-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-stepper-item"), { display: "flex" });
});

describe("focusable", () => {
  focusable(() => mount(<calcite-stepper-item layout="vertical" />));
});

describe("translation support", () => {
  t9n(() => mount(<calcite-stepper-item heading="Step 1" id="step-1" />));
});

describe("disabled", () => {
  disabled(() => mount("calcite-stepper-item"));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount(<calcite-stepper-item description="description" heading="Item" />), {
      "--calcite-stepper-bar-gap": {
        selector: `calcite-stepper-item`,
        targetProp: "marginBlockEnd", // here
      },
      "--calcite-stepper-item-background-color-press": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
          state: { press: `calcite-stepper-item >>> .${CSS.container} ` },
        },
        {
          shadowSelector: `.${CSS.stepperItemHeader}`,
          targetProp: "backgroundColor",
          state: { press: `calcite-stepper-item >>> .${CSS.stepperItemHeader} ` },
        },
      ],
      "--calcite-stepper-item-header-text-color-hover": [
        {
          shadowSelector: `.${CSS.stepperItemHeading}`,
          targetProp: "color",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.stepperItemHeading}`,
          targetProp: "color",
          state: "focus",
        },
      ],
      "--calcite-stepper-item-description-text-color-hover": [
        {
          shadowSelector: `.${CSS.stepperItemDescription}`,
          targetProp: "color",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.stepperItemDescription}`,
          targetProp: "color",
          state: "focus",
        },
      ],
    });
  });
  describe("selected", () => {
    themed(() => mount(<calcite-stepper-item heading="Item" selected />), {
      "--calcite-stepper-item-selected-header-text-color": {
        shadowSelector: `.${CSS.stepperItemHeading}`,
        targetProp: "color",
      },
      "--calcite-stepper-item-description-text-color-hover": {
        shadowSelector: `.${CSS.stepperItemDescription}`,
        targetProp: "color",
      },
    });
  });
  describe("icon", () => {
    describe("default", () => {
      themed(() => mount(<calcite-stepper-item heading="Item" icon />), {
        "--calcite-stepper-item-icon-color": {
          shadowSelector: `.${CSS.stepperItemIcon}`,
          targetProp: "color",
        },
      });
    });
    describe("complete", () => {
      themed(() => mount(<calcite-stepper-item complete heading="Item" icon />), {
        "--calcite-stepper-item-complete-icon-color": {
          shadowSelector: `.${CSS.stepperItemIcon}`,
          targetProp: "color",
        },
      });
    });
    describe("error", () => {
      themed(() => mount(<calcite-stepper-item error heading="Item" icon />), {
        "--calcite-stepper-item-error-icon-color": {
          shadowSelector: `.${CSS.stepperItemIcon}`,
          targetProp: "color",
        },
      });
    });
    describe("selected", () => {
      themed(() => mount(<calcite-stepper-item heading="Item" icon selected />), {
        "--calcite-stepper-item-selected-icon-color": {
          shadowSelector: `.${CSS.stepperItemIcon}`,
          targetProp: "color",
        },
      });
    });
  });
  describe("numbered", () => {
    describe("default", () => {
      themed(
        () => mount(<calcite-stepper-item description="description" heading="Item" numbered />),
        {
          "--calcite-stepper-item-description-text-color": [
            {
              shadowSelector: `.${CSS.stepperItemDescription}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.stepperItemNumber}`,
              targetProp: "color",
            },
          ],
        },
      );
    });
    describe("error", () => {
      themed(() => mount(<calcite-stepper-item error heading="Item" numbered />), {
        "--calcite-stepper-item-error-icon-color": {
          shadowSelector: `.${CSS.stepperItemNumber}`,
          targetProp: "color",
        },
      });
    });
    describe("selected", () => {
      themed(() => mount(<calcite-stepper-item heading="Item" numbered selected />), {
        "--calcite-stepper-item-selected-icon-color": {
          shadowSelector: `.${CSS.stepperItemNumber}`,
          targetProp: "color",
        },
      });
    });
  });
  describe("layout", () => {
    describe("horizontal", () => {
      describe("default", () => {
        themed(() => mount(<calcite-stepper-item heading="Item" layout="horizontal" />), {
          "--calcite-stepper-bar-fill-color-hover": [
            {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
              state: "focus",
            },
          ],
          "--calcite-stepper-item-header-text-color": {
            selector: "calcite-stepper-item",
            shadowSelector: `.${CSS.stepperItemHeading}`,
            targetProp: "color",
          },
        });
      });
      describe("complete", () => {
        themed(() => mount(<calcite-stepper-item complete heading="Item" layout="horizontal" />), {
          "--calcite-stepper-bar-complete-fill-color": {
            shadowSelector: `.${CSS.stepperItemHeader}`,
            targetProp: "borderColor",
          },
          "--calcite-stepper-bar-complete-fill-color-hover": [
            {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
              state: "focus",
            },
          ],
        });
      });
      describe("error", () => {
        themed(() => mount(<calcite-stepper-item error heading="Item" layout="horizontal" />), {
          "--calcite-stepper-bar-error-fill-color": {
            shadowSelector: `.${CSS.stepperItemHeader}`,
            targetProp: "borderColor",
          },
          "--calcite-stepper-bar-error-fill-color-hover": [
            {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
              state: "focus",
            },
          ],
        });
      });
      describe("selected", () => {
        themed(() => mount(<calcite-stepper-item heading="Item" layout="horizontal" selected />), {
          "--calcite-stepper-bar-selected-fill-color": {
            shadowSelector: `.${CSS.stepperItemHeader}`,
            targetProp: "borderColor",
          },
        });
      });
    });
    describe("vertical", () => {
      describe("default", () => {
        themed(() => mount(<calcite-stepper-item heading="Item" layout="vertical" />), {
          "--calcite-stepper-bar-fill-color-hover": [
            {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
              state: "hover",
            },
          ],
          "--calcite-stepper-bar-fill-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderColor",
          },
        });
      });
      describe("complete", () => {
        themed(() => mount(<calcite-stepper-item complete heading="Item" layout="vertical" />), {
          "--calcite-stepper-bar-complete-fill-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderColor",
          },
          "--calcite-stepper-bar-complete-fill-color-hover": [
            {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
              state: "hover",
            },
          ],
        });
      });
      describe("error", () => {
        themed(() => mount(<calcite-stepper-item error heading="Item" layout="vertical" />), {
          "--calcite-stepper-bar-error-fill-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderColor",
          },
          "--calcite-stepper-bar-error-fill-color-hover": [
            {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
              state: "hover",
            },
          ],
        });
      });
      describe("selected", () => {
        themed(() => mount(<calcite-stepper-item heading="Item" layout="vertical" selected />), {
          "--calcite-stepper-bar-selected-fill-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderColor",
          },
        });
      });
    });
  });
});
