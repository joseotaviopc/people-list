import { Button } from "../ui/button";
import { FormDescription } from "../FormStepLayout/FormDescription";
import { WelcomeSection } from "../FormStepLayout/WelcomeSection";

export default function FormStepContent() {
    return (
        <>
            <WelcomeSection />
            <FormDescription />
            <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-end">
                <Button className="rounded-md h-9 px-2">Próximo</Button>
            </div>
        </>
    )
}