import styled from "styled-components";
import { BORDER_COLOR } from "../../styles/style-constants";

export const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 20px;
  padding: 4px;
  background-color: initial;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${BORDER_COLOR};
  }
`;
