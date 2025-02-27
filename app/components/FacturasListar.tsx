import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FacturaAcciones } from "./FacturaAcciones";
import prisma from "@/lib/db";
import { requiereUser } from "../utils/hooks";
import { formatMoneda } from "../utils/formatMoneda";
import { Badge } from "@/components/ui/badge";

async function obtenerData(userId: string) {
    const data = await prisma.factura.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            NombreCliente: true,
            total: true,
            createdAt: true,
            estados: true,
            numeroFactura: true,
            moneda: true,
        },
        orderBy: {
            createdAt:"desc"
        },
    });

    return data;
}

export async function FacturasListar() {

    const sesion = await requiereUser();
    const data = await obtenerData(sesion.user?.id as string)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID fActura</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((factura) => (
                    <TableRow key={factura.id}>
                        <TableCell>#{factura.numeroFactura}</TableCell>
                        <TableCell>{factura.NombreCliente}</TableCell>
                        <TableCell>
                            {formatMoneda({
                                monto: factura.total,
                                moneda: factura.moneda as any,
                            })
                            }
                        </TableCell>
                        
                        <TableCell>
                            <Badge>{factura.estados}</Badge>                        
                        </TableCell>
                        <TableCell>{new Intl.DateTimeFormat("es-CL", {
                                dateStyle: "medium",
                            }).format(factura.createdAt)
                        }</TableCell>
                        <TableCell className="text-right">
                            <FacturaAcciones estados={factura.estados} id={factura.id} />
                        </TableCell>
                    </TableRow>
                ))}                
            </TableBody>
        </Table>
    )
    
}