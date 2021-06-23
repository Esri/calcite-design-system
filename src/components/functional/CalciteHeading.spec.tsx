import { h, Component } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { CalciteHeading, constrainHeadingLevel } from "./CalciteHeading";

describe("constrainHeadingLevel", () => {
  it("should constrain heading levels", () => {
    expect(constrainHeadingLevel(10)).toEqual(6);
    expect(constrainHeadingLevel(6)).toEqual(6);
    expect(constrainHeadingLevel(5)).toEqual(5);
    expect(constrainHeadingLevel(1)).toEqual(1);
    expect(constrainHeadingLevel(0)).toEqual(1);
    expect(constrainHeadingLevel(3.14)).toEqual(4);
  });
});

@Component({ tag: "dummy-component" })
class Dummy {}

describe("CalciteHeading", () => {
  it("should render", async () => {
    const page = await newSpecPage({
      components: [Dummy], // Required so we are feeding it a Dummy component
      template: () => (
        <CalciteHeading class="test" level={1}>
          My Heading
        </CalciteHeading>
      )
    });

    expect(page.root).toEqualHtml(`<h1 class="test">My Heading</h1>`);
  });
});
