import { FacturasListar } from "@/app/components/FacturasListar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function FacturasRoute() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">Título</CardTitle>
                        <CardDescription>mira acá esta tarjeta</CardDescription>
                    </div>
                    <Link href="/dashboard/facturas/crear" className={buttonVariants()}>
                        <PlusIcon /> Crear Factura
                    </Link>
                
                </div>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<Skeleton className="w-full h[500px]" />}>
                    <FacturasListar />
                </Suspense>
                
            </CardContent>
        </Card>
    )
}