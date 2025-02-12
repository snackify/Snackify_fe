export const postReview = async (reviewData) => {
    const response = await fetch("http://localhost:8002/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    return response.json();
  };