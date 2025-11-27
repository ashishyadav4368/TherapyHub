import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Therapists from "./pages/Therapists";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookSession from "./pages/BookSession";
import ProtectedRoute from "./components/ProtectedRoute";
import DepressionCounseling from "./pages/counselings/DepressionCounseling";
import AngerCounseling from "./pages/counselings/AngerCounseling";
import AnxietyCounseling from "./pages/counselings/AnxietyCounseling";
import GriefCounseling from "./pages/counselings/GriefCounseling";
import StressCounseling from "./pages/counselings/StressCounseling";
import PTSDCounseling from "./pages/counselings/PTSDCounseling";
import Careers from "./pages/Careers";
import JobDetails from "./pages/JobDetails";
import ApplyJobs from "./pages/ApplyJobs";
import HelpQuiz from "./pages/HelpQuiz";
import QuizResult from "./pages/QuizResult";
import QuizPage from "./pages/QuizPage";
import Pricing from "./pages/Pricing";
import TherapistRecommendation from "./pages/TherapistRecommendation";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/depression-counseling"
              element={<DepressionCounseling />}
            />
            <Route path="/anxiety-counseling" element={<AnxietyCounseling />} />
            <Route path="/anger-counseling" element={<AngerCounseling />} />
            <Route path="/grief-counseling" element={<GriefCounseling />} />
            <Route path="/stress-counseling" element={<StressCounseling />} />
            <Route path="/ptsd-counseling" element={<PTSDCounseling />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/job/:slug" element={<JobDetails />} />
            <Route path="/careers/job/:slug/apply" element={<ApplyJobs />} />
            <Route path="/help/quiz" element={<HelpQuiz />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz/result" element={<QuizResult />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/recommend-therapist"
              element={<TherapistRecommendation />}
            />

            <Route
              path="/book-session/:therapistId"
              element={
                <ProtectedRoute role="client">
                  <BookSession />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client-dashboard"
              element={
                <ProtectedRoute role="client">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/therapist-dashboard"
              element={
                <ProtectedRoute role="therapist">
                  <TherapistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
