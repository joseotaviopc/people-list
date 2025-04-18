import * as React from "react";

const ArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    fill="none"
    viewBox="0 0 18 19"
  >
    <path
      stroke={props.stroke || "#7D8592"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m9 17.5-8-8m0 0 8-8m-8 8h16"
    ></path>
  </svg>
);

export default ArrowLeft;
