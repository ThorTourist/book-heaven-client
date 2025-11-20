import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logoImg from "../../assets/images/logo.png";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // toggle dropdown

  const links = (
    <>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/allbooks"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        All Books
      </NavLink>
      <NavLink
        to="/addbook"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        Add Book
      </NavLink>
      <NavLink
        to="/mybooks"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        My Books
      </NavLink>
      <NavLink
        to="/myprofile"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        My Profile
      </NavLink>
    </>
  );

  const handleLogout = () => {
    logoutUser().then(() => navigate("/login"));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-10">
      {/* Navbar Start: Logo + Hamburger */}
      <div className="navbar-start">
        <div className="flex items-center gap-2">
          <NavLink
            to="/home"
            className="btn btn-ghost text-sm md:text-xl inter text-purple-800 font-bold"
          >
            <img className="h-8 w-8" src={logoImg} alt="" /> The Book Heaven
          </NavLink>

          {/* Hamburger for mobile/md */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-ghost p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Center: Links */}
      <div
        className={`navbar-center ${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center md:gap-0`}
      >
        <ul className="menu menu-vertical md:menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End: Buttons */}
      <div className="navbar-end flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-2 md:mt-0">
        {user ? (
          <>
            <span className="font-semibold text-purple-700 text-sm md:text-base">
              Hi, {user.displayName || user.email.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm md:btn-sm text-purple-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm md:btn-sm btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm md:btn-sm btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
