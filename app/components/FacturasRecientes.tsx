import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { requiereUser } from "../utils/hooks";
import { formatMoneda } from "../utils/formatMoneda";

async function obtenerDatos(userId: string) {
    const data = await prisma.factura.findMany({
        where: {
            userId: userId,
        },
        select: {
            id:true,
            NombreCliente:true,
            EmailCliente:true,
            total:true,
            moneda:true,
            
        },
        orderBy:{
            createdAt: "desc"
        },
        take: 7,
    });

    return data;
}

export async function FacturasRecientes() {
    const sesion = await requiereUser();
    const data = await obtenerDatos(sesion.user?.id as string);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Facturas Recientes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {data.map((item) => (
                <div className="flex items-center gap-4" key={item.id}>
                    <Avatar className="hidden sm:flex size-9">
                        <AvatarFallback>{item.NombreCliente.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">{item.NombreCliente}</p>
                        <p className="text-sm text-muted-foreground">{item.EmailCliente}</p>
                    </div>
                    <div className="ml-auto font-medium">
                        +
                        {formatMoneda({
                            monto: item.total,
                            moneda: item.moneda as any,
                        }

                        )}
                    </div>
                </div>
                ))}
            </CardContent>
        </Card>
    )
}