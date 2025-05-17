import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface BarChartProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

export const BarChart = ({ data, options }: BarChartProps) => {
  return (
    <div className="chart-container">
      <Bar 
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