import { Plus, Trash2 } from "lucide-react";
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
import { cpfMask, phoneMask } from "@/helpers";
import { useFormStep03 } from "./useFormStep03";
// import { Checkbox } from "../ui/checkbox";
import { personSteps } from "./helpers";
import { FormType } from "./types";

interface FormStep03Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
}

export default function FormStep03({ handleNextStep, handlePreviousStep }: FormStep03Props) {
    const { filhoActions, netoActions, bisnetoActions, legalActions, partnerActions, personActions, novosForms, validateDataBeforeNextStep } = useFormStep03()
    const { filhoCount, activeFilhoStep, filhoSelected, handleChangeFilho, handleChangeActiveFilho, handleAddFilho, handleRemoveFilho, showFilho } = filhoActions
    const { netoCount, activeNetoStep, netoSelected, handleChangeNeto, handleChangeActiveNeto, showNeto, handleAddNeto, handleRemoveNeto } = netoActions
    const { bisnetoSelected, bisnetoCount, showGreatNeto, handleAddGreatNeto, handleRemoveGreatNeto, handleChangeActiveBisNeto } = bisnetoActions
    const { activeRepresentativeStep, handleAddLegalRepresentative, handleRemoveLegalRepresentative, legalRepresentativesCount, setActiveRepresentativeStep, showLegalForm, representanteForm } = legalActions
    const { partnerCount, activePartnerStep, handleAddPartner, handleRemovePartner, handleChangeActivePartner } = partnerActions
    const { activePersonStep, handleChangePerson } = personActions
    const { socioForm, mulherForm, filhoForm, mulherDoFilhoForm, netoForm, mulherDoNetoForm, bisnetoForm, todosDadosValidados } = novosForms

    async function validateData() {
        await validateDataBeforeNextStep()
        handleNextStep()
    }

    return (
        <>
            {/* RESUMO STATES */}
            <div className="hidden space-y-1 py-0 my-0">
                <p className="text-xs text-zinc-400">todosDadosValidados.length: {todosDadosValidados.length} - activePartnerStep: {activePartnerStep}</p>
                <p className="text-xs text-zinc-400">activePersonStep: {activePersonStep}</p>
                <hr className="border-t border-t-zinc-400" />
                <p className="text-xs text-zinc-400">filhoCount: {filhoCount} - activeFilhoStep: {activeFilhoStep}</p>
                <p className="text-xs text-zinc-400">filhoSelected: {filhoSelected}</p>
                <hr className="border-t border-t-zinc-400" />
                <p className="text-xs text-zinc-400">netoCount: {netoCount} - activeNetoStep: {activeNetoStep}</p>
                <p className="text-xs text-zinc-400">bisnetoCount: {bisnetoCount}</p>
                <p className="text-xs text-zinc-400">showNeto: {`${showNeto}`} - showGreatNeto: {`${showGreatNeto}`}</p>
                <hr className="border-t border-t-zinc-400" />
                <p className="text-xs text-zinc-400">showLegalForm: {`${showLegalForm}`}</p>
                <p className="text-xs text-zinc-400">legalRepresentativesCount: {legalRepresentativesCount} - activeRepresentativeStep: {activeRepresentativeStep}</p>
            </div>

            <header className="flex flex-col-reverse sm:flex-row justify-center items-center gap-1 sm:gap-4 w-full relative">
                {/* QUANTIDADE DE SÓCIOS - SEM FUNCIONALIDADE */}
                <div className="flex gap-2">
                    {Array.from({ length: partnerCount }).map((_, index) => (
                        <div key={index} onClick={() => handleChangeActivePartner(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                            <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                            </div>

                            {/* Indica o sócio atual */}
                            {index === activePartnerStep && (
                                <span className="w-full h-[5px] rounded-xs bg-primary" />
                            )}
                        </div>
                    ))}
                </div>

                {/* ADICIONA OU REMOVE SÓCIO, AO REMOVER, LIMPAR TODOS OS DADOS */}
                <div className="flex self-end gap-2 sm:absolute right-0 top-0">
                    {partnerCount > 1 && (
                        < Button onClick={handleRemovePartner} variant="destructive" className="h-[35px] text-background rounded-md bg-background/10 hover:bg-background/10 my-0 py-0 has-[>svg]:px-2">
                            <Trash2 size={16} />
                        </Button>
                    )}
                    <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={handleAddPartner} >
                        <Plus />
                    </div>
                </div>
            </header >


                <div className="space-y-4 sm:space-y-5 relative">

                    {/* ======================= BOTAO - SELECIONA SOCIO, MULHER, FILHO(A) ======================= */}
                    <nav className="flex justify-center items-center gap-4 w-full">
                        {personSteps.map((step, index) => (
                            <div
                                key={index}
                                onClick={() => handleChangePerson(step.type)}
                                className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                            >
                                <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                                    <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium"><span className="hidden sm:block">{step.icon()}</span> {step.label} {step.type === FormType.CHILD && filhoCount > 0 && `(${filhoCount.toString().padStart(2, '0')})`}</span>
                                </div>
                                {step.type === activePersonStep && (
                                    <span className="w-full h-[5px] rounded-xs bg-primary" />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CHECKBOX - FILHOS, NETOS, BISNETOS */}
                    {/* {activePersonStep === FormType.CHILD && (
                    )} */}
                    <div className="flex justify-center items-center gap-4 w-full">
                        {filhoCount > 0 && (
                            <div className="flex items-center gap-2 text-nowrap">
                                {/* {netoCount > 0 && (<Checkbox onCheckedChange={handleFilhoCheckboxChange} />)} */}
                                Filhos {filhoCount > 0 && `(${filhoCount.toString().padStart(2, '0')})`}
                            </div>
                        )}
                        {netoCount > 0 && (
                            <div className="flex items-center gap-2 text-nowrap">
                                {/* <Checkbox onCheckedChange={handleNetoCheckboxChange} /> */}
                                Netos {netoCount > 0 && `(${netoCount.toString().padStart(2, '0')})`}
                            </div>
                        )}
                        {bisnetoCount > 0 && (
                            <div className="flex items-center gap-2 text-nowrap">
                                {/* <Checkbox onCheckedChange={handleGreatNetoCheckboxChange} /> */}
                                Bisnetos {`(${bisnetoCount.toString().padStart(2, '0')})`}
                            </div>
                        )}
                    </div>

                    {activePersonStep === FormType.CHILD && (
                        <>
                            {/* <hr className="border-t border-t-orange-400" />
                            <span className="text-orange-400">Filhos</span> */}
                            {/* ======================= FILHO ======================= */}
                            {showFilho && (
                                <>
                                    <div className="relative flex flex-col-reverse sm:flex-row justify-center gap-2 items-center w-full">
                                        <>
                                            <div className="flex gap-2">
                                                {Array.from({ length: filhoCount }).map((_, index) => (
                                                    <div key={index} onClick={() => handleChangeActiveFilho(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                                                        <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                                            <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                                                        </div>

                                                        {/* Indica o filho atual */}
                                                        {index === filhoSelected && (
                                                            <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex self-end gap-2 sm:absolute right-0 top-0">
                                                {/* Remove person button in each person's form */}
                                                {filhoCount > 0 && (
                                                    < Button onClick={handleRemoveFilho} variant="destructive" className="h-[35px] rounded-md bg-background/10 hover:bg-background/10 my-0 py-0 has-[>svg]:px-2">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                )}
                                                <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={handleAddFilho} >
                                                    <Plus />
                                                </div>
                                            </div>
                                        </>
                                    </div>

                                    {/* BOTOES FILHO */}
                                    {filhoCount > 0 && (
                                        <>
                                            {filhoCount > 1 && <p className="flex items-center w-full">{todosDadosValidados[activePartnerStep].filho[filhoSelected] &&todosDadosValidados[activePartnerStep].filho[filhoSelected].name}</p>}
                                            <nav className="flex justify-center items-center gap-4 w-full">
                                                {personSteps.map((step, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleChangeFilho(step.type)}
                                                        className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                                                    >
                                                        <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                                                            <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium"><span className="hidden sm:block">{step.icon()}</span> {step.label} {step.type === FormType.CHILD && netoCount > 0 && `(${netoCount.toString().padStart(2, '0')})`}</span>
                                                        </div>
                                                        {step.type === activeFilhoStep && (
                                                            <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                        )}
                                                    </div>
                                                ))}
                                            </nav>
                                        </>
                                    )}
                                </>
                            )}

                            {showNeto && filhoCount > 0 && activeFilhoStep === FormType.CHILD && (
                                <>
                                    {/* <hr className="border-t border-t-orange-400" />
                                    <span className="text-orange-400">Netos</span> */}
                                    {/* =============================== NETO =============================== */}
                                    <div className="flex flex-col-reverse sm:flex-row relative justify-center items-center gap-2 w-full">
                                        <div className="flex gap-2">
                                            {Array.from({ length: netoCount }).map((_, index) => (
                                                <div key={index} onClick={() => handleChangeActiveNeto(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                                                    <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                                        <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                                                    </div>

                                                    {/* Indica o neto atual */}
                                                    {index === netoSelected && (
                                                        <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex self-end gap-2 sm:absolute right-0 top-0">
                                            {/* Remove person button in each person's form */}
                                            {netoCount > 0 && (
                                                < Button onClick={handleRemoveNeto} variant="destructive" className="h-[35px] rounded-md bg-background/10 hover:bg-background/10 my-0 py-0 has-[>svg]:px-2">
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                            <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={handleAddNeto} >
                                                <Plus />
                                            </div>
                                        </div>
                                    </div>

                                    {/* BOTOES NETO */}
                                    {netoCount > 0 && (
                                        <nav className="flex justify-center items-center gap-4 w-full">
                                            {personSteps.map((step, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleChangeNeto(step.type)}
                                                    className="flex flex-col justify-between items-center w-full h-[49px] cursor-pointer"
                                                >
                                                    <div className="flex items-center justify-center w-full h-[35px] rounded-md bg-background/10">
                                                        <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium"><span className="hidden sm:block">{step.icon()}</span> {step.label}</span>
                                                    </div>
                                                    {step.type === activeNetoStep && (
                                                        <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                    )}
                                                </div>
                                            ))}
                                        </nav>
                                    )}
                                </>
                            )}

                            {showGreatNeto && netoCount > 0 && activeFilhoStep === FormType.CHILD && activeNetoStep === FormType.CHILD && (
                                <>
                                    {/* <hr className="border-t border-t-orange-400" />
                                    <span className="text-orange-400">Bisnetos</span> */}
                                    {/* =============================== BISNETO =============================== */}
                                    <div className="flex flex-col-reverse sm:flex-row relative justify-center items-center gap-2 w-full">
                                        <div className="flex gap-2">
                                            {Array.from({ length: bisnetoCount }).map((_, index) => (
                                                <div key={index} onClick={() => handleChangeActiveBisNeto(index)} className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer">
                                                    <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                                        <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                                                    </div>

                                                    {/* Indica o bisneto atual */}
                                                    {index === bisnetoSelected && (
                                                        <span className="w-full h-[5px] rounded-xs bg-primary" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex self-end gap-2 sm:absolute right-0 top-0">
                                            {/* Remove person button in each person's form */}
                                            {bisnetoCount > 0 && (
                                                < Button onClick={handleRemoveGreatNeto} variant="destructive" className="h-[35px] rounded-md bg-background/10 hover:bg-background/10 my-0 py-0 has-[>svg]:px-2">
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                            <div className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-md cursor-pointer" onClick={handleAddGreatNeto} >
                                                <Plus />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* TEXTO RELATIVO AOS BOTOES */}
                <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-background font-bold text-xl sm:text-2xl">Dados Pessoais</h2>
                    <p className="text-background text-sm sm:text-base">
                        {activePersonStep === FormType.PERSONAL && 'Informe seus dados pessoais'}
                        {activePersonStep === FormType.COUPLE && 'Informe os dados pessoais do seu cônjuge'}
                        {activePersonStep === FormType.CHILD && 'Informe os dados pessoais do seu filho(a)'}
                    </p>
                </div>

                {/* FORM - SOCIO */}
                {activePersonStep === FormType.PERSONAL && (
                    <Form {...socioForm}>
                        {/* <h2 className="bg-background text-primary">SOCIO</h2> */}
                        <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                            <FormField
                                control={socioForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={socioForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={socioForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
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
                                control={socioForm.control}
                                name="celphone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                        <FormControl className="text-xs sm:text-base px-0">
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
                )}
                {/* FORM - MULHER */}
                {activePersonStep === FormType.COUPLE && (
                    <Form {...mulherForm}>
                        {/* <h2 className="bg-background text-primary">MULHER</h2> */}
                        <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                            <FormField
                                control={mulherForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mulherForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mulherForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
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
                                control={mulherForm.control}
                                name="celphone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                        <FormControl className="text-xs sm:text-base px-0">
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
                )}
                {/* FORM - FILHO */}
                {activePersonStep === FormType.CHILD && filhoCount > 0 && activeFilhoStep === FormType.PERSONAL && (
                    <Form {...filhoForm}>
                        {/* <h2 className="bg-background text-primary">FILHO</h2> */}
                        <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                            <FormField
                                control={filhoForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={filhoForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={filhoForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
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
                                control={filhoForm.control}
                                name="celphone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                        <FormControl className="text-xs sm:text-base px-0">
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
                )}
                {/* FORM - MULHER DO FILHO */}
                {activePersonStep === FormType.CHILD && filhoCount > 0 && activeFilhoStep === FormType.COUPLE && (
                    <Form {...mulherDoFilhoForm}>
                        {/* <h2 className="bg-background text-primary">MULHER DO FILHO</h2> */}
                        <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                            <FormField
                                control={mulherDoFilhoForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mulherDoFilhoForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mulherDoFilhoForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
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
                                control={mulherDoFilhoForm.control}
                                name="celphone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                        <FormControl className="text-xs sm:text-base px-0">
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
                )}
                {/* FORM - NETO */}
                {activePersonStep === FormType.CHILD && filhoCount > 0 && activeFilhoStep === FormType.CHILD && activeNetoStep === FormType.PERSONAL && (
                    <Form {...netoForm}>
                        {/* <h2 className="bg-background text-primary">NETO</h2> */}
                        <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                            <FormField
                                control={netoForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={netoForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={netoForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
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
                                control={netoForm.control}
                                name="celphone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                        <FormControl className="text-xs sm:text-base px-0">
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
                )}
                {/* FORM - MULHER DO NETO */}
                {activePersonStep === FormType.CHILD && filhoCount > 0 && activeFilhoStep === FormType.CHILD && activeNetoStep === FormType.COUPLE && (
                    <Form {...mulherDoNetoForm}>
                        {/* <h2 className="bg-background text-primary">MULHER DO NETO</h2> */}
                        <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                            <FormField
                                control={mulherDoNetoForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mulherDoNetoForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mulherDoNetoForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
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
                                control={mulherDoNetoForm.control}
                                name="celphone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                        <FormControl className="text-xs sm:text-base px-0">
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
                )}
                {/* FORM - BISNETO */}
                {activePersonStep === FormType.CHILD && filhoCount > 0 && activeFilhoStep === FormType.CHILD && activeNetoStep === FormType.CHILD && (
                    <Form {...bisnetoForm}>
                        {/* <h2 className="bg-background text-primary">BISNETO</h2> */}
                        <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                            <FormField
                                control={bisnetoForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={bisnetoForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
                                            <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={bisnetoForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                        <FormControl className="px-0 text-xs sm:text-base">
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
                                control={bisnetoForm.control}
                                name="celphone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                        <FormControl className="text-xs sm:text-base px-0">
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
                )}

                {/* FORMULÁRIO */}
                {/* <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">
                    <FormField
                        control={personForm.control}
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
                        control={personForm.control}
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
                        control={personForm.control}
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
                        control={personForm.control}
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
                </form> */}

            <Form {...representanteForm}>
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
                    <form className="w-full max-md:max-w-full space-y-4 sm:space-y-6">

                        {/* Representative tabs - SEM FUNCIONALIDADE */}
                        <nav className="flex justify-center items-center gap-4 w-full">
                            {Array.from({ length: legalRepresentativesCount }).map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveRepresentativeStep(index)}
                                    className="flex flex-col justify-between items-center w-[35px] h-[49px] cursor-pointer"
                                >
                                    <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-md bg-background/10`}>
                                        <span className="flex gap-2 items-center text-background text-xs sm:text-base font-medium">{(index + 1).toString().padStart(2, '0')}</span>
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
                            control={representanteForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Nome</FormLabel>
                                    <FormControl className="px-0 text-xs sm:text-base">
                                        <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="Digite o nome completo" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={representanteForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Email</FormLabel>
                                    <FormControl className="px-0 text-xs sm:text-base">
                                        <Input className="placeholder:text-background/60 border-0 border-b border-b-background rounded-none focus-visible:ring-0" placeholder="exemplo@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={representanteForm.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">CPF</FormLabel>
                                    <FormControl className="px-0 text-xs sm:text-base">
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
                            control={representanteForm.control}
                            name="celphone"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-primary font-bold text-sm sm:text-base px-0">Celular</FormLabel>
                                    <FormControl className="text-xs sm:text-base px-0">
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
                <Button type="button" disabled={!todosDadosValidados.every(dado => dado.socio?.name)} className="rounded-md h-9 px-2" onClick={validateData}>Próximo</Button>
            </div>
        </>
    )
}