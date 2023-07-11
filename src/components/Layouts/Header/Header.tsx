import { FC, useState, KeyboardEvent } from "react";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { UserInfo } from "../UserInfo/UserInfo";
import { IconButton } from "../../common/IconButton/IconButton";
import { Logotype, UserIcon } from "../../../assets/icons";
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
    setSearchValue('');

    
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
      <div className="logo_container">
        <div className="logo">
          <Logotype />
        </div>
        <div className="logo_title">MovieMania</div>
      </div>
      <div className="burger_container">
        <BurgerMenu />
        <div className="burger_title">Menu</div>
      </div>
      <div className="search">
        <div className="search__input">
          <input
            className={inputClass}
            type="text"
            placeholder="Search"
            disabled={isSearchDisabled}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>

      <div className="header__box">
        {isLogged ? (
          <UserInfo username="" />
        ) : (
          <IconButton onClick={handleClickToSignIn} type="header">
            <UserIcon />
          </IconButton>
        )}
      </div>
    </header>
  );
};
