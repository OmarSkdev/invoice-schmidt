"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitButton } from "./SubmitButtons";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { crearFactura, editarFactura } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { facturaSchema } from "../utils/zodSchemas";
import { Prisma } from "@prisma/client";
import { formatMoneda } from "../utils/formatMoneda";

interface iAppProps {
    data: Prisma.FacturaGetPayload<{}>;
}

export function EditarFactura({ data }: iAppProps){

    const [ultimoResultado, accion] = useActionState(editarFactura, undefined);
    const [form, fields] = useForm({
        ultimoResultado,

        onValidate({ formData }) {
            return parseWithZod(formData, {
              schema: facturaSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",        
    });
    const [fechaSeleccionada, setSeleccionadoFecha] = useState(data.fecha);
    const [tasa, setTasa] = useState(data.itemTasa.toString());
    const [cantidad, setCantidad] = useState(data.itemCantidad.toString());
    const [moneda, setMoneda] = useState(data.moneda);

    const calcularTotal = (Number(cantidad) || 0) * (Number(tasa) || 0);
 
    return (
        <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">

        <form id={form.id} action={accion} onSubmit={form.onSubmit} noValidate>
        <input type="hidden" 
               name={fields.fecha.name}
               value={fechaSeleccionada.toISOString()}>
        </input>

        <input type="hidden" name="id" value={data.id} />

        <input
            type="hidden"
            name={fields.total.name}
            value={calcularTotal}
         />             
            <div className="flex flex-col gap-1 w-fit mb-6">
                <div className="flex items-center gap-4">
                    <Badge>Borrador</Badge>
                    <Input
                     name={fields.nombreFactura.name}
                     key={fields.nombreFactura.key}
                     defaultValue={data.nombreFactura}
                     placeholder="test123"                         
                    />
                </div>
                <p className="text-sm text-red-500">{fields.nombreFactura.errors}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <Label>N°Factura</Label>
                    <div className="flex">
                        <span className="px-3 border border-r-1 rounded-l-md bg-muted flex items-center">#</span>
                        <Input
                         name={fields.numeroFactura.name}
                         key={fields.numeroFactura.key}
                         defaultValue={data.numeroFactura}
                         className="rounded-l-none"
                         placeholder="5"
                        />
                    </div>                        
                    <p className="text-red-500 text-sm">{fields.numeroFactura.errors}</p>
                </div>
                <div>
                    <Label>Moneda</Label>
                    <Select 
                        defaultValue="CLP"
                        name={fields.moneda.name}
                        key={fields.moneda.key}
                        onValueChange={(value) => setMoneda(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Ingrese Divisa" />                                
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="USD">Dólar Estados Unidos</SelectItem>
                            <SelectItem value="CLP">Pesos - Chile</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-red-500 text-sm">{fields.moneda.errors}</p>
                </div>
            </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input
                             name={fields.deNombre.name}
                             key={fields.deNombre.key}
                             placeholder="Tu Nombre"
                             defaultValue={data.deNombre}
                            />
                            <p className="text-red-500 text-sm">{fields.deNombre.errors}</p>
                            <Input 
                                name={fields.deDireccion.name}
                                key={fields.deDireccion.key}
                                placeholder="Tu Apellido"
                                defaultValue={data.deDireccion}
                            />
                            <p className="text-red-500 text-sm">{fields.deDireccion.errors}</p>

                            <Input 
                                name={fields.deEmail.name}
                                placeholder="Tu Email"
                                key={fields.deEmail.key}
                                defaultValue={data.deEmail}
                                />
                                <p className="text-red-500 text-sm">{fields.deEmail.errors}</p>

                        </div>                            
                    </div>  

                    <div>
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input
                                placeholder="Nombre Cliente"
                                name={fields.NombreCliente.name}
                                key={fields.NombreCliente.key}
                                defaultValue={data.NombreCliente}
                                
                            />
                            <p className="text-red-500 text-sm">{fields.NombreCliente.errors}</p>
                            <Input 
                                name={fields.EmailCliente.name}
                                key={fields.EmailCliente.key}
                                defaultValue={data.EmailCliente}
                                placeholder="Tu Email"
                            />
                            <p className="text-red-500 text-sm">{fields.EmailCliente.errors}</p>

                            <Input
                                 name={fields.DireccionCliente.name}
                                 key={fields.DireccionCliente.key}
                                 defaultValue={data.DireccionCliente}
                                placeholder="Tu Dirección"
                            />
                            <p className="text-red-500 text-sm">{fields.DireccionCliente.errors}</p>

                        </div>       
                    </div>                  
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <div>
                            <Label>Fecha</Label>
                        </div>
                        
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" 
                                 className="w-[280px] text-left justify-start">
                                    <CalendarIcon />
                                    {
                                        fechaSeleccionada ? (
                                            new Intl.DateTimeFormat("es-CL", {
                                                dateStyle:"long",
                                            }).format(fechaSeleccionada)
                                        ):(
                                            <span>Seleccione Fecha</span>
                                        )
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    selected={fechaSeleccionada}
                                    onSelect={(date) => setSeleccionadoFecha(date || new Date())}
                                    mode="single"
                                    fromDate={new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                        <p className="text-red-500 text-sm">{fields.fecha.errors}</p>
                    </div>
                    <div>
                        <Label>Factura Pendiente</Label>
                        <Select
                            name={fields.fechaVenc.name}
                            key={fields.fechaVenc.key}
                            defaultValue={data.fechaVenc.toString()}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione Fecha de Venc." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Al Recibir</SelectItem>
                                <SelectItem value="15">15 días</SelectItem>
                                <SelectItem value="30">30 días</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-green-500 text-sm">{fields.fechaVenc.errors}</p>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                        <p className="col-span-6">Descripción</p>
                        <p className="col-span-2">Cantidad</p>
                        <p className="col-span-2">impuesto</p>
                        <p className="col-span-2">Monto</p>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                        <div className="col-span-6">
                            <Textarea 
                                name={fields.itemDescripcion.name}
                                key={fields.itemDescripcion.key}
                                defaultValue={data.itemDescripcion}
                                placeholder="Items & descripción" 
                            />
                            <p className="text-green-500 text-sm">{fields.itemDescripcion.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input 
                                type="number"
                                placeholder="0"
                                name={fields.itemCantidad.name}
                                key={fields.itemCantidad.key}
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                            <p className="text-blue-500 text-sm">{fields.itemCantidad.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input
                                name={fields.itemTasa.name} 
                                key={fields.itemTasa.key}
                                type="number" 
                                placeholder="0" 
                                value={tasa}
                                onChange={(e) => setTasa(e.target.value)}
                            />
                            <p className="text-red-500 text-sm">{fields.itemTasa.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input 
                            value={formatMoneda({
                                monto: calcularTotal,
                                moneda: moneda as any
                                })
                            }                                
                            disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="w-1/3">
                        <div className="flex justify-between py-2">
                            <span>SubTotal</span>
                            <span>{formatMoneda({
                               monto: calcularTotal,
                               moneda: moneda as any, 
                            })
                            }
                            </span>
                        </div>
                        <div className="flex justify-between py-2 border-t">
                            <span>Total ({moneda})</span>
                            <span className="font-medium underline underline-offset-2">
                                {formatMoneda({
                                    monto: calcularTotal,
                                    moneda: moneda as any,
                                    })
                                }
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <Label>Nota:</Label>
                    <Textarea 
                        placeholder="AGREGA tu nota/ aquí..."
                        name={fields.nota.name} 
                        key={fields.nota.key}
                        defaultValue={data.nota?? undefined}
                    />
                    <p className="text-green-500 text-sm">{fields.nota.errors}</p>
                </div>
                <div className="flex items-center justify-end mt-6">
                    <div>
                       <SubmitButton text="Actualizar Factura" />                            
                    </div>
                </div>
        </form>    
        </CardContent>
        
        
    </Card>
    )
}