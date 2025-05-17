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
import { useState } from 'react';
import { ImageClassificationDrawer } from '../components/ImageClassificationDrawer';
import { api } from '../lib/axios';
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

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Plastic', 'Glass', 'Metal', 'Paper', 'Cardboard', 'Trash'];
  const barData = [16, 29, 18, 7, 6, 19];
  const areaData = [25, 21, 14, 15, 18, 4];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      setSelectedImage(URL.createObjectURL(file));
      const token = localStorage.getItem('token'); 
      const response = await api.post('/classify/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setClassificationResult(response.data);
      setIsDrawerOpen(true);
    } catch (error: any) {
      console.error('Classification error:', error);
      toast.error(error.response?.data?.detail || 'Failed to classify image');
    } finally {
      setIsLoading(false);
    }
  };

  const barChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Number of classified items',
        data: barData,
        backgroundColor: [
          '#1e3a8a',
          '#065f46',
          '#0d9488',
          '#f59e0b',
          '#fb923c',
          '#ef4444',
        ],
      },
    ],
  };

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: [20, 15, 15, 20, 15, 15],
        backgroundColor: [
          '#1e3a8a',
          '#065f46',
          '#0d9488',
          '#f59e0b',
          '#fb923c',
          '#ef4444',
        ],
      },
    ],
  };

  const areaChartData = {
    labels: categories,
    datasets: [
      {
        fill: true,
        label: 'Items',
        data: areaData,
        borderColor: '#64748b',
        backgroundColor: 'rgba(100, 116, 139, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
            <div className="row mb-4">
              <div className="col-12">
                <div className="card shadow-custom">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">System performance</h5>
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
                <h5 className="card-title mb-4">30 days performance</h5>
                <div className="text-center mb-4">
                  <div className="row">
                    <div className="col-6">
                      <h3 className="stats-number">50,000</h3>
                      <p className="stats-label">Total Items</p>
                    </div>
                    <div className="col-6">
                      <h3 className="stats-number">25,000</h3>
                      <p className="stats-label">Trash</p>
                    </div>
                  </div>
                </div>
                <div className="chart-container flex-grow-1 mb-4">
                  <Doughnut data={doughnutData} options={chartOptions} />
                </div>
                <div className="d-grid gap-2 mt-auto">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="imageUpload"
                    className={`btn btn-success ${isLoading ? 'disabled' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      'Scan Items'
                    )}
                  </label>
                  <button className="btn btn-dark">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageClassificationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedImage={selectedImage}
        classificationResult={classificationResult}
      />
    </>
  );
};

export default Dashboard;