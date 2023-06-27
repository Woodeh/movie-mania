import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Header } from "../../components/Header/Header";
import { TrendMovieList } from "../../components/MovieList/TrendMovieList";
import { Logotype } from "../../assets/icons";

export const Search = () => {
  const dispatch = useAppDispatch();
  const { posts, error, loading } = useAppSelector((state) => state.posts);
  const [titleMovie, setTitleMovie] = useState("");

 

  const handleTitleFilm = (searchValue: React.SetStateAction<string>) => {
    setTitleMovie(searchValue);
  };

  return (
    <div className="blog">
      <div className="mainLogo">
        <Logotype />
      </div>
      <Header
        handleFilterMovie={() => {}}
        handleMoveMain={() => {}}
        titleFilm={handleTitleFilm}
      />
      <TrendMovieList titleMovie={titleMovie} />
    </div>
  );
};