import React from 'react';
import './NewCalendar.css';

class ViewCalendar extends React.Component {
  render() {
    const calendarStyle = {
      width: '100%',
      height: '600px',
      border: '1px solid #A0A0A0',
    };

    const imageStyle = {
      width: '299px',
      height: '299px',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0.25)',
      borderRadius: '360px',
      border: '2px solid #DADADA',
    };

    const nameStyle = {
      left: '147px',
      top: '683px',
      position: 'absolute',
      color: '#7B7B7B',
      fontSize: '45px',
      fontFamily: 'Inter',
      fontWeight: '700',
      wordWrap: 'break-word',
    };

    const subjectStyle = {
      left: '839px',
      top: '95px',
      position: 'absolute',
      color: '#696969',
      fontSize: '45px',
      fontFamily: 'Inter',
      fontWeight: '700',
      wordWrap: 'break-word',
    };

    const calendarTitleStyle = {
      left: '1522px',
      top: '95px',
      position: 'absolute',
      color: '#696969',
      fontSize: '45px',
      fontFamily: 'Inter',
      fontWeight: '700',
      wordWrap: 'break-word',
    };

    // More styles here...

    return (
      <div>

        <img
          style={imageStyle}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWLRrp2ErqwPimW7rlcuC44_w2EXAxMw93e5GgW667bT1j_ma_ZfRoeek4uy7l1IBVXo&usqp=CAU"
        />

        <div style={nameStyle}>Mr Bean</div>
        <div style={subjectStyle}>Chemistry</div>
        <div style={calendarTitleStyle}>Mutual calendars</div>

       
  
      // More elements here using similar styles...
    
      </div>
    );
  }
}

export default ViewCalendar;
