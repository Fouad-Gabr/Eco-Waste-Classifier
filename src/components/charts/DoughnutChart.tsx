import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface DoughnutChartProps {
  data: ChartData<'doughnut'>;
  options?: ChartOptions<'doughnut'>;
}

export const DoughnutChart = ({ data, options }: DoughnutChartProps) => {
  return (
    <div className="chart-container">
      <Doughnut 
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