import React, { useState } from "react";
import useDonation from "@/hooks/useDonation";
import { Charity } from "@/types";
import {
  PanelBackground,
  PanelContent,
  ButtonClose,
  OptionGroup,
  Label,
  RadioButton,
  Button,
  IconSuccess,
} from "./donatePanel.style";

interface DonatePanelProps {
  charityInfo: Charity;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const DonatePanel: React.FC<DonatePanelProps> = ({
  charityInfo,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<number | null>(null);

  const donationMutation = useDonation(() => {
    if (onSubmit) {
      onSubmit("Thank you for your donation!");
    }
  });

  const handleSubmit = () => {
    if (amount !== null) {
      donationMutation.mutate({ charityId: charityInfo.id, amount });
      setTimeout(() => onClose(), 1000);
    }
  };

  const paymentAmounts = [10, 20, 50, 100, 500];

  return (
    <PanelBackground>
      <PanelContent>
        <h2>Select the amount to donate </h2>
        <h3>{charityInfo.name} (THB)</h3>
        <ButtonClose onClick={onClose} data-testid="close-button">
          Close
        </ButtonClose>
        <OptionGroup>
          {paymentAmounts.map((amount, index) => (
            <Label key={index}>
              <RadioButton
                type="radio"
                name="payment"
                onClick={() => setAmount(amount)}
              />
              {amount}
            </Label>
          ))}
        </OptionGroup>
        {donationMutation.isSuccess && <IconSuccess />}
        <Button onClick={handleSubmit}>Pay</Button>
      </PanelContent>
    </PanelBackground>
  );
};

export default DonatePanel;
