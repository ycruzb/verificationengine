import { render, screen } from "@testing-library/react";
import React from "react";
import Check from "./Check";
import "@testing-library/jest-dom";

/* beforeEach(() => {
  render(<Check status="none" disabled={false} setStatus={() => {}} />);
}); */

describe("Testing Check Component", () => {
  test("The component renders Yes and No", () => {
    render(<Check status="none" disabled={false} setStatus={() => {}} />);

    const yesText = screen.queryByText("Yes");
    expect(yesText).toBeInTheDocument();
    const NoText = screen.queryByText("No");
    expect(NoText).toBeInTheDocument();
  });
});
