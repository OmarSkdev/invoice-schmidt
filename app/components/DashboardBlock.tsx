import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requiereUser } from "../utils/hooks"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import prisma from "@/lib/db";

async function obtenerData(userId: string) {
    const [datos, facPagadas, facPendientes] =  await Promise.all([
        prisma.factura.findMany({
            where: {
                userId: userId,
            },
            select: {
                total: true,
            },
        }),
        prisma.factura.findMany({
            where: {
                userId: userId,
                estados: "PAGADO",
            },
            select: {
                id: true,
            },
        }),
        prisma.factura.findMany({
            where: {
                userId: userId,
                estados: "PENDIENTE",
            },
            select: {
                id: true,
            },
        }),        
    ]);

    return {
        datos,
        facPagadas,
        facPendientes
    }
}

export async function DashboardBlocks(){
    const sesion = await requiereUser();
    const {datos, facPendientes, facPagadas} = await obtenerData(sesion.user?.id as string);

    return(
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                    <CardTitle className="text-sm font-medium">
                        Total 
                    </CardTitle>
                    {/* <Users className="size-4 text-muted-foreground" /> */}
                    <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        ${datos.reduce((acum, factura) => acum + factura.total, 0)}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Basado en los últimos 30 días
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Facturas Emitidas</CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">+{datos.length}</h2>
                    <p className="text-xs text-muted-foreground">
                        Basado en los últimos 30 días
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Facturas Pagadas</CardTitle>
                    <CreditCard className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">+{facPagadas.length}</h2>
                    <p className="text-xs text-muted-foreground">
                        Total de Facturas que han sido pagadas
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Facturas Pendientes</CardTitle>
                    <Activity className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">+{facPendientes.length}</h2>
                    <p className="text-xs text-muted-foreground">
                        Total Facturas pendientes
                    </p>
                </CardContent>
            </Card>
            
        </div>
    )
}