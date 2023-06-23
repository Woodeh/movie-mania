import { FC, useState, useEffect } from "react";
import { Card } from "../Card/Card";
import { FILM_URL } from "../../api/urls";
import { useLocation } from "react-router-dom";
import "./MovieList.scss";
import { FavoritesMovies } from "../MainPageFilms/FavoritesMovies";

interface IFavoritesMovieListProps {
  titleMovie: string;
}

export const FavoritesMovieList: FC<IFavoritesMovieListProps> = ({
  titleMovie,
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTitleMovie = searchParams.get("q") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const search = encodeURIComponent(titleMovie || searchTitleMovie);
        const URL = `${FILM_URL}?s=${search}&apikey=797d76c8&page=${currentPage}&r=json&plot=full&pageSize=${pageSize}`;
        const response = await fetch(URL);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...(data.Search || [])]);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchMovies();
  }, [titleMovie, searchTitleMovie, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
  }, [titleMovie, searchTitleMovie]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="card-list">
      {movies.map((item) => (
        <Card
          key={item.imdbID}
          image={
            item["Poster"] !== "N/A"
              ? item["Poster"]
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
          }
          titleFilm={item["Title"]}
          yearFilm={item["Year"]}
          genreFIlm={item["Genre"]}
          link={`/movies/${item.imdbID}`}
          isFavorite={false}
          onAddToFavorites={() => {}}
          onRemoveFromFavorites={() => {}}
          filmId={""}
        />
      ))}
      {!movies.length && (
        <FavoritesMovies title={titleMovie || searchTitleMovie} from={0} to={0} />
      )}
      {totalResults > movies.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};