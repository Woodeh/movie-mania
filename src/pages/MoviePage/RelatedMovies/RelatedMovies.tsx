import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RelatedMovies.scss";
import { TypographyText } from "../../../components/Typography/TypographyText";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IMovie } from "../../../utils/interfaces/IMovie";
import Loader from "../../../components/common/Loader/Loader";

interface IRecommendationsFilm {
  movieTitle: string;
}

export const RecommendationsFilm: FC<IRecommendationsFilm> = ({
  movieTitle,
}) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(
            movieTitle
          )}&apikey=cbd67aa8`
        );
        const data = await response.json();

        if (data.Search) {
          const movieIds = data.Search.map((movie: any) => movie.imdbID);
          const requests = movieIds.map((id: string) =>
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=cbd67aa8`)
          );
          const responses = await Promise.all(requests);
          const moviesData = await Promise.all(
            responses.map((response) => response.json())
          );

          const sortedMovies = moviesData.sort(
            (a: any, b: any) =>
              parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
          );
          setMovies(sortedMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [movieTitle]);

  const handleCardClick = (id: string) => {
    navigate(`/movies/${id}`);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="recommendations">
        <h1 className="related-title">Related movies</h1>
        {movies.length > 0 ? (
          <Carousel
            responsive={responsive}
            renderButtonGroupOutside={true}
            arrows={true}
            autoPlay={true}
            transitionDuration={100}
            // infinite={true}
          >
            {movies.map((movie) => (
              <Link
                to={`/movies/${movie.imdbID}`}
                className="movie-link"
                key={movie.imdbID}
              >
                <div
                  className="movie-poster"
                  onClick={() => handleCardClick(movie.imdbID)}
                >
                  <button className="movie-poster--btn">
                    <TypographyText content={movie.imdbRating} type="subline" />
                  </button>
                  <img
                    className="movie-poster--img"
                    draggable="false"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <h3>{movie.Title}</h3>
                  <h2>{movie.Year}</h2>
                  <p>{movie.Genre.split(", ").join(" • ")}</p>
                </div>
              </Link>
            ))}
          </Carousel>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
