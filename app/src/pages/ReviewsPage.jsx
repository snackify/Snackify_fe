import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postReview } from "../api/reviewApi";
import { UserContext } from "../context/UserContext";

const fetchOrCreate = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return response.ok ? response.json() : null;
};

const fetchRestaurantId = async (countryName, cityName, restaurantName, street, num, tel, link_to_google, long, lat) => {
  try {
    let countryResponse = await fetch(
      `${import.meta.env.VITE_RESTAURANT_SERVICE_URL}/restaurants/countries?country_name=${countryName}`,
      {
        method: "GET", // Optional, default is GET
        credentials: "include", // Enables sending cookies with cross-origin requests
      }
    );
    let countryData = countryResponse.ok ? await countryResponse.json() : null;
    let countryId = countryData ? countryData.country_id : null;

    if (countryId === null || countryResponse.status === 404) {
      countryId = await fetchOrCreate(`${import.meta.env.VITE_RESTAURANT_SERVICE_URL}/restaurants/countries`, { country_name: countryName });
    }

    let cityResponse = await fetch(
      `${import.meta.env.VITE_RESTAURANT_SERVICE_URL}/restaurants/cities?city_name=${cityName}&country_id=${countryId}`,
      {credentials: "include"},
      );
    let cityData = cityResponse.ok ? await cityResponse.json() : null;
    let cityId = cityData ? cityData.city_id : null;

    if (!cityId) {
      cityId = await fetchOrCreate(
        `${import.meta.env.VITE_RESTAURANT_SERVICE_URL}/restaurants/cities`,
        { city_name: cityName, country_id: countryId }
      );
    }

    let restaurantResponse = await fetch(
      `${import.meta.env.VITE_RESTAURANT_SERVICE_URL}/restaurants?restaurant_name=${restaurantName}&city_id=${cityId}&country_id=${countryId}&street=${encodeURIComponent(street)}&num=${encodeURIComponent(num)}`,
      { credentials: "include" }
    );
    let restaurantData = restaurantResponse.ok ? await restaurantResponse.json() : null;
    let restaurantId = restaurantData ? restaurantData.restaurant_id : null;

    if (!restaurantId) {
      restaurantId = await fetchOrCreate(`${import.meta.env.VITE_RESTAURANT_SERVICE_URL}/restaurants`, { restaurant_name: restaurantName, city_id: cityId, country_id: countryId, street: street, num: num, tel: tel, link_to_google: link_to_google, long: long, lat: lat });
    }

    return { countryId, cityId, restaurantId };
  } catch (error) {
    console.error("Error fetching or creating IDs:", error);
    return { countryId: null, cityId: null, restaurantId: null };
  }
};

const ReviewsPage = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    user_id: user?.user_id || null,
    categories: [],
    country_name: "",
    city_name: "",
    restaurant_name: "",
    restaurant_id: 0,
    rating: 0,
    review: "",
    street: "",
    num: "",
    tel: "",
    link_to_google: "",
    long: 0,
    lat: 0,
  });

  // Redirect to AuthPage if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

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
      restaurant_name,
      reviewData.street,
      reviewData.num,
      reviewData.tel,
      reviewData.link_to_google,
      reviewData.long,
      reviewData.lat
    );

    if (!countryId) {
      console.error("Error: Country ID not found");
    } else if (!cityId) {
      console.error("Error: City ID not found");
    } else if (!restaurantId) {
      console.error("Error: Restaurant ID not found");
    } else {
      const { city_name, country_name, link_to_google, tel, street, num, ...filteredReviewData } = reviewData;
      const reviewDataPost = {
        ...filteredReviewData,
        restaurant_id: restaurantId,
      };
    
      try {
        const response = await postReview(reviewDataPost);
      } catch (error) {
        console.error("Error posting review:", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Add a Review</h1>

      {/* Logout Button */}
      {user && (
        <button
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        >
          Logout
        </button>
      )}

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
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={reviewData.street}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="num">Number</label>
          <input
            type="text"
            id="num"
            name="num"
            value={reviewData.num}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tel">Telefone</label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={reviewData.tel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="link_to_google">Link to Google</label>
          <input
            type="text"
            id="link_to_google"
            name="link_to_google"
            value={reviewData.link_to_google}
            onChange={handleInputChange}
            required
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewsPage;
