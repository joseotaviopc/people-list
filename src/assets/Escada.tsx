import * as React from "react";

const EscadaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="14"
    fill="none"
    viewBox="0 0 17 14"
  >
    <path
      fill={props.fill || "#FCFCFC"}
      fillRule="evenodd"
      d="M15.206 0v2.486H6.48V.095c0-.053.04-.095.09-.095zM13.586 2.879v2.485H4.86V2.973c0-.052.04-.094.09-.094zM11.965 5.757v2.486H3.241V5.852c0-.052.04-.095.09-.095zM10.345 8.636v2.485H1.62v-2.39c0-.053.04-.095.09-.095zM8.725 11.514V14H0v-2.391c0-.052.04-.095.09-.095z"
      clipRule="evenodd"
    ></path>
    <path
      fill={props.fill || "#FCFCFC"}
      fillRule="evenodd"
      d="M17 0v14H9.098v-2.486h1.434a.19.19 0 0 0 .187-.196V8.636h1.433a.19.19 0 0 0 .187-.197V5.757h1.433a.19.19 0 0 0 .187-.196V2.879h1.434a.19.19 0 0 0 .186-.197V0z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default EscadaIcon;
