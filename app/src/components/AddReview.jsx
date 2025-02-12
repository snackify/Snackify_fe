import { useState } from "react";
import { postReview } from "../api/reviewApi"; // Ensure this API function exists

const AddReview = ({ onReviewAdded }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      user_id: 1, // Replace with the logged-in user's ID
      restaurant_name: restaurantName,
      restaurant_id: 1, // Replace with actual restaurant ID
      rating: rating,
      review: reviewText,
      long: 0.0, // Replace with actual longitude
      lat: 0.0,  // Replace with actual latitude
    };

    try {
      await postReview(reviewData);
      alert("Review added successfully!");
      onReviewAdded?.(); // Refresh reviews if a function is provided
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review.");
    }
  };

  return (
    <div>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Restaurant Name:</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
