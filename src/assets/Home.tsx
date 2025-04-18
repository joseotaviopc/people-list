import * as React from "react";

const Home = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      fill={props.fill || "#7D8592"}
      d="M17.698 8.053 9.622.74a.923.923 0 0 0-1.244 0L.302 8.053a.917.917 0 0 0 .622 1.595h1.29v7.326c0 .29.237.526.53.526H7.17c.292 0 .53-.235.53-.526v-4.448h2.6v4.448c0 .29.238.526.53.526h4.427c.292 0 .529-.235.529-.526V9.648h1.29a.917.917 0 0 0 .622-1.595M15.648 1.55h-3.555l4.084 3.69V2.076a.53.53 0 0 0-.53-.526"
    ></path>
  </svg>
);

export default Home;
