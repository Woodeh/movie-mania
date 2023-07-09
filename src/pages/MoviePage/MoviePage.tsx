import React, { FC, useEffect, useState } from "react";
import { FILM_URL } from "../../utils/api/urls";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/Layouts/Header/Header";
import "./MoviePage.scss";
import { TypographyText } from "../../components/Typography/TypographyText";
import { RelatedMovies } from "./RelatedMovies/RelatedMovies";
import { Logotype } from "../../assets/icons";
import { ShareButton } from "../../components/common/ShareButton/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesActions";
import FavoriteButton from "../../components/common/FavoriteButton/FavoriteButton";
import Loader from "../../components/common/Loader/Loader";

interface IMovieInfo {
  match: {
    params: { id: string };
  };
}

export const MovieInfo: FC<IMovieInfo> = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();
  const favorites = useSelector((state: any) => state.favorites || []);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const URL = `${FILM_URL}?i=${id}&apikey=797d76c8`;
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
      <Header />
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
            <span className="movie-rating--green">{movie.imdbRating}</span>
            <span>IMDb {movie.imdbRating}</span>
            <span>{movie.Runtime}</span>
          </p>
          <p className="movie-info--plot">{movie.Plot}</p>
          <div className="movie-info--genres">
            <ul>
              <li>
                <span className="movie-info--list">Year:</span>
              </li>
              <li>
                <span className="movie-info--list">Released:</span>
              </li>
              <li>
                <span className="movie-info--list">BoxOffice:</span>
              </li>
              <li>
                <span className="movie-info--list">Country:</span>
              </li>
              <li>
                <span className="movie-info--list">Actors:</span>
              </li>
              <li>
                <span className="movie-info--list">Director:</span>
              </li>
              <li>
                <span className="movie-info--list">Writer:</span>
              </li>
              <li>
                <span className="movie-info--list">Stars:</span>
              </li>
            </ul>
            <ul>
              <li>{movie.Year}</li>
              <li>{movie.Released}</li>
              <li>{movie.BoxOffice}</li>
              <li>{movie.Country}</li>
              <li>{movie.Actors}</li>
              <li>{movie.Director}</li>
              <li>{movie.Writer}</li>
              <li>{movie.Actors}</li>
            </ul>
          </div>
        </div>
      </div>
      <RelatedMovies movieTitle={movie.Title} />
    </>
  );
};
