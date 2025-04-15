"use client";

import * as React from "react";

const navigationIcons = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/e6b702d58c0d721dfc902c0686257db7e6f584ca?placeholderIfAbsent=true",
    alt: "Dashboard",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/bddb2c0cd28d2272483a5089b9cdae08d19e2f81?placeholderIfAbsent=true",
    alt: "Types",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/620faa813b459fd367fcf9b39376f923b2bb9d8a?placeholderIfAbsent=true",
    alt: "People",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/4fe3e1741be9cc0f22ba099469ef830c02dc9166?placeholderIfAbsent=true",
    alt: "Forms",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/03c55f5300decfca701599390966866caf6d93b0?placeholderIfAbsent=true",
    alt: "Settings",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/9eb2aebeb6bfd6650146b9de2ac53e7b750bc804?placeholderIfAbsent=true",
    alt: "Reports",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/72c0b8412968295534f796e7a91b2477643812ab?placeholderIfAbsent=true",
    alt: "Analytics",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/fa65c6000028dfd73c629a1116c0d1a7c891913b?placeholderIfAbsent=true",
    alt: "Profile",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/b8281432a7f6ca0faad073ddc6fa655ad55d6fee?placeholderIfAbsent=true",
    alt: "Messages",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/84a369397f923496d17bcff168e56f8999db6a2d?placeholderIfAbsent=true",
    alt: "Support",
  },
]

const bottomNavigationIcons = [
  { src: "", alt: "Tutorial" },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/d4d68d68a7bea6888390f10a7c0f77c12799c020?placeholderIfAbsent=true",
    alt: "News",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/877c6d5409168c02409ac3cf6142f85565575cf1?placeholderIfAbsent=true",
    alt: "Help",
  },
] 

interface CollapsedSidebarProps {
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export function CollapsedSidebar({ setHideMenu }: CollapsedSidebarProps) {
  return (
    <nav className="flex flex-col justify-center items-center self-stretch py-5 bg-zinc-50 w-[84px] h-auto">
      <div className="flex flex-col flex-1 justify-center items-center w-12 ">
        <button className="flex gap-2 justify-center items-center px-4 w-full rounded-xl min-h-12 rotate-[3.141592653589793rad]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/853ce39978187e5eeb7bf3077d76698f9e972730?placeholderIfAbsent=true"
            className="object-contain rotate-180 self-stretch my-auto aspect-square min-h-[18px] w-[18px]"
            onClick={() => setHideMenu(prev => !prev)}
          />
        </button>
        <button className="flex gap-2 justify-center items-center px-4 w-full rounded-xl min-h-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/4cbedd3a3c1d8b582bb46be2b616581536a86f9f?placeholderIfAbsent=true"
            className="object-contain self-stretch my-auto aspect-[0.82] w-[18px]"
          />
        </button>
        <div className="flex flex-col justify-center items-center self-stretch py-5 w-full">
          <hr className="flex bg-slate-200 min-h-px w-[18px]" />
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/9cd0169e5a816d4cd9905d30153b5cbe58a19905?placeholderIfAbsent=true"
          className="object-contain w-6 aspect-square"
        />
        <div className="flex flex-col justify-center items-center self-stretch py-5 w-full">
          <hr className="flex bg-slate-200 min-h-px w-[18px]" />
        </div>
        {/* Navigation Icons */}
        {navigationIcons.map((icon, index) => (
          <button
            key={index}
            className="flex gap-2 justify-center items-center px-4 w-full rounded-xl min-h-12"
          >
            <img
              src={icon.src}
              className="object-contain self-stretch my-auto aspect-square w-[18px]"
              alt={icon.alt}
            />
          </button>
        ))}
        <div className="flex-1 self-stretch w-full">
          <div className="flex flex-1 w-full min-h-[62px]" />
        </div>
        <button className="flex justify-center items-center w-full h-12 rounded-xl aspect-[1/1] bg-zinc-100 min-h-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/0802a6ccfdb46c7ac6d0a1d47e00960b6d010bce?placeholderIfAbsent=true"
            className="object-contain aspect-square w-[18px] fill-sky-600"
          />
        </button>
        <div className="flex flex-col justify-center items-center self-stretch pt-2 pb-2.5 w-full">
          <hr className="flex min-h-px w-[18px]" />
        </div>
        {/* Bottom Navigation Icons */}
        {bottomNavigationIcons.map((icon, index) => (
          <button
            key={index}
            className="flex gap-2 justify-center items-center px-4 w-full rounded-xl min-h-12"
          >
            {icon.src && (
              <img
                src={icon.src}
                className="object-contain w-full aspect-square fill-slate-500"
                alt={icon.alt}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
