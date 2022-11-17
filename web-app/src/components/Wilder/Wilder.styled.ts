import styled, { css } from "styled-components";

import { BORDER_COLOR, MAIN_THEME_COLOR } from "../../styles/style-constants";
import { baseTitleStyles, Paragraph } from "../../styles/base-styles";

export const Card = styled.article`
  position: relative;
  width: 200px;
  padding: 20px;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 7px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
`;

export const CardImage = styled.img`
  border-radius: 7px 7px 0 0;
  margin-bottom: 20px;
  max-width: 100%;
  height: auto;
`;

export const CardTitle = styled.h3`
  ${baseTitleStyles}
  color: ${MAIN_THEME_COLOR};
  font-size: 20px;
`;

export const CardSecondaryTitle = styled.h4`
  color: ${MAIN_THEME_COLOR};
  font-size: 15px;
`;

const cardPropertiesStyled = css`
  color: #757575;
  line-height: 1.5;
`;

export const CardParagraph = styled(Paragraph)`
  ${cardPropertiesStyled}
`;

export const CardSkillList = styled.ul`
  ${cardPropertiesStyled}
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  & li {
    margin: 4px 0;
    display: flex;
    justify-content: space-around;
    border: #f76c6c 1px solid;
    border-radius: 4px;
    padding: 2px;
  }
`;
