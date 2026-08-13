import Header from "../src/components/header";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/preact";

describe("Initial Test of the Header", () => {
  test("Header renders 3 nav items", () => {
    const context = render(<Header />);
    expect(context.getByText("Preact CLI")).toBeDefined()
    expect(context.getAllByRole("link")).toHaveLength(4);
  });
});
