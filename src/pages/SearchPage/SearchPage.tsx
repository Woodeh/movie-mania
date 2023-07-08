import React, { useEffect, useState } from "react";
import { Header } from "../../components/Layouts/Header/Header";
import { Logotype } from "../../assets/icons";
import { FILM_URL } from "../../utils/api/urls";
import { useLocation } from "react-router-dom";
import { Movie } from "../../components/Movie/Movie";
import "./SearchPage.scss";

export const Search = () => {
  const [visibleMovies, setVisibleMovies] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
        const URL = `${FILM_URL}?s=${search}&apikey=797d76c8&page=${currentPage}&r=json&plot=full`;
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        const dataMovies = data.Search || [];
        const limitedMovies = dataMovies.slice(0, 8); // Ограничьте количество карточек до 8
        setVisibleMovies(limitedMovies);
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
  }, [query, currentPage]);

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
          visibleMovies.map((movie) => (
            <Movie
              imdbID={movie.imdbID}
              movieObject={movie}
              key={movie.imdbID}
            />
          ))
        )}
      </div>
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
          disabled={currentPage * 8 >= totalResults}
          className="pagination-button next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};
