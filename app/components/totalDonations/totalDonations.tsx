import React from "react";
import { TotalContainer } from "./totalDonations.style";

interface TotalDonationsProps {
  total: number;
}

const TotalDonations: React.FC<TotalDonationsProps> = ({ total }) => {
  return <TotalContainer>Total Donations: {total} THB</TotalContainer>;
};

export default TotalDonations;
