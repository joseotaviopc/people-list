import { Button } from "../ui/button";
import { FormDescription } from "../FormStepLayout/FormDescription";
import { WelcomeSection } from "../FormStepLayout/WelcomeSection";

interface FormStepContentProps {
    handleNextStep: () => void,
    handlePreviousStep: () => void
}

export default function FormStepContent({ handleNextStep }: FormStepContentProps) {
    return (
        <>
            <div className="flex overflow-y-scroll sm:overflow-auto gap-4 sm:gap-10 z-0 grow flex-col p-5 sm:px-10 sm:pt-6 rounded-xl shadow-lg bg-background/10 w-full sm:max-w-[700px] sm:h-[886px] sm:flex-1">
                <WelcomeSection />
                <FormDescription />
                <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-end">
                    <Button className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
                </div>
            </div>
        </>
    )
}