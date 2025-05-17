import { LogOut, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout: storeLogout } = useAuthStore();
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleLogout = () => {
    storeLogout();
    localStorage.removeItem('auth-storage');
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex align-items-baseline"
          href="#"
          onClick={handleLogoClick}
        >
          <span className="logo-text">
            <span>Eco</span>WasteClassifier
          </span>
          <img className="ms-1" src="../images/Trash.svg" alt="Trash icon" />
        </a>
        
        {isAuthPage ? (
          <div className="d-none d-lg-block">
            {location.pathname === "/" ? (
              <p className="text-center mb-0">
                Don't have an account?{" "}
                <Link to="/signup" className="success-color text-decoration-none">
                  Apply Now
                </Link>
              </p>
            ) : (
              <p className="text-center mb-0">
                Already a member?{" "}
                <Link to="/" className="success-color text-decoration-none">
                  Log In
                </Link>
              </p>
            )}
          </div>
        ) : null}

        {!isAuthPage && user && (
          <div className="navbar-user">
            <div className="d-flex align-items-center">
              <User size={24} className="d-none d-sm-block" />
              <span className="navbar-user-name">
                {user.firstName && user.lastName ?
                  `${user.firstName} ${user.lastName}` : user.email
                }
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-link text-dark text-decoration-none d-flex align-items-center p-0"
              >
                <LogOut size={20} className="me-1" />
                <span className="d-none d-sm-inline">Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile auth links */}
        {isAuthPage && (
          <div className="d-lg-none w-100 text-center mt-2">
            {location.pathname === "/" ? (
              <p className="mb-0">
                Don't have an account?{" "}
                <Link to="/signup" className="success-color text-decoration-none">
                  Apply Now
                </Link>
              </p>
            ) : (
              <p className="mb-0">
                Already a member?{" "}
                <Link to="/" className="success-color text-decoration-none">
                  Log In
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;