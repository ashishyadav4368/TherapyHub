import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/therapists", icon: UserCheck, label: "Therapists" },
    { path: "/sessions", icon: Calendar, label: "Sessions" },
    { path: "/payments", icon: CreditCard, label: "Payments" },
    { path: "/users", icon: Users, label: "Users" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },

    // ⭐ NEW MENU ITEM — ADD JOB
    { path: "/jobs", icon: ClipboardList, label: "Add Job" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 relative">
      <div className="flex items-center mb-8">
        <div className="bg-blue-600 p-2 rounded-lg mr-3">
          <Settings className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
