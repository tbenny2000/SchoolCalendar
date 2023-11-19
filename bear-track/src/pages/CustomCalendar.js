// CustomCalendar.js
import React, { useState } from 'react';
import './CustomCalendar.css';

const CustomCalendar = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [selectedTimes, setSelectedTimes] = useState({});

  const handleDayClick = (day) => {
    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [day]: !prevSelectedTimes[day],
    }));
  };

  const handleTimeSelect = (day, time) => {
    console.log(`Selected time for ${day}: ${time}`);
  };

  return (
    <div className="custom-calendar">
      {daysOfWeek.map((day) => (
        <div key={day} className="day-container">
          <button onClick={() => handleDayClick(day)}>{day}</button>
          {selectedTimes[day] && (
            <div className="time-dropdown">
              {[...Array(48)].map((_, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleTimeSelect(
                      day,
                      `${Math.floor(index / 2) % 12 || 12}:${index % 2 === 0 ? '00' : '30'} ${Math.floor(index / 24) === 0 ? 'AM' : 'PM'}`
                    )
                  }
                  className="time-option"
                >
                  {`${Math.floor(index / 2) % 12 || 12}:${index % 2 === 0 ? '00' : '30'} ${Math.floor(index / 24) === 0 ? 'AM' : 'PM'}`}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomCalendar;
