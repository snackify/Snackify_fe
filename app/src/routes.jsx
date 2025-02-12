import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ReviewsPage from "./pages/ReviewsPage";
import FollowPage from "./pages/FollowPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/follow" element={<FollowPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;