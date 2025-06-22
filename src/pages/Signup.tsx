import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

interface SignupFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: Partial<SignupFormData> = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
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
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={
        <div className="rubik">
          Cr<span className="eco-span">e</span>ate Ac
          <span className="eco-span">c</span>ount N
          <span className="eco-span">o</span>w
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
        <div className="mb-4">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <div className="input-group">
            <img
              src="../images/username.svg"
              alt="user icon"
              className="email-icon username-icon bg-light d-flex justify-content-center align-items-center px-3 fs-4 pe-2 rounded-start-3"
            />
            <input
              type="text"
              className={`form-control bg-light ps-1 ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              disabled={isLoading}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <div className="input-group">
            <img
              src="../images/username.svg"
              alt="user icon"
              className="email-icon username-icon bg-light d-flex justify-content-center align-items-center px-3 fs-4 pe-2 rounded-start-3"
            />
            <input
              type="text"
              className={`form-control bg-light ps-1 ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              placeholder="Smith"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              disabled={isLoading}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="mb-4">
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
        <button 
          type="submit" 
          className="btn btn-dark w-100 my-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : null}
          {isLoading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;