import React from "react";
import Navbar from "./Components/NavBar";
import HeroSection from "./Components/HeroSection";
import SearchForm from "./Components/SearchForm";
import HowItWorks from "./Components/HowItWorks";
import Footer from "./Components/Footer";

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SearchForm />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default App;
