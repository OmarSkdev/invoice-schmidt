import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grafica } from "./Grafica";
import prisma from "@/lib/db";
import { date } from "zod";
import { requiereUser } from "../utils/hooks";

async function obtenerFacturas(userId: string) {
    const rawData = await prisma.factura.findMany({
        where: {
            estados: "PAGADO",
            userId: userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            }
        },
        select: {
            createdAt: true,
            total: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    // AGRUPAR Y AGREGAR DATA POR FECHA
    const agregarDatos = rawData.reduce(
        (acum: { [key: string]: number }, curr) => {
        const fecha = new Date(curr.createdAt).toLocaleString("es-CL", {
            month: "short",
            day: "numeric"        
     });
     acum[fecha] = (acum[fecha] || 0) + curr.total;

     return acum;
    },
    {}
  );
  return agregarDatos;
}

export async function FacturaGrafica() {

    const sesion = await requiereUser();
    const data = await obtenerFacturas(sesion.user?.id as string)

    console.log(data);
    

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>
                    Factura pagadas
                </CardTitle>
                <CardDescription>
                    Facturas pagadas los últimos 30 días
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Grafica />
            </CardContent>
        </Card>
    )
}