import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import axios from 'axios'
import { weatherBackgrounds } from './utils/backgroundMap'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [bgGradient, setBgGradient] = useState(weatherBackgrounds.Clear)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`

  const searchLoaction = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data)
    
        const weatherMain = response.data.weather[0].main;
        const newBackground = weatherBackgrounds[weatherMain] || weatherBackgrounds.Clear;
        setBgGradient(newBackground);
      })
      .catch((error) => {
        alert("City not found!")
        console.error(error)
      })
    }
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  })

  return (
    <>
<div className="Main grid grid-cols-1 main" style={{ background: bgGradient }}>
<div className="subdiv1 flex flex-col justify-end bottom-0 p-10">
          {data.main ? <h1 style={{ fontSize: '80px' }}>{data.main.temp} °C</h1> : null}
          {data.name !== undefined &&
            <div>
              <h3 style={{ fontSize: '50px' }}>{data.name}</h3>
              <h5>{currentDate} <i className="fa-solid fa-cloud"></i></h5>
            </div>
          }
        </div>

        <div className="subdiv3"></div>

        <div className="subdiv2 flex flex-col mt-10 ">
          <div className='flex items-center justify-between'>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={searchLoaction}
              className='locationsearcxh flex-1'
              type="search"
              placeholder='Search Location...'
            />
          </div>

          <h3 className='' style={{ fontSize: '30px' }}>Weather Details...</h3>
          {data.weather ? <h3 className='discription'>{data.weather[0].description}</h3> : null}

          <div className="temp flex items-center justify-between">
            <h4>Temp Min</h4>
            <div className='flex'>
              {data.main ? <h4 className='pr-2'>{data.main.temp_min}°C</h4> : null}
              <i className="fa-solid fa-temperature-three-quarters" style={{ color: '#e00b40' }}></i>
            </div>
          </div>

          <div className="temp flex items-center justify-between">
            <h4>Temp Max</h4>
            <div className='flex'>
              {data.main ? <h4 className='pr-2'>{data.main.temp_max}°C</h4> : null}
              <i className="fa-solid fa-temperature-three-quarters" style={{ color: 'blue' }}></i>
            </div>
          </div>

          <div className="temp flex items-center justify-between">
            <h4>Humidity</h4>
            <div className='flex'>
              {data.main ? <h4 className='pr-2'>{data.main.humidity}%</h4> : null}
              <i className="fa-solid fa-droplet"></i>
            </div>
          </div>

          <div className="temp flex items-center justify-between">
            <h4>Cloudy</h4>
            <div className='flex'>
              {data.clouds ? <h4 className='pr-2'>{data.clouds.all}%</h4> : null}
              <i className="fa-solid fa-cloud"></i>
            </div>
          </div>

          <div className="temp flex items-center justify-between">
            <h4>Wind</h4>
            <div className='flex'>
              {data.wind ? <h4 className='pr-2'>{data.wind.speed} km/hr</h4> : null}
              <i className="fa-solid fa-wind"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
