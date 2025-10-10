import { k as u, h as e } from "./index.js";
import { p as t } from "./placeholder-image.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const h = {
  title: "Components/Navigation/Navigation User",
  args: {
    fullName: "Edward Abbey",
    userName: "eabbey_123",
    thumbnail: "",
    userId: "",
    textDisabled: !1,
    active: !0
  }
}, r = (a) => e`
  <calcite-navigation-user
    slot="user"
    full-name="${a.fullName}"
    username="${a.username}"
    thumbnail="${a.thumbnail}"
    user-id="${a.userId}"
    ${u("text-disabled", a.textDisabled)}
    ${u("active", a.active)}
  />
`, n = () => e`<calcite-navigation-user full-name="Edward Abbey" />`, s = () => e`<calcite-navigation-user username="eabbey_123" />`, i = () => e`<calcite-navigation-user thumbnail="${t({
  width: 50,
  height: 50
})}" />`, l = () => e`<calcite-navigation-user full-name="Edward Abbey" thumbnail="${t({
  width: 50,
  height: 50
})}" />`, o = () => e`<calcite-navigation-user username="eabbey_123" thumbnail="${t({
  width: 50,
  height: 50
})}" />`, c = () => e`<calcite-navigation-user
    full-name="Edward Abbey"
    username="eabbey_123"
    thumbnail="${t({
  width: 50,
  height: 50
})}"
  />`, m = () => e`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-user
      full-name="Edward Abbey"
      username="eabbey_123"
      thumbnail="${t({
  width: 50,
  height: 50
})}"
      slot="user"
    />
  </calcite-navigation>
`;
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: NavigationUserStoryArgs): string => html\`
  <calcite-navigation-user
    slot="user"
    full-name="\${args.fullName}"
    username="\${args.username}"
    thumbnail="\${args.thumbnail}"
    user-id="\${args.userId}"
    \${boolean("text-disabled", args.textDisabled)}
    \${boolean("active", args.active)}
  />
\``,
      ...r.parameters?.docs?.source
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
const g = ["simple", "fullName", "username_TestOnly", "thumbnail_TestOnly", "fullNameAndThumbnail_TestOnly", "usernameAndThumbnail_TestOnly", "All_TestOnly", "slottedInNav_TestOnly"];
export {
  c as All_TestOnly,
  g as __namedExportsOrder,
  h as default,
  n as fullName,
  l as fullNameAndThumbnail_TestOnly,
  r as simple,
  m as slottedInNav_TestOnly,
  i as thumbnail_TestOnly,
  o as usernameAndThumbnail_TestOnly,
  s as username_TestOnly
};
