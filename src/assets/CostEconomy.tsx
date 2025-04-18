import * as React from "react";

const CostEconomy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="33"
    fill="none"
    viewBox="0 0 21 33"
  >
    <path
      stroke={props.stroke || "#1777CF"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.67"
      d="M10.667 2v29m7.5-24.65H6.917a5.34 5.34 0 0 0-3.713 1.486 5 5 0 0 0-1.537 3.589 5 5 0 0 0 1.537 3.589A5.34 5.34 0 0 0 6.917 16.5h7.5c1.392 0 2.727.535 3.712 1.486a5 5 0 0 1 1.538 3.589 5 5 0 0 1-1.538 3.589 5.34 5.34 0 0 1-3.712 1.486H1.667"
    ></path>
  </svg>
);

export default CostEconomy;
