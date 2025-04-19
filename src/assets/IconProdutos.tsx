import * as React from "react";

const IconProdutos = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    fill="none"
    viewBox="0 0 18 16"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M.663 3.354A2.29 2.29 0 0 0 0 5v8.667q0 .958.663 1.646Q1.325 16 2.25 16h.643V2.667H2.25q-.924 0-1.587.687M12.857 1a.98.98 0 0 0-.281-.708.91.91 0 0 0-.683-.292H6.107a.91.91 0 0 0-.683.292.98.98 0 0 0-.281.708v1.667H3.857V16h10.286V2.667h-1.286zm-1.285 1.667H6.429V1.333h5.143zM17.337 3.354q-.663-.687-1.587-.687h-.643V16h.643q.924 0 1.587-.687A2.29 2.29 0 0 0 18 13.667V5q0-.958-.663-1.646"
    ></path>
  </svg>
);

export default IconProdutos;
