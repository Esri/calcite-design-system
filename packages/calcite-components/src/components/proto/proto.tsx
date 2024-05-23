import { Component, h, VNode } from "@stencil/core";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/Element/adapter";

@Component({
  tag: "calcite-proto",
  styleUrl: "proto.scss",
  shadow: true,
})
export class Proto {
  render(): VNode {
    const items = ["one", "two", "three", "four", "five"];
    return (
      <ul ref={this.setupDropTarget}>
        {items.map((item) => (
          <li ref={this.setupDraggable}>{item}</li>
        ))}
      </ul>
    );
  }

  private setupDropTarget = (el: HTMLUListElement): void => {
    dropTargetForElements({
      element: el,
      onDragStart: () => console.log("Dragging an element"),
      onDragEnter: () => console.log("Entered a drop target"),
      onDragLeave: () => console.log("Left a drop target"),
      onDrop: () => console.log("Dropped an element"),
    });
  };

  private setupDraggable = (el: HTMLLIElement): void => {
    draggable({ element: el });
  };
}
