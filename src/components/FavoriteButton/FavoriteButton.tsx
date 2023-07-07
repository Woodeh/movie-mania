import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./FavoriteButton.scss";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const handleClick = () => {
    if (isFavorite) {
      onRemoveFromFavorites();
    } else {
      onAddToFavorites();
    }
  };

  return (
    <button
      className={isFavorite ? "remove-favorite-button" : "add-favorite-button"}
      type="button"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faBookmark} />
    </button>
  );
};

export default FavoriteButton;
