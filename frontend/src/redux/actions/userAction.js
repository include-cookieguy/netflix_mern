import {
  axiosAuth,
} from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const getFav = () => async (dispatch) => {
  try {
    const res = await axiosAuth.get(`user/favlist`);
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

export const addToFav = (item) => async (dispatch) => {
  try {
    const res = await axiosAuth.post(`user/favlist/${item}`);
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

export const deleteToFav = (item) => async (dispatch) => {
  try {
    await axiosAuth.delete(`user/favlist/${item}`);
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

export const removeAll = () => async (dispatch) => {
  try {
    await axiosAuth.delete(`user/favlist`);
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

export const getWatchAgain = () => async (dispatch) => {
  try {
    const res = await axiosAuth.get(`user/again`);

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

export const createWatchAgain = (watchAgainMovie) => async (dispatch) => {
  try {
    await axiosAuth.post(`user/again`, watchAgainMovie);

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

export const updateWatchAgain = (watchAgainMovie) => async (dispatch) => {
  try {
    await axiosAuth.patch(`user/again`, watchAgainMovie);

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

export const deleteWatchAgain = (id) => async (dispatch) => {
  try {
    await axiosAuth.delete(`user/again/${id}`);

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
