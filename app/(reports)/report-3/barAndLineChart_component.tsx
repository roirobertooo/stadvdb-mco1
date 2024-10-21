import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

interface QuarterlyData {
  quarter: string;
  avg_peak_ccu: number;
}

type Props = {
  quarterlyCcu: Array<QuarterlyData>;
};

const BarLineChartComponent: React.FC<Props> = ({ quarterlyCcu }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={quarterlyCcu}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avg_peak_ccu" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="avg_peak_ccu" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BarLineChartComponent;