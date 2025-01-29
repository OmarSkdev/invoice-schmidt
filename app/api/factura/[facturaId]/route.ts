import prisma from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatMoneda } from "@/app/utils/formatMoneda";

export async function GET(request: Request, {params,}: {params:Promise<{ facturaId: string }>;})

{
    const { facturaId} = await params;
    //return NextResponse.json({ message: facturaId});
    const data = await prisma.factura.findUnique({
        where : {
            id: facturaId,
        },
        select: {
            nombreFactura: true,
            numeroFactura: true,
            moneda: true,
            deNombre: true,
            deEmail: true,
            deDireccion: true,
            NombreCliente: true,
            DireccionCliente: true,
            EmailCliente: true,
            fecha: true,
            fechaVenc: true,
            itemDescripcion: true,
            itemCantidad: true,
            itemTasa: true,
            total:true,
            nota: true,
        },        
    });

    if (!data) {
        return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
    }

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    // poner tipo letras
    pdf.setFont("helvetica");

    //poner encabezado
    pdf.setFontSize(24);
    pdf.text(data.nombreFactura, 20, 20);

    //deSección
    pdf.setFontSize(12);
    pdf.text("De", 20, 40);
    pdf.setFontSize(10);
    pdf.text([data.deNombre, data.deEmail, data.deDireccion], 20, 45);
    
    //Cliente Sección
    pdf.setFontSize(12);
    pdf.text("Cliente", 20, 70);
    pdf.setFontSize(10);
    pdf.text([data.NombreCliente, data.EmailCliente, data.DireccionCliente], 20, 75);

    // Detalles Factura 
    pdf.setFontSize(10);
    pdf.text(`N° Factura: #${data.numeroFactura}`, 120, 70);
    pdf.text(
        `Fecha: ${new Intl.DateTimeFormat("es-CL", {
            dateStyle: "long",
        }).format(data.fecha)}`, 120, 45
        );
        pdf.text(`Fecha Venc. : Plazo ${data.fechaVenc}`, 120, 50);

        //iteme tabla header
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text("Descripción",20, 100);
        pdf.text("Cantidad",100, 100);
        pdf.text("Tasa",130, 100);
        pdf.text("Total",160, 100);

        //dibujar línea de encabezado
        pdf.line(20, 102, 190, 102);

        //detalle items
        pdf.setFont("helvetica", "normal");
        pdf.text(data.itemDescripcion, 20, 110);
        pdf.text(data.itemCantidad.toString(), 100, 110);
        pdf.text(
            formatMoneda({
                monto: data.itemTasa,
                moneda: data.moneda as any,
            }),
            130,
            110            
        );
        // total seccion
        pdf.text(
            formatMoneda({
                monto: data.total, moneda: data.moneda as any
            }),
            160,
            110
        );
        pdf.line(20, 115, 190, 115);
        pdf.setFont("helvetica","bold");
        pdf.text(`Total: (${data.moneda})`, 130, 130);
        pdf.text(
            formatMoneda({
                monto: data.total, moneda: data.moneda as any
            }),
            160,
            130
        );

        //adicional nota
        if (data.nota) {
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.text("Nota:", 20, 150);
            pdf.text(data.nota, 20, 155);
        }



    //generar pdf como buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    //return pdf como vista para descarga
    return new NextResponse(pdfBuffer, {
        headers:{
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline",
        },
    });
}
