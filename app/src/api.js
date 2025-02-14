import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8001/api/v1",
  withCredentials: true,
});

const reviewApi = axios.create({
  baseURL: "http://localhost:8002/api/v1",
  withCredentials: true,
});

const followerApi = axios.create({
  baseURL: "http://localhost:8003/api/v1",
  withCredentials: true,
});

export const signup = (username, password, email) =>
  userApi.post("/users/sign_up", { username, password, email });

export const login = (username, password) =>
  userApi.post("/auth/login", { username, login_password: password });

export const fetchUser = (username) =>
  userApi.get("/users", { params: { username } });

export const fetchReviews = (userIds) =>
  reviewApi.get("/reviews", { params: { user_ids: userIds } });

export const fetchFollowedUsers = (userId) =>
  followerApi.get("/follower", { params: { follower_id: userId } });
