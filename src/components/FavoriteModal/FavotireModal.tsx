import React from "react";

interface IFavoriteModal {
  onClose: () => void;
}

const Modal: React.FC<IFavoriteModal> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Фильм добавлен в избранное!</h3>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;