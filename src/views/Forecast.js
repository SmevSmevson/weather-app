import React, { useContext } from 'react';
import {ForecastContext} from "../contextProviders/ForecastContext"

function Dashboard(props) {
    const { forecast } = useContext(ForecastContext)

    let imgs = {
        CloudsDay: '☁️',
        ClearDay: '☀️',
        RainDay: '🌧',
        SnowDay: '☃️',
        CloudsNight: '☁️',
        ClearNight: '⭐️',
        RainNight: '🌧',
        SnowNight: '☃️'
    }

    let getWeatherImg = (weather, time) => {
        let parsedTime = + new Date(time).toTimeString().split(' ')[0].slice(0,2)
        let dayNight = parsedTime > 6 && parsedTime < 21 ? 'Day' : 'Night'
        let query = `${weather}${dayNight}`
        return imgs[query]
    }

    return (
        <div className="forecast">
            <h2 className="forecast-location">{forecast.city ? forecast.city.name : 'loading...'}</h2>
            <div className="forecast-scroll-section">
                {forecast.list ? forecast.list.map(({dt_txt, main, weather}, index) => {
                    return (
                        <div key={dt_txt} className="forecast-item" style={{animationDelay: index*100+'ms'}}>
                            <div className="forecast-item--date">{new Date(dt_txt).toDateString().slice(3, 10)}</div>
                            <div className="forecast-item--time">{new Date(dt_txt).toTimeString().split(' ')[0].slice(0,5)}</div>
                            <div className="forecast-item--temp">{main.temp}&deg;C</div>
                            <div className="forecast-item--weather">{weather[0].main}</div>
                            <div className="forecast-item--img">{getWeatherImg(weather[0].main, dt_txt)}</div>
                            {dt_txt == forecast.lowestTemp ? <div id="jacket">Best day to sell a jacket <span className="forecast-item--img" role="img" aria-labelledby='jacket'>🧥</span></div> : ''}
                            {dt_txt == forecast.mostRainfall ? <div id="umbrella">Best day to sell an Umbrella <span className="forecast-item--img" role="img" aria-labelledby='umbrella'>☂️</span></div> : ''}
                        </div>
                    )
                }) : ''}
            </div>
        </div>
    )
}

export default Dashboard;

