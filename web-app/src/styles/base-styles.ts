import styled, { css } from "styled-components";
import { APP_FUNCTIONAL_WIDTH } from "./style-constants";

export const baseTitleStyles = css`
  margin: 0 0 0.35em;
`;

export const baseContainerStyles = css`
  max-width: ${APP_FUNCTIONAL_WIDTH};
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
`;

export const Paragraph = styled.p`
  margin: 0 0 1.15em;
`;

export const SectionTitle = styled.h2`
  ${baseTitleStyles}
  font-size: 28px;
`;
