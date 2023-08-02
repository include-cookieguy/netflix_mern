import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  favouriteMovie: [],
  watchAgain: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GETFAV:
      return {
        ...state,
        favouriteMovie: action.payload,
      };
    case GLOBALTYPES.ADDFAV:
      return {
        ...state,
        favouriteMovie: [...state.favouriteMovie, action.payload],
      };
    case GLOBALTYPES.REMOVEFAV:
      return {
        ...state,
        favouriteMovie: state.favouriteMovie.filter(
          (e) => e._id !== action.payload
        ),
      };

    case GLOBALTYPES.REMOVEFAVALL:
      return {
        ...state,
        favouriteMovie: [],
      };

    case GLOBALTYPES.GETWATCHAGAIN:
      return {
        ...state,
        watchAgain: action.payload,
      };

    case GLOBALTYPES.WATCHAGAIN:
      return {
        ...state,
        watchAgain: [...state.watchAgain, action.payload],
      };

    case GLOBALTYPES.SETWATCHAGAIN:
      return {
        ...state,
        watchAgain: state.watchAgain.map((e) =>
          e._id !== action.payload._id ? e : action.payload
        ),
      };

    case GLOBALTYPES.REMOVEWATCHAGAIN:
      return {
        ...state,
        watchAgain: state.watchAgain.filter((e) => e._id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
