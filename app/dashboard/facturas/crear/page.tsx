import { CrearFactura } from "@/app/components/CrearFactura";
import { requiereUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";

async function obtenerDatos(userId: string) {
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    const datos = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            nombre: true,
            apellido: true,
            direccion: true,
            email: true,
        },
    });
    return datos;
}

export default async function FacturaCreacion() {
    const sesion = await requiereUser();
    const datos = await obtenerDatos(sesion.user?.id as string);
    return (
        <CrearFactura 
            nombre={datos?.nombre as string}
            apellido={datos?.apellido as string}
            direccion={datos?.direccion as string}
            email={datos?.email as string}
        />
    )    
}