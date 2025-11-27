import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBookingPlan } from "../contexts/BookingPlanContext";

const TherapistRecommendation = () => {
  const { plan } = useBookingPlan();
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!plan) {
      navigate("/pricing");
      return;
    }

    const fetchTherapists = async () => {
      try {
        // You can filter here based on plan / category later
        const res = await axios.get("http://localhost:5000/api/therapists");
        setTherapists(res.data || []);
      } catch (err) {
        console.error("Error fetching therapists", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, [plan, navigate]);

  const handleChooseTherapist = (id) => {
    navigate(`/book-session/${id}`);
  };

  if (!plan) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (therapists.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>No therapists available right now. Please try again later.</p>
      </div>
    );
  }

  const [topMatch, ...others] = therapists;

  return (
    <section className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          We found therapists for your plan
        </h1>
        <p className="text-gray-300 mb-10 max-w-2xl">
          Based on your selected plan{" "}
          <span className="font-semibold text-purple-300">{plan.title}</span>,
          we recommend these professionals. Choose one to start your healing
          journey. Future session dates will be decided together during therapy.
        </p>

        {/* Top Match */}
        <div className="mb-10 p-6 rounded-2xl border border-purple-500 bg-white/5 shadow-lg">
          <p className="text-xs font-semibold text-purple-300 mb-2">
            TOP MATCH FOR YOU
          </p>
          <h2 className="text-2xl font-bold mb-1">{topMatch.name}</h2>
          <p className="text-sm text-gray-400 mb-2">
            {topMatch.specialization}
          </p>
          <p className="text-sm text-gray-300 mb-4 line-clamp-3">
            {topMatch.bio}
          </p>

          <button
            onClick={() => handleChooseTherapist(topMatch._id)}
            className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 font-semibold"
          >
            Choose {topMatch.name}
          </button>
        </div>

        {/* Other Matches */}
        {others.length > 0 && (
          <div>
            <p className="text-sm text-gray-400 mb-4">Other good matches</p>
            <div className="grid gap-6 md:grid-cols-2">
              {others.slice(0, 4).map((t) => (
                <div
                  key={t._id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5"
                >
                  <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {t.specialization}
                  </p>
                  <p className="text-xs text-gray-300 mb-4 line-clamp-3">
                    {t.bio}
                  </p>
                  <button
                    onClick={() => handleChooseTherapist(t._id)}
                    className="text-sm px-4 py-2 rounded-lg bg-gray-100 text-black font-semibold hover:bg-white"
                  >
                    Choose Therapist
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TherapistRecommendation;
