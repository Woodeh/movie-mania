import { FC } from "react";
import "./MainPage.scss";
import { Header } from "../../components/Layouts/Header/Header";
import { Movies } from "./MainPageMovieList/MainPageMovieList";

interface IMainPage {}

export const MainPage: FC<IMainPage> = () => {
  return (
    <div className="main-page">
      <Header />
      <Movies />
    </div>
  );
};
