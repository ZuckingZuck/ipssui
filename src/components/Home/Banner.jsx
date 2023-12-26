import React from "react";
import { NavLink } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-container flex flex-col xl:flex-row justify-between items-center py-16 px-32">
        <div className="banner-container-left">
          <img className="max-w-[250px] md:max-w-[350px]" src="assets/logo4.png" alt="Logo"/>
        </div>
        <div className="banner-container-right text-center flex flex-col items-center gap-3">
          <p className="text-3xl font-bold tracking-normal lg:tracking-wider">Instute of Project Support and Solidarity</p>
          <NavLink to="/contact" className="bg-color hover:scale-110 transition shadow py-2 px-4 text-white rounded text-xl">
            İletişime Geç
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;
