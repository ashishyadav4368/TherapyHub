import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, Phone, Video, CreditCard } from "lucide-react";
import axios from "axios";
import { useBookingPlan } from "../contexts/BookingPlanContext";

const BookSession = () => {
  const { therapistId } = useParams();
  const navigate = useNavigate();
  const { plan } = useBookingPlan();

  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [formData, setFormData] = useState({
    sessionType: "chat", // default; may be overridden by plan
    notes: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    transactionId: "",
    amount: "",
  });

  useEffect(() => {
    if (!plan) {
      navigate("/pricing");
      return;
    }
  }, [plan, navigate]);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/therapists/${therapistId}`
        );
        setTherapist(response.data);
      } catch (error) {
        console.error("Error fetching therapist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (therapistId) fetchTherapist();
  }, [therapistId]);

  // if plan is video-only bundle, lock type to "video"
  useEffect(() => {
    if (plan?.mode === "video") {
      setFormData((prev) => ({ ...prev, sessionType: "video" }));
    }
  }, [plan]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const getSessionPrice = () => {
    // Single session flexible mode
    if (plan?.mode === "flexible") {
      const prices = {
        chat: 250,
        audio: 350,
        video: 500,
      };
      return prices[formData.sessionType] || 250;
    }

    // Bundle plans (video only)
    if (plan?.mode === "video") {
      return plan.pricePerSession || 500;
    }

    return 250;
  };

  const handleBookSession = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setBooking(true);

    try {
      const sessionData = {
        therapist_id: therapistId,
        type: formData.sessionType,
        // No date/time here; therapist will assign manually
        notes: formData.notes,
        amount: getSessionPrice(),
        txn_id: paymentData.transactionId,
        plan_id: plan.id,
        plan_title: plan.title,
      };

      const response = await axios.post(
        "http://localhost:5000/api/sessions",
        sessionData
      );

      if (response.data.success) {
        alert(
          "Session booked successfully! Your payment is being verified by our admin team. Your therapist will share next session dates with you."
        );
        navigate("/client-dashboard");
      }
    } catch (error) {
      alert("Error booking session. Please try again.");
      console.error("Error booking session:", error);
    } finally {
      setBooking(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Please select a plan from the pricing page first.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Therapist not found
          </h2>
          <button
            onClick={() => navigate("/therapists")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Therapists
          </button>
        </div>
      </div>
    );
  }

  const isFlexible = plan.mode === "flexible";

  // Build session dots for UI feel
  const sessionDots = "●".repeat(plan.sessionsTotal || 1);

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Therapist Info + Plan Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {therapist.name.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {therapist.name}
                </h2>
                <p className="text-blue-600 font-medium">
                  {therapist.specialization}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600">{therapist.bio}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {therapist.languages?.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Plan Summary */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Your Plan on Solena
              </h3>
              <p className="text-sm text-gray-800 font-medium mb-1">
                {plan.title}
              </p>
              <p className="text-xs text-gray-600 mb-2">
                Session mode:{" "}
                {isFlexible ? "Chat / Audio / Video (you choose)" : "Video"}
              </p>
              <p className="text-xs text-gray-600 mb-2">
                Sessions in this plan: {plan.sessionsTotal || 1}
              </p>
              <p className="text-xs text-gray-600 mb-1">
                Session indicator:{" "}
                <span className="font-mono">{sessionDots}</span>
              </p>
              <p className="text-xs text-gray-600">
                Your therapist will schedule future session dates manually after
                each session.
              </p>
            </div>
          </div>

          {/* Booking / Payment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {!showPayment ? (
              <form onSubmit={handleBookSession}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Confirm Your Session
                </h2>

                {/* Session Type – only for single flexible plan */}
                {isFlexible && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Session Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="sessionType"
                          value="chat"
                          checked={formData.sessionType === "chat"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 border-2 rounded-lg text-center ${
                            formData.sessionType === "chat"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <MessageCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                          <div className="font-medium">Chat</div>
                          <div className="text-sm text-gray-500">₹250</div>
                        </div>
                      </label>

                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="sessionType"
                          value="audio"
                          checked={formData.sessionType === "audio"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 border-2 rounded-lg text-center ${
                            formData.sessionType === "audio"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <Phone className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="font-medium">Audio</div>
                          <div className="text-sm text-gray-500">₹350</div>
                        </div>
                      </label>

                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="sessionType"
                          value="video"
                          checked={formData.sessionType === "video"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 border-2 rounded-lg text-center ${
                            formData.sessionType === "video"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <Video className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="font-medium">Video</div>
                          <div className="text-sm text-gray-500">₹500</div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="mb-6">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific topics or concerns you'd like to discuss..."
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Amount for this session:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{getSessionPrice()}
                    </span>
                  </div>
                  {!isFlexible && (
                    <p className="text-xs text-gray-500 mt-1">
                      Part of your {plan.sessionsTotal}-session video plan on
                      Solena.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Proceed to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment
                </h2>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Session Summary
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Therapist:</span>
                      <span>{therapist.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span>{plan.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session Type:</span>
                      <span className="capitalize">{formData.sessionType}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Amount:</span>
                      <span>₹{getSessionPrice()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Pay via UPI
                  </h3>
                  <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
                    <div className="w-48 h-48 bg-white mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <span className="text-gray-500">UPI QR Code</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Scan this QR code with any UPI app to pay ₹
                      {getSessionPrice()}.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label
                      htmlFor="transactionId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      id="transactionId"
                      name="transactionId"
                      value={paymentData.transactionId}
                      onChange={handlePaymentChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter UPI transaction ID"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Amount Paid
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={paymentData.amount}
                      onChange={handlePaymentChange}
                      required
                      min={getSessionPrice()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter amount (minimum ₹${getSessionPrice()})`}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowPayment(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={booking}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {booking ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSession;
