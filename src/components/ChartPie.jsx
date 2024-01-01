import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";

export function ChartPie({ data, height, dataKey, nameKey }) {
  const COLORS = ['#0f5bff', '#7200fc', '#00bfff', '#b700ff'];
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className={`hidden ${percent !== 0 ? "md:flex" : null}`}>
        {name} - {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart margin={{ top: 0, right: 0, bottom: 10, left: 0 }}>
        <Tooltip />
        <Pie
          dataKey={dataKey}
          nameKey={nameKey}
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
        >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
      </PieChart>
      <div className="bgb"></div>
    </ResponsiveContainer>
  );
}
