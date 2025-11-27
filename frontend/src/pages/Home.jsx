import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Bot,
  X,
  Calendar,
} from "lucide-react";
import axios from "axios";
import image1 from "../images/pic1.jpg";
import image2 from "../images/pic2.jpg";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import CallToActionSection from "./CallToActionSection";
import TherapistSection from "./TherapistSection";
import FooterPage from "./FooterPage";
import ServicesSection from "./ServicesSection";

const Home = () => {
  const [therapists, setTherapists] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message:
        "Hello! I'm here to help you with any questions about our therapy services. How can I assist you today?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const mentalHealthQuotes = [
    {
      quote:
        "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
      author: "Noam Shpancer",
    },
    {
      quote:
        "You are not your illness. You have an individual story to tell. You have a name, a history, a personality.",
      author: "Julian Seifter",
    },
    {
      quote: "Healing takes time, and asking for help is a courageous step.",
      author: "Mariska Hargitay",
    },
    {
      quote:
        "Mental health needs a great deal of attention. It's the final taboo and it needs to be faced and dealt with.",
      author: "Adam Ant",
    },
    {
      quote:
        "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Anonymous",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Professional",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      review:
        "TherapyConnect changed my life. The convenience of online sessions and the quality of therapists is exceptional.",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      review:
        "Finding the right therapist was so easy. The platform is user-friendly and the support is amazing.",
    },
    {
      name: "Emily Davis",
      role: "Teacher",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      review:
        "Professional, caring, and accessible. I couldn't ask for a better mental health support system.",
    },
  ];

  const botResponses = {
    hello: "Hello! Welcome to TherapyConnect. How can I help you today?",
    hi: "Hi there! I'm here to answer any questions about our therapy services.",
    help: "I can help you with information about our therapists, booking sessions, pricing, and more. What would you like to know?",
    therapist:
      "We have licensed therapists specializing in anxiety, depression, relationships, addiction recovery, and more. You can browse our therapist directory to find the perfect match.",
    price:
      "Our session prices vary: Chat sessions start at $50, Audio sessions at $75, and Video sessions at $100. All sessions are 50 minutes long.",
    booking:
      "Booking is easy! Browse our therapists, select your preferred therapist, choose a session type, pick a date and time, and complete the payment.",
    payment:
      "We accept UPI payments. After booking, you'll receive a QR code for payment. Our admin team verifies payments quickly.",
    emergency:
      "If you're in crisis, please contact emergency services immediately at 911 or your local emergency number. Our platform is for non-emergency support.",
    default:
      "I understand you're looking for information. You can ask me about our therapists, booking process, pricing, or any other questions about our services.",
  };

  const features = [
    {
      title: "Interactive",
      desc: "LIVE, personal, one on one video calls with wellness coaches.",
    },
    {
      title: "Personalized",
      desc: "Customized 1-on-1 guidance for YOU from licensed therapists and certified wellness professionals.",
    },
    {
      title: "Comprehensive",
      desc: "Covers all areas of your wellbeing, physical, mental, emotional, and more.",
    },
    {
      title: "Curated Wellness Content",
      desc: "Enjoy podcasts, articles, and videos from our coaches & team—all within one online therapy app.",
    },
    {
      title: "Unlimited",
      desc: "Employees engage an unlimited number of coaches, sessions and time to address their needs.",
    },
    {
      title: "Confidential",
      desc: "Privacy is ensured, and providers do not have access to your phone number or payment info.",
    },
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message
    setChatMessages((prev) => [
      ...prev,
      { type: "user", message: userMessage },
    ]);

    // Generate bot response
    const lowerMessage = userMessage.toLowerCase();
    let response = botResponses.default;

    for (const [key, value] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    // Add bot response after a delay
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { type: "bot", message: response }]);
    }, 1000);

    setUserMessage("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Mental Health Quotes Carousel */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative h-32 flex items-center justify-center">
              {mentalHealthQuotes.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                    index === currentQuote
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-4"
                  }`}
                >
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-800 text-center mb-4">
                    "{item.quote}"
                  </blockquote>
                  <cite className="text-blue-600 font-semibold">
                    — {item.author}
                  </cite>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {mentalHealthQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuote ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TherapyConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make mental health support accessible, affordable, and
              effective for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Professional Care",
                description:
                  "Licensed and experienced therapists ready to help you on your journey.",
                color: "bg-red-100 text-red-600",
                hoverColor: "hover:bg-red-200",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "Your privacy is our priority. All sessions are completely confidential.",
                color: "bg-green-100 text-green-600",
                hoverColor: "hover:bg-green-200",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description:
                  "Book sessions that fit your schedule. Available 7 days a week.",
                color: "bg-purple-100 text-purple-600",
                hoverColor: "hover:bg-purple-200",
              },
              {
                icon: Users,
                title: "Multiple Formats",
                description:
                  "Choose from chat, audio, or video sessions based on your comfort level.",
                color: "bg-orange-100 text-orange-600",
                hoverColor: "hover:bg-orange-200",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color} ${feature.hoverColor} transition-colors duration-300`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Moving Therapists Section */}
      <TherapistSection />

      {/* Statistics Section */}
      <section className="py-20  text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">
              Making a difference in mental health care, one session at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100+", label: "Sessions Completed" },
              { number: "10+", label: "Licensed Therapists" },
              { number: "5+", label: "Languages Supported" },
              { number: "97%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people who found help through TherapyConnect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting started with therapy is simple and straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse Therapists",
                description:
                  "Explore our directory of licensed therapists and find one that matches your needs and preferences.",
                icon: Users,
              },
              {
                step: "2",
                title: "Book a Session",
                description:
                  "Choose your preferred session type (chat, audio, or video) and schedule at your convenience.",
                icon: Calendar,
              },
              {
                step: "3",
                title: "Start Your Journey",
                description:
                  "Connect with your therapist and begin your path to better mental health and wellness.",
                icon: Heart,
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-700 transition-colors duration-300">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToActionSection />

      <section className="w-[90%] mx-auto py-16">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          The Best Online Therapy Platform for Personalized, 24×7 Mental
          Wellness Support
        </h2>

        {/* Blue divider */}
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white border border-blue-100 rounded-xl p-6 
              shadow-sm hover:shadow-lg transition-all duration-300
              hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT PHONE MOCKUP IMAGES */}
          <div className="flex justify-center items-center relative">
            <img
              src={image1}
              alt="phone mockup 1"
              className="w-52 sm:w-64 lg:w-72 drop-shadow-2xl rotate-[-8deg] 
            animate-[float1_6s_ease-in-out_infinite]"
            />

            <img
              src={image2}
              alt="phone mockup 2"
              className="w-52 sm:w-64 lg:w-72 drop-shadow-2xl rotate-[8deg] -ml-10 
            animate-[float2_6s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* Bottom small text */}
        <p className="text-gray-600 text-center text-sm mt-10 leading-relaxed">
          Take care of your mental health the smart way—with the best online
          therapy app. Chat with real experts, get personalized support 24×7,
          and explore tons of cool wellness content—all in one place. It’s
          private, easy to use, and totally on your terms.
        </p>
      </section>

      <FAQSection />

      {/* Footer */}
      <FooterPage />

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/1234567890?text=Hi! I'm interested in learning more about your therapy services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* AI Chatbot */}
      <div className="fixed bottom-6 left-6 z-50">
        {!showChatbot ? (
          <button
            onClick={() => setShowChatbot(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
          >
            <Bot className="h-6 w-6" />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-semibold">TherapyBot</span>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out 0.3s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
