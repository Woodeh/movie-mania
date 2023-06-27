import { FC } from "react";
import "./Trends";
import { Header } from "../../components/Header/Header";
import { Logotype } from "../../assets/icons";
import { TrendMovies } from "../../components/MainPageFilms/TrendMovies";

export interface ITrends {}

export const Trends: FC<ITrends> = () => {
  return (
    <div className="blog">
      <div className="mainLogo">
        <Logotype />
      </div>  
      <Header />
      <TrendMovies />
    </div>
  );
};
