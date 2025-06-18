"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { useDeleteClient } from "../../api/deleteClient";
import { useEditClient } from "../../api/editClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContatoSchema, contatoSchema } from "../../types/typeContact";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "../../components/ui/form";

export type Client = {
    id?: string;
    name: string;
    adress: string;
    email: string;
};

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "email",
        header: "E-mail",
    },
    {
        accessorKey: "adress",
        header: "Endereço",
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const client = row.original;
            const [open, setOpen] = useState(false);
            const [editedClient, setEditedClient] = useState<Client>(client);
            const deleteMutation = useDeleteClient();
            const editMutation = useEditClient();

            const form = useForm<ContatoSchema>({
                resolver: zodResolver(contatoSchema),
                defaultValues: {
                    nome: client.name,
                    endereco: client.adress,
                    email: client.email,
                },
            });

            const handleChange = (field: keyof Client, value: string) => {
                setEditedClient({ ...editedClient, [field]: value });
            };

            const handleSave = (values: ContatoSchema) => {
                editMutation.mutate({
                    id: client.id ?? "",
                    nome: values.nome,
                    endereco: values.endereco,
                    email: values.email,
                });
                setOpen(false);
            };

            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <div className="flex gap-2">
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setEditedClient(client);
                                    setOpen(true);
                                }}
                            >
                                Editar
                            </Button>
                        </DialogTrigger>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                                deleteMutation.mutate(client.id ?? "")
                            }
                        >
                            Excluir
                        </Button>
                    </div>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Cliente</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                className="space-y-4"
                                onSubmit={form.handleSubmit(handleSave)}
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
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit">Salvar</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            );
        },
    },
];
