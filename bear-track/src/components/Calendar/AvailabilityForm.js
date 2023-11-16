import React, { useState } from 'react';
import './AvailabilityForm.css';

const AvailabilityForm = ({ availability, onAvailabilityChange }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [times, setTimes] = useState({});

  const handleDayToggle = (day) => {
    const newSelectedDays = [...selectedDays];
    if (newSelectedDays.includes(day)) {
      // Day is already selected, remove it
      newSelectedDays.splice(newSelectedDays.indexOf(day), 1);
      const newTimes = { ...times };
      delete newTimes[day];
    } else {
      // Day is not selected, add it with default times
      newSelectedDays.push(day);
      setTimes({ ...times, [day]: [{ start: '', end: '' }] });
    }

    setSelectedDays(newSelectedDays);
    onAvailabilityChange({ selectedDays: newSelectedDays, times });
  };

  const handleTimeChange = (day, index, timeType, value) => {
    const newTimes = { ...times };
    newTimes[day][index][timeType] = value;
    setTimes(newTimes);
    onAvailabilityChange({ selectedDays, times });
  };

  const handleAddTimeSlot = (day) => {
    const newTimes = { ...times };
    newTimes[day] = newTimes[day] || [];
  
    // Find the last time slot
    const lastTimeSlot = newTimes[day][newTimes[day].length - 1];
  
    // Initialize start and end times with 30-minute increments or defaults if NaN
    const defaultStartTime = lastTimeSlot ? lastTimeSlot.end : '09:00';
    const defaultEndTime = lastTimeSlot ? add30Minutes(lastTimeSlot.end) : '09:30';
  
    newTimes[day].push({ start: defaultStartTime, end: defaultEndTime });
    setTimes(newTimes);
    onAvailabilityChange({ selectedDays, times });
  };
  

const add30Minutes = (time) => {
    const [hours, minutes] = time.split(':');
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + 30;
  
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
  
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  const handleRemoveTimeSlot = (day, index) => {
    const newTimes = { ...times };
    newTimes[day].splice(index, 1);
    setTimes(newTimes);
    onAvailabilityChange({ selectedDays, times });
  };



  return (
    <div className='form'>
      <h2>Select Your Availability</h2>
      <div>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
          <div key={day}>
            <label>
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => handleDayToggle(day)}
              />
              {day}
            </label>
            {selectedDays.includes(day) && (
              <div>
                {times[day]?.map((timeSlot, index) => (
                  <div key={index}>
                    <label>
                      Start Time:
                      <input
                        type="time"
                        value={timeSlot.start}
                        onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
                      />
                    </label>
                    <label>
                      End Time:
                      <input
                        type="time"
                        value={timeSlot.end}
                        onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
                      />
                    </label>
                    <button onClick={() => handleRemoveTimeSlot(day, index)}>x</button>
                  </div>
                ))}
                <button onClick={(handleSaveAvailability) => handleAddTimeSlot(day)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button 
      className='save-button'
      onClick={() => console.log({ selectedDays, times })}
      >Save</button>
    </div>
  );
};

export default AvailabilityForm;