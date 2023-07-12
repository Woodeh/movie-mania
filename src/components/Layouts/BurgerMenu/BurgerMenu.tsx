import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { isDarktheme } from "../../../store/theme/selectors";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Person } from "@mui/icons-material";
import { Switcher } from "../../common/Switcher/Switcher";
import { Logotype } from "../../../assets/icons/"

import "./BurgerMenu.scss";

export const BurgerMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isDark = useAppSelector(isDarktheme);
  const isLogged = true;

  const options = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Trends", url: "/trends" },
    { id: 3, name: "Favorites", url: "/favorites" },
    { id: 4, name: "Settings", url: "/settings" },
  ];

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleGoTo = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  const signIn = () => {
    navigate("/sign-in");
    setIsOpen(false);
  };

  const logout = () => {};

  return (
    <div className="burgerMenu dark light">
      
      <div className="burgerMenu__btn-box">
        <IconButton onClick={handleClick}>
          {isOpen ? (
            <CloseIcon style={{ fontSize: "35px" }} /> 
          ) : (
            <MenuIcon style={{ fontSize: "35px" }} /> 
          )}
        </IconButton>
      </div>
      <div className={`burgerMenu__content ${isOpen && "open"}`}>
        <IconButton onClick={handleClick}>
          {isOpen ? (
            <CloseIcon style={{ fontSize: "35px" }} /> 
          ) : (
            <MenuIcon style={{ fontSize: "35px" }} /> 
          )}
        </IconButton>
        <div className="burger-logo">
          <Logotype />
        </div>
        <nav className="burgerMenu__nav">
          {options.map(({ id, name, url }) => (
            <li key={id} className="burgerMenu__nav-item">
              <button
                className="burgerMenu__nav-btn"
                onClick={() => handleGoTo(url)}
              >
                {name}
              </button>
            </li>
          ))}
        </nav>
            <div className="burgerMenu__theme-box">
              <p className="switch_title">Switch theme</p>
              <Switcher />
            </div>
      </div>
    </div>
  );
};
