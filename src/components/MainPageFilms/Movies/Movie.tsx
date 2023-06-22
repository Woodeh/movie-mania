import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../../redux/favoritesActions";
import { FILM_URL } from "../../../api/urls";
import { Card } from "../../Card/Card";
import { Link } from "react-router-dom";
import "./Movie.scss";
import FavoriteModal from "../../FavoriteModal/FavotireModal";

interface IMovie {
  titleMovie: string;
  from: number;
  to: number;
}

export const Movie: React.FC<IMovie> = ({ titleMovie, from, to }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const favorites = useSelector((state: any) => state.favorites || []);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${FILM_URL}?s=${titleMovie}&apikey=797d76c8`);
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchMovie();
  }, [titleMovie]);

  const moviesToShow = movies.slice(from, to);

  const handleAddToFavorites = (movie: any) => {
    dispatch(addToFavorites(movie));
    setModalOpen(true);
  };

  const handleRemoveFromFavorites = (movieId: string) => {
    dispatch(removeFromFavorites(movieId));
  };

  const isMovieInFavorites = (movieId: string) => {
    return favorites.some((movie: any) => movie.id === movieId);
  };

  return (
    <div className="movie-card">
      {moviesToShow.map((movie) => (
        <Card
          key={movie.imdbID}
          image={movie.Poster}
          titleFilm={movie.Title}
          yearFilm={movie.Year}
          genreFIlm={movie.Genre}
          link={`/movies/${movie.imdbID}`}
          isFavorite={isMovieInFavorites(movie.imdbID)}
          onAddToFavorites={() => handleAddToFavorites(movie)}
          onRemoveFromFavorites={() => handleRemoveFromFavorites(movie.imdbID)}
        />
      ))}
      <Link to="/favorites">Go to Favorites</Link>

      {isModalOpen && <FavoriteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};