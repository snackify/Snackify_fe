import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8001/api/v1",
  withCredentials: true,
});

export const signup = (username, password, email) =>
  api.post("/users/sign_up", { username, password, email });

export const login = (username, password) =>
  api.post("/auth/login", { username, login_password: password });

export const fetchUser = (username) =>
  api.get("/users", { params: { username } });

export const fetchReviews = (userIds) =>
  api.get("/reviews", { data: { user_ids: userIds } });

export const fetchFollowedUsers = (userId) =>
  api.get("/follower", { params: { follower_id: userId } });