"use client";
import { useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogHeader } from "../components/ui/alert-dialog";
import { z } from "zod";
import { useSaveClient } from "../api/saveClient";

const contatoSchema = z.object({
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

const RegisterClient = () => {
    const saveClientMutation = useSaveClient();
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [formData, setFormData] = useState<ContatoSchema | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | null>(
        null
    );

    const form = useForm<ContatoSchema>({
        resolver: zodResolver(contatoSchema),
        defaultValues: {
            nome: "",
            endereco: "",
            email: "",
        },
    });

    function onSubmit(values: ContatoSchema) {
        setFormData(values);
        setShowAlertDialog(true);
        saveClientMutation.mutate(
            {
                nome: values.nome,
                endereco: values.endereco,
                email: values.email,
            },
            {
                onSuccess: () => {
                    setAlertType("success");
                    setShowAlertDialog(true);
                    form.reset(); // limpa os campos
                    setTimeout(() => {
                        setShowAlertDialog(false);
                        setAlertType(null);
                    }, 3000);
                },
                onError: () => {
                    setAlertType("error");
                    setShowAlertDialog(true);
                    setTimeout(() => {
                        setShowAlertDialog(false);
                        setAlertType(null);
                    }, 3000);
                },
            }
        );
    }
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center mt-40">
                <Card width="400px" height="500px" flexDirection="column">
                    <div className="flex flex-col items-center mt-10">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Seu nome"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endereco"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Endereço</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Rua Exemplo, 123"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="seu@email.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="bg-green-600">
                                    Enviar
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className="flex mt-5">
                        {alertType && (
                            <AlertDialog
                                open={showAlertDialog}
                                onOpenChange={setShowAlertDialog}
                            >
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle
                                            className={`p-3 rounded-md ${
                                                alertType === "success"
                                                    ? "bg-green-600 text-white"
                                                    : "bg-red-600 text-white"
                                            }`}
                                        >
                                            {alertType === "success"
                                                ? "Dados enviados com sucesso!"
                                                : "Erro ao enviar os dados. Tente novamente."}
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RegisterClient;
