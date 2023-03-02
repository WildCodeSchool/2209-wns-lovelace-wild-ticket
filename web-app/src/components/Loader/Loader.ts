import styled from "styled-components";

export default styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: "#F76C6C";
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
