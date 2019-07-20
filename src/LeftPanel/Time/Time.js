import React from 'react';
import './Time.css';

const Time = ({ weatherData, getActiveTime, activeDate, activeTime }) => {
  const times = [];
  for(let i=0; i<weatherData.length; i++){
    if(weatherData[i].dt_txt.split(' ')[0] === activeDate){
      times.push(weatherData[i].dt_txt.split(' ')[1]);
    }
  }

  return(
    <div className='timeParent'>
      {
        React.Children.map(times, (time) => {
          return(
            <div
          className={activeTime === time ? 'activeTime' : 'nonActiveTime'}
            onClick={() => {
              getActiveTime(time);
            }}
          >
            {time.substring(0,2)} hrs
          </div>
          )
        })
      }
    </div>
  )
}

export default Time;