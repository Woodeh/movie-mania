import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../Card/Card";
import { removeFromFavorites } from "../../redux/favoritesActions";
import { FavoritesMovieList } from "../MovieList/FavoritesMovieList";
import "./Favorite.scss";
import FavoriteModal from "../FavoriteModal/FavotireModal";

const Favorite = () => {
  const favorites = useSelector((state: any) => state.favorites || []);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRemoveFromFavorites = (movieId: string) => {
    dispatch(removeFromFavorites(movieId));
  };

  return (
    <div className="favorite-card">
      <FavoritesMovieList titleMovie="" /> {/* Добавляем компонент FavoritesMovieList */}
      {favorites.map((movie: any) => (
        <Card
          key={movie.imdbID}
          image={movie.Poster}
          titleFilm={movie.Title}
          yearFilm={movie.Year}
          genreFIlm={movie.Genre}
          link={`/movies/${movie.imdbID}`}
          isFavorite={true}
          onRemoveFromFavorites={() => handleRemoveFromFavorites(movie.imdbID)}
          onAddToFavorites={() => {}}
          filmId={""}
        />
      ))}
      {isModalOpen && <FavoriteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Favorite;