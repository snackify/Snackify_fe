const ReviewList = ({ reviews }) => {
  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews to show</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="border p-4 my-2 rounded">
            <h2 className="font-bold">{review.restaurant_name}</h2>
            <p>Rating: {review.rating}</p>
            <p>Categories: {review.categories ? review.categories.join(", ") : "N/A"}</p>
            <p>{review.review}</p>
            <p>Location: {review.lat}, {review.long}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
