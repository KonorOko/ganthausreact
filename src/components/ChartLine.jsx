import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export function ChartLine({ data, height }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 15 }}>
        <ReferenceLine y={0} stroke="red" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="cantidad"
          stroke="#8884d8"
          activeDot={{ r: 6 }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="fecha"
          padding={{ left: 1, right: 30 }}
          label={{ value: "Tiempo", offset: -10, position: "insideBottom" }}
        />
        <YAxis
          interval="preserveStartEnd"
          label={{
            style: { textAnchor: "middle" },
            value: "Pesos MXN",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
