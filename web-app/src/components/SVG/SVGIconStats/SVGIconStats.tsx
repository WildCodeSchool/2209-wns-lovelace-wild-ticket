import "./SVGIconStats.scss";

export default function SVGIconStats({
  iconWidth,
  iconFill,
}: {
  iconWidth: string;
  iconFill: string;
}) {
  return (
    <button className="SvgButton">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconWidth}
        viewBox="0 0 512 512"
        className="SvgIcon"
        fill={iconFill}
      >
        <path d="M480 496H48a32 32 0 01-32-32V32a16 16 0 0132 0v432h432a16 16 0 010 32z" />
        <path d="M156 432h-40a36 36 0 01-36-36V244a36 36 0 0136-36h40a36 36 0 0136 36v152a36 36 0 01-36 36zM300 432h-40a36 36 0 01-36-36V196a36 36 0 0136-36h40a36 36 0 0136 36v200a36 36 0 01-36 36zM443.64 432h-40a36 36 0 01-36-36V132a36 36 0 0136-36h40a36 36 0 0136 36v264a36 36 0 01-36 36z" />{" "}
      </svg>
    </button>
  );
}
