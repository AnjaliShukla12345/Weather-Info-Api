import './Weather.css'
import Search from '../images/Search.png'
import cloudy from '../images/cloudy.png'
import humidity from '../images/humidity.png'
import rainy from '../images/rainy.png'
import snow from '../images/snow.png'
import sun from '../images/sun.png'
import w1 from '../images/w1.png'
import w3 from '../images/w3.png'
import wind from '../images/wind.png'
import scatterd from '../images/scatterd.png'
import mist from '../images/mist.png'

import axios from 'axios'
import { useEffect, useState, useRef } from 'react'



const Weather = () => {


const inputRef = useRef()



const [weather, setweather] = useState(false)




const allIcons = {
    "01d": sun,
    "02d": cloudy,
    "03d":scatterd,
    "04d":w1,
    "09d":w3,
    "10d":w1,
    "11d":rainy,
    "13d":snow,
    "50d":mist


}


const search = async(city) => {

if(city == ""){
    alert("enter your city name")
    return;
}


    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'c856bab19218620fb9d5f28292ce18e5'}`)
    const data = response.data
    console.log(data)

    const icon = allIcons[data.weather[0].icon] || sun;
    setweather({
        humidity:data.main.humidity,
        windSpeed: data.wind.speed,
        temp:Math.floor(data.main.temp),
        location : data.name,
        icon: icon
    })
}

useEffect(() => {
  search("Kanpur")
},[])


  return (
    <>
<div className='weather'>

<div className='search-bar'>
    <input ref={inputRef}     type='text' placeholder='Enter your City'/>
    <img src={Search} onClick={() => search(inputRef.current.value)}/></div> 


<img src={weather.icon} alt="" className='weather-icon'/>
<p className='temp'>{weather.temp}°c</p>
<p className='location'>{weather.location}</p>



<div className='weather-data'>

<div className='col'>
    <img src={humidity} alt="" />
    <div>
<p>{weather.humidity}%</p> <span>Humidity</span>
    </div>
</div>



<div className='col'>
    <img src={wind} alt="" />
    <div>
<p>{weather.windSpeed} km/hr</p> <span>Wind Speed</span>
    </div>

</div>
</div>

    </div>  
    </>
  )
}

export default Weather

