import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NewCalendar from './NewCalendar';

  
      describe('NewCalendar Component', () => {
        it('should display an error message when more than 5 values are entered', () => {
          render(<NewCalendar />);
      
          // Helper function to enter a value in the input field and simulate an Enter key press
          const enterValueAndPressEnter = (value) => {
            const inputField = screen.getByPlaceholderText('Enter email or username');
            fireEvent.change(inputField, { target: { value } });
            fireEvent.keyDown(inputField, { key: 'Enter', code: 13 });
          };
      
          describe('NewCalendar Component', () => {
            it('should display an error message when more than 5 values are entered', () => {
              render(<NewCalendar />);
          
              // Helper function to enter a value in the input field and simulate an Enter key press
              const enterValueAndPressEnter = (value) => {
                const inputField = screen.getByPlaceholderText('Enter email or username');
                fireEvent.change(inputField, { target: { value } });
                fireEvent.keyDown(inputField, { key: 'Enter', code: 13 });
              };
          
              // Enter 5 values into the input field
              enterValueAndPressEnter('ajohnson@ggc.edu');
              enterValueAndPressEnter('bparker@ggc.edu');
              enterValueAndPressEnter('cadams@ggc.edu');
              enterValueAndPressEnter('dmitchell@ggc.edu');
              enterValueAndPressEnter('ewilson@ggc.edu');
          
              // Attempt to enter a 6th value
              enterValueAndPressEnter('gturner@ggc.edu');
          
              // Ensure that the error message is displayed
              const errorMessage = screen.getByText("You have reached your limit in adding people please create calendar.");
              expect(errorMessage).toBeInTheDocument();
            });
          });
      
          // Ensure that the error message is displayed
          const errorMessage = screen.getByText("You have reached your limit in adding people please create calendar.");
          expect(errorMessage).toBeInTheDocument();
        });
      });