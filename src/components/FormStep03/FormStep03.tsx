import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ChildIcon, CoupleIcon,  PersonIcon } from "@/assets";
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
// import { FormType } from "./FormContext";
import { cpfMask, phoneMask } from "@/helpers";

interface FormStep03Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
}

enum FormType {
    PERSONAL = 'personal',
    COUPLE = 'couple',
    CHILD = 'child',
    LEGAL_REPRESENTATIVE = 'legalRepresentative'
}

const personSteps = [
    {
        icon: () => <PersonIcon />,
        label: "Pessoal",
        type: FormType.PERSONAL
    },
    {
        icon: () => <CoupleIcon />,
        label: "Cônjugue",
        type: FormType.COUPLE
    },
    {
        icon: () => <ChildIcon />,
        label: "Filho(a)s",
        type: FormType.CHILD
    }
]

const personSchema = z.object({
    name: z.string(),
    // .min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string(),
    // .email("Deve ser um email válido"),
    cpf: z.string(),
    // .min(14, "CPF deve ter 11 dígitos")
    // .transform((cpf) => cpf.replace(/[.|-]/g, ''))
    // .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string(),
    // .min(15, "Telefone deve ter 11 dígitos")
    // .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
    // .refine((phone) => validatePhone(phone), "Telefone inválido"),
    type: z.enum(["PERSONAL", "COUPLE", "CHILD", "LEGAL_REPRESENTATIVE"]),
});

const formSchema = z.object({
    people: z.object({
        ...personSchema.shape,
        legalRepresentatives: z.array(personSchema).optional()
    })
});

export type PersonFormData = z.infer<typeof formSchema>;
type LegalFormData = z.infer<typeof personSchema>;

export default function FormStep03({ handleNextStep, handlePreviousStep }: FormStep03Props) {
    const [activePersonStep, setActivePersonStep] = useState(FormType.PERSONAL)
    const [activeChildStep, setActiveChildStep] = useState(FormType.PERSONAL)
    const [activeGrandChildStep, setActiveGrandChildStep] = useState(FormType.PERSONAL)

    const [childCount, setChildCount] = useState(0)
    const [grandChildCount, setGrandChildCount] = useState(0)
    const [showLegalForm, setShowLegalForm] = useState(false)

    const personForm = useForm<PersonFormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            people: {
                name: "",
                email: "",
                cpf: "",
                celphone: "",
                type: "PERSONAL",
                legalRepresentatives: []
            }
        }
    })

    const legalForm = useForm<LegalFormData>({
        resolver: zodResolver(personSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type: "LEGAL_REPRESENTATIVE"
        }
    })

    function handleChangePerson(type: FormType) {
        setActivePersonStep(type);
        setShowLegalForm(false);
    }

    function handleChangeChild(type: FormType) {
        setActiveChildStep(type);
        setShowLegalForm(false);
    }

    function handleChangeGrandChild(type: FormType) {
        setActiveGrandChildStep(type);
        setShowLegalForm(false);
    }

    function handleAddLegalRepresentative() {
        setShowLegalForm(true);
    }

    return (
        <>
            {/* QUANTIDADE DE SÓCIOS - SEM FUNCIONALIDADE */}
            <header className="flex justify-center items-start gap-4 w-full relative">
                {/* {peopleFields.map((field, index) => (
                ))} */}
                <div onClick={() => { }} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                    <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                        <span className="flex gap-2 items-center text-background font-medium">01</span>
                    </div>

                    {/* Indica o sócio atual */}
                    {/* {index + 1 === activePersonStep && (
                    )} */}
                    <span className="w-full h-[5px] rounded-xs bg-primary" />
                </div>

                {/* Remove person button in each person's form */}
                {/* {peopleFields.length > 1 && (
                    < Button onClick={() => handleRemovePerson(activePersonStep - 1)} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                        <Trash2 size={16} />
                    </Button>
                )} */}
                <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer absolute right-0 top-0" onClick={() => { }} >
                    <Plus />
                </div>
            </header >


            <Form {...personForm}>
                <div className="space-y-5 relative">


                    {/* BOTOES - PESSOAL, CÔNJUGE, FILHO(A) */}
                    <nav className="flex justify-center items-center gap-4 w-full">
                        {personSteps.map((step, index) => (
                            <div
                                key={index}
                                onClick={() => handleChangePerson(step.type)}
                                className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                            >
                                <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                                    <span className="flex gap-2 items-center text-background font-medium">{step.icon()} {step.label} {step.type === FormType.CHILD && childCount > 0 &&`(${childCount.toString().padStart(2, '0')})`}</span>
                                </div>
                                {step.type === activePersonStep && (
                                    <span className="w-full h-[5px] rounded-xs bg-primary" />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CHECKBOX - FILHOS, NETOS, BISNETOS */}
                    <div className="flex justify-center items-center gap-4 w-full">
                        <div className="flex items-center gap-2 text-nowrap">
                            <Input type="checkbox" />
                            Filhos {childCount > 0 && `(${childCount.toString().padStart(2, '0')})`}
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Input type="checkbox" />
                            Netos {grandChildCount > 0 && `(${grandChildCount.toString().padStart(2, '0')})`}
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Input type="checkbox" />
                            Bisnetos
                        </div>
                    </div>

                    {activePersonStep === FormType.CHILD && (
                        <>
                            {/* BOTAO - SELECIONA FILHO */}
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-[30px]">Filhos:</div>
                                    {Array.from({ length: childCount }).map((_, index) => (
                                        <div key={index} onClick={() => { }} className="flex flex-col justify-between items-center w-[22px] h-[30px] cursor-pointer">
                                            <div className={`flex items-center justify-center w-[22px] h-[22px] rounded-md bg-transparent`}>
                                                <span className="flex gap-2 items-center text-background font-medium">{`0${index + 1}`}</span>
                                            </div>

                                            {index === 0 && <span className="w-full h-[5px] rounded-xs bg-primary" />}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-1">
                                    {childCount > 0 && (
                                        <Button onClick={() => setChildCount(childCount - 1)} variant="destructive" className="border rounded-none items-start h-[30px] text-background bg-transparent hover:bg-transparent my-0 py-0 pt-1 has-[>svg]:px-1">
                                            <Trash2 size={16} />
                                        </Button>
                                    )}
                                    <Button onClick={() => setChildCount(childCount + 1)} variant="link" className="border rounded-none items-start h-[30px] text-background my-0 py-0 pt-0.5 has-[>svg]:px-1">
                                        <Plus size={22} />
                                    </Button>
                                </div>
                            </div>
                            <p className="flex items-center w-full">João Henrique da Silva</p>

                            {/* BOTOES FILHO */}
                            <nav className="flex justify-center items-center gap-4 w-full">
                                {personSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleChangeChild(step.type)}
                                        className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                                    >
                                        <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                                            <span className="flex gap-2 items-center text-background font-medium">{step.icon()} {step.label} {step.type === FormType.CHILD && grandChildCount > 0 && `(${grandChildCount.toString().padStart(2, '0')})`}</span>
                                        </div>
                                        {step.type === activeChildStep && (
                                            <span className="w-full h-[5px] rounded-xs bg-primary" />
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {activeChildStep === FormType.CHILD && (
                                <>
                                    {/* BOTAO - SELECIONA NETO */}
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-[30px]">Netos:</div>
                                            {Array.from({ length: grandChildCount }).map((_, index) => (
                                                <div key={index} onClick={() => { }} className="flex flex-col justify-between items-center w-[22px] h-[30px] cursor-pointer">
                                                    <div className={`flex items-center justify-center w-[22px] h-[22px] rounded-md bg-transparent`}>
                                                        <span className="flex gap-2 items-center text-background font-medium">{`0${index + 1}`}</span>
                                                    </div>

                                                    {index === 0 && <span className="w-full h-[5px] rounded-xs bg-primary" />}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-1">
                                            {grandChildCount > 0 && (
                                                <Button onClick={() => setGrandChildCount(grandChildCount - 1)} variant="destructive" className="border rounded-none items-start h-[30px] text-background bg-transparent hover:bg-transparent my-0 py-0 pt-1 has-[>svg]:px-1">
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                            <Button onClick={() => setGrandChildCount(grandChildCount + 1)} variant="link" className="border rounded-none items-start h-[30px] text-background my-0 py-0 pt-[1px] has-[>svg]:px-1">
                                                <Plus size={22} />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* BOTOES NETO */}
                                    <nav className="flex justify-center items-center gap-4 w-full">
                                        {personSteps.map((step, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleChangeGrandChild(step.type)}
                                                className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                                            >
                                                <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                                                    <span className="flex gap-2 items-center text-background font-medium">{step.icon()} {step.label}</span>
                                                </div>
                                                {step.type === activeGrandChildStep && (
                                                    <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                )}
                                            </div>
                                        ))}
                                    </nav>
                                </>
                            )}

                            {/* SIDEBAR BOLAS - FILHO */}
                            <div className="flex flex-row rotate-90 h-[17px] absolute top-[4.25rem] -left-[5rem]">
                                <span className="w-[17px] h-[17px] rounded-full bg-primary" />
                                <span className="flex flex-row gap-0.5">
                                    {Array.from({ length: 11 }).map((_, index) => (
                                        <span key={index} className="flex items-center justify-center">{'-'}</span>
                                    ))}
                                </span>
                                <span className="w-[17px] h-[17px] rounded-full bg-primary" />
                            </div>

                            {/* SIDEBAR BOLAS - NETO */}
                            {activeChildStep === FormType.CHILD && (
                                <div className="flex flex-row rotate-90 h-[17px] absolute top-[13.5rem] -left-[5.875rem]">
                                    <span className="flex flex-row gap-0.5">
                                        {Array.from({ length: 16 }).map((_, index) => (
                                            <span key={index} className="flex items-center justify-center">{'-'}</span>
                                        ))}
                                    </span>
                                    <span className="w-[17px] h-[17px] rounded-full bg-primary" />
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* TEXTO RELATIVO AOS BOTOES */}
                <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-background font-bold text-2xl">Dados Pessoais</h2>
                    <p className="text-background">
                        {activePersonStep === FormType.PERSONAL && 'Informe seus dados pessoais'}
                        {activePersonStep === FormType.COUPLE && 'Informe os dados pessoais do seu cônjuge'}
                        {activePersonStep === FormType.CHILD && 'Informe os dados pessoais do seu filho(a)'}
                    </p>
                </div>

                {/* FORMULÁRIO */}
                <form className="w-full max-md:max-w-full space-y-6">
                    <FormField
                        control={personForm.control}
                        name="people.name"
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
                        control={personForm.control}
                        name="people.email"
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
                        control={personForm.control}
                        name="people.cpf"
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
                        control={personForm.control}
                        name="people.celphone"
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
            </Form>

            <Form {...legalForm}>
                {/* ADICIONAR REPRESENTANTE LEGAL - SEM FUNCIONALIDADE*/}
                <div className="flex self-end items-center gap-2">
                    <p>Representante Legal</p>
                    <Button onClick={handleAddLegalRepresentative} variant="link" className="h-[35px] text-background my-0 py-0">
                        <Plus />
                    </Button>

                    {/* Remove legal representative button in each representative's form */}
                    {/* {representativeFields.length > 0 && (
                        <Button onClick={() => handleRemoveLegalRepresentative(activeRepresentativeStep - 1)} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                            <Trash2 size={16} />
                        </Button>
                    )} */}
                </div>

                {/* Legal representative form */}
                {showLegalForm && (
                    <form className="w-full max-md:max-w-full space-y-6">

                        {/* Representative tabs - SEM FUNCIONALIDADE */}
                        <nav className="flex justify-center items-center gap-4 w-full">
                            {/* {representativeFields.map((field, index) => (
                            ))} */}
                            <div
                                // key={field.id}
                                onClick={() => { }}
                                className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer"
                            >
                                <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                    <span className="flex gap-2 items-center text-background font-medium">01</span>
                                </div>

                                {/* Indicação do representante legal atual */}
                                {/* {index + 1 === activeRepresentativeStep && (
                                )} */}
                                <span className="w-full h-[5px] rounded-xs bg-primary" />
                            </div>
                        </nav>

                        {/* Representative form fields */}
                        <FormField
                            control={legalForm.control}
                            name="name"
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
                            control={legalForm.control}
                            name="email"
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
                            control={legalForm.control}
                            name="cpf"
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
                            control={legalForm.control}
                            name="celphone"
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
                <Button type="button" disabled className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
            </div>
        </>
    )
}