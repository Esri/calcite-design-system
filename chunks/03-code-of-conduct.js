import { j as e, M as r, c as a } from "./blocks.js";
import { useMDXComponents as i } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const s = `# Code of Conduct

v1.0.0, February 2019

> Adapted from Esri's [Conference and Community Spaces Code of Conduct](https://www.esri.com/en-us/about/events/code-of-conduct)

## Purpose

At Esri, we believe geography can make the world a better place. In adopting this Community Code of Conduct, we as Esri employees are committed to fostering a welcoming environment for collaboration, creativity, and the free exchange of ideas for developing, maintaining, and using open source GIS software. We aim to empower all participants to actively engage and help build a friendly and safe Esri open source developer community.

Whether publicly or privately, and whether in-person or online, we expect all members of this community to interact both professionally and without harassment toward others, regardless of race, color, creed, gender, gender identity, religion, marital status, domestic partner status, genetic information, age, national origin or ancestry, military or veteran status, sexual orientation, or either physical or mental disability.

## Expectations

Behavior we encourage:

- Share your ideas, but also listen to others
- Be professional, kind, and considerate in technical discussions and disagreements
- Respect personal boundaries and preferences
- Respect all project contributors and maintainers

Inappropriate/unacceptable behavior is anything hurtful that interferes with other people’s experience and participation in our community. This includes:

- Harassment, aggression, and intimidation
- Slurs
- Derogatory jokes and statements
- Foul or obscene language
- Stalking
- Sharing graphic or derogatory pictures, drawings, or cartoons
- _Ad hominem_ or personal attacks and insults
- Unwanted or offensive letters or poems
- Offensive email, voicemail messages, or social media postings
- Personal threats

## Reporting

Repository maintainers reserve the right to remove offensive content. To report inappropriate behavior, you can also contact [events@esri.com](mailto:events@esri.com).

## Consequences

Violations of this Code of Conduct may result in:

- Disqualification from Esri Events and Conferences
- Being blocked from Esri's [GitHub Organization](https://help.github.com/articles/blocking-a-user-from-your-organization/)
`;
function t(n) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(r, {
      title: "Overview/Code of Conduct"
    }), `
`, e.jsx(a, {
      children: s
    })]
  });
}
function d(n = {}) {
  const { wrapper: o } = {
    ...i(),
    ...n.components
  };
  return o ? e.jsx(o, {
    ...n,
    children: e.jsx(t, {
      ...n
    })
  }) : t();
}
export {
  d as default
};
