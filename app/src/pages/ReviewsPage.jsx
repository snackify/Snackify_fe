import { useState } from "react";
import { postReview } from "../api/reviewApi";

const ReviewsPage = () => {
  const [reviewData, setReviewData] = useState({
    user_id: 1, // Example user ID
    categories: [],
    restaurant_name: "",
    restaurant_id: 0, // Replace with actual restaurant ID
    rating: 0,
    review: "",
    long: 0,
    lat: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      categories: value.split(",").map((category) => category.trim()),
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const response = await postReview(reviewData);
    console.log(response);
  };

  return (
    <div>
      <h1>Add a Review</h1>
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label htmlFor="restaurant_name">Restaurant Name</label>
          <input
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            value={reviewData.restaurant_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="restaurant_id">Restaurant ID</label>
          <input
            type="number"
            id="restaurant_id"
            name="restaurant_id"
            value={reviewData.restaurant_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleInputChange}
            required
            min={1}
            max={5}
          />
        </div>
        <div>
          <label htmlFor="categories">Categories (comma-separated)</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={reviewData.categories.join(", ")}
            onChange={handleCategoryChange}
          />
        </div>
        <div>
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            value={reviewData.review}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lat">Latitude</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={reviewData.lat}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="long">Longitude</label>
          <input
            type="number"
            id="long"
            name="long"
            value={reviewData.long}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewsPage;
