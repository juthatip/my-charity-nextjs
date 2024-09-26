import React from "react";
import { render, screen } from "@testing-library/react";
import TotalDonations from "./totalDonations";
import "@testing-library/jest-dom";

describe("TotalDonations Component", () => {
  test("renders total correctly", () => {
    const totalAmount = 1000;

    render(<TotalDonations total={totalAmount} />);

    const totalElement = screen.getByText(
      `Total Donations: ${totalAmount} THB`
    );
    expect(totalElement).toBeInTheDocument();
  });

  test("format the total correctly with zero value", () => {
    const totalAmount = 0;

    render(<TotalDonations total={totalAmount} />);

    const totalElement = screen.getByText(
      `Total Donations: ${totalAmount} THB`
    );
    expect(totalElement).toBeInTheDocument();
  });
});
