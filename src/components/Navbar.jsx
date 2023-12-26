import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/userSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  }

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isOpen) {
          toggleMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if(location === "/login" || location === "/register" || location.startsWith("/admin")) return null;

  return (
    <header className="bg-color text-white py-3">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-..."
        crossOrigin="anonymous"
      />
      <div ref={wrapperRef} className="container mx-auto flex flex-wrap p-3 md:p-0 items-center justify-between">
        <h1 className="text-3xl font-bold underline-animation md:mb-0">
          <NavLink to="/">IPSS</NavLink>
        </h1>

        <div className="inline-block md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
        <nav className={`${isOpen ? "block" : "hidden"} md:flex md:items-center w-full md:w-auto md:flex-row flex flex-col items-center`}>
          <NavLink to="/" className="underline-animation mr-4 md:mr-8 mb-2 md:mb-0">
            Ana Sayfa
          </NavLink>
          <NavLink to="/sss" className="underline-animation mr-4 md:mr-8 mb-2 md:mb-0">
            SSS
          </NavLink>
          <NavLink to="/contact" className="underline-animation mr-4 md:mr-8 mb-2 md:mb-0">
            İletişim
          </NavLink>
          {
            user ? <NavLink to="/admin" className="underline-animation mr-4 md:mr-8 mb-2 md:mb-0">
            Admin
          </NavLink> : null
          }
          {
            user ? <button onClick={handleLogout} className="underline-animation mr-4 md:mr-8 mb-2 md:mb-0">Çıkış Yap</button> : null
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
