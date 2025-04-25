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
            <WelcomeSection />
            <FormDescription />
            <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-end">
                <Button className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
            </div>
        </>
    )
}