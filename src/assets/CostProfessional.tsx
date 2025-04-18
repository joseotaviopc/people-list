import * as React from "react";

const CostProfessional = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="29"
    fill="none"
    viewBox="0 0 32 29"
  >
    <path
      stroke={props.stroke || "#1777CF"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.67"
      d="M21.8 27.5v-2.889a5.77 5.77 0 0 0-1.699-4.085A5.8 5.8 0 0 0 16 18.833H7.3a5.8 5.8 0 0 0-4.101 1.693A5.77 5.77 0 0 0 1.5 24.61V27.5m29 0v-2.889a5.76 5.76 0 0 0-1.216-3.535 5.8 5.8 0 0 0-3.134-2.055M21.8 1.688a5.8 5.8 0 0 1 3.143 2.054 5.764 5.764 0 0 1 0 7.086 5.8 5.8 0 0 1-3.143 2.054m-4.35-5.604c0 3.19-2.597 5.778-5.8 5.778s-5.8-2.587-5.8-5.778S8.447 1.5 11.65 1.5s5.8 2.587 5.8 5.778"
    ></path>
  </svg>
);

export default CostProfessional;
