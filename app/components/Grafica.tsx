"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

/* const data = [
    { fecha: "3 de marzo", monto: 10 },
    { fecha: "5 de marzo", monto: 100 },
    { fecha: "8 de marzo", monto: 500 },

]; */

interface iAppProps {
    data: {
        fecha: string;
        monto: number;
    }[];
}

export function Grafica({ data}: iAppProps) {
    return (
        <ChartContainer
            config={{
                monto: {
                    label: "Monto",
                    color: "hsl(var(--primary))",
                },
            }}
            className="min-h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Line
                        type="monotone"
                        dataKey="monto"
                        stroke="var(--color-monto)"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}