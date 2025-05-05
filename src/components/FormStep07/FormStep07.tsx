import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { currencyMask } from "@/helpers";

interface FormStep07Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
    activeStep: number
}

const formSchema = z.object({
    bens: z.string({ message: "O valor deve ser maior que zero" })
    // .refine((val) => /^\d+$/.test(val) || val === '', { message: "Deve conter apenas números" })
})

export default function FormStep07({ handleNextStep, handlePreviousStep, activeStep }: FormStep07Props) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "all"
    })
    return (
        <>
            <div className="flex overflow-y-scroll sm:overflow-auto gap-4 sm:gap-10 z-0 grow flex-col p-5 sm:px-10 sm:pt-6 rounded-xl shadow-lg bg-background/10 w-full sm:max-w-[700px] sm:h-[886px] sm:flex-1">
                <Form {...form}>
                    <div className="h-full pt-5 sm:pt-14">
                        {/* TODO: Update title and description for Step 07 */}
                        <h1 className="text-background font-bold text-sm sm:text-2xl mb-2.5 sm:mb-4">Seus bens somados atualmente em valor de mercado, se aproxima de qual valor?</h1>
                        <h2 className="text-grey-light text-sm sm:text-base mb-6 sm:mb-8">É importante colocar o valor próximo da realidade, para calcularmos os impostos sobre a incorporação de bens
                        </h2>
                        <div className="flex  flex-col justify-center text-xs sm:text-sm gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="bens"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel> */}
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input
                                                {...field}
                                                onChange={(e) => field.onChange(currencyMask(e.target.value))}
                                                className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0"
                                                placeholder="R$"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-between">
                        <Button variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                        <Button type="button" className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
                    </div>
                </Form>
            </div>
            {/* Mobile footer*/}
            <footer className="w-full sm:hidden flex z-10 gap-4 justify-between items-center">
                <Button variant={activeStep === 1 ? 'ghost' : 'default'} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 1 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 1 ? undefined : handlePreviousStep}>Anterior</Button>
                <Button variant="ghost" className="flex-1 bg-background/10 hover:bg-background/10 cursor-default rounded-md hover:text-grey-light text-grey-light h-9 px-2">Etapa {activeStep < 10 ? `0${activeStep}` : activeStep}/25</Button>
                <Button variant={activeStep === 25 ? 'ghost' : 'default'} disabled={form.formState.isSubmitting || !!form.formState.errors.bens} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 25 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 25 ? undefined : handleNextStep}>Próximo</Button>
            </footer>
        </>
    )
}