import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export function FacturaAcciones() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="">
                        <Pencil className="size-4 mr-2" />Editar
                    </Link>
                </DropdownMenuItem>
            
                <DropdownMenuItem asChild>
                    <Link href="">
                        <DownloadCloudIcon className="size-4 mr-2" />Descargar Factura
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <Mail className="size-4 mr-2" />Enviar Email
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <Trash className="size-4 mr-2" />Eliminar Factura
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <CheckCircle className="size-4 mr-2" />Marcar como Pagado
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}