import * as React from "react";

const Tutorial = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    fill="none"
    viewBox="0 0 18 16"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M16.87 10.948V5.35l-1.054.351v5.247a1.66 1.66 0 0 0-1.13 1.57v2.825c0 .291.236.527.527.527h2.26a.527.527 0 0 0 .527-.527v-2.824c0-.73-.474-1.35-1.13-1.57M8.5 7.807 3.39 6.103v3.592c0 .14.055.274.154.373A7.67 7.67 0 0 0 9 12.328a7.67 7.67 0 0 0 5.457-2.26.53.53 0 0 0 .154-.373V6.103l-5.11 1.704c-.35.116-.702.1-1.001 0"
    ></path>
    <path
      fill={props.fill || "#7D8592"}
      d="M9 6.833a.5.5 0 0 0 .167-.027l8.473-2.824a.527.527 0 0 0 0-1L9.167.156a.53.53 0 0 0-.334 0L.361 2.98a.527.527 0 0 0 0 1l8.472 2.825q.081.027.167.027"
    ></path>
  </svg>
);

export default Tutorial;
