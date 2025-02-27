"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";


interface iAppProps {
    id: string;
    estados: string;
}

export function FacturaAcciones({ id, estados }: iAppProps) {

    const manejoEnvioRecordatorio = () => {
        toast.promise(
            fetch(`/api/email/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            {
                loading: "Enviando recordatorio email...",
                success: "Recordatorio email enviado exitosamente",
                error: "Envío de Email recordatorio fallido"
            }
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/facturas/${id}`}>
                        <Pencil className="size-4 mr-2" />Editar
                    </Link>
                </DropdownMenuItem>
            
                <DropdownMenuItem asChild>
                    <Link href={`/api/factura/${id}`} target="_blank">
                        <DownloadCloudIcon className="size-4 mr-2" />Descargar Factura
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={manejoEnvioRecordatorio}>                    
                        <Mail className="size-4 mr-2" />Enviar Email                    
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/facturas/${id}/eliminar`}>
                        <Trash className="size-4 mr-2" />Eliminar Factura
                    </Link>
                </DropdownMenuItem>
                {estados !== "PAGADO" && (
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/facturas/${id}/pagado`}>
                        <CheckCircle className="size-4 mr-2" />Marcar como Pagado
                    </Link>
                </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}