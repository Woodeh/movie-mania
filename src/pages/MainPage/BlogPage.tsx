import { FC } from "react";
import "./BlogPage.scss";
import { Header } from "../../components/Header/Header";
import { Movies } from "../../components/MainPageFilms/Movies";

interface IBlogPage {}

export const BlogPage: FC<IBlogPage> = () => {
  return (
    <div className="blog">
      <Header />
      <Movies />
    </div>
  );
};
