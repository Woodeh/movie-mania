import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Card.scss";

interface ICard {
  filmId: string;
  image: string;
  titleFilm: string;
  yearFilm: string;
  genreFIlm: string;
  link: string;
  isFavorite: boolean;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: (filmId: string) => void;
}

export const Card: FC<ICard> = ({
  filmId,
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
    event.stopPropagation();
    onAddToFavorites();
  };

  return (
    <div className="card" key={filmId}>
      <Link to={link}>
        <img src={image} alt={titleFilm} />
        <div className="card-info">
        
          <p className="card-genre">{genreFIlm}</p>
        </div>
      </Link>
      <div className="card-bottom">
        <div className="card-info">
      <h3 className="card-title">{titleFilm}</h3>
          <p className="card-year">{yearFilm}</p>
          </div>
      <div className="card-actions">
        {isFavorite ? (
          <button
          className="remove-favorite-button"
          type="button"
          onClick={() => onRemoveFromFavorites(filmId)}
        >
          <FontAwesomeIcon icon={faHeart} className="button-icon" />
        </button>
        ) : (
          <button
            className="add-favorite-button"
            type="button"
            onClick={handleAddToFavorites}
          >
            <FontAwesomeIcon icon={faHeart} /> {/* Заменяет кнопку на иконку сердца */}
          </button>
          
        )}
        </div>
      </div>
    </div>
  );
};