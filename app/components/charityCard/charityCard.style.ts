import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  border-bottom: 1px solid #ddd;
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Title = styled.h3`
  margin: 16px 0;
`;

export const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
`;
