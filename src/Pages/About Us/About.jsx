import React from "react";
import MainContent from "./Components/main";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import HowItWorks from "../HomePage/Components/HowItWorks";

const About = () => (
  <>
    <Navbar />
    <main>
      <MainContent />
      <HowItWorks />
    </main>
    <Footer />
  </>
);

export default About;
