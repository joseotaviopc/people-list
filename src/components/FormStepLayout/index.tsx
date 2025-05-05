"use client";

import { useState } from "react";

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
import FormStep02Content from "../FormStep02/FormStepContent";
import FormStep03 from "../FormStep03/FormStep03";
import FormStep04 from "../FormStep04/FormStep04";
import FormStep05 from "../FormStep05/FormStep05";
import FormStep06 from "../FormStep06/FormStep06";
import FormStep07 from "../FormStep07/FormStep07";

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
            <>
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
            </>

            {/* Mobile footer*/}
            {/* <footer className="w-full sm:hidden flex z-10 gap-4 justify-between items-center">
              <Button variant={activeStep === 1 ? 'ghost' : 'default'} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 1 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 1 ? undefined : handlePreviousStep}>Anterior</Button>
              <Button variant="ghost" className="flex-1 bg-background/10 rounded-md text-grey-light h-9 px-2">Etapa {activeStep < 10 ? `0${activeStep}` : activeStep}/25</Button>
              <Button variant={activeStep === 25 ? 'ghost' : 'default'} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 25 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 25 ? undefined : handleNextStep}>Próximo</Button>
            </footer> */}
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
