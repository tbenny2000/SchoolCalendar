import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Homepage from './HomePage';
//import data from "./mock-data.json";

// const HomePage = () => {
//   return (
//     <div>
//       <h1>{data.id}</h1>
//       <p>{data.password}</p>
//     </div>
//   );
// };

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;