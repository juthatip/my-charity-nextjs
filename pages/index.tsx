import { useState } from "react";
import { useCharities } from "@/hooks/useCharities";
import { usePayments } from "@/hooks/usePayments";
import useDonation from "@/hooks/useDonation";
import CharityList from "@/components/charityList/charityList";
import DonatePanel from "@/components/donatePanel/donatePanel";
import TotalDonations from "@/components/totalDonations/totalDonations";
import { calculateTotalDonations } from "@/utils/calculateTotalDonations";
import { Container, Heading, SuccessMessage } from "@/styles/common.style";

import { Charity } from "@/types";

const Index: React.FC = () => {
  const { data: charities, isLoading: isLoadingCharities } = useCharities();
  const { data: payments, isLoading: isLoadingPayments } = usePayments();

  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const totalDonations = payments ? calculateTotalDonations(payments) : 0;

  const handleDonate = ({ id, name }: Charity) => {
    setSelectedCharity({ id, name });
  };

  const handleDonateClose = () => {
    setSelectedCharity(null);
  };

  const donationMutation = useDonation();

  const handleDonationSubmit = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  console.log("payments", payments);

  return (
    <Container>
      <Heading>Omise Tamboon React</Heading>

      {isLoadingCharities || isLoadingPayments ? (
        <div>Loading...</div>
      ) : (
        <>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          <TotalDonations total={totalDonations} />
          <CharityList charities={charities || []} onDonate={handleDonate} />
        </>
      )}

      {selectedCharity !== null && (
        <DonatePanel
          charityInfo={selectedCharity}
          onClose={handleDonateClose}
          onSubmit={handleDonationSubmit}
        />
      )}
    </Container>
  );
};

export default Index;
