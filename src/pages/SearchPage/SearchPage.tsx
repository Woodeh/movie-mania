import { useEffect, useState } from "react";
import { FILM_URL } from "../../utils/api/urls";
import { useLocation } from "react-router-dom";
import { Movie } from "../../components/Movie/Movie";
import Slider from "@mui/material/Slider";
import Loader from "../../components/common/Loader/Loader";
import "./SearchPage.scss";

export const Search = () => {
  const [visibleMovies, setVisibleMovies] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [yearFilter, setYearFilter] = useState<number[]>([]);
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
        let filteredMovies = dataMovies;

        if (yearFilter.length > 0) {
          filteredMovies = filteredMovies.filter(
            (movie: { Year: string }) => {
              const movieYear = parseInt(movie.Year);
              return movieYear >= yearFilter[0] && movieYear <= yearFilter[1];
            }
          );
        }

        const limitedMovies = filteredMovies.slice(0, 8);
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
  }, [query, currentPage, yearFilter ]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleYearFilterChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setYearFilter(newValue);
    } else {
      setYearFilter([newValue, newValue]);
    }
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
  };

  return (
    <div className="blog">
      <div className="filter-container">
        <label htmlFor="year-filter" className="filter-label">Move the sliders to change the annual range</label>
        <Slider
          id="year-filter"
          value={yearFilter.length === 0 ? [1960, 2023] : yearFilter}
          onChange={handleYearFilterChange}
          min={1960}
          max={2023}
          step={1}
          valueLabelDisplay="auto"
        />
      
      </div>

      <div className="movies-container">
        {isLoading || showLoader ? (
          <Loader />
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