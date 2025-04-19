export function FormsList() {
  const formItems = [
    { number: "01", name: "Pré-Diagnostico", count: 10 },
    { number: "02", name: "Croqui de viabilidade", count: 10 },
    { number: "03", name: "Croqui de viabilidade", count: 10 },
    { number: "04", name: "Pré-Diagnostico", count: 10 },
    { number: "05", name: "Croqui de viabilidade", count: 10 },
    { number: "06", name: "Croqui de viabilidade", count: 10 },
    { number: "07", name: "Pré-Diagnostico", count: 10 },
    { number: "08", name: "Croqui de viabilidade", count: 10 },
    { number: "09", name: "Croqui de viabilidade", count: 10 },
    { number: "04", name: "Pré-Diagnostico", count: 10 },
    { number: "05", name: "Croqui de viabilidade", count: 10 },
    { number: "06", name: "Croqui de viabilidade", count: 10 },
    { number: "07", name: "Pré-Diagnostico", count: 10 },
    { number: "08", name: "Croqui de viabilidade", count: 10 },
    { number: "09", name: "Croqui de viabilidade", count: 10 },
    { number: "09", name: "Croqui de viabilidade", count: 10 },
  ];

  return (
    <section className="px-1 border-[16px] py-8 mt-6 w-full rounded-2xl shadow bg-background border-background max-h-80  overflow-y-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {formItems.map((item, index) => (
          <article
            key={index}
            className="my-auto basis-0  w-full pr-8 border-b"
          >
            <div className="flex overflow-hidden  items-center px-1.5 ">
              <div className="flex gap-2.5 items-center my-auto min-h-[65px]  ">
                <div className="flex gap-2.5 justify-center items-center my-auto text-base font-medium text-center whitespace-nowrap text-slate-500">
                  <span className="my-auto min-w-[21px]">
                    {item.number}
                  </span>
                  <div className="shrink-0 self-stretch my-auto w-0 border border-solid bg-slate-200 bg-opacity-50 border-slate-200 border-opacity-50 h-[43px]" />
                </div>
                <div className="flex flex-col justify-center self-stretch my-auto">
                  <h3 className="text-base text-ellipsis whitespace-nowrap font-medium text-gray-700">
                    {item.name}
                  </h3>
                  <p className="gap-2 self-start mt-1 text-sm min-h-5 text-zinc-400">
                    {item.count} Formulários
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
