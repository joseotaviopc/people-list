import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface FormStep04Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
    activeStep: number
}

export default function FormStep04({ handleNextStep, handlePreviousStep, activeStep }: FormStep04Props) {
    const [formStepOption, setFormStepOption] = useState<number>(-1)
    return (
        <>
            <div className="flex overflow-y-scroll sm:overflow-auto gap-4 sm:gap-10 z-0 grow flex-col p-5 sm:px-10 sm:pt-6 rounded-xl shadow-lg bg-background/10 w-full sm:max-w-[700px] sm:h-[886px] sm:flex-1">
                <div className="h-full pt-5 sm:pt-14">
                    <h1 className="text-background font-bold text-sm sm:text-2xl mb-2.5 sm:mb-4">Quando o objetivo é a Holding Patrimonial, qual das opções abaixo é de seu maior interesse?</h1>
                    <h2 className="text-grey-light text-sm sm:text-base mb-6 sm:mb-8">Selecione apenas uma opção</h2>
                    <div className="flex  flex-col justify-center text-xs sm:text-sm gap-4 w-full">
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption === 0} onCheckedChange={(checked) => setFormStepOption(checked ? 0 : -1)} />
                            Proteção Patrimonial
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption === 1} onCheckedChange={(checked) => setFormStepOption(checked ? 1 : -1)} />
                            Planejamento Sucessório
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption === 2} onCheckedChange={(checked) => setFormStepOption(checked ? 2 : -1)} />
                            Economia Tributária
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-between">
                    <Button variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                    <Button type="button" disabled={formStepOption === -1} className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
                </div>
            </div>
            {/* Mobile footer*/}
            <footer className="w-full sm:hidden flex z-10 gap-4 justify-between items-center">
                <Button variant={activeStep === 1 ? 'ghost' : 'default'} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 1 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 1 ? undefined : handlePreviousStep}>Anterior</Button>
                <Button variant="ghost" className="flex-1 bg-background/10 hover:bg-background/10 cursor-default rounded-md hover:text-grey-light text-grey-light h-9 px-2">Etapa {activeStep < 10 ? `0${activeStep}` : activeStep}/25</Button>
                <Button variant={activeStep === 25 ? 'ghost' : 'default'} disabled={formStepOption === -1} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 25 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 25 ? undefined : handleNextStep}>Próximo</Button>
            </footer>
        </>
    )
}