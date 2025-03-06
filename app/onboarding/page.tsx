"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButtons";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

export default function Onboarding() {
    // establecer Estado Inicial y posterio Envío
    const [ultimoResultado, accion] = useActionState(onboardUser, undefined);

    const [form, fields] = useForm({
        

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
            </div>
        </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Titulo Tarjeta</CardTitle>
                    <CardDescription>Ingrese información para crear Cuenta</CardDescription>
                </CardHeader>
                    <CardContent>
                        <form 
                        className="grid gap-4"
                        action={accion}
                        id={form.id}
                        onSubmit={form.onSubmit}
                        noValidate
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label>Nombre</Label>
                                    <Input
                                     name={fields.nombre.name}
                                     key={fields.nombre.key}
                                     defaultValue={fields.nombre.initialValue}
                                     placeholder="Andrés"
                                     />
                                     <p className="text-red-500 text-sm">{fields.nombre.errors}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Apellido</Label>
                                    <Input
                                     name={fields.apellido.name}
                                     key={fields.apellido.key}
                                     defaultValue={fields.apellido.initialValue}
                                     placeholder="Sch"
                                     />
                                     <p className="text-red-500 text-sm">{fields.apellido.errors}</p>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Dirección</Label>
                                <Input 
                                name={fields.direccion.name}
                                key={fields.direccion.key}
                                defaultValue={fields.direccion.initialValue}
                                placeholder="Calle 123"
                                />
                                <p className="text-red-500 text-sm">{fields.direccion.errors}</p>
                            </div>
                            <SubmitButton text="Finalizar registro" />
                            
                        </form>
                    </CardContent>
            </Card>
        </div>
    )
}