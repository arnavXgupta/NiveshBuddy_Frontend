import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
import Features from "./Components/Features";
import ClosingCta from "./Components/ClosingCta";

const HomePage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <ClosingCta />
    </main>
    <Footer />
  </>
);

export default HomePage;
