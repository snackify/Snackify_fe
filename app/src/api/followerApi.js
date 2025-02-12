export const followUser = async (followData) => {
    const response = await fetch("http://localhost:8003/follower", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followData),
    });
    return response.json();
  };
  
  export const unfollowUser = async (followData) => {
    const response = await fetch("http://localhost:8003/follower", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followData),
    });
    return response.json();
  };
  