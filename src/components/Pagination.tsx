"use client";

import * as React from "react";

export const Pagination: React.FC = () => {
  return (
    <nav className="flex flex-col justify-center items-end mt-4 w-full max-md:max-w-full">
      <div className="flex gap-0 justify-center items-center">
        <button className="flex justify-center items-center self-stretch my-auto rounded-md bg-zinc-50 w-[34px]">
          <div className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-3 py-1.5 my-auto w-[34px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/3ab615182261f73f054b837c6ed3a8f38c1754ac?placeholderIfAbsent=true"
              className="object-contain self-stretch my-auto w-1.5 aspect-[5/3] fill-gray-700"
              alt="Previous"
            />
          </div>
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`flex justify-center items-center self-stretch my-auto text-xs font-medium text-center whitespace-nowrap ${
              page === 1
                ? "bg-sky-600 text-zinc-50"
                : "bg-zinc-50 text-gray-700"
            } w-[30px]`}
          >
            <div className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-3 py-1.5 my-auto w-[30px]">
              {page}
            </div>
          </button>
        ))}
        <button className="flex justify-center items-center self-stretch my-auto text-sm font-medium text-center text-gray-700 whitespace-nowrap bg-zinc-50 w-9">
          <div className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-3 py-1.5 my-auto w-9">
            ...
          </div>
        </button>
        <button className="flex justify-center items-center self-stretch my-auto text-sm font-medium text-center text-gray-700 whitespace-nowrap bg-zinc-50 w-[42px]">
          <div className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-3 py-1.5 my-auto w-[42px]">
            25
          </div>
        </button>
        <button className="flex justify-center items-center self-stretch my-auto rounded-none bg-zinc-50 w-[34px]">
          <div className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-3 py-1.5 my-auto w-[34px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/ef2384b863e51354bc89285c83bfbc18daacca08?placeholderIfAbsent=true"
              className="object-contain self-stretch my-auto w-1.5 aspect-[5/3] fill-gray-700"
              alt="Next"
            />
          </div>
        </button>
      </div>
    </nav>
  );
};
