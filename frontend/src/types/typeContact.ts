import { z } from "zod";

export const contatoSchema = z.object({
    id: z.string().optional(),

    nome: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),

    endereco: z.string().min(5, {
        message: "O endereço deve ter pelo menos 5 caracteres.",
    }),

    email: z.string().email({
        message: "Por favor, insira um e-mail válido.",
    }),
});

export type ContatoSchema = z.infer<typeof contatoSchema>;