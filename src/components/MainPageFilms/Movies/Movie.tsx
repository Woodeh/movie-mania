import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../../redux/favoritesActions";
import { FILM_URL } from "../../../api/urls";
import { Card } from "../../Card/Card";
import "./Movie.scss";
import FavoriteModal from "../../FavoriteModal/FavotireModal";

interface IMovieFC {
  imdbID: string;
  movieObject?: IMovie;
}

interface IMovie {
  imdbRating: string;
  isFavorite: boolean;
  Genre: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export const Movie: React.FC<IMovieFC> = ({ imdbID, movieObject }) => {
  const [movie, setMovie] = useState<IMovie | null>(null);
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

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie));
    setModalOpen(true);
  };

  const handleRemoveFromFavorites = () => {
    if (movie) {
      dispatch(removeFromFavorites(movie.imdbID));
    }
  };

  useEffect(() => {
    const updatedMovies = movie
      ? {
          ...movie,
          isFavorite: isMovieInFavorites(movie.imdbID),
        }
      : null;
    setMovie(updatedMovies);
  }, [favorites]);

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
          isFavorite={movie.isFavorite}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
          filmId={movie.imdbID}
        />
      )}

      {isModalOpen && <FavoriteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};