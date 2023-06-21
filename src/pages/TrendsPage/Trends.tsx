import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Trends";
import { getPostsAction } from "../../store/posts/actions";
import { Header } from "../../components/Header/Header";
import { TrendMovieList } from "../../components/MovieList/TrendMovieList";
import { Logotype } from "../../assets/icons";

export interface Trends {
  handleFilterMovie: () => void;
  handleMoveMain: () => void;
}

export const Trends: FC<Trends> = ({
  handleFilterMovie,
  handleMoveMain,
}) => {
  const dispatch = useAppDispatch();
  const { posts, error, loading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  const [titleMovie, setTitleMovie] = useState("");
  const handleTitleFilm = (newValue: string) => {
    setTitleMovie(newValue);
  };

  return (
    <div className="blog">
      <div className="mainLogo">
      <Logotype/>
      </div>
      <Header
        handleFilterMovie={handleFilterMovie}
        handleMoveMain={handleMoveMain}
        titleFilm={handleTitleFilm}
      />
      <TrendMovieList titleMovie={titleMovie} />
    </div>
  );
};
