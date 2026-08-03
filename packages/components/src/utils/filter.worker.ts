/// <reference lib="webworker" />

import { getFilteredIndexes } from "./filter";

type FilterWorkerRequest = {
  requestId: number;
  data: object[];
  value: string;
  filterProps?: string[];
};

type FilterWorkerResponse = {
  requestId: number;
  filteredIndexes: number[];
};

self.addEventListener("message", (event: MessageEvent<FilterWorkerRequest>) => {
  const { requestId, data, value, filterProps } = event.data;
  const filteredIndexes = getFilteredIndexes(data, value, filterProps);

  self.postMessage({
    requestId,
    filteredIndexes,
  } satisfies FilterWorkerResponse);
});
