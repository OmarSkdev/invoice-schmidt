
import prisma from "@/lib/db";
import { DashboardBlocks } from "../components/DashboardBlock";
import { FacturasRecientes } from "../components/FacturasRecientes";
import { FacturaGrafica } from "../components/GraficoFactura";
import { signOut } from "../utils/auth";
import { requiereUser } from "../utils/hooks"
import { EstadoVacio } from "../components/EstadoVacio";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function obtenerDatos(userId: string) {
    const datos = await prisma.factura.findMany({
        where: {
            userId: userId
        },
        select:{
            id:true
        },        
    });
    return datos;
}

export default async function Dashboard() {
    const sesion = await requiereUser();
    const datos = await obtenerDatos(sesion.user?.id as string);
    return (
            <> 
                {datos.length < 1 ? (
                    <EstadoVacio
                        titulo="Facturas no encontrada"
                        descripcion="Crear una Factura para verlo acá"
                        textoboton="Crear Factura"
                        href="/dashboard/facturas/crear"
                    />
            )  : (
            
            <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
                <DashboardBlocks />    
                    <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                        <FacturaGrafica />
                        <FacturasRecientes />
                    </div> 
            </Suspense> 
            )}        
        </>
    )
}