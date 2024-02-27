`<calcite-tree>` can be used as a sidebar navigation tree with optional lines and different selection modes.

```html
<calcite-tree>
  <calcite-tree-item>
    <a href="#">Technology</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a href="#">Programming Languages</a>
        <calcite-tree slot="children">
          <calcite-tree-item>
            <a href="#">JavaScript</a>
          </calcite-tree-item>
          <calcite-tree-item>
            <a href="#">Python</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
      <calcite-tree-item>
        <a href="#">Frameworks</a>
        <calcite-tree slot="children">
          <calcite-tree-item>
            <a href="#">React</a>
          </calcite-tree-item>
          <calcite-tree-item>
            <a href="#">Vue.js</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
</calcite-tree>
```
