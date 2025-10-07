const initialValue = {
  ratedMovies: [], //stores array of object{ movie, rating }
  // userRating: [],
};
const addstarReducer = (state = initialValue, action) => {
  if (action.type == "ADDRATING") {
    const newEntry = {
      ...action.payload.movieDetails,
      userRating: action.payload.userRating,
    }; //new rated moc=vue
    const filterdData = state.ratedMovies.filter((movie) => {
      return movie.id !== newEntry.id;
    }); //prevnt duplicate rating
    return {
      ...state,
      ratedMovies: [...filterdData, newEntry],
    };
  } else if (action.type == "REMOVERATEDMOVIE") {
    return {
      ...state,
      ratedMovies: state.ratedMovies.filter((item) => {
        return item.id !== action.payload.id;
      }),
    };
  } else {
    return state;
  }
};
export default addstarReducer;
