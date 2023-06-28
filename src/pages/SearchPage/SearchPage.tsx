import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Header } from "../../components/Header/Header";
import { Logotype } from "../../assets/icons";
import { FILM_URL } from "../../api/urls";
import { useParams, useSearchParams } from "react-router-dom";

export const Search = () => {
  const dispatch = useAppDispatch();
  const { posts, error, loading } = useAppSelector((state) => state.posts);
  const [titleMovie, setTitleMovie] = useState("");

  const [movies, setMovies] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  let [searchParams] = useSearchParams();
  let query = searchParams.get("query") || '';
  console.log(query)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const search = encodeURIComponent(query);
        const URL = `${FILM_URL}?s=${search}&apikey=797d76c8&page=${currentPage}&r=json&plot=full&pageSize=${pageSize}`;
        const response = await fetch(URL);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.Search || []]);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchMovies();
  }, [titleMovie, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
  }, [titleMovie]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };



  const handleTitleFilm = (searchValue: React.SetStateAction<string>) => {
    setTitleMovie(searchValue);
  };

  return (
    <div className="blog">
      <div className="mainLogo">
        <Logotype />
      </div>
      <Header/>
      
    </div>
    
  );
};