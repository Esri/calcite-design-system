import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { constrainHeadingLevel, Heading } from "./Heading";

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

describe("Heading", () => {
  it("should render", async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <Heading class="test" level={1}>
          My Heading
        </Heading>
      ),
    });

    expect(page.root).toEqualHtml(`<h1 class="test">My Heading</h1>`);
  });

  it("should render a div", async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <Heading class="test">My Heading</Heading>,
    });

    expect(page.root).toEqualHtml(`<div class="test">My Heading</div>`);
  });
});
