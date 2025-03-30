import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddToCart from "./page/AddToCart";
import Payment from "./page/Payment";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"; // Import Footer

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navigation /> {/* Navbar */}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<AddToCart />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        
        <Footer /> {/* Footer added here */}
      </div>
    </Router>
  );
}

export default App;
