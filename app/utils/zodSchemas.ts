import { z } from "zod";

export const onboardingSchema = z.object({
    nombre : z.string().min(2, "Nombre es requerido"),
    apellido : z.string().min(2, "Apellido es requerido"),
    direccion: z.string().min(2, "Dirección es requerida"),
});

