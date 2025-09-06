import React from "react";
import Hero from "./sections/Hero";
import Services from "./sections/Services.jsx";
import Contact from "./sections/Contact.jsx";
import ShareButton from "./components/ShareButton.jsx";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <Hero />
      <Services />
      <Contact />
      <ShareButton />
    </div>
  );
}
