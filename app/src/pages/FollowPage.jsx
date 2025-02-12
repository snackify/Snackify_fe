import { useState } from "react";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../api/followerApi";

const FollowPage = () => {
  const [username, setUsername] = useState("");

  const handleFollow = async () => {
    if (!username) {
      console.error("Please enter a username to follow.");
      return;
    }
    try {
      const response = await followUser(username);  // Adjusted for username input
      console.log(response);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    if (!username) {
      console.error("Please enter a username to unfollow.");
      return;
    }
    try {
      const response = await unfollowUser(username);  // Adjusted for username input
      console.log(response);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div>
      <h1>Follow or Unfollow Users</h1>
      
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

      <div>
        <input
          type="text"
          name="username"
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
