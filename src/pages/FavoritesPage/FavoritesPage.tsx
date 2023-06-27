import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { getPostsAction } from "../../store/posts/actions";
import { Header } from "../../components/Header/Header";
import { Logotype } from "../../assets/icons";
import Favorite from "../../components/Favorite/Favorite";
import { FavoritesMovieList } from "../../components/MovieList/FavoritesMovieList";

export interface IFavorites {
  handleFilterMovie: () => void;
  handleMoveMain: () => void;
}

export const Favorites: FC<IFavorites> = ({ handleFilterMovie, handleMoveMain }) => {
  const dispatch = useAppDispatch();
  const { posts, error, loading } = useAppSelector((state) => state.posts);

  // useEffect(() => {
  //   dispatch(getPostsAction());
  // }, [dispatch]);

  const [titleMovie, setTitleMovie] = useState("");
  const handleTitleFilm = (newValue: string) => {
    setTitleMovie(newValue);
  };

  return (
    <div className="blog">
     
      <Header
        handleFilterMovie={handleFilterMovie}
        handleMoveMain={handleMoveMain}
        titleFilm={handleTitleFilm}
      />
      <Favorite />
      <FavoritesMovieList titleMovie={titleMovie} />
    </div>
  );
};