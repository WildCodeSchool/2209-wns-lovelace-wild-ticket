import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_HOME } from "../../../pages/paths";
import {
  MAX_ICON_PARAMS_TYPE,
  MIN_ICON_PARAMS_TYPE,
} from "../../../constants/Constants";
import "../SVGIcon.scss";
import { AppContext } from "../../../context/AppContext";

export default function SVGIconHome({
  iconMaxParams,
  iconMinParams,
}: {
  iconMaxParams: MAX_ICON_PARAMS_TYPE;
  iconMinParams: MIN_ICON_PARAMS_TYPE;
}) {
  const appContext = useContext(AppContext);
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
    appContext?.setSeats(null);
    navigate(DASHBOARD_HOME);
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
          isMouseOver || location === DASHBOARD_HOME
            ? iconMaxParams.width
            : iconMinParams.width
        }
        viewBox="0 0 512 512"
        className="SvgIcon"
        fill={
          isMouseOver || location === DASHBOARD_HOME
            ? iconMaxParams.fill
            : iconMinParams.fill
        }
      >
        <path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z" />
        <path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z" />
      </svg>
    </button>
  );
}
