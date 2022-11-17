import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 16px;
  width: 80%;
  border-radius: 6px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
