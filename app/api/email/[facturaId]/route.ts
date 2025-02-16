import { requiereUser } from "@/app/utils/hooks";
import { emailCliente } from "@/app/utils/mailtrap";
import prisma from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    {
    params,
}: {
    params: Promise<{ facturaId: string}>;
}
) {
    try {
        const sesion = await requiereUser();
        const { facturaId } = await params;

        const facturaData = await prisma.factura.findUnique({
            where: {
                id: facturaId,
                userId: sesion.user?.id,
            },
        });

        if (!facturaData) {
            return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
        }

        const sender = {
            email: "hello@demomailtrap.com",
            name: "Mailtrap Test",
        };

        emailCliente.send({
            from: sender,
            to: [{ email: "omar.sk80@gmail.com" }],
            template_uuid: "299cf231-11ca-4152-8962-832d17a9b250",
            template_variables: {
                "first_name": facturaData.NombreCliente,
        },        
    });
    return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            {error: "Envío email recordatorio fallido"},
            { status: 500 }
        );
    }
    }
    

    

    
   