import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../../redux/favoritesActions";
import { FILM_URL } from "../../../api/urls";
import { Card } from "../../Card/Card";
import "./Movie.scss";
import FavoriteModal from "../../FavoriteModal/FavotireModal";

interface IMovieFC {
  imdbID: string;
}

interface IMovie {
  isFavorite: boolean;
  Genre: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export const Movie: React.FC<IMovieFC> = ({imdbID}) => {
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
    fetchMovie();
  }, [imdbID]);

  // useEffect(() => {
  //   const updatedMovies = movie.map(movie => ({
  //     ...movie,
  //     isFavorite: isMovieInFavorites(movie.imdbID)
  //   }));
  //   setMovie(updatedMovies);
  // }, [favorites]);

  const handleAddToFavorites = (movie: any) => {
    dispatch(addToFavorites(movie));
    setModalOpen(true);
  };

  const handleRemoveFromFavorites = (movieId: string) => {
    dispatch(removeFromFavorites(movieId));
  };

  const isMovieInFavorites = (movieId: string) => {
    return favorites.some((movie: any) => movie.imdbID === movieId);
  };
  
  return (
    <div className="movie-card">
      {movie && 
        <Card
          key={movie.imdbID}
          image={movie.Poster}
          titleFilm={movie.Title}
          yearFilm={movie.Year}
          genreFIlm={movie.Genre}
          link={`/movies/${movie.imdbID}`}
          isFavorite={movie.isFavorite}
          onAddToFavorites={() => handleAddToFavorites(movie)}
          onRemoveFromFavorites={() => handleRemoveFromFavorites(movie.imdbID)} filmId={""}        />
}
     

      {isModalOpen && <FavoriteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};