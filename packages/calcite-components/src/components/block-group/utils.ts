import { Block } from "../block/block";
import { blockSelector } from "./resources";

export function updateBlockChildren(slotEl: HTMLSlotElement): void {
  const blockChildren = slotEl
    .assignedElements({ flatten: true })
    .filter((el): el is Block["el"] => el.matches(blockSelector));

  blockChildren.forEach((block) => {
    block.setPosition = blockChildren.indexOf(block) + 1;
    block.setSize = blockChildren.length;
  });
}
