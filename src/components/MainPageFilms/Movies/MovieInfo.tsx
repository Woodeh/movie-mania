import React, { FC, useEffect, useState } from "react";
import { FILM_URL } from "../../../api/urls";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../Header/Header";
import "./MovieInfo.scss";
import { TypographyText } from "../../Typography/TypographyText";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { createBackToHomePath } from "../../../constants/createBackToHomePath";
import { RecommendationsFilm } from "./RecommendationsFilm";
import { Logotype } from "../../../assets/icons";
import { ShareButton } from "../../ShareButton/ShareButton";
import { TelegramIcon, WhatsappIcon } from "react-share";



interface IMovieInfo {
  match: {
    params: { id: string };
  };
}



export const MovieInfo: FC<IMovieInfo> = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();
  const [filmLink, setFilmLink] = useState<string>("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const URL = `${FILM_URL}?i=${id}&apikey=797d76c8`;
        const response = await fetch(URL);
        const data = await response.json();
        setMovie(data);
        setFilmLink(data.Link); // Здесь предполагается, что свойство с ссылкой на фильм называется Link
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>
    );
  }

  const genreArray = movie.Genre.split(","); // Преобразование строки в массив
  const genreString = genreArray.join(` • `);

  return (
    <>
      <div className="mainLogo">
        <Link to={"/posts"}>
          <Logotype />
        </Link>
      </div>
      <Header handleFilterMovie={() => {}} handleMoveMain={() => {}} titleFilm={() => {}} />
      <div className="movie-details">
        <div className="movie-poster">
          {movie.Poster !== "N/A" ? (
            <img className="movie-poster--img" src={movie.Poster} alt={movie.Title} />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
              draggable="false"
              alt={movie.Title}
            />
          )}
          <ShareButton/>
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
      <RecommendationsFilm movieTitle={movie.Title} />
    </>
  );
};







