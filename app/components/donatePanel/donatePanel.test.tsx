import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DonatePanel from "./donatePanel";
import useDonation from "@/hooks/useDonation";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useDonation");

describe("DonatePanel Component", () => {
  const mockCharityInfo = {
    id: 1,
    name: "Save the Children",
    image: "/images/charity1.jpg",
  };

  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  let mutate: jest.Mock;

  beforeEach(() => {
    mutate = jest.fn().mockImplementation(({ charityId, amount }) => {
      return Promise.resolve({ charityId, amount });
    });
    (useDonation as jest.Mock).mockReturnValue({
      mutate,
      isSuccess: false,
    });

    render(
      <DonatePanel
        charityInfo={mockCharityInfo}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );
    jest.clearAllMocks();
  });

  test("renders the component with initial props", () => {
    expect(screen.getByText("Select the amount to donate")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCharityInfo.name} (THB)`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("close-button")).toBeInTheDocument();
    expect(screen.getByText("Pay")).toBeInTheDocument();

    const amountOptions = [10, 20, 50, 100, 500];
    amountOptions.forEach((amount) => {
      expect(screen.getByLabelText(amount.toString())).toBeInTheDocument();
    });
  });

  test("selects a donation amount and submit it successfully", async () => {
    const amountOption = screen.getByText("50");
    fireEvent.click(amountOption);

    fireEvent.click(screen.getByText("Pay"));
    await waitFor(() =>
      expect(mutate).toHaveBeenCalledWith({
        charityId: mockCharityInfo.id,
        amount: 50,
      })
    );

    setTimeout(() => {
      expect(mockOnClose).toHaveBeenCalled();
    }, 1000);
  });

  test("handles the close button click", () => {
    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
