export const postReview = async (reviewData) => {
    const response = await fetch(`${import.meta.env.VITE_REVIEW_SERVICE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
      credentials: "include",
    });
    return response.json();
  };