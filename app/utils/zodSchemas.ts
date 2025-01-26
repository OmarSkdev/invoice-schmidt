import { z } from "zod";

export const onboardingSchema = z.object({
    nombre : z.string().min(2, "Nombre es requerido"),
    apellido : z.string().min(2, "Apellido es requerido"),
    direccion: z.string().min(2, "Dirección es requerida"),
});

export const facturaSchema = z.object({
    nombreFactura : z.string().min(1, "Nombre Factura es requerido"),
    total : z.number().min(1, "$1 es mínimo"),
    estados : z.enum(["PAGADO","PENDIENTE"]).default("PENDIENTE"),
    fecha : z.string().min(1, "Fecha es requerida"),
    fechaVenc : z.number().min(0, "Fecha es requerida"),
    deNombre : z.string().min(1, "tu Nombre es requerido"),
    deEmail : z.string().email("Email es requerido"),
    deDireccion : z.string().min(1, "Dirección es requerida"),
    NombreCliente : z.string().min(1, "Cliente es requerido"),
    EmailCliente : z.string().email("Email es inválido"),
    DireccionCliente : z.string().min(1, "Dirección es requerida"),
    moneda : z.string().min(1, "Moneda es requerida"),
    numeroFactura : z.number().min(1, "Mínimo 1 número de Factura"),
    nota : z.string().optional(),

    itemDescripcion : z.string().min(1, "Descripción es requerida"),
    itemCantidad : z.number().min(1,"Cantidad mínima 1"),
    itemTasa : z.number().min(1,"Tasa min 1")

})

