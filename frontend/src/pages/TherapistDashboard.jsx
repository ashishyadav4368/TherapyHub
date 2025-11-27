import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  MessageCircle,
  Phone,
  Video,
  CheckCircle,
} from "lucide-react";
import axios from "axios";

const TherapistDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/sessions/therapist-sessions"
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

  const filterSessions = (status) => {
    const now = new Date();
    const currentDateTime = now.getTime();

    return sessions.filter((session) => {
      // Create proper date object from session date and time
      const sessionDateTime = new Date(`${session.date}T${session.time}:00`);
      const sessionTimestamp = sessionDateTime.getTime();

      if (status === "upcoming") {
        return (
          sessionTimestamp >= currentDateTime &&
          session.status !== "cancelled" &&
          session.status !== "completed"
        );
      } else if (status === "past") {
        return (
          sessionTimestamp < currentDateTime ||
          session.status === "completed" ||
          session.status === "cancelled"
        );
      }
      return true;
    });
  };

  const joinSession = (session) => {
    const now = new Date();
    const sessionDateTime = new Date(`${session.date}T${session.time}:00`);
    const timeDiff = sessionDateTime.getTime() - now.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    // Allow joining 15 minutes before session time
    if (minutesDiff > 15) {
      alert(
        `Session starts in ${minutesDiff} minutes. You can join 15 minutes before the session time.`
      );
      return;
    }

    if (minutesDiff < -60) {
      alert(
        "This session has ended. Please mark it as completed if it was conducted."
      );
      return;
    }

    if (session.type === "chat") {
      // Open WhatsApp with client message
      const message = `Hi! I'm ready for our therapy session scheduled at ${session.time}. How are you feeling today?`;
      const whatsappUrl = `https://wa.me/${
        session.client_id?.phone || ""
      }?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // For audio/video sessions, open in new window (placeholder for WebRTC)
      const roomUrl = `/session-room/${session.room_id}?type=${session.type}`;
      window.open(roomUrl, "_blank", "width=1200,height=800");
      alert(
        `${
          session.type.charAt(0).toUpperCase() + session.type.slice(1)
        } session room opened in new window.`
      );
    }
  };

  const markCompleted = async (sessionId) => {
    if (
      !window.confirm(
        "Are you sure you want to mark this session as completed?"
      )
    ) {
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/sessions/${sessionId}`,
        {
          status: "completed",
        }
      );

      if (response.data.success) {
        alert("Session marked as completed successfully!");
        fetchSessions(); // Refresh the sessions
      }
    } catch (error) {
      console.error("Error updating session:", error);
      alert("Error updating session status. Please try again.");
    }
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
  const todaySessions = sessions.filter((session) => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    return session.date === todayStr && session.status !== "cancelled";
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Therapist Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your therapy sessions and connect with clients
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
                <p className="text-sm font-medium text-gray-600">
                  Today's Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {todaySessions.length}
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
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingSessions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pastSessions.length}
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
                      Your scheduled sessions will appear here.
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
                              {session.client_id?.name || "Unknown Client"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {session.client_id?.email}
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
                              <span className="text-sm text-gray-500 capitalize">
                                {session.type} session
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-gray-900">
                            ${session.amount || 50}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => joinSession(session)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                session.paid && session.status === "confirmed"
                                  ? "bg-blue-600 text-white hover:bg-blue-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                              disabled={
                                !session.paid || session.status !== "confirmed"
                              }
                              title={
                                !session.paid
                                  ? "Payment not verified"
                                  : session.status !== "confirmed"
                                  ? "Session not confirmed"
                                  : "Join session"
                              }
                            >
                              Join Session
                            </button>
                            <button
                              onClick={() => markCompleted(session._id)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                session.status === "confirmed"
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                              disabled={session.status !== "confirmed"}
                              title={
                                session.status !== "confirmed"
                                  ? "Session must be confirmed first"
                                  : "Mark as completed"
                              }
                            >
                              Mark Complete
                            </button>
                          </div>
                        </div>
                      </div>
                      {session.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <strong>Client Notes:</strong> {session.notes}
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
                              {session.client_id?.name || "Unknown Client"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {session.client_id?.email}
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
                              <span className="text-sm text-gray-500 capitalize">
                                {session.type} session
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
    </div>
  );
};

export default TherapistDashboard;
