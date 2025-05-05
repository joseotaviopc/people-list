import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, FileText } from "lucide-react";
import { Upload } from "@/assets";
import { Label } from "../ui/label";

interface FormStep06Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
}

const formSchema = z.object({
    quantidade_imoveis: z.string({message: "A quantidade deve ser maior que zero"})
        .refine((val) => /^\d+$/.test(val) || val === '', { message: "Deve conter apenas números" })
        .pipe(z.coerce.number())
        .pipe(z.number().positive({ message: "A quantidade deve ser maior que zero" }))
        .pipe(z.coerce.string()),
})

export default function FormStep06({ handleNextStep, handlePreviousStep }: FormStep06Props) {

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "all"
    })

    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    return (
        <Form {...form}>
            <form className="flex flex-col flex-1" onSubmit={form.handleSubmit(handleNextStep)}>
                <div className="h-full pt-5 sm:pt-14 space-y-8">
                    <h1 className="text-background font-bold text-sm sm:text-2xl mb-2.5 sm:mb-4">Quantos imóveis serão incorporados à holding patrimonial?</h1>
                    <h2 className="text-grey-light text-sm sm:text-base mb-6 sm:mb-8">Digite o número</h2>
                    <div className="flex  flex-col justify-center text-xs sm:text-sm gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="quantidade_imoveis"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl className="px-0 text-xs sm:text-base">
                                        <Input
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
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
                    <div className="relative w-[248px]">
                        <Label
                            htmlFor="certificate"
                            className="cursor-pointer rounded-md w-full h-auto bg-background/10 hover:bg-background/20 py-5 px-2 flex flex-col items-center justify-center text-grey-light hover:text-grey-light transition-colors duration-200"
                        >
                            {selectedFileName ? (
                                <>
                                    <FileText className="mb-2" />
                                    <span className="text-xs text-center break-all px-2">{selectedFileName}</span>
                                </>
                            ) : (
                                <>
                                    <Upload />
                                    <span>Fazer Upload</span>
                                </>
                            )}
                        </Label>
                        <Input
                            id="certificate"
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-[-1]"
                            onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name ?? null)}
                        />
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:w-full sm:items-end sm:justify-between">
                    <Button type="button" variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                    <Button type="submit" className="rounded-md h-9 px-2">Próximo</Button>
                </div>
            </form>
        </Form>
    )
}