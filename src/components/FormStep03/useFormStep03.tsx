import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";


enum FormType {
    PERSONAL = 'personal',
    COUPLE = 'couple',
    CHILD = 'child',
    LEGAL_REPRESENTATIVE = 'legalRepresentative'
}

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

type PersonFormData = z.infer<typeof formSchema>;
type LegalFormData = z.infer<typeof personSchema>;

export function useFormStep03() {
    // PARTNER
    const [activePartnerStep, setActivePartnerStep] = useState(0)
    const [partnerCount, setPartnerCount] = useState(1)

    // PERSON
    const [activePersonStep, setActivePersonStep] = useState(FormType.PERSONAL)
    
    // CHILD
    const [activeChildStep, setActiveChildStep] = useState(FormType.PERSONAL)
    const [childCount, setChildCount] = useState(0)
    const [childSelected, setChildSelected] = useState(0)
    
    // GRANDCHILD
    const [activeGrandChildStep, setActiveGrandChildStep] = useState(FormType.PERSONAL)
    const [grandChildCount, setGrandChildCount] = useState(0)
    const [grandChildSelected, setGrandChildSelected] = useState(0)
    
    // GREAT GRANDCHILD
    const [greatGrandChildrenCount, setGreatGrandChildrenCount] = useState(0)
    const [greatGrandChildSelected, setGreatGrandChildSelected] = useState(0)

    // LEGAL REPRESENTATIVE
    const [showLegalForm, setShowLegalForm] = useState(false)
    const [legalRepresentativesCount, setLegalRepresentativesCount] = useState(0)
    const [activeRepresentativeStep, setActiveRepresentativeStep] = useState(0)

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
        setLegalRepresentativesCount(legalRepresentativesCount + 1);
    }

    function handleRemoveLegalRepresentative() {
        setLegalRepresentativesCount(legalRepresentativesCount - 1);
    }

    function handleAddPartner() {
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
    }

    function handleRemovePartner() {
        setActivePartnerStep(partnerCount - 2);
        setPartnerCount(partnerCount - 1);
    }

    const partnerActions = {
        activePartnerStep,
        setActivePartnerStep,
        partnerCount,
        handleAddPartner,
        handleRemovePartner,
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
    }
    
    const grandChildActions = {
        activeGrandChildStep,
        setActiveGrandChildStep,
        grandChildCount,
        setGrandChildCount,
        grandChildSelected,
        setGrandChildSelected,
        handleChangeGrandChild,
    }

    const greatGrandChildActions = {
        greatGrandChildrenCount,
        setGreatGrandChildrenCount,
        greatGrandChildSelected,
        setGreatGrandChildSelected
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
