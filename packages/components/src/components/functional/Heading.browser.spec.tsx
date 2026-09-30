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
    const result = (
      <Heading class="test" level={1}>
        My Heading
      </Heading>
    ) as unknown as { values: unknown[] };

    const template = result.values[1] as { strings: string[]; values: unknown[] };

    expect(template.strings).toEqual(
      expect.arrayContaining(["<h1 class=", " .hidden=", ">", "</h1>"]),
    );
    expect(template.values[0]).toBe("test");
    expect(template.values[1]).toBe(false);
    expect(template.values[template.values.length - 1]).toBe("My Heading");
  });

  it("should render a div", async () => {
    const result = (<Heading class="test">My Heading</Heading>) as unknown as { values: unknown[] };

    const template = result.values[1] as { strings: string[]; values: unknown[] };

    expect(template.strings).toEqual(
      expect.arrayContaining(["<div class=", " .hidden=", ">", "</div>"]),
    );
    expect(template.values[0]).toBe("test");
    expect(template.values[1]).toBe(false);
    expect(template.values[template.values.length - 1]).toBe("My Heading");
  });
});
