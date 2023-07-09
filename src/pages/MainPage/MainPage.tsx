import { FC } from "react";
import "./MainPage.scss";
import { Movies } from "./MainPageMovieList/MainPageMovieList";

interface IMainPage {}

export const MainPage: FC<IMainPage> = () => {
  return (
    <div className="main-page">
      <Movies />
    </div>
  );
};
