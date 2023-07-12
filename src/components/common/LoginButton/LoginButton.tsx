import { FC, useState } from "react";
import { Button } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import "./LoginButton.scss";

interface ILoginButton {
  onClick: () => void;
}

export const LoginButton: FC<ILoginButton> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <Button
    className={`login-button ${isOpen ? "open" : ""}`}
    onClick={handleClick}
    startIcon={<LoginIcon />}
  >
    <span className="button-text">Login</span>
  </Button>
  );
};