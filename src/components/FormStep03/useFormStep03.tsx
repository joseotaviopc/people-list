import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";


enum FormType {
    PERSONAL = 'personal',
    COUPLE = 'couple',
    CHILD = 'child',
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

const formSchema = z.object({
    ...personSchema.shape,
    legalRepresentatives: z.array(personSchema).optional()
});

type PersonFormData = z.infer<typeof formSchema>;
type LegalFormData = z.infer<typeof personSchema>;

type PartnerData = {
    [FormType.PERSONAL]: {
        data: PersonFormData,
    },
    [FormType.COUPLE]?: {
        data: PersonFormData,
    },
    [FormType.CHILD]?: {
        data: PersonFormData,
    }[]
}

const newPartnerData = {
    [FormType.PERSONAL]: {
        data: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type: FormType.PERSONAL,
        }
    }
}

export function useFormStep03() {
    // PARTNER
    const [activePartnerStep, setActivePartnerStep] = useState(0)
    const [partnerCount, setPartnerCount] = useState(1)
    const [partnerData, setPartnerData] = useState<PartnerData[]>(
        window.localStorage.getItem('partnerData') ? JSON.parse(window.localStorage.getItem('partnerData') || '[]') as PartnerData[] : [newPartnerData]
    )
    // console.log(JSON.stringify(partnerData, null, 4))

    // PERSON
    const [activePersonStep, setActivePersonStep] = useState(FormType.PERSONAL)

    // CHILD
    const [activeChildStep, setActiveChildStep] = useState(FormType.PERSONAL)
    const [childCount, setChildCount] = useState(1)
    const [childSelected, setChildSelected] = useState(0)
    const [showChild, ] = useState(true)

    // GRANDCHILD
    const [activeGrandChildStep, setActiveGrandChildStep] = useState(FormType.PERSONAL)
    const [grandChildCount, setGrandChildCount] = useState(1)
    const [grandChildSelected, setGrandChildSelected] = useState(0)
    const [showGrandChild, ] = useState(true)

    // GREAT GRANDCHILD
    const [greatGrandChildrenCount, setGreatGrandChildrenCount] = useState(1)
    const [greatGrandChildSelected, setGreatGrandChildSelected] = useState(0)
    const [showGreatGrandChild, ] = useState(true)

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
        resolver: zodResolver(personSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            celphone: "",
            type: FormType.LEGAL_REPRESENTATIVE
        }
    })

    async function handleChangePerson(type: FormType) {
        // valido se legalForm tá aberto e se tocou no form
        if (showLegalForm) {
            const validForm = await legalForm.trigger()
            if (!validForm) return;

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
                    window.localStorage.setItem('partnerData', JSON.stringify(newData))
                    console.log('newData ', JSON.stringify(newData, null, 4))
                    return newData;
                });
            })();
        }

        // valido se tocou no form ou se é socio
        if (activePersonStep === FormType.PERSONAL || personForm.formState.isDirty) {

            const validForm = await personForm.trigger()
            if (!validForm) return;
    
            await personForm.handleSubmit((values) => {
                // console.log(values)
                // console.log(activePersonStep)
                // console.log(type)
    
                setPartnerData(prev => {
                    const newData = prev;
                    if (activePersonStep === FormType.PERSONAL || activePersonStep === FormType.COUPLE) {
                        newData[activePartnerStep][activePersonStep] = {
                            data: values
                        };
                    }
                    window.localStorage.setItem('partnerData', JSON.stringify(newData))
                    return newData;
                });
            })();
        }

        // Check if there's existing data for this type
        if (type === FormType.PERSONAL || type === FormType.COUPLE) {
            
            const existingData = partnerData[activePartnerStep][type];
            if (existingData) {
                personForm.setValue('name', existingData.data.name);
                personForm.setValue('email', existingData.data.email);
                personForm.setValue('cpf', existingData.data.cpf);
                personForm.setValue('celphone', existingData.data.celphone);
                personForm.setValue('type', existingData.data.type);
            } else {
                personForm.reset();
            }
        } else {
            personForm.reset();
        }

        setActivePersonStep(type);
        setShowLegalForm(false);
        if (type === FormType.CHILD) {
            setActiveChildStep(FormType.PERSONAL);
            setActiveGrandChildStep(FormType.PERSONAL);
        }
        if (type === FormType.CHILD && childCount === 0) {
            setChildCount(1);
        }

        console.log('partnerData ', JSON.stringify(partnerData, null, 4))
    }

    async function handleChangeChild(type: FormType) {
        const validForm = await personForm.trigger()
        if (!validForm) return;

        await personForm.handleSubmit((values) => {
            console.log(values)
            // console.log(activeChildStep)
            // console.log(type)

            setPartnerData(prev => {
                const newData = prev;
                // console.log('newData ', newData)
                // if (newData[activePartnerStep][FormType.CHILD] && newData[activePartnerStep][FormType.CHILD][childSelected][activeChildStep]) {
                //     newData[activePartnerStep][FormType.CHILD][childSelected][activeChildStep] = {
                //         data: values,
                //         legalRepresentatives: values.legalRepresentatives || []
                //     }
                // } else {
                //     newData[activePartnerStep][FormType.CHILD] = [
                //         {
                //             data: values,
                //         }
                //     ]
                // }
                window.localStorage.setItem('partnerData', JSON.stringify(newData))
                return newData;
            });
        })();

        // Check if there's existing data for this type
        const existingData = partnerData[activePartnerStep][FormType.CHILD]
            ? partnerData[activePartnerStep][FormType.CHILD][childSelected] 
            : null;

        // If there's existing data, set it in the form
        if (existingData) {
            personForm.setValue('name', existingData.data.name);
            personForm.setValue('email', existingData.data.email);
            personForm.setValue('cpf', existingData.data.cpf);
            personForm.setValue('celphone', existingData.data.celphone);
            personForm.setValue('type', existingData.data.type);
        } else {
            personForm.reset();
        }

        setActiveChildStep(type);
        setShowLegalForm(false);
        if (type === FormType.CHILD) {
            setActiveGrandChildStep(FormType.PERSONAL);
        }
        if (type === FormType.CHILD && grandChildCount === 0) {
            setGrandChildCount(1);
        }
    }

    function handleChangeGrandChild(type: FormType) {
        setActiveGrandChildStep(type);
        setShowLegalForm(false);
        if (type === FormType.CHILD && greatGrandChildrenCount === 0) {
            setGreatGrandChildrenCount(1);
        }
    }

    function handleAddChild() {
        if (childCount === 0) {
            setActiveChildStep(FormType.PERSONAL);
            setGrandChildCount(0);
            setGreatGrandChildrenCount(0);
        }
        setChildCount(childCount + 1);
    }

    function handleRemoveChild() {
        if (childCount === 1) {
            setGrandChildCount(0);
            setGreatGrandChildrenCount(0);
        }
        setChildCount(childCount - 1);
    }

    function handleChildCheckboxChange() {
        // setShowGrandChild(!showGrandChild);
        // setShowGreatGrandChild(!showGreatGrandChild);
    }

    function handleGrandChildCheckboxChange() {
        // setShowChild(!showChild);
        // setShowGreatGrandChild(!showGreatGrandChild);
    }

    function handleGreatGrandChildCheckboxChange() {
        // setShowChild(!showChild);
        // setShowGrandChild(!showGrandChild);
    }

    function handleAddLegalRepresentative() {
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

    function handleAddPartner() {
        personForm.reset();
        personForm.clearErrors();
        setActivePersonStep(FormType.PERSONAL);
        setActiveChildStep(FormType.PERSONAL);
        setActiveGrandChildStep(FormType.PERSONAL);
        setChildCount(0);
        setGrandChildCount(0);
        setGreatGrandChildrenCount(0);
        setPartnerCount(partnerCount + 1);
        setActivePartnerStep(partnerCount);
        setLegalRepresentativesCount(0);
        setActiveRepresentativeStep(0);
        setShowLegalForm(false);
        setPartnerData(prev => {
            window.localStorage.setItem('partnerData', JSON.stringify([...prev, newPartnerData]))
            return [...prev, newPartnerData]
        });
    }

    function handleRemovePartner() {
        setActivePartnerStep(partnerCount - 2);
        setPartnerCount(partnerCount - 1);
        const existingData = partnerData[partnerCount - 2][FormType.PERSONAL] ? partnerData[partnerCount - 2][FormType.PERSONAL] : null;

        // If there's existing data, set it in the form
        if (existingData) {
            personForm.setValue('name', existingData.data.name);
            personForm.setValue('email', existingData.data.email);
            personForm.setValue('cpf', existingData.data.cpf);
            personForm.setValue('celphone', existingData.data.celphone);
            personForm.setValue('type', existingData.data.type);
        }
        setPartnerData(prev => {
            window.localStorage.setItem('partnerData', JSON.stringify(prev.slice(0, -1)))
            return prev.slice(0, -1)
        });
        setActivePersonStep(FormType.PERSONAL);
        setActiveChildStep(FormType.PERSONAL);
        setActiveGrandChildStep(FormType.PERSONAL);
    }

    function handleChangeActivePartner(index: number) {
        console.log('DATA', JSON.stringify(partnerData, null, 4))
        console.log('index', index)
        const existingData = partnerData[index][FormType.PERSONAL].data.name ? partnerData[index][FormType.PERSONAL].data : null;

        // If there's existing data, set it in the form
        personForm.clearErrors();
        if (existingData) {
            personForm.setValue('name', existingData.name);
            personForm.setValue('email', existingData.email);
            personForm.setValue('cpf', existingData.cpf);
            personForm.setValue('celphone', existingData.celphone);
            personForm.setValue('type', existingData.type);
            personForm.setValue('legalRepresentatives', existingData.legalRepresentatives || []);
        } else {
            personForm.reset();
        }
        setActivePersonStep(FormType.PERSONAL);
        setActiveChildStep(FormType.PERSONAL);
        setActiveGrandChildStep(FormType.PERSONAL);
        setActivePartnerStep(index);
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

    const childActions = {
        activeChildStep,
        setActiveChildStep,
        childCount,
        setChildCount,
        childSelected,
        setChildSelected,
        handleChangeChild,
        handleAddChild,
        handleRemoveChild,
        handleChildCheckboxChange,
        showChild
    }

    const grandChildActions = {
        activeGrandChildStep,
        setActiveGrandChildStep,
        grandChildCount,
        setGrandChildCount,
        grandChildSelected,
        setGrandChildSelected,
        handleChangeGrandChild,
        showGrandChild,
        handleGrandChildCheckboxChange
    }

    const greatGrandChildActions = {
        greatGrandChildrenCount,
        setGreatGrandChildrenCount,
        greatGrandChildSelected,
        setGreatGrandChildSelected,
        showGreatGrandChild,
        handleGreatGrandChildCheckboxChange
    }

    const legalActions = {
        legalForm,
        activeRepresentativeStep,
        setActiveRepresentativeStep,
        legalRepresentativesCount,
        showLegalForm,
        handleAddLegalRepresentative,
        handleRemoveLegalRepresentative,
    }

    return {
        partnerActions,
        personActions,
        childActions,
        grandChildActions,
        greatGrandChildActions,
        legalActions,
    }
}
