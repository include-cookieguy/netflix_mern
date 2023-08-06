import {
  axiosInstance,
} from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const getFav = (auth) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`user/favlist`, auth.token);
    dispatch({ type: GLOBALTYPES.GETFAV, payload: res.data.favouriteMovie });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const addToFav = (item, auth) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`user/favlist/${item}`, null, auth.token);
    dispatch({ type: GLOBALTYPES.ADDFAV, payload: res.data.movie });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const deleteToFav = (item, auth) => async (dispatch) => {
  try {
    await axiosInstance.delete(`user/favlist/${item}`, auth.token);
    dispatch({ type: GLOBALTYPES.REMOVEFAV, payload: item });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const removeAll = (auth) => async (dispatch) => {
  try {
    await axiosInstance.delete(`user/favlist`, auth.token);
    dispatch({ type: GLOBALTYPES.REMOVEFAVALL });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getWatchAgain = (auth) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`user/again`, auth.token);

    dispatch({ type: GLOBALTYPES.GETWATCHAGAIN, payload: res.data });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const createWatchAgain = (auth, watchAgainMovie) => async (dispatch) => {
  try {
    await axiosInstance.post(`user/again`, watchAgainMovie, auth.token);

    dispatch({ type: GLOBALTYPES.WATCHAGAIN, payload: watchAgainMovie });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const updateWatchAgain = (auth, watchAgainMovie) => async (dispatch) => {
  try {
    await axiosInstance.patch(`user/again`, watchAgainMovie, auth.token);

    dispatch({ type: GLOBALTYPES.SETWATCHAGAIN, payload: watchAgainMovie });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const deleteWatchAgain = (auth, id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`user/again/${id}`, auth.token);

    dispatch({ type: GLOBALTYPES.REMOVEWATCHAGAIN, payload: id });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
