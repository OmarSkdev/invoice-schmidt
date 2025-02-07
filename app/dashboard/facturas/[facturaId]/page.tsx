import { EditarFactura } from "@/app/components/EditarFactura";
import { requiereUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { string } from "zod";

async function obtenerData(facturaId:string, userId: string) {
    const data = await prisma.factura.findUnique({
        where: {
            id: facturaId,
            userId: userId
        },        
    });

    if (!data) {
        return notFound();
        }
    return data;    
}

type ParametroId = Promise<{ facturaId: string }>;

export default async function editarFactura({ params }:{params:ParametroId}){    
    const { facturaId } = await params;
    const sesion = await requiereUser();
    const data = await obtenerData(facturaId, sesion.user?.id as string)
    //console.log(data);
    
    
    return(
        <EditarFactura data={data} />
    )
}