import { useState } from "react";
import "../SVGIcon.scss";

export default function SVGIconValid({
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
        fill="#32cd32"
        width={isClickable && isMouseOver ? "35" : "30"}
      >
        <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm-16.79 192.47l51.55-59a16 16 0 0124.1 21.06l-51.55 59a16 16 0 11-24.1-21.06zm-38.86 90.85a16 16 0 01-22.62 0l-47.95-48a16 16 0 1122.64-22.62l48 48a16 16 0 01-.07 22.62zm176.8-128.79l-111.88 128a16 16 0 01-11.51 5.47h-.54a16 16 0 01-11.32-4.69l-47.94-48a16 16 0 1122.64-22.62l29.8 29.83a8 8 0 0011.68-.39l95-108.66a16 16 0 0124.1 21.06z" />
      </svg>
    </button>
  );
}
