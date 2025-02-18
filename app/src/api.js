import axios from "axios";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_URL,
  withCredentials: true,
});

const reviewApi = axios.create({
  baseURL: import.meta.env.VITE_REVIEW_SERVICE_URL,
  withCredentials: true,
});

const followerApi = axios.create({
  baseURL: import.meta.env.VITE_FOLLOWER_SERVICE_URL,
  withCredentials: true,
});

export const signup = (username, password, email) =>
  userApi.post("/users/sign_up", { username, password, email });

export const login = (username, password) => {
  return userApi.post("/auth/login", { username, login_password: password });
};

export const fetchUser = (username) =>
  userApi.get(`/users?username=${username}`);

export const fetchReviews = (userIds) =>
  reviewApi.get("/reviews", { params: { user_ids: userIds } });

export const fetchFollowedUsers = (userId) =>
  followerApi.get("/follower", { params: { follower_id: userId } });
