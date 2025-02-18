import { createContext, useState, useEffect } from "react";
import { fetchUser } from "../api";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetchUser();
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data)); // Save to localStorage
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    if (!user) loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
