export const addToFavorites = (movie: any) => {
    return {
      type: "ADD_TO_FAVORITES",
      payload: movie,
    };
  };
  
  export const removeFromFavorites = (movieId: string) => {
    return {
      type: "REMOVE_FROM_FAVORITES",
      payload: movieId,
    };
  };