import React from 'react';
import './App.css';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      city: 'Pune',
      country: 'IN',
    }
  }

setCity = (cityName, countryName) => {
  this.setState({
    city: cityName,
    country: countryName,
  }, () => {console.log('set country', this.state.country);});
  
}

  render(){
    return (
      <div className="parent">
        <div className='leftPanel'>
          <LeftPanel 
            city = {this.state.city}
            country = {this.state.country}
            changeLoadingState = {this.changeLoadingState}
            />
        </div>
        <div className='rightPanel'>
          <RightPanel returnCity = {this.setCity} />
        </div>
      </div>
    );
  }
}

export default App;
