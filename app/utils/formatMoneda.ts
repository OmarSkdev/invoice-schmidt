interface iAppProps {
    monto: number;
    moneda: "CLP" | "USD";
}

export function formatMoneda({ monto, moneda }: iAppProps) {
    return new Intl.NumberFormat("es-CL",
        {
            style: "currency",
            currency: moneda,
        }
    ).format(monto);
}