import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CharityCard from "./charityCard";

describe("CharityCard", () => {
  const mockCharity = {
    id: 1,
    name: "Test Charity",
    image: "http://test.com/image.jpg",
  };

  const mockOnDonate = jest.fn();

  beforeEach(() => {
    render(<CharityCard charity={mockCharity} onDonate={mockOnDonate} />);
  });

  test("renders the charity name", () => {
    expect(screen.getByText(mockCharity.name)).toBeInTheDocument();
  });

  test("renders the charity image", () => {
    const image = screen.getByAltText(mockCharity.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockCharity.image);
  });

  test("handles the donate button click event", () => {
    const donateButton = screen.getAllByText("Donate");

    fireEvent.click(donateButton[0]);

    expect(mockOnDonate).toHaveBeenCalledWith({
      id: mockCharity.id,
      name: mockCharity.name,
    });
  });
});
