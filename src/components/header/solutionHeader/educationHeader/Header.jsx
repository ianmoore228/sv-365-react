import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import React, { useState, useEffect, useRef } from "react";
import img from "../../../../assets/images/SV.svg";
import user from "../../../../assets/images/profile/user-icon.png";
import logout from "../../../../assets/images/profile/logout.svg";
import { useLocation, useNavigate } from "react-router-dom";
// import "./header.css";

const EducationHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = confirm("Вы уверены, что хотите выйти?");
    if (confirmLogout) {
      localStorage.removeItem("token"); 
      setIsLoggedIn(false);
      // navigate("/");
    }
  };

  return (
    <header className="header">
      <div
        className="header__content"
        style={{
          transition: "transform 0.3s ease",
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <RouterLink href="" className="header__logo">
          <img src={img} className="header__logo-img" alt="Логотип" />
        </RouterLink>
        <div className="header__wrapper">
          <div className="header__content-left">
            <RouterLink
              to="/"
              className="header__element header__content-element_link"
            >
              Главная
            </RouterLink>
            <ScrollLink
            smooth={true}
              to="education"
              className="header__element header__content-element_link"
            >
              Обучение администратора
            </ScrollLink>
            <ScrollLink
            smooth={true}
              to="add-ons"
              duration={500}
              className="header__element header__content-element_link"
            >
             Интеграция дополнений
            </ScrollLink>
          </div>

          <div className="header__content-right">
            {isLoggedIn ? (
              <>
                <button
                  className="header__button-user"
                  onClick={() => navigate("/profile")}
                >
                  <img className="header__user-img" src={user} />
                </button>
                <button
                  className="button header__button-logout"
                  onClick={() => {
                    handleLogout();
                    // navigate("/");
                  }}
                >
                  <img className="header__logout-img" src={logout} />
                </button>
              </>
            ) : (
              <>
                <a href="tel:+78129080900"
                  className="header__element header__element_phone"
                >
                  8 812 908-09-00
                </a>
                <button onClick={openModal} className="button header__button">
                  Войти
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default EducationHeader;
