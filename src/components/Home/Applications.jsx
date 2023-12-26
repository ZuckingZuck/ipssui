import React from "react";
import { NavLink } from "react-router-dom";
const Applications = () => {
  return (
    <div className="services mb-5 container mx-auto">
      <h2 className="text-center text-4xl font-semibold mb-10 tracking-wider">
        Başvurular
      </h2>
      <div className="p-5 md:p-0 grid-cols-1 lg:grid-cols-2 grid xl:grid-cols-2 text-center gap-10">
        <div>
          <NavLink to="/trainee-application" className="services-container-box">
            <img
              alt="robocode"
              src={
                "https://toppng.com/uploads/thumbnail/education-icon-white-png-education-logo-png-white-11562973039axwrzopbom.png"
              }
            />
            <h3>Kursiyer Ol</h3>
          </NavLink>
        </div>
        <div>
          <NavLink to="/team-application" className="services-container-box">
            <img
              alt="robocode"
              src={
                "https://static-00.iconduck.com/assets.00/join-group-icon-2048x1873-7677q2qw.png"
              }
            />
            <h3>Ekibimize Katıl</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Applications;
