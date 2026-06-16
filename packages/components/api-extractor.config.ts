import type { ApiExtractorConfig } from "@arcgis/api-extractor/extractor/config";

export const config: ApiExtractorConfig = {
  documentation: {
    copyDocDefinitions: {
      properties: {
        checked: {
          description: "When `true`, the component is checked.",
        },
        closed: {
          description: "When `true`, hides the component.",
        },
        closable(_apiProperty, apiClass) {
          const descriptionOverrides: Record<string, string> = {
            FlowItem: "When `true`, displays a close button in the trailing side of the component's header.",
            Panel: "When `true`, displays a close button in the trailing side of the component's header.",
          };

          return {
            description:
              descriptionOverrides[apiClass.name] ?? "When `true`, displays a close button in the component.",
          };
        },
        description(_apiProperty, apiClass) {
          const descriptionWithPlacement = (placement: string): string =>
            `Specifies a description for the component. Displays ${placement}.`;

          const descriptionOverrides: Record<string, string> = {
            AutocompleteItem: descriptionWithPlacement("below the `label`"),
            Block: descriptionWithPlacement("below the `heading`"),
            ComboboxItem: descriptionWithPlacement("below the `heading`"),
            ListItem: descriptionWithPlacement("below the `label`"),
            NavigationLogo: descriptionWithPlacement("below the `heading`"),
            StepperItem: descriptionWithPlacement("below the `heading`"),
            TableHeader: descriptionWithPlacement("below the `heading`"),
            Tile: descriptionWithPlacement("below the `heading`"),
          };

          return {
            description: descriptionOverrides[apiClass.name] ?? "Specifies a description for the component.",
          };
        },
        flipPlacements(_apiProperty, apiClass) {
		  const description =
            "Specifies the component's fallback `placement` for slotted {{content}} when its initial or specified `placement` has insufficient space available.";
          const descriptionWithContent = (content: string): string => description.replace("{{content}}", content);

          const descriptionOverrides: Record<string, string> = {
            Dropdown: descriptionWithContent("`calcite-dropdown-item`s"),
          };

          return {
            description: descriptionOverrides[apiClass.name] ?? descriptionWithContent("content"),
          };

        },
        form: {
          description:
            "Specifies the `id` of the component's associated form. When not set, the component is associated with its ancestor form element, if one exists.",
        },
        heading(_apiProperty, apiClass) {
          const descriptionOverrides: Record<string, string> = {
            ListItemGroup: "Specifies the heading text for the nested `calcite-list-item` rows.",
            Tile: "Specifies the component's heading text, displays between the `icon` and `description`.",
          };

          return {
            description: descriptionOverrides[apiClass.name] ?? "Specifies the component's heading text.",
          };
        },
        headingLevel: {
          description:
            "Specifies the heading level number of the component's `heading` for proper document structure, without affecting visual styling.",
        },
        height: {
          description: "Specifies the component's height.",
        },
        iconEnd: {
          description: "Specifies an icon to display at the end of the component.",
        },
        iconStart: {
          description: "Specifies an icon to display at the start of the component.",
        },
        label: {
          description: "Specifies an accessible label for the component.",
        },
        labelText: {
          description: "Specifies the component's label text.",
        },
        menuFlipPlacements: {
          description:
            "Specifies the component's fallback `menuPlacement` when its initial or specified `menuPlacement` has insufficient space available.",
        },
        messageOverrides: {
          description: "Overrides individual strings used by the component.",
        },
        name: {
          description:
            "Specifies the name of the component. Required to pass the component's `value` on form submission.",
        },
        overlayPositioning: {
          description:
            'Specifies the type of positioning to use for overlaid content, where:\n\n`"absolute"` works for most cases - positioning the component inside of overflowing parent containers, which affects the container\'s layout, and\n\n`"fixed"` is used to escape an overflowing parent container, or when the reference element\'s `position` CSS property is `"fixed"`.',
        },
        referenceElement: {
          description:
            "The `referenceElement` is used to position the component according to its `placement` value.\n\nSetting the value to an `HTMLElement` is preferred so the component does not need to query the DOM.\n\nHowever, a string `id` of the reference element can also be used.\n\nThe component should not be placed within its own `referenceElement` to avoid unintended behavior.",
        },
        topLayerDisabled: {
          description:
            "When `true` and the component is `open`, disables top layer placement. Only set this if you need complex z-index control or if top layer placement causes conflicts with third-party components.",
        },
        validity: {
          description: "The component's current validation state.",
        },
      },
    },
  },
};
