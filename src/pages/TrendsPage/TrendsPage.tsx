import { FC } from "react";
import { TrendMovies } from "./TrendMovieList/TrendMovieList";
import "./TrendsPage.scss";

export interface ITrends {}

export const Trends: FC<ITrends> = () => {
  return (
    <div className="trend-page">
      <TrendMovies />
    </div>
  );
};
