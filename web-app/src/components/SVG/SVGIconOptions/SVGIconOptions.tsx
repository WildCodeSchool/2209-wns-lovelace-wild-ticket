import "./SVGIconOptions.scss";

export default function SVGIconOptions({
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
        <path d="M64 144h226.75a48 48 0 0090.5 0H448a16 16 0 000-32h-66.75a48 48 0 00-90.5 0H64a16 16 0 000 32zM448 368h-66.75a48 48 0 00-90.5 0H64a16 16 0 000 32h226.75a48 48 0 0090.5 0H448a16 16 0 000-32zM448 240H221.25a48 48 0 00-90.5 0H64a16 16 0 000 32h66.75a48 48 0 0090.5 0H448a16 16 0 000-32z" />{" "}
      </svg>
    </button>
  );
}
