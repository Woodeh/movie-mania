import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../../components/Card/Card";
import { removeFromFavorites } from "../../redux/favoritesActions";
import "./FavoritesPage.scss";
import FavoriteModal from "../../components/FavoriteModal/FavotireModal";

const FavoritesPage = () => {
  const favorites = useSelector((state: any) => state.favorites || []);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRemoveFromFavorites = (movieId: string) => {
    dispatch(removeFromFavorites(movieId));
  };

  return (
    <div className="favorite-card">
      <h2>Favorites</h2>
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
        />
      ))}
      {isModalOpen && (
        <FavoriteModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default FavoritesPage;