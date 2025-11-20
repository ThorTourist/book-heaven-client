import React from "react";
import { Link, NavLink } from "react-router"; 
import logoImg from '../../assets/images/logo.png'


const Navbar = () => {


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

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <div className="flex items-center gap-0">
          <NavLink
            to="/home"
            className="btn btn-ghost text-sm md:text-xl  inter text-purple-800 font-bold"
          >
            <img className="h-8 w-8" src={logoImg} alt="" />
            The Book Heaven
          </NavLink>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
             
            <button
         
              className="btn btn-outline btn-sm text-purple-700"
            >
              Logout
            </button>
          </div>
    
          <>
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary">
              Sign Up
            </Link>
          </>
    
      </div>
  )
  
};

export default Navbar;
