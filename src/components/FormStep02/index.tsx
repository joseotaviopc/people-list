"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Tutorial, Logo, IconAtividades, EscadaIcon, StepsIcon } from "@/assets";
import { Button } from "../ui/button";

import { WelcomeSection } from "./WelcomeSection";
import { FormDescription } from "./FormDescription";


function Progress({ setShowSteps, activeStep }: { setShowSteps: (showSteps: boolean) => void, activeStep: number }) {
  return (
    <>
      {/* STEPS */}
      <div className="flex flex-1 flex-col items-center justify-end w-full cursor-pointer gap-4">
        <X className="w-6 h-6 self-end sm:hidden" onClick={() => setShowSteps(false)} />
        <div className="flex flex-1 flex-col overflow-y-scroll gap-5 z-0 p-5 rounded-xl shadow-lg bg-background/10 w-full">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-center gap-6 border-b border-grey-light pb-2">
              <span className="flex gap-2 items-center text-background font-medium"><EscadaIcon /> Etapas (25)</span>
              <StepsIcon />
            </div>
            <span className="text-background text-sm font-normal text-center">Último Carregamento 20/04/2025 - 14:30</span>
          </div>
          <div className="grid grid-cols-6 gap-y-3">
            {Array.from({ length: 25 }).map((_, index) => (
              <div key={index} className="flex flex-col justify-between items-center w-[35px] h-[49px]">
                <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md ${index + 1 <= activeStep ? 'bg-primary' : 'bg-background/10'}`}>
                  <span className="flex gap-2 items-center text-background font-medium">{index + 1}</span>
                </div>
                {index + 1 <= activeStep && (
                  <span className="w-full h-[5px] rounded-xs bg-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="flex overflow-y-scroll gap-4 z-0 p-5 rounded-xl shadow-lg bg-background/10 w-full">
        <div
          className="w-[41px] h-[41px] flex items-center justify-center rounded-full bg-background"
        >
          <div
            className="w-[42px] h-[42px] flex items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--primary) ${(activeStep / 25) * 360}deg, transparent 0)`
            }}
          >
            <div className="w-[35px] h-[35px] bg-[#403a33] rounded-full flex items-center justify-center ">
              <div className="w-[25px] h-[25px] bg-primary flex items-center justify-center p-1.5 rounded-full">
                <IconAtividades fill="var(--background)" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-primary font-semibold">{(activeStep / 25) * 100}%</span>
            <span className="text-grey-light text-sm">{activeStep < 10 ? `0${activeStep}` : activeStep} / 25</span>
          </div>
          <div className="flex w-full h-[5px] bg-background/10 rounded-md">
            <div
              className="h-full bg-primary rounded-md transition-all duration-300"
              style={{ width: `${(activeStep / 25) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default function FormStep02() {
  const [showSteps, setShowSteps] = useState(false)
  const [activeStep, setActiveStep] = useState(9)
  return (
    // VERSAO MOBILE
    <main className="flex relative flex-col gap-2.5  items-center bg-blend-normal h-dvh text-background">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/7b111fbabf0891ab0a671a7888ec71303d82a0de?placeholderIfAbsent=true"
        alt="Background"
        className="object-cover absolute inset-0 size-full"
      />
      <article className="flex flex-col gap-6 px-6 py-5 overflow-y-scroll relative items-center h-full w-full">

        <header className="sm:hidden w-full">
          <div className="w-full flex items-center justify-center h-[70px] bg-background rounded-md mb-2.5">
            <Logo />
          </div>
          <div className="w-full flex gap-4 justify-between items-center">
            <Button variant="ghost" className="flex-1 bg-background/10 rounded-md gap-2"><Tutorial fill="var(--background)" />Explicação</Button>
            <Button variant="ghost" className="flex-1 bg-background/10 rounded-md" onClick={() => setShowSteps(true)}>
              <IconAtividades fill="var(--background)" />Todas Etapas
            </Button>
          </div>
        </header>

        {/* <div className="flex absolute bottom-0 -right-px z-0 shrink-0 rounded-2xl bg-black/10  h-[880px] min-w-60 w-[703px] max-md:max-w-full" /> */}

        {/* CONTENT */}
        {!showSteps && (
          <>
            <>
              <div className="flex overflow-y-scroll gap-10 z-0 flex-col p-5 rounded-xl shadow-lg bg-background/10 w-full">
                <WelcomeSection />
                <FormDescription />
              </div>
              <footer className="w-full flex gap-4 justify-between items-center">
                <Button variant="ghost" className="flex-1 bg-grey-light text-grey-dark rounded-md h-9 px-2">Anterior</Button>
                <Button variant="ghost" className="flex-1 bg-background/10 rounded-md text-grey-light h-9 px-2">Etapa 01/25</Button>
                <Button className="flex-1 rounded-md h-9 px-2">Próximo</Button>
              </footer>
            </>
            <div className="hidden sm:flex flex-col">
              <Progress activeStep={activeStep} setShowSteps={setShowSteps} />
            </div>
          </>
        )}

        {/* STEPS PAGE */}
        {showSteps && <Progress activeStep={activeStep} setShowSteps={setShowSteps} />}
      </article>

      {/* <section className="flex relative flex-wrap gap-7 px-6 py-5 self-stretch my-auto md:w-[1049px]">
      </section> */}
      {/* <SidePanel /> */}
    </main>
  );
}
