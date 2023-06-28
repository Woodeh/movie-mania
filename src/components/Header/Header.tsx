import { FC, useState, KeyboardEvent } from "react";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { UserInfo } from "../UserInfo/UserInfo";
import { IconButton } from "../IconButton/IconButton";
import { UserIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

interface IHeader {
  isSearchDisabled?: boolean;
}

export const Header: FC<IHeader> = ({ isSearchDisabled = false }) => {
  const navigate = useNavigate();
  const isLogged = false;
  const [searchValue, setSearchValue] = useState("");

  const handleClickToSignIn = () => {
    navigate("/sign-in");
  };

  const handleSearch = () => {
    navigate(`/search-page?query=${searchValue}`);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const inputClass = `search-input ${
    isSearchDisabled && "search-film__disabled"
  }`;

  return (
    <header className="header">
      <BurgerMenu />
      <div className="search">
        <div className="search__input">
          <input
            className={inputClass}
            type="text"
            placeholder="search"
            disabled={isSearchDisabled}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>

      <div className="header__box">
        {isLogged ? (
          <UserInfo username="D" />
        ) : (
          <IconButton onClick={handleClickToSignIn} type="header">
            <UserIcon />
          </IconButton>
        )}
      </div>
    </header>
  );
};
