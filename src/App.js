import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Tower from "./pages/Tower";
import Floor from "./pages/Floor";
import Flats from "./pages/Flats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tower/:id" element={<Tower />} />
        <Route path="/tower/:towerId/floor/:floorId" element={<Floor />} />
        <Route path="/tower/:towerId/floor/:floorId/unit/:unitId" element={<Flats />} />
      </Routes>
    </Router>
  );
}

export default App;