import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png"
import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export function NavBar(){
    return(
        <div className="flex items-center justify-between py-5">
            <Link href="/">
                <Image src={Logo} alt="Logo" className="size-10" />
                <h3 className="text-3xl font-semibold">
                    Factura<span className="text-blue-500">Schmidt</span>
                </h3>
            </Link>
            <Link href="/login"><RainbowButton>Empezar</RainbowButton>                
            </Link>
        </div>
    )
}