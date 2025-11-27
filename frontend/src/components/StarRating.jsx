import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({
  rating = 0,
  onRatingChange,
  readonly = false,
  size = "md",
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={`${
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            } transition-all duration-200 ${
              isFilled ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled ? "fill-current" : ""
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
