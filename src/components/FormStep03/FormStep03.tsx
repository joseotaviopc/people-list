import { useState } from "react";
import { Plus } from "lucide-react";
import { IconAtividades } from "@/assets";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";

interface FormStep03Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
}

const personSteps = [
    {
        icon: () => <IconAtividades fill="var(--background)" />,
        label: "Pessoal",
    },
    {
        icon: () => <IconAtividades fill="var(--background)" />,
        label: "Cônjugue",
    },
    {
        icon: () => <IconAtividades fill="var(--background)" />,
        label: "Filho(a)s",
    }
]

const formSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "Deve ser um CPF válido"),
    celphone: z.string().min(14, "Deve ser um telefone válido"),
})

export default function FormStep03({ handleNextStep, handlePreviousStep }: FormStep03Props) {
    const [activeHeaderStep, setActiveHeaderStep] = useState(1) // 1 ao 3
    const [completedHeaderSteps,] = useState(0) // 1 ao 3
    const [activePersonStep, setActivePersonStep] = useState(1) // 1 ao 3

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    function handleSubmitForm() {
        form.handleSubmit(onSubmit)
        handleNextStep()
    }
    return (
        <>
            <header className="flex justify-center items-start gap-4 w-full relative">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} onClick={() => setActiveHeaderStep(index + 1)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                        <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md ${index + 1 <= completedHeaderSteps ? 'bg-primary' : 'bg-background/10'}`}>
                            <span className="flex gap-2 items-center text-background font-medium">{index < 9 ? `0${index + 1}` : index + 1}</span>
                        </div>
                        {index + 1 === activeHeaderStep && (
                            <span className="w-full h-[5px] rounded-xs bg-primary" />
                        )}
                    </div>
                ))}
                <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer absolute right-0 top-0">
                    <Plus />
                </div>
            </header>

            <nav className="flex justify-center items-center gap-4 w-full">
                {personSteps.map((step, index) => (
                    <div key={index} onClick={() => setActivePersonStep(index + 1)} className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer">
                        <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                            <span className="flex gap-2 items-center text-background font-medium">{step.icon()} {step.label}</span>
                        </div>
                        {index + 1 === activePersonStep && (
                            <span className="w-full h-[5px] rounded-xs bg-primary" />
                        )}
                    </div>
                ))}
            </nav>

            <div className="flex flex-col gap-2 w-full">
                <h2 className="text-background font-bold text-2xl">Dados Pessoais</h2>
                <p className="text-background">Informe os dados pessoais do seu cônjuge</p>
            </div>
            <Form {...form}>
                <form className="w-full max-md:max-w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold px-0">Nome</FormLabel>
                                <FormControl className="px-0 text-base">
                                    <Input className="placeholder:text-background border-0 border-b border-b-background rounded-none" placeholder="Digite o nome completo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold px-0">Email</FormLabel>
                                <FormControl className="px-0 text-base">
                                    <Input className="placeholder:text-background border-0 border-b border-b-background rounded-none" placeholder="exemplo@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="text-primary font-bold px-0">CPF</FormLabel>
                                <FormControl className="px-0 text-base">
                                    <Input className="placeholder:text-background border-0 border-b border-b-background rounded-none" placeholder="Digite o CPF" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="celphone"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="text-primary font-bold px-0">Celular</FormLabel>
                                <FormControl className="text-base px-0">
                                    <Input className="placeholder:text-background border-0 border-b border-b-background rounded-none" placeholder="+55 (00) 00000-0000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className="flex self-end items-center gap-2">
                <p>Representante Legal</p>
                <Button variant="link" className="h-[35px] text-background my-0 py-0">
                    <Plus />
                </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-between">
                <Button variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                <Button className="rounded-md h-9 px-2" onClick={handleSubmitForm}>Próximo</Button>
            </div>
        </>
    )
}