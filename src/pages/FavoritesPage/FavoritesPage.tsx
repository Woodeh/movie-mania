import { FC } from "react";
import { Header } from "../../components/Header/Header";
import { Movie } from "../../components/Movie/Movie";
import { useSelector } from "react-redux";

export interface IFavorites {}

export const Favorites: FC<IFavorites> = () => {
  const favorites = useSelector((state: any) => state.favorites || []);

  return (
    <div className="blog">
      <Header />
      <div className="movies-container">
        {favorites.map((movie: any) => (
          <Movie key={movie.imdbID} imdbID={movie.imdbID} />
        ))}
        {/* {isModalOpen && <FavoriteModal onClose={() => setModalOpen(false)} />} */}
      </div>
    </div>
  );
};
