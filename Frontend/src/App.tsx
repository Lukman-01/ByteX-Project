// import { useState } from 'react'
import "./App.css";
import LandingPage from "./components/LandingPage";
import BigIdea from "./landing/components/BigIdea";
import Navbar from "./landing/components/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <BigIdea/>
        
        {/* <LandingPage /> */}
      </div>
    </>
  );
}

export default App;

