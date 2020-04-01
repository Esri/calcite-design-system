import { EventEmitter } from "@stencil/core";

export interface DateChangeEmitter extends EventEmitter {
  detail: Date;
}

export interface DateChangeEvent extends CustomEvent {
  detail: Date;
}