import { FC, useState, useEffect } from "react";
import { Movie } from "../../components/Movie/Movie";
import { useSelector } from "react-redux";
import { animatedWords } from "../../utils/constants/FavoriteAnimatedWords";
import "./FavoritesPage.scss";

export interface IFavorites {}

export const Favorites: FC<IFavorites> = () => {
  const favorites = useSelector((state: any) => state.favorites || []);
  const [animatedWordIndex, setAnimatedWordIndex] = useState<number>(0);

  useEffect(() => {
    if (animatedWordIndex < 15) {
      const timer = setTimeout(() => {
        setAnimatedWordIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animatedWordIndex]);

  return (
    <div className="favorites">
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="jumping-words">
            {animatedWords.map((word: string, index: number) => (
              <span
                key={index}
                className={`jumping-word ${
                  index <= animatedWordIndex ? "animate" : ""
                }`}
              >
                {word}
                {index < animatedWords.length - 1 && "\u00A0"}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="fav-movies-container">
          {favorites.map((movie: any) => (
            <Movie key={movie.imdbID} imdbID={movie.imdbID} />
          ))}
          {/* {isModalOpen && <FavoriteModal onClose={() => setModalOpen(false)} />} */}
        </div>
      )}
    </div>
  );
};

export default Favorites;
