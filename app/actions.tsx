"use server";

import { requiereUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema } from "./utils/zodSchemas";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function onboardUser(prevState: any, formData: FormData) {
    const sesion = await requiereUser();

    const envio = parseWithZod(formData, {
        schema: onboardingSchema,
    })

    if (envio.status !== "success")
        return envio.reply();

    const data = await prisma.user.update({
        where: {
            id: sesion.user?.id,
        },
        data: {
            nombre: envio.value.nombre,
            apellido: envio.value.apellido,
            direccion: envio.value.direccion,
        },
    });
    return redirect("/dashboard");

}