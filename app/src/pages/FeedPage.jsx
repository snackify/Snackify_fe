import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchReviews, fetchFollowedUsers } from "../api";
import ReviewList from "../components/ReviewList";
import { UserContext } from "../context/UserContext";  

export default function FeedPage() {
  const [reviews, setReviews] = useState([]);
  const [noFollowedUsers, setNoFollowedUsers] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect to AuthPage if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!user) return;
      try {
        const followedRes = await fetchFollowedUsers(user.user_id);
        const followedIds = followedRes.data.followees

        if (followedIds.length === 0) {
          setNoFollowedUsers(true);
          return;
        }

        const reviewsRes = await fetchReviews(followedIds);

        setReviews(reviewsRes.data.reviews);
      } catch (error) {
        if (error.response?.status === 404) {
          setNoFollowedUsers(true);
        } else {
          console.error("Failed to fetch reviews", error);
        }
      }
    };
    loadReviews();
  }, [user]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Your Feed</h1>

      {/* 🔹 Logout Button */}
      {user && (
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
          Logout
        </button>
      )}

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

      {/* 🔹 Handle No Followed Users */}
      {noFollowedUsers ? (
        <p className="text-gray-500">You're not following anyone yet. Follow users to see their reviews!</p>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
}
