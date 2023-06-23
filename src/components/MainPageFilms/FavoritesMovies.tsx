import { FC, useState } from 'react';
import { Movie } from './Movies/Movie';
import './Movies.scss';
import { ShowMore } from './ShowMore/ShowMore';


interface IFavoritesMovies {}

interface IFavoritesMovies {
  title: string;
  from: number;
  to: number;
}



export const FavoritesMovies: FC<IFavoritesMovies> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies] = useState<IFavoritesMovies[]>([
    
  ]);

  const handleCountShowFilms = () => {
    setIsOpen(!isOpen);
  };

  const renderedMovies = isOpen ? movies : movies.slice(0, 4);

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMovies.map((movie) => (
          <Movie
            key={movie.title}
            titleMovie={movie.title}
            from={movie.from}
            to={movie.to}
            
          />
        ))}
      </div>
      <div className="movies-bottom">
        {movies.length > 5 && (
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