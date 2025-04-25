"use client";

import { useState } from "react";

import { Tutorial, IconAtividades } from "@/assets";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { WelcomeSection } from "./WelcomeSection";
import { FormDescription } from "./FormDescription";
import LogoImage from "@/assets/Logo.png"
import DesktopSidebar from "./DesktopSidebar";
import ProgressBar from "./ProgressBar";

export default function FormStep02() {
  const [showSteps, setShowSteps] = useState(false)
  const [activeStep, setActiveStep] = useState(9)
  const [completedSteps, setCompletedSteps] = useState(8)
  return (
    <main className="flex relative flex-col p-2.5 items-center bg-blend-normal h-dvh sm:h-auto text-background">
      <div className="fixed inset-0 h-screen overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/7b111fbabf0891ab0a671a7888ec71303d82a0de?placeholderIfAbsent=true"
          alt="Background"
          className="object-cover h-screen w-full"
        />
      </div>
      <article className="flex flex-col sm:flex-row gap-6 px-6 py-5 sm:py-16 overflow-y-scroll sm:overflow-y-autorelative sm:justify-center h-full min-h-full sm:min-h-fit w-full">

        {/* Desktop Header */}
        <header className="flex flex-col z-10 sm:hidden w-full">
          <div className="w-full flex items-center justify-center h-[70px] bg-background rounded-md mb-2.5">
            <img src={LogoImage} alt="Logo" height={43} width={75} />
          </div>
          <Dialog>
            <DialogContent className="aspect-video w-full bg-black/90 rounded-2xl border border-gray-800 text-grey-light">
              <iframe
                src="https://www.youtube.com/embed/q3lX2p_Uy9I?rel=0&enablejsapi=1&fs=1"
                style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0 }}
                allowFullScreen
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              >
              </iframe>
              {/* <div style={{ left: 0, width: '100%', height: 0, position: 'relative', paddingBottom: '56.25%' }}>
              </div> */}
            </DialogContent>
            <div className="w-full flex gap-4 justify-between items-center">
              <DialogTrigger className="z-10">
                <Button variant="ghost" className="flex-1 bg-background/10 rounded-md gap-2"><Tutorial fill="var(--background)" />Explicação</Button>
              </DialogTrigger>
              <Button variant="ghost" className="flex-1 bg-background/10 rounded-md" onClick={() => setShowSteps(true)}>
                <IconAtividades fill="var(--background)" />Todas Etapas
              </Button>
            </div>
          </Dialog>
        </header>

        {/* CONTENT */}
        {!showSteps && (
          <>
            <div className="flex overflow-y-scroll sm:overflow-auto gap-10 z-0 flex-col p-5 sm:px-10 sm:pt-6 rounded-xl shadow-lg bg-background/10 w-full sm:max-w-[700px] sm:h-auto sm:flex-1">
              <WelcomeSection />
              <FormDescription />
              <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-end">
                <Button className="rounded-md h-9 px-2">Próximo</Button>
              </div>
            </div>
            {/* Mobile footer*/}
            <footer className="w-full sm:hidden flex z-10 gap-4 justify-between items-center">
              <Button variant="ghost" className="flex-1 bg-grey-light text-grey-dark rounded-md h-9 px-2">Anterior</Button>
              <Button variant="ghost" className="flex-1 bg-background/10 rounded-md text-grey-light h-9 px-2">Etapa 01/25</Button>
              <Button className="flex-1 rounded-md h-9 px-2">Próximo</Button>
            </footer>
          </>
        )}

        {/* Desktop sidebar*/}
        <DesktopSidebar activeStep={activeStep} setShowSteps={setShowSteps} setActiveStep={setActiveStep} completedSteps={completedSteps} />

        {/* Mobile Progress */}
        {showSteps && <ProgressBar activeStep={activeStep} setShowSteps={setShowSteps} setActiveStep={setActiveStep} completedSteps={completedSteps} />}
      </article>
    </main>
  );
}
