import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface AuthLayoutProps {
  children: ReactNode;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const location = useLocation();

  const getAuthImage = () => {
    if (location.pathname === "/signup") {
      return "../images/Signup.svg";
    }
    return "../images/Login.svg";
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="flex-grow-1 px-4 py-2">
        <div className="container-fluid h-100 p-4 p-md-5">
          <div className="row g-0 h-100 d-flex justify-content-between py-3">
            <h1 className="eco-title mb-3">{title}</h1>
            {subtitle && <div className="text-muted">{subtitle}</div>}
            <div className="col-3 form-container">
              <div className="card h-100 border-0 rounded-0">
                <div className="card-body p-0">{children}</div>
              </div>
            </div>
            <div className="col-7 svg-container d-none d-lg-flex justify-content-end">
              <img
                src={getAuthImage()}
                alt={
                  location.pathname === "/signup"
                    ? "Sign Up Image"
                    : "Login Image"
                }
                className="aside-image"
                style={{ objectFit: "fill" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
