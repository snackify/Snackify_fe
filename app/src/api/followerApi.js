export const followUser = async (followeeName, user) => {

    if (!user || !user.user_id) {
      throw new Error("User not logged in or missing user_id");
    }

    // get the followee ID from the followees username
    const response_followee = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/users?username=${followeeName}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
      if (!response_followee.ok) {
        throw new Error(`Failed to fetch user: ${response_followee.statusText}`);
    }
    const followee = await response_followee.json();
    const followeeId = followee.user_id;


    const followData = {
      "follower_id": user.user_id,
      "followee_id": followeeId
    };

    const response = await fetch(`${import.meta.env.VITE_FOLLOWER_SERVICE_URL}/follower`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followData),
      credentials: "include",
    });
    return response.json();
  };
  
  export const unfollowUser = async (followeeName, user) => {

    // get the followee ID from the followees username
    const response_followee = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/users?username=${followeeName}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
      if (!response_followee.ok) {
        throw new Error(`Failed to fetch user: ${response_followee.statusText}`);
    }
    const followee = await response_followee.json();
    const followeeId = followee.user_id;

    const followData = {
      "follower_id": user.user_id,
      "followee_id": followeeId
    };

    const response = await fetch(`${import.meta.env.VITE_FOLLOWER_SERVICE_URL}/follower`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followData),
      credentials: "include",
    });
    return response.json();
  };
  