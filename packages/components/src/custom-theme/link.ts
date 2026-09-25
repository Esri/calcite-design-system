import "../components/link/link";
import { html } from "../../support/formatting";

export const linkTokens = {
  calciteLinkTextColor: "",
  calciteLinkTextColorHover: "",
  calciteLinkTextColorPress: "",
  calciteLinkVisitedTextColor: "",
  calciteLinkVisitedTextColorHover: "",
  calciteLinkVisitedTextColorPress: "",
};

export const link = html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem">
    <calcite-link icon-start="banana" icon-end="information">Unvisited link</calcite-link>
    <calcite-link href="#custom-theme-visited-link" icon-start="banana" icon-end="information">
      Visited link
    </calcite-link>
  </div>
`;
