import React from 'react';
import fetch from 'isomorphic-fetch';
import Dates from './Dates';
import './LeftPanel.css';
import Time from './Time/Time';
import WeatherForecast from './WeatherForecast';
import Loader from '../Loader';

const API_KEY='dc2e2313f8bf4e02f4bd09d0462b51f7';

export default class LeftPanel extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        city: this.props.city,
        weatherData: [],
        country: '',
        activeDate: '',
        activeTime: '',
        isLoading: true,
      }
  }
  
  componentWillMount(){
    this.fetchWeatherForecast();
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: !this.state.isLoading,});
    this.setState({
      city: nextProps.city,
    }, () => this.fetchWeatherForecast());
  }

  fetchWeatherForecast = () => {
    const { city } = this.state;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        weatherData: data.list,
        country: data.city.country,
        activeDate: data.list[0].dt_txt.split(' ')[0],
        activeTime: data.list[0].dt_txt.split(' ')[1],
        isLoading: !this.state.isLoading,
      });
    });
  }

  getActiveDate = (date) => {
    this.setState({
      activeDate: date,
    })
  }

  getActiveTime = (time) => {
    this.setState({
      activeTime: time,
    });
  }

  render(){
    return(
      <div>
        {
          this.state.isLoading ? (
            <Loader/>
          ) : (
            <React.Fragment>
              <div>
                <Dates 
                  weatherData={this.state.weatherData}
                  getActiveDate={this.getActiveDate}
                  getActiveTime={this.getActiveTime}
                />
              </div>
              <div className='semiCircle'>
                <Time 
                  weatherData={this.state.weatherData}
                  activeDate={this.state.activeDate}
                  getActiveTime={this.getActiveTime}
                  activeTime={this.state.activeTime}
                />
              </div>
              <div className='weatherForecast'>
                <WeatherForecast 
                  weatherData={this.state.weatherData}
                  activeTime={this.state.activeTime}
                  activeDate={this.state.activeDate}
                  country={this.props.country}
                  city={this.state.city}
                  />
              </div>
            </React.Fragment>
          )
        }
        
      </div>
    )
  }
}