import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  searchList: [],
  searchInput: "",
  timeQuery: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GETSEARCH:
      return {
        ...state,
        searchList: action.payload.data,
        searchInput: action.payload.query,
        timeQuery: action.payload.timeQuery,
      };
    default:
      return state;
  }
};

export default searchReducer;
