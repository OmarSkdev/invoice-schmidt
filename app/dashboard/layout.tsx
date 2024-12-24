import { ReactNode } from "react";
import { requiereUser } from "../utils/hooks";
import Link from "next/link";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { DashboardLinks } from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "../utils/auth";

export default async function DashboardLayout({ children }:{ children:ReactNode}){

    const sesion = await requiereUser()
    return(
        <>
            <div className="grid min-h-screen w-full md:gird-cols-[220px_1fr]
            lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex flex-col max-h-screen h-full gap-2">
                        <div className="h-14 flex items-center border-b px-4 lg:h-[60px]
                         lg:px-6"> 

                         <Link href="/" className="flex items-center gap-3">
                            <Image src={Logo} alt="Logo" className="size-7" />
                            <p className="text 2xl font-bold">
                                Factura<span className="text-blue-600">Schmidt</span>
                            </p>
                         </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <DashboardLinks />
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="md:hidden">
                                    <Menu className="size-5"></Menu>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <nav className="grid gap-2 mt-10">
                                    <DashboardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="flex items-center ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                      className="rounded-full"
                                      variant="outline"
                                      size="icon"
                                    >
                                        <User2 />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">DashBoard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/facturas">Facturas</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <form 
                                        className="w-full"
                                        action={async () => {
                                            "use server";
                                            await signOut();
                                        }}
                                        >
                                            <button className="w-full text-left">Cerrar Sesión</button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
                        {children}
                    </main>                        
                </div>

            </div>
            { children }
        </>
    )
}