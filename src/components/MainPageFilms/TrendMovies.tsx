import { FC, useState } from 'react';
import { Movie } from './Movies/Movie';
import './Movies.scss';
import { ShowMore } from './ShowMore/ShowMore';


interface ITrendMovies {}

interface ITrendMovie {
  title: string;
  from: number;
  to: number;
}



export const TrendMovies: FC<ITrendMovies> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies] = useState<ITrendMovie[]>([
    { title: 'Inception', from: 0, to: 1 },
{ title: 'Interstellar', from: 0, to: 1 },
{ title: 'The Dark Knight', from: 0, to: 1 },
{ title: 'Pulp Fiction', from: 1, to: 2 },
{ title: 'Fight Club', from: 0, to: 1 },
{ title: 'The Shawshank Redemption', from: 0, to: 1 },
{ title: 'The Matrix', from: 1, to: 2 },
{ title: 'Goodfellas', from: 1, to: 2 },
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