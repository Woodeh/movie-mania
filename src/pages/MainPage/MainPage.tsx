import { FC } from "react";
import "./MainPage.scss";
import { Header } from "../../components/Header/Header";
import { Movies } from "../../components/MainPageFilms/Movies";

interface IMainPage {}

export const BlogPage: FC<IMainPage> = () => {
  return (
    <div className="blog">
      <Header />
      <Movies />
    </div>
  );
};
