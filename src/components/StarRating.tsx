import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fasStar,
  faStarHalfAlt as fasStarHalf,
} from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating = 0, totalStars = 5 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FontAwesomeIcon
            key={index}
            style={{ marginRight: 5, color: 'var(--accent)' }}
            icon={
              starValue <= rating
                ? fasStar
                : starValue - rating < 1 && starValue - rating > 0
                ? fasStarHalf
                : farStar
            }
          />
        );
      })}
    </div>
  );
};

export default StarRating;
