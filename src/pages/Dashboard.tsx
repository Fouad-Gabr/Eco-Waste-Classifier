import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useAuthStore } from '../store/authStore';
import { useClassification } from '../hooks/useClassification';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DashboardProps {
  shouldUpdateCharts?: boolean;
  onUpdateComplete?: () => void;
}

const Dashboard = ({ shouldUpdateCharts, onUpdateComplete }: DashboardProps) => {
  const { user } = useAuthStore();
  const { fetchClassCounts } = useClassification();
  const chartsRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState({
    categories: ['plastic', 'glass', 'metal', 'paper', 'cardboard', 'trash'],
    barData: [16, 25, 15, 9, 8, 19],
    areaData: [16, 25, 15, 9, 8, 19],
    doughnutData: [16, 25, 15, 9, 8, 19],
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle chart updates when shouldUpdateCharts changes
  const updateChartsWithApiData = async () => {
  if (!user) {
    console.log('Dashboard: User not logged in, keeping static data');
    return;
  }

  try {
    console.log('Dashboard: Fetching class counts for logged-in user...');
    const classCountsData = await fetchClassCounts();

    if (classCountsData && typeof classCountsData === 'object') {
      const categories = ['plastic', 'glass', 'metal', 'paper', 'cardboard', 'trash'];
      const values = categories.map(cat => classCountsData[cat] || 0);

      console.log('Dashboard: Fetched class distribution:', values);

      setChartData(prev => ({
        ...prev,
        categories,
        barData: values,
        areaData: values,
        doughnutData: values,
      }));

      setTimeout(() => {
        if (chartsRef.current) {
          chartsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 2000);
        }
      }, 300);

      toast.success('Charts updated with real user data!');

      if (onUpdateComplete) {
        onUpdateComplete();
      }
    }
  } catch (error) {
    console.error('Dashboard: Error updating charts:', error);
    toast.error('Failed to update charts');
  }
};


  // Watch for shouldUpdateCharts prop changes
  useEffect(() => {
    if (shouldUpdateCharts) {
      console.log('Dashboard: shouldUpdateCharts is true, updating charts');
      updateChartsWithApiData();
    }
  }, [shouldUpdateCharts]);

  // Set up intersection observer for chart animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isAnimating) {
            console.log('Dashboard: Charts in view, applying animation');
            entry.target.classList.add('animate-chart');
            setTimeout(() => {
              entry.target.classList.remove('animate-chart');
            }, 2000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chartsRef.current) {
      observer.observe(chartsRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimating]);

  const barChartData = {
    labels: chartData.categories,
    datasets: [
      {
        label: 'Number of classified items',
        data: chartData.barData,
        backgroundColor: [
          '#1e3a8a',
          '#065f46',
          '#0d9488',
          '#fb923c',
          '#fa568b',
          '#ef4444',
        ],
      },
    ],
  };

  const doughnutData = {
    labels: chartData.categories,
    datasets: [
      {
        data: chartData.doughnutData,
        backgroundColor: [
          '#1e3a8a',
          '#065f46',
          '#0d9488',
          '#fb923c',
          '#fa568b',
          '#ef4444',
        ],
      },
    ],
  };

  const areaChartData = {
    labels: chartData.categories,
    datasets: [
      {
        fill: true,
        label: 'Items',
        data: chartData.areaData,
        borderColor: '#64748b',
        backgroundColor: 'rgba(100, 116, 139, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isAnimating ? 2000 : 1000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
    },
  };

  return (
    <>
      <div className="container-fluid py-4">
        <div className="row h-100">
          <div className="col-md-8">
            {/* Charts Section */}
            <div ref={chartsRef} id="charts" className="row mb-4">
              <div className="col-12">
                <div className="card shadow-custom">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4 fw-bold">
                      System performance
                      {!user && (
                        <small className="text-muted ms-2">
                          (Login and scan items to get your Live data)
                        </small>
                      )}{user && (
                        <small className="text-muted ms-2">
                          (Scan Items to get your Live data)
                        </small>
                      )}
                    </h5>
                    <div className="chart-container">
                      <Bar data={barChartData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card shadow-custom">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">Area Chart</h5>
                    <div className="chart-container">
                      <Line data={areaChartData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-custom h-100">
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="card-title mb-4 d-flex justify-content-center fw-bold">30 days performance</h5>
                <div className="text-center mb-4">
                  <div className="row">
                    <div className="col-6">
                      <h3 className="stats-number">
                        {chartData.barData.reduce((a, b) => a + b, 0).toLocaleString()}
                      </h3>
                      <p className="stats-label">Total Items</p>
                    </div>
                    <div className="col-6">
                      <h3 className="stats-number">
                        {chartData.barData[5].toLocaleString()}
                      </h3>
                      <p className="stats-label">Trash</p>
                    </div>
                  </div>
                </div>
                <div className="chart-container flex-grow-1 mb-4">
                  <Doughnut data={doughnutData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;