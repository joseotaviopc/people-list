import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { IconAtividades } from "@/assets";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
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
// import { FormType } from "./FormContext";
import { validateCPF, validatePhone, cpfMask, phoneMask } from "@/helpers";

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

const personSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string()
        .min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string()
        .min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    type: z.enum(["PERSONAL", "COUPLE", "CHILD", "LEGAL_REPRESENTATIVE"]),
});

const formSchema = z.object({
    people: z.array(z.object({
        ...personSchema.shape,
        legalRepresentatives: z.array(personSchema).optional()
    }))
});

export type FormData = z.infer<typeof formSchema>;

// function mapFormTypeFromActivePersonStep(index: number) {
//     switch (index) {
//         case 2:
//             return FormType.COUPLE;
//         case 3:
//             return FormType.CHILD;
//         default:
//             return FormType.PERSONAL;
//     }
// }

export default function FormStep03({ handleNextStep, handlePreviousStep }: FormStep03Props) {
    // const { formValues, updateFormValue } = useFormContext()

    // const [activeHeaderStep, setActiveHeaderStep] = useState(1) // 1 ao 3
    const [completedHeaderSteps,] = useState(0) // 1 ao 3
    const [activePersonStep, setActivePersonStep] = useState(1) // 1 ao 3
    const [activeRepresentativeStep, setActiveRepresentativeStep] = useState(0) // 0 means no representative selected
    const [showLegalForm, setShowLegalForm] = useState(false)
    // const [data, setData] = useState<FormData[]>([])

    // const defaultValues = formValues[activePersonStep - 1] && formValues[activePersonStep - 1].data || {
    //     data: {
    //         name: "",
    //         email: "",
    //         cpf: "",
    //         celphone: "",
    //     }
    // };

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            people: [
                {
                    name: "",
                    email: "",
                    cpf: "",
                    celphone: "",
                    type: "PERSONAL",
                    legalRepresentatives: []
                }
            ]
        }
    })

    // Get both field arrays
    const { fields: peopleFields, append: appendPerson, remove: removePerson } = useFieldArray({
        control: form.control,
        name: "people"
    })

    const { fields: representativeFields, append: appendRepresentative, remove: removeRepresentative } = useFieldArray({
        control: form.control,
        name: `people.${activePersonStep - 1}.legalRepresentatives`
    })

    // console.log('peopleFields ', peopleFields)
    // console.log('representativeFields ', representativeFields)

    function handleChangePerson(index: number) {
        // Get the current person's index
        const currentPersonIndex = activePersonStep - 1;

        if (currentPersonIndex !== 0) {// Get all form errors for the current person
            const errors = form.formState.errors;
            const currentPersonErrors = errors?.people?.[currentPersonIndex];

            // If there are any errors, show them in the UI and don't change person
            if (currentPersonErrors) {
                // You can also add a toast or alert to inform the user
                // toast.error('Por favor, corrija os erros nos campos antes de prosseguir');
                return;
            }
        }

        // If no errors, proceed with changing person
        setActivePersonStep(index + 1);
        setActiveRepresentativeStep(0);
        setShowLegalForm(false);
    }

    function handleAddPerson(type: "PERSONAL" | "COUPLE" | "CHILD") {
        appendPerson({
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type,
            legalRepresentatives: []
        });
    }

    function handleRemovePerson(index: number) {
        if (peopleFields.length > 1) {
            removePerson(index);
        }
    }

    function handleAddLegalRepresentative() {
        appendRepresentative({
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type: "LEGAL_REPRESENTATIVE"
        });
        setShowLegalForm(true);
    }

    function handleRemoveLegalRepresentative(index: number) {
        if (representativeFields.length > 0) {
            removeRepresentative(index);
            return;
        }
        setShowLegalForm(false);
    }

    function handleChangeRepresentative(index: number) {
        setActiveRepresentativeStep(index + 1);
    }

    // function handleChangePerson(index: number) {
    //     // Check if we have existing values for the target step
    //     const targetStepValues = formValues.find((value) => value.type === mapFormTypeFromActivePersonStep(index + 1));

    //     if (!targetStepValues && activePersonStep !== 1) {
    //         form.clearErrors()
    //         setActivePersonStep(index + 1);
    //         return;
    //     }

    //     if (targetStepValues) {
    //         // If we have values, set them in the form
    //         form.reset({ ...targetStepValues.data, cpf: cpfMask(targetStepValues.data.cpf), celphone: phoneMask(targetStepValues.data.celphone) });
    //         setActivePersonStep(index + 1);
    //     } else {
    //         // If no values exist, validate and save current form
    //         form.handleSubmit((values) => {
    //             // If form is valid, update the form value and switch steps
    //             updateFormValue(activePersonStep - 1, {
    //                 type: mapFormTypeFromActivePersonStep(activePersonStep),
    //                 data: values
    //             });
    //             // Reset the form for the new step
    //             form.reset();
    //             setActivePersonStep(index + 1);
    //         })();
    //     }
    // }



    // function onSubmit(values: FormData) {
    //     updateFormValue(activePersonStep - 1, values);
    // }

    return (
        <>
            {/* QUANTIDADE DE SÓCIOS */}
            <header className="flex justify-center items-start gap-4 w-full relative">
                {peopleFields.map((field, index) => (
                    <div key={field.id} onClick={() => setActivePersonStep(index + 1)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                        <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md ${index + 1 <= completedHeaderSteps ? 'bg-primary' : 'bg-background/10'}`}>
                            <span className="flex gap-2 items-center text-background font-medium">{index < 9 ? `0${index + 1}` : index + 1}</span>
                        </div>
                        {index + 1 === activePersonStep && (
                            <span className="w-full h-[5px] rounded-xs bg-primary" />
                        )}
                    </div>
                ))}
                {/* Remove person button in each person's form */}
                {peopleFields.length > 1 && (
                    < Button onClick={() => handleRemovePerson(activePersonStep - 1)} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                        <Trash2 size={16} />
                    </Button>
                )}
                <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer absolute right-0 top-0" onClick={() => handleAddPerson("PERSONAL")} >
                    <Plus />
                </div>
            </header >


            <Form {...form}>
                {/* PESSOAL, CÔNJUGE, FILHO(A) */}
                <nav className="flex justify-center items-center gap-4 w-full">
                    {personSteps.map((step, index) => (
                        <div
                            key={index}
                            onClick={() => handleChangePerson(index)}
                            className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                        >
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
                    <p className="text-background">
                        {activePersonStep === 1 && 'Informe seus dados pessoais'}
                        {activePersonStep === 2 && 'Informe os dados pessoais do seu cônjuge'}
                        {activePersonStep === 3 && 'Informe os dados pessoais do seu neto'}
                    </p>
                </div>

                {/* FORMULÁRIO */}
                <form className="w-full max-md:max-w-full space-y-6">
                    <FormField
                        control={form.control}
                        name={`people.${activePersonStep - 1}.name`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold px-0">Nome</FormLabel>
                                <FormControl className="px-0 text-base">
                                    <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`people.${activePersonStep - 1}.email`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold px-0">Email</FormLabel>
                                <FormControl className="px-0 text-base">
                                    <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`people.${activePersonStep - 1}.cpf`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="text-primary font-bold px-0">CPF</FormLabel>
                                <FormControl className="px-0 text-base">
                                    <Input
                                        className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0"
                                        placeholder="000.000.000-00"
                                        {...field}
                                        onChange={(e) => {
                                            const maskedValue = cpfMask(e.target.value);
                                            field.onChange(maskedValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`people.${activePersonStep - 1}.celphone`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="text-primary font-bold px-0">Celular</FormLabel>
                                <FormControl className="text-base px-0">
                                    <Input
                                        className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0"
                                        placeholder="(00) 00000-0000"
                                        {...field}
                                        onChange={(e) => {
                                            const maskedValue = phoneMask(e.target.value);
                                            field.onChange(maskedValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </form>

                {/* ADICIONAR REPRESENTANTE LEGAL */}
                <div className="flex self-end items-center gap-2">
                    <p>Representante Legal</p>
                    <Button onClick={handleAddLegalRepresentative} variant="link" className="h-[35px] text-background my-0 py-0">
                        <Plus />
                    </Button>
                    {/* Remove legal representative button in each representative's form */}
                    {representativeFields.length > 0 && (
                        <Button onClick={() => handleRemoveLegalRepresentative(activeRepresentativeStep - 1)} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                            <Trash2 size={16} />
                        </Button>
                    )}
                </div>
                {/* Legal representative form */}
                {showLegalForm && (
                    <form className="w-full max-md:max-w-full space-y-6">
                        {/* Representative tabs */}
                        <nav className="flex justify-center items-center gap-4 w-full">
                            {representativeFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    onClick={() => handleChangeRepresentative(index)}
                                    className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer"
                                >
                                    <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md ${index + 1 <= completedHeaderSteps ? 'bg-primary' : 'bg-background/10'}`}>
                                        <span className="flex gap-2 items-center text-background font-medium">{index + 1}</span>
                                    </div>
                                    {index + 1 === activeRepresentativeStep && (
                                        <span className="w-full h-[5px] rounded-xs bg-primary" />
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Representative form fields */}
                        <FormField
                            control={form.control}
                            name={`people.${activePersonStep - 1}.legalRepresentatives.${activeRepresentativeStep - 1}.name`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary font-bold px-0">Nome</FormLabel>
                                    <FormControl className="px-0 text-base">
                                        <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`people.${activePersonStep - 1}.legalRepresentatives.${activeRepresentativeStep - 1}.email`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary font-bold px-0">Email</FormLabel>
                                    <FormControl className="px-0 text-base">
                                        <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`people.${activePersonStep - 1}.legalRepresentatives.${activeRepresentativeStep - 1}.cpf`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-primary font-bold px-0">CPF</FormLabel>
                                    <FormControl className="px-0 text-base">
                                        <Input
                                            className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0"
                                            placeholder="000.000.000-00"
                                            {...field}
                                            onChange={(e) => {
                                                const maskedValue = cpfMask(e.target.value);
                                                field.onChange(maskedValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`people.${activePersonStep - 1}.legalRepresentatives.${activeRepresentativeStep - 1}.celphone`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-primary font-bold px-0">Celular</FormLabel>
                                    <FormControl className="text-base px-0">
                                        <Input
                                            className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0"
                                            placeholder="(00) 00000-0000"
                                            {...field}
                                            onChange={(e) => {
                                                const maskedValue = phoneMask(e.target.value);
                                                field.onChange(maskedValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </form>
                )}
            </Form>

            {/* NAVEGAÇÃO ENTRE STEPS */}
            <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-between">
                <Button variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                <Button type="button" disabled={peopleFields.length === 0} className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
            </div>
        </>
    )
}