import { FC, useState } from "react";
import { Movie } from "../../../components/Movie/Movie";
import { moviesDb } from "../../../utils/constants/moviesDb";
import { ShowMore } from "../../../components/common/ShowMoreButton/ShowMoreButton";
import "./MainPageMovieList.scss";

interface IMainPageMovieList {}

export const MainPageMovieList: FC<IMainPageMovieList> = () => {
  const [showMoreCount, setShowMoreCount] = useState(4);
  const [movies] = useState<string[]>(moviesDb);

  const handleCountShowFilms = () => {
    if (showMoreCount === -1 || showMoreCount + 4 >= movies.length) {
      setShowMoreCount(-1);
    } else {
      setShowMoreCount(showMoreCount + 4);
    }
  };

  const renderedMovies = movies.slice(
    0,
    showMoreCount !== -1 ? showMoreCount + 4 : undefined
  );

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMovies.map((movie) => (
          <Movie key={movie} imdbID={movie} />
        ))}
      </div>
      {showMoreCount !== -1 && movies.length > showMoreCount + 4 && (
        <div className="movies-bottom">
          <ShowMore
            content="show more"
            handleClick={handleCountShowFilms}
            children={undefined}
          />
        </div>
      )}
    </div>
  );
};
