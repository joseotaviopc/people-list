import { Button } from "../ui/button";
import { FormDescription } from "../FormStepLayout/FormDescription";
import { WelcomeSection } from "../FormStepLayout/WelcomeSection";

interface FormStepContentProps {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
    activeStep: number,
}

export default function FormStepContent({ handleNextStep, activeStep }: FormStepContentProps) {
    return (
        <>
            <div className="flex overflow-y-scroll sm:overflow-auto gap-4 sm:gap-10 z-0 grow flex-col p-5 sm:px-10 sm:pt-6 rounded-xl shadow-lg bg-background/10 w-full sm:max-w-[700px] sm:h-[886px] sm:flex-1">
                <WelcomeSection />
                <FormDescription />
                <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-end">
                    <Button className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
                </div>
            </div>
            {/* Mobile footer*/}
            <footer className="w-full sm:hidden flex z-10 gap-4 justify-between items-center">
                <Button variant={activeStep === 1 ? 'ghost' : 'default'} disabled className={`flex-1 rounded-md h-9 px-2 ${activeStep === 1 ? 'bg-grey-light text-grey-dark' : ''}`} >Anterior</Button>
                <Button variant="ghost" className="flex-1 bg-background/10 hover:bg-background/10 cursor-default rounded-md hover:text-grey-light text-grey-light h-9 px-2">Etapa {activeStep < 10 ? `0${activeStep}` : activeStep}/25</Button>
                <Button variant={activeStep === 25 ? 'ghost' : 'default'} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 25 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 25 ? undefined : handleNextStep}>Próximo</Button>
            </footer>
        </>
    )
}