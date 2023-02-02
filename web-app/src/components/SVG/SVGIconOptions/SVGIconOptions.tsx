import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_OPTIONS } from "../../../pages/paths";
import { MAX_ICON_PARAMS_TYPE, MIN_ICON_PARAMS_TYPE } from "../../utils";
import '../SVGIcon.scss';

export default function SVGIconOptions({
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
    navigate(DASHBOARD_OPTIONS);
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
          isMouseOver || location === DASHBOARD_OPTIONS
            ? iconMaxParams.width
            : iconMinParams.width
        }
        viewBox="0 0 512 512"
        className="SvgIcon"
        fill={
          isMouseOver || location === DASHBOARD_OPTIONS
            ? iconMaxParams.fill
            : iconMinParams.fill
        }
      >
        <path d="M64 144h226.75a48 48 0 0090.5 0H448a16 16 0 000-32h-66.75a48 48 0 00-90.5 0H64a16 16 0 000 32zM448 368h-66.75a48 48 0 00-90.5 0H64a16 16 0 000 32h226.75a48 48 0 0090.5 0H448a16 16 0 000-32zM448 240H221.25a48 48 0 00-90.5 0H64a16 16 0 000 32h66.75a48 48 0 0090.5 0H448a16 16 0 000-32z" />{" "}
      </svg>
    </button>
  );
}
