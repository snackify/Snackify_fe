import { useState } from "react";
import axios from "axios";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:8001/api/v1",
    withCredentials: true, // Enable cookies
  });

  const signup = async () => {
    try {
      const res = await api.post("/users/sign_up", { username, password, email });
      setMessage("Signup successful!");
    } catch (error) {
      setMessage(error.response?.data || "Signup failed");
    }
  };

  const login = async () => {
    try {
      await api.post("/auth/login", { username, login_password: password });
      setMessage("Login successful!");
      fetchUser(username);
    } catch (error) {
      setMessage(error.response?.data || "Login failed");
    }
  };

  const fetchUser = async (username) => {
    try {
      const res = await api.get("users", {
        params: { username }  // Send username as a query parameter
      });
      setUser(res.data);
    } catch (error) {
      setMessage("Failed to fetch user");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Auth App</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full my-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full my-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full my-2"
      />
      <button onClick={signup} className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
      <button onClick={login} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Login</button>
      <p className="mt-4">{message}</p>
      {user && <p>Logged in as: {user.username}</p>}
    </div>
  );
}
