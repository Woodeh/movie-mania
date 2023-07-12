import { FC, useEffect, useState } from "react";
import { FILM_URL } from "../../utils/api/urls";
import { useParams } from "react-router-dom";
import { TypographyText } from "../../components/common/Typography/TypographyText";
import { RelatedMovies } from "./RelatedMovies/RelatedMovies";
import { ShareButton } from "../../components/common/ShareButton/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/favoritesActions";
import FavoriteButton from "../../components/common/FavoriteButton/FavoriteButton";
import Loader from "../../components/common/Loader/Loader";
import "./MoviePage.scss";

interface IMoviePage {
  match: {
    params: { id: string };
  };
}

export const MoviePage: FC<IMoviePage> = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();
  const favorites = useSelector((state: any) => state.favorites || []);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const URL = `${FILM_URL}?i=${id}&apikey=ad0d5fb3`;
        const response = await fetch(URL);
        const data = await response.json();
        setMovie(data);
        setIsFavorite(isMovieInFavorites(data.imdbID));
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie));
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(movie.imdbID));
    setIsFavorite(false);
  };

  const isMovieInFavorites = (movieId: string) => {
    return favorites.some((movie: any) => movie.imdbID === movieId);
  };

  if (!movie) {
    return <Loader />;
  }

  const genreArray = movie.Genre.split(",");
  const genreString = genreArray.join(` • `);

  return (
    <>
      <div className="movie-details">
        <div className="movie-poster">
          {movie.Poster !== "N/A" ? (
            <img
              className="movie-poster--img"
              src={movie.Poster}
              alt={movie.Title}
            />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
              draggable="false"
              alt={movie.Title}
            />
          )}
          <FavoriteButton
            isFavorite={isFavorite}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
          />
          <ShareButton />
        </div>
        <div className="movie-info">
          <TypographyText content={genreString} type="subline" />
          <TypographyText content={movie.Title} type="H1" />
          <p className="movie-rating">
            <span>IMDb rating {movie.imdbRating}</span>
            <span>{movie.Runtime}</span>
          </p>
          <p className="movie-info--plot">{movie.Plot}</p>
          <div className="movie-info--genres">
            <ul>
              <li>
                <span className="movie-info--list">
                  <span className="movie-info--list-label">Year</span>{" "}
                  <span className="movie-info--list-value">
                    {movie.Year || "N/A"}
                  </span>
                </span>
              </li>
              <li>
                <span className="movie-info--list">
                  <span className="movie-info--list-label">Released</span>{" "}
                  <span className="movie-info--list-value">
                    {movie.Released || "N/A"}
                  </span>
                </span>
              </li>
              <li>
                <span className="movie-info--list">
                  <span className="movie-info--list-label">BoxOffice</span>{" "}
                  <span className="movie-info--list-value">
                    {movie.BoxOffice || "N/A"}
                  </span>
                </span>
              </li>
              <li>
                <span className="movie-info--list">
                  <span className="movie-info--list-label">Country</span>{" "}
                  <span className="movie-info--list-value">
                    {movie.Country || "N/A"}
                  </span>
                </span>
              </li>
              <li>
                <span className="movie-info--list">
                  <span className="movie-info--list-label">Director</span>{" "}
                  <span className="movie-info--list-value">
                    {movie.Director || "N/A"}
                  </span>
                </span>
              </li>
              <li>
                <span className="movie-info--list">
                  <span className="movie-info--list-label">Writer</span>{" "}
                  <span className="movie-info--list-value">
                    {movie.Writer || "N/A"}
                  </span>
                </span>
              </li>
              <li>
                <span className="movie-info--list">
                  <span className="movie-info--list-label">Actors</span>{" "}
                  <span className="movie-info--list-value">
                    {movie.Actors || "N/A"}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RelatedMovies movieTitle={movie.Title} />
    </>
  );
};
