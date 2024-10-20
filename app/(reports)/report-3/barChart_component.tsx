import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface BarChartProps {
  positiveAvg: number | null;
  negativeAvg: number | null;
}

const BarChartComponent = ({ positiveAvg, negativeAvg }: BarChartProps) => {
  const data = [
    { name: 'Positive Reviews', avg: positiveAvg || 0 },
    { name: 'Negative Reviews', avg: negativeAvg || 0 },
  ];

  return (
    <div className="py-4">
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avg" fill="#4caf50" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;