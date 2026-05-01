import { mount } from "@arcgis/lumina-compiler/testing";

export interface TestSetup {
  (): ReturnType<typeof mount>;
}
