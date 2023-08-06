import axios from "axios";

const serverUrl = process.env.REACT_APP_BACKEND_URL + "/api/";

const axiosAuth = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");

    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("access_token");

      const resFetch = await fetch(serverUrl + "request-accesstoken", {
        method: 'POST',
        credentials: ["include"],
      });

      if (resFetch.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      const resJson = await resFetch.json();
      const access_token = resJson.access_token;
      localStorage.setItem("access_token", access_token);

      if (access_token) {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${access_token}`,
        };
      }
      return axiosAuth(originalRequest);
    }
    return Promise.reject(error);
  }
);

const axiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export { axiosAuth, axiosInstance };
