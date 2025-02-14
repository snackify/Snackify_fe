import { useState, useEffect } from "react";
import { postReview } from "../api/reviewApi";

// Function to fetch restaurant details based on names
const fetchAndAddRestaurant = async (restaurantName, city, country) => {
  try {
    const token = localStorage.getItem("jwt_token");

    // 1. Try fetching the restaurant
    const response = await fetch(
      `http://127.0.0.1:8004/api/v1/restaurants?restaurant_name=${encodeURIComponent(restaurantName)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data; // Return existing restaurant
    }

    if (response.status === 404) {
      console.warn("Restaurant not found. Attempting to add...");

      // 2. If not found, attempt to create it
      const addResponse = await fetch(`/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: restaurantName,
          city: city,
          country: country,
        }),
      });

      if (!addResponse.ok) {
        throw new Error(`Failed to create restaurant: ${addResponse.status}`);
      }

      const newRestaurant = await addResponse.json();
      console.log("Restaurant added successfully:", newRestaurant);
      return newRestaurant;
    }

    throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching or adding restaurant:", error);
    return null;
  }
};


const ReviewsPage = () => {
  const [reviewData, setReviewData] = useState({
    user_id: 1, // Example user ID
    categories: [],
    country_name: "",
    city_name: "",
    restaurant_name: "",
    restaurant_id: 0,
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
    
    const { country_name, city_name, restaurant_name } = reviewData;
    const { countryId, cityId, restaurantId } = await fetchAndAddRestaurant(
      country_name,
      city_name,
      restaurant_name
    );

    if (restaurantId && cityId && countryId) {
      const updatedReviewData = {
        ...reviewData,
        restaurant_id: restaurantId,
        city_id: cityId,
        country_id: countryId,
      };

      const response = await postReview(updatedReviewData);
      console.log(response);
    } else {
      console.error("Unable to fetch necessary IDs.");
    }
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
          <label htmlFor="country_name">Country Name</label>
          <input
            type="text"
            id="country_name"
            name="country_name"
            value={reviewData.country_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city_name">City Name</label>
          <input
            type="text"
            id="city_name"
            name="city_name"
            value={reviewData.city_name}
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
