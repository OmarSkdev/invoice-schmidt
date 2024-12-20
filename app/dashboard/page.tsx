
import { signOut } from "../utils/auth";
import { requiereUser } from "../utils/hooks"

export default async function Dashboard() {
    const sesion = await requiereUser();
    return (
        <div>
            <h1>Hola desde Dashboard</h1>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
                >
                <button type="submit">Cerrar Sesión</button>
            </form>
            
        </div>
    )
}