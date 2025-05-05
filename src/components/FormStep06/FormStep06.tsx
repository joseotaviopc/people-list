import { Button } from "../ui/button";
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
import { Info } from "lucide-react";
import { Upload } from "@/assets";

interface FormStep06Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
}

const formSchema = z.object({
    quantidade_imoveis: z.string({message: "A quantidade deve ser maior que zero"})
        .refine((val) => /^\d+$/.test(val) || val === '', { message: "Deve conter apenas números" }) // Ensure only digits or empty string
        .pipe(z.coerce.number())
        .pipe(z.number().positive({ message: "A quantidade deve ser maior que zero" })) // Ensure positive number
        .pipe(z.coerce.string()),
})

export default function FormStep06({ handleNextStep, handlePreviousStep }: FormStep06Props) {

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "all"
    })

    return (
        <Form {...form}>
            <form className="flex flex-col flex-1" onSubmit={form.handleSubmit(handleNextStep)}>
                <div className="h-full pt-5 sm:pt-14 space-y-8">
                    {/* TODO: Update title and description for Step 06 */}
                    <h1 className="text-background font-bold text-sm sm:text-2xl mb-2.5 sm:mb-4">Quantos imóveis serão incorporados à holding patrimonial?</h1>
                    <h2 className="text-grey-light text-sm sm:text-base mb-6 sm:mb-8">Digite o número</h2>
                    <div className="flex  flex-col justify-center text-xs sm:text-sm gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="quantidade_imoveis"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel> */}
                                    <FormControl className="px-0 text-xs sm:text-base">
                                        <Input
                                            {...field}
                                            // onChange={(e) => onlyNumbersOnChange(e, field)}
                                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                                            // onChange={(e) => field.onChange(onlyNumbersOnChange(e.target.value))}
                                            className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0"
                                            placeholder="Ex: 02"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <span className="text-grey-light font-semibold text-sm sm:text-base mb-6 sm:mb-8 flex items-center gap-2">Upload certificado digital <Info size={16} /></span>
                    <Button type="button" variant="ghost" className="rounded-md w-[248px] h-auto bg-background/10 hover:bg-background/10 py-5 px-2 flex flex-col text-grey-light hover:text-grey-light" onClick={() => {}}><Upload />Fazer Upload</Button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:w-full sm:items-end sm:justify-between">
                    <Button type="button" variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                    <Button type="submit" className="rounded-md h-9 px-2">Próximo</Button>
                </div>
            </form>
        </Form>
    )
}