import React from "react";
import { useSelector } from "react-redux";
import { Card } from "../../components/Card/Card";
import "./FavoritesPage.scss";

const FavoritesPage = () => {
  const favorites = useSelector((state: any) => state.favorites || []);

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
          onAddToFavorites={() => {}}
          onRemoveFromFavorites={() => {}}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;