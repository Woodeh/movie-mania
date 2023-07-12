import React from "react";
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
    <div
  className={`favorite-button ${isFavorite ? "remove-favorite-button" : "add-favorite-button"}`}
  onClick={handleClick}
>
  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
</div>
  );
};

export default FavoriteButton;