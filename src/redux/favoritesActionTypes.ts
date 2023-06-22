export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  movie: any; // здесь нужно указать тип фильма
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  movieId: string; // здесь нужно указать тип идентификатора фильма
}

export type FavoritesActionTypes =
  | AddToFavoritesAction
  | RemoveFromFavoritesAction;