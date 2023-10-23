import React from 'react';

class HomePage{
    constructor(){
        this.currentTime = null;
        this.selectedDate = null;
        this.calendar = null;

        this.render();
    }

    render(){
        const context = document.getElementById('content');
        //Creating a button to confirm the time of day
        const timeButton = document.createElement('button');
        timeButton.addEventListener('click', () =>  this.confirmTimeOfDay());
        context.appendChild(timeButton);

        this.UpdateTimeButtonText(timeButton);

        const newCalendarButton = document.createElement('button');
        newCalendarButton.textContent = 'New Calendar';
        newCalendarButton.addEventListener('click', () => this.createNewCalendar());
        content.appendChild(newCalendarButton);
    }

    UpdateTimeButtonText(button){
        if(this.currentTime){
            button.textContent = '${this.currentTime}';
        }else{
            button.textContent = 'Select Time of Day: ';
        }
    }

    confirmTimeOfDay(){
        //Setting time vars for the function
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        //Formatting the time as HH:MM
        this.currentTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        //Update the time button text message
        const timeButton = document.querySelector('button');
        this.UpdateTimeButtonText(timeButton);


        console.log('Time of day confirmed: ', this.currentTime);

    }

    createNewCalendar(){
        //Code to insert calendar from html file
        console.log('Creating a new calendar from user input');
    }
}
const homepage = new HomePage();