import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
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
    expect(
      <Heading class="test" level={1}>
        My Heading
      </Heading>,
    ).toEqual(
      expect.objectContaining({
        values: [
          undefined,
          {
            _$litType$: 1,
            strings: expect.arrayContaining(["<h1 class=", ">", "</h1>"]),
            values: ["test", "My Heading"],
          },
        ],
      }),
    );
  });

  it("should render a div", async () => {
    expect(<Heading class="test">My Heading</Heading>).toEqual(
      expect.objectContaining({
        values: [
          undefined,
          {
            _$litType$: 1,
            strings: expect.arrayContaining(["<div class=", ">", "</div>"]),
            values: ["test", "My Heading"],
          },
        ],
      }),
    );
  });
});
