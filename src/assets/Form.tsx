import * as React from "react";

const Form = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M0 18h12.68v-4.998c0-.18.145-.325.325-.325H18V0H0zM2.917 3.64h12.167a.325.325 0 1 1 0 .649H2.917a.325.325 0 1 1 0-.65m0 3.012h12.167a.325.325 0 1 1 0 .65H2.917a.325.325 0 1 1 0-.65m0 3.012h12.167a.325.325 0 1 1 0 .65H2.917a.324.324 0 1 1 0-.65m0 3.013H9.65a.325.325 0 1 1 0 .649H2.917a.324.324 0 1 1 0-.65"
    ></path>
    <path fill={props.fill || "#7D8592"} d="M17.541 13.326H13.33v4.212z"></path>
  </svg>
);

export default Form;
