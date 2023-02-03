import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_STATS } from "../../../pages/paths";
import {
  MAX_ICON_PARAMS_TYPE,
  MIN_ICON_PARAMS_TYPE,
} from "../../../constants/Constants";
import "../SVGIcon.scss";

export default function SVGIconStats({
  iconMaxParams,
  iconMinParams,
}: {
  iconMaxParams: MAX_ICON_PARAMS_TYPE;
  iconMinParams: MIN_ICON_PARAMS_TYPE;
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const svgOnMouseOver = () => {
    setIsMouseOver(true);
  };

  const svgOnMouseLeave = () => {
    setIsMouseOver(false);
  };

  const goTo = () => {
    navigate(DASHBOARD_STATS);
  };

  return (
    <button
      className="SvgButton"
      onMouseOver={svgOnMouseOver}
      onMouseLeave={svgOnMouseLeave}
      onClick={goTo}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={
          isMouseOver || location === DASHBOARD_STATS
            ? iconMaxParams.width
            : iconMinParams.width
        }
        viewBox="0 0 512 512"
        className="SvgIcon"
        fill={
          isMouseOver || location === DASHBOARD_STATS
            ? iconMaxParams.fill
            : iconMinParams.fill
        }
      >
        <path d="M480 496H48a32 32 0 01-32-32V32a16 16 0 0132 0v432h432a16 16 0 010 32z" />
        <path d="M156 432h-40a36 36 0 01-36-36V244a36 36 0 0136-36h40a36 36 0 0136 36v152a36 36 0 01-36 36zM300 432h-40a36 36 0 01-36-36V196a36 36 0 0136-36h40a36 36 0 0136 36v200a36 36 0 01-36 36zM443.64 432h-40a36 36 0 01-36-36V132a36 36 0 0136-36h40a36 36 0 0136 36v264a36 36 0 01-36 36z" />{" "}
      </svg>
    </button>
  );
}
