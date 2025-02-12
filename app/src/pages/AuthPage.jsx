import { useState } from "react";
import { signup, login, fetchUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup(username, password, email);
      setMessage("Signup successful!");
    } catch (error) {
      setMessage(error.response?.data || "Signup failed");
    }
  };

  const handleLogin = async () => {
    try {
      await login(username, password);
      setMessage("Login successful!");
      const res = await fetchUser(username);
      setUser(res.data);
      navigate("/feed");
    } catch (error) {
      setMessage(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Auth App</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full my-2" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full my-2" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full my-2" />
      <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Login</button>
      <p className="mt-4">{message}</p>
      {user && <p>Logged in as: {user.username}</p>}
    </div>
  );
}