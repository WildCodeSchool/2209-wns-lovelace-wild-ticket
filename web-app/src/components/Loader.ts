import styled from "styled-components";
import { MAIN_THEME_COLOR } from "../styles/style-constants";

export default styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: ${MAIN_THEME_COLOR};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
