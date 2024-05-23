import { Component, h, VNode } from "@stencil/core";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/Element/adapter";
// import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";

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
        {items.map((item, index) => (
          <li id={index.toString()} key={index} ref={this.setupDraggable}>
            {item}
          </li>
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
      onDrop: () => {
        // const target = location.current.dropTargets[0];
        // const indexOfTarget = Array.from(el.children).findIndex(
        //   (item) => item.id === target.element.id,
        // );
        // console.log({ target, indexOfTarget });
        // console.log("Dropped an element", location, source);
        // const index = source?.element?.id;
        // console.log(index);
      },
    });

    monitorForElements({
      onDrop: ({ location, source }) => {
        const target = source.element;
        const indexOfTarget = Array.from(el.children).findIndex((item) => item.id === target.id);

        console.log({ target, indexOfTarget });

        console.log("Dropped an element", location, source);
        const index = source?.element?.id;
        console.log(index);
      },
    });
  };

  private setupDraggable = (el: HTMLLIElement): void => {
    draggable({ element: el });
  };
}
