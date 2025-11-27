import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Star, CheckCircle2, Quote, ArrowRight, Sparkles } from "lucide-react";

const TherapistSection = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTherapists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/therapists");
      setTherapists(response.data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching therapists:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  // Safety check for data before spreading
  const safeTherapists = therapists || [];
  const scrollData = [...safeTherapists, ...safeTherapists, ...safeTherapists];

  return (
    <section className="relative py-32 bg-slate-50 overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* --- AMBIENT BACKGROUND SYSTEM --- */}

      {/* 1. Grain Texture Overlay (Adds tactile feel) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* 2. Glowing Mesh Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-[100px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-200/40 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-200/40 blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6 transform hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4 text-blue-600 fill-current" />
            <span className="text-xs font-bold tracking-wide text-blue-900 uppercase">
              World Class Care
            </span>
          </div>

          {/* Heading with Gradient */}
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
            Meet Our <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Expert Therapists
            </span>
          </h2>

          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Verified professionals dedicated to your mental wellbeing.{" "}
            <br className="hidden md:block" />
            Find the perfect match for your journey today.
          </p>
        </div>
      </div>

      {/* --- CAROUSEL WRAPPER --- */}
      <div className="relative w-full group z-10">
        {/* Cinematic Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none"></div>

        <div className="flex animate-scroll hover:[animation-play-state:paused] py-10">
          {" "}
          {/* Added py-10 to allow space for hover shadows */}
          <div className="flex space-x-10 px-4">
            {/* LOADING STATE */}
            {loading &&
              [...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-[400px] h-[450px] bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-8 animate-pulse">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl"></div>
                    <div className="w-16 h-8 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="space-y-4 animate-pulse">
                    <div className="w-3/4 h-8 bg-slate-100 rounded-lg"></div>
                    <div className="w-1/3 h-6 bg-slate-100 rounded-lg"></div>
                    <div className="w-full h-24 bg-slate-50 rounded-xl mt-6"></div>
                    <div className="w-full h-14 bg-slate-100 rounded-xl mt-auto"></div>
                  </div>
                </div>
              ))}

            {/* DATA RENDERING */}
            {!loading &&
              scrollData.map((therapist, index) => {
                const imageUrl = therapist.photo
                  ? `http://localhost:5000/${therapist.photo.replace(
                      /^\//,
                      ""
                    )}`
                  : null;

                const rating = therapist.rating || 4.9;

                return (
                  <div
                    key={`${therapist._id}-${index}`}
                    className="group/card relative flex-shrink-0 w-[400px] bg-white rounded-[2rem] p-8 flex flex-col transition-all duration-500 ease-out
                               border border-slate-100 hover:border-blue-100/50
                               shadow-[0_2px_20px_rgb(0,0,0,0.04)] 
                               hover:shadow-[0_20px_40px_-12px_rgba(59,130,246,0.15)]
                               hover:-translate-y-2"
                  >
                    {/* Card Top: Avatar & Rating */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="relative">
                        <div className="relative overflow-hidden w-20 h-20 rounded-2xl ring-4 ring-slate-50 group-hover/card:ring-blue-50 transition-all duration-500">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={therapist.name}
                              className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                              <span className="text-2xl font-bold text-slate-400">
                                {therapist.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm ring-1 ring-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-current" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm group-hover/card:border-amber-100 group-hover/card:bg-amber-50/50 transition-colors">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-slate-700 font-bold text-sm group-hover/card:text-amber-700">
                          {rating}
                        </span>
                      </div>
                    </div>

                    {/* Card Middle: Info */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover/card:text-blue-600 transition-colors duration-300">
                        {therapist.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-100 group-hover/card:border-blue-100 group-hover/card:bg-blue-50/50 group-hover/card:text-blue-700 transition-all">
                          {therapist.specialization}
                        </span>
                      </div>
                    </div>

                    {/* Card Body: Bio (Glass container inside) */}
                    <div className="relative mb-8 flex-grow">
                      {/* Decorative Quote Icon */}
                      <Quote className="absolute -top-3 -left-2 w-8 h-8 text-slate-100 transform scale-x-[-1] z-0" />
                      <div className="relative z-10">
                        <p className="text-slate-500 leading-relaxed line-clamp-3 text-[15px]">
                          {therapist.bio}
                        </p>
                      </div>
                    </div>

                    {/* Card Bottom: Action Button */}
                    <div className="mt-auto">
                      <Link
                        to={`/book-session/${therapist._id}`}
                        className="relative overflow-hidden flex items-center justify-center w-full py-4 rounded-xl bg-slate-900 text-white font-semibold group/btn shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 mr-2 group-hover/btn:mr-3 transition-all duration-300">
                          Book Session
                        </span>
                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapistSection;
