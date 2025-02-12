import { useState } from "react";

const FollowUnfollow = ({ onFollow, onUnfollow }) => {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="Enter Username"
        value={username}
        onChange={handleChange}
      />
      <button onClick={() => onFollow(username)}>Follow</button>
      <button onClick={() => onUnfollow(username)}>Unfollow</button>
    </div>
  );
};

export default FollowUnfollow;
