import { SetStateAction, useState } from "react";
import StarRatings from "react-star-ratings";
import "./RoomReview.scss";
import axios from "axios";
import CustomizedSnackbars from "../../Component/snackbar/CustomizedSnackbars";

export const RoomReview = () => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("error");
  const changeRating = (newRating: SetStateAction<number>) => {
    setStars(newRating);
  };

  const handleReviewChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setReview(event.target.value);
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("id");
    console.log(uuid);
    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/review";
    console.log(url);
    try {
      const response = await axios.post(url, {
        uuid: uuid,
        rating: stars,
        review: review,
      });
      setStatus(response.data.status);
      setMessage(response.data.message);
      setShowSnackbar(true);
      setStars(0);
      setReview("");
    } catch (error) {
      setMessage("Error Occured");
      setShowSnackbar(true);
    }
  };

  return (
    <>
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
      {showSnackbar && (
        <CustomizedSnackbars
          status={status}
          message={message}
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </>
  );
};
