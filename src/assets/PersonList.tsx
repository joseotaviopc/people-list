import * as React from "react";

const PersonList = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    fill="none"
    viewBox="0 0 18 16"
  >
    <path
      fill={props.fill || "#7D8592"}
      fillRule="evenodd"
      d="M0 14.667v-.571c0-.571.408-1.236.912-1.487l4.63-2.302c.672-.333.828-1.073.344-1.658l-.296-.357C4.988 7.565 4.5 6.208 4.5 5.258V3.833c0-.884.345-1.732.959-2.357A3.24 3.24 0 0 1 7.773.5c.868 0 1.7.351 2.314.976s.959 1.473.959 2.357v1.425c0 .95-.491 2.311-1.09 3.035l-.296.357c-.482.582-.332 1.323.343 1.658l4.631 2.302c.503.25.912.91.912 1.486v.57a.84.84 0 0 1-.24.59.8.8 0 0 1-.579.244H.818a.8.8 0 0 1-.578-.244.84.84 0 0 1-.24-.59m15.546-4.584H18v1.25h-2.454zm-1.637-2.5H18v1.25h-4.09zm-1.636-2.5H18v1.25h-5.727z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default PersonList;
