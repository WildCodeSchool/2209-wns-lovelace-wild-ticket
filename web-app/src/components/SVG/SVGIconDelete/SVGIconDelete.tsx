import { useState } from "react";
import "../SVGIcon.scss";

export default function SVGIconDelete({
  onClick,
  isClickable,
}: {
  onClick: () => void;
  isClickable: boolean;
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
      className="SvgTabButton"
      onMouseOver={svgOnMouseOver}
      onMouseLeave={svgOnMouseLeave}
      onClick={onClick}
      disabled={isClickable ? false : true}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="#be0000"
        width={isClickable && isMouseOver ? "30" : "25"}
      >
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z" />
      </svg>
    </button>
  );
}
