/**
 * Calculates the maximum number of items that can fit within a container.
 *
 * @param params - The parameters for the calculation.
 * @param params.bufferSize - The buffer size to subtract from the container size (default is 0).
 * @param params.containerSize - The total size of the container.
 * @param params.itemSizes - An array of sizes for each item.
 * @returns The maximum number of items that can fit within the container.
 */
export const calculateMaxItems = ({
  bufferSize = 0,
  containerSize,
  itemSizes,
}: {
  bufferSize?: number;
  containerSize: number;
  itemSizes: number[];
}): number => {
  const maxSize = containerSize - bufferSize;
  let breakpoint = itemSizes.length; // assume all items will fit
  let sizeSum = 0;
  for (const [index, size] of itemSizes.entries()) {
    sizeSum = sizeSum + size;

    if (sizeSum > maxSize) {
      breakpoint = index;
      break;
    } else {
      continue;
    }
  }

  return breakpoint;
};

/**
 * Calculates the number of items that overflow a container.
 *
 * @param params - The parameters for the calculation.
 * @param params.bufferSize - The buffer size to subtract from the container size (default is 0).
 * @param params.containerSize - The total size of the container.
 * @param params.itemSizes - An array of sizes for each item.
 * @returns The number of items that overflow the container.
 */
export const getOverflowCount = ({
  bufferSize = 0,
  containerSize,
  itemSizes,
}: {
  bufferSize?: number;
  containerSize: number;
  itemSizes: number[];
}): number => {
  return Math.max(itemSizes.length - calculateMaxItems({ bufferSize, itemSizes, containerSize }), 0);
};
