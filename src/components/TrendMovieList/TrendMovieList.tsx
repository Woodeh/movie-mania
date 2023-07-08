import { FC, useState } from "react";
import { Movie } from "../Movie/Movie";
import "./TrendMovieList.scss";
import { trendMoviesDb } from "../../utils/constants/trendsMoviesDb";

interface ITrendMovies {}

export const TrendMovies: FC<ITrendMovies> = () => {
  const initialVisibleCount: number = 4;
  const [visibleCount, setVisibleCount] = useState<number>(initialVisibleCount);

  const handleShowMore = (): void => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const renderedMoviesIds: string[] = trendMoviesDb.slice(0, visibleCount);

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMoviesIds.map((movieId: string) => (
          <Movie key={movieId} imdbID={movieId} />
        ))}
      </div>
      {visibleCount < trendMoviesDb.length && (
        <div className="movies-bottom">
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};
