import React from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ weatherData, activeTime, activeDate, country, city }) => {
  let weatherDescription = '';
  let currTemp = 0;
  let humidity = 0;
  let minTemp = 0;
  let maxTemp = 0;
  let wind = 0;
  let iconId = '';

  for(let i=0; i< weatherData.length; i++){
    if(weatherData[i].dt_txt.split(' ')[0]===activeDate && weatherData[i].dt_txt.split(' ')[1]===activeTime){
      weatherDescription = weatherData[i].weather[0].description;
      currTemp = weatherData[i].main.temp;
      humidity = weatherData[i].main.humidity;
      minTemp = weatherData[i].main.temp_min;
      maxTemp = weatherData[i].main.temp_max;
      wind = weatherData[i].wind.speed;
      iconId = weatherData[i].weather[0].icon;
    }
  }

  const iconUrl = `http://openweathermap.org/img/w/${iconId}.png`;

  return(
    <div>
      <div style={{display: 'flex'}}>
        <img src={iconUrl} alt='Weather Condition'/>
        <div style={{marginLeft: '20px'}}>
          <div className='primary'>{city} {country}</div>
          <div className='secondary'>{activeDate}</div>
        </div>
      </div>
      <div className='displayTempDescription'>
        <div className='primary'>{currTemp} &#x2103;</div>
        <div className='secondary' style={{marginLeft: '20px', marginTop: '6px'}}>{weatherDescription}</div>
      </div>
      <div className='content'>{humidity}%</div>
      <div className='label'>Humidity</div>
      <div className='content'>{minTemp} &#x2103;</div>
      <div className='label'>Minimum Temperature</div>
      <div className='content'>{maxTemp} &#x2103;</div>
      <div className='label'>Maximum Temperature</div>
      <div className='content'>{wind} meter/sec</div>
      <div className='label'>Wind</div>
    </div>
  );
}

export default WeatherForecast;