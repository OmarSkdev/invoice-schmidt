import { FacturasListar } from "@/app/components/FacturasListar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default function FacturasRoute() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">Título</CardTitle>
                        <CardDescription>mira acá esta tarjeta</CardDescription>
                    </div>
                    <Link href="" className={buttonVariants()}>
                        <PlusIcon /> Crear Factura
                    </Link>
                
                </div>
            </CardHeader>
            <CardContent>
                <FacturasListar />
            </CardContent>
        </Card>
    )
}