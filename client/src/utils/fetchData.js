import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(baseUrl + `/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(baseUrl + `/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(baseUrl + `/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(baseUrl + `/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(baseUrl + `/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
