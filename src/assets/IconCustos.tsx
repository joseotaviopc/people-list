import * as React from "react";

const IconCustos = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M10.332 1.314a1.314 1.314 0 1 1-2.628 0 1.314 1.314 0 0 1 2.628 0"
    ></path>
    <path
      fill={props.fill || "#7D8592"}
      fillRule="evenodd"
      d="M9.018 2.628h-2.25a4.47 4.47 0 0 0-4.239 3.06h-.081a2.448 2.448 0 0 0 0 4.896h.058a4.47 4.47 0 0 0 4.262 3.132h4.5a4.47 4.47 0 0 0 4.262-3.132h.022a2.448 2.448 0 0 0 0-4.896h-.045a4.47 4.47 0 0 0-4.239-3.06zm4.363 5.22a1.671 1.671 0 1 1-3.343 0 1.671 1.671 0 0 1 3.343 0M6.279 9.519a1.671 1.671 0 1 0 0-3.342 1.671 1.671 0 0 0 0 3.342"
      clipRule="evenodd"
    ></path>
    <path
      fill={props.fill || "#7D8592"}
      d="M3.237 18a6.5 6.5 0 0 1 5.781-3.528A6.5 6.5 0 0 1 14.799 18z"
    ></path>
  </svg>
);

export default IconCustos;
