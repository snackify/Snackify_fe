import { useState } from "react";

const AddReview = ({ onSubmit }) => {
  const [reviewData, setReviewData] = useState({
    restaurant_name: "",
    restaurant_id: "",
    rating: "",
    review: "",
  });

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reviewData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="restaurant_name" placeholder="Restaurant Name" onChange={handleChange} required />
      <input type="number" name="restaurant_id" placeholder="Restaurant ID" onChange={handleChange} required />
      <input type="number" name="rating" placeholder="Rating (1-5)" onChange={handleChange} required />
      <textarea name="review" placeholder="Write your review..." onChange={handleChange}></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReview;
