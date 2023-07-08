import { FC } from "react";
import "./TrendsPage";
import { Header } from "../../components/Header/Header";
import { Logotype } from "../../assets/icons";
import { TrendMovies } from "../../components/TrendMovieList/TrendMovieList";

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
