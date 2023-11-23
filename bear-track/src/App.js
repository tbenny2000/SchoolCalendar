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
import { UserProvider } from './pages/UserContext';
import { NotificationsProvider } from './components/NotificationsContext';

const MemoizedUserProvider = React.memo(UserProvider);
const MemoizedNotificationsProvider = React.memo(NotificationsProvider);

function App() {
  return (
    <MemoizedNotificationsProvider>
      <MemoizedUserProvider>
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
    </MemoizedUserProvider>
    </MemoizedNotificationsProvider>
    
  );
}
export default App;