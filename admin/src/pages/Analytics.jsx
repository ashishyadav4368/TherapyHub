import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`/admin/analytics?range=${timeRange}`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const mockData = {
    sessionTrends: [
      { date: "2024-01-01", sessions: 12, revenue: 2400 },
      { date: "2024-01-02", sessions: 19, revenue: 1398 },
      { date: "2024-01-03", sessions: 15, revenue: 9800 },
      { date: "2024-01-04", sessions: 25, revenue: 3908 },
      { date: "2024-01-05", sessions: 22, revenue: 4800 },
      { date: "2024-01-06", sessions: 18, revenue: 3800 },
      { date: "2024-01-07", sessions: 28, revenue: 4300 },
    ],
    therapistPerformance: [
      { name: "Dr. Sarah Johnson", sessions: 45, rating: 4.8, revenue: 9000 },
      { name: "Dr. Michael Chen", sessions: 38, rating: 4.7, revenue: 7600 },
      { name: "Dr. Emily Davis", sessions: 42, rating: 4.9, revenue: 8400 },
      { name: "Dr. James Wilson", sessions: 35, rating: 4.6, revenue: 7000 },
      { name: "Dr. Lisa Brown", sessions: 40, rating: 4.8, revenue: 8000 },
    ],
    sessionTypes: [
      { name: "Video", value: 45, color: "#3B82F6" },
      { name: "Audio", value: 30, color: "#10B981" },
      { name: "Chat", value: 25, color: "#F59E0B" },
    ],
    userGrowth: [
      { month: "Jan", clients: 120, therapists: 15 },
      { month: "Feb", clients: 145, therapists: 18 },
      { month: "Mar", clients: 168, therapists: 20 },
      { month: "Apr", clients: 195, therapists: 22 },
      { month: "May", clients: 220, therapists: 24 },
      { month: "Jun", clients: 248, therapists: 26 },
    ],
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );

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
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics & Reports
        </h1>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${
            analyticsData.metrics?.totalRevenue?.toLocaleString() || "0"
          }`}
          change="+15.3% from last month"
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Active Users"
          value={analyticsData.metrics?.activeUsers?.toLocaleString() || "0"}
          change="+8.2% from last month"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Sessions Completed"
          value={analyticsData.metrics?.totalSessions?.toLocaleString() || "0"}
          change="+12.5% from last month"
          icon={Calendar}
          color="bg-purple-500"
        />
        <StatCard
          title="Avg. Session Rating"
          value={analyticsData.metrics?.avgRating?.toFixed(1) || "0.0"}
          change="+0.2 from last month"
          icon={BarChart3}
          color="bg-yellow-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Session Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={analyticsData.sessionTrends || mockData.sessionTrends}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Session Types Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Session Types
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={
                  analyticsData.sessionTypes?.length > 0
                    ? analyticsData.sessionTypes
                    : mockData.sessionTypes
                }
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {(analyticsData.sessionTypes?.length > 0
                  ? analyticsData.sessionTypes
                  : mockData.sessionTypes
                ).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={analyticsData.sessionTrends || mockData.sessionTrends}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          User Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.userGrowth || mockData.userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clients" fill="#3B82F6" name="Clients" />
            <Bar dataKey="therapists" fill="#10B981" name="Therapists" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Therapist Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Therapists
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Therapist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(
                analyticsData.therapistPerformance ||
                mockData.therapistPerformance
              ).map((therapist, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {therapist.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {therapist.sessions}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ⭐ {therapist.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${therapist.revenue?.toLocaleString() || 0}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
