import React from 'react';
import fetch from 'isomorphic-fetch';
import './RightPanel.css'

const API_KEY='dc2e2313f8bf4e02f4bd09d0462b51f7';

class RightPanel extends React.Component {
  constructor(props){
    super(props);
    this.state={
        date: new Date().toLocaleDateString(),
        currentTemp: 0,
        weatherCondition:'',
        city: 'Pune',
        country: 'IN',
        error: '',
    }
  }

  componentWillMount(){
    this.fetchCurrentWeather();  
  }

  fetchCurrentWeather = () => {
    const { city } = this.state;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`)
    .then(response => {
      if(!response.ok){
        throw Error(response.statusText);
      }
      else{
        return response.json()
      }
    })
    .then(data => {
      this.setState({
        currentTemp: data.main.temp,
        weatherCondition: data.weather[0].main,
        country: data.sys.country,
      })
      this.props.returnCity(this.state.city, this.state.country);
    })
    .catch((e) =>{this.setState({error: e}); console.log(e)});
  }

  getCity = (e) => {
    e.preventDefault();
    this.fetchCurrentWeather();
  }

  onClick = () => {this.setState({error: ''});}

  handleChange = (e) => {
    this.setState({city: e.target.value});
  }

  render(){
    const {currentTemp, date, weatherCondition, city, error} = this.state;
    return(
      <React.Fragment>
        {
          error !== '' ? (
            <div className='overlay' onClick={this.onClick}>
              <div className='dialogBox'>
                Oops! We could not find the entered city. Please try re-entering the city name.
                <button className='closeBtn' onClick={this.onClick}>close</button>
              </div>
              
            </div>
          ) : (
            false
          )        
        }
        <div className='rightPanelParent'>
          <div className='heading'>WEATHER APP</div>
          <form onSubmit={this.getCity}>
            <input 
              type='text' 
              placeholder='Enter your city' 
              value={city} 
              className='input' 
              onChange={this.handleChange}/>
            <button type='submit' className='searchBtn'>Search</button>
          </form>
          <div className='currentWeatherHeading'>CURRENT WEATHER</div>
          <div className='data'>{date}</div>
          <div className='dataLabel'>Date</div>
          <div className='data'>{currentTemp} &#x2103;</div>
          <div className='dataLabel'>Current Temperature</div>
          <div className='data'>{weatherCondition}</div>
          <div className='dataLabel'>Weather Condition</div>
        </div>
        
      </React.Fragment>
    )
  }
}

export default RightPanel;