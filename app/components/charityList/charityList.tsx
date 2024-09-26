import React from "react";
import CharityCard from "@/components/charityCard/charityCard";
import { Charity } from "@/types";
import { Container } from "./charityList.style";

interface CharityListProps {
  charities: Charity[];
  onDonate: ({ id, name }: Charity) => void;
}

const CharityList: React.FC<CharityListProps> = ({ charities, onDonate }) => (
  <Container>
    {charities.map((charity) => (
      <CharityCard key={charity.id} charity={charity} onDonate={onDonate} />
    ))}
  </Container>
);

export default CharityList;
