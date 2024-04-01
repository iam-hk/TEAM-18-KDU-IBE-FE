import "./SkeletonRoomCard.scss";
// import "../RoomCard/RoomCard.scss"
export default function SkeletonRoomCard() {
  return (
        <div className="room-display">
          <div className="individual-roomCard" style={{minHeight:"524px"}}>
            <div className="imageOfRoomTypeContainer">
              <div className="skeleton-loader skeleton-image"></div>
            </div>
            <div className="informationOfRoomType">
              <div className="propertyAndReviewContainer">
                <div className="propertyNameContainer">
                  <div className="skeleton-loader property-name skeleton-text"></div>
                </div>
                <div className="reviewAndRatingContainer">
                  <div className="skeleton-loader rating-and-review skeleton-text"></div>
                </div>
              </div>
              <div className="otherDetailsOfRoomType">
                <div className="locationContainer skeleton-text">
                  <div className="skeleton-loader property-address skeleton-text"></div>
                </div>
                <div className="roomCategoryAndSizeContainer">
                  <div className="skeleton-loader room-category skeleton-text"></div>
                  <div className="skeleton-loader room-size skeleton-text"></div>
                </div>
                <div className="maximumNumberOfGuestsContainer">
                  <div className="skeleton-loader max-guests skeleton-text"></div>
                </div>
                <div className="bedInformation skeleton-text">
                  <div className="skeleton-loader skeleton-text "></div>
                </div>
              </div>
              <div className="otherDetailsOfRoomType">
                <div className="locationContainer skeleton-text">
                  <div className="skeleton-loader property-address skeleton-text"></div>
                </div>
                <div className="roomCategoryAndSizeContainer">
                  <div className="skeleton-loader room-category skeleton-text"></div>
                  <div className="skeleton-loader room-size skeleton-text"></div>
                </div>
                <div className="maximumNumberOfGuestsContainer">
                  <div className="skeleton-loader max-guests skeleton-text"></div>
                </div>
                <div className="bedInformation skeleton-text">
                  <div className="skeleton-loader skeleton-text "></div>
                </div>
              </div>
              <div className="otherDetailsOfRoomType">
                <div className="locationContainer skeleton-text">
                  <div className="skeleton-loader property-address skeleton-text"></div>
                </div>
                <div className="roomCategoryAndSizeContainer">
                  <div className="skeleton-loader room-category skeleton-text"></div>
                  <div className="skeleton-loader room-size skeleton-text"></div>
                </div>
                <div className="maximumNumberOfGuestsContainer">
                  <div className="skeleton-loader max-guests skeleton-text"></div>
                </div>
                <div className="bedInformation skeleton-text">
                  <div className="skeleton-loader skeleton-text "></div>
                </div>
              </div>
            </div>
            <div className="skeleton-loader promotion-banner "></div>
            <div className="skeleton-loader price-container "></div>
          </div>
        </div>
      );
}