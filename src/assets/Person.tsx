import * as React from "react";

const Person = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="18"
    fill="none"
    viewBox="0 0 16 18"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M8 0C5.239 0 3 2.015 3 4.5S5.239 9 8 9s5-2.015 5-4.5S10.761 0 8 0M5 10.8c-1.326 0-2.598.474-3.536 1.318C.527 12.962 0 14.107 0 15.3V18h16v-2.7c0-1.194-.527-2.338-1.464-3.182-.938-.844-2.21-1.318-3.536-1.318z"
    ></path>
  </svg>
);

export default Person;
