import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const social = useSelector((state) => state.social);

  const location = useLocation().pathname;

  if (
    location === "/login" ||
    location === "/register" ||
    location.startsWith("/admin")
  )
    return null;
  return (
    <div className="footer-container bg-gray-900 text-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center text-center md:items-start gap-5 md:gap-0 justify-between">
        <div className="footer-column">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide mb-4">
            Sosyal Medya
          </h4>
          <div className="footer-icons flex gap-3 items-center justify-center">
            {social?.socials?.map((item) => {
              return (
                <a
                  key={item._id}
                  href={item?.accountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-14 h-14 p-3 hover:scale-110 transition"
                    src={item.iconUrl}
                    alt={item.name}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="footer-column">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide mb-4">
            Kurumsal
          </h4>
          <ul>
            <li className="footer-hover">
              <NavLink to="/sss" className="text-gray-400 hover:text-white">
                Hedeflerimiz
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/sss" className="text-gray-400 hover:text-white">
                SSS
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/" className="text-gray-400 hover:text-white">
                Blog Yazıları
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                İletişim
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide mb-4">
            Hizmetlerimiz
          </h4>
          <ul>
            <li className="footer-hover">
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                Robotik Kodlama
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                Web Tasarım
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                Kurumsal Yazılım
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                Mobil Uygulama
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                Görüntü Ses İşleme
              </NavLink>
            </li>
            <li className="footer-hover">
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                Teknik Çizim
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
