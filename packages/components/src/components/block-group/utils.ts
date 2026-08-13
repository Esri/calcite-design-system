import { Block } from "../block/block";

export function updateBlockChildren(blockChildren: Block["el"][]): void {
  blockChildren.forEach((block) => {
    block.setPosition = blockChildren.indexOf(block) + 1;
    block.setSize = blockChildren.length;
  });
}
