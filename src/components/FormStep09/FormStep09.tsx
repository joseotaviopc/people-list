import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface FormStep09Props {
    handleNextStep: () => void,
    handlePreviousStep: () => void,
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

export default function FormStep09({ handleNextStep, handlePreviousStep }: FormStep09Props) {
    const [formStepOption, setFormStepOption] = useState<typeof initialFormStepOption>(initialFormStepOption)
    return (
        <>
            <div className="h-full pt-5 sm:pt-14">
                {/* TODO: Update title and description for Step 09 */}
                <h1 className="text-background font-bold text-sm sm:text-2xl mb-2.5 sm:mb-4">Possui algum tipo de litígio atualmente? (Step 09)</h1>
                <h2 className="text-grey-light text-sm sm:text-base mb-6 sm:mb-8">É possível selecionar mais de uma opção. Selecione quantos itens desejar.
                </h2>
                <div className="flex  flex-col justify-center text-xs sm:text-sm gap-4 w-full">
                    {/* TODO: Update options for Step 09 */}
                    <div className="flex items-center gap-2 text-nowrap">
                        <Checkbox checked={formStepOption['trabalhista'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, trabalhista: !!checked })} />
                        Trabalhista
                    </div>
                    {/* ... other checkbox options ... */}
                    <div className="flex items-center gap-2 text-nowrap">
                        <Checkbox checked={formStepOption['outros'] === true} onCheckedChange={(checked) => setFormStepOption({ ...formStepOption, nao_possuo: false, outros: !!checked })} />
                        Outros
                    </div>
                    <div className="flex items-center gap-2 text-nowrap">
                        <Checkbox checked={formStepOption['nao_possuo'] === true} onCheckedChange={(checked) => setFormStepOption({ ...initialFormStepOption, nao_possuo: !!checked })} />
                        Não Possuo
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-end sm:justify-between">
                <Button variant="ghost" className="rounded-md h-9 px-2 bg-grey-light text-grey-dark" onClick={handlePreviousStep}>Anterior</Button>
                <Button type="button" disabled={Object.values(formStepOption).every(value => !value)} className="rounded-md h-9 px-2" onClick={handleNextStep}>Próximo</Button>
            </div>
        </>
    )
}