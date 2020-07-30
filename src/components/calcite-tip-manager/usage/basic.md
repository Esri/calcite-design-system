#### Basic

Renders a tip manager using a group of tips as well as a single tip.

```html
<calcite-tip-manager>
  <calcite-tip-group text-group-title="Greek Myth Stuff">
    <calcite-tip
      heading="Pegasus"
      thumbnail="https://placeimg.com/1000/600"
      text-thumbnail="This is an image of a horse with wings."
    >
      <p slot="info">
        Usually depicted as pure white, Pegasus is the offspring of the Olympian god Poseidon. He was foaled by the
        Gorgon Medusa upon her death, when the hero Perseus decapitated her.
      </p>
      <a slot="link" href="http://www.wingeddivinehorse.com">Magical flying horsey</a>
    </calcite-tip>
    <calcite-tip
      heading="Minotaur"
      thumbnail="https://placeimg.com/600/1000"
      text-thumbnail="This is an image of a man with a bull head and tail."
    >
      <p slot="info">
        The creature resided in the twisting maze of the labyrinth where it was offfered a regular sacrifice of youths
        and maidens to satisfy its cannibalistic hunger.
      </p>
      <a slot="link" href="http://www.cannibull.com">Bull headed man</a>
    </calcite-tip>
  </calcite-tip-group>
  <calcite-tip
    heading="Siren"
    thumbnail="https://placeimg.com/600/1000"
    text-thumbnail="This is an image of a half woman half bird."
  >
    <p slot="info">
      Dangerous creatures who lured nearby sailors with their enchanting music and singing voices to shipwreck on the
      rocky coast of their island.
    </p>
    <a slot="link" href="http://www.beautifulmurderer.com">Sexy bird lady</a>
  </calcite-tip>
</calcite-tip-manager>
```
