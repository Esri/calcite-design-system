/** @public */
declare module "csstype" {
  interface Properties {
    [index: `--calcite-${string}`]: any;
  }
}
