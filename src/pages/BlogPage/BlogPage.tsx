import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./BlogPage.scss";
import { getPostsAction } from "../../store/posts/actions";
import { Header } from "../../components/Header/Header";
import { MovieList } from "../../components/MovieList/MovieList";
import { Logotype } from "../../assets/icons";

interface IBlogPage {
  handleFilterMovie: () => void;
  handleMoveMain: () => void;
}

export const BlogPage: FC<IBlogPage> = ({ handleFilterMovie, handleMoveMain }) => {
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
      <MovieList titleMovie={titleMovie} />
    </div>
  );
};
