import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface iAppProps {
    titulo: string;
    descripcion: string;
    textoboton: string;
    href: string;
}

export function EstadoVacio({
    textoboton,
    titulo,
    descripcion, 
    href,
    }: iAppProps) 
    {
    return (
        <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border-2
        border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
                <Ban className="size-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">Por favor crear una cuenta</h2>
            <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xm mx-auto text-center">
                No tienes facturas creadas, por favor crea una
            </p>
            <Link href={href} className={buttonVariants()}>
                <PlusCircle className="size-4 mr-2" /> Crear Factura
            </Link>
        </div>
    )
}