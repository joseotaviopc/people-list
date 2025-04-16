import * as React from "react";

export const BrandSection: React.FC = () => {
  return (
    <section className="flex gap-2.5 items-center self-stretch px-24 py-16 my-auto bg-primary rounded-3xl min-w-60 w-lg max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0 min-w-60 max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <header className="flex flex-wrap w-full max-md:max-w-full">
            <div className="flex justify-center items-center px-1.5 pt-1 pb-1.5 my-auto w-11 rounded-sm bg-background">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/dde7ab215a713297f483c8b04ae2728ba54ebfb4?placeholderIfAbsent=true"
                alt="Forms Logo"
                className="object-contain self-stretch my-auto aspect-[0.81] w-[34px]"
              />
            </div>
            <div className="text-2xl font-semibold text-center text-chart-1 whitespace-nowrap w-[90px]">
              <div className="overflow-hidden self-stretch p-0.5 rounded-none bg-background w-[90px]">
                FORMS
              </div>
            </div>
          </header>
          <div className="mt-5 w-full max-w-[508px] text-background max-md:max-w-full">
            <h1 className="gap-2.5 self-stretch w-full text-4xl font-bold max-md:max-w-full">
              Transforme informações em dados:
            </h1>
            <p className="gap-2.5 self-stretch mt-2.5 w-full text-3xl max-md:max-w-full">
              Métricas que aceleram sua operação e resultados.
            </p>
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/f260f0519d2b17de982c323ada6e558c60f303cd?placeholderIfAbsent=true"
          alt="Dashboard visualization"
          className="object-contain mt-16 w-full bg-blend-normal aspect-[1.34] max-md:mt-10 max-md:max-w-full"
        />
      </div>
    </section>
  );
};
