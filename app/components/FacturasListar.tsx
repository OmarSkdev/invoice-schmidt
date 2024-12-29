import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FacturaAcciones } from "./FacturaAcciones";

export function FacturasListar() {
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
                <TableRow>
                    <TableCell>#1</TableCell>
                    <TableCell>Omar Schmidt</TableCell>
                    <TableCell>$55.000</TableCell>
                    <TableCell>Pagado</TableCell>
                    <TableCell>22/11/2024</TableCell>
                    <TableCell className="text-right">
                        <FacturaAcciones />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
    
}