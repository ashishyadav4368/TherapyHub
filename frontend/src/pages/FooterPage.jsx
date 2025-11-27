import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 overflow-hidden">
      {/* --- Background Ambient Effects --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Mission (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <Heart className="h-8 w-8 text-blue-500 fill-current" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                TherapyConnect
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed pr-4">
              Making mental health support accessible, professional, and
              confidential for everyone. Your journey to wellness starts here.
            </p>

            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((Item, index) => (
                <a
                  key={index}
                  href={Item.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
                >
                  <Item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Find Therapists", path: "/therapists" },
                { name: "Stories", path: "/stories" },
                { name: "Careers", path: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                "Individual Therapy",
                "Couples Counseling",
                "Crisis Support",
                "Insurance Guide",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact (Span 4) */}
          <div className="lg:col-span-4 bg-slate-900/50 rounded-3xl p-6 border border-slate-800 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-2">
              Stay Connected
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Join 25,000+ others receiving wellness tips and updates.
            </p>

            {/* Newsletter Input */}
            <form className="relative mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-4 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1.5 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Contact Info Small */}
            <div className="space-y-3 pt-6 border-t border-slate-800">
              <div className="flex items-start text-slate-400 text-sm">
                <Mail className="h-4 w-4 mt-0.5 mr-3 text-blue-500 shrink-0" />
                <span>support@therapyconnect.com</span>
              </div>
              <div className="flex items-start text-slate-400 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 mr-3 text-blue-500 shrink-0" />
                <span>123 Wellness Street, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Bottom --- */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © {currentYear} TherapyConnect. Made with{" "}
            <Heart className="inline w-3 h-3 text-red-500 mx-1 animate-pulse" />{" "}
            for better health.
          </div>

          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <Link to="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
