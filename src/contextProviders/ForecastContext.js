import React, { useReducer, createContext, useEffect } from 'react'
import { forecastReducer } from "../reducers/ForecastReducer";

export const ForecastContext = createContext()

const ForecastContextProvider = (props) => {
    const [forecast, dispatch] = useReducer(forecastReducer, [], () => {
        const localData = localStorage.getItem('forecast')
        return localData ? JSON.parse(localData) : {}
        // {
        //     "list": [],
        //     "city": {
        //         "id": 5391959,
        //         "name": "San Francisco",
        //         "coord": {
        //             "lat": 37.7793,
        //             "lon": -122.4193
        //         },
        //         "country": "US",
        //         "population": 805235,
        //         "timezone": -25200,
        //         "sunrise": 1570198059,
        //         "sunset": 1570240137
        //     }
        // }
    })

    useEffect(() => {
        let searchString = props.location.search ? props.location.search.split('=')[1] : 'Tokyo'
        const fetchData = async () => {
            await fetch(
              `http://api.openweathermap.org/data/2.5/forecast?q=${searchString}&units=metric&appid=8cdf5fe137c453c8f8a91c9346386df9`,
            ).then(res => {
                return res.json()
            }).then(data => {
                dispatch({ type: 'SET_FORECAST', forecast: data })
                dispatch({ type: 'SET_COLDEST_DAY' })
                dispatch({ type: 'SET_WETTEST_DAY' })
            }).catch(err => {
                Promise.reject(err);
            });
        };
        
        fetchData()
    }, [props.location.search])

    useEffect(() => {
        localStorage.setItem('forecast', JSON.stringify(forecast))
    }, [forecast])

    return (
        <ForecastContext.Provider value={{forecast, dispatch}}>
            {props.children}
        </ForecastContext.Provider>
    )
}

export default ForecastContextProvider
