import axios from 'axios';

const serverUrl = process.env.REACT_APP_BACKEND_URL;

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${serverUrl}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${serverUrl}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${serverUrl}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${serverUrl}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${serverUrl}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
