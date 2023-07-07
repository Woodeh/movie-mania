
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Card.scss";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

interface ICard {
  filmId: string;
  image: string;
  titleFilm: string;
  yearFilm: string;
  genreFIlm: string;
  link: string;
  isFavorite: boolean;
  imdbRating: string;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
}

export const Card: FC<ICard> = ({
  filmId,
  image,
  titleFilm,
  yearFilm,
  genreFIlm,
  link,
  isFavorite,
  imdbRating,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const handleAddToFavorites = () => {
    onAddToFavorites();
  };

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites();
  };

  return (
    <div className="card" key={filmId}>
      <Link to={link}>
        <img src={image} alt={titleFilm} />
        <div className="card-info">
          <p className="card-genre">{genreFIlm}</p>
        </div>
        {imdbRating ? (
          <div className="card-rating">{imdbRating}</div>
        ) : null}
      </Link>
      <div className="card-bottom">
        <div className="card-info">
          <h3 className="card-title">{titleFilm}</h3>
          <p className="card-year">{yearFilm}</p>
        </div>
        <div className="card-actions">
          <FavoriteButton
            isFavorite={isFavorite}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
          />
        </div>
      </div>
    </div>
  );
};