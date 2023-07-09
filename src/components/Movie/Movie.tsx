import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesActions";
import { FILM_URL } from "../../utils/api/urls";
import { Card } from "../MovieCard/MovieCard";
import FavoriteModal from "../common/FavoriteModal/FavotireModal";
import { IMovie } from "../../utils/interfaces/IMovie";
import "./Movie.scss";

interface IMovieFC {
  imdbID: string | "";
  movieObject?: IMovie;
}

export const Movie: React.FC<IMovieFC> = ({ imdbID, movieObject }) => {
  const [movie, setMovie] = useState<IMovie>();
  const favorites = useSelector((state: any) => state.favorites || []);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${FILM_URL}?i=${imdbID}&apikey=797d76c8`);
        const data = await response.json();
        setMovie(data || null);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (!movieObject) {
      fetchMovie();
    } else {
      setMovie(movieObject);
    }
  }, [imdbID, movieObject]);

  const handleAddToFavorites = (movie: any) => {
    const updatedMovie = { ...movie, isFavorite: true };
    dispatch(addToFavorites(updatedMovie));
    setModalOpen(true);
    setMovie(updatedMovie);
  };

  const handleRemoveFromFavorites = (movieId: string) => {
    dispatch(removeFromFavorites(movieId));
  };

  const isMovieInFavorites = (movieId: string) => {
    return favorites.some((movie: any) => movie.imdbID === movieId);
  };

  return (
    <div className="movie-card">
      {movie && (
        <Card
          key={movie.imdbID}
          image={movie.Poster}
          titleFilm={movie.Title}
          yearFilm={movie.Year}
          imdbRating={movie.imdbRating}
          genreFIlm={movie.Genre}
          link={`/movies/${movie.imdbID}`}
          isFavorite={isMovieInFavorites(movie.imdbID)}
          onAddToFavorites={() => handleAddToFavorites(movie)}
          onRemoveFromFavorites={() => handleRemoveFromFavorites(movie.imdbID)}
          filmId={""}
        />
      )}

      {isModalOpen && <FavoriteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};
