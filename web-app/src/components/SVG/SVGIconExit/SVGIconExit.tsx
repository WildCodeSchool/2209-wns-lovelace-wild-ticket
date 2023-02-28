import { useState } from "react";
import {
  MAX_ICON_PARAMS_TYPE,
  MIN_ICON_PARAMS_TYPE,
} from "../../../constants/Constants";
import "../SVGIcon.scss";

export default function SVGIconExit({
  iconMaxParams,
  iconMinParams,
  userSignOut,
}: {
  iconMaxParams: MAX_ICON_PARAMS_TYPE;
  iconMinParams: MIN_ICON_PARAMS_TYPE;
  userSignOut: () => Promise<void>;
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const svgOnMouseOver = () => {
    setIsMouseOver(true);
  };

  const svgOnMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <button
      className="SvgButton"
      onMouseOver={svgOnMouseOver}
      onMouseLeave={svgOnMouseLeave}
      onClick={() => {
        userSignOut();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={isMouseOver ? iconMaxParams.width : iconMinParams.width}
        viewBox="0 0 512 512"
        className="SvgIcon"
      >
        <path
          d="M336 376V272H191a16 16 0 010-32h145V136a56.06 56.06 0 00-56-56H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h192a56.06 56.06 0 0056-56zM425.37 272l-52.68 52.69a16 16 0 0022.62 22.62l80-80a16 16 0 000-22.62l-80-80a16 16 0 00-22.62 22.62L425.37 240H336v32z"
          fill={isMouseOver ? iconMaxParams.fill : iconMinParams.fill}
        />
      </svg>
    </button>
  );
}
