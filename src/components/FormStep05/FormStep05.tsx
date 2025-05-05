import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface FormStep05Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
    activeStep: number
}

const initialFormStepOption = {
    trabalhista: false,
    familiar: false,
    tributario: false,
    execucao: false,
    recuperacao_judicial: false,
    improbabilidade_administrativa: false,
    outros: false,
    nao_possuo: false
}

export default function FormStep05({ handleNextStep, handlePreviousStep, activeStep }: FormStep05Props) {
    const [formStepOption, setFormStepOption] = useState<typeof initialFormStepOption>(initialFormStepOption)
    return (
        <>
            <div className="flex overflow-y-scroll sm:overflow-auto gap-4 sm:gap-10 z-0 grow flex-col p-5 sm:px-10 sm:pt-6 rounded-xl shadow-lg bg-background/10 w-full sm:max-w-[700px] sm:h-[886px] sm:flex-1">
                <div className="h-full pt-5 sm:pt-14">
                    <h1 className="text-background font-bold text-sm sm:text-2xl mb-2.5 sm:mb-4">Possui algum tipo de litígio atualmente?</h1>
                    <h2 className="text-grey-light text-sm sm:text-base mb-6 sm:mb-8">É possível selecionar mais de uma opção. Selecione quantos itens desejar.
                    </h2>
                    <div className="flex  flex-col justify-center text-xs sm:text-sm gap-4 w-full">
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['trabalhista'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, trabalhista: !!checked })} />
                            Trabalhista
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['familiar'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, familiar: !!checked })} />
                            Familiar
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['tributario'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, tributario: !!checked })} />
                            Tributário
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['execucao'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, execucao: !!checked })} />
                            Execução
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['recuperacao_judicial'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, recuperacao_judicial: !!checked })} />
                            Recuperação Judicial
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['improbabilidade_administrativa'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, improbabilidade_administrativa: !!checked })} />
                            Improbabilidade Administrativa
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['outros'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, outros: !!checked })} />
                            Outros
                        </div>
                        <div className="flex items-center gap-2 text-nowrap">
                            <Checkbox className="data-[state=checked]:text-background" checked={formStepOption['nao_possuo'] === true} onCheckedChange={(checked) => setFormStepOption({ ...initialFormStepOption, nao_possuo: !!checked })} />
                            Não Possuo
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-between">
                    <Button variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                    <Button type="button" disabled={Object.values(formStepOption).every(value => !value)} className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
                </div>
            </div>
            {/* Mobile footer*/}
            <footer className="w-full sm:hidden flex z-10 gap-4 justify-between items-center">
                <Button variant={activeStep === 1 ? 'ghost' : 'default'} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 1 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 1 ? undefined : handlePreviousStep}>Anterior</Button>
                <Button variant="ghost" className="flex-1 bg-background/10 hover:bg-background/10 cursor-default rounded-md hover:text-grey-light text-grey-light h-9 px-2">Etapa {activeStep < 10 ? `0${activeStep}` : activeStep}/25</Button>
                <Button variant={activeStep === 25 ? 'ghost' : 'default'} disabled={Object.values(formStepOption).every(value => !value)} className={`flex-1 rounded-md h-9 px-2 ${activeStep === 25 ? 'bg-grey-light text-grey-dark' : ''}`} onClick={activeStep === 25 ? undefined : handleNextStep}>Próximo</Button>
            </footer>
        </>
    )
}