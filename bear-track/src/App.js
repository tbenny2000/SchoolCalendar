import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import ViewCalendar from './pages/ViewCalendar';
import Registration from "./pages/Registration"
import Homepage from './pages/HomePage';
import MyProfile from "./pages/MyProfile";
import NewCalendar from "./pages/NewCalendar";


function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/MyProfile" element={<MyProfile />}/>
          <Route path="/ViewCalendar" element={<ViewCalendar/>}/>
          <Route path="/NewCalendar" element = {<NewCalendar />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
    </>
  );
}
export default App;