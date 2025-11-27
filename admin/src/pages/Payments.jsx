import React, { useState, useEffect } from "react";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  DollarSign,
} from "lucide-react";
import axios from "axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("/admin/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async (paymentId, verified) => {
    try {
      await axios.patch(`/admin/payments/${paymentId}/verify`, { verified });
      fetchPayments();
      alert(
        verified
          ? "Payment verified successfully!"
          : "Payment rejected successfully!"
      );
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Error updating payment status");
    }
  };

  const getStatusColor = (verified) => {
    if (verified === true) return "bg-green-100 text-green-800";
    if (verified === false) return "bg-red-100 text-red-800";
    if (verified === null) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (verified) => {
    if (verified === true) return <CheckCircle className="h-4 w-4" />;
    if (verified === false) return <XCircle className="h-4 w-4" />;
    if (verified === null) return <Clock className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const getStatusText = (verified) => {
    if (verified === true) return "Verified";
    if (verified === false) return "Rejected";
    if (verified === null) return "Pending Verification";
    return "Unknown";
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.txn_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.client_id?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "verified" && payment.verified === true) ||
      (filterStatus === "rejected" && payment.verified === false) ||
      (filterStatus === "pending" && payment.verified === null);
    return matchesSearch && matchesFilter;
  });

  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const verifiedAmount = payments
    .filter((p) => p.verified === true)
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.verified === null)
    .reduce((sum, payment) => sum + payment.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Payments
          </button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{totalAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{verifiedAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{pendingAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Total Transactions
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {payments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by transaction ID or client name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payment.txn_id || "No TXN ID"}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {payment._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.client_id?.name || "Unknown Client"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.client_id?.email || "No email"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {payment.session_id
                        ? `Session ${
                            payment.session_id._id
                              ? payment.session_id._id.slice(-6)
                              : payment.session_id.toString().slice(-6)
                          }`
                        : "No session"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{payment.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(payment.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(payment.verified)}
                      <span
                        className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          payment.verified
                        )}`}
                      >
                        {getStatusText(payment.verified)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.verified === null && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleVerifyPayment(payment._id, true)}
                          className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                          title="Verify Payment"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">Verify</span>
                        </button>
                        <button
                          onClick={() =>
                            handleVerifyPayment(payment._id, false)
                          }
                          className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                          title="Reject Payment"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="text-xs">Reject</span>
                        </button>
                      </div>
                    )}
                    {payment.verified !== null && (
                      <span className="text-gray-500 text-sm">
                        {payment.verified ? "Verified" : "Rejected"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No payments found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No payments match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Payments;
