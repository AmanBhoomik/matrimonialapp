import React from "react";
import Contact from "./Contact";
import Dashboard from "./Dashboard";
import Mynavbar from "./Mynavbar";
import Reviews from "./Reviews";

function Home() {
  
  return (
    <div style={{ backgroundColor: "lightblue",height:"400vh" }}>
      <Mynavbar />
      <Dashboard />
    
      <Reviews />

      <Contact />
    </div>
  );
}

export default Home;
