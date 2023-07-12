import { FC } from "react";
import "./MainPage.scss";
import { MainPageMovieList } from "./MainPageMovieList/MainPageMovieList";

interface IMainPage {}

export const MainPage: FC<IMainPage> = () => {
  return (
    <div className="main-page">
      <MainPageMovieList />
    </div>
  );
};
