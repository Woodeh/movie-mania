import { FC } from "react";
import "./TrendsPage";
import { Header } from "../../components/Layouts/Header/Header";
import { Logotype } from "../../assets/icons";
import { TrendMovies } from "./TrendMovieList/TrendMovieList";

export interface ITrends {}

export const Trends: FC<ITrends> = () => {
  return (
    <div className="blog">
      <TrendMovies />
    </div>
  );
};
