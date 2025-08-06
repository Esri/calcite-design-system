/**
 * This file is imported in src/runtime.ts
 */
import { isServer } from "lit";
import { initModeChangeEvent } from "./mode";
import { stampVersion } from "./config";

if (!isServer) {
  if (document.readyState === "interactive") {
    initModeChangeEvent();
  } else {
    document.addEventListener("DOMContentLoaded", initModeChangeEvent, { once: true });
  }
}

if (process.env.NODE_ENV !== "test") {
  queueMicrotask(stampVersion);
}
