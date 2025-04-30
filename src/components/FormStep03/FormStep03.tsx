import { Plus, Trash2 } from "lucide-react";
import { ChildIcon, CoupleIcon, PersonIcon } from "@/assets";
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
import { useFormStep03 } from "./useFormStep03";
import { Checkbox } from "../ui/checkbox";

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

export default function FormStep03({ handleNextStep, handlePreviousStep }: FormStep03Props) {
    const { childActions, grandChildActions, greatGrandChildActions, legalActions, partnerActions, personActions } = useFormStep03()
    const { childCount, activeChildStep, childSelected, handleChangeChild, setChildSelected, handleAddChild, handleRemoveChild, handleChildCheckboxChange, showChild } = childActions
    const { grandChildCount, activeGrandChildStep, grandChildSelected, handleChangeGrandChild, setGrandChildCount, setGrandChildSelected, showGrandChild, handleGrandChildCheckboxChange } = grandChildActions
    const { greatGrandChildSelected, greatGrandChildrenCount, setGreatGrandChildSelected, setGreatGrandChildrenCount, showGreatGrandChild } = greatGrandChildActions
    const { activeRepresentativeStep, handleAddLegalRepresentative, handleRemoveLegalRepresentative, legalForm, legalRepresentativesCount, setActiveRepresentativeStep, showLegalForm } = legalActions
    const { partnerCount, activePartnerStep, handleAddPartner, handleRemovePartner, setActivePartnerStep } = partnerActions
    const { activePersonStep, handleChangePerson, personForm } = personActions

    return (
        <>
            {/* RESUMO STATES */}
            <div className="hidden space-y-1 py-0 my-0">
                <p className="text-[10px] text-zinc-400">partnerCount: {partnerCount} - activePartnerStep: {activePartnerStep}</p>
                <p className="text-[10px] text-zinc-400">activePersonStep: {activePersonStep}</p>
                <p className="text-[10px] text-zinc-400">childCount: {childCount} - activeChildStep: {activeChildStep}</p>
                <p className="text-[10px] text-zinc-400">grandChildCount: {grandChildCount} - activeGrandChildStep: {activeGrandChildStep}</p>
                <p className="text-[10px] text-zinc-400">greatGrandChildrenCount: {greatGrandChildrenCount}</p>
                <p className="text-[10px] text-zinc-400">showGrandChild: {`${showGrandChild}`} - showGreatGrandChild: {`${showGreatGrandChild}`}</p>
            </div>

            <header className="flex justify-center items-start gap-4 w-full relative">
                {/* QUANTIDADE DE SÓCIOS - SEM FUNCIONALIDADE */}
                {Array.from({ length: partnerCount }).map((_, index) => (
                    <div key={index} onClick={() => setActivePartnerStep(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                        <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                            <span className="flex gap-2 items-center text-background font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                        </div>

                        {/* Indica o sócio atual */}
                        {index === activePartnerStep && (
                            <span className="w-full h-[5px] rounded-xs bg-primary" />
                        )}
                    </div>
                ))}

                {/* ADICIONA OU REMOVE SÓCIO, AO REMOVER, LIMPAR TODOS OS DADOS */}
                <div className="flex gap-1 absolute right-0 top-0">
                    {partnerCount > 1 && (
                        < Button onClick={handleRemovePartner} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                            <Trash2 size={16} />
                        </Button>
                    )}
                    <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={handleAddPartner} >
                        <Plus />
                    </div>
                </div>
            </header >


            <Form {...personForm}>
                <div className="space-y-5 relative">

{/* ======================= BOTAO - SELECIONA PESSOA, COJUGUE, FILHO(A) ======================= */}
                    <nav className="flex justify-center items-center gap-4 w-full">
                        {personSteps.map((step, index) => (
                            <div
                                key={index}
                                onClick={() => handleChangePerson(step.type)}
                                className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                            >
                                <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                                    <span className="flex gap-2 items-center text-background font-medium">{step.icon()} {step.label} {step.type === FormType.CHILD && childCount > 0 && `(${childCount.toString().padStart(2, '0')})`}</span>
                                </div>
                                {step.type === activePersonStep && (
                                    <span className="w-full h-[5px] rounded-xs bg-primary" />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CHECKBOX - FILHOS, NETOS, BISNETOS */}
                    {childCount > 0 && (
                        <div className="flex justify-center items-center gap-4 w-full">
                            <div className="flex items-center gap-2 text-nowrap">
                                {grandChildCount > 0 && (<Checkbox onCheckedChange={handleChildCheckboxChange}/>)}
                                Filhos {childCount > 0 && `(${childCount.toString().padStart(2, '0')})`}
                            </div>
                            {grandChildCount > 0 && (
                                <div className="flex items-center gap-2 text-nowrap">
                                    <Checkbox onCheckedChange={handleGrandChildCheckboxChange}/>
                                    Netos {grandChildCount > 0 && `(${grandChildCount.toString().padStart(2, '0')})`}
                                </div>
                            )}
                            {greatGrandChildrenCount > 0 && (
                                <div className="flex items-center gap-2 text-nowrap">
                                    <Checkbox />
                                    Bisnetos {`(${greatGrandChildrenCount.toString().padStart(2, '0')})`}
                                </div>
                            )}
                        </div>
                    )}

                    {activePersonStep === FormType.CHILD && (
                        <>
                            {/* <hr className="border-t border-t-orange-400" /> */}
{/* ======================= FILHO ======================= */}
                            {showChild && (
                                <>
                                    <div className="relative flex justify-center gap-2 items-center w-full">
                                        <>
                                            {Array.from({ length: childCount }).map((_, index) => (
                                                <div key={index} onClick={() => setChildSelected(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                                                    <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                                        <span className="flex gap-2 items-center text-background font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                                                    </div>

                                                    {/* Indica o filho atual */}
                                                    {index === childSelected && (
                                                        <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                    )}
                                                </div>
                                            ))}

                                            <div className="flex gap-1 absolute right-0 top-0">
                                                {/* Remove person button in each person's form */}
                                                {childCount > 0 && (
                                                    < Button onClick={handleRemoveChild} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                )}
                                                <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={handleAddChild} >
                                                    <Plus />
                                                </div>
                                            </div>
                                        </>
                                    </div>

                                    {/* BOTOES FILHO */}
                                    {childCount > 0 && (
                                        <>
                                            <p className="flex items-center w-full">João Henrique da Silva</p>
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
                                        </>
                                    )}
                                </>
                            )}

                            {showGrandChild && childCount > 0 && activeChildStep === FormType.CHILD && (
                                <>
                                    {/* <hr className="border-t border-t-orange-400" /> */}
{/* =============================== NETO =============================== */}
                                    <div className="flex relative justify-center items-center gap-2 w-full">
                                        {Array.from({ length: grandChildCount }).map((_, index) => (
                                            <div key={index} onClick={() => setGrandChildSelected(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                                                <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                                    <span className="flex gap-2 items-center text-background font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                                                </div>

                                                {/* Indica o neto atual */}
                                                {index === grandChildSelected && (
                                                    <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                )}
                                            </div>
                                        ))}

                                        <div className="flex gap-1 absolute right-0 top-0">
                                            {/* Remove person button in each person's form */}
                                            {grandChildCount > 0 && (
                                                < Button onClick={() => setGrandChildCount(grandChildCount - 1)} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                            <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={() => setGrandChildCount(grandChildCount + 1)} >
                                                <Plus />
                                            </div>
                                        </div>
                                    </div>

                                    {/* BOTOES NETO */}
                                    {grandChildCount > 0 && (
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
                                    )}
                                </>
                            )}

                            {showGreatGrandChild && grandChildCount > 0 && activeChildStep === FormType.CHILD && activeGrandChildStep === FormType.CHILD && (
                                <>
                                    {/* <hr className="border-t border-t-orange-400" /> */}
{/* =============================== BISNETO =============================== */}
                                    <div className="flex relative justify-center items-center gap-2 w-full">
                                        {Array.from({ length: greatGrandChildrenCount }).map((_, index) => (
                                            <div key={index} onClick={() => setGreatGrandChildSelected(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                                                <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                                    <span className="flex gap-2 items-center text-background font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                                                </div>

                                                {/* Indica o bisneto atual */}
                                                {index === greatGrandChildSelected && (
                                                    <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                )}
                                            </div>
                                        ))}

                                        {greatGrandChildrenCount > 0 && (
                                        <div className="flex gap-1 absolute right-0 top-0">
                                            {/* Remove person button in each person's form */}
                                                < Button onClick={() => setGreatGrandChildrenCount(greatGrandChildrenCount - 1)} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                                                    <Trash2 size={16} />
                                                </Button>
                                            <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={() => setGreatGrandChildrenCount(greatGrandChildrenCount + 1)} >
                                                <Plus />
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                </>
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
                <div className="flex self-end items-center gap-1">
                    <p className="mr-2">Representante Legal</p>
                    {/* Remove legal representative button in each representative's form */}
                    {legalRepresentativesCount > 0 && (
                        // <Button onClick={handleRemoveLegalRepresentative} variant="destructive" className="h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0">
                        <Button onClick={handleRemoveLegalRepresentative} variant="destructive" className="rounded-none h-[35px] text-background bg-transparent hover:bg-transparent my-0 py-0 has-[>svg]:px-1">
                            <Trash2 size={16} />
                        </Button>
                    )}
                    <Button onClick={handleAddLegalRepresentative} variant="link" className="rounded-none h-[35px] text-background my-0 py-0 has-[>svg]:px-1">
                        <Plus />
                    </Button>
                </div>

                {/* Legal representative form */}
                {showLegalForm && (
                    <form className="w-full max-md:max-w-full space-y-6">

                        {/* Representative tabs - SEM FUNCIONALIDADE */}
                        <nav className="flex justify-center items-center gap-4 w-full">
                            {Array.from({ length: legalRepresentativesCount }).map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveRepresentativeStep(index)}
                                    className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer"
                                >
                                    <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                        <span className="flex gap-2 items-center text-background font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                                    </div>

                                    {/* Indicação do representante legal atual */}
                                    {index === activeRepresentativeStep && (
                                        <span className="w-full h-[5px] rounded-xs bg-primary" />
                                    )}
                                </div>
                            ))}
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