import * as React from "react";

const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke={props.stroke || "#7D8592"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m9 17 8-8m0 0L9 1m8 8H1"
    ></path>
  </svg>
);

export default ArrowRight;
