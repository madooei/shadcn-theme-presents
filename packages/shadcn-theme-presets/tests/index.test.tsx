import { render, screen } from "@testing-library/react";

describe("Hello world test", () => {
  it("renders Button without crashing", () => {
    render(<button>Click me</button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });
});
