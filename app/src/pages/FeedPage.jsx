import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchReviews, fetchFollowedUsers } from "../api";
import ReviewList from "../components/ReviewList";
import { UserContext } from "../context/UserContext";  

export default function FeedPage() {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const followedRes = await fetchFollowedUsers(user.user_id);
        const followedIds = followedRes.data.map(user => user.followee_id);
        const reviewsRes = await fetchReviews(followedIds);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    loadReviews();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Your Feed</h1>

      <div className="mb-4">
        <Link to="/feed">
          <button>Feed</button>
        </Link>
        <Link to="/follow">
          <button>Followers</button>
        </Link>
        <Link to="/reviews">
          <button>Reviews</button>
        </Link>
      </div>

      <ReviewList reviews={reviews} />
    </div>
  );
}
