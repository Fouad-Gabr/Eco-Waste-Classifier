import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={
        <div className="rubik">
          Welcome to <span className="eco-span">Eco</span>WasteClassifier
        </div>
      }
      subtitle={
        <div className="subtitle px-2 pt-2 pb-4">
          EcoWasteClassifier is an AI-powered waste classification system
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" htmlFor="email">Email</label>
          <div className="input-group">
            <img
              src="../images/email.svg"
              alt="email icon"
              className="email-icon bg-light d-flex justify-content-center align-items-center px-3 fs-4 pe-2 rounded-start-3"
            />
            <input
              type="email"
              className={`form-control bg-light ps-1 ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="johnsmith@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isLoading}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="input-group">
            <img
              src="../images/lock.svg"
              alt="lock icon"
              className="lock-icon bg-light d-flex justify-content-center align-items-center px-3 fs-4 pe-2 rounded-start-3"
            />
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control bg-light ps-1 ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
            />
            <button
              type="button"
              className="btn btn-light eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        </div>
        <div className="mb-5 d-flex justify-content-between align-items-center px-2">
          <div className="form-check d-flex">
            <input
              type="checkbox"
              className="form-check-input remember-check-icon me-1"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              disabled={isLoading}
            />
            <label
              className="form-check-label remember-me"
              htmlFor="rememberMe"
            >
              Remember me
            </label>
          </div>
          <a href="#" className="forgot-pass">
            Forgot password?
          </a>
        </div>
        <button 
          type="submit" 
          className="btn btn-dark w-100 mb-3 rounded-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : null}
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;