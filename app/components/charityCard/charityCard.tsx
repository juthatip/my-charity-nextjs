import React from "react";
import { Charity } from "@/types";
import {
  Card,
  ImageContainer,
  Image,
  Title,
  Button,
} from "./charityCard.style";

interface CharityCardProps {
  charity: Charity;
  onDonate: ({ id, name }: Charity) => void;
}

const CharityCard: React.FC<CharityCardProps> = ({ charity, onDonate }) => (
  <Card>
    <ImageContainer>
      <Image src={charity.image} alt={charity.name} />
    </ImageContainer>
    <Title>{charity.name}</Title>
    <Button onClick={() => onDonate({ id: charity.id, name: charity.name })}>
      Donate
    </Button>
  </Card>
);

export default CharityCard;
