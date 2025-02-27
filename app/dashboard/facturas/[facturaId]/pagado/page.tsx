import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import PagoGif from "@/public/paid-gif.gif"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { AccionMarcarPagado } from "@/app/actions";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { requiereUser } from "@/app/utils/hooks";

async function Autorizar(facturaId: string, userId: string) {
    const data = await prisma.factura.findUnique({
        where: {
            id: facturaId,
            userId: userId,
        },
    });
    if (!data){
        return redirect("/dashboard/facturas");
    }
}

type Params = Promise<{ facturaId: string }>;

export default async function MarcarPagado({ params}:{ params: Params}){
    const { facturaId } = await params;
    const sesion = await requiereUser();
    await Autorizar(facturaId, sesion.user?.id as string)
    
    return(
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500]">
                <CardHeader>
                    <CardTitle>Marcar como pagado?</CardTitle>
                    <CardDescription>
                        Estás seguro que deseas marcar como pagada?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={PagoGif} alt="Pago GIF" className="rounded-lg" />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link 
                        className={buttonVariants({ variant: "outline"})} 
                        href="/dashboard/facturas">Cancelar</Link>
                    
                    <form action={async () => {
                        "use server"
                        await AccionMarcarPagado(facturaId)
                    }}>
                        <SubmitButton text="Marcar como Pagado!" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}