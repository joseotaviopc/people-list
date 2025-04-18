import * as React from "react";

const Support = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M13.5 0h-9C1.8 0 0 1.882 0 4.704v5.645c0 2.822 1.8 4.703 4.5 4.703v2.004c0 .753.801 1.204 1.395.781L9.9 15.052h3.6c2.7 0 4.5-1.881 4.5-4.703V4.704C18 1.882 16.2 0 13.5 0M9 11.45c-.378 0-.675-.32-.675-.706s.297-.706.675-.706.675.32.675.706-.297.705-.675.705m1.134-3.905c-.35.245-.459.405-.459.668v.198c0 .385-.306.705-.675.705s-.675-.32-.675-.705v-.198c0-1.091.765-1.628 1.053-1.835.333-.235.441-.395.441-.64 0-.47-.369-.855-.819-.855s-.819.385-.819.856c0 .385-.306.705-.675.705s-.675-.32-.675-.705c0-1.252.972-2.268 2.17-2.268 1.196 0 2.168 1.016 2.168 2.268 0 1.072-.756 1.608-1.035 1.806"
    ></path>
  </svg>
);

export default Support;
