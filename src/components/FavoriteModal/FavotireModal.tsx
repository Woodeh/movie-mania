import React from "react";
import "./FavoriteModal.scss";

interface IFavoriteModal {
  onClose: () => void;
}

const FavoriteModal: React.FC<IFavoriteModal> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Фильм добавлен в избранное!</h3>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default FavoriteModal;