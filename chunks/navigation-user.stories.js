/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as u } from "./utils3.js";
import { h as e } from "./formatting.js";
import { s as r } from "./index3.js";
import "./navigation.js";
import "./navigation-user.js";
const v = {
  title: "Components/Navigation/Navigation User",
  args: {
    active: !0,
    fullName: "Edward Abbey",
    textDisabled: !1,
    thumbnail: "",
    userId: "",
    username: "eabbey_123"
  }
}, t = (a) => e`
  <calcite-navigation-user
    ${u("active", a.active)}
    full-name="${a.fullName}"
    slot="user"
    ${u("text-disabled", a.textDisabled)}
    thumbnail="${a.thumbnail}"
    user-id="${a.userId}"
    username="${a.username}"
  />
`, n = () => e`<calcite-navigation-user full-name="Edward Abbey" />`, s = () => e`<calcite-navigation-user username="eabbey_123" />`, i = () => e`<calcite-navigation-user thumbnail="${r({
  width: 50,
  height: 50
})}" />`, l = () => e`<calcite-navigation-user full-name="Edward Abbey" thumbnail="${r({
  width: 50,
  height: 50
})}" />`, o = () => e`<calcite-navigation-user username="eabbey_123" thumbnail="${r({
  width: 50,
  height: 50
})}" />`, c = () => e`<calcite-navigation-user
    full-name="Edward Abbey"
    username="eabbey_123"
    thumbnail="${r({
  width: 50,
  height: 50
})}"
  />`, m = () => e`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-user
      full-name="Edward Abbey"
      username="eabbey_123"
      thumbnail="${r({
  width: 50,
  height: 50
})}"
      slot="user"
    />
  </calcite-navigation>
`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: NavigationUserStoryArgs): string => html\`
  <calcite-navigation-user
    \${boolean("active", args.active)}
    full-name="\${args.fullName}"
    slot="user"
    \${boolean("text-disabled", args.textDisabled)}
    thumbnail="\${args.thumbnail}"
    user-id="\${args.userId}"
    username="\${args.username}"
  />
\``,
      ...t.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-user full-name="Edward Abbey" />`',
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-user username="eabbey_123" />`',
      ...s.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-user thumbnail="${placeholderImage({\n  width: 50,\n  height: 50\n})}" />`',
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-user full-name="Edward Abbey" thumbnail="${placeholderImage({\n  width: 50,\n  height: 50\n})}" />`',
      ...l.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-user username="eabbey_123" thumbnail="${placeholderImage({\n  width: 50,\n  height: 50\n})}" />`',
      ...o.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-navigation-user
    full-name="Edward Abbey"
    username="eabbey_123"
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
  />\``,
      ...c.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-user
      full-name="Edward Abbey"
      username="eabbey_123"
      thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
      slot="user"
    />
  </calcite-navigation>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
const f = ["simple", "fullName", "username", "thumbnail", "fullNameAndThumbnail", "usernameAndThumbnail", "All", "slottedInNav"];
export {
  c as All,
  f as __namedExportsOrder,
  v as default,
  n as fullName,
  l as fullNameAndThumbnail,
  t as simple,
  m as slottedInNav,
  i as thumbnail,
  s as username,
  o as usernameAndThumbnail
};
