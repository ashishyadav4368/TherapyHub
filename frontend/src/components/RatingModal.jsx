import React, { useState } from "react";
import { X, Star } from "lucide-react";
import StarRating from "./StarRating";
import axios from "axios";

const RatingModal = ({ isOpen, onClose, session, onRatingSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/ratings", {
        therapist_id: session.therapist_id._id,
        session_id: session._id,
        rating,
        review,
      });

      if (response.data.success) {
        alert("Thank you for your feedback!");
        onRatingSubmitted();
        onClose();
        setRating(0);
        setReview("");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Error submitting rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Rate Your Session
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            How was your session with{" "}
            <strong>{session.therapist_id.name}</strong>?
          </p>
          <p className="text-sm text-gray-500">
            {new Date(session.date).toLocaleDateString()} at {session.time}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex justify-center">
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size="lg"
              />
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share your experience with this therapist..."
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {review.length}/500 characters
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
