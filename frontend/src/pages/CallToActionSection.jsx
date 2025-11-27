import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import ctaVideo from "../images/crying.mp4";
import ctaVideo2 from "../images/laughing.mp4";

const CallToActionSection = () => {
  return (
    <section className="py-24 bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-6">
        {/* ROW: Video 1 | Video 2 | Text */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Video 1 */}
          <div className="w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10">
            <video
              src={ctaVideo}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* TEXT SECTION */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Ready to Begin Your Journey?
            </h2>

            <p className="text-lg md:text-xl max-w-xl text-gray-300 mb-8 leading-relaxed">
              Take your first step towards healing and growth. Explore certified
              therapists and book your first session whenever you’re ready.
            </p>

            <Link
              to="/therapists"
              className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-xl text-lg transition-all duration-300 hover:bg-gray-200 hover:scale-[1.03]"
            >
              Browse Therapists
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
          {/* Video 2 */}
          <div className="w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10">
            <video
              src={ctaVideo2}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
