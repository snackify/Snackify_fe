import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../api/followerApi";
import { UserContext } from "../context/UserContext";  

const FollowPage = () => {
  const [username, setUsername] = useState("");
  const { user } = useContext(UserContext);

  const handleFollow = async () => {
    if (!username) {
      console.error("Please enter a username to follow.");
      return;
    }
    if (!user || !user.user_id) {  // 🔹 Ensure user and user_id exist
      console.error("User must be logged in to follow someone.");
      return;
    }
    try {
      const response = await followUser(username, user);
      console.log("Followed successfully:", response);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    if (!username) {
      console.error("Please enter a username to unfollow.");
      return;
    }
    if (!user || !user.user_id) {  // 🔹 Ensure user and user_id exist
      console.error("User must be logged in to unfollow someone.");
      return;
    }
    try {
      const response = await unfollowUser(username, user);
      console.log("Unfollowed successfully:", response);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div>
      <h1>Follow or Unfollow Users</h1>
      {user ? <p>Logged in as: {user.username}</p> : <p>Please log in.</p>}

      {/* 🔹 Navigation Links (Restored from original) */}
      <div className="mb-4">
        <Link to="/feed">
          <button>Feed</button>
        </Link>
        <Link to="/follow">
          <button>Followers</button>
        </Link>
        <Link to="/reviews">
          <button>Reviews</button>
        </Link>
      </div>

      {/* 🔹 Follow/Unfollow Input and Buttons */}
      <div>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleFollow}>Follow</button>
        <button onClick={handleUnfollow}>Unfollow</button>
      </div>
    </div>
  );
};

export default FollowPage;
