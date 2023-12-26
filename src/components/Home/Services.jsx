import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Services = () => {
  const service = useSelector((state) => state.service);
  return (
    <div className="services mb-5 container mx-auto">
      <h2 className="text-center text-4xl font-semibold mb-10 tracking-wider">
        HİZMETLERİMİZ
      </h2>
      <div className="services-container p-5 md:p-0 grid-cols-1 lg:grid-cols-2 grid xl:grid-cols-3 items-center text-center gap-10">
        {service?.services?.map((item) => {
          return (
            <NavLink key={item._id} to="/contact" className="services-container-box">
              <img alt="robocode" src={item.ImageUrl} />
              <h3>{item.ServiceTitle}</h3>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
