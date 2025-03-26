import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./hero";
import Predict from "./predict";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/predict" element={<Predict />} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
