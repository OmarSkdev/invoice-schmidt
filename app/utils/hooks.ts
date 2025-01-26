import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requiereUser() {
    const sesion = await auth();

    if (!sesion?.user) {
        redirect("/login")
    }

    return sesion;
} 

