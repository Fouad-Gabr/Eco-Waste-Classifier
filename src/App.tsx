import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
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
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
