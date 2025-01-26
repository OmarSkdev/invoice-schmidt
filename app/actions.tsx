"use server";

import { requiereUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { facturaSchema, onboardingSchema } from "./utils/zodSchemas";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { env } from "process";
import { totalmem } from "os";
import { emailCliente } from "./utils/mailtrap";
import { formatMoneda } from "./utils/formatMoneda";

export async function onboardUser(prevState: any, formData: FormData) {
    const sesion = await requiereUser();

    const envio = parseWithZod(formData, {
        schema: onboardingSchema,
    });

    if (envio.status !== "success") {
        return envio.reply();
    }

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

export async function crearFactura(prevState: any, formData: FormData) {
    const sesion = await requiereUser();

    const envio = parseWithZod(formData, {
        schema: facturaSchema,
    });

    if (envio.status !== "success") {
        return envio.reply();
    }

    const data = await prisma.factura.create({
        data: {
            DireccionCliente: envio.value.DireccionCliente,
            EmailCliente: envio.value.EmailCliente,
            NombreCliente: envio.value.NombreCliente,
            moneda: envio.value.moneda,
            fecha: envio.value.fecha,
            fechaVenc: envio.value.fechaVenc,
            deDireccion: envio.value.deDireccion,
            deEmail: envio.value.deEmail,
            deNombre: envio.value.deNombre,
            itemDescripcion: envio.value.itemDescripcion,
            itemCantidad: envio.value.itemCantidad,
            itemTasa: envio.value.itemTasa,
            nombreFactura: envio.value.nombreFactura,
            numeroFactura: envio.value.numeroFactura,
            estados: envio.value.estados,
            total: envio.value.total,
            nota: envio.value.nota,
            userId: sesion.user?.id
        },
    });

    const sender = {
        email: "hello@demomailtrap.com",
        name: "Mailtrap Test",
    };

    emailCliente.send({
        from: sender,
        to: [{ email:"omar.sk80@gmail.com"}],
        template_uuid: "31ab946f-4227-42f4-b59e-dc394cfea856",
        template_variables: {
        "NombreCliente": envio.value.NombreCliente,
        "numeroFactura": envio.value.numeroFactura,
        "fechaVenc": new Intl.DateTimeFormat("es-CL", {
            dateStyle: "long",
            }).format(new Date(envio.value.fecha)),              
        "total": formatMoneda({
            monto: envio.value.total,
            moneda: envio.value.moneda as any,
        }),
        "link": "Test_Link"
        }
    })

    return redirect("/dashboard/facturas");
}