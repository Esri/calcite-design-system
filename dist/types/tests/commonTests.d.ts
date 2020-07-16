import { JSX } from "../components";
export declare const HYDRATED_ATTR: string;
declare type CalciteComponentTag = keyof JSX.IntrinsicElements;
declare type ComponentHTML = string;
declare type TagOrHTML = CalciteComponentTag | ComponentHTML;
export declare function accessible(componentTagOrHTML: TagOrHTML): Promise<void>;
export declare function renders(componentTagOrHTML: TagOrHTML, invisible?: true): Promise<void>;
export declare function reflects(componentTagOrHTML: TagOrHTML, propsToTest: {
    propertyName: string;
    value: any;
}[]): Promise<void>;
export declare function defaults(componentTagOrHTML: TagOrHTML, propsToTest: {
    propertyName: string;
    defaultValue: any;
}[]): Promise<void>;
export declare function hidden(componentTagOrHTML: TagOrHTML): Promise<void>;
export {};
