export function ProgressBar() {
  return (
    <div className="flex z-0 gap-4 px-4 pt-4 pb-5 mt-4 w-full rounded-xl bg-white bg-opacity-0">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/a63ecf1d9b328ecf6b6afcbad9f298b245701771?placeholderIfAbsent=true"
        alt="Progress icon"
        className="object-contain shrink-0 aspect-[0.83] w-[35px]"
      />
      <div className="flex-1 shrink my-auto basis-0">
        <div className="flex gap-2.5 w-full">
          <div className="gap-2.5 h-full text-base font-semibold text-sky-500 whitespace-nowrap">
            04%
          </div>
          <div className="flex-1 shrink gap-2.5 self-stretch pt-2.5 pr-1.5 h-full text-sm text-right basis-0 text-foreground">
            01 / 25
          </div>
        </div>
        <div className="flex flex-col justify-center items-start mt-2.5 w-full bg-zinc-100 min-h-[5px] rounded-[40px]">
          <div className="flex flex-1 bg-sky-500 min-h-[5px] rounded-[40px] w-[35px]" />
        </div>
      </div>
    </div>
  );
}
