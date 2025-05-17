import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface AreaChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

export const AreaChart = ({ data, options }: AreaChartProps) => {
  return (
    <div className="chart-container">
      <Line 
        data={data} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
          ...options,
        }} 
      />
    </div>
  );
};