import React, { FC } from "react";
import { Link } from "react-router-dom";
import './Card.scss';

interface ICard {
  key: string;
  image: string;
  titleFilm: string;
  yearFilm: string;
  genreFIlm: string;
  link: string;
  isFavorite: boolean;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
}

export const Card: FC<ICard> = ({
  key,
  image,
  titleFilm,
  yearFilm,
  genreFIlm,
  link,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const handleAddToFavorites = (event: React.MouseEvent) => {
    event.stopPropagation(); // Остановка всплытия события клика
    onAddToFavorites();
  };

  return (
    <div className="card" key={key}>
      <Link to={link}>
        <img src={image} alt={titleFilm} />
        <h3 className="card-title">{titleFilm}</h3>
        <div className="card-info">
          <p className="card-year">{yearFilm}</p>
          <p className="card-genre">{genreFIlm}</p>
        </div>
      </Link>
      <div className="card-actions">
        {isFavorite ? (
          <button
            className="remove-favorite-button"
            type="button" 
            onClick={onRemoveFromFavorites}
          >
            Remove from Favorites
          </button>
        ) : (
          <button
            className="add-favorite-button"
            type="button"
            onClick={handleAddToFavorites}
          >
            Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
};