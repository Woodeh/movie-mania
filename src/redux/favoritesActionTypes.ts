export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  movie: any; 
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  movieId: string; 
}

export type FavoritesActionTypes =
  | AddToFavoritesAction
  | RemoveFromFavoritesAction;