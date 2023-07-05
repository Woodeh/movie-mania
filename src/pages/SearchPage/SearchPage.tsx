import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Logotype } from "../../assets/icons";
import { FILM_URL } from "../../api/urls";
import { useLocation } from "react-router-dom";
import { Movie } from "../../components/MainPageFilms/Movies/Movie";
import "./SearchPage.scss";

export const Search = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setShowLoader(true); 
        const search = encodeURIComponent(query);
        const URL = `${FILM_URL}?s=${search}&apikey=797d76c8&page=${currentPage}&r=json&plot=full&pageSize=${pageSize}`;
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        setMovies([...(data.Search || [])]);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.log("error:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setShowLoader(false); 
        }, 1500);
      }
    };

    fetchMovies();
  }, [query, currentPage, pageSize]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="blog">
      <div className="mainLogo">
        <Logotype />
      </div>
      <Header />
      <div className="movies-container">
        {isLoading || showLoader ? (
          <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>
        ) : (
          movies.map((movie) => (
            <Movie imdbID={movie.imdbID} movieObject={movie} key={movie.imdbID} />
          ))
        )}
        <div className="pagination-container">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="pagination-button previous-button"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * pageSize >= totalResults}
            className="pagination-button next-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};