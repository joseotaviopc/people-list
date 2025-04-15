"use client";

import * as React from "react";


interface SidebarProps {
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export function Sidebar({ setHideMenu }: SidebarProps) {
  return (
    <aside className="flex flex-col justify-center self-stretch px-6 py-5 h-full bg-zinc-50 min-w-60 w-[261px] max-md:px-5">
      <div className="flex flex-col flex-1 justify-center h-full w-full">
        <div className="flex flex-col justify-center items-center py-2.5 w-full">
          <hr className="flex max-w-full min-h-px w-[211px]" />
        </div>
        <header className="flex justify-between items-center w-full">
          <div className="flex flex-1 shrink self-stretch my-auto w-full basis-0">
            <div className="flex justify-center items-center px-1.5 pt-1 pb-1.5 my-auto bg-zinc-50 w-[38px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/e2e7a7cdfef3c984eb0a651a7ef29d8742fbee12?placeholderIfAbsent=true"
                className="object-contain self-stretch my-auto w-7 aspect-[0.82]"
                alt="Logo"
              />
            </div>
            <div className="flex flex-col items-center text-xl font-bold leading-none text-rose-700 whitespace-nowrap">
              <h1 className="self-stretch px-2.5 py-0.5 bg-zinc-50">FORMS</h1>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/7d376f83446c5e59ca73b6e945c4951436f0b48f?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto aspect-square min-h-[18px] w-[18px]"
            alt="Menu"
            onClick={() => setHideMenu(prev => !prev)}
          />
        </header>
        <div className="flex flex-col justify-center py-6 w-full">
          <hr className="flex w-full bg-slate-200 min-h-px" />
        </div>
        <div className="flex gap-4 items-center w-full font-semibold">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/503e23ac3e5a186ef866273ab99d258949b1792a?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[50px]"
            alt="Profile"
          />
          <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0">
            <h2 className="text-base text-zinc-400">Linkon Henrique</h2>
            <p className="mt-1.5 text-sm text-gray-700">Gestor</p>
          </div>
        </div>
        <nav className="flex flex-col gap-0 mt-6">
          {[
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/e6b702d58c0d721dfc902c0686257db7e6f584ca?placeholderIfAbsent=true",
              text: "Dashboard",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/2ca32e42c1dd065c194d96e0adff6e5fa50268d0?placeholderIfAbsent=true",
              text: "Tipos de Bens",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/f07aab36f67bdf3ca4fc0d88efe5e12ea2768db6?placeholderIfAbsent=true",
              text: "Pessoas envolvidas",
              active: true,
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/154f741de5856f5f6255a6ddcffed24bf1202f75?placeholderIfAbsent=true",
              text: "Formulários",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/5c5c9a2f60b320fae3452b4f79b7b9a1b8957288?placeholderIfAbsent=true",
              text: "Leads",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/662953f0865b25aa3f3e9c311eac55ff7d92a38d?placeholderIfAbsent=true",
              text: "Colaboradores",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/15b7af35912e0cd5086fcbeb3958ddb747abef4a?placeholderIfAbsent=true",
              text: "Contratantes",
            },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex gap-4 items-center px-3 w-full rounded-xl min-h-[50px] ${
                item.active ? "bg-zinc-50 text-sky-600" : "text-zinc-400"
              }`}
            >
              <img
                src={item.icon}
                className={`object-contain self-stretch my-auto aspect-square w-[18px] ${
                  item.active ? "fill-sky-600" : "fill-slate-500"
                }`}
                alt={item.text}
              />
              <span className="self-stretch my-auto text-base font-medium">
                {item.text}
              </span>
            </button>
          ))}
        </nav>
        <div className="flex-1 self-stretch w-full min-h-[187px] h-full" />
        
        <div className="flex gap-1 justify-center items-center self-center p-1 rounded-2xl bg-zinc-100">
          <button className="flex gap-2 justify-center items-center self-stretch my-auto rounded-2xl shadow-sm bg-zinc-50 min-h-8 w-[100px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/da80df5280510d1ec0c0229b3544ee6c0b780e29?placeholderIfAbsent=true"
              className="object-contain aspect-square fill-sky-600 w-[18px]"
              alt="Light theme"
            />
            <span className="self-stretch my-auto text-base font-medium text-gray-700">
              Claro
            </span>
          </button>
          <button className="flex gap-2 justify-center items-center self-stretch my-auto rounded-2xl min-h-8 w-[100px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/9b6431b09f51c8e607694be5c6121ef3dcc5f0a9?placeholderIfAbsent=true"
              className="object-contain aspect-square fill-slate-500 w-[18px]"
              alt="Dark theme"
            />
            <span className="self-stretch my-auto text-base font-medium text-zinc-400">
              Escuro
            </span>
          </button>
        </div>

        <div className="flex flex-col justify-center items-center py-2.5 w-full">
          <hr className="flex max-w-full bg-slate-200 min-h-px w-[211px]" />
        </div>
        <nav className="flex flex-col gap-0">
          {[
            { text: "Tutorial" },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/efbb4712a6a27c0f837c96a64d4e642121535c65?placeholderIfAbsent=true",
              text: "Novidades",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/2c55c41ad8b94f4f2b0c12faa484a084778e2234?placeholderIfAbsent=true",
              text: "Suporte",
            },
          ].map((item, index) => (
            <button
              key={index}
              className="flex gap-4 items-center px-3 w-full text-base font-medium whitespace-nowrap rounded-xl min-h-[50px] text-zinc-400"
            >
              {item.icon && (
                <img
                  src={item.icon}
                  className="object-contain aspect-square fill-slate-500 w-[18px]"
                  alt={item.text}
                />
              )}
              <span className="self-stretch my-auto">{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
