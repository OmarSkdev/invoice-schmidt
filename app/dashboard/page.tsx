
import prisma from "@/lib/db";
import { DashboardBlocks } from "../components/DashboardBlock";
import { FacturasRecientes } from "../components/FacturasRecientes";
import { FacturaGrafica } from "../components/GraficoFactura";
import { signOut } from "../utils/auth";
import { requiereUser } from "../utils/hooks"



export default async function Dashboard() {
    const sesion = await requiereUser();
    return (
        <>
           <DashboardBlocks />    
           <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                <FacturaGrafica />
                <FacturasRecientes />
            </div>        
        </>
    )
}