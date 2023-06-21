import { FC, useState } from 'react';
import { Movie } from './Movies/Movie';
import './Movies.scss';
import { ShowMore } from './ShowMore/ShowMore';

interface IMovies {}

interface IMovie {
  title: string;
  from: number;
  to: number;
}

export const Movies: FC<IMovies> = () => {
  const [showMoreCount, setShowMoreCount] = useState(4);
  const [movies] = useState<IMovie[]>([
    { title: 'Attack On Titan', from: 0, to: 1 },
    { title: 'Black Clover', from: 0, to: 1 },
    { title: 'Hunter x hunter', from: 0, to: 1 },
    { title: 'My Hero Academia', from: 0, to: 1 },
    { title: 'Initial D', from: 0, to: 1 },
    { title: 'FullMetal Alchemist', from: 0, to: 1 },
    { title: 'Jujutsu Kaisen', from: 1, to: 2 },
    { title: 'Demon Slayer', from: 1, to: 2 },
    { title: 'Naruto', from: 0, to: 1 },
    { title: 'One Piece', from: 2, to: 3 },
    { title: 'Dr. Stone', from: 0, to: 1 },
    { title: 'Death Note', from: 0, to: 1 },
    { title: 'Code Geass', from: 0, to: 1 },
    { title: 'Tokyo Ghoul', from: 0, to: 1 },
    { title: 'Fire Force', from: 0, to: 1 },
    { title: 'Haikyuu', from: 1, to: 2 },
    { title: 'Sword Art Online', from: 0, to: 1 },
    { title: 'One Punch Man', from: 0, to: 1 },
    { title: 'The Promised Neverland', from: 0, to: 1 },
    { title: 'Slime', from: 0, to: 1 },
  ]);

  const handleCountShowFilms = () => {
    if (showMoreCount === -1 || showMoreCount + 4 >= movies.length) {
      setShowMoreCount(-1);
    } else {
      setShowMoreCount(showMoreCount + 4);
    }
  };

  const renderedMovies = movies.slice(0, showMoreCount !== -1 ? showMoreCount + 4 : undefined);

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