import * as React from "react";

const Search = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    fill="none"
    viewBox="0 0 19 19"
  >
    <path
      fill={props.fill || "#7D8592"}
      fillRule="evenodd"
      d="M8.5 0a8.5 8.5 0 1 0 5.257 15.18l.403.394 3.133 3.133.094.083a1 1 0 0 0 1.32-1.497l-3.14-3.141-.395-.385A8.5 8.5 0 0 0 8.5 0m0 2a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Search;
