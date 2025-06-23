import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Landing from "./components/landing";
import{ ModelSection} from "./components/Buymodelsection";
import CheckoutSuccess from './pages/Checkoutsuccess';
import CheckoutCancel  from './pages/CechoutCancile';
import { UserProvider } from "./UserContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Create a client
const queryClient = new QueryClient();

function App() {
  const [shouldUpdateCharts, setShouldUpdateCharts] = useState(false);

  const handleClassificationComplete = () => {
    console.log('App: handleClassificationComplete called');
    setShouldUpdateCharts(true);
  };

  const handleUpdateComplete = () => {
    console.log('App: handleUpdateComplete called');
    setShouldUpdateCharts(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="app">
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                  fontSize: "1rem",
                  padding: "1rem 1.5rem",
                  minWidth: "18rem",
                  maxWidth: "90vw",
                  borderRadius: "0.5rem",
                },
              }}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Landing onClassificationComplete={handleClassificationComplete} />
                    <Dashboard 
                      shouldUpdateCharts={shouldUpdateCharts}
                      onUpdateComplete={handleUpdateComplete}
                    />
                    <ModelSection/>
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
               <Route path="/CheckoutSuccess" element={<CheckoutSuccess />} />
                <Route path="/checkout/cancel"  element={<CheckoutCancel />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;