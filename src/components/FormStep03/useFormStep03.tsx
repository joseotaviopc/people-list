import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { cpfMask, phoneMask } from "@/helpers"


enum FormType {
    PERSONAL = 'personal',
    COUPLE = 'couple',
    CHILD = 'filho',
    // LEGAL_REPRESENTATIVE = 'legalRepresentative'
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
    const [todosDadosValidados, setTodosDadosValidados] = useState<TodosDadosFormData>(newSocio)

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
    const [bisnetoSelected, setBisnetoSelected] = useState(0)
    const [showGreatNeto,] = useState(true)

    // LEGAL REPRESENTATIVE
    const [showLegalForm, setShowLegalForm] = useState(false)
    const [legalRepresentativesCount, setLegalRepresentativesCount] = useState(0)
    const [activeRepresentativeStep, setActiveRepresentativeStep] = useState(0)

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
                // console.log('novoDadoValidado validaSocioForm() ', JSON.stringify(novoDadoValidado, null, 4))
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
                // console.log('novoDadoValidado validaMulherForm() ', JSON.stringify(novoDadoValidado, null, 4))
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
                            legalRepresentatives: novoDadoValidado[activePartnerStep].filho[filhoSelected] ? novoDadoValidado[activePartnerStep].filho[filhoSelected].legalRepresentatives : []
                        }
                    }
                }
                // console.log('novoDadoValidado validaFilhoForm() ', JSON.stringify(novoDadoValidado, null, 4))
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
                            legalRepresentatives: novoDadoValidado[activePartnerStep].mulherDoFilho[filhoSelected] ? novoDadoValidado[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives : []
                        }
                    }
                }
                // console.log('novoDadoValidado validaMulherDoFilhoForm() ', JSON.stringify(novoDadoValidado, null, 4))
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
                            legalRepresentatives: novoDadoValidado[activePartnerStep].neto[netoSelected] ? novoDadoValidado[activePartnerStep].neto[netoSelected].legalRepresentatives : []
                        }
                    }
                }
                // console.log('novoDadoValidado validaNetoForm() ', JSON.stringify(novoDadoValidado, null, 4))
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
                            legalRepresentatives: novoDadoValidado[activePartnerStep].mulherDoNeto[netoSelected] ? novoDadoValidado[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives : []
                        }
                    }
                }
                // console.log('novoDadoValidado validaMulherDoNetoForm() ', JSON.stringify(novoDadoValidado, null, 4))
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
                    novoDadoValidado[activePartnerStep].bisneto[bisnetoSelected] = {
                        ...values,
                        legalRepresentatives: novoDadoValidado[activePartnerStep].bisneto[bisnetoSelected] ? novoDadoValidado[activePartnerStep].bisneto[bisnetoSelected].legalRepresentatives : []
                    }
                }
                // console.log('novoDadoValidado validaBisnetoForm() ', JSON.stringify(novoDadoValidado, null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // VALIDACAO FORM LEGAL
    async function validaRepresentanteForm(actualForm: TodosDadosFormDataKeys) {
        await representanteForm.handleSubmit((values) => {
            setTodosDadosValidados(prev => {
                const novoDadoValidado = prev;
                if (actualForm === 'socio' || actualForm === 'mulher') {
                    novoDadoValidado[activePartnerStep][actualForm].legalRepresentatives[activeRepresentativeStep] = values;
                }
                if (actualForm === 'filho' || actualForm === 'mulherDoFilho') {
                    novoDadoValidado[activePartnerStep][actualForm][filhoSelected].legalRepresentatives[activeRepresentativeStep] = values;
                }
                if (actualForm === 'neto' || actualForm === 'mulherDoNeto') {
                    novoDadoValidado[activePartnerStep][actualForm][netoSelected].legalRepresentatives[activeRepresentativeStep] = values;
                }
                if (actualForm === 'bisneto') {
                    novoDadoValidado[activePartnerStep][actualForm][bisnetoSelected].legalRepresentatives[activeRepresentativeStep] = values;
                }
                // console.log('novoDadoValidado validaRepresentanteForm() ', JSON.stringify(novoDadoValidado[activePartnerStep], null, 4))
                return novoDadoValidado;
            });
        })();
    }
    // 
    async function validateRepresentanteByType(type: TodosDadosFormDataKeys) {
        if (representanteForm.formState.isDirty) {
            const validLegalForm = await representanteForm.trigger()
            if (!validLegalForm) return
            await validaRepresentanteForm(type);
        }
    }

    // VALIDA TODOS OS FORMS
    async function validateDataBeforeNextStep() {
        if (socioForm.formState.isDirty) {
            const validForm = await socioForm.trigger()
            if (!validForm) return
            await validaSocioForm();
            await validateRepresentanteByType('socio');
        }
        if (mulherForm.formState.isDirty) {
            const validForm = await mulherForm.trigger()
            if (!validForm) return
            await validaMulherForm();
            await validateRepresentanteByType('mulher');
        }
        if (filhoForm.formState.isDirty) {
            const validForm = await filhoForm.trigger()
            if (!validForm) return
            await validaFilhoForm();
            await validateRepresentanteByType('filho');
        }
        if (mulherDoFilhoForm.formState.isDirty) {
            const validForm = await mulherDoFilhoForm.trigger()
            if (!validForm) return
            await validaMulherDoFilhoForm();
            await validateRepresentanteByType('mulherDoFilho');
        }
        if (netoForm.formState.isDirty) {
            const validForm = await netoForm.trigger()
            if (!validForm) return
            await validaNetoForm();
            await validateRepresentanteByType('neto');
        }
        if (mulherDoNetoForm.formState.isDirty) {
            const validForm = await mulherDoNetoForm.trigger()
            if (!validForm) return
            await validaMulherDoNetoForm();
            await validateRepresentanteByType('mulherDoNeto');
        }
        if (bisnetoForm.formState.isDirty) {
            const validForm = await bisnetoForm.trigger()
            if (!validForm) return
            await validaBisnetoForm();
            await validateRepresentanteByType('bisneto');
        }
    }

    // ACOES SOCIO
    async function handleAddPartner() {
        console.log('handleAddPartner')
        // VALIDA O SOCIO FORM
        if (socioForm.formState.isDirty) {
            console.log('validando socioForm')
            const validForm = await socioForm.trigger()
            if (!validForm) return;
            await validaSocioForm();
            socioForm.clearErrors();
            socioForm.reset();
        }

        // VALIDA O MULHER FORM
        if (mulherForm.formState.isDirty) {
            console.log('validando mulherForm')
            const validForm = await mulherForm.trigger()
            if (!validForm) return;
            await validaMulherForm();
            mulherForm.clearErrors();
            mulherForm.reset();
        }

        // VALIDA FILHO FORM
        if (filhoForm.formState.isDirty) {
            console.log('validando filhoForm')
            const validForm = await filhoForm.trigger()
            if (!validForm) return;
            await validaFilhoForm();
            filhoForm.clearErrors();
            filhoForm.reset();
        }

        // VALIDA MULHER DO FILHO FORM
        if (mulherDoFilhoForm.formState.isDirty) {
            console.log('validando mulherDoFilhoForm')
            const validForm = await mulherDoFilhoForm.trigger()
            if (!validForm) return;
            await validaMulherDoFilhoForm();
            mulherDoFilhoForm.clearErrors();
            mulherDoFilhoForm.reset();
        }

        // VALIDA NETO FORM
        if (netoForm.formState.isDirty) {
            console.log('validando netoForm')
            const validForm = await netoForm.trigger()
            if (!validForm) return;
            await validaNetoForm();
            netoForm.clearErrors();
            netoForm.reset();
        }

        // VALIDA MULHER DO NETO FORM
        if (mulherDoNetoForm.formState.isDirty) {
            console.log('validando mulherDoNetoForm')
            const validForm = await mulherDoNetoForm.trigger()
            if (!validForm) return;
            await validaMulherDoNetoForm();
            mulherDoNetoForm.clearErrors();
            mulherDoNetoForm.reset();
        }

        // VALIDA BISNETO FORM
        if (bisnetoForm.formState.isDirty) {
            console.log('validando bisnetoForm')
            const validForm = await bisnetoForm.trigger()
            if (!validForm) return;
            await validaBisnetoForm();
            bisnetoForm.clearErrors();
            bisnetoForm.reset();
        }

        socioForm.clearErrors();
        socioForm.reset();
        mulherForm.clearErrors();
        mulherForm.reset();
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
            socioForm.setValue('cpf', cpfMask(existingData.cpf));
            socioForm.setValue('celphone', phoneMask(existingData.celphone));
        }
        setTodosDadosValidados(prev => {
            // window.localStorage.setItem('partnerData', JSON.stringify(prev.slice(0, -1)))
            return prev.slice(0, -1)
        });
        setActivePersonStep(FormType.PERSONAL);
        setActiveFilhoStep(FormType.PERSONAL);
        setActiveNetoStep(FormType.PERSONAL);
    }

    async function handleChangeActivePartner(index: number) {
        // VALIDA O SOCIO FORM
        if (socioForm.formState.isDirty) {
            console.log('validando socioForm', 'activePartnerStep', activePartnerStep, 'index', index)
            const validForm = await socioForm.trigger()
            if (!validForm) return;
            await validaSocioForm();
            socioForm.clearErrors();
            socioForm.reset();
        }

        // VALIDA O MULHER FORM
        if (mulherForm.formState.isDirty) {
            console.log('validando mulherForm')
            const validForm = await mulherForm.trigger()
            if (!validForm) return;
            await validaMulherForm();
            mulherForm.clearErrors();
            mulherForm.reset();
        }

        // VALIDA FILHO FORM
        if (filhoForm.formState.isDirty) {
            console.log('validando filhoForm')
            const validForm = await filhoForm.trigger()
            if (!validForm) return;
            await validaFilhoForm();
            filhoForm.clearErrors();
            filhoForm.reset();
        }

        // VALIDA MULHER DO FILHO FORM
        if (mulherDoFilhoForm.formState.isDirty) {
            console.log('validando mulherDoFilhoForm')
            const validForm = await mulherDoFilhoForm.trigger()
            if (!validForm) return;
            await validaMulherDoFilhoForm();
            mulherDoFilhoForm.clearErrors();
            mulherDoFilhoForm.reset();
        }

        // VALIDA NETO FORM
        if (netoForm.formState.isDirty) {
            console.log('validando netoForm')
            const validForm = await netoForm.trigger()
            if (!validForm) return;
            await validaNetoForm();
            netoForm.clearErrors();
            netoForm.reset();
        }

        // VALIDA MULHER DO NETO FORM
        if (mulherDoNetoForm.formState.isDirty) {
            console.log('validando mulherDoNetoForm')
            const validForm = await mulherDoNetoForm.trigger()
            if (!validForm) return;
            await validaMulherDoNetoForm();
            mulherDoNetoForm.clearErrors();
            mulherDoNetoForm.reset();
        }

        // VALIDA BISNETO FORM
        if (bisnetoForm.formState.isDirty) {
            console.log('validando bisnetoForm')
            const validForm = await bisnetoForm.trigger()
            if (!validForm) return;
            await validaBisnetoForm();
            bisnetoForm.clearErrors();
            bisnetoForm.reset();
        }

        const existingData = todosDadosValidados[index].socio;
        console.log('changeActivePartner todosDadosValidados', todosDadosValidados);

        // If there's existing data, set it in the form
        // socioForm.clearErrors();
        // socioForm.reset();
        setActivePersonStep(FormType.PERSONAL);
        setActiveFilhoStep(FormType.PERSONAL);
        setActiveNetoStep(FormType.PERSONAL);
        setActivePartnerStep(index);
        // VALIDA DADOS DO SOCIO
        if (existingData) {
            setFilhoCount(todosDadosValidados[index].filho.length);
            setNetoCount(todosDadosValidados[index].neto.length);
            setBisnetoCount(todosDadosValidados[index].bisneto.length);
            socioForm.setValue('name', existingData.name);
            socioForm.setValue('email', existingData.email);
            socioForm.setValue('cpf', cpfMask(existingData.cpf));
            socioForm.setValue('celphone', phoneMask(existingData.celphone));
        } else {
            socioForm.reset();
        }
        // VALIDA SE TEM DADOS PARA LEGAL DO SOCIO
        if (todosDadosValidados[index].socio.legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            setActiveRepresentativeStep(0);
            setLegalRepresentativesCount(todosDadosValidados[index].socio.legalRepresentatives.length);
            representanteForm.setValue('name', todosDadosValidados[index].socio.legalRepresentatives[0].name);
            representanteForm.setValue('email', todosDadosValidados[index].socio.legalRepresentatives[0].email);
            representanteForm.setValue('cpf', cpfMask(todosDadosValidados[index].socio.legalRepresentatives[0].cpf));
            representanteForm.setValue('celphone', phoneMask(todosDadosValidados[index].socio.legalRepresentatives[0].celphone));
        } else {
            setLegalRepresentativesCount(0);
            setShowLegalForm(false);
            representanteForm.reset();
        }
    }

    // ACOES PESSOA
    async function handleChangePerson(type: FormType) {
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

        // VALIDA FORM LEGAL
        if (showLegalForm && representanteForm.formState.isDirty) {
            const validForm = await representanteForm.trigger()
            if (!validForm) return;
            if (activePersonStep !== FormType.CHILD) {
                await validaRepresentanteForm(activePersonStep === FormType.PERSONAL ? 'socio' : 'mulher');
                setShowLegalForm(false);
            }
        }

        // VALIDA SE TEM DADOS PARA MULHER
        if (type === FormType.COUPLE) {
            const existingData = todosDadosValidados[activePartnerStep].mulher;
            if (existingData) {
                mulherForm.setValue('name', existingData.name);
                mulherForm.setValue('email', existingData.email);
                mulherForm.setValue('cpf', cpfMask(existingData.cpf));
                mulherForm.setValue('celphone', phoneMask(existingData.celphone));
            } else {
                mulherForm.reset();
            }
        } else {
            mulherForm.reset();
        }

        // VALIDA SE TEM DADOS PARA LEGAL DO SOCIO
        if (type === FormType.PERSONAL && todosDadosValidados[activePartnerStep].socio.legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            setActiveRepresentativeStep(0);
            setLegalRepresentativesCount(todosDadosValidados[activePartnerStep].socio.legalRepresentatives.length);
            representanteForm.setValue('name', todosDadosValidados[activePartnerStep].socio.legalRepresentatives[0].name);
            representanteForm.setValue('email', todosDadosValidados[activePartnerStep].socio.legalRepresentatives[0].email);
            representanteForm.setValue('cpf', cpfMask(todosDadosValidados[activePartnerStep].socio.legalRepresentatives[0].cpf));
            representanteForm.setValue('celphone', phoneMask(todosDadosValidados[activePartnerStep].socio.legalRepresentatives[0].celphone));
        } else if (type === FormType.PERSONAL) {
            setLegalRepresentativesCount(0);
            setShowLegalForm(false);
            representanteForm.reset();
        }
        // VALIDA SE TEM DADOS PARA LEGAL DO MULHER
        if (type === FormType.COUPLE && todosDadosValidados[activePartnerStep].mulher.legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            setActiveRepresentativeStep(0);
            setLegalRepresentativesCount(todosDadosValidados[activePartnerStep].mulher.legalRepresentatives.length);
            representanteForm.setValue('name', todosDadosValidados[activePartnerStep].mulher.legalRepresentatives[0].name);
            representanteForm.setValue('email', todosDadosValidados[activePartnerStep].mulher.legalRepresentatives[0].email);
            representanteForm.setValue('cpf', cpfMask(todosDadosValidados[activePartnerStep].mulher.legalRepresentatives[0].cpf));
            representanteForm.setValue('celphone', phoneMask(todosDadosValidados[activePartnerStep].mulher.legalRepresentatives[0].celphone));
        } else if (type === FormType.COUPLE) {
            setLegalRepresentativesCount(0);
            setShowLegalForm(false);
            representanteForm.reset();
        }

        setActivePersonStep(type);
        if (type === FormType.CHILD) {
            setActiveFilhoStep(FormType.PERSONAL);
            setActiveNetoStep(FormType.PERSONAL);
        }
        if (type === FormType.CHILD && filhoCount === 0) {
            setFilhoCount(1);
        }
    }

    // ACOES FILHO
    async function handleChangeFilho(type: FormType) {
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

        // VALIDA FORM LEGAL
        if (showLegalForm && representanteForm.formState.isDirty) {
            const validForm = await representanteForm.trigger()
            if (!validForm) return;
            if (activeFilhoStep !== FormType.CHILD) {
                await validaRepresentanteForm(activeFilhoStep === FormType.PERSONAL ? 'filho' : 'mulherDoFilho');
                setShowLegalForm(false);
            }
        }

        // VALIDA SE TEM DADOS PARA MULHER DO FILHO
        if (type === FormType.COUPLE) {
            const existingData = todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected];
            if (existingData) {
                mulherDoFilhoForm.setValue('name', existingData.name);
                mulherDoFilhoForm.setValue('email', existingData.email);
                mulherDoFilhoForm.setValue('cpf', cpfMask(existingData.cpf));
                mulherDoFilhoForm.setValue('celphone', phoneMask(existingData.celphone));
            } else {
                mulherDoFilhoForm.reset();
            }
        } else {
            mulherDoFilhoForm.reset();
        }

        // VALIDA SE TEM DADOS PARA LEGAL DO FILHO
        if (type === FormType.PERSONAL && todosDadosValidados[activePartnerStep].filho[filhoSelected].legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            representanteForm.setValue('name', todosDadosValidados[activePartnerStep].filho[filhoSelected].legalRepresentatives[0].name);
            representanteForm.setValue('email', todosDadosValidados[activePartnerStep].filho[filhoSelected].legalRepresentatives[0].email);
            representanteForm.setValue('cpf', cpfMask(todosDadosValidados[activePartnerStep].filho[filhoSelected].legalRepresentatives[0].cpf));
            representanteForm.setValue('celphone', phoneMask(todosDadosValidados[activePartnerStep].filho[filhoSelected].legalRepresentatives[0].celphone));
            setActiveRepresentativeStep(0);
            setLegalRepresentativesCount(todosDadosValidados[activePartnerStep].filho[filhoSelected].legalRepresentatives.length);
        } else if (type === FormType.PERSONAL) {
            setLegalRepresentativesCount(0);
            setShowLegalForm(false);
            representanteForm.reset();
        }
        // VALIDA SE TEM DADOS PARA LEGAL DO MULHER DO FILHO
        if (type === FormType.COUPLE && todosDadosValidados[activePartnerStep].mulherDoFilho && todosDadosValidados[activePartnerStep].mulherDoFilho.length > 0 && todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected] && todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            representanteForm.setValue('name', todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives[0].name);
            representanteForm.setValue('email', todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives[0].email);
            representanteForm.setValue('cpf', cpfMask(todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives[0].cpf));
            representanteForm.setValue('celphone', phoneMask(todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives[0].celphone));
            setActiveRepresentativeStep(0);
            setLegalRepresentativesCount(todosDadosValidados[activePartnerStep].mulherDoFilho[filhoSelected].legalRepresentatives.length);
        } else if (type === FormType.COUPLE) {
            setLegalRepresentativesCount(0);
            setShowLegalForm(false);
            representanteForm.reset();
        }

        setActiveFilhoStep(type);
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
            filhoForm.setValue('cpf', cpfMask(existingData.cpf));
            filhoForm.setValue('celphone', phoneMask(existingData.celphone));
            filhoForm.clearErrors();
        }

        setTodosDadosValidados(prev => {
            const novosFilhos = prev[activePartnerStep].filho.slice(0, -1)
            const novasMulheresDoFilho = prev[activePartnerStep].mulherDoFilho.slice(0, -1)
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
    }

    async function handleChangeActiveFilho(index: number) {
        // VALIDA FILHO FORM E MULHER DO FILHO FORM
        if (filhoForm.formState.isDirty) {
            const validForm = await filhoForm.trigger()
            if (!validForm) return;
            await validaFilhoForm();
        }
        // VALIDA MULHER DO FILHO FORM
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
            filhoForm.setValue('cpf', cpfMask(existingFilho.cpf));
            filhoForm.setValue('celphone', phoneMask(existingFilho.celphone));
        } else {
            filhoForm.reset();
        }
        const existingMulher = todosDadosValidados[activePartnerStep].mulherDoFilho[index]
        if (existingMulher) {
            mulherDoFilhoForm.setValue('name', existingMulher.name);
            mulherDoFilhoForm.setValue('email', existingMulher.email);
            mulherDoFilhoForm.setValue('cpf', cpfMask(existingMulher.cpf));
            mulherDoFilhoForm.setValue('celphone', phoneMask(existingMulher.celphone));
        } else {
            mulherDoFilhoForm.reset();
        }
        setActiveFilhoStep(FormType.PERSONAL);
        setFilhoSelected(index);
    }

    // ACOES NETO
    async function handleChangeNeto(type: FormType) {
        // VALIDA NETO FORM
        if (activeNetoStep === FormType.PERSONAL || netoForm.formState.isDirty) {
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

        // VALIDA FORM LEGAL
        if (showLegalForm && representanteForm.formState.isDirty) {
            const validForm = await representanteForm.trigger()
            if (!validForm) return;
            if (activeNetoStep !== FormType.CHILD) {
                await validaRepresentanteForm(activeNetoStep === FormType.PERSONAL ? 'neto' : 'mulherDoNeto');
                setShowLegalForm(false);
            }
        }


        // VALIDA LEGAL DO NETO
        if (type === FormType.PERSONAL && todosDadosValidados[activePartnerStep].neto[netoSelected].legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            representanteForm.setValue('name', todosDadosValidados[activePartnerStep].neto[netoSelected].legalRepresentatives[0].name);
            representanteForm.setValue('email', todosDadosValidados[activePartnerStep].neto[netoSelected].legalRepresentatives[0].email);
            representanteForm.setValue('cpf', cpfMask(todosDadosValidados[activePartnerStep].neto[netoSelected].legalRepresentatives[0].cpf));
            representanteForm.setValue('celphone', phoneMask(todosDadosValidados[activePartnerStep].neto[netoSelected].legalRepresentatives[0].celphone));
            setActiveRepresentativeStep(0);
            setLegalRepresentativesCount(todosDadosValidados[activePartnerStep].neto[netoSelected].legalRepresentatives.length);
        } else if (type === FormType.PERSONAL) {
            setLegalRepresentativesCount(0);
            setShowLegalForm(false);
            representanteForm.reset();
        }
        // VALIDA LEGAL DO MULHER DO NETO
        if (type === FormType.COUPLE && todosDadosValidados[activePartnerStep].mulherDoNeto.length > 0 && todosDadosValidados[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives.length > 0) {
            setShowLegalForm(true);
            representanteForm.setValue('name', todosDadosValidados[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives[0].name);
            representanteForm.setValue('email', todosDadosValidados[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives[0].email);
            representanteForm.setValue('cpf', cpfMask(todosDadosValidados[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives[0].cpf));
            representanteForm.setValue('celphone', phoneMask(todosDadosValidados[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives[0].celphone));
            setActiveRepresentativeStep(0);
            setLegalRepresentativesCount(todosDadosValidados[activePartnerStep].mulherDoNeto[netoSelected].legalRepresentatives.length);
        } else if (type === FormType.COUPLE) {
            setLegalRepresentativesCount(0);
            setShowLegalForm(false);
            representanteForm.reset();
        }
        setActiveNetoStep(type);
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
            netoForm.setValue('cpf', cpfMask(existingNeto.cpf));
            netoForm.setValue('celphone', phoneMask(existingNeto.celphone));
        } else {
            netoForm.reset();
        }

        // SETA OS VALORES DO MULHER DO NETO SE JA EXISTEM
        const existingMulher = todosDadosValidados[activePartnerStep].mulherDoNeto[index]
        if (existingMulher) {
            mulherDoNetoForm.setValue('name', existingMulher.name);
            mulherDoNetoForm.setValue('email', existingMulher.email);
            mulherDoNetoForm.setValue('cpf', cpfMask(existingMulher.cpf));
            mulherDoNetoForm.setValue('celphone', phoneMask(existingMulher.celphone));
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

        const existingNeto = todosDadosValidados[activePartnerStep].neto[netoCount - 2]
        if (existingNeto) {
            netoForm.setValue('name', existingNeto.name);
            netoForm.setValue('email', existingNeto.email);
            netoForm.setValue('cpf', cpfMask(existingNeto.cpf));
            netoForm.setValue('celphone', phoneMask(existingNeto.celphone));
        }

        setTodosDadosValidados(prev => {
            const novosNetos = prev[activePartnerStep].neto.slice(0, -1)
            const novasMulheresDoNeto = prev[activePartnerStep].mulherDoNeto.slice(0, -1)
            const newData = prev[activePartnerStep]
            newData.neto = novosNetos
            newData.mulherDoNeto = novasMulheresDoNeto
            return [
                ...prev,
                newData
            ]
        })
        setActiveNetoStep(FormType.PERSONAL)
        setNetoCount(netoCount - 1)
        setNetoSelected(netoCount - 2)
    }

    // ACOES BISNETO
    async function handleChangeActiveBisNeto(index: number) {
        // VALIDA BISNETO FORM
        if (bisnetoForm.formState.isDirty) {
            const validForm = await bisnetoForm.trigger()
            if (!validForm) return;
            await validaBisnetoForm();
        }

        // VALIDA LEGAL FORM
        if (showLegalForm && representanteForm.formState.isDirty) {
            const validForm = await representanteForm.trigger()
            if (!validForm) return;
            await validaRepresentanteForm('bisneto');
            setShowLegalForm(false);
        }

        // SETA OS VALORES DO BISNETO SE JA EXISTEM
        const existingBisNeto = todosDadosValidados[activePartnerStep].bisneto[index]
        if (existingBisNeto) {
            bisnetoForm.setValue('name', existingBisNeto.name);
            bisnetoForm.setValue('email', existingBisNeto.email);
            bisnetoForm.setValue('cpf', cpfMask(existingBisNeto.cpf));
            bisnetoForm.setValue('celphone', phoneMask(existingBisNeto.celphone));
        } else {
            bisnetoForm.reset();
        }

        // SETA OS VALORES DO LEGAL SE JA EXISTEM
        const existingLegal = todosDadosValidados[activePartnerStep].bisneto[index].legalRepresentatives[0]
        if (existingLegal) {
            representanteForm.setValue('name', existingLegal.name);
            representanteForm.setValue('email', existingLegal.email);
            representanteForm.setValue('cpf', cpfMask(existingLegal.cpf));
            representanteForm.setValue('celphone', phoneMask(existingLegal.celphone));
            setActiveRepresentativeStep(0)
            setLegalRepresentativesCount(todosDadosValidados[activePartnerStep].bisneto[index].legalRepresentatives.length)
            setShowLegalForm(true)
        } else {
            representanteForm.reset();
            setShowLegalForm(false)
        }

        setBisnetoSelected(index)
    }

    async function handleAddGreatNeto() {
        const validForm = await bisnetoForm.trigger()
        if (!validForm) return;
        await validaBisnetoForm();

        if (bisnetoCount === 0) {
            setBisnetoCount(0);
        }

        setShowLegalForm(false);
        representanteForm.reset();
        setLegalRepresentativesCount(0);
        setActiveRepresentativeStep(0);
        setBisnetoSelected(bisnetoCount)
        setBisnetoCount(bisnetoCount + 1)
        bisnetoForm.reset();
    }

    function handleRemoveGreatNeto() {
        if (bisnetoCount === 1) {
            setBisnetoCount(0);
            setBisnetoSelected(0);
        }

        const existingBisNeto = todosDadosValidados[activePartnerStep].bisneto[bisnetoCount - 2]
        if (existingBisNeto) {
            bisnetoForm.setValue('name', existingBisNeto.name);
            bisnetoForm.setValue('email', existingBisNeto.email);
            bisnetoForm.setValue('cpf', cpfMask(existingBisNeto.cpf));
            bisnetoForm.setValue('celphone', phoneMask(existingBisNeto.celphone));
        }

        setTodosDadosValidados(prev => {
            const novosBisnetos = prev[activePartnerStep].bisneto.slice(0, -1)
            const newData = prev[activePartnerStep]
            newData.bisneto = novosBisnetos
            return [
                ...prev,
                newData
            ]
        })
        setBisnetoCount(bisnetoCount - 1)
        setBisnetoSelected(bisnetoCount - 2)
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
        representanteForm.reset();
        representanteForm.clearErrors();
    }

    function handleRemoveLegalRepresentative() {
        setActiveRepresentativeStep(legalRepresentativesCount - 2);
        setLegalRepresentativesCount(legalRepresentativesCount - 1);
        if (legalRepresentativesCount === 1) {
            representanteForm.clearErrors();
            setShowLegalForm(false);
        }
    }

    const partnerActions = {
        activePartnerStep,
        setActivePartnerStep,
        partnerCount,
        handleAddPartner,
        handleRemovePartner,
        handleChangeActivePartner,
    }

    const personActions = {
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

    const bisnetoActions = {
        bisnetoCount,
        setBisnetoCount,
        bisnetoSelected,
        setBisnetoSelected,
        showGreatNeto,
        handleGreatNetoCheckboxChange,
        handleAddGreatNeto,
        handleRemoveGreatNeto,
        handleChangeActiveBisNeto
    }

    const legalActions = {
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
        bisnetoActions,
        legalActions,
        novosForms,
        validateDataBeforeNextStep,
    }
}
