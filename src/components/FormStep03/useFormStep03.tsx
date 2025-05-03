import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {
    BisnetoFormData, bisnetoSchema,
    FilhoFormData, filhoSchema,
    MulherDoFilhoFormData, mulherDoFilhoSchema,
    MulherDoNetoFormData, mulherDoNetoSchema,
    MulherFormData, mulherSchema,
    NetoFormData, netoSchema,
    RepresentanteFormData, representanteSchema,
    SocioFormData, socioSchema,
    TodosDadosFormData,
    TodosDadosFormDataKeys
} from "./types";


enum FormType {
    PERSONAL = 'personal',
    COUPLE = 'couple',
    CHILD = 'filho',
    // LEGAL_REPRESENTATIVE = 'legalRepresentative'
}

enum LegalType {
    LEGAL_REPRESENTATIVE = 'legalRepresentative'
}

const personSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string(),
    // .min(14, "CPF deve ter 11 dígitos")
    // .transform((cpf) => cpf.replace(/[.|-]/g, ''))
    // .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string(),
    // .min(15, "Telefone deve ter 11 dígitos")
    // .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
    // .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // type: z.enum(["PERSONAL", "COUPLE", "CHILD", "LEGAL_REPRESENTATIVE"]),
    type: z.nativeEnum(FormType),
});

const legalSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string(),
    // .min(14, "CPF deve ter 11 dígitos")
    // .transform((cpf) => cpf.replace(/[.|-]/g, ''))
    // .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string(),
    // .min(15, "Telefone deve ter 11 dígitos")
    // .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
    // .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // type: z.enum(["PERSONAL", "COUPLE", "CHILD", "LEGAL_REPRESENTATIVE"]),
    type: z.nativeEnum(LegalType),
});

const formSchema = z.object({
    ...personSchema.shape,
    legalRepresentatives: z.array(legalSchema).optional()
});

type PersonFormData = z.infer<typeof formSchema>;
type LegalFormData = z.infer<typeof legalSchema>;

type PartnerData = {
    [FormType.PERSONAL]: {
        data: PersonFormData,
    },
    [FormType.COUPLE]?: {
        data: PersonFormData,
    },
    [FormType.CHILD]?: PartnerData[]
}

const newPartnerData: PartnerData = {
    [FormType.PERSONAL]: {
        data: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type: FormType.PERSONAL,
            legalRepresentatives: []
        }
    }
}
const newSocio: TodosDadosFormData = [{
    socio: {
        name: "",
        email: "",
        cpf: "",
        celphone: "",
        legalRepresentatives: []
    },
    mulher: {
        name: "",
        email: "",
        cpf: "",
        celphone: "",
        legalRepresentatives: []
    },
    filho: [],
    mulherDoFilho: [],
    neto: [],
    mulherDoNeto: [],
    bisneto: [],
}]

export function useFormStep03() {
    // SOCIO
    const [activePartnerStep, setActivePartnerStep] = useState(0)
    const [partnerCount, setPartnerCount] = useState(1)
    const [partnerData, setPartnerData] = useState<PartnerData[]>([newPartnerData])
    const [todosDadosValidados, setTodosDadosValidados] = useState<TodosDadosFormData>(newSocio)
    // window.localStorage.getItem('partnerData') ? JSON.parse(window.localStorage.getItem('partnerData') || '[]') as PartnerData[] : [newPartnerData]
    // console.log(JSON.stringify(partnerData, null, 4))

    // PESSOA
    const [activePersonStep, setActivePersonStep] = useState(FormType.PERSONAL)

    // FILHO
    const [activeFilhoStep, setActiveFilhoStep] = useState(FormType.PERSONAL)
    const [filhoCount, setFilhoCount] = useState(0)
    const [filhoSelected, setFilhoSelected] = useState(0)
    const [showFilho,] = useState(true)

    // NETO
    const [activeNetoStep, setActiveNetoStep] = useState(FormType.PERSONAL)
    const [netoCount, setNetoCount] = useState(0)
    const [netoSelected, setNetoSelected] = useState(0)
    const [showNeto,] = useState(true)

    // BISNETO
    const [bisnetoCount, setBisnetoCount] = useState(0)
    const [greatNetoSelected, setGreatNetoSelected] = useState(0)
    const [showGreatNeto,] = useState(true)

    // LEGAL REPRESENTATIVE
    const [showLegalForm, setShowLegalForm] = useState(false)
    const [legalRepresentativesCount, setLegalRepresentativesCount] = useState(0)
    const [activeRepresentativeStep, setActiveRepresentativeStep] = useState(0)

    const personForm = useForm<PersonFormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type: FormType.PERSONAL,
            legalRepresentatives: []
        }
    })

    const legalForm = useForm<LegalFormData>({
        resolver: zodResolver(legalSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type: LegalType.LEGAL_REPRESENTATIVE
        }
    })

    // NOVOS USEFORMS
    const socioForm = useForm<SocioFormData>({
        resolver: zodResolver(socioSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    const mulherForm = useForm<MulherFormData>({
        resolver: zodResolver(mulherSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    const filhoForm = useForm<FilhoFormData>({
        resolver: zodResolver(filhoSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    const mulherDoFilhoForm = useForm<MulherDoFilhoFormData>({
        resolver: zodResolver(mulherDoFilhoSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    const netoForm = useForm<NetoFormData>({
        resolver: zodResolver(netoSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    const mulherDoNetoForm = useForm<MulherDoNetoFormData>({
        resolver: zodResolver(mulherDoNetoSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    const bisnetoForm = useForm<BisnetoFormData>({
        resolver: zodResolver(bisnetoSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    const representanteForm = useForm<RepresentanteFormData>({
        resolver: zodResolver(representanteSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
        }
    })
    // NOVOS USEFORMS


    // VALIDACAO FORM SOCIO
    async function validaSocioForm() {
        await socioForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (activePersonStep === FormType.PERSONAL || activePersonStep === FormType.COUPLE) {
                    novoDadoValidado[activePartnerStep].socio = {
                        ...values,
                        legalRepresentatives: novoDadoValidado[activePartnerStep].socio.legalRepresentatives
                    };
                }
                console.log('novoDadoValidado validaSocioForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM MULHER
    async function validaMulherForm() {
        await mulherForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (activePersonStep === FormType.PERSONAL || activePersonStep === FormType.COUPLE) {
                    novoDadoValidado[activePartnerStep].mulher = {
                        ...values,
                        legalRepresentatives: novoDadoValidado[activePartnerStep].mulher.legalRepresentatives
                    };
                }
                console.log('novoDadoValidado validaMulherForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM FILHO
    async function validaFilhoForm() {
        await filhoForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (activeFilhoStep === FormType.PERSONAL || activeFilhoStep === FormType.COUPLE) {
                    if (novoDadoValidado[activePartnerStep].filho.length === 0) { 
                        novoDadoValidado[activePartnerStep].filho.push({
                            ...values,
                            legalRepresentatives: []
                        })
                    } else {
                        novoDadoValidado[activePartnerStep].filho[filhoSelected] = {
                            ...values,
                            legalRepresentatives: novoDadoValidado[activePartnerStep].filho[filhoSelected].legalRepresentatives
                        }
                    }
                }
                console.log('novoDadoValidado validaFilhoForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM MULHER DO FILHO
    async function validaMulherDoFilhoForm() {
        await mulherDoFilhoForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (activeFilhoStep === FormType.PERSONAL || activeFilhoStep === FormType.COUPLE) {
                    if (novoDadoValidado[activePartnerStep].mulherDoFilho.length === 0) { 
                        novoDadoValidado[activePartnerStep].mulherDoFilho.push({
                            ...values,
                            legalRepresentatives: []
                        })
                    } else {
                        novoDadoValidado[activePartnerStep].mulherDoFilho[filhoSelected] = {
                            ...values,
                            legalRepresentatives: novoDadoValidado[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives
                        }
                    }
                }
                console.log('novoDadoValidado validaMulherDoFilhoForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM NETO
    async function validaNetoForm() {
        await netoForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (activeNetoStep === FormType.PERSONAL || activeNetoStep === FormType.COUPLE) {
                    if (novoDadoValidado[activePartnerStep].neto.length === 0) { 
                        novoDadoValidado[activePartnerStep].neto.push({
                            ...values,
                            legalRepresentatives: []
                        })
                    } else {
                        novoDadoValidado[activePartnerStep].neto[netoSelected] = {
                            ...values,
                            legalRepresentatives: novoDadoValidado[activePartnerStep].neto[netoSelected].legalRepresentatives
                        }
                    }
                }
                console.log('novoDadoValidado validaNetoForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM MULHER DO NETO
    async function validaMulherDoNetoForm() {
        await mulherDoNetoForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (activeNetoStep === FormType.PERSONAL || activeNetoStep === FormType.COUPLE) {
                    if (novoDadoValidado[activePartnerStep].mulherDoNeto.length === 0) { 
                        novoDadoValidado[activePartnerStep].mulherDoNeto.push({
                            ...values,
                            legalRepresentatives: []
                        })
                    } else {
                        novoDadoValidado[activePartnerStep].mulherDoNeto[netoSelected] = {
                            ...values,
                            legalRepresentatives: novoDadoValidado[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives
                        }
                    }
                }
                console.log('novoDadoValidado validaMulherDoNetoForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM BISNETO
    async function validaBisnetoForm() {
        await bisnetoForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (novoDadoValidado[activePartnerStep].bisneto.length === 0) { 
                    novoDadoValidado[activePartnerStep].bisneto.push({
                        ...values,
                        legalRepresentatives: []
                    })
                } else {
                    novoDadoValidado[activePartnerStep].bisneto[greatNetoSelected] = {
                        ...values,
                        legalRepresentatives: novoDadoValidado[activePartnerStep].bisneto[greatNetoSelected].legalRepresentatives
                    }
                }
                console.log('novoDadoValidado validaBisnetoForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM LEGAL
    async function validaRepresentanteForm(actualForm: TodosDadosFormDataKeys) {
        console.log('actualForm validaRepresentanteForm() ', actualForm)
        await representanteForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                console.log('legalRepresentatives ', actualForm === 'socio' || actualForm === 'mulher' ? novoDadoValidado[activePartnerStep][actualForm].legalRepresentatives : novoDadoValidado[activePartnerStep][actualForm][filhoSelected].legalRepresentatives)
                if (actualForm === 'socio' || actualForm === 'mulher') {
                    novoDadoValidado[activePartnerStep][actualForm].legalRepresentatives = [
                        ...novoDadoValidado[activePartnerStep][actualForm].legalRepresentatives,
                        values
                    ];
                } else {
                    novoDadoValidado[activePartnerStep][actualForm][filhoSelected].legalRepresentatives = [
                        ...novoDadoValidado[activePartnerStep][actualForm][filhoSelected].legalRepresentatives,
                        values
                    ];
                }
                // novoDadoValidado[activePartnerStep][actualForm][actualSelected] = {
                //     ...novoDadoValidado[activePartnerStep][actualForm][actualSelected]
                //     legalRepresentatives: values
                // };
                // console.log('novoDadoValidado validaRepresentanteForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // ACOES SOCIO
    function handleAddPartner() {
        socioForm.clearErrors();
        socioForm.reset();
        mulherForm.clearErrors();
        mulherForm.reset();
        // personForm.reset();
        // personForm.clearErrors();
        setActivePersonStep(FormType.PERSONAL);
        setActiveFilhoStep(FormType.PERSONAL);
        setActiveNetoStep(FormType.PERSONAL);
        setFilhoCount(0);
        setNetoCount(0);
        setBisnetoCount(0);
        setPartnerCount(partnerCount + 1);
        setActivePartnerStep(partnerCount);
        setLegalRepresentativesCount(0);
        setActiveRepresentativeStep(0);
        setShowLegalForm(false);
        setTodosDadosValidados(prev => [...prev, ...newSocio]);
        // setPartnerData(prev => {
        //     // window.localStorage.setItem('partnerData', JSON.stringify([...prev, newPartnerData]))
        //     return [...prev, newPartnerData]
        // });
    }

    function handleRemovePartner() {
        setActivePartnerStep(partnerCount - 2);
        setPartnerCount(partnerCount - 1);
        const existingData = todosDadosValidados[partnerCount - 2].socio;

        // If there's existing data, set it in the form
        if (existingData) {
            socioForm.setValue('name', existingData.name);
            socioForm.setValue('email', existingData.email);
            socioForm.setValue('cpf', existingData.cpf);
            socioForm.setValue('celphone', existingData.celphone);
        }
        setTodosDadosValidados(prev => {
            // window.localStorage.setItem('partnerData', JSON.stringify(prev.slice(0, -1)))
            return prev.slice(0, -1)
        });
        setActivePersonStep(FormType.PERSONAL);
        setActiveFilhoStep(FormType.PERSONAL);
        setActiveNetoStep(FormType.PERSONAL);
    }

    function handleChangeActivePartner(index: number) {
        // console.log('DATA', JSON.stringify(partnerData, null, 4))
        // console.log('index', index)
        const existingData = todosDadosValidados[index].socio;

        // If there's existing data, set it in the form
        socioForm.clearErrors();
        if (existingData) {
            socioForm.setValue('name', existingData.name);
            socioForm.setValue('email', existingData.email);
            socioForm.setValue('cpf', existingData.cpf);
            socioForm.setValue('celphone', existingData.celphone);
        } else {
            socioForm.reset();
        }
        setActivePersonStep(FormType.PERSONAL);
        setActiveFilhoStep(FormType.PERSONAL);
        setActiveNetoStep(FormType.PERSONAL);
        setActivePartnerStep(index);
    }

    // ACOES PESSOA
    async function handleChangePerson(type: FormType) {
        // valido se legalForm tá aberto e se tocou no form
        if (showLegalForm) {
            // const validForm = await legalForm.trigger()
            // if (!validForm) return;

            await legalForm.handleSubmit((values) => {
                // console.log(values)
                // console.log('partnerData ', JSON.stringify(partnerData, null, 4))
                // console.log(activePersonStep)
                // console.log(type)

                // console.log('activePersonStep', (activePersonStep === FormType.PERSONAL || activePersonStep === FormType.COUPLE))
                // console.log('partnerData',(partnerData[activePartnerStep][activePersonStep]))
                setPartnerData(prev => {
                    const newData = prev;
                    if (activePersonStep === FormType.PERSONAL || activePersonStep === FormType.COUPLE) {
                        if (newData[activePartnerStep][activePersonStep]) {
                            const oldLegalRepresentatives = newData[activePartnerStep][activePersonStep].data.legalRepresentatives || [];
                            console.log('oldLegalRepresentatives ', oldLegalRepresentatives)
                            newData[activePartnerStep][activePersonStep].data.legalRepresentatives = [...oldLegalRepresentatives, values]
                        }
                    }
                    // window.localStorage.setItem('partnerData', JSON.stringify(newData))
                    console.log('newData ', JSON.stringify(newData, null, 4))
                    return newData;
                });
            })();
        }

        // VALIDA O SOCIO FORM
        if (activePersonStep === FormType.PERSONAL || socioForm.formState.isDirty) {
            const validForm = await socioForm.trigger()
            if (!validForm) return;
            await validaSocioForm();
        }

        // VALIDA O MULHER FORM
        if (mulherForm.formState.isDirty) {
            const validForm = await mulherForm.trigger()
            if (!validForm) return;
            await validaMulherForm();
        }

        // Check if there's existing data for this type
        if (type === FormType.COUPLE) {
            const existingData = todosDadosValidados[activePartnerStep].mulher;
            if (existingData) {
                mulherForm.setValue('name', existingData.name);
                mulherForm.setValue('email', existingData.email);
                mulherForm.setValue('cpf', existingData.cpf);
                mulherForm.setValue('celphone', existingData.celphone);
            } else {
                mulherForm.reset();
            }
        } else {
            mulherForm.reset();
        }

        setActivePersonStep(type);
        setShowLegalForm(false);
        if (type === FormType.CHILD) {
            setActiveFilhoStep(FormType.PERSONAL);
            setActiveNetoStep(FormType.PERSONAL);
        }
        if (type === FormType.CHILD && filhoCount === 0) {
            setFilhoCount(1);
        }

        // console.log('partnerData ', JSON.stringify(partnerData, null, 4))
    }

    // ACOES FILHO
    async function handleChangeFilho(type: FormType) {
        // valido se tocou no form ou se é socio
        if (activePersonStep === FormType.PERSONAL || personForm.formState.isDirty || netoCount !== 0) {
            // const validForm = await personForm.trigger()
            // if (!validForm) return;
        }

        // VALIDA O FILHO FORM
        if (activeFilhoStep === FormType.PERSONAL || filhoForm.formState.isDirty) {
            const validForm = await filhoForm.trigger()
            if (!validForm) return;
            await validaFilhoForm();
        }

        // VALIDA O MULHER DO FILHO FORM
        if (mulherDoFilhoForm.formState.isDirty) {
            const validForm = await mulherDoFilhoForm.trigger()
            if (!validForm) return;
            await validaMulherDoFilhoForm();
        }

        // Check if there's existing data for this type
        if (type === FormType.COUPLE) {
            const existingData = todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected];
            if (existingData) {
                mulherDoFilhoForm.setValue('name', existingData.name);
                mulherDoFilhoForm.setValue('email', existingData.email);
                mulherDoFilhoForm.setValue('cpf', existingData.cpf);
                mulherDoFilhoForm.setValue('celphone', existingData.celphone);
            } else {
                mulherDoFilhoForm.reset();
            }
        } else {
            mulherDoFilhoForm.reset();
        }


        setActiveFilhoStep(type);
        setShowLegalForm(false);
        if (type === FormType.CHILD) {
            setActiveNetoStep(FormType.PERSONAL);
        }
        if (type === FormType.CHILD && netoCount === 0) {
            setNetoCount(1);
        }
    }

    async function handleAddFilho() {
        if (mulherDoFilhoForm.formState.isDirty) {
            const validForm = mulherDoFilhoForm.trigger()
            if (!validForm) return;
            await validaMulherDoFilhoForm();
        }
        
        if (filhoCount === 0) {
            setNetoCount(0);
            setBisnetoCount(0);
        }

        setActiveFilhoStep(FormType.PERSONAL);
        setFilhoCount(filhoCount + 1);
        setFilhoSelected(filhoCount);
        filhoForm.clearErrors();
        filhoForm.reset();
        mulherDoFilhoForm.clearErrors();
        mulherDoFilhoForm.reset();
    }

    function handleRemoveFilho() {
        if (filhoCount === 1) {
            setNetoCount(0);
            setBisnetoCount(0);
            setFilhoSelected(0);
        }

        const existingData = todosDadosValidados[activePartnerStep].filho[filhoCount - 2]
        if (existingData) {
            filhoForm.setValue('name', existingData.name);
            filhoForm.setValue('email', existingData.email);
            filhoForm.setValue('cpf', existingData.cpf);
            filhoForm.setValue('celphone', existingData.celphone);
            filhoForm.clearErrors();
        }

        setTodosDadosValidados(prev => {
            const novosFilhos = prev[activePartnerStep].filho.slice(0, -1)
            const novasMulheresDoFilho = prev[activePartnerStep].mulherDoFilho.slice(0, -1)
            console.log('novosFilhos ', novosFilhos)
            console.log('novasMulheresDoFilho ', novasMulheresDoFilho)
            const newData = prev[activePartnerStep]
            newData.filho = novosFilhos
            newData.mulherDoFilho = novasMulheresDoFilho
            return [
                ...prev,
                newData
            ]
        })
        setFilhoCount(filhoCount - 1);
        setFilhoSelected(filhoCount - 2);
        setActiveFilhoStep(FormType.PERSONAL);
        // console.log('filhos ', partnerData[activePartnerStep][FormType.CHILD].length > 0 ? partnerData[activePartnerStep][FormType.CHILD].length : 0)
        // if (partnerData[activePartnerStep][FormType.CHILD] && partnerData[activePartnerStep][FormType.CHILD].length > 0) {
        //     const newData = partnerData[activePartnerStep][FormType.CHILD].slice(-1)
        //     console.log('newData filhos ', newData[activePartnerStep][FormType.CHILD]?.length)
        //     if (newData[activePartnerStep][FormType.CHILD]?.length === 0) {
        //         personForm.reset();
        //     }
        //     setPartnerData(newData)
        // }
    }

    async function handleChangeActiveFilho(index: number) {
        // VALIDA FILHO FORM E MULHER DO FILHO FORM
        if (filhoForm.formState.isDirty) {
            const validForm = await filhoForm.trigger()
            if (!validForm) return;
            await validaFilhoForm();
        }
        if (mulherDoFilhoForm.formState.isDirty) {
            const validForm = await mulherDoFilhoForm.trigger()
            if (!validForm) return;
            await validaMulherDoFilhoForm();
        }
        
        // SETA OS VALORES DO FILHO E MULHER DO FILHO SE JA EXISTEM
        const existingFilho = todosDadosValidados[activePartnerStep].filho[index]
        if (existingFilho) {
            filhoForm.setValue('name', existingFilho.name);
            filhoForm.setValue('email', existingFilho.email);
            filhoForm.setValue('cpf', existingFilho.cpf);
            filhoForm.setValue('celphone', existingFilho.celphone);
        } else {
            filhoForm.reset();
        }
        const existingMulher = todosDadosValidados[activePartnerStep].mulherDoFilho[index]
        if (existingMulher) {
            mulherDoFilhoForm.setValue('name', existingMulher.name);
            mulherDoFilhoForm.setValue('email', existingMulher.email);
            mulherDoFilhoForm.setValue('cpf', existingMulher.cpf);
            mulherDoFilhoForm.setValue('celphone', existingMulher.celphone);
        } else {
            mulherDoFilhoForm.reset();
        }
        setActiveFilhoStep(FormType.PERSONAL);
        setFilhoSelected(index);
    }

    // ACOES NETO
    async function handleChangeNeto(type: FormType) {
        // VALIDA NETO FORM E MULHER DO NETO FORM
        if (activeNetoStep === FormType.PERSONAL || netoForm.formState.isDirty) {
            const validForm = await netoForm.trigger()
            if (!validForm) return;
            await validaNetoForm();
        }
        if (mulherDoNetoForm.formState.isDirty) {
            const validForm = await mulherDoNetoForm.trigger()
            if (!validForm) return;
            await validaMulherDoNetoForm();
        }

        
        setActiveNetoStep(type);
        setShowLegalForm(false);
        if (type === FormType.CHILD && bisnetoCount === 0) {
            setBisnetoCount(1);
        }
    }

    async function handleChangeActiveNeto(index: number) {
        // VALIDA NETO FORM
        if (netoForm.formState.isDirty) {
            const validForm = await netoForm.trigger()
            if (!validForm) return;
            await validaNetoForm();
        }
        
        // VALIDA MULHER DO NETO FORM
        if (mulherDoNetoForm.formState.isDirty) {
            const validForm = await mulherDoNetoForm.trigger()
            if (!validForm) return;
            await validaMulherDoNetoForm();
        }
        
        // SETA OS VALORES DO NETO SE JA EXISTEM
        const existingNeto = todosDadosValidados[activePartnerStep].neto[index]
        if (existingNeto) {
            netoForm.setValue('name', existingNeto.name);
            netoForm.setValue('email', existingNeto.email);
            netoForm.setValue('cpf', existingNeto.cpf);
            netoForm.setValue('celphone', existingNeto.celphone);
        } else {
            netoForm.reset();
        }

        // SETA OS VALORES DO MULHER DO NETO SE JA EXISTEM
        const existingMulher = todosDadosValidados[activePartnerStep].mulherDoNeto[index]
        if (existingMulher) {
            mulherDoNetoForm.setValue('name', existingMulher.name);
            mulherDoNetoForm.setValue('email', existingMulher.email);
            mulherDoNetoForm.setValue('cpf', existingMulher.cpf);
            mulherDoNetoForm.setValue('celphone', existingMulher.celphone);
        } else {
            mulherDoNetoForm.reset();
        }
        
        setActiveNetoStep(FormType.PERSONAL);
        setNetoSelected(index);
    }

    async function handleAddNeto() {
        if (mulherDoNetoForm.formState.isDirty) {
            const validForm = await mulherDoNetoForm.trigger()
            if (!validForm) return;
            await validaMulherDoNetoForm();
        }

        if (netoCount === 0) {
            setBisnetoCount(0);
        }
        setActiveNetoStep(FormType.PERSONAL)
        setNetoSelected(netoCount)
        setNetoCount(netoCount + 1)
        netoForm.clearErrors();
        netoForm.reset();
        mulherDoNetoForm.clearErrors();
        mulherDoNetoForm.reset();
    }

    function handleRemoveNeto() {
        if (netoCount === 1) {
            setBisnetoCount(0);
            setNetoSelected(0);
        }
        setActiveNetoStep(FormType.PERSONAL)
        setNetoCount(netoCount - 1)
        setNetoSelected(netoCount - 2)
    }

    // ACOES BISNETO
    async function handleAddGreatNeto() {
        const validForm = await bisnetoForm.trigger()
        if (!validForm) return;
        await validaBisnetoForm();
        setGreatNetoSelected(bisnetoCount)
        setBisnetoCount(bisnetoCount + 1)
        bisnetoForm.reset();
    }

    function handleRemoveGreatNeto() {
        setBisnetoCount(bisnetoCount - 1)
        setGreatNetoSelected(bisnetoCount - 2)
    }

    // ACOES CHECKBOX
    function handleFilhoCheckboxChange() {
        // setShowNeto(!showNeto);
        // setShowGreatNeto(!showGreatNeto);
    }

    function handleNetoCheckboxChange() {
        // setShowFilho(!showFilho);
        // setShowGreatNeto(!showGreatNeto);
    }

    function handleGreatNetoCheckboxChange() {
        // setShowFilho(!showFilho);
        // setShowNeto(!showNeto);
    }

    // ACOES LEGAL
    async function handleAddLegalRepresentative() {
        if (legalRepresentativesCount > 0) {
            const validForm = await representanteForm.trigger()
            if (!validForm) return;
            await validaRepresentanteForm('socio');
            representanteForm.reset();
        }
        setShowLegalForm(true);

        setLegalRepresentativesCount(legalRepresentativesCount + 1);
        setActiveRepresentativeStep(legalRepresentativesCount);
        legalForm.reset();
        legalForm.clearErrors();
    }

    function handleRemoveLegalRepresentative() {
        setActiveRepresentativeStep(legalRepresentativesCount - 2);
        setLegalRepresentativesCount(legalRepresentativesCount - 1);
        if (legalRepresentativesCount === 1) {
            setShowLegalForm(false);
            legalForm.clearErrors();
        }
    }

    useEffect(() => {
        if (partnerData[0][FormType.PERSONAL]) {
            personForm.setValue('name', partnerData[0][FormType.PERSONAL].data.name);
            personForm.setValue('email', partnerData[0][FormType.PERSONAL].data.email);
            personForm.setValue('cpf', partnerData[0][FormType.PERSONAL].data.cpf);
            personForm.setValue('celphone', partnerData[0][FormType.PERSONAL].data.celphone);
        }
        if (partnerData[0][FormType.PERSONAL].data.legalRepresentatives && partnerData[0][FormType.PERSONAL].data.legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            setLegalRepresentativesCount(partnerData[0][FormType.PERSONAL].data.legalRepresentatives.length)
            partnerData[0][FormType.PERSONAL].data.legalRepresentatives.map(legal => {
                legalForm.setValue('name', legal.name);
                legalForm.setValue('email', legal.email);
                legalForm.setValue('cpf', legal.cpf);
                legalForm.setValue('celphone', legal.celphone);
            })
        }
    }, [])


    const partnerActions = {
        activePartnerStep,
        setActivePartnerStep,
        partnerCount,
        handleAddPartner,
        handleRemovePartner,
        handleChangeActivePartner,
    }

    const personActions = {
        personForm,
        activePersonStep,
        handleChangePerson,
    }

    const filhoActions = {
        activeFilhoStep,
        setActiveFilhoStep,
        filhoCount,
        setFilhoCount,
        filhoSelected,
        setFilhoSelected,
        handleChangeFilho,
        handleAddFilho,
        handleRemoveFilho,
        handleFilhoCheckboxChange,
        showFilho,
        handleChangeActiveFilho
    }

    const netoActions = {
        activeNetoStep,
        setActiveNetoStep,
        netoCount,
        setNetoCount,
        netoSelected,
        setNetoSelected,
        handleChangeNeto,
        showNeto,
        handleNetoCheckboxChange,
        handleAddNeto,
        handleRemoveNeto,
        handleChangeActiveNeto,
    }

    const greatNetoActions = {
        bisnetoCount,
        setBisnetoCount,
        greatNetoSelected,
        setGreatNetoSelected,
        showGreatNeto,
        handleGreatNetoCheckboxChange,
        handleAddGreatNeto,
        handleRemoveGreatNeto,
    }

    const legalActions = {
        legalForm,
        activeRepresentativeStep,
        setActiveRepresentativeStep,
        legalRepresentativesCount,
        showLegalForm,
        handleAddLegalRepresentative,
        handleRemoveLegalRepresentative,
        representanteForm
    }

    const novosForms = {
        todosDadosValidados,
        socioForm,
        mulherForm,
        filhoForm,
        mulherDoFilhoForm,
        netoForm,
        mulherDoNetoForm,
        bisnetoForm,
    }

    return {
        partnerActions,
        personActions,
        filhoActions,
        netoActions,
        greatNetoActions,
        legalActions,
        novosForms
    }
}
