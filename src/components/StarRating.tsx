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
            className="text-amber-700 dark:text-amber-300"
            icon={
              starValue <= rating
                ? fasStar
                : starValue - rating < 1 && starValue - rating > 0
                ? fasStarHalf
                : farStar
            }
            style={{ marginRight: 5 }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
