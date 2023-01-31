import React, { useEffect, useState } from "react"
import '../App.css';
import {IoMdSunny,IoMdRainy,IoMdCloudy,IoMdSnow,
  IoMdThunderstorm,IoMdSearch,} from 'react-icons/io';
import {BsCloudHaze2Fill,BsCloudDrizzleFill} from 'react-icons/bs';

const Main = () => {
  
  const [data, setData] = useState({});
  const [city, setCity] = useState("toronto");
  const [inputValue, setInputValue] = useState('');


  const handleInput = (e)=> {
    setInputValue(e.target.value);
    e.preventDefault();
  };

  const onSubmit = (e) => {
    if(inputValue != "" ) {
      setCity(inputValue);
    }
    const input = document.querySelector('input');
    input.value = '';
    
    e.preventDefault();
  };




  
  
  useEffect(function() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=93fc44fb622fbc988d575131400d1a61`)
        .then(res => res.json())
        .then(data => setData(data))
  },[city])

let icon;
console.log(data);

switch ("name" in data && data?.weather[0].main) {
  case 'Clouds':
    icon = <IoMdCloudy />;
    break;
  case 'Haze':
    icon=<BsCloudHaze2Fill />;
    break;
  case 'Rain':
    icon=<IoMdRainy className='rain'/>;
    break;
  case 'Clear':
    icon = <IoMdSunny className='sunny'/>;
    break;
  case 'Drizzle':
    icon = <BsCloudDrizzleFill className='rain'/>;
    break;
  case 'Snow':
    icon = <IoMdSnow className='rain'/>;
    break;
  case 'Thunderstorm':
    icon = <IoMdThunderstorm />;
    break;
}


  return (

    <main>
      <div className = "navbar" >
      <img className ="weatherlogo" src="weatherlogo.jfif" width="120px" alt="weatherlogo"></img>
          <h1 className ="text">What's the weather?</h1>
          <input type="text" placeholder="type your city" onChange={(e) => handleInput(e)}/>
          <button onClick={onSubmit} type="btn" >{<IoMdSearch/>}</button>
      </div>
      <div>
        {"name" in data ?  
           <div className="weatherbox">
              <p className="city">{data?.name}</p>
              <div className="weatherlogobox">
                  <p className="temp">{Math.floor((data?.main.temp - 32) * 5 / 9)}°c</p>
                  <div className="logo" >{icon}</div>
              </div>
              <h3 className="description">{data?.weather[0].main}</h3>
              <div className="highlow">
                  <h4 className="maxmin">H:{Math.floor((data?.main.temp_max - 32) * 5 / 9)}°c</h4>
                  <h4 className="maxmin">L:{Math.floor((data?.main.temp_min - 32) * 5 / 9)}°c</h4>
              </div>
              <div className="otherDescriptions">
                  <p className="high">Feels Like: {Math.floor((data?.main.feels_like - 32) * 5 / 9)}°c</p>
                  <p className="high">Visibility: {Math.floor(data?.visibility/1000)}km</p>
              </div>
              <div className="otherDescriptions">
                  <p className="high">Wind: {Math.floor(data?.wind.speed)}mph</p>
                  <p className="high">Humidity: {data?.main.humidity}%</p>
              </div> 
            </div> :
          <div>
            <h1 className="errorMsg">{data.message} please type in a valid city</h1>
          </div> 
      }
      </div>
    </main>
    )
  
}

export default Main