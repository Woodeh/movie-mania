import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./RecommendationsFilm.scss"
import { TypographyText } from '../../Typography/TypographyText';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
interface IRecommendationsFilm { }

interface IMovie {
    Genre: any;
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
    imdbRating: string;
}

export const RecommendationsFilm: FC<IRecommendationsFilm> = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://www.omdbapi.com/?s=popular&apikey=cbd67aa8');
                const data = await response.json();

                if (data.Search) {
                    const movieIds = data.Search.map((movie: any) => movie.imdbID);
                    const requests = movieIds.map((id: string) => fetch(`https://www.omdbapi.com/?i=${id}&apikey=cbd67aa8`));
                    const responses = await Promise.all(requests);
                    const moviesData = await Promise.all(responses.map((response) => response.json()));

                    const sortedMovies = moviesData.sort((a: any, b: any) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
                    const top5Movies = sortedMovies.slice(1, 9); // Ограничение до пяти фильмов

                    setMovies(top5Movies);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const handleCardClick = (id: string) => {
        navigate(`/movies/${id}`);
    };


    // const truncateTitle = (title: string) => {
    //     if (title.length > 30) {
    //         let truncatedTitle = title.substring(0, 30);
    //         const lastSpaceIndex = truncatedTitle.lastIndexOf(' ');
    //         if (lastSpaceIndex !== -1) {
    //             truncatedTitle = truncatedTitle.substring(0, lastSpaceIndex);
    //         }
    //         return truncatedTitle + '...';
    //     }
    //     return title;
    // };
    // Обрезает название фильма на заданное количество символов

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            // partialVisibilityGutter: -10,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <div className="recommendations">
                <h1>Recommendations</h1>
                {movies.length > 1 ? (
                    <ul className='recommendations--ul'>
                    </ul>
                ) : (
                    <div className="loader triangle">
                        <svg viewBox="0 0 86 80">
                            <polygon points="43 8 79 72 7 72"></polygon>
                        </svg>
                    </div>
                )}
            </div>
            <Carousel
                responsive={responsive}
                renderButtonGroupOutside={true}
                arrows={true}
                // autoPlay={true}
                transitionDuration={100}
                infinite={true}
            >
                {movies.map((movie) => (
                    <Link to={`/movies/${movie.imdbID}`}
                        className="movie-link">
                        <div className="movie-poster" onClick={() => handleCardClick(movie.imdbID)}>
                            <button className='movie-poster--btn'>
                                <TypographyText
                                    content={movie.imdbRating}
                                    type='subline'
                                />
                            </button>
                            <img
                                className='movie-poster--img'
                                draggable="false"
                                src={movie.Poster}
                                alt={movie.Title}
                            />
                            <h3>{movie.Title} </h3>
                            <h2>{movie.Year}</h2>
                            <p>{movie.Genre.split(', ').join(' • ')}</p>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </>
    );
};