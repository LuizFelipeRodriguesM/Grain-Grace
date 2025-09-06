import React from "react";
import Background from "./sections/hero/Background/Background";
import Hero from "./sections/Hero";
import Services from "./sections/Services.jsx";
import Features from "./sections/Features.jsx";
import Contact from "./sections/Contact.jsx";
import ShareButton from "./components/ShareButton.jsx";
import AboutUs from "./sections/AboutUs.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <Background />
      <Hero />
      <AboutUs />
      <Services />
      <Features />
      <Contact />
      <Footer />
      <ShareButton />
    </div>
  );
}
