import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
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
                        <form>
                            <div className="flex flex-col gap-y-2">
                                <Label>
                                    Email
                                </Label>
                                <Input placeholder="mail@.com"></Input>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}