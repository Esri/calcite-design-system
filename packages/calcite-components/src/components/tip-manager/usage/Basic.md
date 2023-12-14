Renders a tip manager using a group of tips as well as a single tip.

```html
<calcite-tip-manager>
  <calcite-tip-group group-title="Animal Insights">
    <calcite-tip heading="Paws for Thought" selected>
      <img slot="thumbnail" src="https://placedog.net/400/200" />
      <p>
        Did you know that a dog's sense of smell is so powerful that it can detect certain diseases, including cancer,
        with remarkable accuracy?
      </p>
      <p>
        Explore the incredible abilities of dogs with our
        <calcite-link href="#" target="_blank" rel="noopener noreferrer">Canine Marvels</calcite-link>.
      </p>
    </calcite-tip>
    <calcite-tip heading="Whisker Wisdom" hidden>
      <img slot="thumbnail" src="https://placekitten.com/400/200" />
      <p>
        Cats use their whiskers not only for balance but also to measure openings. If a cat's whiskers fit through an
        opening, the rest of its body will too!
      </p>
      <p>
        Discover intriguing facts about cats with our
        <calcite-link href="#" target="_blank" rel="noopener noreferrer">Curious Cat Chronicles</calcite-link>.
      </p>
    </calcite-tip>
  </calcite-tip-group>
  <calcite-tip heading="Bear Essentials" hidden>
    <img slot="thumbnail" src="https://placebear.com/400/200" />
    <p>
      Bears are excellent swimmers! They can swim long distances and even dive for their meals. Polar bears, in
      particular, are known to swim for hours in search of food.
    </p>
    <p>
      Explore the aquatic side of bears with our
      <calcite-link href="#" target="_blank" rel="noopener noreferrer">Bear Aquatics</calcite-link>.
    </p>
  </calcite-tip>
</calcite-tip-manager>
```
