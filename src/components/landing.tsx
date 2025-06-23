import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { api } from '../lib/axios';
import toast from 'react-hot-toast';
import { ImageClassificationDrawer } from '../components/ImageClassificationDrawer';
import { BuyButton } from './BuyButton';
import { useAuthStore } from '../store/authStore';

interface LandingPageProps {
  onClassificationComplete?: () => void;
}

const LandingPage = ({ onClassificationComplete }: LandingPageProps) => {
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { user } = useAuthStore();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/classify/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSelectedImage(URL.createObjectURL(file));
      setClassificationResult(response.data);
      setIsDrawerOpen(true);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to classify image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebcamCapture = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setIsLoading(true);

    const blob = await (await fetch(imageSrc)).blob();
    const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/classify/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSelectedImage(imageSrc);
      setClassificationResult(response.data);
      setIsDrawerOpen(true);
      setIsWebcamOpen(false);
    } catch (error: any) {
      console.error('Webcam upload error:', error);
      toast.error('Failed to classify image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerClose = () => {
    console.log('Landing: handleDrawerClose called, user:', user); // Debug log
    setIsDrawerOpen(false);
    
    // Only trigger chart update if user is logged in and callback exists
    if (user && onClassificationComplete) {
      console.log('Landing: Triggering onClassificationComplete'); // Debug log
      onClassificationComplete();
    } else {
      console.log('Landing: Not triggering callback - user:', !!user, 'callback:', !!onClassificationComplete);
    }
  };

  return (
    <>
      <div
        className="landing-page d-flex relative flex-column justify-content-center align-items-center text-white"
        style={{
          minHeight: '100vh',
          backgroundImage: `url('../../images/bg1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          padding: '2rem',
          position: 'relative',
        }}
      >
        <div className="absolute layout inset-0 bg-black bg-opacity-50" ></div>
        <h1 className="mb-4 fw-bold display-4 z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' ,zIndex: 1}}>
          AI Waste Classifier – Smarter Waste Management
        </h1>

        <div className="d-flex flex-row gap-3 z-10" style={{zIndex: 1}}>
          <label htmlFor="fileInput" className="btn btn-success btn-lg">
            {isLoading && (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          )}
            {isLoading ? 'Processing...' : 'Scan Items'}
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="d-none"
            onChange={handleFileUpload}
          />

          <button className="btn btn-primary btn-lg" onClick={() => setIsWebcamOpen(true)}>
            Use Webcam
          </button>
        </div>

        {isWebcamOpen && (
          <div className="mt-4 bg-dark p-3 rounded"style={{zIndex: 1}}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
            />
            <div className="mt-3 d-flex gap-2 justify-content-center"style={{zIndex: 1}}>
              <button className="btn btn-warning" onClick={handleWebcamCapture}>
                {isLoading && (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          )}
                {isLoading ? 'Processing...' : 'Capture & Classify'}
              </button>
              <button className="btn btn-secondary" onClick={() => setIsWebcamOpen(false)}style={{zIndex: 1}}>
                Close Webcam
              </button>
            </div>
          </div>
        )}
      </div>

      <ImageClassificationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedImage={selectedImage}
        classificationResult={classificationResult}
        onDrawerClose={handleDrawerClose}
      />

      {/* <BuyButton/> */}
    </>
  );
};

export default LandingPage;