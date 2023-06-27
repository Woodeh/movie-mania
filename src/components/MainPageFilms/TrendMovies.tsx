import { FC, useState } from 'react';
import { Movie } from './Movies/Movie';
import './Movies.scss';
import { ShowMore } from './ShowMore/ShowMore';


interface ITrendMovies {}



export const TrendMovies: FC<ITrendMovies> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const moviesIds = [
      'tt1375666',
      'tt0816692',
      'tt0468569',
      'tt0110912',
      'tt0137523',
      'tt0111161',
      'tt0133093',
      'tt0099685',
  ];

  const handleCountShowFilms = () => {
    setIsOpen(!isOpen);
  };

  const renderedMoviesIds = isOpen ? moviesIds : moviesIds.slice(0, 4);

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMoviesIds.map((movieId) => (
          <Movie
            key={movieId}
            imdbID={movieId}
            
          />
        ))}
      </div>
      <div className="movies-bottom">
        {moviesIds.length > 5 && (
          <ShowMore
            content={isOpen ? 'show less' : 'show more'}
            handleClick={handleCountShowFilms}
            children={undefined}
          />
        )}
      </div>
  
      
    </div>
  );
}