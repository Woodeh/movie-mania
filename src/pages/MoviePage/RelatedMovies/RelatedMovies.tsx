import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RelatedMovies.scss";
import { TypographyText } from "../../../components/Typography/TypographyText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMovie } from "../../../utils/interfaces/IMovie";
import Loader from "../../../components/common/Loader/Loader";

interface IRelatedMovies {
  movieTitle: string;
}

export const RelatedMovies: FC<IRelatedMovies> = ({ movieTitle }) => {
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

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-prev-arrow`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(movies.length, 4),
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(movies.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(movies.length, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(movies.length, 1),
        },
      },
    ],
  };

  return (
    <>
      <div className="related-movies">
        <h1 className="related-title">Related movies</h1>
        {movies.length > 0 ? (
          <Slider {...settings}>
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
                    <TypographyText
                      content={movie.imdbRating}
                      type="subline"
                    />
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
          </Slider>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};