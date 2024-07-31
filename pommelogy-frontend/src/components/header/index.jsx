import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import "./Header.css";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
import light from "../../assets/toggle-on.png";
import dark from "../../assets/toggle-off.png";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [panelWidth, setPanelWidth] = useState("0");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDark, setIsDark] = useState(false);

  const handleTheme = () => {
    setIsDark((prevState) => !prevState);
  };

  const handleClick = () => {
    handleTheme();
    toggleTheme();
  };

  const openNav = () => {
    setPanelWidth("100%");
  };

  const closeNav = () => {
    setPanelWidth("0");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Home"
            className="logo"
          />
        </NavLink>
      </div>
      {isMobile ? (
        <>
          <nav className="sidepanel" style={{ width: panelWidth }}>
            <button className="closebtn" onClick={closeNav}>
              &times;
            </button>
            <ul>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/variety"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Variety
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Search
                </NavLink>
              </li>

              {currentUser ? (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <button onClick={handleLogout} className="profile-button">
                      Logout
                    </button>
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to=""
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <button className="theme-toggle-btn" onClick={handleClick}>
                    {isDark ? (
                      <div>
                        <img src={dark} alt="dark" />
                      </div>
                    ) : (
                      <div>
                        <img src={light} alt="light" />
                      </div>
                    )}
                  </button>
                </NavLink>
              </li>
            </ul>
          </nav>
          <button className="openbtn" onClick={openNav}>
            ☰
          </button>
        </>
      ) : (
        <nav className="header-nav">
          <ul>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/variety"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Variety
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Search
              </NavLink>
            </li>

            {currentUser ? (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <button onClick={handleLogout} className="profile-button">
                    Logout
                  </button>
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <button className="theme-toggle-btn" onClick={handleClick}>
                  {isDark ? (
                    <div>
                      <img src={dark} alt="dark" />
                    </div>
                  ) : (
                    <div>
                      <img src={light} alt="light" />
                    </div>
                  )}
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
