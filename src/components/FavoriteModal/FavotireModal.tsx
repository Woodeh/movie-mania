import React, { useEffect } from "react";
import "./FavoriteModal.scss";

interface IFavoriteModal {
  onClose: () => void;
}

const FavoriteModal: React.FC<IFavoriteModal> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>The film has been added to favorites!</h3>
      </div>
    </div>
  );
};

export default FavoriteModal;