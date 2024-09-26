import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 8px;
  }
`;
