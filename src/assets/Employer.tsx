import * as React from "react";

const Employer = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M8.984 11.672H9a4.58 4.58 0 0 0 3.25-1.343 4.58 4.58 0 0 0 1.355-3.263V0H7.643a3.25 3.25 0 0 0-3.248 3.248v3.774c0 2.555 2.058 4.641 4.589 4.65"
    ></path>
    <path
      fill={props.fill || "#7D8592"}
      d="M16.568 12.625a4.9 4.9 0 0 0-3.462-1.455l-.202-.001-.151.134A5.64 5.64 0 0 1 9 12.727h-.02a5.63 5.63 0 0 1-3.715-1.424l-.15-.133h-.2A4.935 4.935 0 0 0 0 16.098V18h18v-1.902c0-1.31-.509-2.544-1.432-3.473"
    ></path>
  </svg>
);

export default Employer;
