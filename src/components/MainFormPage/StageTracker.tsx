export function StageTracker() {
  return (
    <section className="flex z-0 flex-col flex-1 p-5 mt-4 w-full rounded-xl bg-white bg-opacity-0 border-white border-opacity-20 max-w-[277px]">
      <header className="flex items-center w-full">
        <div className="flex items-center self-stretch px-8 my-auto max-md:px-5">
          <hr className="self-stretch my-auto w-0 min-h-6" />
        </div>
        <div className="flex gap-2.5 self-stretch h-full">
          <div className="flex flex-col justify-center items-center w-[17px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/ecb4708f67ba525e42322df1687c23e5e0467cc9?placeholderIfAbsent=true"
              alt="Stage icon"
              className="object-contain aspect-[17/14] fill-zinc-50 w-[17px]"
            />
          </div>
          <h2 className="gap-2.5 self-stretch my-auto text-base font-medium text-ellipsis text-foreground">
            Etapas (25)
          </h2>
        </div>
        <div className="flex items-center self-stretch px-3.5 my-auto">
          <hr className="self-stretch my-auto w-0 min-h-6" />
        </div>
        <div className="flex gap-2.5 items-center self-stretch my-auto w-[26px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/45a79d539ce443d4052efcf552b6a5432f76e457?placeholderIfAbsent=true"
            alt="Stage illustration"
            className="object-contain self-stretch my-auto aspect-square w-[26px]"
          />
        </div>
      </header>
      <div className="self-center px-0.5 pt-2.5 pb-4 w-full">
        <hr className="w-full min-h-0 border border-solid bg-zinc-100 border-zinc-100" />
      </div>
      <div className="flex flex-col justify-center w-full text-sm font-medium text-center text-foreground">
        <p className="flex-1 shrink gap-2.5 self-stretch px-0.5 w-full basis-0 text-ellipsis">
          Último Carregamento
        </p>
        <p className="flex-1 shrink gap-2.5 self-stretch px-0.5 w-full basis-0 text-ellipsis">
          06/04/25 - 11:32:53
        </p>
      </div>
      <div className="flex flex-col justify-center self-center px-0.5 py-2.5 w-full">
        <hr className="w-full min-h-0 bg-zinc-100" />
      </div>
      <StageGrid />
    </section>
  );
}

function StageGrid() {
  const stages = Array.from({ length: 20 }, (_, i) => i + 1);
  const rows = Array.from({ length: 4 }, (_, i) =>
    stages.slice(i * 5, (i + 1) * 5),
  );

  return (
    <div className="overflow-hidden w-full min-h-[234px]">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 items-center w-full mt-2.5 first:mt-0"
        >
          {row.map((num) => (
            <div
              key={num}
              className="flex flex-col justify-center self-stretch my-auto min-h-[51px] w-[35px]"
            >
              <div
                className={`self-stretch px-2 text-base font-medium whitespace-nowrap rounded-lg h-[35px] min-h-[35px] text-background w-[35px] ${
                  num === 1 ? "bg-sky-600" : "bg-black bg-opacity-40"
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
              <div className="flex flex-col flex-1 justify-center w-full">
                <hr className="w-full min-h-0" />
              </div>
              {num === 1 && (
                <div className="flex flex-col justify-center pr-px pl-0.5 w-full min-h-[11px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/4bb7e690f7c0b195a9656b2b4ffe8cd34dd8f6e1?placeholderIfAbsent=true"
                    alt="Current stage indicator"
                    className="object-contain w-8 aspect-[6.41] stroke-[5px] stroke-sky-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
