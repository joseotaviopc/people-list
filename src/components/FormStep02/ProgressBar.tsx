import { EscadaIcon, IconAtividades, StepsIcon } from "@/assets";
import { X } from "lucide-react";

interface ProgressBarProps  { 
  setShowSteps: (showSteps: boolean) => void, 
  activeStep: number, 
  setActiveStep: (activeStep: number) => void, 
  completedSteps: number
}

export default function ProgressBar({ setShowSteps, activeStep, setActiveStep, completedSteps }: ProgressBarProps) {
  return (
    <>
      {/* STEPS */}
      <div className="flex flex-col items-center justify-end w-full h-fit cursor-pointer gap-4">
        <X className="w-6 h-6 self-end z-10 sm:hidden" onClick={() => setShowSteps(false)} />
        <div className="flex flex-col overflow-y-scroll sm:overflow-auto gap-5 z-0 p-5 rounded-xl shadow-lg bg-background/10 w-full h-fit">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-center gap-6 border-b border-grey-light pb-2">
              <span className="flex gap-2 items-center text-background font-medium"><EscadaIcon /> Etapas (25)</span>
              <StepsIcon />
            </div>
            <span className="text-background text-sm font-normal text-center">Último Carregamento 20/04/2025 - 14:30</span>
          </div>
          <div className="grid grid-cols-6 gap-y-3">
            {Array.from({ length: 25 }).map((_, index) => (
              <div key={index} onClick={() => setActiveStep(index + 1)} className="flex flex-col justify-between items-center w-[35px] h-[49px]">
                <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md ${index + 1 <= completedSteps ? 'bg-primary' : 'bg-background/10'}`}>
                  <span className="flex gap-2 items-center text-background font-medium">{index + 1}</span>
                </div>
                {index + 1 === activeStep && (
                  <span className="w-full h-[5px] rounded-xs bg-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="flex  gap-4 z-0 p-5 rounded-xl shadow-lg bg-background/10 w-full h-fit">
        <div
          className="w-[41px] h-[41px] flex items-center justify-center rounded-full bg-background"
        >
          <div
            className="w-[42px] h-[42px] flex items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--primary) ${(completedSteps / 25) * 360}deg, transparent 0)`
            }}
          >
            <div className="w-[35px] h-[35px] bg-[#403a33] rounded-full flex items-center justify-center ">
              <div className="w-[25px] h-[25px] bg-primary flex items-center justify-center p-1.5 rounded-full">
                <IconAtividades fill="var(--background)" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2.5 h-[41px]">
          <div className="flex justify-between items-center">
            <span className="text-primary font-semibold">{((completedSteps / 25) * 100).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</span>
            <span className="text-grey-light text-sm">{activeStep < 10 ? `0${activeStep}` : activeStep} / 25</span>
          </div>
          <div className="flex w-full h-[5px] bg-background/10 rounded-md">
            <div
              className="h-full bg-primary rounded-md transition-all duration-300"
              style={{ width: `${(completedSteps / 25) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}