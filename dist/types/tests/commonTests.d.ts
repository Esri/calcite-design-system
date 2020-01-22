import { JSX } from "../components";
declare type CalciteComponentTag = keyof JSX.IntrinsicElements;
declare type ComponentHTML = string;
declare type TagOrHTML = CalciteComponentTag | ComponentHTML;
export interface SetUpPageOptions {
    withPeerDependencies: boolean;
}
export declare function renders(componentTag: CalciteComponentTag): Promise<void>;
export declare function reflects(componentTag: CalciteComponentTag, propsToTest: {
    propertyName: string;
    value: any;
}[]): Promise<void>;
export declare function defaults(componentTag: CalciteComponentTag, propsToTest: {
    propertyName: string;
    defaultValue: any;
}[]): Promise<void>;
export declare function hidden(componentTag: CalciteComponentTag): Promise<void>;
export declare function accessible(componentTagOrHTML: TagOrHTML): Promise<void>;
export {};
