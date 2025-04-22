export function VideoSection() {
  return (
    <section className="flex overflow-hidden relative z-0 flex-col justify-center items-center mt-4 w-full rounded-xl aspect-[1.428] min-h-[194px]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/0e5470fcf75779c15005e05c3bf4c8f0230f96a0?placeholderIfAbsent=true"
        alt="Video background"
        className="object-cover absolute inset-0 size-full"
      />
      <button className="flex relative flex-col justify-center items-center w-[71px]">
        <div className="flex overflow-hidden gap-2.5 justify-center items-center py-3.5 pr-6 pl-6 w-full bg-sky-600 rounded-xl aspect-[71/50] min-h-[50px] max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/9f3c69b7106077dee918c3f5c21b2f6783b5ae40?placeholderIfAbsent=true"
            alt="Play button"
            className="object-contain self-stretch my-auto aspect-[1/1] fill-zinc-50 w-[22px]"
          />
        </div>
      </button>
    </section>
  );
}
