import { ExpandableTokenTypes } from "../tokenStudio/designTokenTypes";
import { SingleGenericToken } from "./genericToken";

export enum TokenBreakpointContext {
  MIN = "min",
  MAX = "max",
}

export type TokenBreakpointContextUnion = `${TokenBreakpointContext}`;
export type TokenBreakpointContexts = TokenBreakpointContextUnion[];

export type TokenBreakpointContextValue = {
  min?: string;
  max?: string;
};

export type SingleBreakpointContextToken<Named extends boolean = true, P = unknown> = SingleGenericToken<
  ExpandableTokenTypes.BREAKPOINT,
  TokenBreakpointContextValue | string,
  Named,
  P
>;

export type BreakpointContextObject = { [Key in TokenBreakpointContext]: string };
