import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utils/auth";
import { SubmitButton } from "../components/SubmitButtons";
import { redirect } from "next/navigation";

export default async function Login() {
    const sesion = await auth();

    if (sesion?.user) {
        redirect('/dashboard')
    }
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Login
                        </CardTitle>
                        <CardDescription>
                            Ingrese tu email para iniciar sesión
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            action={async (formData) => {
                                "use server";
                                await signIn("nodemailer", formData);
                            }}
                            className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-2">
                                <Label>
                                    Email
                                </Label>
                                <Input 
                                 name="email"
                                 type="email"
                                 placeholder="mail@.com" required></Input>
                            </div>
                            <SubmitButton />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}