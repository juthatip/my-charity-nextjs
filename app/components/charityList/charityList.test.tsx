import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharityList from "./charityList";
import "@testing-library/jest-dom";

describe("CharityList Component", () => {
  const mockCharities = [
    { id: 1, name: "Save the Children", image: "/images/charity1.jpg" },
    { id: 2, name: "Red Cross", image: "/images/charity2.jpg" },
  ];

  const mockOnDonate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<CharityList charities={mockCharities} onDonate={mockOnDonate} />);
  });

  test("renders the list of charities correctly", () => {
    mockCharities.forEach((charity) => {
      expect(screen.getByText(charity.name)).toBeInTheDocument();
      expect(screen.getByAltText(charity.name)).toBeInTheDocument();
    });
  });

  test("handles donate button click event for each CharityCard correctly", () => {
    const donateButtons = screen.getAllByText("Donate");

    donateButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(mockOnDonate).toHaveBeenCalledWith({
        id: mockCharities[index].id,
        name: mockCharities[index].name,
      });
    });

    expect(mockOnDonate).toHaveBeenCalledTimes(mockCharities.length);
  });
});
