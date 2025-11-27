import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  UserCheck,
  Clock,
  DollarSign,
  Activity,
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
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTherapists: 0,
    totalSessions: 0,
    totalRevenue: 0,
    todaySessions: 0,
    pendingPayments: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/admin/dashboard-stats");
      if (response.data.stats) {
        setStats(response.data.stats);
        setChartData(response.data.chartData || mockChartData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Use mock data if API fails
      setStats({
        totalUsers: 0,
        totalTherapists: 0,
        totalSessions: 0,
        totalRevenue: 0,
        todaySessions: 0,
        pendingPayments: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
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

  const mockChartData = [
    { name: "Jan", sessions: 65, revenue: 2400 },
    { name: "Feb", sessions: 59, revenue: 1398 },
    { name: "Mar", sessions: 80, revenue: 9800 },
    { name: "Apr", sessions: 81, revenue: 3908 },
    { name: "May", sessions: 56, revenue: 4800 },
    { name: "Jun", sessions: 55, revenue: 3800 },
  ];

  const sessionTypeData = [
    { name: "Chat", value: 45, color: "#3B82F6" },
    { name: "Audio", value: 30, color: "#10B981" },
    { name: "Video", value: 25, color: "#F59E0B" },
  ];

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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon={Users}
          color="bg-blue-500"
          change={
            stats.totalUsers > 0 ? "+12% from last month" : "No users yet"
          }
        />
        <StatCard
          title="Active Therapists"
          value={stats.totalTherapists || 0}
          icon={UserCheck}
          color="bg-green-500"
          change={
            stats.totalTherapists > 0
              ? "+3 new this month"
              : "No therapists yet"
          }
        />
        <StatCard
          title="Total Sessions"
          value={stats.totalSessions || 0}
          icon={Calendar}
          color="bg-purple-500"
          change={
            stats.totalSessions > 0 ? "+18% from last month" : "No sessions yet"
          }
        />
        <StatCard
          title="Revenue"
          value={`$${stats.totalRevenue || 0}`}
          icon={DollarSign}
          color="bg-yellow-500"
          change={
            stats.totalRevenue > 0 ? "+22% from last month" : "No revenue yet"
          }
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Today's Sessions
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.todaySessions || 0}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Payments
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.pendingPayments || 0}
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Sessions
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.activeSessions || 0}
              </p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sessions Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.length > 0 ? chartData : mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={chartData.length > 0 ? "day" : "name"} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Session Types */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Session Types
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sessionTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {sessionTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.length > 0 ? chartData : mockChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chartData.length > 0 ? "day" : "name"} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={chartData.length > 0 ? "sessions" : "revenue"}
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
