import { html } from "../../support/formatting";
import { SLOTS } from "../components/autocomplete/resources";

export const autocompleteTokens = {
  calciteAutocompleteBackgroundColor: "",
  calciteAutocompleteBorderColor: "",
  calciteAutocompleteDescriptionTextColor: "",
  calciteAutocompleteHeadingTextColor: "",
  calciteAutocompleteTextColor: "",
  calciteAutocompleteWidth: "",
};

export const autocomplete = html`<calcite-autocomplete label="Pets">
  <div slot="${SLOTS.contentTop}">Top</div>
  <div slot="${SLOTS.contentBottom}">Bottom</div>
  <calcite-button kind="neutral" appearance="solid" icon-start="banana" slot="${SLOTS.actionsStart}"></calcite-button>
  <calcite-button kind="neutral" appearance="solid" icon-start="banana" slot="${SLOTS.actionsEnd}"></calcite-button>
  <calcite-autocomplete-item-group heading="Dogs">
    <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
  <calcite-autocomplete-item-group heading="Cats">
    <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
</calcite-autocomplete>`;
