import { useState, useEffect } from "react";
import { postReview } from "../api/reviewApi";

const fetchOrCreate = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.ok ? response.json() : null;
};

const fetchRestaurantId = async (countryName, cityName, restaurantName) => {
  try {
    let countryResponse = await fetch(`${import.meta.env.RESTAURANT_SERVICE_URL}/restaurants/countries?country_name=${countryName}`);
    let countryData = countryResponse.ok ? await countryResponse.json() : null;
    let countryId = countryData ? countryData.country_id : null;

    if (!countryId) {
      countryData = await fetchOrCreate(`${import.meta.env.RESTAURANT_SERVICE_URL}/restaurants/countries`, { country_name: countryName });
      countryId = countryData?.country_id;
    }

    let cityResponse = await fetch(`${import.meta.env.RESTAURANT_SERVICE_URL}/restaurants/cities?city_name=${cityName}&country_id=${countryId}`);
    let cityData = cityResponse.ok ? await cityResponse.json() : null;
    let cityId = cityData ? cityData.city_id : null;

    if (!cityId) {
      cityData = await fetchOrCreate(`${import.meta.env.RESTAURANT_SERVICE_URL}/restaurants/cities`, { city_name: cityName, country_id: countryId });
      cityId = cityData?.city_id;
    }

    let restaurantResponse = await fetch(`${import.meta.env.RESTAURANT_SERVICE_URL}/restaurants?restaurant_name=${restaurantName}&city_id=${cityId}&country_id=${countryId}`);
    let restaurantData = restaurantResponse.ok ? await restaurantResponse.json() : null;
    let restaurantId = restaurantData ? restaurantData.restaurant_id : null;

    if (!restaurantId) {
      restaurantData = await fetchOrCreate(`${import.meta.env.RESTAURANT_SERVICE_URL}/restaurants`, { restaurant_name: restaurantName, city_id: cityId, country_id: countryId });
      restaurantId = restaurantData?.restaurant_id;
    }

    return { countryId, cityId, restaurantId };
  } catch (error) {
    console.error("Error fetching or creating IDs:", error);
    return { countryId: null, cityId: null, restaurantId: null };
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
    const { countryId, cityId, restaurantId } = await fetchRestaurantId(
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
