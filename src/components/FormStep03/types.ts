import { validateCPF, validatePhone } from "@/helpers";
import { z } from "zod";

export enum FormType {
    PERSONAL = 'personal',
    COUPLE = 'couple',
    CHILD = 'filho',
    // LEGAL_REPRESENTATIVE = 'legalRepresentative'
}

// SOCIO
export const socioSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type SocioFormData = z.infer<typeof socioSchema>;

// MULHER
export const mulherSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type MulherFormData = z.infer<typeof mulherSchema>;

// FILHO
export const filhoSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type FilhoFormData = z.infer<typeof filhoSchema>;

// MULHERFILHO
export const mulherDoFilhoSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type MulherDoFilhoFormData = z.infer<typeof mulherDoFilhoSchema>;

// NETO
export const netoSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type NetoFormData = z.infer<typeof netoSchema>;

// MULHERNETO
export const mulherDoNetoSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type MulherDoNetoFormData = z.infer<typeof mulherDoNetoSchema>;

// BISNETO
export const bisnetoSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type BisnetoFormData = z.infer<typeof bisnetoSchema>;

// LEGAL REPRESENTATIVE
export const representanteSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos")
        .transform((cpf) => cpf.replace(/[.|-]/g, ''))
        .refine((cpf) => validateCPF(cpf), "CPF inválido"),
    celphone: z.string().min(15, "Telefone deve ter 11 dígitos")
        .transform((phone) => phone.replace(/[(|)|\-|\s]/g, ''))
        .refine((phone) => validatePhone(phone), "Telefone inválido"),
    // email: z.string(),
    // cpf: z.string(),
    // celphone: z.string(),
});
export type RepresentanteFormData = z.infer<typeof representanteSchema>;

// ARRAY DE SOCIOS
export const todosDadosSchema = z.array(z.object({
    socio: z.object({
        ...socioSchema.shape,
        legalRepresentatives: z.array(representanteSchema),
    }),
    mulher: z.object({
        ...mulherSchema.shape,
        legalRepresentatives: z.array(representanteSchema),
    }),
    filho: z.array(z.object({
        ...filhoSchema.shape,
        legalRepresentatives: z.array(representanteSchema),
    })),
    mulherDoFilho: z.array(z.object({
        ...mulherDoFilhoSchema.shape,
        legalRepresentatives: z.array(representanteSchema),
    })),
    neto: z.array(z.object({
        ...netoSchema.shape,
        legalRepresentatives: z.array(representanteSchema),
    })),
    mulherDoNeto: z.array(z.object({
        ...mulherDoNetoSchema.shape,
        legalRepresentatives: z.array(representanteSchema),
    })),
    bisneto: z.array(z.object({
        ...bisnetoSchema.shape,
        legalRepresentatives: z.array(representanteSchema),
    })),
})
)
export type TodosDadosFormData = z.infer<typeof todosDadosSchema>;
export type TodosDadosFormDataKeys = keyof TodosDadosFormData[0];
