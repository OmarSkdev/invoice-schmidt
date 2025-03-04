
import { DashboardBlocks } from "../components/DashboardBlock";
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
                <h1 className="bg-red-500 col-span-1">corresponde al 70%</h1>
            </div>        
        </>
    )
}