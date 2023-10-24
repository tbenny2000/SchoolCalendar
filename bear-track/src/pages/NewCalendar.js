import React from 'react';

class ViewCalendar extends React.Component {
  render() {
    return (
      <div>
        <iframe
          src="NewCalendar.html"
          title="Calendar"
          width="100%"
          height="600"
          frameBorder="0"
        ></iframe>
      </div>
    );
  }
}

export default ViewCalendar;
