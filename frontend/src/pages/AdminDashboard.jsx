import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  UserCheck,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSessions: 0,
    paidSessions: 0,
    unpaidSessions: 0,
    activeTherapists: 0,
    todaySessions: 0,
    weeklySessions: 0,
    monthlySessions: 0,
  });
  const [therapists, setTherapists] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState(null);
  const [therapistForm, setTherapistForm] = useState({
    name: "",
    specialization: "",
    whatsapp: "",
    languages: "",
    bio: "",
    status: "active",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, therapistsRes, sessionsRes, paymentsRes] =
        await Promise.all([
          axios.get("http://localhost:5000/api/admin/stats"),
          axios.get("http://localhost:5000/api/admin/therapists"),
          axios.get("http://localhost:5000/api/admin/sessions"),
          axios.get("http://localhost:5000/api/admin/payments"),
        ]);

      setStats(statsRes.data);
      setTherapists(therapistsRes.data);
      setSessions(sessionsRes.data);
      setPayments(paymentsRes.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTherapistSubmit = async (e) => {
    e.preventDefault();
    try {
      const therapistData = {
        ...therapistForm,
        languages: therapistForm.languages
          .split(",")
          .map((lang) => lang.trim()),
      };

      if (editingTherapist) {
        await axios.put(
          `http://localhost:5000/api/admin/therapists/${editingTherapist._id}`,
          therapistData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/therapists",
          therapistData
        );
      }

      setShowTherapistModal(false);
      setEditingTherapist(null);
      setTherapistForm({
        name: "",
        specialization: "",
        whatsapp: "",
        languages: "",
        bio: "",
        status: "active",
      });
      fetchData();
    } catch (error) {
      console.error("Error saving therapist:", error);
      alert("Error saving therapist");
    }
  };

  const handleEditTherapist = (therapist) => {
    setEditingTherapist(therapist);
    setTherapistForm({
      name: therapist.name,
      specialization: therapist.specialization,
      whatsapp: therapist.whatsapp,
      languages: therapist.languages.join(", "),
      bio: therapist.bio,
      status: therapist.status,
    });
    setShowTherapistModal(true);
  };

  const handleDeleteTherapist = async (therapistId) => {
    if (window.confirm("Are you sure you want to delete this therapist?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/therapists/${therapistId}`
        );
        fetchData();
      } catch (error) {
        console.error("Error deleting therapist:", error);
        alert("Error deleting therapist");
      }
    }
  };

  const verifyPayment = async (paymentId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/payments/${paymentId}`,
        {
          verified: true,
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Error verifying payment");
    }
  };

  const getSessionChartData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      const sessionsCount = sessions.filter(
        (session) => session.date === dateStr
      ).length;

      last7Days.push({
        day: dayName,
        sessions: sessionsCount,
      });
    }
    return last7Days;
  };

  const getPaymentChartData = () => {
    return [
      { name: "Paid", value: stats.paidSessions, color: "#10B981" },
      { name: "Unpaid", value: stats.unpaidSessions, color: "#EF4444" },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage therapists, sessions, and payments
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
                  {stats.totalSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Paid Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.paidSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Unpaid Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.unpaidSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Therapists
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeTherapists}
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
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("therapists")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "therapists"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Therapists
              </button>
              <button
                onClick={() => setActiveTab("sessions")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "sessions"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Sessions
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "payments"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Payments
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Sessions This Week
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getSessionChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sessions" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getPaymentChartData()}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {getPaymentChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Today's Sessions
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.todaySessions}
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      This Week
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.weeklySessions}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">
                      This Month
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">
                      {stats.monthlySessions}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "therapists" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Therapist Management
                  </h2>
                  <button
                    onClick={() => setShowTherapistModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Therapist</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Specialization
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Languages
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {therapists.map((therapist) => (
                        <tr key={therapist._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {therapist.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {therapist.specialization}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {therapist.languages.join(", ")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                therapist.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {therapist.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditTherapist(therapist)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteTherapist(therapist._id)
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "sessions" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Session Management
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Therapist
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sessions.map((session) => (
                        <tr key={session._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {session.client_id?.name || "Unknown"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {session.therapist_id?.name || "Unknown"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(session.date).toLocaleDateString()} at{" "}
                              {session.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 capitalize">
                              {session.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                session.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : session.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : session.status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {session.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${session.amount || 50}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Payment Management
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {payment.client_id?.name || "Unknown"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {payment.txn_id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${payment.amount}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                payment.verified
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {payment.verified ? "Verified" : "Pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(
                                payment.created_at
                              ).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {!payment.verified && (
                              <button
                                onClick={() => verifyPayment(payment._id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Verify
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Therapist Modal */}
        {showTherapistModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingTherapist ? "Edit Therapist" : "Add New Therapist"}
                </h3>
                <form onSubmit={handleTherapistSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={therapistForm.name}
                      onChange={(e) =>
                        setTherapistForm({
                          ...therapistForm,
                          name: e.target.value,
                        })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={therapistForm.specialization}
                      onChange={(e) =>
                        setTherapistForm({
                          ...therapistForm,
                          specialization: e.target.value,
                        })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={therapistForm.whatsapp}
                      onChange={(e) =>
                        setTherapistForm({
                          ...therapistForm,
                          whatsapp: e.target.value,
                        })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Languages (comma separated)
                    </label>
                    <input
                      type="text"
                      value={therapistForm.languages}
                      onChange={(e) =>
                        setTherapistForm({
                          ...therapistForm,
                          languages: e.target.value,
                        })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={therapistForm.bio}
                      onChange={(e) =>
                        setTherapistForm({
                          ...therapistForm,
                          bio: e.target.value,
                        })
                      }
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={therapistForm.status}
                      onChange={(e) =>
                        setTherapistForm({
                          ...therapistForm,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {editingTherapist ? "Update" : "Create"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowTherapistModal(false);
                        setEditingTherapist(null);
                        setTherapistForm({
                          name: "",
                          specialization: "",
                          whatsapp: "",
                          languages: "",
                          bio: "",
                          status: "active",
                        });
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
