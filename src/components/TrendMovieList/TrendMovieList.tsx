import { FC, useState } from "react";
import { Movie } from "../Movie/Movie";
import "./TrendMovieList.scss";
import { trendMoviesDb } from "../../constants/trendsMoviesDb";

interface ITrendMovies {}

export const TrendMovies: FC<ITrendMovies> = () => {
  const initialVisibleCount = 4;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const renderedMoviesIds = trendMoviesDb.slice(0, visibleCount);

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMoviesIds.map((movieId) => (
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
