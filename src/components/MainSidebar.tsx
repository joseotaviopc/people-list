"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dashboard, PersonList, News, Support, Tutorial, Light, Dark } from "@/assets";
import IconAgendas from "@/assets/IconAgendas";
import IconAtividades from "@/assets/IconAtividades";
import IconClients from "@/assets/IconClients";
import IconForms from "@/assets/IconForms";
import IconCustos from "@/assets/IconCustos";
import IconVendas from "@/assets/IconVendas";
import IconHonorarios from "@/assets/IconHonorarios";
import IconProdutos from "@/assets/IconProdutos";

interface MainSidebarProps {
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>
  hideMenu: boolean
}

const menuItems = [
  {
    icon: (color: string) => <Dashboard fill={color} />,
    text: "Dashboard",
    active: false
  },
  {
    icon: (color: string) => <IconProdutos fill={color} />,
    text: "Produtos",
    active: false
  },
  {
    icon: (color: string) => <IconAtividades fill={color} />,
    text: "Atividades",
    active: false
  },
  {
    icon: (color: string) => <PersonList fill={color} />,
    text: "Colaboradores",
    active: false
  },
  {
    icon: (color: string) => <IconAgendas fill={color} />,
    text: "Agendas",
    active: false
  },
  {
    icon: (color: string) => <IconHonorarios fill={color} />,
    text: "Honorários",
    active: false
  },
  {
    icon: (color: string) => <IconClients fill={color} />,
    text: "Clientes",
    active: false
  },
  {
    icon: () => <IconForms />,
    text: "Formulários",
    active: false
  },
  {
    icon: (color: string) => <IconCustos fill={color} />,
    text: "Custos IA",
    active: false
  },
  {
    icon: () => <IconVendas />,
    text: "Vendas",
    active: false
  }
]

const subMenuItems = [
  {
    text: "Tutorial",
    icon: (color: string) => <Tutorial fill={color} />,
    active: false
  },
  {
    icon: (color: string) => <News fill={color} />,
    text: "Novidades",
    active: false
  },
  {
    icon: (color: string) => <Support fill={color} />,
    text: "Suporte",
    active: false
  },
]

function Separator({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col justify-center py-6 w-full ${className ? ` ${className}` : ""}`}>
      <hr className="flex w-full bg-slate-200 min-h-px" />
    </div>
  )
}

export function MainSidebar({ setHideMenu, hideMenu }: MainSidebarProps) {
  const [menuItemsData, setMenuItemsData] = useState(menuItems)
  const [subMenuItemsData, setSubMenuItemsData] = useState(subMenuItems)
  const [, setActiveItem] = useState<string | null>(null)
  const [, setActiveSubItem] = useState<string | null>(null)

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    setActiveSubItem(null)
    setSubMenuItemsData(subMenuItems)
    setActiveItem(item.text)
    setMenuItemsData(prev => prev.map(menuItem => ({
      ...menuItem,
      active: menuItem.text === item.text
    })))
  }

  const handleSubMenuItemClick = (item: typeof subMenuItems[0]) => {
    setActiveItem(null)
    setMenuItemsData(menuItems)
    setActiveSubItem(item.text)
    setSubMenuItemsData(prev => prev.map(subMenuItem => ({
      ...subMenuItem,
      active: subMenuItem.text === item.text
    })))
  }

  if (!hideMenu) {
    return (
      <aside className="flex flex-col justify-center self-stretch px-6 py-10 h-full bg-background min-w-60 w-[261px] max-md:px-5 transition-transform duration-500">
        <div className="flex flex-col flex-1  h-full w-full">
          <header className="flex justify-between items-center w-full">
            <div className="flex flex-1 shrink self-stretch my-auto w-full basis-0">
              <div className="flex justify-center items-center px-1.5 pt-1 pb-1.5 my-auto bg-zinc-50 w-[38px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/e2e7a7cdfef3c984eb0a651a7ef29d8742fbee12?placeholderIfAbsent=true"
                  className="object-contain self-stretch my-auto w-7 aspect-[0.82]"
                  alt="Logo"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-xl font-bold leading-none text-grey-light whitespace-nowrap">
                <h1 className="self-stretch px-2.5 py-0.5 bg-zinc-50">EXECUTOR</h1>
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/7d376f83446c5e59ca73b6e945c4951436f0b48f?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto aspect-square min-h-[18px] w-[18px]"
              alt="Menu"
              onClick={() => setHideMenu(prev => !prev)}
            />
          </header>
          <Separator />
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
          <Separator />

          {/* Navigation Icons */}
          <nav className="flex flex-col gap-0 mt-0">
            {menuItemsData.map((item, index) => (
              <Button
                variant="ghost"
                key={index}
                className={`flex items-center justify-start px-2 rounded-md gap-4 py-2.5 h-[50px] min-w-52 cursor-pointer ${item.active ? 'border border-primary' : ''}`}
                onClick={() => handleMenuItemClick(item)}
              >
                <span className="w-5 h-5 flex items-center justify-center">{item.icon(item.active ? 'var(--primary)' : 'var(--muted-foreground)')}</span>
                <span className={`text-base font-medium text-grey-light ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>{item.text}</span>
              </Button>
            ))}
          </nav>
          <div className="flex-1 self-stretch w-full max-h-[62px] h-full" />

          <div className="flex gap-1 justify-center items-center self-center p-1 rounded-2xl bg-zinc-100">
            <button className="flex gap-2 justify-center items-center self-stretch my-auto rounded-2xl shadow-sm bg-zinc-50 min-h-8 w-[100px]">
              <Light />
              <span className="self-stretch my-auto text-base font-medium text-gray-700">
                Claro
              </span>
            </button>
            <button className="flex gap-2 justify-center items-center self-stretch my-auto rounded-2xl min-h-8 w-[100px]">
              <Dark />
              <span className="self-stretch my-auto text-base font-medium text-zinc-400">
                Escuro
              </span>
            </button>
          </div>
          <Separator />

          {/* Bottom Navigation Icons */}
          <nav className="flex flex-col gap-0">
            {subMenuItemsData.map((item, index) => (
              <Button
                variant="ghost"
                key={index}
                className={`flex items-center justify-start px-2 rounded-md gap-4 py-2.5 h-[50px] min-w-52 cursor-pointer ${item.active ? 'border border-primary' : ''}`}
                onClick={() => handleSubMenuItemClick(item)}
              >
                <span className="w-5 h-5 flex items-center justify-center">{item.icon(item.active ? 'var(--primary)' : 'var(--muted-foreground)')}</span>
                <span className={`text-base font-medium self-stretch my-auto ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>{item.text}</span>
              </Button>
            ))}
          </nav>
        </div>
      </aside>
    )
  };

  return (
    <nav className="flex flex-col justify-center items-center self-stretch py-5 bg-zinc-50 w-[84px] h-auto transition-transform duration-500">
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
        <Separator className="px-4 " />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/9cd0169e5a816d4cd9905d30153b5cbe58a19905?placeholderIfAbsent=true"
          className="object-contain w-6 aspect-square"
        />
        <Separator className="px-4 " />

        {/* Navigation Icons */}
        {menuItemsData.map((item, index) => (
          <Button
            variant="ghost"
            key={index}
            className={`flex items-center justify-center px-2 rounded-md gap-4 py-2.5 h-12 w-12 cursor-pointer ${item.active ? 'border border-primary' : ''}`}
            onClick={() => handleMenuItemClick(item)}
          >
            <span className="w-5 h-5 flex items-center justify-center">{item.icon(item.active ? 'var(--primary)' : 'var(--muted-foreground)')}</span>
          </Button>
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
        <Separator className="px-4 " />

        {/* Bottom Navigation Icons */}
        {subMenuItemsData.map((item, index) => (
          <Button
            variant="ghost"
            key={index}
            className={`flex items-center justify-center px-2 rounded-md gap-4 py-2.5 h-12 w-12 cursor-pointer ${item.active ? 'border border-primary' : ''}`}
            onClick={() => handleSubMenuItemClick(item)}
          >
            <span className="w-5 h-5 flex items-center justify-center">{item.icon(item.active ? 'var(--primary)' : 'var(--muted-foreground)')}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};
