Populate Flow with `calcite-flow-item`s to step inside a `calcite-panel` element with HTML and JavaScript:

```html
<calcite-shell>
  <calcite-shell-panel slot="panel-start" width-scale="l">
    <calcite-flow id="example-flow">
      <calcite-flow-item heading="Places of Education">
        <calcite-block id="first-flow-item-block" heading="Recommended for you" description="4 results" open>
          <calcite-list>
            <calcite-list-item label="Narnia Community College" description="Wardobe, IA"> </calcite-list-item>
            <calcite-list-item label="University of Acme" description="Acmeton, CA"></calcite-list-item>
            <calcite-list-item label="Roadrunner Trade School" description="Zion, UT"></calcite-list-item>
            <calcite-list-item label="Cartographic Institute" description="Redlands, CA"> </calcite-list-item>
          </calcite-list>
        </calcite-block>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell-panel>
  <calcite-panel heading="Content"></calcite-panel>
</calcite-shell>
```

```js
const flow = document.getElementById("example-flow");
const items = document.querySelectorAll("calcite-list-item");

items?.forEach((item) => {
  item.addEventListener("calciteListItemSelect", (event) => {
    createFlowItem(event, event.target.label, event.target.description, false);
  });
});

function createFlowItem(event, title, description, isLastLevel) {
  const newFlowItem = document.createElement("calcite-flow-item");
  newFlowItem.heading = !isLastLevel ? title : "Even more details";
  newFlowItem.description = !isLastLevel ? description : title;

  const block = document.createElement("calcite-block");
  block.open = true;
  block.heading = "Details";
  newFlowItem.append(block);

  const notice = document.createElement("calcite-notice");
  notice.open = true;
  notice.width = "full";
  block.append(notice);

  const noticeMessage = document.createElement("span");
  noticeMessage.slot = "message";
  noticeMessage.innerText = !isLastLevel ? `A new Flow Item for ${title}.` : "You've reached the end of the line.";
  notice.append(noticeMessage);

  if (!isLastLevel) {
    const button = document.createElement("calcite-button");
    button.slot = "footer";
    button.width = "full";
    button.innerText = "Move to a third Flow Item";
    button.addEventListener("click", (event) => createFlowItem(event, title, description, true));
    if (!isLastLevel) newFlowItem.append(button);
  }

  flow.append(newFlowItem);
}
```
