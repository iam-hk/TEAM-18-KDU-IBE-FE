import { useState } from "react";
import StarRatings from "react-star-ratings";
import "./RoomReview.scss";

export const RoomReview = () => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");

  const changeRating = (newRating) => {
    setStars(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Stars: ${stars}, Review: ${review}`);
    setStars(0);
    setReview("");
  };

  return (
    <div className="review-form-wrapper">
      <div className="review-form-container">
        <h2 className="review-form-heading">Review Form</h2>
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="stars-container">
            <label htmlFor="stars">Stars:</label>
            <StarRatings
              rating={stars}
              starRatedColor="#ffd700"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
            />
          </div>
          <div className="review-textarea">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
