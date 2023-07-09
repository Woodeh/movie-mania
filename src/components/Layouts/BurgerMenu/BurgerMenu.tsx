import { FC, useState } from "react";
import { CancelIcon, BurgerMenuIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { isDarktheme } from "../../../store/theme/selectors";
import { IconButton } from "../../common/IconButton/IconButton";
import { ControlledSwitches } from "../../common/Switcher/Switcher";
import { Button } from "../../common/Button/Button";
import "./BurgerMenu.scss";

interface IconButtonProps {
  onClick: () => void;
  className?: string; 
}

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
        <IconButton onClick={handleClick} type="header">
          {isOpen ? <CancelIcon /> : <BurgerMenuIcon />}
        </IconButton>
      </div>
      <div className={`burgerMenu__content ${isOpen && "open"}`}>
        <IconButton onClick={handleClick}>
          <CancelIcon />
        </IconButton>
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
          <li className="burgerMenu__nav-item">
            <div className="burgerMenu__theme-box">
              <p className="switch_title">Switch theme</p>
              <ControlledSwitches />
            </div>
          </li>
        </nav>
        {/* <div>
          {isLogged ? (
            <Button content="Log Out" onClick={logout} type="secondary" />
          ) : (
            <Button content="Sign In" onClick={signIn} type="primary" />
          )}
        </div> */}
      </div>
    </div>
  );
};