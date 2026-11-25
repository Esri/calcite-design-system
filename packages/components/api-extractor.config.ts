import type { ApiExtractorConfig } from "@arcgis/api-extractor/extractor/config";

export const config: ApiExtractorConfig = {
  strict: true,
  documentation: {
    basePath: "/calcite-design-system/api/",
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
        disabled(_apiProperty, apiClass) {
          const descriptionOverrides: Record<string, string> = {
            Stack: "When `true`, content interaction is prevented and displayed with lower opacity.",
          };

          return {
            description:
              descriptionOverrides[apiClass.name] ??
              "When `true`, prevents interaction and decreases the component's opacity.",
            docsTags: [
              {
                name: "see",
                text: "[MDN - disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)",
              },
            ],
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
            Tile: "Specifies the component's heading text that displays between the `icon` and `description`.",
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
        iconFlipRtl(apiProperty, apiClass) {
          const iconFlipScope = apiClass.name === "TreeItem" ? "`iconStart`" : "`iconStart` and/or `iconEnd`";

          return {
            description:
              apiProperty.type.text === "boolean"
                ? 'When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`)'
                : `Displays the ${iconFlipScope} as flipped when the element direction is right-to-left (\`"rtl"\`).`,
          };
        },
        iconStart: {
          description: "Specifies an icon to display at the start of the component.",
        },
        inlineEdit: {
          description: `Enables inline editing. When not editing, the component displays without a border.
When \`true\`, edits must be saved or cancelled via controls.
When \`"controls-disabled"\` is specified, edits are saved on blur.`,
        },
        inlineEditing: {
          description: "When `true` and `inlineEdit` is defined, the component is editable.",
        },
        inlineEditingBeforeConfirm: {
          description: "When `inlineEdit` is `true`, specifies a callback to be run when changes are saved.",
        },
        label(_apiProperty, apiClass) {
          const baseDescription = "Specifies an accessible label for the component.";
          const dragDescription = (component: string): string =>
            `When \`dragEnabled\` is \`true\` and multiple ${component} sorting is enabled with \`group\`, specifies the component's name for dragging between ${component}s.`;

          const descriptionOverrides: Record<string, string> = {
            Avatar: `Specifies alternative text when \`thumbnail\` is defined, otherwise ${baseDescription.toLowerCase()}`,
            BlockGroup: `${baseDescription}\n\n${dragDescription("group")}`,
            List: `${baseDescription}\n\n${dragDescription("list")}`,
            ListItem: `${baseDescription.slice(0, baseDescription.length - 1)}, displays above the \`description\`.`,
            Navigation: "When `navigationAction` is `true`, specifies an accessible label for the `calcite-action`.",
          };

          return {
            description: descriptionOverrides[apiClass.name] ?? baseDescription,
          };
        },
        labelText: {
          description: "Specifies the component's label text.",
        },
        menuFlipPlacements: {
          description:
            "Specifies the component's fallback `menuPlacement` when its initial or specified `menuPlacement` has insufficient space available.",
        },
        messageOverrides: {
          description: `Replace localized message strings with your own strings.\n\n_**Note**: Individual message keys may change between releases._`,
        },
        minLength: {
          description:
            "When the component resides in a form, specifies the minimum string length of the component's `value`.",
          docsTags: [
            {
              name: "see",
              text: `[MDN - minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/minlength)`,
            },
          ],
        },
        name: {
          description:
            "Specifies the name of the component.\n\nRequired to pass the component's `value` on form submission.",
        },
        overlayPositioning: {
          description:
            'Specifies the type of positioning to use for overlaid content.\n\n- `"absolute"` works for most cases - positioning the component inside of overflowing parent containers, which affects the container\'s layout.\n\n- `"fixed"` is used to escape an overflowing parent container, or when the reference element\'s `position` CSS property is `"fixed"`.',
        },
        referenceElement(_apiProperty, apiClass) {
          const interactivityOverrides: Record<string, string> = {
            Dropdown:
              "When a DOM element is specified, clicking or pressing the `referenceElement` toggles the component's `open` state.",
            Popover:
              "When a DOM element is specified and `triggerDisabled` is not specified, clicking or pressing the `referenceElement` toggles the component's `open` state.",
            Tooltip:
              "When a DOM element is specified, hovering or focusing the `referenceElement` toggles the component's `open` state.",
          };

          return {
            description: `The \`referenceElement\` is used to position the component according to its \`placement\` value. ${interactivityOverrides[apiClass.name] ?? ""}

Setting the value to an \`HTMLElement\` is preferred so the component does not need to query the DOM. However, a string \`id\` of the reference element can also be used.

The component should not be placed within its own \`referenceElement\` to avoid unintended behavior.`,
          };
        },
        scale(_apiProperty, apiClass) {
          const baseDescription = "Specifies the component's size.";
          const cardOverrideDescription = (componentName: string): string =>
            componentName === "Card" ? " The value can be overridden on the component if needed." : "";
          const descriptionOverrides: Record<string, string> = {
            ActionBar: "Specifies the size of the expand `calcite-action`.",
            ActionGroup: "Specifies the size of the `calcite-action-menu`.",
            ActionMenu: "Specifies the size of the component's trigger `calcite-action`.",
          };
          const childComponents: Record<string, string> = {
            CardGroup: "calcite-card",
            ChipGroup: "calcite-chip",
            SwatchGroup: "calcite-swatch",
          };
          const parentOverrides: Record<string, string> = {
            Card: "calcite-card-group",
            Chip: "calcite-chip-group",
            RadioButton: "calcite-radio-button-group",
            Swatch: "calcite-swatch-group",
          };
          const inheritedComponents = new Set([
            "AutocompleteItem",
            "AutocompleteItemGroup",
            "ComboboxItem",
            "ComboboxItemGroup",
            "DropdownGroup",
            "DropdownItem",
            "NavigationLogo",
            "NavigationUser",
            "SegmentedControlItem",
            "StepperItem",
            "Tab",
            "TabNav",
            "TabTitle",
          ]);

          const descriptionOverride = descriptionOverrides[apiClass.name];
          if (descriptionOverride) {
            return { description: descriptionOverride };
          }

          const child = childComponents[apiClass.name];
          if (child) {
            return {
              description: `${baseDescription} Child \`${child}\`s inherit the component's \`scale\` value.`,
            };
          }

          const inheritsScale = inheritedComponents.has(apiClass.name);
          const parent =
            parentOverrides[apiClass.name] ??
            (inheritsScale ? apiClass.docsTags?.find((tag) => tag.name === "parent")?.text : undefined);

          if (inheritsScale && !parent) {
            throw new Error(`Expected @parent for ${apiClass.name} scale inheritance documentation.`);
          }

          return {
            description: parent
              ? `${baseDescription} When contained in a parent \`${parent}\`, the component inherits the parent's \`scale\` value.${cardOverrideDescription(apiClass.name)}`
              : baseDescription,
          };
        },
        topLayerDisabled: {
          description:
            "When `true` and the component is `open`, disables top layer placement. Only set this if you need complex z-index control or if top layer placement causes conflicts with third-party components.",
        },
        validity: {
          description: "The component's current validation state.",
        },
        value: {
          description: "Specifies the component's value.",
        },
      },
    },
  },
};
