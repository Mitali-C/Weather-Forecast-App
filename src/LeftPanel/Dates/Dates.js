import React, { useState } from 'react';
import './Dates.css';

const Dates = ({ weatherData, getActiveDate, getActiveTime }) => {
  const dates = [];
  const dateTime = [];
  const [activeDay, setActiveDay] = useState(new Date().getDay());
  const days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for(let i=0;i<weatherData.length; i++){
    if(!dates.includes(weatherData[i].dt_txt.split(' ')[0])){
      dates.push(weatherData[i].dt_txt.split(' ')[0]);
      dateTime.push(weatherData[i].dt_txt.split(' ')[1]);
    }
  }
  return(
    <div className='datesParent'>
      {
        React.Children.map(dates, (date, index) => {
          let today = new Date().getDay();
          let currDate = new Date(date.split(' ')[0]).getDay();
          if(today === currDate){return(
            <div
             className={activeDay===currDate? 'activeDate' : 'nonActiveDate'}
             onClick={() => {
               setActiveDay(currDate);
               getActiveDate(date.split(' ')[0]);
               getActiveTime(dateTime[index]);
               console.log(dateTime[index]);
              }}
            >
              Today
            </div>)}
          else{
            return(
              <div 
              className={activeDay === currDate ? 'activeDate' : 'nonActiveDate'}
              onClick={() => {
                setActiveDay(currDate);
                getActiveDate(date.split(' ')[0]);
                getActiveTime(dateTime[index]);
                console.log(dateTime[index]);
              }}
              >
                {days[currDate]}
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default Dates;