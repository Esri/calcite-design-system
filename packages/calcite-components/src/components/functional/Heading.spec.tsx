import { h, VNode } from "@stencil/core";
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

/**
 * simple VNode assertion util to help get rid of newSpecPage usage
 *
 * @param vnode
 * @param expected
 * @param expected.tag
 * @param expected.attrs
 * @param expected.children
 */
function assertVNode(
  vnode: VNode,
  expected: {
    tag: string;
    attrs: Record<string, any>;
    children: (VNode | string)[];
  },
) {
  expect(vnode).toEqual(
    expect.objectContaining({
      $tag$: expected.tag,
      $attrs$: expect.objectContaining(expected.attrs),
      $children$: expected.children.map((child) =>
        typeof child === "string"
          ? expect.objectContaining({ $text$: child })
          : expect.objectContaining(child),
      ),
    }),
  );
}

describe("Heading", () => {
  it("should render", async () => {
    assertVNode(
      <Heading class="test" level={1}>
        My Heading
      </Heading>,
      {
        tag: "h1",
        attrs: { class: "test" },
        children: ["My Heading"],
      },
    );
  });

  it("should render a div", async () => {
    assertVNode(<Heading class="test">My Heading</Heading>, {
      tag: "div",
      attrs: { class: "test" },
      children: ["My Heading"],
    });
  });
});
