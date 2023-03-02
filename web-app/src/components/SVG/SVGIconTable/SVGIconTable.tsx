import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_TABLE } from "../../../pages/paths";
import {
  MAX_ICON_PARAMS_TYPE,
  MIN_ICON_PARAMS_TYPE,
} from "../../../constants/Constants";
import "../SVGIcon.scss";

export default function SVGIconTable({
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
    navigate(DASHBOARD_TABLE);
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
          isMouseOver || location === DASHBOARD_TABLE
            ? iconMaxParams.width
            : iconMinParams.width
        }
        viewBox="0 0 48 48"
        className="SvgIcon"
        fill={
          isMouseOver || location === DASHBOARD_TABLE
            ? iconMaxParams.fill
            : iconMinParams.fill
        }
      >
        <path d="M28.555,39.7,26.445,38.3A1,1,0,0,1,26,37.465V25H22V37.465a1,1,0,0,1-.445.832L19.445,39.7a1,1,0,0,0-.445.832V41a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1v-.465A1,1,0,0,0,28.555,39.7Z" />
        <rect x="9" y="19" width="29" height="4" rx="1" />
        <path d="M25,9.054V8h1a1,1,0,0,0,0-2H22a1,1,0,0,0,0,2h1V9.054A10.019,10.019,0,0,0,14.2,17H33.8A10.019,10.019,0,0,0,25,9.054Zm-2.3,4.087a6.026,6.026,0,0,0-3.462,2.205,1,1,0,0,1-1.588-1.217,8.036,8.036,0,0,1,4.617-2.941,1,1,0,1,1,.433,1.953Z" />
        <path d="M47.5,16.679a1.994,1.994,0,0,0-1.5-.679H44.921A2,2,0,0,0,43,17.481l-2.587,9.662H34.244a2.99,2.99,0,0,0-2.894,2.25L31.065,30.5h0A2,2,0,0,0,33,33h.069l-1.931,7.758a1,1,0,0,0,.73,1.212.961.961,0,0,0,.242.03,1,1,0,0,0,.97-.758L35.127,33H42.3l1.826,8.217A1,1,0,0,0,45.1,42a1.018,1.018,0,0,0,.218-.024,1,1,0,0,0,.76-1.193l-1.764-7.936A3,3,0,0,0,46.375,30.4l1.608-12.132A2.005,2.005,0,0,0,47.5,16.679Z" />
        <path d="M16.58,32.227a1.993,1.993,0,0,0,.357-1.727h0l-.286-1.106a2.988,2.988,0,0,0-2.893-2.25H7.593L5.006,17.481A2,2,0,0,0,3.08,16H1.994A2,2,0,0,0,.018,18.264L1.626,30.4a3,3,0,0,0,2.057,2.451L1.919,40.783a1,1,0,0,0,1.953.434L5.7,33h7.176l2.051,8.242A1,1,0,0,0,15.9,42a.961.961,0,0,0,.242-.03,1,1,0,0,0,.729-1.212L14.935,33h.07A1.981,1.981,0,0,0,16.58,32.227Z" />
      </svg>
    </button>
  );
}
