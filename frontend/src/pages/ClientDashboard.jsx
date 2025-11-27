import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  MessageCircle,
  Phone,
  Video,
} from "lucide-react";
import axios from "axios";
import RatingModal from "../components/RatingModal";

const ClientDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/sessions/my-sessions"
      );
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSessionIcon = (type) => {
    switch (type) {
      case "chat":
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      case "audio":
        return <Phone className="h-5 w-5 text-blue-600" />;
      case "video":
        return <Video className="h-5 w-5 text-purple-600" />;
      default:
        return <MessageCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (paid) => {
    return paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getPaymentStatusText = (session) => {
    if (session.payment_status === "verified" && session.paid) {
      return "Paid & Verified";
    } else if (session.payment_status === "submitted") {
      return "Payment Submitted";
    } else if (session.payment_status === "rejected") {
      return "Payment Rejected";
    } else if (session.paid) {
      return "Paid";
    } else {
      return "Unpaid";
    }
  };

  const filterSessions = (status) => {
    const now = new Date();
    return sessions.filter((session) => {
      const sessionDate = new Date(`${session.date}T${session.time}`);

      if (status === "upcoming") {
        return sessionDate >= now && session.status !== "cancelled";
      } else if (status === "past") {
        return sessionDate < now || session.status === "completed";
      }
      return true;
    });
  };

  const joinSession = (session) => {
    if (session.type === "chat") {
      window.open(
        `https://wa.me/${session.therapist_id.whatsapp}?text=Hi, I'm here for my scheduled therapy session.`,
        "_blank"
      );
    } else {
      // For audio/video sessions, you would typically redirect to a WebRTC room
      alert(`Joining ${session.type} session with room ID: ${session.room_id}`);
    }
  };

  const handleRateSession = (session) => {
    setSelectedSession(session);
    setShowRatingModal(true);
  };

  const handleRatingSubmitted = () => {
    fetchSessions(); // Refresh sessions to update any changes
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const upcomingSessions = filterSessions("upcoming");
  const pastSessions = filterSessions("past");

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your therapy sessions and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingSessions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pastSessions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Payment
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter((s) => !s.paid).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "upcoming"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Upcoming Sessions ({upcomingSessions.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "past"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Past Sessions ({pastSessions.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "upcoming" && (
              <div className="space-y-4">
                {upcomingSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No upcoming sessions
                    </h3>
                    <p className="text-gray-600">
                      Book a session with one of our therapists to get started.
                    </p>
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <div
                      key={session._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getSessionIcon(session.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {session.therapist_id?.name ||
                                "Unknown Therapist"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {session.therapist_id?.specialization}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">
                                {new Date(session.date).toLocaleDateString()} at{" "}
                                {session.time}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  session.status
                                )}`}
                              >
                                {session.status}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                                  session.paid
                                )}`}
                              >
                                {getPaymentStatusText(session)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-gray-900">
                            ${session.amount || 50}
                          </span>
                          {session.status === "confirmed" && session.paid && (
                            <button
                              onClick={() => joinSession(session)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Join Session
                            </button>
                          )}
                          {session.payment_status === "rejected" && (
                            <button
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                              onClick={() =>
                                alert(
                                  "Payment was rejected. Please contact support or book a new session."
                                )
                              }
                            >
                              Payment Rejected
                            </button>
                          )}
                          {session.payment_status === "submitted" && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm">
                              Awaiting Verification
                            </span>
                          )}
                        </div>
                      </div>
                      {session.status === "completed" && (
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => handleRateSession(session)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                          >
                            Rate Session
                          </button>
                        </div>
                      )}
                      {session.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <strong>Notes:</strong> {session.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "past" && (
              <div className="space-y-4">
                {pastSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No past sessions
                    </h3>
                    <p className="text-gray-600">
                      Your completed sessions will appear here.
                    </p>
                  </div>
                ) : (
                  pastSessions.map((session) => (
                    <div
                      key={session._id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getSessionIcon(session.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {session.therapist_id?.name ||
                                "Unknown Therapist"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {session.therapist_id?.specialization}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">
                                {new Date(session.date).toLocaleDateString()} at{" "}
                                {session.time}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  session.status
                                )}`}
                              >
                                {session.status}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                                  session.paid
                                )}`}
                              >
                                {session.paid ? "Paid" : "Unpaid"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${session.amount || 50}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        session={selectedSession}
        onRatingSubmitted={handleRatingSubmitted}
      />
    </div>
  );
};

export default ClientDashboard;
