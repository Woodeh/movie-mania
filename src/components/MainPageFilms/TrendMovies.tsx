import { FC, useState } from 'react';
import { Movie } from './Movies/Movie';
import './Movies.scss';

interface ITrendMovies {}

export const TrendMovies: FC<ITrendMovies> = () => {
  const moviesIds = [
    'tt1375666',
    'tt0816692',
    'tt0468569',
    'tt0110912',
    'tt0137523',
    'tt0111161',
    'tt0133093',
    'tt0099685',
    'tt0114369',
    'tt0102926',
    'tt0118799',
    'tt0120737',
    'tt1345836',
    'tt0167260',
    'tt0167261',
    'tt0120815',
    'tt0120689',
    'tt1853728',
    'tt0848228',
    'tt2395427',
    'tt2527336',
    'tt2527338',
    'tt4154756',
    'tt4154796',
    'tt0475290',
    'tt2294629',
    'tt0295297',
    'tt1201607',
    'tt1477834',
    'tt0800080',
    'tt1675434',
    'tt2380307',
    'tt0451279',
    'tt0986264',
    'tt1392190',
    'tt1392170',
    'tt0435761',
    'tt3659388',
    'tt4912910',
    'tt3778644',
  ];


  const initialVisibleCount = 4;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const renderedMoviesIds = moviesIds.slice(0, visibleCount);

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMoviesIds.map((movieId) => (
          <Movie key={movieId} imdbID={movieId} />
        ))}
      </div>
      {visibleCount < moviesIds.length && (
        <div className="movies-bottom">
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};