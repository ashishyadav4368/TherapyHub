import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BookingPlanProvider } from "./contexts/BookingPlanContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookingPlanProvider>
      <App />
    </BookingPlanProvider>
  </StrictMode>
);

// main.jsx (or wherever you render <App />)
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BookingPlanProvider } from "./contexts/BookingPlanContext.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BookingPlanProvider>
//       <App />
//     </BookingPlanProvider>
//   </React.StrictMode>
// );
