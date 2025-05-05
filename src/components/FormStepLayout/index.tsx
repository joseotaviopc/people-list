"use client";

import React, { useState, Suspense } from "react";
import { Tutorial, IconAtividades } from "@/assets";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import LogoImage from "@/assets/Logo.png"
import DesktopSidebar from "./DesktopSidebar";
import ProgressBar from "./ProgressBar";

const FormStep02Content = React.lazy(() => import("../FormStep02/FormStepContent"));
const FormStep03 = React.lazy(() => import("../FormStep03/FormStep03"));
const FormStep04 = React.lazy(() => import("../FormStep04/FormStep04"));
const FormStep05 = React.lazy(() => import("../FormStep05/FormStep05"));
const FormStep06 = React.lazy(() => import("../FormStep06/FormStep06"));
const FormStep07 = React.lazy(() => import("../FormStep07/FormStep07"));

export default function FormStepLayout() {
  const [showSteps, setShowSteps] = useState(false)
  const [activeStep, setActiveStep] = useState(1) // 1 ao 25
  const [completedSteps, setCompletedSteps] = useState(0) // 1 ao 25

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
    setCompletedSteps((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => prev - 1);
    setCompletedSteps((prev) => prev - 1);
  };

  return (
    <main className="flex relative flex-col p-0 sm:p-2.5 items-center bg-blend-normal h-dvh sm:h-auto text-background">
      <div className="fixed inset-0 h-screen overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/7b111fbabf0891ab0a671a7888ec71303d82a0de?placeholderIfAbsent=true"
          alt="Background"
          className="object-cover h-screen w-full"
        />
      </div>
      <article className="flex flex-col sm:flex-row gap-6 px-4 sm:px-6 py-5 sm:py-16 overflow-y-scroll sm:overflow-y-autorelative sm:justify-center h-full min-h-full sm:min-h-fit w-full">

        {/* Mobile Header */}
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
              <DialogTrigger asChild className="z-10" >
                <Button variant="ghost" className="flex-1 bg-background/10 rounded-md gap-2">
                  <Tutorial fill="var(--background)" />
                  Explicação
                </Button>
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
            <Suspense fallback={<div className="flex overflow-y-scroll sm:overflow-auto gap-4 sm:gap-10 z-0 grow flex-col p-5 sm:px-10 sm:pt-6 rounded-xl shadow-lg bg-background/10 w-full sm:max-w-[700px] sm:h-[886px] sm:flex-1 text-grey-light">Carregando...</div>}>
              {activeStep === 1 && <FormStep02Content handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />}
              {activeStep === 2 && <FormStep03 handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} activeStep={activeStep} />}
              {activeStep === 3 && <FormStep04 handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} activeStep={activeStep} />}
              {activeStep === 4 && <FormStep05 handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} activeStep={activeStep} />}
              {activeStep === 5 && <FormStep06 handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} activeStep={activeStep} />}
              {activeStep === 6 && <FormStep07 handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} activeStep={activeStep} />}
              {activeStep === 7 && <h1>Etapa 8</h1>}
              {activeStep === 8 && <h1>Etapa 9</h1>}
              {activeStep === 9 && <h1>Etapa 10</h1>}
              {activeStep === 10 && <h1>Etapa 11</h1>}
              {activeStep === 11 && <h1>Etapa 12</h1>}
              {activeStep === 12 && <h1>Etapa 13</h1>}
              {activeStep === 13 && <h1>Etapa 14</h1>}
              {activeStep === 14 && <h1>Etapa 15</h1>}
              {activeStep === 15 && <h1>Etapa 16</h1>}
              {activeStep === 16 && <h1>Etapa 17</h1>}
              {activeStep === 18 && <h1>Etapa 18</h1>}
              {activeStep === 19 && <h1>Etapa 19</h1>}
              {activeStep === 20 && <h1>Etapa 20</h1>}
              {activeStep === 21 && <h1>Etapa 21</h1>}
              {activeStep === 22 && <h1>Etapa 22</h1>}
              {activeStep === 23 && <h1>Etapa 23</h1>}
              {activeStep === 24 && <h1>Etapa 24</h1>}
              {activeStep === 25 && <h1>Etapa 25</h1>}
            </Suspense>
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
