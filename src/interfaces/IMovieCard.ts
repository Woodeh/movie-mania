export interface IMovieCard {
    filmId: string;
    image: string;
    titleFilm: string;
    yearFilm: string;
    genreFIlm: string;
    link: string;
    isFavorite: boolean;
    imdbRating: string;
    onAddToFavorites: () => void;
    onRemoveFromFavorites: () => void;
  }