import { select, text } from "@storybook/addon-knobs";

import { storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Avatar",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-avatar
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    label="${text("label", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
    thumbnail="${text("thumbnail", placeholderImage({ width: 120, height: 120 }))}"
  >
  </calcite-avatar>
`;

export const missingThumbnail = (): string => html`
  <calcite-avatar
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
  >
  </calcite-avatar>
`;

const users = [
  { id: "52e44e112b1f429182515dba79b71eb8", name: "au" },
  { id: "1c863a764d6de370e220e7d3aeddd8a9", name: "bv" },
  { id: "a81470986eaeee1833b74b7d8abcd5b2", name: "cw" },
  { id: "9a7c50e6b3ce4b859f7b31e302437164", name: "dx" },
  { id: "7938de70b5d04956b098eedce1e3ba47", name: "exy" },
  { id: "98f64d6d4e124c6290d092a7998e96cb", name: "fz" },
  { id: "c977c075f3ad4dc2a840f3d2fff3d978", name: "ga" },
  { id: "25684463a00c449585dbb32a065f6b74", name: "hb" },
  { id: "770b011f40ba22321f686b04b803d325", name: "ic" },
  { id: "eea642e2a6f5a0b6c2e302cc664905c3", name: "jd" },
  { id: "19813ce4b4704b6e9fe2e79c34909ae4", name: "ke" },
  { id: "ad61de73b6d79446416bde1a18da87a7", name: "lf" },
  { id: "8a6fda51f21d40d588d07f1cf52b4890", name: "mg" },
  { id: "bd353ce54a5b40e7b3544d0cb454d465", name: "nh" },
  { id: "dfb1d98e54a244dca345dd85062e227c", name: "oi" },
  { id: "bcce092ebb474a369c9730f52106700c", name: "pj" },
  { id: "8542b186e5a64a90910486de32bced72", name: "qk" },
  { id: "8587853c1f544de6ae4133224db29736", name: "rl" },
  { id: "9de33a713bd84690bbc618e98ecf7567", name: "sm" },
  { id: "e85f7f72aa51b34f81660a0f4c6a4d80", name: "tn" },
];

const contrastLight = users
  .map((user): string => html`<calcite-avatar user-id="${user.id}" username="${user.name}"></calcite-avatar>`)
  .join("");

const contrastDarkRTL = users
  .map(
    (user): string =>
      html`<calcite-avatar
        dir="rtl"
        class="calcite-mode-dark"
        user-id="${user.id}"
        username="${user.name}"
      ></calcite-avatar>`,
  )
  .join("");

export const contrast = (): string => html`
  <div>
    <style>
      .container {
        display: flex;
        width: 35%;
        justify-content: space-between;
        align-items: center;
        padding: 25px 0;
      }
      .use-case {
        flex: 1 0 21%;
        margin: 0 15px;
      }
    </style>
    <div class="container">
      <div class="use-case">${contrastLight}</div>
      <div class="use-case">${contrastDarkRTL}</div>
    </div>
  </div>
`;
