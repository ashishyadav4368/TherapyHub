// src/components/ArticleCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group block bg-[#18181B] hover:bg-[#1F1F23] transition-all duration-300 p-6 rounded-2xl shadow-lg border border-zinc-800 hover:shadow-2xl hover:-translate-y-1"
    >
      <img
        src={article.image}
        alt={article.title}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />

      <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
        {article.title}
      </h3>

      <p className="text-sm text-gray-400 mt-2">{article.author}</p>
      <p className="text-xs text-gray-500 mt-1">{article.readTime}</p>
    </Link>
  );
};

export default ArticleCard;
