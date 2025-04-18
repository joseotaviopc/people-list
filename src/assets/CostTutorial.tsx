import * as React from "react";

const CostTutorial = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="31"
    height="31"
    fill="none"
    viewBox="0 0 31 31"
  >
    <path
      stroke={props.stroke || "#1777CF"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.667"
      d="M1.333 1.5v28h28m-4.666-6.222V10.833m-7.778 12.445V4.61M9.11 23.278V18.61"
    ></path>
  </svg>
);

export default CostTutorial;
