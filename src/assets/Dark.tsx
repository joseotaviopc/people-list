import * as React from "react";

const Dark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="18"
    fill="none"
    viewBox="0 0 19 18"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M18.75 9.755A7.014 7.014 0 0 1 8.995 0a9.017 9.017 0 1 0 9.755 9.755"
    ></path>
  </svg>
);

export default Dark;
