import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  favouriteMovie: [],
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
    default:
      return state;
  }
};

export default userReducer;
