import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = "";

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GENRE:
      return action.payload;
    default:
      return state;
  }
};

export default genreReducer;
