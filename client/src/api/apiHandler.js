import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAnnounce() {
    return service
      .get("/api/announce")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneAnnounce(announceId) {
    return service
      .get(`/api/announce/${announceId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addAnnounce(data) {
    return service
      .post("/api/announce", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  updateAnnounce(announceId, data) {
    return service
      .patch(`/api/announce/${announceId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/api/users/me", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserAnnounce() {
    return service
      .get("/api/users/me/announce")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeAnnounce(announceId) {
    return service
      .delete(`/api/announce/${announceId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getUserInfos() {
    return service
      .get("/api/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
