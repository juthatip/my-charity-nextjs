import styled from "styled-components";
import { Close, CheckmarkCircle } from "@styled-icons/ionicons-solid";

export const PanelBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PanelContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

export const OptionGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
`;

export const Label = styled.label`
  margin: 0 8px;
`;

export const RadioButton = styled.input`
  margin-right: 4px;
`;

export const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #005bb5;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const ButtonClose = styled(Close)`
  color: #868686;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;

  &:hover {
    color: #989898;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const IconSuccess = styled(CheckmarkCircle)`
  color: #00aa00;
  width: 32px;
`;
